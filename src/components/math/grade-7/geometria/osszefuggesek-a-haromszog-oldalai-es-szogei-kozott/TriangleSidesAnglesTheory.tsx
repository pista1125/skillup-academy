import React from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  GeometryFigureCard,
  GeometryFigureGrid,
  GeometrySvgFrame,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  Ruler,
  Compass,
  Shapes,
  Maximize2,
  Layers,
  ArrowRight,
  Info,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Check,
  X,
  Target,
  Sparkles,
  Calculator,
  Flame,
  Scale
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';

interface TriangleSidesAnglesTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const TriangleSidesAnglesTheory: React.FC<TriangleSidesAnglesTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  return (
    <TheoryTemplate
      title="2. Összefüggések a háromszög oldalai és szögei között"
      subtitle="Háromszög-egyenlőtlenség, belső és külső szögek tétele, oldalak és szemközti szögek kapcsolata"
      badgeText="7. OSZTÁLY • VII. GEOMETRIA • 📖 2. LECKE"
      quickRule={{
        label: 'Fontos szabály',
        formula: 'a + b > c \\quad • \\quad \\alpha + \\beta + \\gamma = 180^\\circ \\quad • \\quad \\alpha\' = \\beta + \\gamma'
      }}
      topicId="g7-geom-triangle-inequality"
      chapterId="geometria"
      grade={7}
      themeColor="indigo"
      estimatedReadTime="14 perc"
      difficulty="Közepes"
      pdfFilename="7_osztaly_2_haromszog_oldalai_es_szogei.pdf"
      practiceTitle="Készen állsz a háromszögek szög- és oldalösszefüggéseinek gyakorlására?"
      practiceSubtitle="Tedd próbára tudásod a 30 feladatos interaktív kvízben, párosítóban és csoportosítóban!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* 1. FEJEZET: A HÁROMSZÖG-EGYENLŐTLENSÉG */}
      <TheorySection
        number={1}
        title="A háromszög-egyenlőtlenség – Mikor szerkeszthető háromszög?"
        icon={<Ruler className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badge="ALAPTÉTEL"
        badgeColor="indigo"
      >
        {/* FŐBB TÖRVÉNYSZERŰSÉGEK ÁTTEKINTÉSE (FONTOS SZABÁLYOK) */}
        <TheoryCallout
          type="rule"
          title="Fontos alapszabályok összefoglalása"
          icon={<Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs sm:text-sm">
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200/70 dark:border-indigo-900/50 shadow-2xs">
              <span className="font-bold text-indigo-700 dark:text-indigo-300 block mb-1">1. Háromszög-egyenlőtlenség</span>
              <div className="font-mono font-bold text-slate-800 dark:text-slate-100">
                <MathText>{'a + b > c'}</MathText>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Bármely két oldal összege nagyobb a 3. oldalnál.</p>
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200/70 dark:border-indigo-900/50 shadow-2xs">
              <span className="font-bold text-teal-700 dark:text-teal-300 block mb-1">2. Belső szögek összege</span>
              <div className="font-mono font-bold text-slate-800 dark:text-slate-100">
                <MathText>{'\\alpha + \\beta + \\gamma = 180^\\circ'}</MathText>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Minden síkbeli háromszögben pontosan 180°.</p>
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200/70 dark:border-indigo-900/50 shadow-2xs">
              <span className="font-bold text-purple-700 dark:text-purple-300 block mb-1">3. Külső szög tétele</span>
              <div className="font-mono font-bold text-slate-800 dark:text-slate-100">
                <MathText>{'\\alpha\' = \\beta + \\gamma'}</MathText>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Egyenlő a két nem mellette fekvő belső összegével.</p>
            </div>
          </div>
        </TheoryCallout>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Ha három tetszőleges szakaszt választunk ki, nem biztos, hogy azokból háromszöget tudunk alkotni! 
          Gondoljunk arra, hogy a két rövidebb oldalnak el kell érnie egymást: ha a két rövidebb szakasz összege nem éri el a leghosszabb oldalt, a szakaszok végei sosem fognak metszéspontot alkotni.
        </p>

        {/* Highlighted Theorem Box */}
        <TheoryCallout
          type="definition"
          title="A Háromszög-egyenlőtlenség Tétele"
          icon={<CheckCircle2 className="w-5 h-5 text-indigo-600" />}
        >
          <p className="text-xs sm:text-sm leading-relaxed mb-2">
            Bármely háromszögben <strong>bármely két oldal hosszának összege nagyobb</strong> a harmadik oldal hosszánál:
          </p>
          <div className="p-2.5 rounded-xl bg-indigo-100/70 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-center font-mono font-bold text-sm text-indigo-950 dark:text-indigo-200">
            <MathText>{'a + b > c, \\qquad a + c > b, \\qquad b + c > a'}</MathText>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 italic">
            Gyakorlati szabály: elég ellenőrizni, hogy a <strong>két rövidebb oldal összege nagyobb-e a leghosszabbnál</strong>!
          </p>
        </TheoryCallout>

        {/* 2 Comparison Cards (Létezik vs Nem létezik) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
          {/* Card 1: Létező háromszög */}
          <div className="p-3.5 rounded-2xl border-2 border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-slate-850 space-y-2.5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                Létező háromszög
              </span>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                4 cm, 5 cm, 7 cm
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              A két rövidebb oldal: 4 cm és 5 cm. Összegük: <strong className="text-emerald-700">4 + 5 = 9 &gt; 7 cm</strong>. 
              Az egyenlőtlenség teljesül, a háromszög <strong>egyértelműen megszerkeszthető</strong>!
            </p>
            {/* SVG Visual */}
            <div className="flex justify-center p-2 rounded-xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-900/60">
              <svg viewBox="0 0 200 90" className="w-full h-auto max-h-[75px] max-w-[200px]">
                <polygon points="20,75 180,75 80,20" className="fill-emerald-500/15 stroke-emerald-600 dark:stroke-emerald-400 stroke-2" />
                <circle cx="20" cy="75" r="3" className="fill-emerald-700" />
                <circle cx="180" cy="75" r="3" className="fill-emerald-700" />
                <circle cx="80" cy="20" r="3" className="fill-emerald-700" />
                <text x="100" y="86" textAnchor="middle" className="text-[9px] font-bold fill-slate-600 dark:fill-slate-300">c = 7 cm</text>
                <text x="44" y="45" className="text-[9px] font-bold fill-slate-600 dark:fill-slate-300">b = 4</text>
                <text x="135" y="45" className="text-[9px] font-bold fill-slate-600 dark:fill-slate-300">a = 5</text>
              </svg>
            </div>
          </div>

          {/* Card 2: Nem létező háromszög */}
          <div className="p-3.5 rounded-2xl border-2 border-rose-200 dark:border-rose-900/60 bg-rose-50/30 dark:bg-slate-850 space-y-2.5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
                <X className="w-4 h-4 text-rose-600" />
                Nem szerkeszthető!
              </span>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 border border-rose-200">
                2 cm, 3 cm, 6 cm
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              A két rövidebb oldal: 2 cm és 3 cm. Összegük: <strong className="text-rose-700">2 + 3 = 5 &lt; 6 cm</strong>. 
              A két körív nem éri el egymást, <strong>nincs metszéspont</strong>, háromszög nem hozható létre!
            </p>
            {/* SVG Visual */}
            <div className="flex justify-center p-2 rounded-xl bg-white dark:bg-slate-900 border border-rose-100 dark:border-rose-900/60">
              <svg viewBox="0 0 200 90" className="w-full h-auto max-h-[75px] max-w-[200px]">
                {/* Base c = 6 cm */}
                <line x1="20" y1="70" x2="180" y2="70" className="stroke-slate-700 dark:stroke-slate-300 stroke-2" />
                <circle cx="20" cy="70" r="3" className="fill-slate-700" />
                <circle cx="180" cy="70" r="3" className="fill-slate-700" />
                {/* Arcs that don't meet */}
                <path d="M 20,70 A 50,50 0 0,1 68,30" fill="none" className="stroke-rose-500 stroke-2 stroke-dashed" />
                <path d="M 180,70 A 70,70 0 0,0 120,25" fill="none" className="stroke-rose-500 stroke-2 stroke-dashed" />
                <text x="100" y="82" textAnchor="middle" className="text-[9px] font-bold fill-slate-500">c = 6 cm</text>
                <text x="40" y="45" className="text-[8px] font-bold fill-rose-600">r = 2 cm</text>
                <text x="145" y="42" className="text-[8px] font-bold fill-rose-600">r = 3 cm</text>
                <text x="96" y="55" textAnchor="middle" className="text-[9px] font-black fill-rose-600">Nem érnek össze!</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Critical Edge Case: a + b = c */}
        <TheoryTrapBox title="Veszélyes Csapda: Mi van, ha a + b pontosan egyenlő c-vel?">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Például: <MathText size="sm">{'a = 3\\text{ cm}, b = 4\\text{ cm}, c = 7\\text{ cm}'}</MathText>. 
            Mivel <MathText size="sm">{'3 + 4 = 7'}</MathText>, a két szakasz pontosan a leghosszabb oldal egyenesén találkozik. 
            Ekkor a három csúcs <strong>egy egyenesbe esik</strong> (elfajuló háromszög), így <strong>valódi háromszög NEM jön létre</strong>! 
            A háromszög-egyenlőtlenségben a reláció <strong>szigorúan nagyobb (&gt;)</strong> kell legyen!
          </p>
        </TheoryTrapBox>

        {/* Third Side Range Calculation Rule */}
        <div className="p-3.5 rounded-2xl border-2 border-indigo-200 dark:border-indigo-900/60 bg-gradient-to-r from-indigo-50/50 via-white to-purple-50/40 dark:bg-slate-850 space-y-2 shadow-xs">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-indigo-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
              Típusfeladat: A harmadik oldal lehetséges hosszának meghatározása
            </h4>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Ha egy háromszög két oldala ismert (<MathText size="sm">{'a'}</MathText> és <MathText size="sm">{'b'}</MathText>, ahol <MathText size="sm">{'a \\ge b'}</MathText>), akkor a harmadik oldal (<MathText size="sm">{'c'}</MathText>) hossza szigorúan a két oldal különbsége és összege közé kell, hogy essen:
          </p>
          <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 text-center font-mono font-bold text-xs sm:text-sm text-indigo-900 dark:text-indigo-200">
            <MathText>{'|a - b| < c < a + b'}</MathText>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
            <strong>Példa:</strong> Ha <MathText size="sm">{'a = 5\\text{ cm}'}</MathText> és <MathText size="sm">{'b = 9\\text{ cm}'}</MathText>, akkor <MathText size="sm">{'9 - 5 < c < 9 + 5'}</MathText>, vagyis <strong className="text-indigo-600 dark:text-indigo-400">4 cm &lt; c &lt; 14 cm</strong>. A harmadik oldal lehetséges egész hossza 5 cm-től 13 cm-ig terjedhet.
          </p>
        </div>
      </TheorySection>

      {/* 2. FEJEZET: OLDALAK ÉS SZEMKÖZTI SZÖGEK KAPCSOLATA */}
      <TheorySection
        number={2}
        title="Oldalak és szemközti szögek nagyságrendi kapcsolata"
        icon={<Scale className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badge="ÖSSZEFÜGGÉS"
        badgeColor="indigo"
      >
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Egy háromszögben az oldalak hossza és a velük szemközti szögek nagysága szoros összhangban van. 
          Minél jobban kinyitunk egy szöget, a vele szemben fekvő oldalnak annál hosszabbnak kell lennie, hogy összekösse a szárakat.
        </p>

        {/* 3 Core Rules in Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          {/* Rule 1: Nagyobb oldal -> Nagyobb szög */}
          <div className="p-3.5 rounded-2xl border-2 border-indigo-200 dark:border-indigo-900/60 bg-white dark:bg-slate-850 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-black text-xs flex items-center justify-center">1</span>
              <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded">TÉTEL</span>
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100">Nagyobb oldallal szemben</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Bármely háromszögben a <strong>nagyobb oldallal szemben nagyobb belső szög</strong> fekszik, és fordítva:
            </p>
            <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 text-center font-mono font-bold text-xs text-indigo-900 dark:text-indigo-200">
              <MathText>{'a > b \\iff \\alpha > \\beta'}</MathText>
            </div>
          </div>

          {/* Rule 2: Egyenlő szárú háromszög */}
          <div className="p-3.5 rounded-2xl border-2 border-teal-200 dark:border-teal-900/60 bg-white dark:bg-slate-850 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-lg bg-teal-600 text-white font-black text-xs flex items-center justify-center">2</span>
              <span className="text-[10px] font-black uppercase text-teal-700 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded">EGYENLŐ SZÁRÚ</span>
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100">Egyenlő oldalakkal szemben</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Egyenlő oldalakkal szemben <strong>egyenlő szögek</strong> fekszenek. Az egyenlő szárú háromszög alapon fekvő szögei egyenlők:
            </p>
            <div className="p-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/70 border border-teal-200 text-center font-mono font-bold text-xs text-teal-900 dark:text-teal-200">
              <MathText>{'a = b \\iff \\alpha = \\beta'}</MathText>
            </div>
          </div>

          {/* Rule 3: Szabályos háromszög */}
          <div className="p-3.5 rounded-2xl border-2 border-purple-200 dark:border-purple-900/60 bg-white dark:bg-slate-850 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-lg bg-purple-600 text-white font-black text-xs flex items-center justify-center">3</span>
              <span className="text-[10px] font-black uppercase text-purple-700 bg-purple-50 dark:bg-purple-950 px-2 py-0.5 rounded">SZABÁLYOS</span>
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100">Mindhárom oldal egyenlő</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Szabályos háromszögben mindhárom oldal egyenlő, ezért mindhárom belső szöge is egyenlő (<MathText size="sm">{'60^\\circ'}</MathText>):
            </p>
            <div className="p-1.5 rounded-lg bg-purple-50 dark:bg-purple-950/70 border border-purple-200 text-center font-mono font-bold text-xs text-purple-900 dark:text-purple-200">
              <MathText>{'a = b = c \\iff \\alpha = \\beta = \\gamma = 60^\\circ'}</MathText>
            </div>
          </div>
        </div>

        {/* Compact Clean Illustration of Side-Angle Relationship */}
        <div className="pt-3 flex justify-center">
          <div className="w-full max-w-[460px]">
            <GeometryFigureCard
              title="Szemléltetés: a < b < c összefüggés"
              subtitle="A leghosszabb oldal (c) a legnagyobb szöggel (γ) néz szembe"
              badge="SZEMKÖZTI PÁROK"
              variant="indigo"
              grid={true}
              figureHeight="min-h-[145px]"
            >
              <svg viewBox="0 0 280 150" className="w-full h-auto max-h-[145px] max-w-[300px] mx-auto">
                {/* Scalene triangle: A=(30, 120), B=(250, 120), C=(90, 30) */}
                {/* Sides: a = BC ~ 183px (long), b = AC ~ 108px (medium), c = AB = 220px (longest) */}
                <polygon points="30,120 250,120 90,30" className="fill-indigo-500/15 stroke-indigo-600 dark:stroke-indigo-400 stroke-[2.5]" />
                
                {/* Vertices */}
                <circle cx="30" cy="120" r="3.5" className="fill-indigo-700" />
                <circle cx="250" cy="120" r="3.5" className="fill-indigo-700" />
                <circle cx="90" cy="30" r="3.5" className="fill-indigo-700" />

                {/* Angle arcs */}
                <path d="M 50,120 A 20,20 0 0,0 42,102" fill="none" className="stroke-blue-500 stroke-2" />
                <text x="56" y="112" className="text-[10px] font-bold fill-blue-600">α</text>

                <path d="M 230,120 A 20,20 0 0,1 236,111" fill="none" className="stroke-teal-500 stroke-2" />
                <text x="220" y="114" className="text-[10px] font-bold fill-teal-600">β</text>

                <path d="M 80,45 A 20,20 0 0,0 106,44" fill="none" className="stroke-rose-500 stroke-2" />
                <text x="90" y="60" textAnchor="middle" className="text-[11px] font-black fill-rose-600">γ (legnagyobb)</text>

                {/* Labels */}
                <text x="20" y="132" className="text-[11px] font-black fill-slate-800 dark:fill-slate-200">A</text>
                <text x="256" y="132" className="text-[11px] font-black fill-slate-800 dark:fill-slate-200">B</text>
                <text x="90" y="20" textAnchor="middle" className="text-[11px] font-black fill-slate-800 dark:fill-slate-200">C</text>

                <text x="140" y="135" textAnchor="middle" className="text-[10px] font-black fill-indigo-700">c (leghosszabb oldal)</text>
                <text x="50" y="70" className="text-[10px] font-bold fill-indigo-700">b</text>
                <text x="180" y="70" className="text-[10px] font-bold fill-indigo-700">a</text>
              </svg>
            </GeometryFigureCard>
          </div>
        </div>
      </TheorySection>

      {/* 3. FEJEZET: BELSŐ ÉS KÜLSŐ SZÖGEK TÉTELEI */}
      <TheorySection
        number={3}
        title="Belső és külső szögek összefüggései"
        icon={<Target className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badge="SZÖGÖSSZEGEK"
        badgeColor="indigo"
      >
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          A háromszögek belső és külső szögei közötti kapcsolat a geometria egyik legtöbbet használt eszköze. 
          Bármilyen alakú vagy méretű is a háromszög, az alábbi törvényszerűségek mindig érvényesek:
        </p>

        {/* 3 Formula Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
          {/* Card 1: Belső szögek összege 180° */}
          <div className="p-3.5 rounded-2xl border-2 border-indigo-200 dark:border-indigo-900/60 bg-white dark:bg-slate-850 space-y-2 shadow-xs">
            <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded">
              1. ALAPTÉTEL
            </span>
            <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Belső szögek összege</h4>
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 text-center font-mono font-black text-sm text-indigo-900 dark:text-indigo-200">
              <MathText>{'\\alpha + \\beta + \\gamma = 180^\\circ'}</MathText>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Bármely síkbeli háromszög belső szögeinek összege pontosan <strong>180° (egyenesszög)</strong>.
            </p>
          </div>

          {/* Card 2: Külső szög tétele */}
          <div className="p-3.5 rounded-2xl border-2 border-teal-200 dark:border-teal-900/60 bg-white dark:bg-slate-850 space-y-2 shadow-xs">
            <span className="text-[10px] font-black uppercase text-teal-700 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded">
              2. KÜLSŐ SZÖG TÉTELE
            </span>
            <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Nem mellette fekvők összege</h4>
            <div className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950/70 border border-teal-200 text-center font-mono font-black text-xs sm:text-sm text-teal-900 dark:text-teal-200">
              <MathText>{'\\alpha\' = \\beta + \\gamma'}</MathText>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Egy külső szög mindig egyenlő a <strong>két nem mellette fekvő belső szög</strong> összegével.
            </p>
          </div>

          {/* Card 3: Külső szögek összege 360° */}
          <div className="p-3.5 rounded-2xl border-2 border-purple-200 dark:border-purple-900/60 bg-white dark:bg-slate-850 space-y-2 shadow-xs">
            <span className="text-[10px] font-black uppercase text-purple-700 bg-purple-50 dark:bg-purple-950 px-2 py-0.5 rounded">
              3. KÜLSŐ SZÖGÖSSZEG
            </span>
            <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Külső szögek összege</h4>
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/70 border border-purple-200 text-center font-mono font-black text-sm text-purple-900 dark:text-purple-200">
              <MathText>{'\\alpha\' + \\beta\' + \\gamma\' = 360^\\circ'}</MathText>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Bármely konvex sokszög (így a háromszög) csúcsainként felvett külső szögeinek összege mindig <strong>360°</strong>.
            </p>
          </div>
        </div>

        {/* Exterior Angle SVG Illustration (Compact & Accurate) */}
        <div className="pt-3 flex justify-center">
          <div className="w-full max-w-[460px]">
            <GeometryFigureCard
              title="A külső szög szemléltetése: α' = β + γ"
              subtitle="A belső szög (α) és mellette lévő külső szög (α') mellékszögek: α + α' = 180°, valamint α' = β + γ"
              badge="KÜLSŐ SZÖG"
              variant="teal"
              grid={true}
              figureHeight="min-h-[145px]"
            >
              <svg viewBox="0 0 280 145" className="w-full h-auto max-h-[145px] max-w-[300px] mx-auto">
                {/* Baseline extension to left (from 20 to 80) and side AB (80 to 230) */}
                <line x1="20" y1="115" x2="80" y2="115" className="stroke-slate-400 stroke-dasharray-[3,3] stroke-[1.5]" />
                <line x1="80" y1="115" x2="230" y2="115" className="stroke-teal-600 stroke-2" />
                
                {/* Triangle sides AC and BC: A=(80, 115), B=(230, 115), C=(140, 35) */}
                <line x1="80" y1="115" x2="140" y2="35" className="stroke-teal-600 stroke-2" />
                <line x1="230" y1="115" x2="140" y2="35" className="stroke-teal-600 stroke-2" />

                {/* Subtle triangle area fill */}
                <polygon points="80,115 230,115 140,35" className="fill-teal-500/10" />

                {/* External angle alpha' at vertex A: bounded by the extension of BA (left) and side AC */}
                <path d="M 80,115 L 54,115 A 26,26 0 0,1 95.6,94.2 Z" fill="rgba(225, 29, 72, 0.12)" />
                <path d="M 54,115 A 26,26 0 0,1 95.6,94.2" fill="none" className="stroke-rose-600 stroke-[2.5]" />
                <text x="56" y="85" textAnchor="middle" className="text-[12px] font-black fill-rose-600">α'</text>

                {/* Internal angle alpha at vertex A: bounded by side AB and side AC */}
                <path d="M 80,115 L 98,115 A 18,18 0 0,0 90.8,100.6 Z" fill="rgba(37, 99, 235, 0.14)" />
                <path d="M 98,115 A 18,18 0 0,0 90.8,100.6" fill="none" className="stroke-blue-600 stroke-2" />
                <text x="105" y="106" className="text-[11px] font-bold fill-blue-600">α</text>

                {/* Angle beta at vertex B: bounded by side BA and side BC */}
                <path d="M 230,115 L 210,115 A 20,20 0 0,1 215,102 Z" fill="rgba(79, 70, 229, 0.12)" />
                <path d="M 210,115 A 20,20 0 0,1 215,102" fill="none" className="stroke-indigo-600 stroke-2" />
                <text x="200" y="110" className="text-[10px] font-bold fill-indigo-600">β</text>

                {/* Angle gamma at vertex C: bounded by side CA and side CB */}
                <path d="M 140,35 L 129,49 A 18,18 0 0,0 153,47 Z" fill="rgba(147, 51, 234, 0.12)" />
                <path d="M 129,49 A 18,18 0 0,0 153,47" fill="none" className="stroke-purple-600 stroke-2" />
                <text x="140" y="62" textAnchor="middle" className="text-[10px] font-bold fill-purple-600">γ</text>

                {/* Vertices */}
                <circle cx="80" cy="115" r="3.5" className="fill-teal-700" />
                <circle cx="230" cy="115" r="3.5" className="fill-teal-700" />
                <circle cx="140" cy="35" r="3.5" className="fill-teal-700" />

                {/* Vertex Labels */}
                <text x="80" y="130" textAnchor="middle" className="text-[11px] font-black fill-slate-800 dark:fill-slate-200">A</text>
                <text x="235" y="128" className="text-[11px] font-black fill-slate-800 dark:fill-slate-200">B</text>
                <text x="140" y="24" textAnchor="middle" className="text-[11px] font-black fill-slate-800 dark:fill-slate-200">C</text>
              </svg>
            </GeometryFigureCard>
          </div>
        </div>
      </TheorySection>

      {/* 4. FEJEZET: HÁROMSZÖGEK CSOPORTOSÍTÁSA */}
      <TheorySection
        number={4}
        title="Háromszögek csoportosítása szögek és oldalak szerint"
        icon={<Shapes className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badge="KATEGÓRIÁK"
        badgeColor="indigo"
      >
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          A háromszögeket két fő szempont szerint osztályozhatjuk: a <strong>belső szögeik nagysága</strong>, illetve az <strong>oldalaik egymáshoz viszonyított hossza</strong> alapján.
        </p>

        {/* 1. Csoportosítás belső szögek szerint (3 típus) */}
        <div className="pt-2">
          <h4 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-xs">A</span>
            Csoportosítás a belső szögek nagysága szerint:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Hegyesszögű */}
            <div className="p-3 rounded-2xl border-2 border-teal-200 dark:border-teal-900/60 bg-white dark:bg-slate-850 space-y-1.5 shadow-xs">
              <span className="text-[10px] font-black uppercase text-teal-700 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded">
                MIND &lt; 90°
              </span>
              <h5 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Hegyesszögű háromszög</h5>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Mindhárom belső szöge hegyesszög (<MathText size="sm">{'< 90^\\circ'}</MathText>). Példa: <MathText size="sm">{'50^\\circ, 60^\\circ, 70^\\circ'}</MathText>.
              </p>
            </div>

            {/* Derékszögű */}
            <div className="p-3 rounded-2xl border-2 border-indigo-200 dark:border-indigo-900/60 bg-white dark:bg-slate-850 space-y-1.5 shadow-xs">
              <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded">
                EGY = 90°
              </span>
              <h5 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Derékszögű háromszög</h5>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pontosan egy derékszöge van. A másik két szög hegyesszög és összegük <strong className="text-indigo-600">α + β = 90°</strong> (pótszögek).
              </p>
            </div>

            {/* Tompaszögű */}
            <div className="p-3 rounded-2xl border-2 border-rose-200 dark:border-rose-900/60 bg-white dark:bg-slate-850 space-y-1.5 shadow-xs">
              <span className="text-[10px] font-black uppercase text-rose-700 bg-rose-50 dark:bg-rose-950 px-2 py-0.5 rounded">
                EGY &gt; 90°
              </span>
              <h5 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Tompaszögű háromszög</h5>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pontosan egy tompaszöge van (<MathText size="sm">{'> 90^\\circ'}</MathText>). A másik két szög szükségképpen hegyesszög.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Csoportosítás oldalak hossza szerint (3 típus) */}
        <div className="pt-3">
          <h4 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-md bg-purple-100 text-purple-700 flex items-center justify-center font-black text-xs">B</span>
            Csoportosítás az oldalak hossza szerint:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Általános */}
            <div className="p-3 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 space-y-1.5 shadow-xs">
              <span className="text-[10px] font-black uppercase text-slate-700 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                a ≠ b ≠ c
              </span>
              <h5 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Általános háromszög</h5>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Minden oldala és minden szöge különböző hosszúságú és nagyságú. Nincs szimmetriatengelye.
              </p>
            </div>

            {/* Egyenlő szárú */}
            <div className="p-3 rounded-2xl border-2 border-teal-200 dark:border-teal-900/60 bg-white dark:bg-slate-850 space-y-1.5 shadow-xs">
              <span className="text-[10px] font-black uppercase text-teal-700 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded">
                a = b (szárak)
              </span>
              <h5 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Egyenlő szárú háromszög</h5>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Két oldala (szárai) egyenlő hosszúságú. Az alapon fekvő szögek egyenlők (<MathText size="sm">{'\\alpha = \\beta'}</MathText>). 1 szimmetriatengelye van.
              </p>
            </div>

            {/* Szabályos */}
            <div className="p-3 rounded-2xl border-2 border-purple-200 dark:border-purple-900/60 bg-white dark:bg-slate-850 space-y-1.5 shadow-xs">
              <span className="text-[10px] font-black uppercase text-purple-700 bg-purple-50 dark:bg-purple-950 px-2 py-0.5 rounded">
                a = b = c
              </span>
              <h5 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Szabályos háromszög</h5>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Mindhárom oldala egyenlő. Mindhárom belső szöge pontosan <MathText size="sm">{'60^\\circ'}</MathText>. 3 szimmetriatengelye van.
              </p>
            </div>
          </div>
        </div>

        {/* Impossible combination trap */}
        <TheoryTrapBox title="Lehet-e egy háromszögnek két tompaszöge vagy két derékszöge?">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <strong>Nem, szigorúan lehetetlen!</strong> Ha két szöge derékszög lenne (<MathText size="sm">{'90^\\circ + 90^\\circ = 180^\\circ'}</MathText>), 
            a harmadik szögre <MathText size="sm">{'0^\\circ'}</MathText> maradna. Ha két tompaszöge lenne (<MathText size="sm">{'> 90^\\circ + > 90^\\circ > 180^\\circ'}</MathText>), 
            a szögösszeg máris meghaladná a 180°-ot. 
            Ezért bármely háromszögben <strong>legfeljebb egy tompa- vagy derékszög</strong> lehet, a másik kettőnek mindig hegyesszögnek kell lennie!
          </p>
        </TheoryTrapBox>
      </TheorySection>

      {/* 5. FEJEZET: ÖSSZEFOGLALÓ TÁBLÁZAT ÉS TÍPUSFELADATOK */}
      <TheorySection
        number={5}
        title="Összefoglaló táblázat és mintafeladatok"
        icon={<Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badge="ÖSSZEFOGLALÁS"
        badgeColor="indigo"
      >
        <TheoryTable
          title="A Háromszög Oldal- és Szögösszefüggéseinek Áttekintése"
          headers={['Tétel / Tulajdonság', 'Képlet / Feltétel', 'Példa', 'Fontos megjegyzés']}
          rows={[
            [
              <strong>Háromszög-egyenlőtlenség</strong>,
              'a + b > c',
              '3, 4, 6 cm (3+4 > 6)',
              'Két rövidebb oldal összege nagyobb a harmadiknál'
            ],
            [
              <strong>Belső szögek összege</strong>,
              'α + β + γ = 180°',
              '40° + 60° + 80° = 180°',
              'Minden síkbeli háromszögre kötelező érvényű'
            ],
            [
              <strong>Külső szög tétele</strong>,
              'α\' = β + γ',
              'α\' = 60° + 80° = 140°',
              'Egyenlő a két nem mellette fekvő belső szög összegével'
            ],
            [
              <strong>Külső szögek összege</strong>,
              'α\' + β\' + γ\' = 360°',
              '140° + 120° + 100° = 360°',
              'Csúcsonként 1-1 külső szöget összeadva'
            ],
            [
              <strong>Nagyobb oldal ↔ Nagyobb szög</strong>,
              'a > b ⟺ α > β',
              'a=8 cm, b=5 cm ⟹ α > β',
              'Leghosszabb oldallal szemben a legnagyobb szög van'
            ],
            [
              <strong>Egyenlő szárú háromszög</strong>,
              'a = b ⟺ α = β',
              'Alapszögek: 50°, 50° ⟹ Szárszög: 80°',
              'Alapon fekvő két belső szög mindig megegyezik'
            ],
            [
              <strong>Szabályos háromszög</strong>,
              'a = b = c ⟺ α = β = γ',
              'Mindhárom szög = 60°',
              'Minden szabályos háromszög egyben hegyesszögű is'
            ]
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default TriangleSidesAnglesTheory;
