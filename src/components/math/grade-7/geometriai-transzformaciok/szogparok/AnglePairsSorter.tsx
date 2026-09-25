import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface AnglePairsSorterProps {
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
    title: '1. Szint: Szögpárok alapvető tulajdonságai és viszonya',
    subtitle: 'Válogasd szét a szögpárokat aszerint, hogy milyen összefüggés áll fenn közöttük!',
    categories: [
      {
        id: 'cat-equal',
        name: 'Mindig egyenlők (α = β)',
        description: 'A szögpár tagjai azonos nagyságúak',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-supplementary',
        name: 'Összegük 180° (Egyenesszög)',
        description: 'A két szög összege pontosan 180°',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-complementary',
        name: 'Összegük 90° (Derékszög)',
        description: 'A két szög összege pontosan 90°',
        badgeColor: 'bg-sky-100 text-sky-800 border-sky-300'
      }
    ],
    items: [
      {
        id: 's1',
        label: 'Csúcsszögek',
        category: 'cat-equal',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="8" y1="24" x2="52" y2="4" stroke="#94a3b8" strokeWidth="1.2" />
            <line x1="8" y1="4" x2="52" y2="24" stroke="#94a3b8" strokeWidth="1.2" />
            <circle cx="30" cy="14" r="2" fill="#d97706" />
            <text x="14" y="16" className="text-[6px] font-bold fill-amber-700">α</text>
            <text x="42" y="16" className="text-[6px] font-bold fill-amber-700">α</text>
          </svg>
        )
      },
      {
        id: 's2',
        label: 'Mellékszögek',
        category: 'cat-supplementary',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="6" y1="22" x2="54" y2="22" stroke="#94a3b8" strokeWidth="1.2" />
            <line x1="30" y1="22" x2="45" y2="6" stroke="#d97706" strokeWidth="1.5" />
            <circle cx="30" cy="22" r="2" fill="#d97706" />
            <text x="36" y="19" className="text-[5px] font-bold fill-amber-700">α</text>
            <text x="20" y="19" className="text-[5px] font-bold fill-sky-700">β</text>
          </svg>
        )
      },
      {
        id: 's3',
        label: 'Pótszögek',
        category: 'cat-complementary',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="15" y1="24" x2="45" y2="24" stroke="#94a3b8" strokeWidth="1.2" />
            <line x1="15" y1="24" x2="15" y2="4" stroke="#94a3b8" strokeWidth="1.2" />
            <line x1="15" y1="24" x2="40" y2="9" stroke="#0284c7" strokeWidth="1.5" />
            <text x="25" y="18" className="text-[6px] font-bold fill-sky-700">90°</text>
          </svg>
        )
      },
      {
        id: 's4',
        label: 'Kiegészítő szögek',
        category: 'cat-supplementary',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="8" y1="20" x2="52" y2="20" stroke="#0284c7" strokeWidth="1.5" />
            <path d="M 22 20 A 8 8 0 0 1 38 20" fill="none" stroke="#0284c7" strokeWidth="1.2" />
            <text x="23" y="14" className="text-[6px] font-bold fill-sky-700">180°</text>
          </svg>
        )
      },
      {
        id: 's5',
        label: 'Derékszögű háromszög két hegyesszöge',
        category: 'cat-complementary',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="12,22 48,22 12,6" fill="none" stroke="#16a34a" strokeWidth="1.2" />
            <rect x="12" y="17" width="5" height="5" fill="none" stroke="#16a34a" strokeWidth="1" />
            <text x="38" y="20" className="text-[5px] font-bold fill-emerald-700">α</text>
            <text x="15" y="11" className="text-[5px] font-bold fill-emerald-700">β</text>
          </svg>
        )
      },
      {
        id: 's6',
        label: 'Két metsző egyenes szemközti szögei',
        category: 'cat-equal',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="10" y1="24" x2="50" y2="4" stroke="#94a3b8" strokeWidth="1.2" />
            <line x1="10" y1="4" x2="50" y2="24" stroke="#94a3b8" strokeWidth="1.2" />
            <circle cx="30" cy="14" r="1.5" fill="#10b981" />
            <text x="27" y="7" className="text-[5px] font-bold fill-emerald-700">β</text>
            <text x="27" y="24" className="text-[5px] font-bold fill-emerald-700">β</text>
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Párhuzamosokat metsző egyenes szögpárjai',
    subtitle: 'Sorold be az alakzatokat és leírásokat az Egyállású, Váltószög vagy Társszög kategóriába!',
    categories: [
      {
        id: 'cat-corr',
        name: 'Egyállású szögek (F-alak)',
        description: 'Azonos oldali, egyirányú szárak; egyenlő nagyságúak (α = β)',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-alt',
        name: 'Váltószögek (Z-alak)',
        description: 'Ellentétes oldali, ellentétes irányú szárak; egyenlők (α = β)',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-cons',
        name: 'Társszögek (C-alak)',
        description: 'Azonos oldali belső szögek; összegük 180° (α + β = 180°)',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      }
    ],
    items: [
      {
        id: 's7',
        label: 'A metsző azonos oldalán, azonos irányba néző szárak',
        category: 'cat-corr',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="5" y1="8" x2="55" y2="8" stroke="#0284c7" strokeWidth="1" />
            <line x1="5" y1="20" x2="55" y2="20" stroke="#0284c7" strokeWidth="1" />
            <line x1="18" y1="26" x2="42" y2="2" stroke="#d97706" strokeWidth="1.2" />
            <text x="36" y="7" className="text-[5px] font-bold fill-amber-700">F</text>
          </svg>
        )
      },
      {
        id: 's8',
        label: 'A metsző ellentétes oldalán, egymással szemközti belső szögek',
        category: 'cat-alt',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="5" y1="8" x2="55" y2="8" stroke="#0284c7" strokeWidth="1" />
            <line x1="5" y1="20" x2="55" y2="20" stroke="#0284c7" strokeWidth="1" />
            <line x1="20" y1="20" x2="40" y2="8" stroke="#16a34a" strokeWidth="1.5" />
            <text x="28" y="15" className="text-[5px] font-bold fill-emerald-700">Z</text>
          </svg>
        )
      },
      {
        id: 's9',
        label: 'A metsző azonos oldalán lévő belső szögek (C- vagy U-alak)',
        category: 'cat-cons',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="5" y1="8" x2="55" y2="8" stroke="#0284c7" strokeWidth="1" />
            <line x1="5" y1="20" x2="55" y2="20" stroke="#0284c7" strokeWidth="1" />
            <line x1="18" y1="26" x2="42" y2="2" stroke="#8b5cf6" strokeWidth="1.2" />
            <text x="25" y="15" className="text-[5px] font-bold fill-purple-700">C</text>
          </svg>
        )
      },
      {
        id: 's10',
        label: 'Párhuzamos eltolással pontosan fedésbe hozhatók',
        category: 'cat-corr',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <text x="12" y="16" className="text-[6px] font-bold fill-amber-700">eltolás ⟹ egyenlő</text>
          </svg>
        )
      },
      {
        id: 's11',
        label: 'Középpontos tükrözéssel pontosan fedésbe hozhatók',
        category: 'cat-alt',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <text x="10" y="16" className="text-[6px] font-bold fill-emerald-700">tükrözés ⟹ egyenlő</text>
          </svg>
        )
      },
      {
        id: 's12',
        label: 'Trapéz száron fekvő belső szögei',
        category: 'cat-cons',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="10,22 50,22 42,6 18,6" fill="none" stroke="#7c3aed" strokeWidth="1.2" />
            <text x="14" y="20" className="text-[5px] font-bold fill-purple-700">α</text>
            <text x="20" y="11" className="text-[5px] font-bold fill-purple-700">δ</text>
          </svg>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Szögméretek párosítása és számítása',
    subtitle: 'Állapítsd meg, hogy a megadott szögpár hiányzó tagja hegyesszög, tompaszög vagy derékszög!',
    categories: [
      {
        id: 'cat-acute-pair',
        name: 'Hegyesszög (< 90°)',
        description: 'A keresett szög 0° és 90° közé esik',
        badgeColor: 'bg-sky-100 text-sky-800 border-sky-300'
      },
      {
        id: 'cat-obtuse-pair',
        name: 'Tompaszög (> 90°)',
        description: 'A keresett szög 90° és 180° közé esik',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-right-pair',
        name: 'Derékszög (= 90°)',
        description: 'A keresett szög pontosan 90°',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      }
    ],
    items: [
      {
        id: 's13',
        label: '40° mellékszöge (140°)',
        category: 'cat-obtuse-pair',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <text x="14" y="16" className="text-[6px] font-bold fill-amber-700">180° - 40° = 140°</text>
          </svg>
        )
      },
      {
        id: 's14',
        label: '35° pótszöge (55°)',
        category: 'cat-acute-pair',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <text x="16" y="16" className="text-[6px] font-bold fill-sky-700">90° - 35° = 55°</text>
          </svg>
        )
      },
      {
        id: 's15',
        label: '110° mellékszöge (70°)',
        category: 'cat-acute-pair',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <text x="14" y="16" className="text-[6px] font-bold fill-sky-700">180° - 110° = 70°</text>
          </svg>
        )
      },
      {
        id: 's16',
        label: '90° kiegészítő szöge (90°)',
        category: 'cat-right-pair',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <text x="15" y="16" className="text-[6px] font-bold fill-emerald-700">180° - 90° = 90°</text>
          </svg>
        )
      },
      {
        id: 's17',
        label: '25° kiegészítő szöge (155°)',
        category: 'cat-obtuse-pair',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <text x="14" y="16" className="text-[6px] font-bold fill-amber-700">180° - 25° = 155°</text>
          </svg>
        )
      },
      {
        id: 's18',
        label: '75° pótszöge (15°)',
        category: 'cat-acute-pair',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <text x="16" y="16" className="text-[6px] font-bold fill-sky-700">90° - 75° = 15°</text>
          </svg>
        )
      }
    ]
  },
  4: {
    title: '4. Szint: Merőleges szárú szögpárok',
    subtitle: 'Válogasd szét a merőleges szárú szögpárokat az egymáshoz való viszonyuk alapján!',
    categories: [
      {
        id: 'cat-perp-equal',
        name: 'Egyenlők (α = β)',
        description: 'Azonos típusú szögek (mindkettő hegyes vagy mindkettő tompa)',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-perp-supp',
        name: 'Összegük 180° (α + β = 180°)',
        description: 'Különböző típusúak (egyik hegyesszög, másik tompaszög)',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-perp-none',
        name: 'Nincs törvényszerű kapcsolat',
        description: 'Nem merőleges szárak vagy független szögek',
        badgeColor: 'bg-slate-100 text-slate-700 border-slate-300'
      }
    ],
    items: [
      {
        id: 's19',
        label: 'Két hegyesszög, melyek szárai páronként merőlegesek',
        category: 'cat-perp-equal',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <text x="8" y="16" className="text-[6px] font-bold fill-emerald-700">hegyes + hegyes ⟹ α=β</text>
          </svg>
        )
      },
      {
        id: 's20',
        label: 'Két tompaszög, melyek szárai páronként merőlegesek',
        category: 'cat-perp-equal',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <text x="8" y="16" className="text-[6px] font-bold fill-emerald-700">tompa + tompa ⟹ α=β</text>
          </svg>
        )
      },
      {
        id: 's21',
        label: 'Egy hegyesszög és egy tompaszög páronként merőleges szárakkal',
        category: 'cat-perp-supp',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <text x="6" y="16" className="text-[6px] font-bold fill-amber-700">hegyes + tompa ⟹ 180°</text>
          </svg>
        )
      },
      {
        id: 's22',
        label: 'Két szög, melyek szárai nem merőlegesek egymásra',
        category: 'cat-perp-none',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <text x="14" y="16" className="text-[6px] font-bold fill-slate-500">nincs merőlegesség</text>
          </svg>
        )
      },
      {
        id: 's23',
        label: '70°-os és 110°-os szög páronként merőleges szárakkal',
        category: 'cat-perp-supp',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <text x="10" y="16" className="text-[6px] font-bold fill-amber-700">70° + 110° = 180°</text>
          </svg>
        )
      },
      {
        id: 's24',
        label: 'Két 45°-os hegyesszög páronként merőleges szárakkal',
        category: 'cat-perp-equal',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <text x="14" y="16" className="text-[6px] font-bold fill-emerald-700">45° = 45° (egyenlők)</text>
          </svg>
        )
      }
    ]
  },
  5: {
    title: '5. Szint: Sokszögek és Tétel-alkalmazások',
    subtitle: 'Melyik síkidomra vagy alaptételre vonatkoznak az alábbi állítások?',
    categories: [
      {
        id: 'cat-triangle',
        name: 'Háromszög szögösszefüggései',
        description: 'Belső szögek összege 180°, külső szög tétel',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-parallelogram',
        name: 'Paralelogramma szögei',
        description: 'Szemközti szögek egyenlők, szomszédosak összege 180°',
        badgeColor: 'bg-sky-100 text-sky-800 border-sky-300'
      },
      {
        id: 'cat-trapezoid',
        name: 'Trapéz száron fekvő szögei',
        description: 'A száron fekvő szögek társszögek (összegük 180°)',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      }
    ],
    items: [
      {
        id: 's25',
        label: 'A külső szög egyenlő a két nem szomszédos belső szög összegével',
        category: 'cat-triangle',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="12,22 45,22 30,6" fill="none" stroke="#16a34a" strokeWidth="1.2" />
            <line x1="45" y1="22" x2="55" y2="22" stroke="#94a3b8" strokeWidth="1" />
            <text x="47" y="19" className="text-[5px] font-bold fill-emerald-700">α'</text>
          </svg>
        )
      },
      {
        id: 's26',
        label: 'A szomszédos szögek összege 180°, mert a szemközti oldalak párhuzamosak',
        category: 'cat-parallelogram',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="10,22 40,22 50,6 20,6" fill="none" stroke="#0284c7" strokeWidth="1.2" />
            <text x="14" y="20" className="text-[5px] font-bold fill-sky-700">α</text>
            <text x="36" y="20" className="text-[5px] font-bold fill-amber-700">β</text>
          </svg>
        )
      },
      {
        id: 's27',
        label: 'A szemközti szögek egyenlők a középpontos szimmetria miatt',
        category: 'cat-parallelogram',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="10,22 40,22 50,6 20,6" fill="none" stroke="#0284c7" strokeWidth="1.2" />
            <text x="14" y="20" className="text-[5px] font-bold fill-sky-700">α</text>
            <text x="44" y="9" className="text-[5px] font-bold fill-sky-700">α</text>
          </svg>
        )
      },
      {
        id: 's28',
        label: 'Kizárólag az egy-egy száron fekvő szögek összege 180°',
        category: 'cat-trapezoid',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="10,22 50,22 42,6 18,6" fill="none" stroke="#7c3aed" strokeWidth="1.2" />
            <text x="14" y="20" className="text-[5px] font-bold fill-purple-700">α</text>
            <text x="20" y="11" className="text-[5px] font-bold fill-purple-700">δ</text>
          </svg>
        )
      },
      {
        id: 's29',
        label: 'A belső szögek összege 180°, amit a csúcson átmenő párhuzamos bizonyít',
        category: 'cat-triangle',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="12,22 48,22 30,8" fill="none" stroke="#16a34a" strokeWidth="1.2" />
            <line x1="12" y1="8" x2="48" y2="8" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1" />
            <text x="22" y="18" className="text-[5px] font-bold fill-emerald-700">180°</text>
          </svg>
        )
      },
      {
        id: 's30',
        label: 'Ha az egy száron fekvő szögek egyenlők, akkor húrtrapézról van szó',
        category: 'cat-trapezoid',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="10,22 50,22 42,6 18,6" fill="none" stroke="#7c3aed" strokeWidth="1.2" />
            <line x1="30" y1="4" x2="30" y2="24" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1" />
            <text x="14" y="20" className="text-[5px] font-bold fill-purple-700">α</text>
            <text x="44" y="20" className="text-[5px] font-bold fill-purple-700">α</text>
          </svg>
        )
      }
    ]
  }
};

export const AnglePairsSorter: React.FC<AnglePairsSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g7-geom-angle-pairs',
  topicTitle = '7. Szögpárok'
}) => {
  return (
    <SorterTemplate
      key={`sorter-ap-${level}`}
      level={level}
      currentLevel={level}
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      badge="7. OSZTÁLY • GEOMETRIA"
      title="Szögpárok Csoportosító"
      subtitle="Válogasd szét a szögpárokat tulajdonságaik, összegeik és geometriai elhelyezkedésük szerint!"
      colorScheme="amber"
    />
  );
};

export default AnglePairsSorter;
