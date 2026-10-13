import React from 'react';
import { MatcherTemplate, MatcherPair } from '../MatcherTemplate';

interface TriangleSidesAnglesMatcherProps {
  level?: number;
  currentLevel?: number;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
}

// 1. SZINT: Belső és külső szögek alapszámításai
const level1Pairs: MatcherPair[] = [
  {
    id: 'l1-p1',
    prompt: 'Két belső szög: 40° és 60°',
    value: 'Harmadik szög = 80° (180° - 100°)',
    figure: (
      <svg viewBox="0 0 90 50" className="w-16 h-9">
        <polygon points="10,42 80,42 45,10" fill="none" className="stroke-teal-600 stroke-2" />
        <text x="22" y="38" className="text-[8px] font-bold fill-teal-700">40°</text>
        <text x="62" y="38" className="text-[8px] font-bold fill-teal-700">60°</text>
        <text x="45" y="22" textAnchor="middle" className="text-[8px] font-black fill-rose-600">?</text>
      </svg>
    )
  },
  {
    id: 'l1-p2',
    prompt: 'Derékszögű háromszög hegyesszöge: 35°',
    value: 'Másik hegyesszög = 55° (90° - 35°)',
    figure: (
      <svg viewBox="0 0 90 50" className="w-16 h-9">
        <polygon points="12,42 78,42 12,10" fill="none" className="stroke-blue-600 stroke-2" />
        <path d="M 12,35 L 19,35 L 19,42" fill="none" className="stroke-slate-500 stroke-1" />
        <text x="58" y="38" className="text-[8px] font-bold fill-blue-700">35°</text>
        <text x="18" y="22" className="text-[8px] font-black fill-rose-600">?</text>
      </svg>
    )
  },
  {
    id: 'l1-p3',
    prompt: 'Szabályos háromszög egy belső szöge',
    value: 'Pontosan 60° (180° : 3)',
    figure: (
      <svg viewBox="0 0 90 50" className="w-16 h-9">
        <polygon points="15,42 75,42 45,10" fill="none" className="stroke-amber-600 stroke-2" />
        <line x1="43" y1="40" x2="47" y2="44" className="stroke-amber-700 stroke-2" />
        <line x1="28" y1="24" x2="32" y2="28" className="stroke-amber-700 stroke-2" />
        <line x1="58" y1="28" x2="62" y2="24" className="stroke-amber-700 stroke-2" />
        <text x="45" y="28" textAnchor="middle" className="text-[8px] font-bold fill-amber-700">60°</text>
      </svg>
    )
  },
  {
    id: 'l1-p4',
    prompt: 'Belső szög = 70°',
    value: 'Mellette fekvő külső szög = 110°',
    figure: (
      <svg viewBox="0 0 90 50" className="w-16 h-9">
        <line x1="8" y1="40" x2="35" y2="40" className="stroke-slate-400 stroke-dasharray-[2,2] stroke-1" />
        <line x1="35" y1="40" x2="82" y2="40" className="stroke-teal-600 stroke-2" />
        <line x1="35" y1="40" x2="55" y2="10" className="stroke-teal-600 stroke-2" />
        <line x1="82" y1="40" x2="55" y2="10" className="stroke-teal-600 stroke-2" />
        <path d="M 23,40 A 12,12 0 0,1 42,28" fill="none" className="stroke-rose-600 stroke-[1.5]" />
        <text x="24" y="29" className="text-[8px] font-black fill-rose-600">110°</text>
      </svg>
    )
  },
  {
    id: 'l1-p5',
    prompt: 'Két nem mellette fekvő belső: 45° és 65°',
    value: 'Külső szög = 110° (45° + 65°)'
  },
  {
    id: 'l1-p6',
    prompt: 'Bármely háromszög 3 belső szögének összege',
    value: 'Mindig 180° (egyenesszög)'
  },
  {
    id: 'l1-p7',
    prompt: 'Háromszög 3 külső szögének összege',
    value: 'Mindig 360° (teljesszög)'
  },
  {
    id: 'l1-p8',
    prompt: 'Egyenlő szárú háromszög alapszöge = 50°',
    value: 'Szárszög = 80° (180° - 2 · 50°)',
    figure: (
      <svg viewBox="0 0 90 50" className="w-16 h-9">
        <polygon points="15,42 75,42 45,12" fill="none" className="stroke-indigo-600 stroke-2" />
        <line x1="28" y1="25" x2="32" y2="29" className="stroke-indigo-700 stroke-2" />
        <line x1="58" y1="29" x2="62" y2="25" className="stroke-indigo-700 stroke-2" />
        <text x="24" y="38" className="text-[7px] font-bold fill-indigo-700">50°</text>
        <text x="60" y="38" className="text-[7px] font-bold fill-indigo-700">50°</text>
      </svg>
    )
  }
];

