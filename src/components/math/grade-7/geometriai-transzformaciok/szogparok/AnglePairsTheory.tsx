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
import { Card } from '@/components/ui/card';
import {
  Compass,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Sliders,
  MoveHorizontal,
  Target
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';

interface AnglePairsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const AnglePairsTheory: React.FC<AnglePairsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive Lab state
  const [labMode, setLabMode] = useState<'intersecting' | 'parallel' | 'zigzag'>('intersecting');
  const [angleAlpha, setAngleAlpha] = useState<number>(65); // 20°..160°
  const [parallelAngleType, setParallelAngleType] = useState<'corresponding' | 'alternate' | 'consecutive'>('corresponding');
  const [zigzagTop, setZigzagTop] = useState<number>(35); // 20°..60°
  const [zigzagBottom, setZigzagBottom] = useState<number>(45); // 20°..60°

  // Derived angles for intersecting lines
  const beta = 180 - angleAlpha;

  return (
    <TheoryTemplate
      badgeText="7. OSZTÁLY • GEOMETRIA • 📖 TANANYAG"
      title="7. Szögpárok"
      subtitle="Mellékszögek, csúcsszögek, pótszögek, kiegészítő szögek, párhuzamos és merőleges szárú szögpárok"
      themeColor="amber"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      pdfFilename="7_osztaly_szogparok.pdf"
      quickRule={{
        label: 'A szögpárok alaptételei',
        formula: 'Mellékszögek: α + β = 180°; Csúcsszögek: α = α\'; Váltószögek: α = β; Társszögek: α + β = 180°'
      }}
    >
      {/* 1. SZEKCIÓ: KÉT METSZŐ EGYENES SZÖGEI */}
      <TheorySection
        number={1}
        title="Két metsző egyenes szögei: Mellékszögek és Csúcsszögek"
        badgeColor="amber"
        icon={<Compass className="w-5 h-5 text-amber-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <TheoryCard
            title="Mellékszögek (Összegük mindig 180°)"
            badge="Alapfogalom"
            badgeColor="amber"
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
              Két szöget <strong>mellékszögnek</strong> nevezünk, ha egyik száruk <strong>közös</strong>, a másik két száruk pedig egymás meghosszabbítása (egy egyenest alkotnak).
            </p>
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 text-xs space-y-1.5 mb-3">
              <div className="font-bold text-amber-900 dark:text-amber-200">Fontos tulajdonság:</div>
              <p className="text-slate-700 dark:text-slate-300">
                A mellékszögek együtt mindig egy egyenesszöget alkotnak, ezért összegük pontosan <MathText>{'180^\\circ'}</MathText>:
              </p>
              <div className="text-center font-mono font-bold text-amber-700 dark:text-amber-300 text-sm">
                α + β = 180° &nbsp;⟹&nbsp; β = 180° - α
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Példa: Ha <MathText>{'\\alpha = 50^\\circ'}</MathText>, akkor a mellékszöge <MathText>{'\\beta = 180^\\circ - 50^\\circ = 130^\\circ'}</MathText>.
            </p>
          </TheoryCard>

          <GeometryFigureCard
            title="Mellékszögek és Csúcsszögek ábrája"
            note="α és β mellékszögek (összegük 180°); α és α' csúcsszögek (egyenlők)."
            figure={
              <svg viewBox="0 0 280 140" className="w-full h-36 mx-auto">
                {/* Two intersecting lines through center (140, 70) */}
                <line x1="30" y1="120" x2="250" y2="20" stroke="#94a3b8" strokeWidth="2" />
                <line x1="30" y1="20" x2="250" y2="120" stroke="#94a3b8" strokeWidth="2" />

                {/* Angle arcs */}
                {/* Left acute α (140, 70) - from 155° to 205° */}
                <path d="M 105 55 A 40 40 0 0 1 105 85" fill="#fef3c7" stroke="#d97706" strokeWidth="2.5" />
                {/* Right acute α' (140, 70) */}
                <path d="M 175 55 A 40 40 0 0 1 175 85" fill="#fef3c7" stroke="#d97706" strokeWidth="2.5" />
                {/* Top obtuse β */}
                <path d="M 105 55 A 40 40 0 0 1 175 55" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
                {/* Bottom obtuse β' */}
                <path d="M 105 85 A 40 40 0 0 0 175 85" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />

                {/* Center point O */}
                <circle cx="140" cy="70" r="3.5" fill="#b45309" />
                <text x="145" y="65" className="text-[10px] font-bold fill-amber-800">O</text>

                {/* Labels */}
                <text x="85" y="74" className="text-[11px] font-bold fill-amber-700">α</text>
                <text x="190" y="74" className="text-[11px] font-bold fill-amber-700">α'</text>
                <text x="136" y="42" className="text-[11px] font-bold fill-sky-700">β</text>
                <text x="136" y="105" className="text-[11px] font-bold fill-sky-700">β'</text>
              </svg>
            }
          />
        </div>

        <TheoryCard
          title="Csúcsszögek (Egyenlő nagyságúak!)"
          badge="Alaptétel"
          badgeColor="amber"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
                Két szöget <strong>csúcsszögnek</strong> nevezünk, ha közös a csúcsuk, és mindkét szár a másik szög szárainak meghosszabbítása (egymással szemközt helyezkednek el).
              </p>
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 text-xs">
                <strong>Geometriai kapcsolat a középpontos tükrözéssel:</strong> A csúcsszögek egymás középpontos tükörképei a metszéspontra (<MathText>{'O'}</MathText>) vonatkozóan.
                Mivel a középpontos tükrözés szögtartó egybevágóság:
                <div className="text-center font-bold text-amber-700 dark:text-amber-300 text-sm mt-1">
                  α = α' &nbsp;&nbsp; és &nbsp;&nbsp; β = β'
                </div>
              </div>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                <strong>Bizonyítás mellékszögekkel:</strong><br />
                <MathText>{'\\alpha + \\beta = 180^\\circ'}</MathText> (mert mellékszögek)<br />
                <MathText>{'\\alpha\' + \\beta = 180^\\circ'}</MathText> (mert mellékszögek)<br />
                Kivonva a két egyenletet: <MathText>{'\\alpha - \\alpha\' = 0 \\implies \\alpha = \\alpha\''}</MathText>!
              </div>
              <p className="text-slate-500 italic">
                Tehát két metsző egyenes összesen 4 szöget zár be: két pár egyenlő csúcsszöget és 4 pár 180°-ra kiegészítő mellékszöget.
              </p>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. SZEKCIÓ: PÓTSZÖGEK ÉS KIEGÉSZÍTŐ SZÖGEK */}
      <TheorySection
        number={2}
        title="Összegszerű szögkapcsolatok: Pótszögek és Kiegészítő szögek"
        badgeColor="amber"
        icon={<Sparkles className="w-5 h-5 text-amber-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <TheoryCard
            title="Pótszögek (Összegük 90°)"
            badge="Derékszög"
            badgeColor="amber"
          >
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 mb-3">
              <p className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                Két olyan szög, amelyeknek összege pontosan 90° (derékszög):
              </p>
              <div className="text-center font-mono font-bold text-emerald-700 dark:text-emerald-300 text-sm mt-1">
                α + β = 90° &nbsp;⟹&nbsp; β = 90° - α
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              💡 <strong>Nem szükséges közös szárral rendelkezniük!</strong> Bármely két szög lehet pótszög, ha az összegük 90°. Például a derékszögű háromszög két hegyesszöge mindig pótszögpárt alkot (<MathText>{'\\alpha + \\beta = 90^\\circ'}</MathText>).
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Példa: <MathText>{'35^\\circ'}</MathText> pótszöge <MathText>{'90^\\circ - 35^\\circ = 55^\\circ'}</MathText>.
            </p>
          </TheoryCard>

          <TheoryCard
            title="Kiegészítő szögek (Összegük 180°)"
            badge="Egyenesszög"
            badgeColor="amber"
          >
            <div className="p-3 bg-sky-50 dark:bg-sky-950/40 rounded-xl border border-sky-200 dark:border-sky-800 mb-3">
              <p className="text-sm font-bold text-sky-900 dark:text-sky-200">
                Két olyan szög, amelyeknek összege pontosan 180° (egyenesszög):
              </p>
              <div className="text-center font-mono font-bold text-sky-700 dark:text-sky-300 text-sm mt-1">
                α + β = 180° &nbsp;⟹&nbsp; β = 180° - α
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              💡 <strong>Mellékszög vs. Kiegészítő szög különbség:</strong>
              Minden mellékszögpár kiegészítő szög is egyben, de nem minden kiegészítő szögpár mellékszög (a kiegészítő szögeknek nem kötelező szomszédosnak lenniük).
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Példa: <MathText>{'112^\\circ'}</MathText> kiegészítő szöge <MathText>{'180^\\circ - 112^\\circ = 68^\\circ'}</MathText>.
            </p>
          </TheoryCard>
        </div>

        <TheoryTable
          title="Összegszerű szögpárok összehasonlító táblázata"
          headers={['Megnevezés', 'Összegük', 'Szükséges közös szár?', 'Tipikus geometriai előfordulás']}
          rows={[
            ['Pótszögek', '90° (derékszög)', '❌ Nem feltétel', 'Derékszögű háromszög két hegyesszöge'],
            ['Kiegészítő szögek', '180° (egyenesszög)', '❌ Nem feltétel', 'Trapéz száron fekvő szögei, húrnégyszög szemközti szögei'],
            ['Mellékszögek', '180° (egyenesszög)', '✅ Igen (egyenesen fekszenek)', 'Egyenes és félegyenes metszéspontja, sokszög belső és külső szöge']
          ]}
        />
      </TheorySection>

      {/* 3. SZEKCIÓ: PÁRHUZAMOS SZÁRÚ SZÖGPÁROK */}
      <TheorySection
        number={3}
        title="Párhuzamos szárú szögpárok (Két párhuzamost metsző egyenes)"
        badgeColor="amber"
        icon={<MoveHorizontal className="w-5 h-5 text-amber-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <TheoryCard
            title="A 3 alapvető párhuzamos szögpár típus"
            badge="Tétel"
            badgeColor="amber"
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
              Ha két párhuzamos egyenest (<MathText>{'e \\parallel f'}</MathText>) egy harmadik metszőegyenes (<MathText>{'g'}</MathText>) metsz, 8 szög keletkezik. Ezek a szárak állása szerint három csoportba sorolhatók:
            </p>
            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-800">
                <span className="font-bold text-amber-800 dark:text-amber-300">1. Egyállású szögek (F-alak):</span>
                <p className="text-slate-600 dark:text-slate-300 mt-0.5">
                  A metszőegyenes azonos oldalán, azonos irányba néző szárak. <strong>Mindig egyenlők:</strong> <MathText>{'\\alpha = \\beta'}</MathText>.
                </p>
              </div>
              <div className="p-2.5 bg-sky-50 dark:bg-sky-950/40 rounded-lg border border-sky-200 dark:border-sky-800">
                <span className="font-bold text-sky-800 dark:text-sky-300">2. Váltószögek (Z-alak, belső vagy külső):</span>
                <p className="text-slate-600 dark:text-slate-300 mt-0.5">
                  A metszőegyenes ellentétes oldalán, ellentétes irányba mutató szárak. <strong>Mindig egyenlők:</strong> <MathText>{'\\alpha = \\beta'}</MathText>. (Középpontos tükrözéssel fedésbe hozhatók!)
                </p>
              </div>
              <div className="p-2.5 bg-purple-50 dark:bg-purple-950/40 rounded-lg border border-purple-200 dark:border-purple-800">
                <span className="font-bold text-purple-800 dark:text-purple-300">3. Társszögek (csatolt szögek, C- vagy U-alak):</span>
                <p className="text-slate-600 dark:text-slate-300 mt-0.5">
                  A metszőegyenes azonos oldalán, a két párhuzamos egyenes között egymás felé mutató szárak. <strong>Összegük 180°:</strong> <MathText>{'\\alpha + \\beta = 180^\\circ'}</MathText>.
                </p>
              </div>
            </div>
          </TheoryCard>

          <GeometryFigureCard
            title="Párhuzamosokat metsző egyenes szögei"
            note="Egyállású szögek (F): egyenlők; Váltószögek (Z): egyenlők; Társszögek (C): összegük 180°."
            figure={
              <svg viewBox="0 0 280 140" className="w-full h-36 mx-auto">
                {/* Two parallel lines e and f */}
                <line x1="20" y1="40" x2="260" y2="40" stroke="#0284c7" strokeWidth="2" />
                <line x1="20" y1="100" x2="260" y2="100" stroke="#0284c7" strokeWidth="2" />
                <text x="264" y="44" className="text-[10px] font-bold fill-sky-700">e</text>
                <text x="264" y="104" className="text-[10px] font-bold fill-sky-700">f</text>

                {/* Transversal line g */}
                <line x1="60" y1="130" x2="210" y2="15" stroke="#d97706" strokeWidth="2" />
                <text x="215" y="20" className="text-[10px] font-bold fill-amber-700">g</text>

                {/* Upper intersection (162, 40) */}
                <circle cx="162" cy="40" r="3" fill="#d97706" />
                {/* Angle arc α1 (top right) */}
                <path d="M 182 40 A 20 20 0 0 0 174 29" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
                <text x="180" y="32" className="text-[10px] font-bold fill-amber-800">α</text>

                {/* Lower intersection (84, 100) */}
                <circle cx="84" cy="100" r="3" fill="#d97706" />
                {/* Corresponding angle arc α2 (top right of lower line) */}
                <path d="M 104 100 A 20 20 0 0 0 96 89" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
                <text x="102" y="92" className="text-[10px] font-bold fill-amber-800">α (egyállású)</text>

                {/* Alternate angle arc (bottom left of upper line) */}
                <path d="M 142 40 A 20 20 0 0 0 150 51" fill="none" stroke="#10b981" strokeWidth="2" />
                <text x="130" y="55" className="text-[9px] font-bold fill-emerald-700">α (váltó)</text>

                {/* Consecutive angle (top left of lower line) */}
                <path d="M 64 100 A 20 20 0 0 1 72 89" fill="none" stroke="#8b5cf6" strokeWidth="2" />
                <text x="45" y="92" className="text-[9px] font-bold fill-purple-700">β (társ)</text>
              </svg>
            }
          />
        </div>

        <TheoryCallout
          type="tip"
          title="A Párhuzamossági Kritérium (Megfordítás)"
        >
          <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
            A tétel <strong>megfordítása is igaz</strong>, ami a geometria egyik legfontosabb bizonyítási eszköze:<br />
            Ha két egyenest egy harmadik metsz, és az <strong>egyállású</strong> (vagy váltó-) szögek egyenlők, vagy a <strong>társszögek összege 180°</strong>, akkor a két egyenes <strong>szükségszerűen párhuzamos</strong> (<MathText>{'e \\parallel f'}</MathText>)!
          </p>
        </TheoryCallout>

        {/* MERŐLEGES SZÁRÚ SZÖGPÁROK */}
        <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-800">
          <div className="flex items-center gap-2 mb-2 text-amber-800 dark:text-amber-300 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
            <span>Merőleges szárú szögpárok szabálya:</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
            Ha két szög szárai páronként merőlegesek egymásra:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-amber-800">
              <strong>Azonos típus esetén (mindkettő hegyesszög vagy tompaszög):</strong><br />
              A szögek <strong>egyenlők</strong>: <MathText>{'\\alpha = \\beta'}</MathText>.
            </div>
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-amber-800">
              <strong>Különböző típus esetén (egyik hegyesszög, másik tompaszög):</strong><br />
              A szögek <strong>összege 180°</strong>: <MathText>{'\\alpha + \\beta = 180^\\circ'}</MathText>.
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: INTERAKTÍV SZÖGLABORATÓRIUM */}
      <TheorySection
        number={4}
        title="Interaktív Szöglaboratórium: Fedezd fel a szögkapcsolatokat dinamikusan!"
        badgeColor="amber"
        icon={<Sliders className="w-5 h-5 text-amber-600" />}
      >
        <Card className="p-5 bg-gradient-to-br from-amber-50/50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 border-2 border-amber-200 dark:border-amber-800 rounded-2xl shadow-sm">
          {/* Lab Header Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-slate-200 dark:border-slate-700 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kísérlet típusa:</span>
              <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
                <Button
                  size="sm"
                  variant={labMode === 'intersecting' ? 'default' : 'ghost'}
                  onClick={() => setLabMode('intersecting')}
                  className="text-xs h-7 rounded-lg"
                >
                  Metsző egyenesek
                </Button>
                <Button
                  size="sm"
                  variant={labMode === 'parallel' ? 'default' : 'ghost'}
                  onClick={() => setLabMode('parallel')}
                  className="text-xs h-7 rounded-lg"
                >
                  Párhuzamos szárú
                </Button>
                <Button
                  size="sm"
                  variant={labMode === 'zigzag' ? 'default' : 'ghost'}
                  onClick={() => setLabMode('zigzag')}
                  className="text-xs h-7 rounded-lg"
                >
                  Z-alak / Töröttvonal
                </Button>
              </div>
            </div>

            {/* Slider or Sub-controls */}
            {labMode === 'intersecting' && (
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  Hajlásszög (α): <strong>{angleAlpha}°</strong>
                </span>
                <input
                  type="range"
                  min="20"
                  max="160"
                  value={angleAlpha}
                  onChange={(e) => setAngleAlpha(Number(e.target.value))}
                  className="w-32 accent-amber-600"
                />
              </div>
            )}

            {labMode === 'parallel' && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600 dark:text-slate-400">Kiemelés:</span>
                <div className="inline-flex gap-1">
                  <Button
                    size="sm"
                    variant={parallelAngleType === 'corresponding' ? 'default' : 'outline'}
                    onClick={() => setParallelAngleType('corresponding')}
                    className="text-xs h-7 px-2"
                  >
                    Egyállású (F)
                  </Button>
                  <Button
                    size="sm"
                    variant={parallelAngleType === 'alternate' ? 'default' : 'outline'}
                    onClick={() => setParallelAngleType('alternate')}
                    className="text-xs h-7 px-2"
                  >
                    Váltószög (Z)
                  </Button>
                  <Button
                    size="sm"
                    variant={parallelAngleType === 'consecutive' ? 'default' : 'outline'}
                    onClick={() => setParallelAngleType('consecutive')}
                    className="text-xs h-7 px-2"
                  >
                    Társszög (C)
                  </Button>
                </div>
              </div>
            )}

            {labMode === 'zigzag' && (
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500">Felső α: {zigzagTop}°</span>
                <input
                  type="range"
                  min="20"
                  max="60"
                  value={zigzagTop}
                  onChange={(e) => setZigzagTop(Number(e.target.value))}
                  className="w-20 accent-amber-600"
                />
                <span className="text-xs text-slate-500">Alsó β: {zigzagBottom}°</span>
                <input
                  type="range"
                  min="20"
                  max="60"
                  value={zigzagBottom}
                  onChange={(e) => setZigzagBottom(Number(e.target.value))}
                  className="w-20 accent-amber-600"
                />
              </div>
            )}
          </div>

          {/* SVG Canvas Area */}
          <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex flex-col items-center">
            {labMode === 'intersecting' && (
              <svg viewBox="0 0 360 200" className="w-full max-w-lg h-52 select-none">
                {/* Horizontal line */}
                <line x1="30" y1="100" x2="330" y2="100" stroke="#94a3b8" strokeWidth="2.5" />
                
                {/* Slanted line through (180, 100) with angleAlpha */}
                {(() => {
                  const rad = (angleAlpha * Math.PI) / 180;
                  const len = 120;
                  const x1 = 180 - len * Math.cos(rad);
                  const y1 = 100 + len * Math.sin(rad);
                  const x2 = 180 + len * Math.cos(rad);
                  const y2 = 100 - len * Math.sin(rad);
                  return (
                    <>
                      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#d97706" strokeWidth="2.5" />
                      {/* Center Point */}
                      <circle cx="180" cy="100" r="4.5" fill="#b45309" />
                      <text x="186" y="94" className="text-[10px] font-bold fill-amber-800">O</text>

                      {/* Display angles */}
                      {/* Right-top angle (alpha) */}
                      <text x="215" y="80" className="text-xs font-bold fill-amber-600">
                        α = {angleAlpha}°
                      </text>
                      {/* Left-top angle (beta) */}
                      <text x="105" y="80" className="text-xs font-bold fill-sky-600">
                        β = {beta}°
                      </text>
                      {/* Left-bottom angle (alpha') */}
                      <text x="105" y="130" className="text-xs font-bold fill-amber-600">
                        α' = {angleAlpha}°
                      </text>
                      {/* Right-bottom angle (beta') */}
                      <text x="215" y="130" className="text-xs font-bold fill-sky-600">
                        β' = {beta}°
                      </text>

                      {/* Arc highlights */}
                      <circle cx="180" cy="100" r="30" fill="none" stroke="#d97706" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
                    </>
                  );
                })()}
              </svg>
            )}

            {labMode === 'parallel' && (
              <svg viewBox="0 0 360 200" className="w-full max-w-lg h-52 select-none">
                {/* 2 Parallel lines */}
                <line x1="30" y1="60" x2="330" y2="60" stroke="#0284c7" strokeWidth="2.5" />
                <line x1="30" y1="140" x2="330" y2="140" stroke="#0284c7" strokeWidth="2.5" />
                <text x="334" y="64" className="text-[11px] font-bold fill-sky-700">e</text>
                <text x="334" y="144" className="text-[11px] font-bold fill-sky-700">f</text>

                {/* Transversal line passing through (200, 60) and (130, 140) */}
                <line x1="230" y1="25" x2="100" y2="175" stroke="#d97706" strokeWidth="2.5" />
                <text x="235" y="30" className="text-[11px] font-bold fill-amber-700">g</text>

                {/* Intersections: P1 (200, 60) and P2 (130, 140) */}
                <circle cx="200" cy="60" r="4" fill="#0284c7" />
                <circle cx="130" cy="140" r="4" fill="#0284c7" />

                {/* Highlights based on selected type */}
                {parallelAngleType === 'corresponding' && (
                  <>
                    {/* F-shape: Upper right at P1 and P2 */}
                    <path d="M 225 60 A 25 25 0 0 0 216 42" fill="#fef3c7" stroke="#d97706" strokeWidth="3" />
                    <text x="225" y="45" className="text-xs font-bold fill-amber-700">α = 50°</text>

                    <path d="M 155 140 A 25 25 0 0 0 146 122" fill="#fef3c7" stroke="#d97706" strokeWidth="3" />
                    <text x="155" y="125" className="text-xs font-bold fill-amber-700">α = 50° (egyállású)</text>

                    <text x="70" y="30" className="text-xs font-bold fill-amber-800">
                      ✅ Egyállású szögek (F-alak): azonos irányú szárak ⟹ EGYENLŐK (α = 50°)
                    </text>
                  </>
                )}

                {parallelAngleType === 'alternate' && (
                  <>
                    {/* Z-shape: Inner alternate at P1 (bottom-left) and P2 (top-right) */}
                    <path d="M 175 60 A 25 25 0 0 0 184 78" fill="#dcfce7" stroke="#16a34a" strokeWidth="3" />
                    <text x="155" y="80" className="text-xs font-bold fill-emerald-700">α = 50°</text>

                    <path d="M 155 140 A 25 25 0 0 0 146 122" fill="#dcfce7" stroke="#16a34a" strokeWidth="3" />
                    <text x="155" y="125" className="text-xs font-bold fill-emerald-700">α = 50° (váltószög)</text>

                    {/* Z-line highlight */}
                    <line x1="120" y1="60" x2="200" y2="60" stroke="#16a34a" strokeWidth="2.5" />
                    <line x1="200" y1="60" x2="130" y2="140" stroke="#16a34a" strokeWidth="2.5" />
                    <line x1="130" y1="140" x2="210" y2="140" stroke="#16a34a" strokeWidth="2.5" />

                    <text x="70" y="30" className="text-xs font-bold fill-emerald-800">
                      ✅ Belső váltószögek (Z-alak): ellentétes irányú szárak ⟹ EGYENLŐK (α = 50°)
                    </text>
                  </>
                )}

                {parallelAngleType === 'consecutive' && (
                  <>
                    {/* C-shape / Consecutive: P1 bottom-left and P2 top-left */}
                    <path d="M 175 60 A 25 25 0 0 0 184 78" fill="#ede9fe" stroke="#7c3aed" strokeWidth="3" />
                    <text x="155" y="80" className="text-xs font-bold fill-purple-700">α = 50°</text>

                    <path d="M 105 140 A 25 25 0 0 1 114 122" fill="#ede9fe" stroke="#7c3aed" strokeWidth="3" />
                    <text x="65" y="125" className="text-xs font-bold fill-purple-700">β = 130°</text>

                    <text x="50" y="30" className="text-xs font-bold fill-purple-800">
                      ✅ Társszögek (C-alak): azonos oldali belső szögek ⟹ ÖSSZEGÜK 180° (50° + 130° = 180°)
                    </text>
                  </>
                )}
              </svg>
            )}

            {labMode === 'zigzag' && (
              <svg viewBox="0 0 360 200" className="w-full max-w-lg h-52 select-none">
                {/* 2 Parallel lines */}
                <line x1="30" y1="40" x2="330" y2="40" stroke="#0284c7" strokeWidth="2.5" />
                <line x1="30" y1="160" x2="330" y2="160" stroke="#0284c7" strokeWidth="2.5" />
                <text x="334" y="44" className="text-[11px] font-bold fill-sky-700">e</text>
                <text x="334" y="164" className="text-[11px] font-bold fill-sky-700">f</text>

                {/* Zigzag vertices: P1(100, 40) -> V(220, 100) -> P2(120, 160) */}
                <polyline points="100,40 220,100 120,160" fill="none" stroke="#d97706" strokeWidth="3" />
                <circle cx="100" cy="40" r="4" fill="#0284c7" />
                <circle cx="220" cy="100" r="4" fill="#b45309" />
                <circle cx="120" cy="160" r="4" fill="#0284c7" />

                {/* Auxiliary parallel line through V(220, 100) */}
                <line x1="50" y1="100" x2="310" y2="100" stroke="#94a3b8" strokeDasharray="4 3" strokeWidth="1.5" />
                <text x="315" y="104" className="text-[10px] italic fill-slate-500">segédegyenes ∥ e, f</text>

                {/* Top angle alpha at P1 */}
                <text x="120" y="55" className="text-xs font-bold fill-amber-700">α = {zigzagTop}°</text>
                {/* Bottom angle beta at P2 */}
                <text x="135" y="150" className="text-xs font-bold fill-sky-700">β = {zigzagBottom}°</text>

                {/* Middle angle gamma at V */}
                <text x="230" y="105" className="text-xs font-bold fill-emerald-600">
                  γ = α + β = {zigzagTop + zigzagBottom}°
                </text>

                {/* Explanation banner */}
                <text x="40" y="25" className="text-[11px] font-bold fill-slate-700 dark:fill-slate-200">
                  💡 Csúcsszabály: A balra nyíló szögek összege = a jobbra nyíló szögek összege!
                </text>
              </svg>
            )}

            {/* Explanation box */}
            <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 w-full text-center">
              <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                {labMode === 'intersecting' && `Ha α = ${angleAlpha}°, akkor a mellékszöge β = ${beta}°. A szemközti csúcsszögek pontosan megegyeznek.`}
                {labMode === 'parallel' && parallelAngleType === 'corresponding' && 'Egyállású szögek: Párhuzamos eltolással pontosan egymásba vihetők, így egyenlők.'}
                {labMode === 'parallel' && parallelAngleType === 'alternate' && 'Váltószögek: A metszéspontok felezőpontjára való középpontos tükrözéssel egymásba vihetők!'}
                {labMode === 'parallel' && parallelAngleType === 'consecutive' && 'Társszögek: Egy belső szög és a másik szög mellékszöge egyállású, ezért összegük 180°.'}
                {labMode === 'zigzag' && `A segédegyenes behúzásával a középső szög két váltószögre bomlik: γ = ${zigzagTop}° + ${zigzagBottom}° = ${zigzagTop + zigzagBottom}°.`}
              </span>
            </div>
          </div>
        </Card>
      </TheorySection>

      {/* 5. SZEKCIÓ: GYAKORI TÉVHITEK ÉS BUKTATÓK */}
      <TheorySection
        number={5}
        title="Tipikus buktatók és tévhitek a szögpároknál"
        badgeColor="amber"
        icon={<AlertTriangle className="w-5 h-5 text-amber-500" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="1. Tévhit: A váltószögek mindig egyenlők"
            correction="A váltószögek (és egyállású szögek) CSAK AKKOR egyenlők, ha a két metszett egyenes PÁRHUZAMOS egymással! Ha az egyenesek nem párhuzamosak, a váltószögek különböznek."
          />
          <TheoryTrapBox
            title="2. Tévhit: Minden kiegészítő szögpár mellékszög is"
            correction="Nem igaz! A kiegészítő szögeknek csak az összegük 180°, nem kell közös szárral rendelkezniük. A mellékszögeknek kötelező közös szárral és egyenesbe eső másik szárakkal bírniuk."
          />
          <TheoryTrapBox
            title="3. Tévhit: A csúcsszögek összege 180°"
            correction="Nem 180°, hanem EGYENLŐK (α = α')! Összegük csak akkor 180°, ha mindkettő pontosan 90°-os derékszög (merőleges metszés esetén)."
          />
          <TheoryTrapBox
            title="4. Tévhit: A merőleges szárú szögek mindig derékszögek"
            correction="Nem a szögek nagysága 90°, hanem a száruk merőleges a másik szög száraira! A merőleges szárú szögek vagy EGYENLŐK (ha azonos típusúak), vagy ÖSSZEGÜK 180° (ha egyik hegyes, másik tompa)."
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default AnglePairsTheory;
