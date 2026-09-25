import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PointReflectionMatcherProps {
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
    title: '1. Szint: Alapfogalmak és Szerkesztés',
    subtitle: 'Párosítsd a középpontos tükrözés alapfogalmait, szerkesztési elemeit és ábráit!',
    pairs: [
      {
        id: 'p1',
        prompt: 'Tükörközéppont (Centrum, O)',
        value: 'A sík rögzített pontja, amelyre vonatkozik a tükrözés (egyetlen fixpont)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="35" cy="17" r="5" className="fill-amber-500 stroke-2 stroke-amber-600" />
            <text x="31" y="32" className="text-[9px] font-bold fill-amber-700">O</text>
          </svg>
        )
      },
      {
        id: 'p2',
        prompt: 'Felezőpont szerepe',
        value: 'Az O centrum pontosan felezi a P és P\' pontokat összekötő PP\' szakaszt (|OP| = |OP\'|)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="10" y1="17" x2="60" y2="17" stroke="#0891b2" strokeWidth="2" />
            <circle cx="10" cy="17" r="3" className="fill-cyan-600" />
            <circle cx="35" cy="17" r="4" className="fill-amber-500" />
            <circle cx="60" cy="17" r="3" className="fill-teal-600" />
            <text x="8" y="10" className="text-[7px] font-bold fill-cyan-700">P</text>
            <text x="32" y="10" className="text-[7px] font-bold fill-amber-700">O</text>
            <text x="56" y="10" className="text-[7px] font-bold fill-teal-700">P'</text>
          </svg>
        )
      },
      {
        id: 'p3',
        prompt: 'Szakasz és képe',
        value: 'A\'B\' hossza megegyezik AB hosszával, és párhuzamos vele (A\'B\' ∥ AB)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="12" y1="10" x2="32" y2="14" stroke="#0891b2" strokeWidth="2" />
            <line x1="38" y1="21" x2="58" y2="25" stroke="#0d9488" strokeWidth="2" />
            <circle cx="35" cy="17.5" r="2.5" className="fill-amber-500" />
          </svg>
        )
      },
      {
        id: 'p4',
        prompt: 'Háromszög tükrözése',
        value: 'A három csúcsot (A, B, C) egyenként tükrözzük O-n keresztül: ΔA\'B\'C\' ≅ ΔABC',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="12,12 28,8 20,24" fill="rgba(6,182,212,0.3)" stroke="#0891b2" strokeWidth="1.2" />
            <polygon points="58,23 42,27 50,11" fill="rgba(20,184,166,0.3)" stroke="#0d9488" strokeWidth="1.2" />
            <circle cx="35" cy="17.5" r="2" className="fill-amber-500" />
          </svg>
        )
      },
      {
        id: 'p5',
        prompt: 'Távolságtartás',
        value: 'Bármely két pont távolsága egyenlő a képpontjaik távolságával (|A\'B\'| = |AB|)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="15" y1="12" x2="30" y2="12" stroke="#2563eb" strokeWidth="2" />
            <line x1="40" y1="23" x2="55" y2="23" stroke="#0d9488" strokeWidth="2" />
            <text x="20" y="9" className="text-[7px] font-bold fill-blue-600">d</text>
            <text x="44" y="20" className="text-[7px] font-bold fill-teal-600">d' = d</text>
          </svg>
        )
      },
      {
        id: 'p6',
        prompt: 'Kör tükrözése',
        value: 'A kör képe ugyanakkora sugarú kör (r\' = r), középpontja a K pont tükörképe (K\')',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="18" cy="17" r="10" fill="none" stroke="#0891b2" strokeWidth="1.5" />
            <circle cx="52" cy="17" r="10" fill="none" stroke="#0d9488" strokeWidth="1.5" />
            <circle cx="35" cy="17" r="2.5" className="fill-amber-500" />
          </svg>
        )
      },
      {
        id: 'p7',
        prompt: 'Centrum képe',
        value: 'A centrum képe önmaga (O\' = O), nincs elmozdulás',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="35" cy="17" r="6" className="fill-amber-100 stroke-2 stroke-amber-500" />
            <circle cx="35" cy="17" r="2" className="fill-amber-600" />
            <text x="24" y="31" className="text-[8px] font-bold fill-amber-700">O = O'</text>
          </svg>
        )
      },
      {
        id: 'p8',
        prompt: 'Körzővel kimért távolság',
        value: 'A körzőnyílásba vett OP távolságot O-ból a félegyenes meghosszabbítására mérjük fel',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <path d="M 25 22 L 35 12 L 45 22" fill="none" stroke="#6366f1" strokeWidth="1.5" />
            <circle cx="35" cy="12" r="2" fill="#6366f1" />
            <path d="M 40 22 A 6 6 0 0 1 50 22" fill="none" stroke="#94a3b8" strokeDasharray="2,2" strokeWidth="1" />
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Tulajdonságok és Geometriai Invariánsok',
    subtitle: 'Párosítsd a középpontos tükrözés invariáns tételeit és geometriai tulajdonságait!',
    pairs: [
      {
        id: 'p9',
        prompt: 'Fixpontok száma',
        value: 'Pontosan 1 darab fixpontja van: kizárólag a tükörközéppont (O)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="35" cy="17" r="5" className="fill-cyan-500" />
            <text x="28" y="30" className="text-[8px] font-black fill-cyan-800">1 db</text>
          </svg>
        )
      },
      {
        id: 'p10',
        prompt: 'Fixegyenesek feltétele',
        value: 'Minden olyan egyenes fixegyenes, amely áthalad az O centrumon (O ∈ e)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="8" y1="28" x2="62" y2="7" stroke="#0891b2" strokeWidth="1.8" />
            <circle cx="35" cy="17.5" r="3.5" className="fill-amber-500" />
            <text x="12" y="16" className="text-[7px] font-bold fill-cyan-700">e = e'</text>
          </svg>
        )
      },
      {
        id: 'p11',
        prompt: 'Képegyenes párhuzamossága',
        value: 'Ha az e egyenes nem megy át O-n, akkor a képe szigorúan párhuzamos vele: e\' ∥ e',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="10" y1="10" x2="60" y2="10" stroke="#2563eb" strokeWidth="1.8" />
            <line x1="10" y1="25" x2="60" y2="25" stroke="#0d9488" strokeWidth="1.8" />
            <circle cx="35" cy="17.5" r="2.5" className="fill-amber-500" />
            <text x="61" y="12" className="text-[7px] font-bold fill-blue-600">e</text>
            <text x="61" y="27" className="text-[7px] font-bold fill-teal-600">e'</text>
          </svg>
        )
      },
      {
        id: 'p12',
        prompt: 'Körüljárási irány (Orientáció)',
        value: 'MEGŐRZI a körüljárási irányt: az óramutatóval ellentétes körüljárás ellenkező marad (direkt egybevágóság)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <text x="18" y="22" className="text-sm font-bold fill-cyan-700">↺</text>
            <text x="44" y="22" className="text-sm font-bold fill-teal-700">↺</text>
            <text x="32" y="21" className="text-[8px] font-bold fill-slate-500">→</text>
          </svg>
        )
      },
      {
        id: 'p13',
        prompt: '180°-os síkbeli elforgatás',
        value: 'A síkban a középpontos tükrözés egyenértékű az O pont körüli 180 fokos forgatással',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <path d="M 22 17 A 13 13 0 0 1 48 17" fill="none" stroke="#8b5cf6" strokeWidth="1.8" />
            <polygon points="48,17 44,13 46,20" fill="#8b5cf6" />
            <circle cx="35" cy="17" r="2.5" className="fill-amber-500" />
            <text x="27" y="11" className="text-[7px] font-bold fill-purple-700">180°</text>
          </svg>
        )
      },
      {
        id: 'p14',
        prompt: 'Kétszeres tükrözés (Inverz)',
        value: 'Egy alakzatot kétszer tükrözve ugyanarra az O pontra visszakapjuk önmagát: T_O(T_O(P)) = P',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <text x="16" y="21" className="text-[9px] font-bold fill-slate-700">P → P' → P</text>
          </svg>
        )
      },
      {
        id: 'p15',
        prompt: 'Nem pontonként fix egyenes',
        value: 'A fixegyenes pontjai O-ra nézve helyet cserélnek, a pontok nem helyben maradnak',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="8" y1="17" x2="62" y2="17" stroke="#64748b" strokeWidth="1.5" />
            <circle cx="20" cy="17" r="2.5" fill="#0891b2" />
            <circle cx="35" cy="17" r="3" fill="#f59e0b" />
            <circle cx="50" cy="17" r="2.5" fill="#0d9488" />
            <path d="M 22 12 Q 35 5 48 12" fill="none" stroke="#0891b2" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 'p16',
        prompt: 'Szögtartás',
        value: 'Bármely szög és középpontos tükörképe pontosan azonos nagyságú (α\' = α)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <path d="M 15 25 L 30 25 L 25 10" fill="none" stroke="#0891b2" strokeWidth="1.5" />
            <path d="M 55 10 L 40 10 L 45 25" fill="none" stroke="#0d9488" strokeWidth="1.5" />
            <text x="21" y="22" className="text-[7px] font-bold fill-cyan-700">α</text>
            <text x="43" y="16" className="text-[7px] font-bold fill-teal-700">α'</text>
          </svg>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Koordinátageometria és Alakzatok',
    subtitle: 'Párosítsd az origóra tükrözött koordinátákat és alakzatok szimmetriáit!',
    pairs: [
      {
        id: 'p17',
        prompt: 'Origóra tükrözés: P(x, y)',
        value: 'Mindkét koordináta az ellentettjére változik: P\'(-x, -y)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="8" y1="17" x2="62" y2="17" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="35" y1="4" x2="35" y2="31" stroke="#cbd5e1" strokeWidth="1" />
            <circle cx="48" cy="9" r="2.5" fill="#0891b2" />
            <circle cx="22" cy="25" r="2.5" fill="#0d9488" />
          </svg>
        )
      },
      {
        id: 'p18',
        prompt: 'P(4, 3) tükörképe az origóra',
        value: 'P\'(-4, -3) (mindkét előjel megfordul)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <text x="8" y="21" className="text-[8px] font-bold fill-cyan-800">(4, 3) → (-4, -3)</text>
          </svg>
        )
      },
      {
        id: 'p19',
        prompt: 'Q(-5, 2) tükörképe az origóra',
        value: 'Q\'(5, -2) (a negatívból pozitív, pozitívból negatív lesz)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <text x="6" y="21" className="text-[8px] font-bold fill-teal-800">(-5, 2) → (5, -2)</text>
          </svg>
        )
      },
      {
        id: 'p20',
        prompt: 'Paralelogramma átlóinak metszéspontja',
        value: 'A paralelogramma szimmetriaközéppontja: az átlók felezik egymást',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="12,25 45,25 58,10 25,10" fill="none" stroke="#0891b2" strokeWidth="1.5" />
            <line x1="12" y1="25" x2="58" y2="10" stroke="#94a3b8" strokeWidth="1" />
            <line x1="45" y1="25" x2="25" y2="10" stroke="#94a3b8" strokeWidth="1" />
            <circle cx="35" cy="17.5" r="2" fill="#f59e0b" />
          </svg>
        )
      },
      {
        id: 'p21',
        prompt: 'Téglalap és Rombusz középpontja',
        value: 'Mindkettő középpontosan szimmetrikus az átlók metszéspontjára',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <rect x="15" y="8" width="40" height="19" fill="none" stroke="#6366f1" strokeWidth="1.5" />
            <circle cx="35" cy="17.5" r="2.5" fill="#f59e0b" />
          </svg>
        )
      },
      {
        id: 'p22',
        prompt: 'Szabályos hatszög',
        value: 'Középpontosan szimmetrikus a körülírt körének középpontjára (főátlók metszése)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="26,7 44,7 53,17.5 44,28 26,28 17,17.5" fill="none" stroke="#0d9488" strokeWidth="1.5" />
            <circle cx="35" cy="17.5" r="2" fill="#f59e0b" />
          </svg>
        )
      },
      {
        id: 'p23',
        prompt: 'Általános háromszög középpontos szimmetriája',
        value: 'NINCS középpontos szimmetriája (nem fedi el önmagát 180 fokos forgatással)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="18,25 55,25 32,8" fill="none" stroke="#ef4444" strokeWidth="1.5" />
            <text x="31" y="22" className="text-[10px] font-bold fill-red-600">✗</text>
          </svg>
        )
      },
      {
        id: 'p24',
        prompt: 'Deltoid középpontos szimmetriája',
        value: 'Csak tengelyesen szimmetrikus, de általában NEM középpontosan szimmetrikus (kivéve ha rombusz)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="35,6 50,18 35,29 20,18" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
            <line x1="35" y1="6" x2="35" y2="29" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2,2" />
          </svg>
        )
      }
    ]
  }
};

export const PointReflectionMatcher: React.FC<PointReflectionMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  topicId = 'g7-geom-point-reflection',
  topicTitle = '5. Középpontos tükrözés'
}) => {
  return (
    <MatcherTemplate
      level={level}
      grade={7}
      chapterId="g7-geom-trans"
      topicId={topicId}
      topicTitle={topicTitle}
      title="Középpontos Tükrözés Párosító"
      subtitle="Találd meg az összetartozó definíciókat, invariáns tulajdonságokat, koordinátákat és ábrákat!"
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
    />
  );
};

export default PointReflectionMatcher;