// 2. SZINT: Háromszög-egyenlőtlenség és oldalak
const level2Pairs: MatcherPair[] = [
  {
    id: 'l2-p1',
    prompt: 'Oldalak: 3 cm, 4 cm, 8 cm',
    value: 'Nem szerkeszthető! (3 + 4 = 7 < 8 cm)',
    figure: (
      <svg viewBox="0 0 90 50" className="w-16 h-9">
        <line x1="10" y1="40" x2="80" y2="40" className="stroke-slate-700 stroke-2" />
        <line x1="10" y1="40" x2="32" y2="24" className="stroke-rose-600 stroke-2" />
        <line x1="80" y1="40" x2="52" y2="24" className="stroke-rose-600 stroke-2" />
        <line x1="32" y1="24" x2="52" y2="24" className="stroke-rose-400 stroke-dasharray-[2,2] stroke-1" />
        <text x="42" y="20" textAnchor="middle" className="text-[7px] font-bold fill-rose-600">3+4 &lt; 8</text>
      </svg>
    )
  },
  {
    id: 'l2-p2',
    prompt: 'Oldalak: 5 cm, 5 cm, 5 cm',
    value: 'Szerkeszthető: szabályos háromszög',
    figure: (
      <svg viewBox="0 0 90 50" className="w-16 h-9">
        <polygon points="15,42 75,42 45,10" fill="none" className="stroke-emerald-600 stroke-2" />
        <text x="45" y="47" textAnchor="middle" className="text-[7px] font-bold fill-emerald-700">5</text>
        <text x="26" y="25" className="text-[7px] font-bold fill-emerald-700">5</text>
        <text x="62" y="25" className="text-[7px] font-bold fill-emerald-700">5</text>
      </svg>
    )
  },
  {
    id: 'l2-p3',
    prompt: 'Oldalak: 6 cm, 8 cm, 10 cm',
    value: 'Szerkeszthető: derékszögű háromszög',
    figure: (
      <svg viewBox="0 0 90 50" className="w-16 h-9">
        <polygon points="15,42 75,42 15,12" fill="none" className="stroke-blue-600 stroke-2" />
        <path d="M 15,36 L 21,36 L 21,42" fill="none" className="stroke-slate-600 stroke-1" />
        <text x="45" y="48" textAnchor="middle" className="text-[7px] font-bold fill-blue-700">8</text>
        <text x="8" y="28" className="text-[7px] font-bold fill-blue-700">6</text>
        <text x="50" y="24" className="text-[7px] font-bold fill-blue-700">10</text>
      </svg>
    )
  },
  {
    id: 'l2-p4',
    prompt: 'Két oldal: 4 cm és 7 cm',
    value: 'Harmadik oldal: 3 cm < c < 11 cm'
  },
  {
    id: 'l2-p5',
    prompt: 'Oldalak: 2 cm, 5 cm, 7 cm',
    value: 'Nem háromszög! (2 + 5 = 7 cm, egyenesbe esik)',
    figure: (
      <svg viewBox="0 0 90 50" className="w-16 h-9">
        <line x1="8" y1="28" x2="82" y2="28" className="stroke-slate-700 stroke-2" />
        <circle cx="8" cy="28" r="2.5" className="fill-slate-800" />
        <circle cx="30" cy="28" r="2.5" className="fill-rose-600" />
        <circle cx="82" cy="28" r="2.5" className="fill-slate-800" />
        <text x="19" y="22" textAnchor="middle" className="text-[7px] font-bold fill-rose-600">2</text>
        <text x="56" y="22" textAnchor="middle" className="text-[7px] font-bold fill-rose-600">5</text>
        <text x="45" y="38" textAnchor="middle" className="text-[7px] font-bold fill-slate-600">7 cm</text>
      </svg>
    )
  },
  {
    id: 'l2-p6',
    prompt: 'Egyenlő szárú háromszög szárszöge = 40°',
    value: 'Alapszögek: 70° és 70° (140° : 2)',
    figure: (
      <svg viewBox="0 0 90 50" className="w-16 h-9">
        <polygon points="15,42 75,42 45,12" fill="none" className="stroke-teal-600 stroke-2" />
        <text x="45" y="22" textAnchor="middle" className="text-[8px] font-black fill-purple-700">40°</text>
        <text x="24" y="38" className="text-[7px] font-bold fill-teal-700">70°</text>
        <text x="60" y="38" className="text-[7px] font-bold fill-teal-700">70°</text>
      </svg>
    )
  },
  {
    id: 'l2-p7',
    prompt: 'Két oldal: 6 cm és 9 cm (legkisebb egész 3. oldal)',
    value: 'c = 4 cm (mert c > 9 - 6 = 3)'
  },
  {
    id: 'l2-p8',
    prompt: 'Két oldal: 6 cm és 9 cm (legnagyobb egész 3. oldal)',
    value: 'c = 14 cm (mert c < 6 + 9 = 15)'
  }
];

