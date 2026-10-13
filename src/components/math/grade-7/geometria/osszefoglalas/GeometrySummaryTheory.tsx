import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  GeometryFigureCard,
  GeometryFigureGrid,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  Shapes,
  Triangle,
  Square,
  Box,
  Ruler,
  Calculator,
  Compass,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  HelpCircle,
  Eye,
  RotateCcw,
  Check,
  X
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';

interface GeometrySummaryTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

type ShapeTab = 'triangle' | 'parallelogram' | 'trapezoid' | 'deltoid' | 'prism' | 'euler';

export const GeometrySummaryTheory: React.FC<GeometrySummaryTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive Lab state
  const [selectedShape, setSelectedShape] = useState<ShapeTab>('triangle');
  const [triBase, setTriBase] = useState(8);
  const [triHeight, setTriHeight] = useState(5);
  const [paralBase, setParalBase] = useState(10);
  const [paralHeight, setParalHeight] = useState(6);
  const [trapA, setTrapA] = useState(12);
  const [trapC, setTrapC] = useState(6);
  const [trapM, setTrapM] = useState(5);
  const [prismTa, setPrismTa] = useState(24);
  const [prismHeight, setPrismHeight] = useState(10);
  const [eulerN, setEulerN] = useState(6); // n-sided prism or pyramid

  // Mini quiz state
  const [quiz1Answer, setQuiz1Answer] = useState<number | null>(null);
  const [quiz2Answer, setQuiz2Answer] = useState<number | null>(null);
  const [quiz3Answer, setQuiz3Answer] = useState<number | null>(null);

  return (
    <TheoryTemplate
      title="12. Geometria összefoglalás"
      subtitle="A 7. osztályos geometria teljes áttekintése: szerkesztések, szögek, sokszögek, mértékegységek, síkidomok területe és hasábok térfogata"
      badgeText="7. OSZTÁLY • VII. GEOMETRIA • 🏆 12. ÖSSZEFOGLALÁS"
      quickRule={{
        label: 'Fő képlettár & alapszabályok',
        formula: 'T_{\\triangle} = \\frac{a \\cdot m_a}{2} \\quad • \\quad T_{\\text{paral}} = a \\cdot m_a \\quad • \\quad T_{\\text{trap}} = \\frac{a+c}{2} m \\quad • \\quad V_{\\text{hasáb}} = T_a \\cdot M \\quad • \\quad C + L = E + 2'
      }}
      topicId="g7-geom-summary"
      chapterId="geometria"
      grade={7}
      themeColor="rose"
      estimatedReadTime="18 perc"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* FONTOS SZABÁLYOK ÉS ALAPTÉTELEK KIEMELT KÁRTYÁI */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-50 via-pink-50 to-amber-50 dark:from-slate-800 dark:via-slate-850 dark:to-slate-800 border-2 border-rose-300 dark:border-rose-700/80 shadow-xs mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-md bg-rose-600 text-white text-[11px] font-black uppercase tracking-wider">
            Fontos szabályok & Alaptételek
          </span>
          <span className="text-xs font-semibold text-rose-950 dark:text-rose-200">
            A VII. Geometria fejezet 6 legfontosabb aranyszabálya
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <div className="bg-white/80 dark:bg-slate-900/80 p-3 rounded-xl border border-rose-200 dark:border-slate-700">
            <span className="font-bold text-rose-700 dark:text-rose-400 block mb-1">1. Háromszög-egyenlőtlenség & Szögek:</span>
            <p className="text-slate-700 dark:text-slate-300">
              Bármely két oldal összege nagyobb a harmadiknál: <MathText text="$a + b > c$" />.<br />
              A belső szögek összege mindig <MathText text="$180^\circ$" />.
            </p>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 p-3 rounded-xl border border-rose-200 dark:border-slate-700">
            <span className="font-bold text-pink-700 dark:text-pink-400 block mb-1">2. Sokszögek átlói & szögösszege:</span>
            <p className="text-slate-700 dark:text-slate-300">
              <MathText text="$n$" />-oldalú sokszög belső szögösszege: <MathText text="$S_n = (n-2) \\cdot 180^\circ$" />.<br />
              Összes átló: <MathText text="$d_n = \\frac{n(n-3)}{2}$" />. Külső szögek összege: <MathText text="$360^\circ$" />.
            </p>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 p-3 rounded-xl border border-rose-200 dark:border-slate-700">
            <span className="font-bold text-amber-700 dark:text-amber-400 block mb-1">3. Mértékegység-váltó szabályok:</span>
            <p className="text-slate-700 dark:text-slate-300">
              Területnél <MathText text="$100$" />-as a váltószám (<MathText text="$1\\text{ ha} = 100\\text{ a} = 10\\,000\\text{ m}^2$" />).<br />
              Térfogatnál <MathText text="$1000$" />-es a váltószám (<MathText text="$1\\text{ dm}^3 = 1\\text{ liter}$" />).
            </p>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 p-3 rounded-xl border border-rose-200 dark:border-slate-700">
            <span className="font-bold text-emerald-700 dark:text-emerald-400 block mb-1">4. Háromszög és Paralelogramma területe:</span>
            <p className="text-slate-700 dark:text-slate-300">
              <MathText text="$T_{\\text{paral}} = a \\cdot m_a = b \\cdot m_b$" />.<br />
              A háromszög a paralelogramma fele: <MathText text="$T_{\\triangle} = \\frac{a \\cdot m_a}{2}$" />.
            </p>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 p-3 rounded-xl border border-rose-200 dark:border-slate-700">
            <span className="font-bold text-blue-700 dark:text-blue-400 block mb-1">5. Trapéz és Deltoid területe:</span>
            <p className="text-slate-700 dark:text-slate-300">
              Trapéz: <MathText text="$T = \\frac{a+c}{2} \\cdot m = k \\cdot m$" /> (középvonal × magasság).<br />
              Deltoid & rombusz: <MathText text="$T = \\frac{e \\cdot f}{2}$" /> (átlók szorzata per 2).
            </p>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 p-3 rounded-xl border border-rose-200 dark:border-slate-700">
            <span className="font-bold text-violet-700 dark:text-violet-400 block mb-1">6. Hasábok & Euler-tétel:</span>
            <p className="text-slate-700 dark:text-slate-300">
              <MathText text="$V = T_a \\cdot M$" />, <MathText text="$A = 2T_a + T_p$" /> (ahol <MathText text="$T_p = K_a \\cdot M$" />).<br />
              Poliéderekre: <MathText text="$C + L = E + 2$" /> (Csúcsok + Lapok = Élek + 2).
            </p>
          </div>
        </div>
      </div>

      {/* 1. SZAKASZ: HÁROMSZÖGEK ÉS SZERKESZTÉSEK */}
      <TheorySection
        title="1. Háromszögek egybevágósága és alaptulajdonságai"
        subtitle="Szerkesztési alapesetek, háromszög-egyenlőtlenség és nevezetes vonalak"
        badge="Síkgeometria"
        badgeColor="blue"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <TheoryCard
            title="A 4 Egybevágósági Alapeset"
            subtitle="Mikor egybevágó két háromszög?"
            icon={<Triangle className="w-5 h-5 text-blue-600" />}
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              Két háromszög egybevágó (<MathText text="$\\triangle_1 \\cong \\triangle_2$" />), ha páronként egyenlő:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-700 dark:text-slate-300">
              <li><strong>(ooo) Három oldal:</strong> mindhárom oldaluk páronként megegyezik.</li>
              <li><strong>(sos) Két oldal és közbezárt szög:</strong> két oldal és az általuk bezárt szög azonos.</li>
              <li><strong>(oso) Egy oldal és a rajta fekvő két szög:</strong> egy oldal és a rajta lévő mindkét szög egyenlő.</li>
              <li><strong>(oss) Két oldal és a nagyobbikkal szemközti szög:</strong> két oldal és a hosszabbikkal szemközti szög egyezik meg.</li>
            </ul>
          </TheoryCard>

          <TheoryCard
            title="Oldalak és Szögek Összefüggései"
            subtitle="Egyenlőtlenség és szögösszeg"
            icon={<Shapes className="w-5 h-5 text-indigo-600" />}
          >
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <li className="p-2 rounded-lg bg-blue-50/60 dark:bg-slate-800">
                <strong>Háromszög-egyenlőtlenség:</strong> Csak akkor szerkeszthető háromszög, ha a két rövidebb oldal összege szigorúan nagyobb a leghosszabbnál:
                <div className="font-bold text-center mt-1 text-blue-700 dark:text-blue-300">
                  <MathText text="$a + b > c, \\quad a + c > b, \\quad b + c > a$" />
                </div>
              </li>
              <li className="p-2 rounded-lg bg-indigo-50/60 dark:bg-slate-800">
                <strong>Szögtételek:</strong>
                <div>• Belső szögek: <MathText text="$\\alpha + \\beta + \\gamma = 180^\circ$" />.</div>
                <div>• Külső szög tétele: <MathText text="$\\alpha' = \\beta + \\gamma$" /> (bármely külső szög egyenlő a két nem mellette fekvő belső szög összegével).</div>
                <div>• Hosszabb oldallal szemben mindig nagyobb belső szög fekszik!</div>
              </li>
            </ul>
          </TheoryCard>
        </div>

        {/* Geometry figure grid for triangle lines */}
        <GeometryFigureGrid columns={3}>
          <GeometryFigureCard
            title="Magasságvonalak"
            subtitle="Merőleges a szemközti oldalegyenesre"
            badge="m_a, m_b, m_c"
            figure={
              <svg viewBox="0 0 100 80" className="w-28 h-20">
                <polygon points="15,65 85,65 40,15" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
                <line x1="40" y1="15" x2="40" y2="65" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="2 2" />
                {/* Hungarian right angle notation: circular arc + dot */}
                <path d="M 40 55 A 10 10 0 0 1 50 65" fill="none" stroke="#dc2626" strokeWidth="1.2" />
                <circle cx="44" cy="61" r="1.3" fill="#dc2626" />
                <text x="43" y="42" className="text-[8px] font-bold fill-red-600">m_a</text>
                <text x="50" y="75" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">a alap</text>
              </svg>
            }
          >
            A magasságvonalak egyetlen közös pontban (a magasságpontban) metszik egymást.
          </GeometryFigureCard>

          <GeometryFigureCard
            title="Súlyvonalak"
            subtitle="Csúcsot az oldalfelezővel köti össze"
            badge="s_a, s_b, s_c"
            figure={
              <svg viewBox="0 0 100 80" className="w-28 h-20">
                <polygon points="15,65 85,65 40,15" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
                <line x1="40" y1="15" x2="50" y2="65" stroke="#ea580c" strokeWidth="1.5" />
                <circle cx="50" cy="65" r="2" fill="#ea580c" />
                <text x="50" y="75" textAnchor="middle" className="text-[7.5px] font-bold fill-slate-700">F_a felezőpont</text>
                <text x="48" y="40" className="text-[8px] font-bold fill-orange-700">s_a</text>
              </svg>
            }
          >
            A súlyvonalak felezik a háromszög területét, és a súlypont 2:1 arányban osztja őket.
          </GeometryFigureCard>

          <GeometryFigureCard
            title="Szögfelezők"
            subtitle="Belső szöget két egyenlő részre bont"
            badge="f_α, f_β, f_γ"
            figure={
              <svg viewBox="0 0 100 80" className="w-28 h-20">
                <polygon points="15,65 85,65 40,15" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
                <line x1="15" y1="65" x2="55" y2="35" stroke="#9333ea" strokeWidth="1.5" strokeDasharray="3 2" />
                <text x="24" y="60" className="text-[7px] font-bold fill-purple-700">α/2</text>
                <text x="35" y="45" className="text-[8px] font-bold fill-purple-700">f_α</text>
              </svg>
            }
          >
            A belső szögfelezők metszéspontja a beírt kör középpontja.
          </GeometryFigureCard>
        </GeometryFigureGrid>
      </TheorySection>

      {/* 2. SZAKASZ: SOKSZÖGEK ÁTLÓI ÉS SZÖGEI */}
      <TheorySection
        title="2. Sokszögek átlói és belső/külső szögei"
        subtitle="Az n-oldalú konvex sokszög képletei"
        badge="Sokszögek"
        badgeColor="purple"
      >
        <TheoryTable
          headers={['Tulajdonság', 'Képlet', '3-szög (n=3)', '4-szög (n=4)', '5-szög (n=5)', '6-szög (n=6)', 'n-szög']}
          rows={[
            ['1 csúcsból húzható átlók', 'n - 3', '0', '1', '2', '3', 'n - 3'],
            ['3-szögekre bontás száma', 'n - 2', '1', '2', '3', '4', 'n - 2'],
            ['Összes átlók száma', 'n(n-3)/2', '0', '2', '5', '9', 'n(n - 3) / 2'],
            ['Belső szögek összege', '(n - 2) · 180°', '180°', '360°', '540°', '720°', '(n - 2) · 180°'],
            ['Szabályos sokszög 1 szöge', '(n - 2)·180° / n', '60°', '90°', '108°', '120°', '(n - 2)·180° / n'],
            ['Külső szögek összege', '360° (állandó)', '360°', '360°', '360°', '360°', '360°']
          ]}
        />

        <div className="mt-4 p-3.5 rounded-xl bg-purple-50 dark:bg-slate-800/80 border border-purple-200 dark:border-purple-800 text-xs">
          <strong className="text-purple-800 dark:text-purple-300 block mb-1">
            Gyakori típusfeladat: Hány oldalú a sokszög, ha az átlói száma 20?
          </strong>
          <p className="text-slate-700 dark:text-slate-300">
            Képletből: <MathText text="$\\frac{n(n-3)}{2} = 20 \\implies n(n-3) = 40$" />. Két olyan egész számot keresünk, amelyek különbsége 3, szorzatuk 40: ez a <MathText text="$8 \\cdot 5 = 40$" />. Tehát a sokszög <strong>nyolcszög</strong> (<MathText text="$n = 8$" />)!
          </p>
        </div>
      </TheorySection>

      {/* 3. SZAKASZ: MÉRTÉKEGYSÉGEK RENDSZERE */}
      <TheorySection
        title="3. Mértékegység-váltások és összefüggések"
        subtitle="Hosszúság, terület és térfogat mértékegységeinek aranyhídja"
        badge="Mértékegységek"
        badgeColor="cyan"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 rounded-xl bg-cyan-50/70 dark:bg-slate-800 border border-cyan-200 dark:border-cyan-800">
            <h4 className="font-bold text-cyan-900 dark:text-cyan-300 mb-2 flex items-center gap-2 text-sm">
              <Ruler className="w-4 h-4 text-cyan-600" />
              Területmértékek (100-as váltószám)
            </h4>
            <div className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
              <div className="flex items-center justify-between p-1.5 bg-white dark:bg-slate-900 rounded-md">
                <span><MathText text="$1\\text{ cm}^2 = 100\\text{ mm}^2$" /></span>
                <span className="text-slate-400">× 100</span>
              </div>
              <div className="flex items-center justify-between p-1.5 bg-white dark:bg-slate-900 rounded-md">
                <span><MathText text="$1\\text{ dm}^2 = 100\\text{ cm}^2$" /></span>
                <span className="text-slate-400">× 100</span>
              </div>
              <div className="flex items-center justify-between p-1.5 bg-white dark:bg-slate-900 rounded-md">
                <span><MathText text="$1\\text{ m}^2 = 100\\text{ dm}^2 = 10\\,000\\text{ cm}^2$" /></span>
                <span className="text-slate-400">× 100</span>
              </div>
              <div className="flex items-center justify-between p-1.5 bg-cyan-100/60 dark:bg-cyan-950/40 rounded-md font-semibold text-cyan-900 dark:text-cyan-200">
                <span>Mezőgazdasági: <MathText text="$1\\text{ a} = 100\\text{ m}^2$" />, <MathText text="$1\\text{ ha} = 100\\text{ a} = 10\\,000\\text{ m}^2$" /></span>
              </div>
              <div className="flex items-center justify-between p-1.5 bg-white dark:bg-slate-900 rounded-md">
                <span><MathText text="$1\\text{ km}^2 = 100\\text{ ha} = 1\\,000\\,000\\text{ m}^2$" /></span>
                <span className="text-slate-400">× 100</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-slate-800 border border-blue-200 dark:border-blue-800">
            <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2 flex items-center gap-2 text-sm">
              <Box className="w-4 h-4 text-blue-600" />
              Térfogatmértékek (1000-es váltószám) & Liter
            </h4>
            <div className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
              <div className="flex items-center justify-between p-1.5 bg-blue-100/60 dark:bg-blue-950/40 rounded-md font-bold text-blue-900 dark:text-blue-200">
                <span>A legfontosabb aranyhíd: <MathText text="$1\\text{ dm}^3 = 1\\text{ liter}$" /></span>
              </div>
              <div className="flex items-center justify-between p-1.5 bg-white dark:bg-slate-900 rounded-md">
                <span><MathText text="$1\\text{ cm}^3 = 1\\text{ ml} = 0{,}001\\text{ liter}$" /></span>
                <span className="text-slate-400">1:1</span>
              </div>
              <div className="flex items-center justify-between p-1.5 bg-white dark:bg-slate-900 rounded-md">
                <span><MathText text="$1\\text{ m}^3 = 1000\\text{ dm}^3 = 1000\\text{ liter} = 10\\text{ hl}$" /></span>
                <span className="text-slate-400">× 1000</span>
              </div>
              <div className="flex items-center justify-between p-1.5 bg-white dark:bg-slate-900 rounded-md">
                <span><MathText text="$1\\text{ liter} = 10\\text{ dl} = 100\\text{ cl} = 1000\\text{ ml}$" /></span>
                <span className="text-slate-400">× 10</span>
              </div>
              <div className="flex items-center justify-between p-1.5 bg-white dark:bg-slate-900 rounded-md">
                <span><MathText text="$1\\text{ hl} = 100\\text{ liter} = 100\\text{ dm}^3$" /></span>
                <span className="text-slate-400">× 100</span>
              </div>
            </div>
          </div>
        </div>

        <TheoryTrapBox
          title="Típushiba: A négyzet és köb hatványok elfelejtése!"
          trap="Ha 1 m = 10 dm, akkor 1 m² = 10 dm²? Vagy 1 m³ = 10 dm³?"
          solution="SOHA NE feledd a hatványt! Ha a hossznál 10 a váltószám: területnél 10² = 100, térfogatnál 10³ = 1000 a szorzó! Tehát 1 m² = 100 dm², 1 m³ = 1000 dm³!"
        />
      </TheorySection>

      {/* 4. SZAKASZ: SÍKIDOMOK TERÜLETSZÁMÍTÁSA */}
      <TheorySection
        title="4. Síkidomok területszámítása – Képtár és Képlettár"
        subtitle="Háromszög, paralelogramma, rombusz, trapéz és deltoid"
        badge="Területszámítás"
        badgeColor="emerald"
      >
        <GeometryFigureGrid columns={2}>
          <GeometryFigureCard
            title="Paralelogramma és Rombusz"
            subtitle="Alap szorozva a hozzá tartozó magassággal"
            badge="T = a · m_a = b · m_b"
            figure={
              <svg viewBox="0 0 120 75" className="w-32 h-20">
                <polygon points="25,55 85,55 105,20 45,20" fill="#d1fae5" stroke="#059669" strokeWidth="1.5" />
                <line x1="45" y1="20" x2="45" y2="55" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="2 2" />
                {/* Hungarian right angle: arc + dot */}
                <path d="M 45 46 A 9 9 0 0 1 54 55" fill="none" stroke="#dc2626" strokeWidth="1.2" />
                <circle cx="49" cy="51" r="1.2" fill="#dc2626" />
                <text x="49" y="38" className="text-[7.5px] font-bold fill-red-600">m_a</text>
                <text x="55" y="65" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">a alap</text>
                <text x="28" y="36" className="text-[7.5px] font-bold fill-slate-700">b</text>
              </svg>
            }
          >
            <div>• <strong>Paralelogramma:</strong> <MathText text="$T = a \\cdot m_a = b \\cdot m_b$" />.</div>
            <div>• <strong>Rombusz:</strong> <MathText text="$T = a \\cdot m = \\frac{e \\cdot f}{2}$" /> (mivel átlói merőlegesek!).</div>
          </GeometryFigureCard>

          <GeometryFigureCard
            title="Háromszög Területe"
            subtitle="Alap × magasság / 2"
            badge="T = (a · m_a) / 2"
            figure={
              <svg viewBox="0 0 120 75" className="w-32 h-20">
                <polygon points="15,60 95,60 55,15" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
                <line x1="55" y1="15" x2="55" y2="60" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="2 2" />
                <path d="M 55 51 A 9 9 0 0 1 64 60" fill="none" stroke="#dc2626" strokeWidth="1.2" />
                <circle cx="59" cy="56" r="1.2" fill="#dc2626" />
                <text x="59" y="38" className="text-[7.5px] font-bold fill-red-600">m_a</text>
                <text x="55" y="70" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">a alap</text>
              </svg>
            }
          >
            <div>• <strong>Általános háromszög:</strong> <MathText text="$T = \\frac{a \\cdot m_a}{2} = \\frac{b \\cdot m_b}{2} = \\frac{c \\cdot m_c}{2}$" />.</div>
            <div>• <strong>Derékszögű háromszög:</strong> <MathText text="$T = \\frac{a \\cdot b}{2}$" /> (két befogó szorzatának fele!).</div>
          </GeometryFigureCard>

          <GeometryFigureCard
            title="Trapéz Területe"
            subtitle="Középvonal × magasság = (a + c)/2 · m"
            badge="T = ((a + c)/2) · m"
            figure={
              <svg viewBox="0 0 120 75" className="w-32 h-20">
                <polygon points="15,55 95,55 75,20 35,20" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
                <line x1="35" y1="20" x2="35" y2="55" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="2 2" />
                <path d="M 35 46 A 9 9 0 0 1 44 55" fill="none" stroke="#dc2626" strokeWidth="1.2" />
                <circle cx="39" cy="51" r="1.2" fill="#dc2626" />
                <text x="39" y="38" className="text-[7.5px] font-bold fill-red-600">m</text>
                <text x="55" y="15" textAnchor="middle" className="text-[7.5px] font-bold fill-slate-700">c fedőlap</text>
                <text x="55" y="66" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">a alaplap</text>
                {/* Középvonal */}
                <line x1="25" y1="37.5" x2="85" y2="37.5" stroke="#16a34a" strokeWidth="1.2" strokeDasharray="3 2" />
                <text x="90" y="39" className="text-[6.5px] font-bold fill-green-700">k</text>
              </svg>
            }
          >
            <div>• Két párhuzamos oldal összege per 2 szorozva a magassággal: <MathText text="$T = \\frac{a+c}{2} \\cdot m$" />.</div>
            <div>• Középvonal hossza: <MathText text="$k = \\frac{a+c}{2}$" /> ⟹ <MathText text="$T = k \\cdot m$" />.</div>
          </GeometryFigureCard>

          <GeometryFigureCard
            title="Deltoid Területe"
            subtitle="Merőleges átlók szorzatának fele"
            badge="T = (e · f) / 2"
            figure={
              <svg viewBox="0 0 120 75" className="w-32 h-20">
                <polygon points="55,10 85,35 55,65 25,35" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
                <line x1="55" y1="10" x2="55" y2="65" stroke="#9d174d" strokeWidth="1.2" />
                <line x1="25" y1="35" x2="85" y2="35" stroke="#9d174d" strokeWidth="1.2" />
                {/* Hungarian right angle notation */}
                <path d="M 55 27 A 8 8 0 0 1 63 35" fill="none" stroke="#9d174d" strokeWidth="1" />
                <circle cx="58.5" cy="31.5" r="1.1" fill="#9d174d" />
                <text x="58" y="22" className="text-[7px] font-bold fill-pink-800">e</text>
                <text x="70" y="32" className="text-[7px] font-bold fill-pink-800">f</text>
              </svg>
            }
          >
            <div>• Minden olyan négyszögre érvényes, amelynek átlói merőlegesek (<MathText text="$e \\perp f$" />): deltoid, rombusz, négyzet.</div>
            <div>• Képlete: <MathText text="$T = \\frac{e \\cdot f}{2}$" />.</div>
          </GeometryFigureCard>
        </GeometryFigureGrid>
      </TheorySection>

      {/* 5. SZAKASZ: TÉRGEOMETRIA, HASÁBOK ÉS EULER-TÉTEL */}
      <TheorySection
        title="5. Térgeometria, hasábok és az Euler-féle poliédertétel"
        subtitle="Felszín, térfogat és térszemléleti összefüggések"
        badge="Térgeometria"
        badgeColor="amber"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <TheoryCard
            title="Egyenes Hasábok Felszíne és Térfogata"
            subtitle="Általános testképletek"
            icon={<Box className="w-5 h-5 text-amber-600" />}
          >
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <li className="p-2 rounded-lg bg-amber-50/60 dark:bg-slate-800">
                <strong>Térfogat (V):</strong> Alapterület szorozva a testmagassággal:
                <div className="font-bold text-center mt-1 text-amber-700 dark:text-amber-300">
                  <MathText text="$V = T_a \\cdot M$" />
                </div>
              </li>
              <li className="p-2 rounded-lg bg-orange-50/60 dark:bg-slate-800">
                <strong>Felszín (A):</strong> Két alaplap plusz az oldallapok (palást):
                <div className="font-bold text-center mt-1 text-orange-700 dark:text-orange-300">
                  <MathText text="$A = 2 \\cdot T_a + T_p = 2 \\cdot T_a + K_a \\cdot M$" />
                </div>
                ahol a palást területe az alapsokszög kerületének és a magasságnak a szorzata: <MathText text="$T_p = K_a \\cdot M$" />.
              </li>
            </ul>
          </TheoryCard>

          <TheoryCard
            title="Euler-féle Poliédertétel"
            subtitle="Konvex testek csúcsai, lapjai és élei"
            icon={<Layers className="w-5 h-5 text-violet-600" />}
          >
            <div className="p-3 bg-violet-50/70 dark:bg-slate-800 rounded-xl border border-violet-200 dark:border-violet-800 mb-2">
              <div className="text-center font-black text-sm text-violet-800 dark:text-violet-300 mb-1">
                <MathText text="$C + L = E + 2$" />
              </div>
              <div className="text-center text-[11px] text-slate-600 dark:text-slate-400">
                Csúcsok száma (<MathText text="$C$" />) + Lapok száma (<MathText text="$L$" />) = Élek száma (<MathText text="$E$" />) + 2
              </div>
            </div>

            <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
              <div>• <strong>n-oldalú hasáb:</strong> <MathText text="$C = 2n, \\quad L = n + 2, \\quad E = 3n$" /></div>
              <div>• <strong>n-oldalú gúla:</strong> <MathText text="$C = n + 1, \\quad L = n + 1, \\quad E = 2n$" /></div>
              <div>• Kockára ellenőrzés: <MathText text="$8 + 6 = 12 + 2 \\implies 14 = 14$" /> ✓</div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6. SZAKASZ: INTERAKTÍV ÖSSZEFOGLALÓ KÉPLETLABOR */}
      <TheorySection
        title="6. Interaktív Képlet- és Testlaboratórium"
        subtitle="Válassz síkidomot vagy testet, állítsd a méreteket, és figyeld a számítás lépéseit!"
        badge="Interaktív Labor"
        badgeColor="rose"
      >
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          {/* Tab selector buttons */}
          <div className="flex flex-wrap gap-2 mb-5">
            {[
              { id: 'triangle', label: 'Háromszög (T)', icon: Triangle },
              { id: 'parallelogram', label: 'Paralelogramma (T)', icon: Square },
              { id: 'trapezoid', label: 'Trapéz (T)', icon: Shapes },
              { id: 'deltoid', label: 'Deltoid / Rombusz', icon: Compass },
              { id: 'prism', label: 'Hasáb (V, A)', icon: Box },
              { id: 'euler', label: 'Euler-tétel (C, L, E)', icon: Layers }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedShape(tab.id as ShapeTab)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedShape === tab.id
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab contents */}
          {selectedShape === 'triangle' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 flex justify-between">
                    <span>a alap: {triBase} cm</span>
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="20"
                    value={triBase}
                    onChange={e => setTriBase(Number(e.target.value))}
                    className="w-full accent-rose-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 flex justify-between">
                    <span>m_a magasság: {triHeight} cm</span>
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="15"
                    value={triHeight}
                    onChange={e => setTriHeight(Number(e.target.value))}
                    className="w-full accent-rose-600"
                  />
                </div>
              </div>
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-slate-800/80 border border-rose-200 dark:border-rose-800 text-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Kiszámított terület
                </span>
                <div className="text-2xl font-black text-rose-600 mb-2">
                  <MathText text={`T = \\frac{${triBase} \\cdot ${triHeight}}{2} = ${(triBase * triHeight) / 2}\\text{ cm}^2`} />
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Képlet: <MathText text="$T = \\frac{a \\cdot m_a}{2}$" />. Ha derékszögű a háromszög, az a és b befogók felelnek meg az alapnak és magasságnak.
                </p>
              </div>
            </div>
          )}

          {selectedShape === 'parallelogram' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 flex justify-between">
                    <span>a alap: {paralBase} cm</span>
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="20"
                    value={paralBase}
                    onChange={e => setParalBase(Number(e.target.value))}
                    className="w-full accent-rose-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 flex justify-between">
                    <span>m_a magasság: {paralHeight} cm</span>
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="15"
                    value={paralHeight}
                    onChange={e => setParalHeight(Number(e.target.value))}
                    className="w-full accent-rose-600"
                  />
                </div>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-slate-800/80 border border-emerald-200 dark:border-emerald-800 text-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Kiszámított terület
                </span>
                <div className="text-2xl font-black text-emerald-600 mb-2">
                  <MathText text={`T = ${paralBase} \\cdot ${paralHeight} = ${paralBase * paralHeight}\\text{ cm}^2`} />
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Képlet: <MathText text="$T = a \\cdot m_a$" />. Figyelj arra, hogy mindig az adott oldalhoz tartozó merőleges magassággal szorozz!
                </p>
              </div>
            </div>
          )}

          {selectedShape === 'trapezoid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 flex justify-between">
                    <span>a hosszabb alap: {trapA} cm</span>
                  </label>
                  <input
                    type="range"
                    min="4"
                    max="24"
                    value={trapA}
                    onChange={e => setTrapA(Number(e.target.value))}
                    className="w-full accent-rose-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 flex justify-between">
                    <span>c rövidebb fedőlap: {trapC} cm</span>
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="16"
                    value={trapC}
                    onChange={e => setTrapC(Number(e.target.value))}
                    className="w-full accent-rose-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 flex justify-between">
                    <span>m magasság: {trapM} cm</span>
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="12"
                    value={trapM}
                    onChange={e => setTrapM(Number(e.target.value))}
                    className="w-full accent-rose-600"
                  />
                </div>
              </div>
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-slate-800/80 border border-blue-200 dark:border-blue-800 text-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Középvonal & Terület
                </span>
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Középvonal: <MathText text={`k = \\frac{${trapA} + ${trapC}}{2} = ${(trapA + trapC) / 2}\\text{ cm}`} />
                </div>
                <div className="text-2xl font-black text-blue-600 mb-2">
                  <MathText text={`T = ${(trapA + trapC) / 2} \\cdot ${trapM} = ${((trapA + trapC) / 2) * trapM}\\text{ cm}^2`} />
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Képlet: <MathText text="$T = \\frac{a+c}{2} \\cdot m = k \\cdot m$" />.
                </p>
              </div>
            </div>
          )}

          {selectedShape === 'deltoid' && (
            <div className="p-4 rounded-xl bg-pink-50 dark:bg-slate-800/80 border border-pink-200 dark:border-pink-800 text-center">
              <span className="text-xs font-bold text-pink-700 dark:text-pink-300 block mb-1">
                Merőleges átlójú négyszögek képlete
              </span>
              <div className="text-xl font-black text-pink-600 mb-2">
                <MathText text="$T = \\frac{e \\cdot f}{2}$" />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
                Példa: Ha egy deltoid átlói <MathText text="$e = 12\\text{ cm}$" /> és <MathText text="$f = 7\\text{ cm}$" />, akkor a területe:
                <br />
                <span className="font-bold text-pink-700 dark:text-pink-300">
                  <MathText text="$T = \\frac{12 \\cdot 7}{2} = \\frac{84}{2} = 42\\text{ cm}^2$" />
                </span>.
                Ugyanez a képlet használható a rombuszra és a négyzetre is!
              </p>
            </div>
          )}

          {selectedShape === 'prism' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 flex justify-between">
                    <span>T_a alapterület: {prismTa} cm²</span>
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="60"
                    value={prismTa}
                    onChange={e => setPrismTa(Number(e.target.value))}
                    className="w-full accent-rose-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 flex justify-between">
                    <span>M testmagasság: {prismHeight} cm</span>
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="25"
                    value={prismHeight}
                    onChange={e => setPrismHeight(Number(e.target.value))}
                    className="w-full accent-rose-600"
                  />
                </div>
              </div>
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-slate-800/80 border border-amber-200 dark:border-amber-800 text-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Kiszámított térfogat
                </span>
                <div className="text-2xl font-black text-amber-600 mb-2">
                  <MathText text={`V = ${prismTa} \\cdot ${prismHeight} = ${prismTa * prismHeight}\\text{ cm}^3`} />
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Képlet: <MathText text="$V = T_a \\cdot M$" />. Bármilyen egyenes hasáb térfogata az alaplap területének és a testmagasságnak a szorzata!
                </p>
              </div>
            </div>
          )}

          {selectedShape === 'euler' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                  Alapsokszög oldalszáma (n = {eulerN}):
                </label>
                <input
                  type="range"
                  min="3"
                  max="12"
                  value={eulerN}
                  onChange={e => setEulerN(Number(e.target.value))}
                  className="w-full accent-violet-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-violet-50 dark:bg-slate-800 border border-violet-200 text-xs">
                  <span className="font-bold text-violet-800 dark:text-violet-300 block mb-1">
                    {eulerN}-oldalú Hasáb adatai:
                  </span>
                  <div>• Csúcsok: <MathText text={`C = 2n = ${2 * eulerN}`} /></div>
                  <div>• Lapok: <MathText text={`L = n + 2 = ${eulerN + 2}`} /></div>
                  <div>• Élek: <MathText text={`E = 3n = ${3 * eulerN}`} /></div>
                  <div className="mt-1 font-bold text-violet-700 dark:text-violet-400">
                    Euler-ellenőrzés: {2 * eulerN} + {eulerN + 2} = {3 * eulerN} + 2 ({3 * eulerN + 2} = {3 * eulerN + 2}) ✓
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-indigo-50 dark:bg-slate-800 border border-indigo-200 text-xs">
                  <span className="font-bold text-indigo-800 dark:text-indigo-300 block mb-1">
                    {eulerN}-oldalú Gúla adatai:
                  </span>
                  <div>• Csúcsok: <MathText text={`C = n + 1 = ${eulerN + 1}`} /></div>
                  <div>• Lapok: <MathText text={`L = n + 1 = ${eulerN + 1}`} /></div>
                  <div>• Élek: <MathText text={`E = 2n = ${2 * eulerN}`} /></div>
                  <div className="mt-1 font-bold text-indigo-700 dark:text-indigo-400">
                    Euler-ellenőrzés: {eulerN + 1} + {eulerN + 1} = {2 * eulerN} + 2 ({2 * eulerN + 2} = {2 * eulerN + 2}) ✓
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </TheorySection>

      {/* 7. SZAKASZ: GYORS ÖNELLENŐRZŐ MINI-KVÍZ */}
      <TheorySection
        title="7. Gyors önellenőrzés – Kész vagy az összefoglaló kvízre?"
        subtitle="3 gyors kérdés a legfontosabb témakörökből"
        badge="Önellenőrzés"
        badgeColor="rose"
      >
        <div className="space-y-4">
          {/* Question 1 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
            <h5 className="font-bold text-sm text-slate-800 dark:text-white mb-2">
              1. Egy háromszög alapja 10 cm, magassága 6 cm. Mekkora a területe?
            </h5>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {[
                { label: '60 cm²', correct: false },
                { label: '30 cm²', correct: true },
                { label: '16 cm²', correct: false },
                { label: '15 cm²', correct: false }
              ].map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuiz1Answer(idx)}
                  className={`p-2 rounded-lg font-bold transition-all ${
                    quiz1Answer === idx
                      ? opt.correct
                        ? 'bg-emerald-500 text-white'
                        : 'bg-rose-500 text-white'
                      : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {quiz1Answer !== null && (
              <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                {quiz1Answer === 1 ? '✓ Helyes! T = (10 · 6) / 2 = 30 cm².' : '✗ Nem. A háromszög területe a paralelogramma fele: T = (a · m) / 2 = 30 cm²!'}
              </div>
            )}
          </div>

          {/* Question 2 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
            <h5 className="font-bold text-sm text-slate-800 dark:text-white mb-2">
              2. Hány átlója van egy konvex hatszögnek (n = 6)?
            </h5>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {[
                { label: '6 átló', correct: false },
                { label: '18 átló', correct: false },
                { label: '9 átló', correct: true },
                { label: '12 átló', correct: false }
              ].map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuiz2Answer(idx)}
                  className={`p-2 rounded-lg font-bold transition-all ${
                    quiz2Answer === idx
                      ? opt.correct
                        ? 'bg-emerald-500 text-white'
                        : 'bg-rose-500 text-white'
                      : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {quiz2Answer !== null && (
              <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                {quiz2Answer === 2 ? '✓ Helyes! d = 6 · (6 - 3) / 2 = 6 · 3 / 2 = 9 átló.' : '✗ Nem. Képlet: d = n(n-3)/2 = 6 · 3 / 2 = 9 átló.'}
              </div>
            )}
          </div>

          {/* Question 3 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
            <h5 className="font-bold text-sm text-slate-800 dark:text-white mb-2">
              3. Egy poliédernek 8 csúcsa és 6 lapja van (kocka). Hány éle van az Euler-tétel szerint?
            </h5>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {[
                { label: '12 él', correct: true },
                { label: '14 él', correct: false },
                { label: '10 él', correct: false },
                { label: '16 él', correct: false }
              ].map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuiz3Answer(idx)}
                  className={`p-2 rounded-lg font-bold transition-all ${
                    quiz3Answer === idx
                      ? opt.correct
                        ? 'bg-emerald-500 text-white'
                        : 'bg-rose-500 text-white'
                      : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {quiz3Answer !== null && (
              <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                {quiz3Answer === 0 ? '✓ Helyes! C + L = E + 2 ⟹ 8 + 6 = E + 2 ⟹ 14 = E + 2 ⟹ E = 12 él.' : '✗ Nem. Euler-tételből: 8 + 6 = E + 2 ⟹ E = 12 él.'}
              </div>
            )}
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
