import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PythagorasTheoremSorterProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: Számítási Műveletek a Pitagorasz-tételben',
    subtitle: 'Válogasd szét a feladatokat és kifejezéseket aszerint, hogy mit és hogyan számolunk!',
    categories: [
      {
        id: 'cat-hypo',
        name: 'Átfogó Számítása (c = ?)',
        description: 'Befogók négyzetösszegének négyzetgyöke (Összeadás!)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-leg',
        name: 'Befogó Számítása (a vagy b = ?)',
        description: 'Átfogó négyzetéből kivonjuk az ismert befogó négyzetét (Kivonás!)',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-area',
        name: 'Négyzetek és Területek (Ta, Tb, Tc)',
        description: 'Oldalakra emelt négyzetek területe és a tétel geometriai alakja',
        badgeColor: 'bg-orange-100 text-orange-900 border-orange-300'
      }
    ],
    items: [
      {
        id: 's1',
        label: 'Képlete: c = √(a² + b²)',
        category: 'cat-hypo',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-black fill-emerald-800" textAnchor="middle">c = √(a² + b²)</text>
          </svg>
        )
      },
      {
        id: 's2',
        label: 'Képlete: a = √(c² - b²)',
        category: 'cat-leg',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-black fill-amber-800" textAnchor="middle">a = √(c² - b²)</text>
          </svg>
        )
      },
      {
        id: 's3',
        label: 'Befogónégyzetek összege: Ta + Tb = Tc',
        category: 'cat-area',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-black fill-orange-800" textAnchor="middle">Ta + Tb = Tc</text>
          </svg>
        )
      },
      {
        id: 's4',
        label: 'a = 3 cm, b = 4 cm ⇒ keresett oldal c = 5 cm',
        category: 'cat-hypo',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <polygon points="20,10 20,34 50,34" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
            <text x="35" y="22" className="text-[7px] font-bold fill-emerald-700">c = 5</text>
          </svg>
        )
      },
      {
        id: 's5',
        label: 'c = 13 cm, a = 5 cm ⇒ b² = 169 - 25 = 144 ⇒ b = 12 cm',
        category: 'cat-leg',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7px] font-bold fill-amber-800" textAnchor="middle">169 - 25 = 144</text>
          </svg>
        )
      },
      {
        id: 's6',
        label: 'Ta = 9 cm², Tb = 16 cm² ⇒ Tc = 25 cm²',
        category: 'cat-area',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <rect x="20" y="14" width="14" height="14" fill="#fde68a" stroke="#d97706" strokeWidth="1" />
            <rect x="36" y="8" width="20" height="20" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 's7',
        label: 'a = 6 cm, b = 8 cm ⇒ c = √(36 + 64) = 10 cm',
        category: 'cat-hypo',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7px] font-bold fill-emerald-800" textAnchor="middle">√(36 + 64) = 10</text>
          </svg>
        )
      },
      {
        id: 's8',
        label: 'c = 25 cm, a = 24 cm ⇒ b = √(625 - 576) = 7 cm',
        category: 'cat-leg',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7px] font-bold fill-amber-800" textAnchor="middle">√(625 - 576) = 7</text>
          </svg>
        )
      },
      {
        id: 's9',
        label: 'Két nagy négyzet darabolásos átrendezése',
        category: 'cat-area',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <rect x="15" y="8" width="22" height="22" fill="#fffbeb" stroke="#d97706" strokeWidth="1" />
            <rect x="43" y="8" width="22" height="22" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 's10',
        label: 'A gyökjel alatt mindig ÖSSZEADÁS szerepel',
        category: 'cat-hypo',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-extrabold fill-emerald-700" textAnchor="middle">+ (Összeadás)</text>
          </svg>
        )
      },
      {
        id: 's11',
        label: 'A gyökjel alatt mindig KIVONÁS szerepel (c² - ...)',
        category: 'cat-leg',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-extrabold fill-amber-700" textAnchor="middle">- (Kivonás)</text>
          </svg>
        )
      },
      {
        id: 's12',
        label: 'Átfogó négyzete: Tc = c²',
        category: 'cat-area',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <rect x="28" y="10" width="24" height="24" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.5" />
            <text x="40" y="24" className="text-[7px] font-black fill-emerald-950" textAnchor="middle">Tc = c²</text>
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Számhármasok és Oldalhosszúságok Típusa',
    subtitle: 'Csoportosítsd az oldalakat és számhármasokat a kapott eredmény jellege szerint!',
    categories: [
      {
        id: 'cat-triple',
        name: 'Egész Pitagoraszi Számhármas',
        description: 'Mindhárom oldal egész szám (a² + b² = c² maradéktalanul)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-irrational',
        name: 'Irracionális / Gyökös Eredmény',
        description: 'Nem négyzetszám a négyzetösszeg, az átfogó pontos gyök alakban marad',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300'
      },
      {
        id: 'cat-impossible',
        name: 'Nem Derékszögű / Hibás Adat',
        description: 'Nem derékszögű háromszög vagy háromszög-egyenlőtlenséget sért',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      {
        id: 's13',
        label: 'Oldalai: 3 cm, 4 cm, 5 cm',
        category: 'cat-triple',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[8px] font-black fill-emerald-800" textAnchor="middle">3 - 4 - 5</text>
          </svg>
        )
      },
      {
        id: 's14',
        label: 'a = 1 cm, b = 1 cm ⇒ c = √2 ≈ 1,41 cm',
        category: 'cat-irrational',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[8px] font-bold fill-sky-800" textAnchor="middle">c = √2</text>
          </svg>
        )
      },
      {
        id: 's15',
        label: 'Oldalai: 2 cm, 3 cm, 6 cm (2 + 3 < 6)',
        category: 'cat-impossible',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-bold fill-rose-700" textAnchor="middle">Nem alkot 3szöget ❌</text>
          </svg>
        )
      },
      {
        id: 's16',
        label: 'Oldalai: 5 cm, 12 cm, 13 cm',
        category: 'cat-triple',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[8px] font-black fill-emerald-800" textAnchor="middle">5 - 12 - 13</text>
          </svg>
        )
      },
      {
        id: 's17',
        label: 'a = 2 cm, b = 3 cm ⇒ c = √(4 + 9) = √13 cm',
        category: 'cat-irrational',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[8px] font-bold fill-sky-800" textAnchor="middle">c = √13</text>
          </svg>
        )
      },
      {
        id: 's18',
        label: 'Oldalai: 4 cm, 5 cm, 6 cm (16 + 25 = 41 ≠ 36)',
        category: 'cat-impossible',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-bold fill-rose-700" textAnchor="middle">Hegyesszögű ❌</text>
          </svg>
        )
      },
      {
        id: 's19',
        label: 'Oldalai: 8 cm, 15 cm, 17 cm',
        category: 'cat-triple',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[8px] font-black fill-emerald-800" textAnchor="middle">8 - 15 - 17</text>
          </svg>
        )
      },
      {
        id: 's20',
        label: 'a = 4 cm, b = 4 cm ⇒ c = √32 = 4√2 cm',
        category: 'cat-irrational',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[8px] font-bold fill-sky-800" textAnchor="middle">c = 4√2</text>
          </svg>
        )
      },
      {
        id: 's21',
        label: 'Oldalai: 3 cm, 4 cm, 6 cm (9 + 16 = 25 < 36)',
        category: 'cat-impossible',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-bold fill-rose-700" textAnchor="middle">Tompaszögű ❌</text>
          </svg>
        )
      },
      {
        id: 's22',
        label: 'Oldalai: 6 cm, 8 cm, 10 cm (3-4-5 kétszerese)',
        category: 'cat-triple',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[8px] font-black fill-emerald-800" textAnchor="middle">6 - 8 - 10</text>
          </svg>
        )
      },
      {
        id: 's23',
        label: 'a = 1 cm, b = 2 cm ⇒ c = √(1 + 4) = √5 cm',
        category: 'cat-irrational',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[8px] font-bold fill-sky-800" textAnchor="middle">c = √5</text>
          </svg>
        )
      },
      {
        id: 's24',
        label: 'Befogó hosszabb, mint az átfogó (a = 10, c = 8)',
        category: 'cat-impossible',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-bold fill-rose-700" textAnchor="middle">a &gt; c képtelenség ❌</text>
          </svg>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Geometriai Állítások és Tulajdonságok',
    subtitle: 'Döntsd el, hogy az állítás mindig igaz, csak speciális derékszögű háromszögre igaz, vagy téves!',
    categories: [
      {
        id: 'cat-always',
        name: 'Minden Derékszögű Háromszögre Igaz',
        description: 'Általános geometriai törvény és azonosság',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-special',
        name: 'Csak Egyenlő Szárú Derékszögűre Igaz',
        description: 'Kizárólag akkor teljesül, ha a két befogó egyenlő (a = b, 45°-45°-90°)',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-never',
        name: 'Soha Nem Igaz / Geometriai Hiba',
        description: 'Matematikai tévedés, képtelenség',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      {
        id: 's25',
        label: 'A befogók négyzetösszege egyenlő az átfogó négyzetével: a² + b² = c²',
        category: 'cat-always',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-black fill-emerald-800" textAnchor="middle">a² + b² = c²</text>
          </svg>
        )
      },
      {
        id: 's26',
        label: 'Az átfogó hossza a befogó √2-szerese: c = a · √2',
        category: 'cat-special',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-bold fill-amber-800" textAnchor="middle">c = a√2</text>
          </svg>
        )
      },
      {
        id: 's27',
        label: 'A két befogó hosszának összege egyenlő az átfogóval: a + b = c',
        category: 'cat-never',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-bold fill-rose-700" textAnchor="middle">a + b = c ❌</text>
          </svg>
        )
      },
      {
        id: 's28',
        label: 'Az átfogó szigorúan hosszabb bármelyik befogónál (c > a és c > b)',
        category: 'cat-always',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-bold fill-emerald-800" textAnchor="middle">c &gt; a és c &gt; b</text>
          </svg>
        )
      },
      {
        id: 's29',
        label: 'A két befogóra rajzolt négyzet területe teljesen egyenlő: Ta = Tb',
        category: 'cat-special',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-bold fill-amber-800" textAnchor="middle">Ta = Tb (a = b)</text>
          </svg>
        )
      },
      {
        id: 's30',
        label: 'Befogó számításakor a négyzeteket össze kell adni: a = √(c² + b²)',
        category: 'cat-never',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-bold fill-rose-700" textAnchor="middle">√(c² + b²) ❌ Kivonás!</text>
          </svg>
        )
      },
      {
        id: 's31',
        label: 'A körülírt kör sugara az átfogó fele: R = c / 2',
        category: 'cat-always',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-bold fill-emerald-800" textAnchor="middle">R = c / 2</text>
          </svg>
        )
      },
      {
        id: 's32',
        label: 'A két hegyesszög pontosan 45°-os (α = β = 45°)',
        category: 'cat-special',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-bold fill-amber-800" textAnchor="middle">α = β = 45°</text>
          </svg>
        )
      },
      {
        id: 's33',
        label: 'Tompaszögű háromszögben is érvényes az a² + b² = c²',
        category: 'cat-never',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-bold fill-rose-700" textAnchor="middle">Csak 90°-nál! ❌</text>
          </svg>
        )
      },
      {
        id: 's34',
        label: 'A háromszög területe a befogók szorzatának fele: T = (a · b) / 2',
        category: 'cat-always',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-bold fill-emerald-800" textAnchor="middle">T = (a · b) / 2</text>
          </svg>
        )
      },
      {
        id: 's35',
        label: 'A háromszög területe felírható úgy is, mint a² / 2',
        category: 'cat-special',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-bold fill-amber-800" textAnchor="middle">T = a² / 2</text>
          </svg>
        )
      },
      {
        id: 's36',
        label: 'A Pitagorasz-tétel minden általános háromszögre igaz',
        category: 'cat-never',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-bold fill-rose-700" textAnchor="middle">Csak derékszögűre! ❌</text>
          </svg>
        )
      }
    ]
  }
};

export const PythagorasTheoremSorter: React.FC<PythagorasTheoremSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  topicId = 'g8-pyth-theorem-sorter',
  topicTitle = 'A Pitagorasz-tétel Csoportosító'
}) => {
  const currentConfig = sorterLevels[level] || sorterLevels[1];

  return (
    <SorterTemplate
      key={`sorter-lvl-${level}`}
      level={level}
      currentLevel={level}
      categories={currentConfig.categories}
      items={currentConfig.items}
      config={currentConfig}
      levels={sorterLevels}
      title={currentConfig.title}
      subtitle={currentConfig.subtitle}
      badge="8. Osztály • Pitagorasz-tétel"
      topicBadge="📐 2. Lecke • A Pitagorasz-tétel"
      topicTitle={topicTitle}
      topicId={topicId}
      chapterId="pitagorasz-tetel"
      grade={8}
      themeColor="orange"
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
    />
  );
};