// 3. SZINT: Szemközti szögek és összetett arányok
const level3Pairs: MatcherPair[] = [
  {
    id: 'l3-p1',
    prompt: 'Belső szögek aránya: 1 : 2 : 3',
    value: '30°, 60°, 90° (derékszögű)',
    figure: (
      <svg viewBox="0 0 90 50" className="w-16 h-9">
        <polygon points="12,42 78,42 12,12" fill="none" className="stroke-indigo-600 stroke-2" />
        <text x="58" y="38" className="text-[8px] font-bold fill-indigo-700">30°</text>
        <text x="18" y="24" className="text-[8px] font-bold fill-indigo-700">60°</text>
      </svg>
    )
  },
  {
    id: 'l3-p2',
    prompt: 'Belső szögek aránya: 2 : 3 : 4',
    value: '40°, 60°, 80° (hegyesszögű)'
  },
  {
    id: 'l3-p3',
    prompt: 'Oldalak: a = 7 cm, b = 9 cm, c = 5 cm (legnagyobb szög)',
    value: 'β a legnagyobb szög (b = 9 cm-rel szemben)',
    figure: (
      <svg viewBox="0 0 90 50" className="w-16 h-9">
        <polygon points="10,42 80,42 60,12" fill="none" className="stroke-indigo-600 stroke-2" />
        <text x="45" y="47" textAnchor="middle" className="text-[7px] font-bold fill-slate-700">b = 9 (max)</text>
        <path d="M 54,18 A 8,8 0 0,0 66,16" fill="none" className="stroke-rose-600 stroke-2" />
        <text x="60" y="26" textAnchor="middle" className="text-[8px] font-black fill-rose-600">β</text>
      </svg>
    )
  },
  {
    id: 'l3-p4',
    prompt: 'Oldalak: a = 7 cm, b = 9 cm, c = 5 cm (legkisebb szög)',
    value: 'γ a legkisebb szög (c = 5 cm-rel szemben)'
  },
  {
    id: 'l3-p5',
    prompt: 'Külső szög = 130°, mellette lévő belső = ?',
    value: '50° (180° - 130° mellékszög)'
  },
  {
    id: 'l3-p6',
    prompt: 'Egyenlő szárú derékszögű háromszög szögei',
    value: '45°, 45°, 90°',
    figure: (
      <svg viewBox="0 0 90 50" className="w-16 h-9">
        <polygon points="15,42 65,42 15,12" fill="none" className="stroke-purple-600 stroke-2" />
        <line x1="38" y1="40" x2="42" y2="44" className="stroke-purple-700 stroke-2" />
        <line x1="13" y1="25" x2="17" y2="29" className="stroke-purple-700 stroke-2" />
        <text x="48" y="38" className="text-[7px] font-bold fill-purple-700">45°</text>
        <text x="22" y="22" className="text-[7px] font-bold fill-purple-700">45°</text>
      </svg>
    )
  },
  {
    id: 'l3-p7',
    prompt: 'Háromszög-egyenlőtlenség alaptétele',
    value: 'a + b > c minden oldalra (két rövidebb összege > leghosszabb)'
  },
  {
    id: 'l3-p8',
    prompt: 'Tompaszögű háromszög szögei',
    value: 'Pontosan 1 szög > 90°, a másik kettő hegyesszög',
    figure: (
      <svg viewBox="0 0 90 50" className="w-16 h-9">
        <polygon points="10,42 80,42 35,22" fill="none" className="stroke-rose-600 stroke-2" />
        <path d="M 30,30 A 10,10 0 0,0 42,26" fill="none" className="stroke-rose-600 stroke-[1.5]" />
        <text x="35" y="16" textAnchor="middle" className="text-[8px] font-black fill-rose-600">&gt; 90°</text>
      </svg>
    )
  }
];

export const TriangleSidesAnglesMatcher: React.FC<TriangleSidesAnglesMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory
}) => {
  const activeLvl = (currentLevel ?? level) as any;

  return (
    <MatcherTemplate
      level={activeLvl}
      currentLevel={activeLvl}
      title="2. Háromszög Oldalai és Szögei Párosító"
      subtitle="Találd meg a szögek, oldalak és a háromszög-egyenlőtlenség összetartozó párjait!"
      badge="PÁROSÍTÓ JÁTÉK"
      topicTitle="Háromszög Oldalai és Szögei"
      themeColor="indigo"
      grade={7}
      chapterId="geometria"
      topicId="g7-geom-triangle-inequality-matcher"
      level1Pairs={level1Pairs}
      level2Pairs={level2Pairs}
      level3Pairs={level3Pairs}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default TriangleSidesAnglesMatcher;
