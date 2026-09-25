import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PointSymmetricShapesMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Alapfogalmak és Alakzatok Centrumai',
    subtitle: 'Párosítsd az alakzatokat a megfelelő szimmetriatulajdonságukkal vagy centrumuk helyével!',
    pairs: [
      {
        id: 'p1',
        prompt: 'Szakasz szimmetriaközéppontja',
        value: 'A szakasz saját felezőpontja (F)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="12" y1="26" x2="58" y2="9" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="35" cy="17.5" r="3" fill="#e11d48" />
          </svg>
        )
      },
      {
        id: 'p2',
        prompt: 'Kör és körlap centruma',
        value: 'A kör geometriai középpontja (O)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="35" cy="17.5" r="14" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1.5" />
            <circle cx="35" cy="17.5" r="2.5" fill="#0d9488" />
          </svg>
        )
      },
      {
        id: 'p3',
        prompt: 'Általános paralelogramma',
        value: 'Középpontosan szimmetrikus az átlók metszéspontjára (0 tengelye van)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="15,26 50,26 58,9 23,9" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.5" />
            <circle cx="36.5" cy="17.5" r="2.5" fill="#4f46e5" />
          </svg>
        )
      },
      {
        id: 'p4',
        prompt: 'Szabályos háromszög',
        value: 'SOHA NEM középpontosan szimmetrikus (180°-ra fejtetőre áll)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="35,6 16,30 54,30" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
            <circle cx="35" cy="22" r="2" fill="#94a3b8" />
          </svg>
        )
      },
      {
        id: 'p5',
        prompt: 'Szabályos hatszög',
        value: 'Középpontosan szimmetrikus (páros oldalszámú szabályos sokszög)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="35,5 50,12 50,23 35,30 20,23 20,12" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
            <circle cx="35" cy="17.5" r="2.5" fill="#16a34a" />
          </svg>
        )
      },
      {
        id: 'p6',
        prompt: '„Z” betű',
        value: 'Csak középpontosan szimmetrikus (0 szimmetriatengely, 1 centrum)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polyline points="22,8 48,8 22,27 48,27" fill="none" stroke="#db2777" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="35" cy="17.5" r="2" fill="#be185d" />
          </svg>
        )
      },
      {
        id: 'p7',
        prompt: '„S” betű',
        value: '180°-os forgatásra pontosan önmagát adja vissza (centrummal bír)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <path d="M 45,10 C 38,7 25,8 25,15 C 25,22 45,20 45,27 C 45,33 32,32 25,29" fill="none" stroke="#9333ea" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="35" cy="18.5" r="2" fill="#7e22ce" />
          </svg>
        )
      },
      {
        id: 'p8',
        prompt: '„H” betű',
        value: 'Középpontosan ÉS tengelyesen is szimmetrikus (2 tengely + 1 centrum)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="25" y1="8" x2="25" y2="27" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="45" y1="8" x2="45" y2="27" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="25" y1="17.5" x2="45" y2="17.5" stroke="#4f46e5" strokeWidth="2" />
            <circle cx="35" cy="17.5" r="2" fill="#4338ca" />
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Sokszögek, Négyszögek és Alakzatok Osztályozása',
    subtitle: 'Párosítsd a négyszögeket, sokszögeket és szimbólumokat szimmetriajellemzőikkel!',
    pairs: [
      {
        id: 'p9',
        prompt: 'Téglalap szimmetriája',
        value: '2 szimmetriatengely és 1 szimmetriaközéppont (az átlók metszéspontja)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <rect x="15" y="8" width="40" height="19" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
            <circle cx="35" cy="17.5" r="2.5" fill="#0284c7" />
          </svg>
        )
      },
      {
        id: 'p10',
        prompt: 'Rombusz szimmetriája',
        value: '2 tengely (a két átlója) és 1 szimmetriaközéppont (az átlók metszése)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="35,6 55,17.5 35,29 15,17.5" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
            <circle cx="35" cy="17.5" r="2.5" fill="#7c3aed" />
          </svg>
        )
      },
      {
        id: 'p11',
        prompt: 'Húrtrapéz szimmetriája',
        value: 'Van 1 szimmetriatengelye, de NINCS szimmetriaközéppontja!',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="25,10 45,10 55,27 15,27" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
            <line x1="35" y1="6" x2="35" y2="30" stroke="#b91c1c" strokeWidth="1" strokeDasharray="2 1" />
          </svg>
        )
      },
      {
        id: 'p12',
        prompt: 'Konvex deltoid szimmetriája',
        value: '1 tengelye van (főátló), de általában NEM középpontosan szimmetrikus',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="35,5 50,14 35,30 20,14" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
            <line x1="35" y1="4" x2="35" y2="31" stroke="#be185d" strokeWidth="1" strokeDasharray="2 1" />
          </svg>
        )
      },
      {
        id: 'p13',
        prompt: 'Szabályos ötszög',
        value: '5 szimmetriatengely, de 0 szimmetriaközéppont (páratlan sokszög)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="35,6 52,14 47,29 23,29 18,14" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'p14',
        prompt: 'Szabályos nyolcszög',
        value: '8 szimmetriatengely ÉS középpontosan szimmetrikus (páros sokszög)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="28,6 42,6 52,13 52,22 42,29 28,29 18,22 18,13" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
            <circle cx="35" cy="17.5" r="2" fill="#7e22ce" />
          </svg>
        )
      },
      {
        id: 'p15',
        prompt: '„N” betű',
        value: '180°-os forgatásra önmagába megy át (csak középpontosan szimmetrikus)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polyline points="23,27 23,8 47,27 47,8" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="35" cy="17.5" r="2" fill="#1d4ed8" />
          </svg>
        )
      },
      {
        id: 'p16',
        prompt: 'Francia kártya udvari lapjai',
        value: 'Kétfejű rajzolatuk 180°-os középpontos szimmetriával rendelkezik',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <rect x="22" y="6" width="26" height="23" rx="2" fill="#fff" stroke="#475569" strokeWidth="1.5" />
            <text x="31" y="21" className="text-[10px] font-black fill-red-600">K♥</text>
          </svg>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Geometriai Összefüggések és Koordináták',
    subtitle: 'Párosítsd a mélyebb matematikai tételeket, képleteket és speciális alakzatokat!',
    pairs: [
      {
        id: 'p17',
        prompt: 'Szimmetriaközéppont koordinátái',
        value: 'A végpontok koordinátáinak számtani közepei: ((xA + xB)/2; (yA + yB)/2)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="15" y1="28" x2="55" y2="8" stroke="#0284c7" strokeWidth="2" />
            <circle cx="35" cy="18" r="3" fill="#e11d48" />
            <text x="31" y="32" className="text-[8px] font-mono font-bold fill-slate-700">F(x,y)</text>
          </svg>
        )
      },
      {
        id: 'p18',
        prompt: 'Két egymásra merőleges szimmetriatengely',
        value: 'Metszéspontjuk szükségképpen szimmetriaközéppont (pl. téglalap, rombusz)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="35" y1="5" x2="35" y2="30" stroke="#7c3aed" strokeWidth="1.5" />
            <line x1="15" y1="17.5" x2="55" y2="17.5" stroke="#7c3aed" strokeWidth="1.5" />
            <circle cx="35" cy="17.5" r="3" fill="#4338ca" />
            <rect x="35" y="17.5" width="5" height="5" fill="none" stroke="#64748b" strokeWidth="0.8" />
          </svg>
        )
      },
      {
        id: 'p19',
        prompt: 'Irányítás (körüljárási irány)',
        value: 'A síkbeli középpontos tükrözés megtartja az irányítást (irányítástartó)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <path d="M 25,20 A 10,10 0 1,1 35,20" fill="none" stroke="#059669" strokeWidth="1.5" />
            <polygon points="35,17 37,23 32,21" fill="#059669" />
            <text x="42" y="22" className="text-[8px] font-bold fill-emerald-700">↺ ↺</text>
          </svg>
        )
      },
      {
        id: 'p20',
        prompt: 'Centrumok maximális száma korlátos alakzatban',
        value: 'Pontosan 1 darab lehet (ha 2 lenne, végtelen periodikus alakzat keletkezne)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="35" cy="17.5" r="10" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
            <circle cx="35" cy="17.5" r="3" fill="#b45309" />
            <text x="31" y="21" className="text-[9px] font-bold fill-amber-900">1!</text>
          </svg>
        )
      },
      {
        id: 'p21',
        prompt: 'Párhuzamos egyenespár centrumai',
        value: 'A két egyenes közötti középpárhuzamos egyenes BÁRMELYIK pontja',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="10" y1="8" x2="60" y2="8" stroke="#3b82f6" strokeWidth="1.5" />
            <line x1="10" y1="17.5" x2="60" y2="17.5" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 2" />
            <line x1="10" y1="27" x2="60" y2="27" stroke="#3b82f6" strokeWidth="1.5" />
            <circle cx="35" cy="17.5" r="2.5" fill="#ef4444" />
          </svg>
        )
      },
      {
        id: 'p22',
        prompt: 'Két metsző egyenes szimmetriája',
        value: 'A két egyenes metszéspontja az alakzat szimmetriaközéppontja',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="15" y1="8" x2="55" y2="27" stroke="#6366f1" strokeWidth="1.5" />
            <line x1="15" y1="27" x2="55" y2="8" stroke="#6366f1" strokeWidth="1.5" />
            <circle cx="35" cy="17.5" r="3" fill="#4338ca" />
          </svg>
        )
      },
      {
        id: 'p23',
        prompt: '180°-os elforgatás',
        value: 'Pontosan egyenértékű a síkban a pontra vonatkozó középpontos tükrözéssel',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="35" cy="17.5" r="3" fill="#e11d48" />
            <path d="M 18,17.5 A 17,17 0 1,1 52,17.5" fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="2 2" />
            <text x="24" y="12" className="text-[7.5px] font-bold fill-rose-700">180°</text>
          </svg>
        )
      },
      {
        id: 'p24',
        prompt: 'Digitális kijelző 6-os és 9-es számjegye',
        value: '180°-os forgatással (középpontos tükrözéssel) egymásba mennek át',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <text x="20" y="24" className="text-sm font-mono font-black fill-slate-800 dark:fill-slate-100">6</text>
            <text x="32" y="22" className="text-xs font-bold fill-rose-600">⇄</text>
            <text x="44" y="24" className="text-sm font-mono font-black fill-slate-800 dark:fill-slate-100">9</text>
          </svg>
        )
      }
    ]
  }
};

export const PointSymmetricShapesMatcher: React.FC<PointSymmetricShapesMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  topicId = 'g7-geom-point-symmetric-shapes-matcher',
  topicTitle = '10. Középpontosan szimmetrikus alakzatok'
}) => {
  const effectiveLevel = currentLevel || level;

  return (
    <MatcherTemplate
      topicId={topicId}
      topicTitle={topicTitle}
      badgeText="7. OSZTÁLY • PÁROSÍTÓ JÁTÉK"
      levels={matcherLevels}
      currentLevel={effectiveLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
    />
  );
};

export default PointSymmetricShapesMatcher;
