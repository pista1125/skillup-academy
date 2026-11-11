import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable,
  MathText
} from '../TheoryTemplate';
import {
  GeometryReviewMapSvg,
  ThalesAndAngleSynthesisSvg
} from './GeometryReviewFigures';
import {
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Compass,
  Sparkles,
  BookOpen,
  Layers,
  ArrowRight,
  Calculator,
  CheckSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GeometryReviewTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const GeometryReviewTheory: React.FC<GeometryReviewTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interactive Lab State: Képtár és Tétel-Böngésző ---
  const [selectedPillar, setSelectedPillar] = useState<'congruence' | 'circle' | 'angles' | 'polygons'>('congruence');

  const pillars = {
    congruence: {
      title: '1. Háromszögek egybevágósága',
      badge: '4 ALAPESET',
      color: 'emerald',
      rule: '△ABC ≅ △A\'B\'C\'',
      details: [
        'o-o-o (SSS): 3 oldal páronként egyenlő.',
        'o-sz-o (SAS): 2 oldal és a közbezárt szög egyenlő.',
        'sz-o-sz (ASA): 1 oldal és a rajta fekvő 2 szög egyenlő.',
        'o-o-sz (SSA): 2 oldal és a NAGYOBBIK oldallal szemközti szög egyenlő (a ≥ b)!'
      ],
      trap: 'CSAPDA: Ha a szög a kisebbik oldallal szemben van, a feladatnak 2 különböző, nem egybevágó megoldása is lehet!'
    },
    circle: {
      title: '2. A kör kerülete és területe, körgyűrű',
      badge: 'METRIKA & π',
      color: 'cyan',
      rule: 'K = 2πr, T = πr²',
      details: [
        'Kör kerülete: K = 2πr = πd',
        'Kör területe: T = πr² = (πd²)/4',
        'Körgyűrű területe: T_gyűrű = π(R² - r²) = π(R - r)(R + r)',
        'Arányosság: Sugár 2× nő ⟹ Kerület 2×, Terület 4× (négyzetes!) nő.'
      ],
      trap: 'CSAPDA: A körgyűrű területe NEM egyenlő π(R - r)²-tel!'
    },
    angles: {
      title: '3. Középponti és kerületi szögek, ívek, cikkek',
      badge: 'SZÖGTÉTELEK',
      color: 'blue',
      rule: 'α = 2β, i = (πrα)/180°, T_c = (i·r)/2',
      details: [
        'Középponti és kerületi szög: Ugyanazon az íven α = 2β (a kerületi szög a fele!).',
        'Thálész-tétel: Átmérő feletti kerületi szög mindig 90°!',
        'Körív hossza: i = (2πr · α) / 360° = (πrα) / 180°',
        'Körcikk területe: T_c = (πr² · α) / 360° = (i · r) / 2 (mint alap · magasság / 2!)'
      ],
      trap: 'CSAPDA: Az ívnél 180°-kal, a körcikknél 360°-kal osztunk a nevezőben!'
    },
    polygons: {
      title: '4. Húrnégyszögek, érintőnégyszögek és szabályos sokszögek',
      badge: 'SOKSZÖGEK & KÖRÖK',
      color: 'purple',
      rule: 'α + γ = 180°, a + c = b + d, T = s·r',
      details: [
        'Húrnégyszög: Szemközti szögek összege 180° (α + γ = β + δ = 180°).',
        'Érintőnégyszög: Szemközti oldalak összege egyenlő (a + c = b + d).',
        'Érintősokszög területe: T = s · r (félkerület × sugár).',
        'Szimmetrikus érintőtrapéz: b = (a+c)/2, m = 2r = √(ac).'
      ],
      trap: 'CSAPDA: Az általános paralelogramma vagy rombusz NEM húrnégyszög!'
    }
  };

  const current = pillars[selectedPillar];

  return (
    <TheoryTemplate
      badgeText="10. OSZTÁLY • VI. EGYBEVÁGÓSÁG ÉS KÖR • TANANYAG"
      title="Gyakorlás, tudáspróba: Egybevágóság és kör"
      subtitle="A témakör négy pillérének (egybevágóság, kör metrika, ívek és szögek, sokszögek) nagy szintézise, képlettára és döntési fája."
      themeColor="indigo"
      pdfFilename="10_osztaly_egybevagosag_es_kor_osszefoglalo_ismetles.pdf"
      quickRule={{
        label: 'A VI. TÉMAKÖR NÉGY PILLÉRE – NÉGYZETES ÖSSZEFOGLALÓ',
        align: 'left',
        formula: (
          <div className="space-y-2.5 text-slate-800 text-xs sm:text-sm">
            <div className="bg-indigo-50/90 p-2.5 rounded-xl border border-indigo-200">
              <span className="font-black text-indigo-900 block mb-0.5">A 4 fő geometriai terület alaptörvényei:</span>
              <ul className="space-y-1 font-mono text-indigo-950 mt-1">
                <li>• <strong>1. Egybevágóság:</strong> SSS, SAS, ASA, SSA (a ≥ b)</li>
                <li>• <strong>2. Kör metrika:</strong> K = 2πr, T = πr², T_gyűrű = π(R² - r²)</li>
                <li>• <strong>3. Ívek &amp; Szögek:</strong> α = 2β, Thálész (90°), i = (πrα)/180°, T_c = (i·r)/2</li>
                <li>• <strong>4. Sokszögek:</strong> Húr: α+γ=180°, Érintő: a+c=b+d, T = s·r</li>
              </ul>
            </div>
            <div className="bg-emerald-50 p-2 rounded-lg border border-emerald-200 text-emerald-900 text-[11px] leading-tight font-medium">
              <strong>💡 VIZSGASTRATÉGIA:</strong> Minden geometriai feladat megoldását kezdd az adatok típusának (szög, szakasz, ív, sokszög) és a megfelelő pillér kiválasztásával!
            </div>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Készen állsz az átfogó ismétlő feladatsorra?"
      practiceSubtitle="Gyakorold mind a 4 pillér kérdéseit a 30 kérdéses felkészítő kvízben!"
      interactiveSection={
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 border-2 border-indigo-500/30 rounded-3xl p-5 sm:p-7 text-white shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-800/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-500 text-white rounded-2xl shadow-lg">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-indigo-100">
                  Interaktív Geometriai Tétel- &amp; Pillér-Böngésző
                </h3>
                <p className="text-xs text-indigo-300/80">
                  Kattints a témakörök gombjaira, és nézd át az alapvető képleteket és kritikus csapdákat!
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="outline"
                className={`text-xs h-8 ${selectedPillar === 'congruence' ? 'bg-emerald-600 text-white font-bold border-emerald-400' : 'bg-slate-800/80 border-slate-700 text-slate-200'}`}
                onClick={() => setSelectedPillar('congruence')}
              >
                1. Egybevágóság
              </Button>
              <Button
                size="sm"
                variant="outline"
                className={`text-xs h-8 ${selectedPillar === 'circle' ? 'bg-cyan-600 text-white font-bold border-cyan-400' : 'bg-slate-800/80 border-slate-700 text-slate-200'}`}
                onClick={() => setSelectedPillar('circle')}
              >
                2. Kör Alapok
              </Button>
              <Button
                size="sm"
                variant="outline"
                className={`text-xs h-8 ${selectedPillar === 'angles' ? 'bg-blue-600 text-white font-bold border-blue-400' : 'bg-slate-800/80 border-slate-700 text-slate-200'}`}
                onClick={() => setSelectedPillar('angles')}
              >
                3. Ívek &amp; Szögek
              </Button>
              <Button
                size="sm"
                variant="outline"
                className={`text-xs h-8 ${selectedPillar === 'polygons' ? 'bg-purple-600 text-white font-bold border-purple-400' : 'bg-slate-800/80 border-slate-700 text-slate-200'}`}
                onClick={() => setSelectedPillar('polygons')}
              >
                4. Sokszögek
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    {current.title}
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-indigo-900/60 text-indigo-300 border border-indigo-700">
                    {current.badge}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 font-mono text-cyan-300 text-sm font-bold border border-slate-800">
                  {current.rule}
                </div>

                <ul className="space-y-1.5 text-xs text-slate-300 font-sans leading-relaxed">
                  {current.details.map((d, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>

                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/50 text-xs text-rose-200 leading-snug">
                  {current.trap}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <GeometryReviewMapSvg />
            </div>
          </div>
        </div>
      }
    >
      {/* 1. Szakasz: Nagy szünoptikus összehasonlító táblázat */}
      <TheorySection
        id="szunoptikus-tablazat"
        number={1}
        title="A VI. fejezet nagy tételtára és képlettára"
        badge="KÉPLETTÁR"
        badgeColor="indigo"
      >
        <TheoryTable
          headers={['Témakör', 'Alapképlet / Tétel', 'Érvényességi feltétel', 'Tipikus érettségi alkalmazás']}
          rows={[
            ['Háromszög egybevágóság', 'SSS, SAS, ASA, SSA', 'SSA esetén a szög a nagyobb oldallal szemközti!', 'Szakaszok és szögek egyenlőségének igazolása.'],
            ['Kör kerülete és területe', 'K = 2πr, T = πr²', 'r = d/2 (mindig sugárral számolunk!)', 'Kerékfordulatok, festékfedés, virágágyások.'],
            ['Körgyűrű', 'T = π(R² - r²)', 'R > r (koncentrikus körök)', 'Sétányok a tó körül, csövek keresztmetszete.'],
            ['Középponti & kerületi szög', 'α = 2β', 'Csak az azonos ívhez tartozó szögekre!', 'Körbe rajzolt háromszögek hiányzó szögei.'],
            ['Thálész-tétel', 'γ = 90°', 'Az egyik oldal a kör átmérője!', 'Derékszögű háromszög köré írt köre (R = c/2).'],
            ['Körív és körcikk', 'i = (πrα)/180°, T_c = (i·r)/2', 'α fokban kifejezve', 'Torta szeletelés, körszórófejek, ablaktörlő.'],
            ['Húrnégyszög', 'α + γ = β + δ = 180°', 'Szemközti szögek összege 180°!', 'Húrtrapéz (szimmetrikus trapéz) szögei.'],
            ['Érintőnégyszög', 'a + c = b + d', 'Szemközti oldalak összege egyenlő!', 'Rombusz, deltoid, érintőtrapéz.'],
            ['Érintősokszög területe', 'T = s · r', 's = K/2 (félkerület)', 'Beírt kör sugarának meghatározása a területből.']
          ]}
        />
      </TheorySection>

      {/* 2. Szakasz: Döntési fa */}
      <TheorySection
        id="dontesi-fa"
        number={2}
        title="Geometriai döntési fa érettségi feladatokhoz"
        badge="STRATÉGIA"
        badgeColor="purple"
      >
        <TheoryCard title="Mikor melyik összefüggést vedd elő a vizsgán?" color="purple">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 space-y-2">
              <span className="font-bold text-purple-900 dark:text-purple-200 block">
                1. Ha szög vagy körív van a feladatban:
              </span>
              <p>• Nézd meg, van-e átmérő! Ha igen ➔ <strong>Thálész-tétel</strong> (90°)!</p>
              <p>• Nézd meg, ugyanarra az ívre támaszkodik-e ➔ <strong>α = 2β</strong> (középponti szög a kerületi kétszerese)!</p>
              <p>• Ha négyszög csúcsai a körön vannak ➔ <strong>α + γ = 180°</strong> (húrnégyszög)!</p>
            </div>

            <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 space-y-2">
              <span className="font-bold text-indigo-900 dark:text-indigo-200 block">
                2. Ha oldalhossz vagy terület a kérdés:
              </span>
              <p>• Ha a négyszög oldalai érintik a kört ➔ <strong>a + c = b + d</strong> és <strong>T = s · r</strong>!</p>
              <p>• Ha szimmetrikus érintőtrapéz ➔ <strong>b = (a+c)/2</strong> és <strong>m = 2r = √(ac)</strong>!</p>
              <p>• Ha körcikk területe kell és megvan az ívhossz ➔ <strong>T_c = (i · r)/2</strong>!</p>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>
    </TheoryTemplate>
  );
};
