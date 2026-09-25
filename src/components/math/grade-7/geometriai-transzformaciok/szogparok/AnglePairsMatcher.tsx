import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface AnglePairsMatcherProps {
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
    title: '1. Szint: Alapfogalmak és Szögkapcsolatok',
    subtitle: 'Párosítsd a szögpárok alapvető definícióit a megfelelő tulajdonsággal!',
    pairs: [
      {
        id: 'p1',
        prompt: 'Mellékszögek',
        value: 'Közös száruk van, másik száruk egyenest alkot; összegük 180°',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="5" y1="28" x2="65" y2="28" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="35" y1="28" x2="55" y2="7" stroke="#d97706" strokeWidth="2" />
            <path d="M 43 28 A 8 8 0 0 0 40 23" fill="none" stroke="#d97706" strokeWidth="1.5" />
            <circle cx="35" cy="28" r="2" fill="#d97706" />
          </svg>
        )
      },
      {
        id: 'p2',
        prompt: 'Csúcsszögek',
        value: 'Közös a csúcsuk, száruk egymás meghosszabbítása; egyenlő nagyságúak',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="10" y1="30" x2="60" y2="5" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="10" y1="5" x2="60" y2="30" stroke="#94a3b8" strokeWidth="1.5" />
            <path d="M 27 14 A 10 10 0 0 1 27 21" fill="none" stroke="#d97706" strokeWidth="1.5" />
            <path d="M 43 14 A 10 10 0 0 1 43 21" fill="none" stroke="#d97706" strokeWidth="1.5" />
            <circle cx="35" cy="17.5" r="2" fill="#d97706" />
          </svg>
        )
      },
      {
        id: 'p3',
        prompt: 'Pótszögek',
        value: 'Két olyan szög, amelyek összege pontosan 90° (derékszög)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="15" y1="30" x2="55" y2="30" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="15" y1="30" x2="15" y2="5" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="15" y1="30" x2="45" y2="10" stroke="#10b981" strokeWidth="2" />
            <text x="32" y="22" className="text-[7px] font-bold fill-emerald-600">90°</text>
          </svg>
        )
      },
      {
        id: 'p4',
        prompt: 'Kiegészítő szögek',
        value: 'Két tetszőleges szög, amelyek összege pontosan 180°',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="5" y1="25" x2="65" y2="25" stroke="#0284c7" strokeWidth="2" />
            <path d="M 25 25 A 10 10 0 0 1 45 25" fill="none" stroke="#0284c7" strokeWidth="1.5" />
            <text x="24" y="16" className="text-[7px] font-bold fill-sky-700">180°</text>
          </svg>
        )
      },
      {
        id: 'p5',
        prompt: 'Egyenesszög',
        value: 'Pontosan 180°-os szög, szárai egy egyenest alkotnak',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="10" y1="20" x2="60" y2="20" stroke="#8b5cf6" strokeWidth="2" />
            <circle cx="35" cy="20" r="2.5" fill="#8b5cf6" />
            <path d="M 25 20 A 10 10 0 0 1 45 20" fill="none" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="2 2" />
          </svg>
        )
      },
      {
        id: 'p6',
        prompt: 'Derékszög',
        value: 'Pontosan 90°-os szög, szárai merőlegesek egymásra',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="20" y1="30" x2="50" y2="30" stroke="#059669" strokeWidth="2" />
            <line x1="20" y1="30" x2="20" y2="5" stroke="#059669" strokeWidth="2" />
            <rect x="20" y="22" width="8" height="8" fill="none" stroke="#059669" strokeWidth="1.2" />
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Szögszámítások és Párok keresése',
    subtitle: 'Keresd meg az adott szög megfelelő mellékszögét, pótszögét vagy csúcsszögét!',
    pairs: [
      {
        id: 'p7',
        prompt: '40° mellékszöge',
        value: '140° (mert 180° - 40° = 140°)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="5" y1="26" x2="65" y2="26" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="40" y1="26" x2="60" y2="10" stroke="#d97706" strokeWidth="2" />
            <text x="48" y="22" className="text-[7px] font-bold fill-amber-700">40°</text>
            <text x="18" y="20" className="text-[7px] font-bold fill-sky-700">?</text>
          </svg>
        )
      },
      {
        id: 'p8',
        prompt: '35° pótszöge',
        value: '55° (mert 90° - 35° = 55°)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="15" y1="28" x2="55" y2="28" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="15" y1="28" x2="15" y2="6" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="15" y1="28" x2="45" y2="15" stroke="#10b981" strokeWidth="2" />
            <text x="24" y="24" className="text-[7px] font-bold fill-emerald-700">35°</text>
          </svg>
        )
      },
      {
        id: 'p9',
        prompt: '72° csúcsszöge',
        value: '72° (a csúcsszögek mindig egyenlők)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="10" y1="28" x2="60" y2="7" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="10" y1="7" x2="60" y2="28" stroke="#94a3b8" strokeWidth="1.5" />
            <text x="14" y="19" className="text-[7px] font-bold fill-amber-700">72°</text>
            <text x="48" y="19" className="text-[7px] font-bold fill-amber-700">?</text>
          </svg>
        )
      },
      {
        id: 'p10',
        prompt: '65° kiegészítő szöge',
        value: '115° (mert 180° - 65° = 115°)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="5" y1="25" x2="65" y2="25" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="30" y1="25" x2="45" y2="8" stroke="#0284c7" strokeWidth="2" />
            <text x="35" y="21" className="text-[7px] font-bold fill-sky-700">65°</text>
          </svg>
        )
      },
      {
        id: 'p11',
        prompt: 'Egy szög egyenlő a mellékszögével',
        value: '90° (mert 2α = 180° ⟹ α = 90°, derékszög)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="10" y1="28" x2="60" y2="28" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="35" y1="28" x2="35" y2="6" stroke="#059669" strokeWidth="2" />
            <rect x="27" y="20" width="8" height="8" fill="none" stroke="#059669" strokeWidth="1" />
            <rect x="35" y="20" width="8" height="8" fill="none" stroke="#059669" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 'p12',
        prompt: '120° mellékszögének pótszöge',
        value: '30° (120° mellékszöge 60°, annak pótszöge 90° - 60° = 30°)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <text x="10" y="20" className="text-[8px] font-bold fill-purple-700">120° ➔ 60° ➔ 30°</text>
          </svg>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Párhuzamos Szárú Szögpárok',
    subtitle: 'Párosítsd a párhuzamosokat metsző egyenes által bezárt nevezetes szögpárokat!',
    pairs: [
      {
        id: 'p13',
        prompt: 'Egyállású szögek (F-alak)',
        value: 'A metszőegyenes azonos oldalán egyirányú szárak; egyenlők (α = β)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="5" y1="12" x2="65" y2="12" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="5" y1="24" x2="65" y2="24" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="20" y1="32" x2="50" y2="4" stroke="#d97706" strokeWidth="1.8" />
            <text x="44" y="10" className="text-[6px] font-bold fill-amber-700">α</text>
            <text x="36" y="22" className="text-[6px] font-bold fill-amber-700">α</text>
          </svg>
        )
      },
      {
        id: 'p14',
        prompt: 'Belső váltószögek (Z-alak)',
        value: 'A metszőegyenes ellentétes oldalán, egymással szemben; egyenlők (α = β)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="5" y1="12" x2="65" y2="12" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="5" y1="24" x2="65" y2="24" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="25" y1="24" x2="45" y2="12" stroke="#16a34a" strokeWidth="2" />
            <text x="33" y="10" className="text-[6px] font-bold fill-emerald-700">α</text>
            <text x="35" y="27" className="text-[6px] font-bold fill-emerald-700">α</text>
          </svg>
        )
      },
      {
        id: 'p15',
        prompt: 'Társszögek (C-alak)',
        value: 'A metszőegyenes azonos oldalán a két párhuzamos között; összegük 180°',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="5" y1="12" x2="65" y2="12" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="5" y1="24" x2="65" y2="24" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="20" y1="32" x2="50" y2="4" stroke="#8b5cf6" strokeWidth="1.8" />
            <text x="30" y="17" className="text-[6px] font-bold fill-purple-700">α</text>
            <text x="22" y="23" className="text-[6px] font-bold fill-purple-700">β</text>
          </svg>
        )
      },
      {
        id: 'p16',
        prompt: 'Külső váltószögek',
        value: 'A metszőegyenes ellentétes oldalán, a párhuzamosokon kívül; egyenlők',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="5" y1="12" x2="65" y2="12" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="5" y1="24" x2="65" y2="24" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="20" y1="32" x2="50" y2="4" stroke="#d97706" strokeWidth="1.8" />
            <text x="25" y="8" className="text-[6px] font-bold fill-amber-700">α</text>
            <text x="45" y="32" className="text-[6px] font-bold fill-amber-700">α</text>
          </svg>
        )
      },
      {
        id: 'p17',
        prompt: 'Párhuzamossági tétel',
        value: 'e ∥ f pontosan akkor, ha az egyállású szögek egyenlők',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <text x="12" y="20" className="text-[8px] font-bold fill-sky-800">α = β ⟺ e ∥ f</text>
          </svg>
        )
      },
      {
        id: 'p18',
        prompt: 'Trapéz száron fekvő szögei',
        value: 'Társszögpárt alkotnak a két párhuzamos alap között, ezért összegük 180°',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="10,26 60,26 48,9 22,9" fill="none" stroke="#d97706" strokeWidth="1.5" />
            <text x="14" y="23" className="text-[6px] font-bold fill-amber-700">α</text>
            <text x="24" y="16" className="text-[6px] font-bold fill-amber-700">δ</text>
          </svg>
        )
      }
    ]
  },
  4: {
    title: '4. Szint: Merőleges Szárak és Összetett Ábrák',
    subtitle: 'Párosítsd a haladó szögkapcsolatokat és geometriai szabályokat!',
    pairs: [
      {
        id: 'p19',
        prompt: 'Merőleges szárú hegyesszögek',
        value: 'Mivel mindkettő hegyesszög, nagyságuk pontosan megegyezik (α = β)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="15" y1="28" x2="45" y2="28" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="15" y1="28" x2="35" y2="10" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="45" y1="28" x2="45" y2="5" stroke="#d97706" strokeWidth="1.5" />
            <line x1="35" y1="10" x2="55" y2="20" stroke="#d97706" strokeWidth="1.5" />
            <text x="28" y="25" className="text-[6px] font-bold fill-amber-700">α = β</text>
          </svg>
        )
      },
      {
        id: 'p20',
        prompt: 'Merőleges szárú hegyes- és tompaszög',
        value: 'Különböző típusúak, ezért összegük pontosan 180° (α + β = 180°)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <text x="10" y="20" className="text-[7.5px] font-bold fill-amber-800">hegyes + tompa = 180°</text>
          </svg>
        )
      },
      {
        id: 'p21',
        prompt: 'Töröttvonal csúcsszabály (Z-szabály)',
        value: 'Párhuzamosok között a balra néző szögek összege = jobbra nézők összege',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="5" y1="8" x2="65" y2="8" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="5" y1="27" x2="65" y2="27" stroke="#0284c7" strokeWidth="1.5" />
            <polyline points="20,8 45,17.5 25,27" fill="none" stroke="#d97706" strokeWidth="1.8" />
            <text x="47" y="19" className="text-[6px] font-bold fill-amber-700">γ = α+β</text>
          </svg>
        )
      },
      {
        id: 'p22',
        prompt: 'Háromszög külső szöge',
        value: 'Egyenlő a két nem szomszédos belső szög összegével (α_külső = β + γ)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="15,26 50,26 35,8" fill="none" stroke="#16a34a" strokeWidth="1.5" />
            <line x1="50" y1="26" x2="65" y2="26" stroke="#94a3b8" strokeWidth="1.2" />
            <text x="52" y="23" className="text-[6px] font-bold fill-emerald-700">α'</text>
          </svg>
        )
      },
      {
        id: 'p23',
        prompt: 'Egy háromszög belső szögeinek összege',
        value: 'Mindig 180°, amit a csúcson átmenő párhuzamos egyenes váltószögei bizonyítanak',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="15,26 55,26 35,9" fill="none" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="15" y1="9" x2="55" y2="9" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1" />
            <text x="24" y="22" className="text-[6px] font-bold fill-sky-800">α+β+γ = 180°</text>
          </svg>
        )
      },
      {
        id: 'p24',
        prompt: 'Paralelogramma szomszédos szögei',
        value: 'Mivel a szemközti oldalak párhuzamosak, társszögek: α + β = 180°',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="12,26 48,26 58,9 22,9" fill="none" stroke="#d97706" strokeWidth="1.5" />
            <text x="16" y="23" className="text-[6px] font-bold fill-amber-700">α</text>
            <text x="44" y="23" className="text-[6px] font-bold fill-sky-700">β</text>
          </svg>
        )
      }
    ]
  }
};

export const AnglePairsMatcher: React.FC<AnglePairsMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  topicId = 'g7-geom-angle-pairs',
  topicTitle = '7. Szögpárok'
}) => {
  return (
    <MatcherTemplate
      key={`matcher-ap-${level}`}
      level={level}
      currentLevel={level}
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      topicId={topicId}
      topicTitle={topicTitle}
      badge="7. OSZTÁLY • GEOMETRIA"
      title="Szögpárok Párosító"
      subtitle="Párosítsd a szögpárok fogalmait, tulajdonságait és értékeit!"
      colorScheme="amber"
    />
  );
};

export default AnglePairsMatcher;
