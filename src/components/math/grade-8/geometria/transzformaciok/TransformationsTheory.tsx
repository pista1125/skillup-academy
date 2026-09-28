import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  GeometryFigureCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import {
  GitCompare,
  RotateCw,
  Target,
  Compass,
  Shapes,
  Maximize2,
  RefreshCw,
  Calculator,
  ArrowRightLeft,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  MoveHorizontal,
  FlipHorizontal,
  Layers
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';

interface TransformationsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

type TransformType = 'axial' | 'central' | 'rotation' | 'translation' | 'identity';

export const TransformationsTheory: React.FC<TransformationsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive Transformation & Invariant Inspector
  const [selectedTransform, setSelectedTransform] = useState<TransformType>('axial');

  // Interactive quick self-check question
  const [selfTestAnswer, setSelfTestAnswer] = useState<number | null>(null);
  const [selfTestSubmitted, setSelfTestSubmitted] = useState<boolean>(false);

  return (
    <TheoryTemplate
      documentId="grade-8-geometria-transzformaciok"
      pdfFilename="8_osztaly_geometria_transzformaciok_tananyag.pdf"
      title="2. Geometriai transzformációk"
      subtitle="Leképezések, invariáns tulajdonságok, fixpontok és invariáns egyenesek a síkban"
      emoji="🔀"
      topicBadge="8. Osztály • II. Témakör: Geometria"
      badgeText="8. Osztály • Matematika"
      estimatedReadTime="14 perc"
      difficulty="Közepes"
      quickRule={{
        label: "Fontos szabály: Fixpontok & Invariánsok",
        formula: "Fixpont: P' = P  |  Invariáns egyenes: e' = e  |  Fixegyenes: az egyenes minden pontja fixpont"
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      themeColor="teal"
      grade={8}
      chapterId="geometria"
      topicId="g8-geom-transforms"
    >
      {/* 1. SZEKCIÓ: A GEOMETRIAI TRANSZFORMÁCIÓ FOGALMA */}
      <TheorySection
        number={1}
        title="A geometriai transzformáció (leképezés) fogalma"
        icon={<GitCompare className="w-5 h-5 text-teal-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Mi a geometriai transzformáció?"
            icon={<Target className="w-4 h-4 text-teal-600" />}
            tag="Alapfogalom"
          >
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
              A sík egy <strong>geometriai transzformációja (vagy geometriai leképezése)</strong> olyan utasítás (függvény),
              amely a sík minden egyes <MathText>P</MathText> pontjához hozzárendeli a sík egyértelműen meghatározott <MathText>P'</MathText> pontját.
            </p>
            <div className="p-3 bg-teal-50/70 dark:bg-teal-950/40 rounded-xl border border-teal-200 dark:border-teal-800 text-xs space-y-1.5 font-sans">
              <div><strong>Tárgypont (eredeti pont):</strong> a kiindulási <MathText>P</MathText> pont.</div>
              <div><strong>Képpont:</strong> a hozzárendelt <MathText>P'</MathText> pont.</div>
              <div><strong>Alakzat képe:</strong> az alakzat összes pontjához rendelt képpontok összessége (ponthalmaza).</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Kölcsönösen egyértelmű (bijektív) leképezés"
            icon={<ArrowRightLeft className="w-4 h-4 text-emerald-600" />}
            tag="Fontos feltétel"
          >
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
              Az általános iskolában és felvételin tanult geometriai transzformációk mind <strong>kölcsönösen egyértelműek</strong>:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <li>Minden ponthoz pontosan egy képpont tartozik.</li>
              <li>Különböző pontokhoz különböző képpontok tartoznak (<MathText>A \neq B \implies A' \neq B'</MathText>).</li>
              <li>A sík bármely pontja előáll képpontként (invertálható: visszacsinálható).</li>
            </ul>
            <div className="mt-3 p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg text-emerald-800 dark:text-emerald-300 text-xs font-bold">
              💡 Következmény: az alakzatok nem „szakadnak szét” és nem „olvadnak össze”!
            </div>
          </TheoryCard>
        </div>

        <GeometryFigureCard
          title="Pont leképezése és alakzat képe"
          caption="A transzformáció a P tárgypontot a P' képpontba viszi át; az ABC háromszög képe az A'B'C' háromszög."
        >
          <svg viewBox="0 0 460 140" className="w-full max-w-lg mx-auto h-auto">
            {/* Grid background hint */}
            <defs>
              <pattern id="gridTransf" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#cbd5e1" strokeWidth="0.5" strokeOpacity="0.4" />
              </pattern>
            </defs>
            <rect width="460" height="140" fill="url(#gridTransf)" />

            {/* Original Triangle ABC */}
            <polygon points="50,110 110,110 70,40" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2" />
            <circle cx="50" cy="110" r="3.5" fill="#0f766e" />
            <circle cx="110" cy="110" r="3.5" fill="#0f766e" />
            <circle cx="70" cy="40" r="3.5" fill="#0f766e" />
            <text x="36" y="122" className="text-[10px] font-black fill-teal-900">A</text>
            <text x="116" y="122" className="text-[10px] font-black fill-teal-900">B</text>
            <text x="66" y="32" className="text-[10px] font-black fill-teal-900">C</text>
            <text x="65" y="90" className="text-[9px] font-bold fill-teal-800">Tárgy (F)</text>

            {/* Mapping arrow */}
            <g>
              <path d="M 130 75 C 190 35, 230 35, 280 70" fill="none" stroke="#0284c7" strokeWidth="2.5" strokeDasharray="4 3" />
              <polygon points="286,72 278,63 274,73" fill="#0284c7" />
              <rect x="180" y="35" width="70" height="20" rx="6" fill="#f0f9ff" stroke="#38bdf8" strokeWidth="1.2" />
              <text x="188" y="49" className="text-[9px] font-bold fill-sky-800">Transzformáció</text>
            </g>

            {/* Transformed Triangle A'B'C' */}
            <polygon points="310,120 370,120 360,50" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2" />
            <circle cx="310" cy="120" r="3.5" fill="#4338ca" />
            <circle cx="370" cy="120" r="3.5" fill="#4338ca" />
            <circle cx="360" cy="50" r="3.5" fill="#4338ca" />
            <text x="296" y="132" className="text-[10px] font-black fill-indigo-900">A'</text>
            <text x="376" y="132" className="text-[10px] font-black fill-indigo-900">B'</text>
            <text x="366" y="46" className="text-[10px] font-black fill-indigo-900">C'</text>
            <text x="330" y="100" className="text-[9px] font-bold fill-indigo-800">Kép (F')</text>
          </svg>
        </GeometryFigureCard>
      </TheorySection>

      {/* 2. SZEKCIÓ: FIXPONTOK, FIXEGYENESEK ÉS INVARIÁNS EGYENESEK */}
      <TheorySection
        number={2}
        title="Fixpontok, fixegyenesek és invariáns egyenesek"
        icon={<Target className="w-5 h-5 text-teal-600" />}
      >
        <TheoryCallout type="tip" title="Aranyszabály: a pontonkénti és a halmazszintű változatlanság megkülönböztetése">
          A felvételik és dolgozatok egyik <strong>leggyakoribb buktatója</strong> a fixegyenes és az invariáns egyenes közötti különbség!
          Jegyezd meg: a <em>fixegyenesen</em> minden egyes pont a helyén marad; az <em>invariáns egyenes</em> egésze marad helyben vonalként, de a rajta lévő pontok elmozdulhatnak rajta belül.
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4">
          <div className="p-3.5 rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-950/30">
            <div className="flex items-center gap-1.5 font-black text-xs text-emerald-900 dark:text-emerald-200 mb-1.5">
              <span className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center text-[10px]">1</span>
              Fixpont (<MathText>P' = P</MathText>)
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Olyan pont, amelyet a leképezés <strong>önmagába visz át</strong>. A képpont pontosan egybeesik a tárgyponttal.
            </p>
            <div className="mt-2 text-[11px] font-mono text-emerald-700 dark:text-emerald-400 bg-white/70 dark:bg-slate-900/60 p-1.5 rounded">
              Példa: tükörtengely pontjai, tükörközéppont, forgáscentrum.
            </div>
          </div>

          <div className="p-3.5 rounded-xl border-2 border-teal-200 dark:border-teal-800 bg-teal-50/60 dark:bg-teal-950/30">
            <div className="flex items-center gap-1.5 font-black text-xs text-teal-900 dark:text-teal-200 mb-1.5">
              <span className="w-5 h-5 rounded-md bg-teal-600 text-white flex items-center justify-center text-[10px]">2</span>
              Fixegyenes (pontonként fix)
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Olyan egyenes, amelynek <strong>minden egyes pontja fixpont</strong> (<MathText>\forall P \in e: P' = P</MathText>).
            </p>
            <div className="mt-2 text-[11px] font-mono text-teal-700 dark:text-teal-400 bg-white/70 dark:bg-slate-900/60 p-1.5 rounded">
              Példa: a tengelyes tükrözés tükörtengelye (és CSAK az!).
            </div>
          </div>

          <div className="p-3.5 rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-purple-50/60 dark:bg-purple-950/30">
            <div className="flex items-center gap-1.5 font-black text-xs text-purple-900 dark:text-purple-200 mb-1.5">
              <span className="w-5 h-5 rounded-md bg-purple-600 text-white flex items-center justify-center text-[10px]">3</span>
              Invariáns egyenes (<MathText>e' = e</MathText>)
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Olyan egyenes, amelynek képe mint <strong>ponthalmaz önmaga</strong>, de pontjai elmozdulhatnak az egyenesen belül.
            </p>
            <div className="mt-2 text-[11px] font-mono text-purple-700 dark:text-purple-400 bg-white/70 dark:bg-slate-900/60 p-1.5 rounded">
              Példa: tengelyre merőlegesek, középponton átmenők.
            </div>
          </div>
        </div>

        <TheoryTrapBox
          title="Típushiba felvételin és témazárón!"
          wrong="„Minden invariáns egyenes egyben fixegyenes is.”"
          correct="„Minden fixegyenes invariáns egyenes, de visszafelé NEM igaz!”"
          explanation="Egy invariáns egyenes pontjai átfordulhatnak vagy elcsúszhatnak az egyenes vonalán belül (pl. a középpontos tükrözésnél a centrumon átmenő egyenes pontjai átcserélődnek az O pontra nézve: ponthalmazként önmagára képeződik le, de nem fixegyenes!). Fixegyenesről csak akkor beszélünk, ha az egyenes minden egyes pontja a helyén marad (mint a tengelyes tükrözés tengelye)."
        />
      </TheorySection>

      {/* 3. SZEKCIÓ: INTERAKTÍV FIX ALAKZATOK ÉS TRANSZFORMÁCIÓK SZIMULÁTOR */}
      <TheorySection
        number={3}
        title="Interaktív labor: fixpontok és invariánsok vizsgálata"
        icon={<Compass className="w-5 h-5 text-teal-600" />}
      >
        <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white shadow-lg border border-teal-800">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="text-xs font-black uppercase tracking-wider text-teal-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-teal-400" />
              Válassz transzformációt és nézd meg az invariánsokat!
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-900/80 text-teal-200 border border-teal-700">
              Interaktív demonstráció
            </span>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 mb-4">
            <button
              onClick={() => setSelectedTransform('axial')}
              className={`p-2 rounded-xl text-xs font-bold transition-all text-center border ${
                selectedTransform === 'axial'
                  ? 'bg-teal-500 text-white border-teal-300 shadow-md font-black'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
              }`}
            >
              Tengelyes tükrözés
            </button>
            <button
              onClick={() => setSelectedTransform('central')}
              className={`p-2 rounded-xl text-xs font-bold transition-all text-center border ${
                selectedTransform === 'central'
                  ? 'bg-teal-500 text-white border-teal-300 shadow-md font-black'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
              }`}
            >
              Középpontos tükrözés
            </button>
            <button
              onClick={() => setSelectedTransform('rotation')}
              className={`p-2 rounded-xl text-xs font-bold transition-all text-center border ${
                selectedTransform === 'rotation'
                  ? 'bg-teal-500 text-white border-teal-300 shadow-md font-black'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
              }`}
            >
              Forgatás (α ≠ 180°)
            </button>
            <button
              onClick={() => setSelectedTransform('translation')}
              className={`p-2 rounded-xl text-xs font-bold transition-all text-center border ${
                selectedTransform === 'translation'
                  ? 'bg-teal-500 text-white border-teal-300 shadow-md font-black'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
              }`}
            >
              Párhuzamos eltolás
            </button>
            <button
              onClick={() => setSelectedTransform('identity')}
              className={`p-2 rounded-xl text-xs font-bold transition-all text-center border ${
                selectedTransform === 'identity'
                  ? 'bg-teal-500 text-white border-teal-300 shadow-md font-black'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
              }`}
            >
              Identitás (helybenhagyás)
            </button>
          </div>

          {/* Visualization Area */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Left: SVG Diagram (7 cols) */}
            <div className="md:col-span-7 bg-slate-950/70 p-3 rounded-xl border border-slate-800 flex items-center justify-center min-h-[180px]">
              {selectedTransform === 'axial' && (
                <svg viewBox="0 0 280 160" className="w-full h-36">
                  {/* Axis line (t) */}
                  <line x1="140" y1="10" x2="140" y2="150" stroke="#14b8a6" strokeWidth="3" />
                  <text x="146" y="24" className="text-[10px] font-black fill-teal-400">t (Fixegyenes)</text>

                  {/* Fixpoints on axis */}
                  <circle cx="140" cy="50" r="4" fill="#2dd4bf" />
                  <circle cx="140" cy="90" r="4" fill="#2dd4bf" />
                  <circle cx="140" cy="130" r="4" fill="#2dd4bf" />

                  {/* Perpendicular invariant lines */}
                  <line x1="20" y1="60" x2="260" y2="60" stroke="#a855f7" strokeWidth="1.8" strokeDasharray="3 3" />
                  <text x="25" y="54" className="text-[9px] font-bold fill-purple-300">n ⊥ t (Invariáns egyenes)</text>

                  <line x1="20" y1="110" x2="260" y2="110" stroke="#a855f7" strokeWidth="1.8" strokeDasharray="3 3" />

                  {/* Reflected point pair on perpendicular */}
                  <circle cx="70" cy="110" r="3.5" fill="#38bdf8" />
                  <text x="64" y="103" className="text-[9px] font-bold fill-sky-300">P</text>
                  <circle cx="210" cy="110" r="3.5" fill="#38bdf8" />
                  <text x="212" y="103" className="text-[9px] font-bold fill-sky-300">P'</text>
                  <path d="M 75 110 L 205 110" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
                </svg>
              )}

              {selectedTransform === 'central' && (
                <svg viewBox="0 0 280 160" className="w-full h-36">
                  {/* Center of symmetry O */}
                  <circle cx="140" cy="80" r="5" fill="#f59e0b" />
                  <text x="147" y="76" className="text-[11px] font-black fill-amber-400">O (Egyetlen Fixpont!)</text>

                  {/* Invariant lines passing through O */}
                  <line x1="20" y1="20" x2="260" y2="140" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 3" />
                  <line x1="20" y1="140" x2="260" y2="20" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 3" />
                  <line x1="20" y1="80" x2="260" y2="80" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 3" />
                  <text x="25" y="74" className="text-[9px] font-bold fill-purple-300">e ∋ O (Invariáns egyenesek)</text>

                  {/* Point pair reflection */}
                  <circle cx="60" cy="40" r="3.5" fill="#38bdf8" />
                  <text x="50" y="36" className="text-[9px] font-bold fill-sky-300">P</text>
                  <circle cx="220" cy="120" r="3.5" fill="#38bdf8" />
                  <text x="225" y="132" className="text-[9px] font-bold fill-sky-300">P'</text>
                </svg>
              )}

              {selectedTransform === 'rotation' && (
                <svg viewBox="0 0 280 160" className="w-full h-36">
                  {/* Rotation center O */}
                  <circle cx="140" cy="80" r="5" fill="#f59e0b" />
                  <text x="147" y="76" className="text-[11px] font-black fill-amber-400">O (Egyetlen Fixpont)</text>

                  {/* Invariant concentric circles */}
                  <circle cx="140" cy="80" r="35" fill="none" stroke="#2dd4bf" strokeWidth="1.8" strokeDasharray="3 3" />
                  <circle cx="140" cy="80" r="60" fill="none" stroke="#2dd4bf" strokeWidth="1.8" strokeDasharray="3 3" />
                  <text x="145" y="135" className="text-[8px] font-bold fill-teal-300">Invariáns körök: k(O, r)</text>

                  {/* Rotated points on circle */}
                  <circle cx="175" cy="80" r="3.5" fill="#38bdf8" />
                  <text x="180" y="80" className="text-[9px] font-bold fill-sky-300">P</text>
                  <circle cx="140" cy="45" r="3.5" fill="#38bdf8" />
                  <text x="135" y="38" className="text-[9px] font-bold fill-sky-300">P' (+90°)</text>
                  <path d="M 175 75 A 35 35 0 0 0 145 45" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
                </svg>
              )}

              {selectedTransform === 'translation' && (
                <svg viewBox="0 0 280 160" className="w-full h-36">
                  {/* Translation vector v */}
                  <line x1="80" y1="30" x2="160" y2="30" stroke="#f59e0b" strokeWidth="3" />
                  <polygon points="166,30 156,24 156,36" fill="#f59e0b" />
                  <text x="115" y="24" className="text-[10px] font-black fill-amber-400">v⃗ (Eltolásvektor)</text>

                  {/* Invariant lines parallel to v */}
                  <line x1="20" y1="70" x2="260" y2="70" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 3" />
                  <text x="25" y="64" className="text-[9px] font-bold fill-purple-300">e ∥ v⃗ (Invariáns egyenes)</text>

                  <line x1="20" y1="120" x2="260" y2="120" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 3" />
                  <text x="25" y="114" className="text-[9px] font-bold fill-purple-300">f ∥ v⃗ (Invariáns egyenes)</text>

                  {/* Moved points */}
                  <circle cx="60" cy="120" r="3.5" fill="#38bdf8" />
                  <text x="55" y="135" className="text-[9px] font-bold fill-sky-300">P</text>
                  <circle cx="140" cy="120" r="3.5" fill="#38bdf8" />
                  <text x="135" y="135" className="text-[9px] font-bold fill-sky-300">P'</text>
                  <path d="M 65 120 L 135 120" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 2" />
                </svg>
              )}

              {selectedTransform === 'identity' && (
                <svg viewBox="0 0 280 160" className="w-full h-36">
                  <rect x="30" y="25" width="220" height="110" rx="12" fill="#042f2e" stroke="#14b8a6" strokeWidth="2" />
                  <text x="65" y="65" className="text-[12px] font-black fill-teal-200">MINDEN PONT FIXPONT!</text>
                  <text x="60" y="85" className="text-[10px] font-bold fill-teal-400">Minden egyenes FIXEGYENES</text>
                  <text x="75" y="105" className="text-[9px] font-mono fill-emerald-300">P' = P bármely P ∈ Sík esetén</text>
                </svg>
              )}
            </div>

            {/* Right: Technical Explanation (5 cols) */}
            <div className="md:col-span-5 bg-slate-900/90 p-3.5 rounded-xl border border-teal-900/60 text-xs space-y-2">
              {selectedTransform === 'axial' && (
                <>
                  <div className="font-black text-teal-300 text-sm">Tengelyes tükrözés (t)</div>
                  <div><strong className="text-white">Fixpontok:</strong> a <MathText>t</MathText> tengely összes pontja (végtelen sok fixpont).</div>
                  <div><strong className="text-white">Fixegyenes:</strong> egyedül a <MathText>t</MathText> tengely!</div>
                  <div><strong className="text-white">Invariáns egyenesek:</strong> maga a <MathText>t</MathText> tengely, valamint a <MathText>t</MathText>-re <strong>merőleges összes egyenes</strong> (<MathText>e \perp t</MathText>).</div>
                  <div><strong className="text-white">Invariáns körök:</strong> amelyek középpontja a <MathText>t</MathText> tengelyre esik.</div>
                  <div className="text-[11px] text-amber-300 font-semibold pt-1 border-t border-slate-800">
                    Körüljárási irány: MEGFORDUL (indirekt leképezés)!
                  </div>
                </>
              )}

              {selectedTransform === 'central' && (
                <>
                  <div className="font-black text-amber-300 text-sm">Középpontos tükrözés (O)</div>
                  <div><strong className="text-white">Fixpontok:</strong> kizárólag az <MathText>O</MathText> pont (pontosan 1 fixpont).</div>
                  <div><strong className="text-white">Fixegyenes:</strong> <strong>NINCS!</strong> (Egyetlen olyan egyenes sincs, aminek minden pontja helyben maradna).</div>
                  <div><strong className="text-white">Invariáns egyenesek:</strong> az <MathText>O</MathText> ponton átmenő összes egyenes (<MathText>e \ni O</MathText>).</div>
                  <div><strong className="text-white">Invariáns körök:</strong> az <MathText>O</MathText> középpontú körök.</div>
                  <div className="text-[11px] text-emerald-300 font-semibold pt-1 border-t border-slate-800">
                    Egyenértékű 180°-os forgatással; körüljárást MEGŐRZI!
                  </div>
                </>
              )}

              {selectedTransform === 'rotation' && (
                <>
                  <div className="font-black text-sky-300 text-sm">Forgatás (O, α ≠ 180°)</div>
                  <div><strong className="text-white">Fixpontok:</strong> kizárólag az <MathText>O</MathText> forgásközéppont (1 fixpont).</div>
                  <div><strong className="text-white">Fixegyenes:</strong> NINCS!</div>
                  <div><strong className="text-white">Invariáns egyenesek:</strong> NINCS (minden egyenes elfordul <MathText>\alpha</MathText> szöggel).</div>
                  <div><strong className="text-white">Invariáns körök:</strong> az <MathText>O</MathText> középpontú koncentrikus körök (<MathText>k(O, r)</MathText>).</div>
                  <div className="text-[11px] text-emerald-300 font-semibold pt-1 border-t border-slate-800">
                    Körüljárási irányt MEGŐRZI (direkt egybevágóság)!
                  </div>
                </>
              )}

              {selectedTransform === 'translation' && (
                <>
                  <div className="font-black text-purple-300 text-sm">Párhuzamos eltolás (v⃗ ≠ 0)</div>
                  <div><strong className="text-white">Fixpontok:</strong> <strong>NINCS egyetlen fixpont sem (0 db)!</strong></div>
                  <div><strong className="text-white">Fixegyenes:</strong> NINCS!</div>
                  <div><strong className="text-white">Invariáns egyenesek:</strong> az eltolásvektorral párhuzamos egyenesek (<MathText>{"e \\parallel \\vec{v}"}</MathText>).</div>
                  <div><strong className="text-white">Invariáns körök:</strong> NINCS (minden kör elmozdul).</div>
                  <div className="text-[11px] text-emerald-300 font-semibold pt-1 border-t border-slate-800">
                    Irányt és távolságot is megőrzi (direkt egybevágóság).
                  </div>
                </>
              )}

              {selectedTransform === 'identity' && (
                <>
                  <div className="font-black text-emerald-300 text-sm">Identitás (helybenhagyás)</div>
                  <div><strong className="text-white">Fixpontok:</strong> a sík MINDEN pontja fixpont (végtelen sok).</div>
                  <div><strong className="text-white">Fixegyenes:</strong> a sík MINDEN egyenese fixegyenes!</div>
                  <div><strong className="text-white">Invariáns egyenesek:</strong> a sík minden egyenese.</div>
                  <div><strong className="text-white">Invariáns alakzatok:</strong> bármely síkidom önmagába képződik.</div>
                  <div className="text-[11px] text-emerald-300 font-semibold pt-1 border-t border-slate-800">
                    0°-os elforgatásnak vagy nullvektorral való eltolásnak felel meg.
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: INVARIÁNS TULAJDONSÁGOK RENDSZEREZÉSE */}
      <TheorySection
        number={4}
        title="Invariáns tulajdonságok összehasonlító táblázata"
        icon={<Layers className="w-5 h-5 text-teal-600" />}
      >
        <TheoryTable
          headers={['Transzformáció', 'Fixpontok', 'Fixegyenesek', 'Invariáns egyenesek', 'Körüljárási irány']}
          rows={[
            [
              'Tengelyes tükrözés (t)',
              'Végtelen sok (a tengely pontjai)',
              '1 db (a t tengely)',
              'A t tengely ÉS a rá merőlegesek',
              'Megfordul (indirekt)'
            ],
            [
              'Középpontos tükrözés (O)',
              'Pontosan 1 db (az O pont)',
              'Nincs',
              'Az O ponton átmenő összes egyenes',
              'Megmarad (direkt)'
            ],
            [
              'Forgatás (O, α ≠ 180°)',
              'Pontosan 1 db (az O pont)',
              'Nincs',
              'Nincs',
              'Megmarad (direkt)'
            ],
            [
              'Párhuzamos eltolás (v⃗ ≠ 0)',
              'Nincs (0 db)',
              'Nincs',
              'Az eltolásvektorral párhuzamosak',
              'Megmarad (direkt)'
            ],
            [
              'Identitás (helybenhagyás)',
              'A sík minden pontja',
              'A sík minden egyenese',
              'A sík minden egyenese',
              'Megmarad (direkt)'
            ]
          ]}
        />

        <div className="mt-4 p-4 rounded-xl border border-teal-200 dark:border-teal-800 bg-teal-50/40 dark:bg-teal-950/20">
          <h4 className="font-black text-xs text-teal-900 dark:text-teal-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            Egybevágósági invariánsok vs. Hasonlósági invariánsok
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 dark:text-slate-300">
            <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-lg border border-slate-200 dark:border-slate-800">
              <strong className="text-teal-700 dark:text-teal-300 block mb-1">Minden egybevágóság invariánsai:</strong>
              <ul className="list-disc list-inside space-y-0.5">
                <li>Távolságtartás (<MathText>|A'B'| = |AB|</MathText>)</li>
                <li>Szögtartás (<MathText>\alpha' = \alpha</MathText>)</li>
                <li>Egyenestartás (egyenes képe egyenes)</li>
                <li>Párhuzamosságtartás (<MathText>e \parallel f \implies e' \parallel f'</MathText>)</li>
                <li>Területtartás (<MathText>T' = T</MathText>)</li>
              </ul>
            </div>
            <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-lg border border-slate-200 dark:border-slate-800">
              <strong className="text-purple-700 dark:text-purple-300 block mb-1">Hasonlósági transzformációknál:</strong>
              <ul className="list-disc list-inside space-y-0.5">
                <li>Szögtartás MEGMARAD!</li>
                <li>Aránytartás (<MathText>|A'B'| / |C'D'| = |AB| / |CD|</MathText>)</li>
                <li>Párhuzamosságtartás MEGMARAD!</li>
                <li className="text-rose-600 dark:text-rose-400 font-bold">A távolság NEM invariáns (<MathText>|A'B'| = \lambda \cdot |AB|</MathText>)</li>
                <li className="text-rose-600 dark:text-rose-400 font-bold">A terület NEM invariáns (<MathText>T' = \lambda^2 \cdot T</MathText>)</li>
              </ul>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: GYORS ÖNELLENŐRZŐ KVÍZ */}
      <TheorySection
        number={5}
        title="Gyors tudáspróba (Önellenőrzés)"
        icon={<HelpCircle className="w-5 h-5 text-teal-600" />}
      >
        <div className="p-4 rounded-xl border-2 border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/30 dark:bg-indigo-950/20">
          <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-3">
            Egy <MathText>O</MathText> pontra vonatkozó középpontos tükrözést végzünk. Melyik állítás IGAZ az alábbiak közül?
          </p>

          <div className="space-y-2 mb-3">
            {[
              { id: 0, text: 'Minden, az O ponton átmenő egyenes fixegyenes.' },
              { id: 1, text: 'Az O ponton átmenő egyenesek invariáns egyenesek, de nem fixegyenesek.' },
              { id: 2, text: 'A középpontos tükrözésnek végtelen sok fixpontja van.' },
              { id: 3, text: 'A középpontos tükrözés megfordítja a körüljárási irányt.' }
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  setSelfTestAnswer(option.id);
                  setSelfTestSubmitted(true);
                }}
                className={`w-full p-2.5 rounded-lg text-xs font-semibold text-left transition-all border flex items-center justify-between ${
                  selfTestAnswer === option.id
                    ? option.id === 1
                      ? 'bg-emerald-100 dark:bg-emerald-950 border-emerald-500 text-emerald-950 dark:text-emerald-100 font-bold'
                      : 'bg-rose-100 dark:bg-rose-950 border-rose-500 text-rose-950 dark:text-rose-100 font-bold'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-400 text-slate-800 dark:text-slate-200'
                }`}
              >
                <span>{option.text}</span>
                {selfTestSubmitted && option.id === 1 && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                )}
                {selfTestSubmitted && selfTestAnswer === option.id && option.id !== 1 && (
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0 ml-2" />
                )}
              </button>
            ))}
          </div>

          {selfTestSubmitted && (
            <div className={`p-3 rounded-lg text-xs ${
              selfTestAnswer === 1
                ? 'bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 border border-emerald-300'
                : 'bg-rose-100/80 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200 border border-rose-300'
            }`}>
              {selfTestAnswer === 1 ? (
                <span>🎉 <strong>Kiváló válasz!</strong> Pontosan: az <MathText>O</MathText>-n átmenő egyenesek ponthalmazként önmagukba képződnek (invariánsak), de mivel a pontjaik átfordulnak az <MathText>O</MathText> másik oldalára, nem fixegyenesek!</span>
              ) : (
                <span>⚠️ <strong>Nem egészen!</strong> A helyes válasz a 2.: az egyenesek ponthalmazként önmagukra képződnek (invariáns egyenesek), de pontjaik megfordulnak az <MathText>O</MathText> pontra nézve, így egyedül csak az <MathText>O</MathText> pont fixpont, fixegyenes pedig nincs.</span>
              )}
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default TransformationsTheory;
