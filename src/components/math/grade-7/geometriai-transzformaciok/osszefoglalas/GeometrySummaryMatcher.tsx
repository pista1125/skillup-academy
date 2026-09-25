import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface GeometrySummaryMatcherProps {
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
    title: '1. Szint: Alapfogalmak és Szimmetria',
    subtitle: 'Párosítsd a geometriai transzformációkat és szögpárokat a meghatározásukkal!',
    pairs: [
      {
        id: 'p1',
        prompt: 'Tengelyes tükrözés',
        value: 'Távolságtartó egybevágóság, amely megfordítja a körüljárási irányt',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="35" y1="2" x2="35" y2="33" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3 1" />
            <polygon points="15,10 28,15 20,28" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1" />
            <polygon points="55,10 42,15 50,28" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 'p2',
        prompt: 'Középpontos tükrözés',
        value: 'Távolságtartó egybevágóság (180°-os forgatás), megtartja a körüljárási irányt',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="35" cy="17.5" r="2" fill="#0f172a" />
            <line x1="15" y1="25" x2="55" y2="10" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 1" />
            <circle cx="15" cy="25" r="2.5" fill="#0284c7" />
            <circle cx="55" cy="10" r="2.5" fill="#dc2626" />
          </svg>
        )
      },
      {
        id: 'p3',
        prompt: 'Párhuzamos eltolás',
        value: 'Irányított szakasz (vektor) mentén történő elmozdulás, nincs fixpontja',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="12,12 24,12 18,24" fill="#f1f5f9" stroke="#475569" strokeWidth="1" />
            <polygon points="46,12 58,12 52,24" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
            <line x1="24" y1="12" x2="44" y2="12" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="2 1" />
          </svg>
        )
      },
      {
        id: 'p4',
        prompt: 'Csúcsszögek',
        value: 'Közös csúcsú szögek, melyek egymás szárainak meghosszabbításai (egyenlő nagyságúak)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="10" y1="28" x2="60" y2="7" stroke="#475569" strokeWidth="1.2" />
            <line x1="10" y1="7" x2="60" y2="28" stroke="#475569" strokeWidth="1.2" />
            <path d="M 27 15 A 8 8 0 0 1 27 20" fill="none" stroke="#dc2626" strokeWidth="1.5" />
            <path d="M 43 15 A 8 8 0 0 0 43 20" fill="none" stroke="#dc2626" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'p5',
        prompt: 'Mellékszögek',
        value: 'Egyik száruk közös, a másik kettő egy egyenest alkot (összegük 180°)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="8" y1="25" x2="62" y2="25" stroke="#334155" strokeWidth="1.5" />
            <line x1="35" y1="25" x2="48" y2="8" stroke="#334155" strokeWidth="1.5" />
            <path d="M 43 25 A 8 8 0 0 0 40 18" fill="none" stroke="#0284c7" strokeWidth="1.2" />
            <path d="M 23 25 A 12 12 0 0 1 38 14" fill="none" stroke="#ea580c" strokeWidth="1.2" />
          </svg>
        )
      },
      {
        id: 'p6',
        prompt: 'Váltószögek',
        value: 'Párhuzamosokat metsző egyenes ellentétes oldalain fekvő egyenlő szögek (Z-alak)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="8" y1="10" x2="62" y2="10" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="8" y1="25" x2="62" y2="25" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="20" y1="25" x2="50" y2="10" stroke="#dc2626" strokeWidth="1.5" />
            <path d="M 42 10 A 8 8 0 0 1 45 15" fill="none" stroke="#dc2626" strokeWidth="1" />
            <path d="M 28 25 A 8 8 0 0 1 25 20" fill="none" stroke="#dc2626" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 'p7',
        prompt: 'Szakaszfelező merőleges',
        value: 'A végpontoktól egyenlő távolságra lévő pontok mértani helye',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="12" y1="20" x2="58" y2="20" stroke="#0d9488" strokeWidth="2" />
            <line x1="35" y1="4" x2="35" y2="32" stroke="#dc2626" strokeWidth="1.5" />
            {/* Hungarian right angle: arc + dot */}
            <path d="M 35 15 A 5 5 0 0 1 40 20" fill="none" stroke="#dc2626" strokeWidth="1" />
            <circle cx="37.5" cy="17.5" r="0.8" fill="#dc2626" />
          </svg>
        )
      },
      {
        id: 'p8',
        prompt: 'Szögfelező félegyenes',
        value: 'A szög száraitól egyenlő távolságra lévő pontok mértani helye',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="12" y1="26" x2="58" y2="26" stroke="#0d9488" strokeWidth="1.5" />
            <line x1="12" y1="26" x2="48" y2="6" stroke="#0d9488" strokeWidth="1.5" />
            <line x1="12" y1="26" x2="55" y2="16" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="3 2" />
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Nevezetes Vonalak és Síkidomok',
    subtitle: 'Párosítsd a háromszögek nevezetes pontjait és a négyszögeket a tulajdonságaikkal!',
    pairs: [
      {
        id: 'p9',
        prompt: 'Súlypont (S)',
        value: 'A három súlyvonal metszéspontja, 2 : 1 arányban osztja a súlyvonalakat',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="12,28 58,28 35,6" fill="#f8fafc" stroke="#334155" strokeWidth="1" />
            <line x1="35" y1="6" x2="35" y2="28" stroke="#7c3aed" strokeWidth="1" />
            <circle cx="35" cy="20.6" r="2" fill="#dc2626" />
            <text x="39" y="22" className="text-[6px] font-bold fill-rose-600">S</text>
          </svg>
        )
      },
      {
        id: 'p10',
        prompt: 'Magasságpont (M)',
        value: 'A magasságvonalak metszéspontja (tompaszög esetén a háromszögön kívül van)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="14,26 56,26 28,8" fill="#f8fafc" stroke="#334155" strokeWidth="1" />
            <line x1="28" y1="8" x2="28" y2="26" stroke="#dc2626" strokeWidth="1" />
            <circle cx="28" cy="22" r="1.5" fill="#dc2626" />
            <text x="32" y="22" className="text-[6px] font-bold fill-rose-600">M</text>
          </svg>
        )
      },
      {
        id: 'p11',
        prompt: 'Körülírt kör középpontja (O)',
        value: 'Oldalfelező merőlegesek metszéspontja, egyenlő távol a csúcsoktól',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="35" cy="17.5" r="14" fill="none" stroke="#0284c7" strokeWidth="1" strokeDasharray="2 1" />
            <polygon points="23,26 47,26 35,5" fill="none" stroke="#0f172a" strokeWidth="1" />
            <circle cx="35" cy="17.5" r="1.5" fill="#0284c7" />
          </svg>
        )
      },
      {
        id: 'p12',
        prompt: 'Beírt kör középpontja (I)',
        value: 'A belső szögfelezők metszéspontja, egyenlő távol a háromszög oldalaitól',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="14,28 56,28 35,6" fill="none" stroke="#0f172a" strokeWidth="1" />
            <circle cx="35" cy="20" r="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1" />
            <circle cx="35" cy="20" r="1.5" fill="#16a34a" />
          </svg>
        )
      },
      {
        id: 'p13',
        prompt: 'Paralelogramma',
        value: 'Két párhuzamos oldalpár, átlói felezik egymást, szemközti szögei egyenlők',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="14,26 48,26 56,9 22,9" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.2" />
          </svg>
        )
      },
      {
        id: 'p14',
        prompt: 'Rombusz',
        value: 'Egyenlő oldalú paralelogramma, átlói merőlegesen felezik egymást és a szögeket',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="35,5 55,17.5 35,30 15,17.5" fill="#fdf4ff" stroke="#a855f7" strokeWidth="1.2" />
            <line x1="35" y1="5" x2="35" y2="30" stroke="#c084fc" strokeWidth="1" strokeDasharray="2 1" />
            <line x1="15" y1="17.5" x2="55" y2="17.5" stroke="#c084fc" strokeWidth="1" strokeDasharray="2 1" />
          </svg>
        )
      },
      {
        id: 'p15',
        prompt: 'Deltoid',
        value: 'Két-két szomszédos oldala egyenlő, egyik átlója szimmetriatengely és merőleges a másikra',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="15,17.5 38,6 55,17.5 38,29" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.2" />
            <line x1="15" y1="17.5" x2="55" y2="17.5" stroke="#ea580c" strokeWidth="1" strokeDasharray="2 1" />
          </svg>
        )
      },
      {
        id: 'p16',
        prompt: 'Húrtrapéz',
        value: 'Egyenlő szárú trapéz, alapon fekvő szögei egyenlők, tengelyesen szimmetrikus',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="12,27 58,27 46,9 24,9" fill="#f8fafc" stroke="#334155" strokeWidth="1.2" />
            <line x1="35" y1="4" x2="35" y2="32" stroke="#dc2626" strokeWidth="1" strokeDasharray="2 1" />
          </svg>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Haladó Tételek és Körgeometria',
    subtitle: 'Párosítsd a magasabb szintű geometriai tételeket az összefüggésükkel!',
    pairs: [
      {
        id: 'p17',
        prompt: 'Thálész-tétel',
        value: 'A kör átmérőjére illeszkedő bármely kerületi szög derékszög (90°)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <path d="M 12,26 A 23,23 0 0 1 58,26 Z" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1" />
            <polygon points="12,26 58,26 28,6" fill="none" stroke="#0f172a" strokeWidth="1.2" />
            {/* Hungarian right angle: arc + dot */}
            <path d="M 30,10 A 4,4 0 0 1 25,8" fill="none" stroke="#dc2626" strokeWidth="0.8" />
            <circle cx="28" cy="9.5" r="0.6" fill="#dc2626" />
          </svg>
        )
      },
      {
        id: 'p18',
        prompt: 'Euler-egyenes aránya',
        value: 'M, S és O egy egyenesen fekszik, és |MS| = 2 · |SO|',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="10" y1="17.5" x2="60" y2="17.5" stroke="#0284c7" strokeWidth="1.5" />
            <circle cx="16" cy="17.5" r="2" fill="#dc2626" />
            <circle cx="40" cy="17.5" r="2" fill="#7c3aed" />
            <circle cx="52" cy="17.5" r="2" fill="#059669" />
            <text x="14" y="12" className="text-[5px] font-bold fill-rose-600">M</text>
            <text x="39" y="12" className="text-[5px] font-bold fill-purple-700">S</text>
            <text x="51" y="12" className="text-[5px] font-bold fill-emerald-600">O</text>
          </svg>
        )
      },
      {
        id: 'p19',
        prompt: 'Kör érintője',
        value: 'Egyenes, melynek 1 közös pontja van a körrel, és merőleges az érintési sugárra',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="35" cy="18" r="12" fill="none" stroke="#475569" strokeWidth="1" />
            <line x1="10" y1="6" x2="60" y2="6" stroke="#dc2626" strokeWidth="1.5" />
            <line x1="35" y1="18" x2="35" y2="6" stroke="#0284c7" strokeWidth="1" strokeDasharray="2 1" />
            {/* Hungarian right angle: arc + dot */}
            <path d="M 35,11 A 5,5 0 0 1 40,6" fill="none" stroke="#dc2626" strokeWidth="0.8" />
            <circle cx="37" cy="8.5" r="0.6" fill="#dc2626" />
          </svg>
        )
      },
      {
        id: 'p20',
        prompt: 'Külső pontból húzott érintők',
        value: 'A külső P pontból a körhöz húzott két érintőszakasz hossza megegyezik',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="28" cy="17.5" r="10" fill="none" stroke="#475569" strokeWidth="1" />
            <line x1="58" y1="17.5" x2="32" y2="8" stroke="#dc2626" strokeWidth="1.2" />
            <line x1="58" y1="17.5" x2="32" y2="27" stroke="#dc2626" strokeWidth="1.2" />
            <circle cx="58" cy="17.5" r="1.5" fill="#0f172a" />
          </svg>
        )
      },
      {
        id: 'p21',
        prompt: 'Húrnégyszög tétele',
        value: 'A körbe írható négyszög szemközti belső szögeinek összege 180°',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="35" cy="17.5" r="14" fill="none" stroke="#94a3b8" strokeWidth="1" />
            <polygon points="24,10 46,10 48,26 22,24" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
            <text x="30" y="20" className="text-[6px] font-bold fill-blue-800">α+γ=180°</text>
          </svg>
        )
      },
      {
        id: 'p22',
        prompt: 'Érintőnégyszög tétele',
        value: 'A kör köré írható négyszög szemközti oldalainak összege egyenlő: a + c = b + d',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="18,28 52,28 48,7 22,9" fill="#fdf2f8" stroke="#db2777" strokeWidth="1" />
            <circle cx="35" cy="18" r="9" fill="none" stroke="#be185d" strokeWidth="1" strokeDasharray="2 1" />
          </svg>
        )
      },
      {
        id: 'p23',
        prompt: 'Szabályos sokszög átlói',
        value: 'n oldalú sokszög összes átlóinak száma d = n · (n - 3) / 2',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="35,6 48,11 53,24 43,32 27,32 17,24 22,11" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1" />
            <line x1="35" y1="6" x2="43" y2="32" stroke="#c084fc" strokeWidth="0.8" />
            <line x1="35" y1="6" x2="27" y2="32" stroke="#c084fc" strokeWidth="0.8" />
          </svg>
        )
      },
      {
        id: 'p24',
        prompt: 'Két metsző tengelyre tükrözés',
        value: 'A metszéspont körüli elforgatást eredményez, amely a hajlásszög 2-szerese',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="15" y1="30" x2="55" y2="6" stroke="#0284c7" strokeWidth="1.2" />
            <line x1="15" y1="6" x2="55" y2="30" stroke="#0284c7" strokeWidth="1.2" />
            <circle cx="35" cy="18" r="1.5" fill="#0f172a" />
            <text x="38" y="24" className="text-[6px] font-bold fill-rose-600">2α forgás</text>
          </svg>
        )
      }
    ]
  }
};

export const GeometrySummaryMatcher: React.FC<GeometrySummaryMatcherProps> = ({
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
      key={`matcher-geom-summary-${level}`}
      topicId={topicId || 'g7-geom-summary-matcher'}
      topicTitle={topicTitle || '14. Összefoglalás'}
      badgeText="7. OSZTÁLY • GEOMETRIA • 🔗 PÁROSÍTÓ"
      title="Geometria Összefoglaló Párosító Játék"
      subtitle="Párosítsd össze a fogalmakat, tételeket és képleteket mindhárom nehézségi szinten!"
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

export default GeometrySummaryMatcher;
