import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ConversePythagorasSorterProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: Háromszögek Szögtípus Szerinti Osztályozása',
    subtitle: 'Sorold be a megadott oldalhosszúságú háromszögeket a szögeik szerinti csoportba!',
    categories: [
      {
        id: 'cat-right',
        name: 'Derékszögű (c² = a² + b²)',
        description: 'A leghosszabb oldal négyzete pontosan egyenlő a két rövidebb négyzetösszegével',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-acute',
        name: 'Hegyesszögű (c² < a² + b²)',
        description: 'A leghosszabb oldal négyzete kisebb a két rövidebb négyzetösszegénél',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-obtuse',
        name: 'Tompaszögű (c² > a² + b²)',
        description: 'A leghosszabb oldal négyzete nagyobb a két rövidebb négyzetösszegénél',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      {
        id: 'cp-s1-1',
        text: '3 cm, 4 cm, 5 cm',
        category: 'cat-right',
        explanation: '3² + 4² = 9 + 16 = 25 = 5². Pontos egyenlőség => derékszögű!',
        badge: '3-4-5',
        figure: (
          <svg viewBox="0 0 40 24" className="w-8 h-5">
            <polygon points="4,20 36,20 4,4" fill="#ecfdf5" stroke="#059669" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 'cp-s1-2',
        text: '6 cm, 8 cm, 10 cm',
        category: 'cat-right',
        explanation: '6² + 8² = 36 + 64 = 100 = 10². Derékszögű (a 3-4-5 kétszerese).',
        badge: '6-8-10',
        figure: (
          <svg viewBox="0 0 40 24" className="w-8 h-5">
            <polygon points="4,20 36,20 4,4" fill="#ecfdf5" stroke="#059669" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 'cp-s1-3',
        text: '5 cm, 12 cm, 13 cm',
        category: 'cat-right',
        explanation: '5² + 12² = 25 + 144 = 169 = 13². Derékszögű.',
        badge: '5-12-13',
        figure: (
          <svg viewBox="0 0 40 24" className="w-8 h-5">
            <polygon points="4,20 36,20 4,6" fill="#ecfdf5" stroke="#059669" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 'cp-s1-4',
        text: '8 cm, 15 cm, 17 cm',
        category: 'cat-right',
        explanation: '8² + 15² = 64 + 225 = 289 = 17². Derékszögű.',
        badge: '8-15-17',
        figure: (
          <svg viewBox="0 0 40 24" className="w-8 h-5">
            <polygon points="4,20 36,20 4,8" fill="#ecfdf5" stroke="#059669" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 'cp-s1-5',
        text: '7 cm, 8 cm, 9 cm',
        category: 'cat-acute',
        explanation: '7² + 8² = 49 + 64 = 113. Mivel c² = 9² = 81 < 113, hegyesszögű.',
        badge: '7-8-9',
        figure: (
          <svg viewBox="0 0 40 24" className="w-8 h-5">
            <polygon points="4,20 36,20 20,4" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 'cp-s1-6',
        text: '5 cm, 6 cm, 7 cm',
        category: 'cat-acute',
        explanation: '5² + 6² = 25 + 36 = 61. c² = 7² = 49 < 61 => hegyesszögű.',
        badge: '5-6-7',
        figure: (
          <svg viewBox="0 0 40 24" className="w-8 h-5">
            <polygon points="4,20 36,20 20,4" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 'cp-s1-7',
        text: '10 cm, 10 cm, 10 cm (szabályos)',
        category: 'cat-acute',
        explanation: 'Szabályos háromszög minden szöge 60°, ami < 90°, tehát hegyesszögű.',
        badge: 'Szabályos',
        figure: (
          <svg viewBox="0 0 40 24" className="w-8 h-5">
            <polygon points="6,20 34,20 20,4" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 'cp-s1-8',
        text: '6 cm, 7 cm, 8 cm',
        category: 'cat-acute',
        explanation: '6² + 7² = 36 + 49 = 85. c² = 8² = 64 < 85 => hegyesszögű.',
        badge: '6-7-8',
        figure: (
          <svg viewBox="0 0 40 24" className="w-8 h-5">
            <polygon points="4,20 36,20 18,4" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 'cp-s1-9',
        text: '4 cm, 6 cm, 8 cm',
        category: 'cat-obtuse',
        explanation: '4² + 6² = 16 + 36 = 52. c² = 8² = 64 > 52 => tompaszögű!',
        badge: '4-6-8',
        figure: (
          <svg viewBox="0 0 40 24" className="w-8 h-5">
            <polygon points="12,20 36,20 4,6" fill="#ffe4e6" stroke="#e11d48" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 'cp-s1-10',
        text: '2 cm, 3 cm, 4 cm',
        category: 'cat-obtuse',
        explanation: '2² + 3² = 4 + 9 = 13. c² = 4² = 16 > 13 => tompaszögű!',
        badge: '2-3-4',
        figure: (
          <svg viewBox="0 0 40 24" className="w-8 h-5">
            <polygon points="12,20 36,20 4,6" fill="#ffe4e6" stroke="#e11d48" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 'cp-s1-11',
        text: '5 cm, 5 cm, 8 cm',
        category: 'cat-obtuse',
        explanation: '5² + 5² = 25 + 25 = 50. c² = 8² = 64 > 50 => tompaszögű egyenlő szárú.',
        badge: '5-5-8',
        figure: (
          <svg viewBox="0 0 40 24" className="w-8 h-5">
            <polygon points="4,20 36,20 20,10" fill="#ffe4e6" stroke="#e11d48" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 'cp-s1-12',
        text: '3 cm, 5 cm, 7 cm',
        category: 'cat-obtuse',
        explanation: '3² + 5² = 9 + 25 = 34. c² = 7² = 49 > 34 => tompaszögű.',
        badge: '3-5-7',
        figure: (
          <svg viewBox="0 0 40 24" className="w-8 h-5">
            <polygon points="12,20 36,20 4,8" fill="#ffe4e6" stroke="#e11d48" strokeWidth="1" />
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Számhármasok Természete',
    subtitle: 'Különböztesd meg a primitív számhármasokat, többszöröseiket és a nem derékszögű hármasokat!',
    categories: [
      {
        id: 'cat-prim',
        name: 'Primitív Számhármas (lnko = 1)',
        description: 'Egész számhármas, a² + b² = c², és a számok relatív prímek',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-mult',
        name: 'Számhármas Többszöröse (k-szoros)',
        description: 'Primitív számhármas skaláris többszöröse (k · (a, b, c)), lnko > 1',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-non',
        name: 'Nem Derékszögű Számhármas',
        description: 'Nem teljesül rájuk az a² + b² = c² összefüggés',
        badgeColor: 'bg-slate-100 text-slate-900 border-slate-300'
      }
    ],
    items: [
      {
        id: 'cp-s2-1',
        text: '(3, 4, 5)',
        category: 'cat-prim',
        explanation: 'A legkisebb primitív pitagoraszi számhármas (lnko = 1).',
        badge: 'Alaphármas',
        figure: (
          <svg viewBox="0 0 40 20" className="w-8 h-4">
            <text x="20" y="14" className="text-[9px] font-black fill-amber-700" textAnchor="middle">3-4-5</text>
          </svg>
        )
      },
      {
        id: 'cp-s2-2',
        text: '(5, 12, 13)',
        category: 'cat-prim',
        explanation: 'Primitív pitagoraszi számhármas: 25 + 144 = 169 (lnko = 1).',
        badge: 'Primitív',
        figure: (
          <svg viewBox="0 0 40 20" className="w-8 h-4">
            <text x="20" y="14" className="text-[8px] font-bold fill-amber-700" textAnchor="middle">5-12-13</text>
          </svg>
        )
      },
      {
        id: 'cp-s2-3',
        text: '(8, 15, 17)',
        category: 'cat-prim',
        explanation: 'Primitív pitagoraszi számhármas: 64 + 225 = 289 (lnko = 1).',
        badge: 'Primitív',
        figure: (
          <svg viewBox="0 0 40 20" className="w-8 h-4">
            <text x="20" y="14" className="text-[8px] font-bold fill-amber-700" textAnchor="middle">8-15-17</text>
          </svg>
        )
      },
      {
        id: 'cp-s2-4',
        text: '(7, 24, 25)',
        category: 'cat-prim',
        explanation: 'Primitív pitagoraszi számhármas: 49 + 576 = 625 (lnko = 1).',
        badge: 'Primitív',
        figure: (
          <svg viewBox="0 0 40 20" className="w-8 h-4">
            <text x="20" y="14" className="text-[8px] font-bold fill-amber-700" textAnchor="middle">7-24-25</text>
          </svg>
        )
      },
      {
        id: 'cp-s2-5',
        text: '(6, 8, 10)',
        category: 'cat-mult',
        explanation: 'A (3, 4, 5) kétszerese: 2 · (3, 4, 5). lnko = 2.',
        badge: '2 · (3,4,5)',
        figure: (
          <svg viewBox="0 0 40 20" className="w-8 h-4">
            <text x="20" y="14" className="text-[8px] font-bold fill-emerald-700" textAnchor="middle">6-8-10</text>
          </svg>
        )
      },
      {
        id: 'cp-s2-6',
        text: '(9, 12, 15)',
        category: 'cat-mult',
        explanation: 'A (3, 4, 5) háromszorosa: 3 · (3, 4, 5). lnko = 3.',
        badge: '3 · (3,4,5)',
        figure: (
          <svg viewBox="0 0 40 20" className="w-8 h-4">
            <text x="20" y="14" className="text-[8px] font-bold fill-emerald-700" textAnchor="middle">9-12-15</text>
          </svg>
        )
      },
      {
        id: 'cp-s2-7',
        text: '(10, 24, 26)',
        category: 'cat-mult',
        explanation: 'Az (5, 12, 13) kétszerese: 2 · (5, 12, 13). lnko = 2.',
        badge: '2 · (5,12,13)',
        figure: (
          <svg viewBox="0 0 40 20" className="w-8 h-4">
            <text x="20" y="14" className="text-[8px] font-bold fill-emerald-700" textAnchor="middle">10-24-26</text>
          </svg>
        )
      },
      {
        id: 'cp-s2-8',
        text: '(30, 40, 50)',
        category: 'cat-mult',
        explanation: 'A (3, 4, 5) tízszerese: 10 · (3, 4, 5). lnko = 10.',
        badge: '10 · (3,4,5)',
        figure: (
          <svg viewBox="0 0 40 20" className="w-8 h-4">
            <text x="20" y="14" className="text-[8px] font-bold fill-emerald-700" textAnchor="middle">30-40-50</text>
          </svg>
        )
      },
      {
        id: 'cp-s2-9',
        text: '(4, 5, 6)',
        category: 'cat-non',
        explanation: '4² + 5² = 16 + 25 = 41 ≠ 6² = 36. Nem derékszögű!',
        badge: 'Nem derékszög',
        figure: (
          <svg viewBox="0 0 40 20" className="w-8 h-4">
            <text x="20" y="14" className="text-[8px] font-bold fill-slate-600" textAnchor="middle">4-5-6</text>
          </svg>
        )
      },
      {
        id: 'cp-s2-10',
        text: '(6, 7, 8)',
        category: 'cat-non',
        explanation: '6² + 7² = 36 + 49 = 85 ≠ 8² = 64. Nem derékszögű.',
        badge: 'Nem derékszög',
        figure: (
          <svg viewBox="0 0 40 20" className="w-8 h-4">
            <text x="20" y="14" className="text-[8px] font-bold fill-slate-600" textAnchor="middle">6-7-8</text>
          </svg>
        )
      },
      {
        id: 'cp-s2-11',
        text: '(1, 2, 3)',
        category: 'cat-non',
        explanation: '1 + 2 = 3 ≤ 3, tehát ez még csak háromszöget sem alkot!',
        badge: 'Elfajuló',
        figure: (
          <svg viewBox="0 0 40 20" className="w-8 h-4">
            <text x="20" y="14" className="text-[8px] font-bold fill-red-600" textAnchor="middle">1-2-3</text>
          </svg>
        )
      },
      {
        id: 'cp-s2-12',
        text: '(10, 15, 20)',
        category: 'cat-non',
        explanation: '10² + 15² = 100 + 225 = 325 ≠ 20² = 400. Nem derékszögű.',
        badge: 'Nem derékszög',
        figure: (
          <svg viewBox="0 0 40 20" className="w-8 h-4">
            <text x="20" y="14" className="text-[8px] font-bold fill-slate-600" textAnchor="middle">10-15-20</text>
          </svg>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Geometriai Állítások Igazságtartalma',
    subtitle: 'Döntsd el, hogy az állítások mindig igazak, csak derékszögű háromszögre igazak, vagy soha nem igazak!',
    categories: [
      {
        id: 'cat-all',
        name: 'Mindig Igaz (Alaptétel)',
        description: 'Minden érvényes síkbeli háromszögre teljesülő geometriai szabály',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-rightonly',
        name: 'Csak Derékszögűre Igaz',
        description: 'Kizárólag akkor teljesül, ha a háromszög egyik szöge pontosan 90°',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-nev',
        name: 'Soha Nem Igaz',
        description: 'Matematikai tévedés vagy lehetetlenség',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      {
        id: 'cp-s3-1',
        text: 'A háromszög belső szögeinek összege pontosan 180°',
        category: 'cat-all',
        explanation: 'Bármely síkbeli háromszögben α + β + γ = 180° mindig igaz.',
        badge: 'Belső szögek',
        figure: (
          <svg viewBox="0 0 40 20" className="w-8 h-4">
            <text x="20" y="14" className="text-[7.5px] font-bold fill-emerald-800" textAnchor="middle">180°</text>
          </svg>
        )
      },
      {
        id: 'cp-s3-2',
        text: 'Háromszög-egyenlőtlenség: a + b > c (c leghosszabb)',
        category: 'cat-all',
        explanation: 'Csak akkor szerkeszthető háromszög, ha a két rövidebb oldal összege nagyobb a leghosszabbnál.',
        badge: 'a + b > c',
        figure: (
          <svg viewBox="0 0 40 20" className="w-8 h-4">
            <text x="20" y="14" className="text-[7px] font-bold fill-emerald-800" textAnchor="middle">a + b &gt; c</text>
          </svg>
        )
      },
      {
        id: 'cp-s3-3',
        text: 'Ha a² + b² = c², akkor a háromszög derékszögű',
        category: 'cat-all',
        explanation: 'A Pitagorasz-tétel megfordítása minden háromszögre érvényes tény.',
        badge: 'Megfordítás',
        figure: (
          <svg viewBox="0 0 40 20" className="w-8 h-4">
            <text x="20" y="14" className="text-[7px] font-bold fill-emerald-800" textAnchor="middle">a²+b²=c²</text>
          </svg>
        )
      },
      {
        id: 'cp-s3-4',
        text: 'Pitagoraszi számhármas k-szorosa is derékszögű háromszöget ad',
        category: 'cat-all',
        explanation: 'A hasonlóság miatt bármely k > 0 szorzó esetén derékszögű háromszög marad.',
        badge: 'k-szoros',
        figure: (
          <svg viewBox="0 0 40 20" className="w-8 h-4">
            <text x="20" y="14" className="text-[7px] font-bold fill-emerald-800" textAnchor="middle">k·(a,b,c)</text>
          </svg>
        )
      },
      {
        id: 'cp-s3-5',
        text: 'A leghosszabb oldal négyzete egyenlő a másik kettő négyzetösszegével',
        category: 'cat-rightonly',
        explanation: 'Ez a feltétel (c² = a² + b²) kizárólag a derékszögű háromszögekre érvényes.',
        badge: 'Pitagorasz',
        figure: (
          <svg viewBox="0 0 40 20" className="w-8 h-4">
            <text x="20" y="14" className="text-[7px] font-bold fill-amber-800" textAnchor="middle">c² = a²+b²</text>
          </svg>
        )
      },
      {
        id: 'cp-s3-6',
        text: 'A két hegyesszög összege pontosan 90° (α + β = 90°)',
        category: 'cat-rightonly',
        explanation: 'Mivel γ = 90°, ezért α + β = 180° - 90° = 90°, ez csak derékszögű háromszögben igaz.',
        badge: 'Pótszögek',
        figure: (
          <svg viewBox="0 0 40 20" className="w-8 h-4">
            <text x="20" y="14" className="text-[7px] font-bold fill-amber-800" textAnchor="middle">α+β=90°</text>
          </svg>
        )
      },
      {
        id: 'cp-s3-7',
        text: 'A körülírt kör középpontja az átfogó felezőpontja',
        category: 'cat-rightonly',
        explanation: 'Thálész tétele szerint kizárólag derékszögű háromszögben esik a körülírt kör középpontja a leghosszabb oldal felezőpontjába.',
        badge: 'Thálész',
        figure: (
          <svg viewBox="0 0 40 20" className="w-8 h-4">
            <text x="20" y="14" className="text-[7px] font-bold fill-amber-800" textAnchor="middle">R = c/2</text>
          </svg>
        )
      },
      {
        id: 'cp-s3-8',
        text: 'A két rövidebb oldal egymásra merőleges magasságvonal',
        category: 'cat-rightonly',
        explanation: 'Csak derékszögű háromszögben egyeznek meg a befogók a másik befogóhoz tartozó magasságvonallal.',
        badge: 'Befogók',
        figure: (
          <svg viewBox="0 0 40 20" className="w-8 h-4">
            <text x="20" y="14" className="text-[7px] font-bold fill-amber-800" textAnchor="middle">ma = b</text>
          </svg>
        )
      },
      {
        id: 'cp-s3-9',
        text: 'Tompaszögű háromszögre is teljesül az a² + b² = c² egyenlőség',
        category: 'cat-nev',
        explanation: 'Tompaszögű háromszögben mindig a² + b² < c², egyenlőség soha nem állhat fenn.',
        badge: 'Képtelenség',
        figure: (
          <svg viewBox="0 0 40 20" className="w-8 h-4">
            <text x="20" y="14" className="text-[7px] font-bold fill-rose-700" textAnchor="middle">Tompa ≠ 90°</text>
          </svg>
        )
      },
      {
        id: 'cp-s3-10',
        text: 'Létezik olyan derékszögű háromszög, amelynek minden szöge hegyesszög',
        category: 'cat-nev',
        explanation: 'Ha derékszögű, az egyik szöge pontosan 90°, ami nem hegyesszög.',
        badge: 'Ellentmondás',
        figure: (
          <svg viewBox="0 0 40 20" className="w-8 h-4">
            <text x="20" y="14" className="text-[7px] font-bold fill-rose-700" textAnchor="middle">90° ≠ hegyes</text>
          </svg>
        )
      },
      {
        id: 'cp-s3-11',
        text: 'Bármilyen három pozitív számból megszerkeszthető egy háromszög',
        category: 'cat-nev',
        explanation: 'Csak akkor szerkeszthető háromszög, ha teljesül a háromszög-egyenlőtlenség (pl. 2, 3, 6-ból nem lehet).',
        badge: 'Tévedés',
        figure: (
          <svg viewBox="0 0 40 20" className="w-8 h-4">
            <text x="20" y="14" className="text-[7px] font-bold fill-rose-700" textAnchor="middle">a+b &le; c</text>
          </svg>
        )
      },
      {
        id: 'cp-s3-12',
        text: 'A négyzetgyök tagolható összeadásra: √(a² + b²) = a + b',
        category: 'cat-nev',
        explanation: 'A gyökvonás nem végezhető el tagonként: pl. √(9+16) = √25 = 5 ≠ 3+4 = 7.',
        badge: 'Algebr. hiba',
        figure: (
          <svg viewBox="0 0 40 20" className="w-8 h-4">
            <text x="20" y="14" className="text-[7px] font-bold fill-rose-700" textAnchor="middle">√ ≠ tagolható</text>
          </svg>
        )
      }
    ]
  }
};

export const ConversePythagorasSorter: React.FC<ConversePythagorasSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g8-pyth-converse-sorter',
  topicTitle = 'A Pitagorasz-tétel Megfordítása'
}) => {
  const currentConfig = sorterLevels[level] || sorterLevels[1];

  return (
    <SorterTemplate
      key={`sorter-lvl-${level}`}
      level={level}
      currentLevel={level}
      topicId={topicId}
      topicTitle={topicTitle}
      badge="8. Osztály • Pitagorasz-tétel"
      topicBadge="📐 3. Lecke • Pitagorasz-tétel Megfordítása"
      title={currentConfig.title}
      subtitle={currentConfig.subtitle}
      categories={currentConfig.categories}
      items={currentConfig.items}
      config={currentConfig}
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};

export default ConversePythagorasSorter;
