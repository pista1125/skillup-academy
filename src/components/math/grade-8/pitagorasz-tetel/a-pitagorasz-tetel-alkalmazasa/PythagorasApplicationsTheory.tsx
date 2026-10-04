import React, { useState } from 'react';
import { MathText } from '../../shared/MathText';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  GeometryFigureCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  Shapes,
  Maximize2,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  Layers,
  ArrowRight,
  RotateCcw,
  Sliders,
  BookOpen,
  Award,
  Compass,
  Triangle,
  HelpCircle,
  Tv,
  Building,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MathText } from '@/components/math/shared/MathText';

interface PythagorasApplicationsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const PythagorasApplicationsTheory: React.FC<PythagorasApplicationsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV SÍKBELI ALAKZATOK KALKULÁTOR ÁLLAPOTOK ---
  const [activeTab, setActiveTab] = useState<'rect' | 'triangle' | 'rhombus' | 'trapezoid' | 'circle'>('rect');

  // 1. Téglalap / Négyzet
  const [rectA, setRectA] = useState<number>(6);
  const [rectB, setRectB] = useState<number>(8);
  const isSquare = rectA === rectB;
  const rectDiag = Math.sqrt(rectA * rectA + rectB * rectB);

  // 2. Háromszög (egyenlő szárú vagy szabályos)
  const [triBase, setTriBase] = useState<number>(12);
  const [triLeg, setTriLeg] = useState<number>(10);
  const isTriValid = triLeg > triBase / 2;
  const triHeight = isTriValid ? Math.sqrt(triLeg * triLeg - Math.pow(triBase / 2, 2)) : 0;
  const triArea = isTriValid ? (triBase * triHeight) / 2 : 0;

  // 3. Rombusz
  const [rhombE, setRhombE] = useState<number>(16);
  const [rhombF, setRhombF] = useState<number>(12);
  const rhombSide = Math.sqrt(Math.pow(rhombE / 2, 2) + Math.pow(rhombF / 2, 2));
  const rhombArea = (rhombE * rhombF) / 2;

  // 4. Szimmetrikus trapéz
  const [trapA, setTrapA] = useState<number>(20);
  const [trapC, setTrapC] = useState<number>(8);
  const [trapB, setTrapB] = useState<number>(10);
  const trapX = Math.abs(trapA - trapC) / 2;
  const isTrapValid = trapB > trapX;
  const trapHeight = isTrapValid ? Math.sqrt(trapB * trapB - trapX * trapX) : 0;
  const trapArea = isTrapValid ? ((trapA + trapC) / 2) * trapHeight : 0;

  // 5. Kör érintője
  const [circR, setCircR] = useState<number>(6);
  const [circD, setCircD] = useState<number>(10);
  const isCircValid = circD > circR;
  const circTangent = isCircValid ? Math.sqrt(circD * circD - circR * circR) : 0;

  return (
    <TheoryTemplate
      title="A Pitagorasz-tétel Síkbeli és Gyakorlati Alkalmazásai"
      subtitle="Négyzet és téglalap átlója, egyenlő szárú és szabályos háromszög magassága és területe, rombusz, trapéz, kör érintője és hétköznapi problémák"
      quickRule={{
        label: 'Alapvető Képletek',
        formula: 'd = a\\sqrt{2}, \\quad m = \\frac{a\\sqrt{3}}{2}',
        note: 'Négyzet átlója: a·√2; Szabályos háromszög magassága: (a·√3)/2'
      }}
      badge="8. Osztály • Pitagorasz-tétel"
      themeColor="emerald"
      pdfFilename="A_Pitagorasz_tetel_alkalmazasa_8_osztaly.pdf"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Alkalmazások Kvíz Indítása"
      practiceSubtitle="30 feladat 3 szinten, párosító és csoportosító játékkal a síkidomokról és gyakorlati számításokról!"
    >
      {/* 1. RÉSZ: NÉGYZET ÉS TÉGLALAP ÁTLÓJA */}
      <TheorySection
        title="1. Négyzet és Téglalap Átlója"
        subtitle="Hogyan bontható derékszögű háromszögekre a két legalapvetőbb négyszög?"
        icon={<Maximize2 className="w-5 h-5 text-emerald-600" />}
      >
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          A négyszögek közül a négyzet és a téglalap belső szögei mind <strong>90°-osak</strong>.
          Bármelyik átlójukat behúzva a négyszög <strong>két egybevágó derékszögű háromszögre</strong> bomlik,
          ahol az átló pontosan a derékszögű háromszög <strong>átfogója ($d = c$)</strong>,
          míg a négyszög oldalai a <strong>befogók ($a$ és $b$)</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-4">
          <TheoryCard
            title="Téglalap Átlója"
            badge="Oldalak: a és b"
            badgeColor="emerald"
          >
            <div className="space-y-3">
              <div className="text-center font-bold text-lg p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300">
                <MathText>d² = a² + b² &nbsp;⟹&nbsp; d = √(a² + b²)</MathText>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                A téglalap szomszédos oldalai merőlegesek egymásra. Az átló a szemközti csúcsokat összekötő szakasz, így Pitagorasz-tétellel azonnal megkapjuk.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 text-[11px] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                📌 <strong>Példa:</strong> Ha <em>a = 6 cm</em> és <em>b = 8 cm</em>:<br />
                d² = 6² + 8² = 36 + 64 = 100 ⟹ <strong>d = 10 cm</strong>.
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Négyzet Átlója"
            badge="Oldalak: a és a"
            badgeColor="sky"
          >
            <div className="space-y-3">
              <div className="text-center font-bold text-lg p-2.5 bg-sky-50 dark:bg-sky-950/40 rounded-xl border border-sky-200 dark:border-sky-800 text-sky-800 dark:text-sky-300">
                <MathText>d² = a² + a² = 2a² &nbsp;⟹&nbsp; d = a · √2</MathText>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Mivel a négyzet minden oldala egyenlő (<em>b = a</em>), az átló négyzete mindig <em>2a²</em>. Négyzetgyökvonás után az átló pontosan az oldal <strong><MathText>√2</MathText>-szerese (kb. 1,414-szerese)</strong>.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 text-[11px] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                📌 <strong>Példa:</strong> Ha <em>a = 5 cm</em>:<br />
                <MathText>d = 5 · √2 ≈ 5 · 1,414 = 7,07 cm</MathText>.
              </div>
            </div>
          </TheoryCard>
        </div>

        <TheoryCallout
          title="Miért fontos a négyzet átlójának d = a · √2 képlete?"
          type="info"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            <div className="md:col-span-7 space-y-2">
              <p className="text-xs sm:text-sm">
                Ez a matematika egyik leggyakrabban használt összefüggése. Nemcsak geometriai feladatokban, hanem a műszaki életben (pl. képernyők átlójának méretezése, dobozokba illeszkedő tárgyak, ácsszerkezetek andráskeresztje) is állandóan előkerül.
              </p>
              <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 p-2 bg-emerald-50/80 dark:bg-emerald-950/40 rounded-lg border border-emerald-200">
                <MathText>Ha az átló adott és az oldalt keressük: a = d / √2 = (d · √2) / 2</MathText>
              </div>
              <p className="text-[11px] text-slate-500">
                <MathText>Például egy d = 10 cm átlójú négyzet oldala: a = 10 / √2 ≈ 7,07 cm.</MathText>
              </p>
            </div>

            <div className="md:col-span-5 flex flex-col items-center justify-center p-3 bg-white/90 dark:bg-slate-900/90 rounded-2xl border border-emerald-200 dark:border-emerald-800 shadow-xs">
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Téglalap és négyzet felbontása
              </span>
              <svg viewBox="0 0 200 120" className="w-full max-w-[190px] h-auto select-none">
                {/* Téglalap */}
                <rect x="25" y="20" width="150" height="80" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
                {/* Átló */}
                <line x1="25" y1="100" x2="175" y2="20" stroke="#059669" strokeWidth="2.2" />
                {/* Alsó derékszögű háromszög kitöltése */}
                <polygon points="25,100 175,100 175,20" fill="#10b981" fillOpacity="0.18" />
                {/* Derékszög a jobb alsó sarokban */}
                <path d="M 163 100 A 12 12 0 0 1 175 88" fill="none" stroke="#047857" strokeWidth="1.4" />
                <circle cx="168" cy="95" r="1.3" fill="#047857" />
                {/* Címkék */}
                <text x="100" y="114" textAnchor="middle" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-200">a (befogó)</text>
                <text x="186" y="64" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-200">b</text>
                <text x="95" y="52" textAnchor="middle" className="text-[11px] font-black fill-emerald-700 dark:fill-emerald-400">d = √(a²+b²)</text>
              </svg>
            </div>
          </div>
        </TheoryCallout>
      </TheorySection>

      {/* 2. RÉSZ: EGYENLŐ SZÁRÚ ÉS SZABÁLYOS HÁROMSZÖG */}
      <TheorySection
        title="2. Egyenlő Szárú és Szabályos Háromszögek"
        subtitle="A magasságvonal szimmetriatengely, amely két derékszögű háromszögre osztja a síkidomot"
        icon={<Triangle className="w-5 h-5 text-emerald-600" />}
      >
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Az egyenlő szárú háromszög tengelyesen szimmetrikus alakzat.
          Az alaphoz tartozó magasságvonal ($m_a$) egyben <strong>felezi az alapot</strong>,
          így a háromszöget két egybevágó derékszögű háromszögre bontja.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-4">
          <TheoryCard
            title="Egyenlő Szárú Háromszög"
            badge="Alap: a, Szár: b"
            badgeColor="emerald"
          >
            <div className="space-y-3">
              <p className="text-xs text-slate-600 dark:text-slate-400">
                A derékszögű háromszög befogói a magasság (<em>m</em>) és az alap fele (<em>a/2</em>), átfogója pedig a szár (<em>b</em>):
              </p>
              <div className="text-center font-bold text-base p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 text-emerald-800 dark:text-emerald-300">
                <MathText>m² + (a/2)² = b² &nbsp;⟹&nbsp; m = √(b² - (a/2)²)</MathText>
              </div>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                <MathText>Terület: T = (a · m) / 2</MathText>
              </p>
              <div className="p-2 rounded bg-slate-50 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
                💡 <strong>Példa:</strong> <em>a = 12 cm, b = 10 cm</em>.<br />
                <MathText>a/2 = 6 cm. m = √(10² - 6²) = √(100 - 36) = √64 = 8 cm.</MathText><br />
                Terület: T = (12 · 8) / 2 = <strong>48 cm²</strong>.
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Szabályos (Egyenlő Oldalú) Háromszög"
            badge="Minden oldal: a"
            badgeColor="amber"
          >
            <div className="space-y-3">
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Mivel minden oldal <em>a</em>, a szár is <em>b = a</em>. A Pitagorasz-tételből:
              </p>
              <div className="text-center font-bold text-sm p-2 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 text-amber-900 dark:text-amber-300">
                <MathText>m² + (a/2)² = a² &nbsp;⟹&nbsp; m = (a · √3) / 2</MathText>
              </div>
              <div className="text-center font-bold text-sm p-2 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 text-amber-900 dark:text-amber-300">
                <MathText>T = (a · m) / 2 = (a² · √3) / 4</MathText>
              </div>
              <div className="p-2 rounded bg-slate-50 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
                💡 <strong>Példa:</strong> <em>a = 10 cm</em>.<br />
                <MathText>m = (10 · √3) / 2 = 5 · √3 ≈ 8,66 cm</MathText>.<br />
                <MathText>T = (100 · √3) / 4 = 25 · √3 ≈ 43,3 cm²</MathText>.
              </div>
            </div>
          </TheoryCard>
        </div>

        <TheoryTrapBox
          title="Gyakori tévedés: Ne felejtsd el elfelezni az alapot!"
          traps={[
            {
              mistake: 'm² + a² = b² felírása az egyenlő szárú háromszögben',
              correction: 'A derékszögű háromszög vízszintes befogója NEM az egész alap (a), hanem csak a fele (a/2)! A helyes képlet: m² + (a/2)² = b².'
            },
            {
              mistake: 'A szabályos háromszög magasságára a/2 vagy a/3 tippelése',
              correction: 'A szabályos háromszög magassága m = (a · √3) / 2 ≈ 0,866 · a. Mindig szorozni kell √3-mal, ami a 30°-60°-90°-os derékszögű háromszög arányaiból következik!'
            }
          ]}
        />
      </TheorySection>

      {/* 3. RÉSZ: ROMBUSZ ÉS SZIMMETRIKUS TRAPÉZ */}
      <TheorySection
        title="3. Rombusz és Szimmetrikus Trapéz"
        subtitle="Átlók derékszögű feleződése és a szár alatti kis levágott derékszögű háromszög"
        icon={<Shapes className="w-5 h-5 text-emerald-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-4">
          <TheoryCard
            title="Rombusz Oldala és Átlói"
            badge="Átlók: e és f, Oldal: a"
            badgeColor="emerald"
          >
            <div className="space-y-3">
              <p className="text-xs text-slate-600 dark:text-slate-400">
                A rombusz átlói <strong>merőlegesen felezik egymást</strong>. Emiatt a rombuszt 4 darab egybevágó derékszögű háromszögre osztják, melyeknek befogói az átlók felei (<em>e/2</em> és <em>f/2</em>), átfogója pedig a rombusz oldala (<em>a</em>):
              </p>
              <div className="text-center font-bold text-base p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 text-emerald-800 dark:text-emerald-300">
                <MathText>(e/2)² + (f/2)² = a²</MathText>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
                📌 <strong>Példa:</strong> <em>e = 16 cm, f = 12 cm</em>.<br />
                Befogók: 8 cm és 6 cm.<br />
                <MathText>a = √(8² + 6²) = √(64 + 36) = √100 = 10 cm</MathText>.<br />
                Terület: T = (e · f) / 2 = (16 · 12) / 2 = <strong>96 cm²</strong>.
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Szimmetrikus Trapéz (Húrtrapéz)"
            badge="Alapok: a > c, Szár: b"
            badgeColor="sky"
          >
            <div className="space-y-3">
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Ha a rövidebb <em>c</em> alap mindkét végpontjából magasságot bocsátunk a hosszabb <em>a</em> alapra, két egybevágó derékszögű háromszög és egy téglalap keletkezik. A szár alatti kis szakasz:
              </p>
              <div className="text-center font-bold text-sm p-2 bg-sky-50 dark:bg-sky-950/40 rounded-xl border border-sky-200 text-sky-800 dark:text-sky-300">
                <MathText>x = (a - c) / 2</MathText>
              </div>
              <div className="text-center font-bold text-sm p-2 bg-sky-50 dark:bg-sky-950/40 rounded-xl border border-sky-200 text-sky-800 dark:text-sky-300">
                <MathText>m² + x² = b² &nbsp;⟹&nbsp; m = √(b² - x²)</MathText>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
                📌 <strong>Példa:</strong> <em>a = 20 cm, c = 8 cm, b = 10 cm</em>.<br />
                x = (20 - 8) / 2 = 6 cm.<br />
                <MathText>m = √(10² - 6²) = √(100 - 36) = 8 cm</MathText>.<br />
                T = ((20 + 8) / 2) · 8 = 14 · 8 = <strong>112 cm²</strong>.
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. RÉSZ: KÖR ÉRINTŐJE ÉS HÚRJA */}
      <TheorySection
        title="4. Kör Érintője és Húrja"
        subtitle="A sugár és az érintő merőlegességének tétele"
        icon={<Target className="w-5 h-5 text-emerald-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center my-4">
          <div className="md:col-span-7 space-y-3">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              A geometria alapvető tétele, hogy a <strong>kör érintője merőleges az érintési pontba húzott sugárra</strong>.
              Ez azt jelenti, hogy ha egy külső <em>P</em> pontból érintőt húzunk a körhöz:
            </p>
            <ul className="text-xs space-y-1.5 list-disc pl-5 text-slate-600 dark:text-slate-400">
              <li>A derékszögű csúcs maga az <em>E</em> érintési pont.</li>
              <li>A derékszögű háromszög egyik befogója a kör sugara (<em>r</em>).</li>
              <li>A másik befogója az érintőszakasz hossza (<em>e</em>).</li>
              <li>Az átfogó a külső pont és a középpont távolsága (<em>d = OP</em>).</li>
            </ul>
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 text-center font-bold text-emerald-800 dark:text-emerald-300">
              <MathText>e² + r² = d² &nbsp;⟹&nbsp; e = √(d² - r²)</MathText>
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col items-center justify-center p-3 bg-white dark:bg-slate-900 rounded-2xl border border-emerald-200 dark:border-emerald-800 shadow-xs">
            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
              Érintőszakasz derékszögű háromszöge
            </span>
            <svg viewBox="0 0 200 120" className="w-full max-w-[190px] h-auto select-none">
              {/* Kör */}
              <circle cx="60" cy="60" r="42" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
              <circle cx="60" cy="60" r="2.5" fill="#047857" />
              <text x="50" y="64" className="text-[9px] font-bold fill-emerald-800">O</text>
              {/* Külső pont P */}
              <circle cx="170" cy="60" r="2.5" fill="#1e40af" />
              <text x="175" y="64" className="text-[9px] font-bold fill-blue-800">P</text>
              {/* Érintési pont E (felső) */}
              <circle cx="85" cy="27" r="2.5" fill="#dc2626" />
              <text x="82" y="20" className="text-[9px] font-bold fill-rose-700">E</text>
              {/* Sugár OE */}
              <line x1="60" y1="60" x2="85" y2="27" stroke="#059669" strokeWidth="1.5" />
              <text x="65" y="42" className="text-[8.5px] font-bold fill-emerald-700">r</text>
              {/* Érintő PE */}
              <line x1="170" y1="60" x2="85" y2="27" stroke="#dc2626" strokeWidth="1.8" />
              <text x="135" y="38" className="text-[9px] font-bold fill-rose-700">e = ?</text>
              {/* OP átfogó */}
              <line x1="60" y1="60" x2="170" y2="60" stroke="#1e40af" strokeWidth="1.5" strokeDasharray="3 2" />
              <text x="115" y="73" className="text-[8.5px] font-bold fill-blue-800">d (átfogó)</text>
              {/* Derékszög E-ben */}
              <path d="M 76 39 A 10 10 0 0 1 95 38" fill="none" stroke="#dc2626" strokeWidth="1.2" />
              <circle cx="86" cy="36" r="1.2" fill="#dc2626" />
            </svg>
          </div>
        </div>
      </TheorySection>

      {/* 5. RÉSZ: GYAKORLATI ÉLETBELI FELADATOK */}
      <TheorySection
        title="5. Életszerű Gyakorlati Alkalmazások"
        subtitle="Hogyan segít a Pitagorasz-tétel a hétköznapokban?"
        icon={<Building className="w-5 h-5 text-emerald-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <TheoryCard
            title="Létra a Falnál"
            badge="Építészet & Munka"
            badgeColor="emerald"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              A létra maga az <strong>átfogó (c)</strong>. A fal magassága (<em>m</em>) és a létra aljának faltól mért távolsága (<em>d</em>) a <strong>befogók</strong>:
            </p>
            <div className="text-xs font-bold text-center p-2 bg-emerald-50 rounded-lg text-emerald-800">
              <MathText>m = √(c² - d²)</MathText>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              <MathText>Egy 5 m-es létra alja 3 m-re van a faltól. Milyen magasra ér fel? m = √(25 - 9) = 4 méter.</MathText>
            </p>
          </TheoryCard>

          <TheoryCard
            title="Képernyők Átlója (TV, Monitor)"
            badge="Technológia"
            badgeColor="sky"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              A monitorok méretét az átlójukkal adják meg (pl. hüvelykben / colban, 1" = 2,54 cm).
            </p>
            <div className="text-xs font-bold text-center p-2 bg-sky-50 rounded-lg text-sky-800">
              <MathText>d = √(szélesség² + magasság²)</MathText>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              <MathText>Egy 80 cm széles és 60 cm magas TV képátlója: d = √(6400 + 3600) = √10000 = 100 cm (kb. 39 hüvelyk).</MathText>
            </p>
          </TheoryCard>

          <TheoryCard
            title="Kikötőkábel Oszlophoz"
            badge="Távközlés"
            badgeColor="amber"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              Egy antennatorony tetejétől a talajon lévő rögzítési ponthoz acélsodronyt feszítenek ki.
            </p>
            <div className="text-xs font-bold text-center p-2 bg-amber-50 rounded-lg text-amber-900">
              <MathText>Huzal = √(magasság² + távolság²)</MathText>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              <MathText>24 m magas oszlop, 7 m távolság a talajon: Huzal = √(576 + 49) = √625 = 25 méter.</MathText>
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6. RÉSZ: INTERAKTÍV SÍKBELI ALAKZATOK KALKULÁTOR */}
      <TheorySection
        title="6. Interaktív Síkidom Számító és Vizualizáló"
        subtitle="Válaszd ki az alakzatot, mozgasd a csúszkákat, és figyeld a derékszögű háromszög azonnali kiszámítását!"
        icon={<Sliders className="w-5 h-5 text-emerald-600" />}
      >
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-emerald-200 dark:border-emerald-900/60 p-5 shadow-sm my-4">
          {/* Módválasztó gombok */}
          <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
            <Button
              variant={activeTab === 'rect' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('rect')}
              className={cn(
                "rounded-xl font-bold text-xs gap-1.5 cursor-pointer",
                activeTab === 'rect'
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                  : "border-slate-200 dark:border-slate-700"
              )}
            >
              <Maximize2 className="w-4 h-4" />
              1. Téglalap és Négyzet
            </Button>

            <Button
              variant={activeTab === 'triangle' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('triangle')}
              className={cn(
                "rounded-xl font-bold text-xs gap-1.5 cursor-pointer",
                activeTab === 'triangle'
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                  : "border-slate-200 dark:border-slate-700"
              )}
            >
              <Triangle className="w-4 h-4" />
              2. Egyenlő Szárú Háromszög
            </Button>

            <Button
              variant={activeTab === 'rhombus' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('rhombus')}
              className={cn(
                "rounded-xl font-bold text-xs gap-1.5 cursor-pointer",
                activeTab === 'rhombus'
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                  : "border-slate-200 dark:border-slate-700"
              )}
            >
              <Shapes className="w-4 h-4" />
              3. Rombusz
            </Button>

            <Button
              variant={activeTab === 'trapezoid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('trapezoid')}
              className={cn(
                "rounded-xl font-bold text-xs gap-1.5 cursor-pointer",
                activeTab === 'trapezoid'
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                  : "border-slate-200 dark:border-slate-700"
              )}
            >
              <Layers className="w-4 h-4" />
              4. Szimmetrikus Trapéz
            </Button>

            <Button
              variant={activeTab === 'circle' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('circle')}
              className={cn(
                "rounded-xl font-bold text-xs gap-1.5 cursor-pointer",
                activeTab === 'circle'
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                  : "border-slate-200 dark:border-slate-700"
              )}
            >
              <Target className="w-4 h-4" />
              5. Kör Érintője
            </Button>
          </div>

          {/* TAB 1: TÉGLALAP ÉS NÉGYZET */}
          {activeTab === 'rect' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-6 space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    <span>Vízszintes oldal (a):</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400">{rectA} cm</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={rectA}
                    onChange={(e) => setRectA(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    <span>Függőleges oldal (b):</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400">{rectB} cm</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={rectB}
                    onChange={(e) => setRectB(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => { setRectA(6); setRectB(8); }}
                    className="text-xs h-8 rounded-lg cursor-pointer"
                  >
                    6 × 8 téglalap
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => { setRectA(10); setRectB(10); }}
                    className="text-xs h-8 rounded-lg cursor-pointer"
                  >
                    10 × 10 négyzet
                  </Button>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1.5">
                  <div className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                    {isSquare ? 'Négyzet Átlója:' : 'Téglalap Átlója:'}
                  </div>
                  <div className="text-base font-bold text-emerald-700 dark:text-emerald-300">
                    <MathText>{`d = √(${rectA}² + ${rectB}²) = √(${rectA * rectA + rectB * rectB}) ≈ ${rectDiag.toFixed(2)} cm`}</MathText>
                  </div>
                  {isSquare && (
                    <div className="text-[11px] text-emerald-800 dark:text-emerald-300 font-semibold">
                      <MathText>{`Képlet: d = a · √2 = ${rectA} · 1,414 ≈ ${(rectA * Math.SQRT2).toFixed(2)} cm`}</MathText>
                    </div>
                  )}
                </div>
              </div>

              <div className="md:col-span-6 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <svg viewBox="0 0 200 140" className="w-full max-w-[210px] h-auto select-none">
                  {/* Dinamikus téglalap */}
                  {(() => {
                    const maxW = 140;
                    const maxH = 90;
                    const scale = Math.min(maxW / Math.max(rectA, 1), maxH / Math.max(rectB, 1));
                    const w = rectA * scale;
                    const h = rectB * scale;
                    const x = 100 - w / 2;
                    const y = 70 - h / 2;
                    return (
                      <g>
                        <rect x={x} y={y} width={w} height={h} fill="#f1f5f9" stroke="#334155" strokeWidth="1.8" />
                        <polygon points={`${x},${y + h} ${x + w},${y + h} ${x + w},${y}`} fill="#10b981" fillOpacity="0.2" />
                        <line x1={x} y1={y + h} x2={x + w} y2={y} stroke="#059669" strokeWidth="2.2" />
                        <text x={100} y={y + h + 15} textAnchor="middle" className="text-[9px] font-bold fill-slate-700">a = {rectA} cm</text>
                        <text x={x + w + 12} y={70} textAnchor="middle" className="text-[9px] font-bold fill-slate-700">b = {rectB} cm</text>
                        <text x={100} y={70} textAnchor="middle" className="text-[10px] font-black fill-emerald-800">d ≈ {rectDiag.toFixed(1)} cm</text>
                      </g>
                    );
                  })()}
                </svg>
              </div>
            </div>
          )}

          {/* TAB 2: EGYENLŐ SZÁRÚ HÁROMSZÖG */}
          {activeTab === 'triangle' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-6 space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    <span>Alap (a):</span>
                    <span className="font-mono text-emerald-600">{triBase} cm</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="24"
                    value={triBase}
                    onChange={(e) => setTriBase(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    <span>Szár (b):</span>
                    <span className="font-mono text-emerald-600">{triLeg} cm</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="20"
                    value={triLeg}
                    onChange={(e) => setTriLeg(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1.5">
                  {isTriValid ? (
                    <>
                      <div className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                        Alaphoz tartozó magasság és terület:
                      </div>
                      <div className="text-base font-bold text-emerald-700 dark:text-emerald-300">
                        <MathText>{`m = √(${triLeg}² - (${triBase / 2})²) = √(${triLeg * triLeg - Math.pow(triBase / 2, 2)}) ≈ ${triHeight.toFixed(2)} cm`}</MathText>
                      </div>
                      <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                        <MathText>{`Terület: T = (${triBase} · ${triHeight.toFixed(2)}) / 2 ≈ ${triArea.toFixed(2)} cm²`}</MathText>
                      </div>
                    </>
                  ) : (
                    <div className="text-xs text-rose-600 font-bold">
                      A szárnak hosszabbnak kell lennie az alap felénél (b &gt; a/2), különben nem szerkeszthető háromszög!
                    </div>
                  )}
                </div>
              </div>

              <div className="md:col-span-6 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <svg viewBox="0 0 200 140" className="w-full max-w-[210px] h-auto select-none">
                  {isTriValid && (() => {
                    const topY = 25;
                    const botY = 110;
                    const midX = 100;
                    const halfW = 55;
                    return (
                      <g>
                        <polygon points={`${midX - halfW},${botY} ${midX + halfW},${botY} ${midX},${topY}`} fill="#ede9fe" stroke="#6366f1" strokeWidth="2" />
                        <polygon points={`${midX},${botY} ${midX + halfW},${botY} ${midX},${topY}`} fill="#10b981" fillOpacity="0.25" />
                        {/* Magasság */}
                        <line x1={midX} y1={topY} x2={midX} y2={botY} stroke="#dc2626" strokeWidth="1.8" strokeDasharray="3 2" />
                        <path d={`M ${midX} ${botY - 10} A 10 10 0 0 1 ${midX + 10} ${botY}`} fill="none" stroke="#dc2626" strokeWidth="1.2" />
                        <circle cx={midX + 4} cy={botY - 4} r="1" fill="#dc2626" />
                        {/* Feliratok */}
                        <text x={midX} y={botY + 16} textAnchor="middle" className="text-[9px] font-bold fill-slate-700">a = {triBase} cm</text>
                        <text x={midX + halfW / 2 + 10} y={botY + 12} textAnchor="middle" className="text-[7.5px] fill-emerald-800 font-bold">a/2={triBase / 2}</text>
                        <text x={midX + halfW / 2 + 14} y={topY + 40} className="text-[9px] font-bold fill-indigo-700">b = {triLeg}</text>
                        <text x={midX - 8} y={topY + 45} textAnchor="end" className="text-[9px] font-bold fill-rose-600">m ≈ {triHeight.toFixed(1)}</text>
                      </g>
                    );
                  })()}
                </svg>
              </div>
            </div>
          )}

          {/* TAB 3: ROMBUSZ */}
          {activeTab === 'rhombus' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-6 space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Hosszabb átló (e):</span>
                    <span className="font-mono text-emerald-600">{rhombE} cm</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="24"
                    value={rhombE}
                    onChange={(e) => setRhombE(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Rövidebb átló (f):</span>
                    <span className="font-mono text-emerald-600">{rhombF} cm</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="20"
                    value={rhombF}
                    onChange={(e) => setRhombF(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                  <div className="text-xs font-bold text-emerald-900">
                    Rombusz oldala és területe:
                  </div>
                  <div className="text-base font-bold text-emerald-700">
                    <MathText>{`a = √(${rhombE / 2}² + ${rhombF / 2}²) = √(${Math.pow(rhombE / 2, 2) + Math.pow(rhombF / 2, 2)}) ≈ ${rhombSide.toFixed(2)} cm`}</MathText>
                  </div>
                  <div className="text-xs font-bold text-emerald-800">
                    Terület: T = (e · f) / 2 = ({rhombE} · {rhombF}) / 2 = {rhombArea} cm²
                  </div>
                </div>
              </div>

              <div className="md:col-span-6 flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <svg viewBox="0 0 200 140" className="w-full max-w-[210px] h-auto select-none">
                  {/* Rombusz csúcsai */}
                  <polygon points="100,20 160,70 100,120 40,70" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
                  {/* Kiemelt jobb felső derékszögű háromszög */}
                  <polygon points="100,20 160,70 100,70" fill="#10b981" fillOpacity="0.25" />
                  {/* Átlók */}
                  <line x1="40" y1="70" x2="160" y2="70" stroke="#059669" strokeWidth="1.6" strokeDasharray="3 2" />
                  <line x1="100" y1="20" x2="100" y2="120" stroke="#059669" strokeWidth="1.6" strokeDasharray="3 2" />
                  {/* Derékszög jelölése középen */}
                  <path d="M 100 62 A 8 8 0 0 1 108 70" fill="none" stroke="#047857" strokeWidth="1.2" />
                  <circle cx="103.5" cy="66.5" r="1" fill="#047857" />
                  {/* Címkék */}
                  <text x="135" y="65" className="text-[8px] font-bold fill-emerald-800">e/2={rhombE / 2}</text>
                  <text x="105" y="42" className="text-[8px] font-bold fill-emerald-800">f/2={rhombF / 2}</text>
                  <text x="138" y="40" className="text-[9.5px] font-black fill-amber-900">a ≈ {rhombSide.toFixed(1)}</text>
                </svg>
              </div>
            </div>
          )}

          {/* TAB 4: SZIMMETRIKUS TRAPÉZ */}
          {activeTab === 'trapezoid' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-6 space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Hosszabb alap (a):</span>
                    <span className="font-mono text-emerald-600">{trapA} cm</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="28"
                    value={trapA}
                    onChange={(e) => setTrapA(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Rövidebb alap (c):</span>
                    <span className="font-mono text-emerald-600">{trapC} cm</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max={trapA - 2}
                    value={trapC}
                    onChange={(e) => setTrapC(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Szár (b):</span>
                    <span className="font-mono text-emerald-600">{trapB} cm</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="20"
                    value={trapB}
                    onChange={(e) => setTrapB(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                  {isTrapValid ? (
                    <>
                      <div className="text-xs font-bold text-emerald-900">
                        Levágott szakasz (x) és magasság (m):
                      </div>
                      <div className="font-mono text-xs font-bold text-slate-700">
                        x = ({trapA} - {trapC}) / 2 = {trapX} cm
                      </div>
                      <div className="text-base font-bold text-emerald-700">
                        <MathText>{`m = √(${trapB}² - ${trapX}²) = √(${trapB * trapB - trapX * trapX}) ≈ ${trapHeight.toFixed(2)} cm`}</MathText>
                      </div>
                      <div className="text-xs font-bold text-emerald-800">
                        <MathText>{`Terület: T = ((${trapA} + ${trapC}) / 2) · ${trapHeight.toFixed(2)} ≈ ${trapArea.toFixed(2)} cm²`}</MathText>
                      </div>
                    </>
                  ) : (
                    <div className="text-xs text-rose-600 font-bold">
                      A szárnak hosszabbnak kell lennie a levágott szakasznál (b &gt; x = {trapX} cm)!
                    </div>
                  )}
                </div>
              </div>

              <div className="md:col-span-6 flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <svg viewBox="0 0 200 140" className="w-full max-w-[210px] h-auto select-none">
                  {isTrapValid && (
                    <g>
                      <polygon points="30,110 170,110 140,40 60,40" fill="#ede9fe" stroke="#6366f1" strokeWidth="2" />
                      {/* Jobb oldali kis derékszögű háromszög */}
                      <polygon points="140,110 170,110 140,40" fill="#10b981" fillOpacity="0.3" stroke="#059669" strokeWidth="1.2" />
                      {/* Magasság */}
                      <line x1="140" y1="40" x2="140" y2="110" stroke="#dc2626" strokeWidth="1.6" strokeDasharray="3 2" />
                      {/* Feliratok */}
                      <text x="100" y="32" textAnchor="middle" className="text-[9px] font-bold fill-indigo-700">c = {trapC}</text>
                      <text x="100" y="124" textAnchor="middle" className="text-[9px] font-bold fill-indigo-700">a = {trapA}</text>
                      <text x="160" y="70" className="text-[9px] font-bold fill-indigo-800">b={trapB}</text>
                      <text x="135" y="75" textAnchor="end" className="text-[9px] font-bold fill-rose-600">m≈{trapHeight.toFixed(1)}</text>
                      <text x="155" y="106" className="text-[8px] font-bold fill-emerald-800">x={trapX}</text>
                    </g>
                  )}
                </svg>
              </div>
            </div>
          )}

          {/* TAB 5: KÖR ÉRINTŐJE */}
          {activeTab === 'circle' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-6 space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Kör sugara (r):</span>
                    <span className="font-mono text-emerald-600">{circR} cm</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="15"
                    value={circR}
                    onChange={(e) => setCircR(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Pont távolsága a kp-tól (d):</span>
                    <span className="font-mono text-emerald-600">{circD} cm</span>
                  </div>
                  <input
                    type="range"
                    min={circR + 1}
                    max="25"
                    value={circD}
                    onChange={(e) => setCircD(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                  <div className="text-xs font-bold text-emerald-900">
                    Érintőszakasz hossza (e):
                  </div>
                  <div className="text-base font-bold text-emerald-700">
                    <MathText>{`e = √(${circD}² - ${circR}²) = √(${circD * circD - circR * circR}) ≈ ${circTangent.toFixed(2)} cm`}</MathText>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Mivel a sugár merőleges az érintőre az érintési pontban, a középpont távolsága (d) a derékszögű háromszög átfogója.
                  </p>
                </div>
              </div>

              <div className="md:col-span-6 flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <svg viewBox="0 0 200 130" className="w-full max-w-[210px] h-auto select-none">
                  <circle cx="65" cy="65" r="40" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
                  <circle cx="65" cy="65" r="2.5" fill="#047857" />
                  <circle cx="165" cy="65" r="2.5" fill="#1e40af" />
                  <circle cx="89" cy="33" r="2.5" fill="#dc2626" />
                  <line x1="65" y1="65" x2="89" y2="33" stroke="#059669" strokeWidth="1.5" />
                  <line x1="165" y1="65" x2="89" y2="33" stroke="#dc2626" strokeWidth="1.8" />
                  <line x1="65" y1="65" x2="165" y2="65" stroke="#1e40af" strokeWidth="1.5" strokeDasharray="3 2" />
                  <text x="70" y="48" className="text-[8.5px] font-bold fill-emerald-800">r = {circR}</text>
                  <text x="135" y="44" className="text-[9px] font-bold fill-rose-600">e ≈ {circTangent.toFixed(1)}</text>
                  <text x="115" y="78" className="text-[8.5px] font-bold fill-blue-800">d = {circD}</text>
                </svg>
              </div>
            </div>
          )}
        </div>
      </TheorySection>

      {/* 7. RÉSZ: ÖSSZEFOGLALÓ KÉPLETTÁBLÁZAT */}
      <TheorySection
        title="7. Síkbeli Képletek Gyors Áttekintője"
        subtitle="Minden fontos alakzat és Pitagoraszi összefüggés egyetlen táblázatban"
        icon={<Award className="w-5 h-5 text-emerald-600" />}
      >
        <TheoryTable
          headers={['Alakzat', 'Adott Adatok', 'Pitagoraszi Összefüggés', 'Végeredmény Képlete']}
          rows={[
            ['Téglalap', 'a, b oldalak', 'd² = a² + b²', 'd = √(a² + b²)'],
            ['Négyzet', 'a oldal', 'd² = a² + a² = 2a²', 'd = a · √2 ≈ 1,414 · a'],
            ['Egyenlő szárú háromszög', 'a alap, b szár', 'm² + (a/2)² = b²', 'm = √(b² - (a/2)²)'],
            ['Szabályos háromszög', 'a oldal', 'm² + (a/2)² = a²', 'm = (a·√3)/2, T = (a²·√3)/4'],
            ['Rombusz', 'e, f átlók', '(e/2)² + (f/2)² = a²', 'a = √((e/2)² + (f/2)²)'],
            ['Szimmetrikus trapéz', 'a, c alapok, b szár', 'm² + ((a-c)/2)² = b²', 'm = √(b² - ((a-c)/2)²)'],
            ['Kör érintőszakasza', 'r sugár, d távolság', 'e² + r² = d²', 'e = √(d² - r²)']
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default PythagorasApplicationsTheory;
