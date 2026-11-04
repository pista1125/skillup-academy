import React, { useState, useMemo } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  VectorBasicsSvg,
  VectorAdditionSvg,
  TranslationSvg,
  ScalarMultiplicationSvg
} from './VectorFigures';
import {
  MoveRight,
  Split,
  Sliders,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Scale,
  Plus,
  Minus,
  Maximize2,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VectorTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const VectorTheory: React.FC<VectorTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV VEKTOR LABOR ÁLLAPOTOK ---
  const [ax, setAx] = useState<number>(3);
  const [ay, setAy] = useState<number>(2);
  const [bx, setBx] = useState<number>(1);
  const [by, setBy] = useState<number>(3);
  const [operation, setOperation] = useState<'add' | 'sub' | 'scalar'>('add');
  const [scalarLambda, setScalarLambda] = useState<number>(2);

  // Számított eredményvektor
  const result = useMemo(() => {
    if (operation === 'add') {
      const rx = ax + bx;
      const ry = ay + by;
      const len = Math.sqrt(rx * rx + ry * ry).toFixed(2);
      return { rx, ry, len, label: 'a + b' };
    } else if (operation === 'sub') {
      const rx = ax - bx;
      const ry = ay - by;
      const len = Math.sqrt(rx * rx + ry * ry).toFixed(2);
      return { rx, ry, len, label: 'a − b' };
    } else {
      const rx = ax * scalarLambda;
      const ry = ay * scalarLambda;
      const len = Math.sqrt(rx * rx + ry * ry).toFixed(2);
      return { rx, ry, len, label: `${scalarLambda} · a` };
    }
  }, [ax, ay, bx, by, operation, scalarLambda]);

  const aLen = useMemo(() => Math.sqrt(ax * ax + ay * ay).toFixed(2), [ax, ay]);
  const bLen = useMemo(() => Math.sqrt(bx * bx + by * by).toFixed(2), [bx, by]);

  return (
    <TheoryTemplate
      title="2. Vektorok és az eltolás"
      subtitle="A vektor mint irányított szakasz, vektorműveletek és a síkbeli eltolás mint egybevágósági transzformáció a 9. osztályban"
      badge="9. Osztály • VI. Egybevágóság, négyszögek"
      topicBadge="9. OSZTÁLY • VI. EGYBEVÁGÓSÁG • 2. VEKTOROK ÉS ELTOLÁS"
      onBack={onBack}
      onSwitchToQuiz={onStartQuiz}
      practiceTitle="Készen állsz a vektoros feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 30 válogatott feladatból álló, 3 szintre bontott interaktív kvízben!"
      practiceButtonText="Kvíz indítása"
      quickRule={{
        label: "Aranyszabály: Vektorok láncolása & Koordináták",
        formula: "AB + BC = AC • (a₁; a₂) + (b₁; b₂) = (a₁+b₁; a₂+b₂) • |v| = √(v₁² + v₂²)",
        align: "center"
      }}
    >
      {/* =========================================================================
          1. RÉSZ: A VEKTOR FOGALMA ÉS JELLEMZŐI
      ========================================================================= */}
      <TheorySection
        title="1. A vektor fogalma és alaptulajdonságai"
        icon={<MoveRight className="w-6 h-6 text-emerald-600" />}
      >
        <TheoryCard
          title="Mi a vektor és melyik három adata határozza meg?"
          icon={<Split className="w-5 h-5 text-emerald-600" />}
        >
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A geometriában és a fizikában a skaláris mennyiségekkel (pl. tömeg, idő, hőmérséklet) szemben sok mennyiségnek nemcsak nagysága, hanem iránya is van (pl. elmozdulás, sebesség, erő). A <strong>vektor</strong> matematikailag egy <strong>irányított szakasz</strong>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center my-4">
            <div className="flex justify-center bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <VectorBasicsSvg size={300} />
            </div>

            <div className="space-y-3 text-xs md:text-sm text-slate-700 dark:text-slate-300">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-900">
                <span className="font-bold text-blue-900 dark:text-blue-200">1. Hossz (nagyság / abszolút érték):</span>
                <p className="mt-1">
                  A kezdő- és végpont távolsága: |v| = |AB| ≥ 0. Mindig nemnegatív valós szám.
                </p>
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-900">
                <span className="font-bold text-emerald-900 dark:text-emerald-200">2. Állás:</span>
                <p className="mt-1">
                  A vektort hordozó egyenes állása. Két vektor állása megegyezik, ha hordozó egyeneseik párhuzamosak (vagy egybeesnek).
                </p>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-lg border border-purple-200 dark:border-purple-900">
                <span className="font-bold text-purple-900 dark:text-purple-200">3. Irány:</span>
                <p className="mt-1">
                  A kezdőpontból a végpont felé mutató nyíl iránya. Azonos állású vektorok iránya lehet megegyező vagy ellentétes.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3 text-xs">
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white block mb-1">Nullvektor (0):</span>
              Hossza 0 (|0| = 0), kezdő- és végpontja egybeesik. Iránya tetszőleges, bármely vektorral párhuzamosnak tekinthető.
            </div>
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white block mb-1">Egyenlő vektorok:</span>
              Két vektor akkor és csak akkor egyenlő (a = b), ha hosszuk, állásuk és irányuk is megegyezik (önmagukkal párhuzamosan eltolhatók).
            </div>
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white block mb-1">Ellentett vektor (−v):</span>
              Hossza és állása megegyezik a v vektorral, de iránya pontosan ellentétes. Összegük a nullvektor: v + (−v) = 0.
            </div>
          </div>

          <TheoryCallout
            title="Vektor koordinátái és hossza a síkban"
            variant="info"
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          >
            Ha a kezdőpont A(x₁; y₁) és a végpont B(x₂; y₂), akkor az AB vektor koordinátái a végpontból a kezdőpont kivonásával adódnak:
            <div className="font-mono font-bold text-center text-sm my-2 text-emerald-800 dark:text-emerald-300">
              AB = (x₂ − x₁; &nbsp; y₂ − y₁)
            </div>
            A vektor hossza a Pitagorasz-tétel alapján:
            <div className="font-mono font-bold text-center text-sm text-emerald-800 dark:text-emerald-300">
              |AB| = √((x₂ − x₁)² + (y₂ − y₁)²)
            </div>
          </TheoryCallout>
        </TheoryCard>
      </TheorySection>

      {/* =========================================================================
          2. RÉSZ: VEKTORMŰVELETEK
      ========================================================================= */}
      <TheorySection
        title="2. Vektorműveletek: Összeadás, Kivonás és Skalárral Szorzás"
        icon={<Split className="w-6 h-6 text-indigo-600" />}
      >
        <TheoryCard
          title="Vektorok összeadása: Háromszög- és Paralelogramma-szabály"
          icon={<Plus className="w-5 h-5 text-indigo-600" />}
        >
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Két vektor összeadását geometriailag két teljesen egyenértékű módszerrel hajthatjuk végre:
          </p>

          <div className="flex justify-center my-4">
            <VectorAdditionSvg size={420} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2 text-xs md:text-sm">
            <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-900 space-y-2">
              <h4 className="font-bold text-indigo-900 dark:text-indigo-200">
                1. Háromszög-szabály (Láncszabály)
              </h4>
              <p className="text-slate-600 dark:text-slate-300">
                A második b vektor kezdőpontját az első a vektor végpontjába toljuk. Az összegvektor az első kezdőpontjából a második végpontjába mutat:
              </p>
              <div className="font-mono font-bold text-indigo-700 dark:text-indigo-300 text-center py-1 bg-white dark:bg-slate-900 rounded border border-indigo-100">
                AB + BC = AC
              </div>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-900 space-y-2">
              <h4 className="font-bold text-purple-900 dark:text-purple-200">
                2. Paralelogramma-szabály
              </h4>
              <p className="text-slate-600 dark:text-slate-300">
                Mindkét vektort közös kezdőpontból indítjuk, majd felépítünk egy paralelogrammát.
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-200 text-xs">
                <li><strong>Főátló (közös kezdőpontból induló):</strong> a + b összegvektor.</li>
                <li><strong>Mellékátló (b végpontjából az a végpontjába):</strong> a − b különbségvektor.</li>
              </ul>
            </div>
          </div>
        </TheoryCard>

        <TheoryCard
          title="Vektorkivonás és szorzás valós számmal (skalárral)"
          icon={<Minus className="w-5 h-5 text-indigo-600" />}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center my-2">
            <div className="flex justify-center bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <ScalarMultiplicationSvg size={300} />
            </div>

            <div className="space-y-3 text-xs md:text-sm text-slate-700 dark:text-slate-300">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-900">
                <span className="font-bold text-amber-900 dark:text-amber-200">Vektorkivonás:</span>
                <p className="mt-1">
                  A b vektor kivonása megegyezik a b ellentettjének (−b) hozzáadásával:
                </p>
                <div className="font-mono font-bold text-center text-amber-800 dark:text-amber-300 my-1">
                  a − b = a + (−b)
                </div>
              </div>

              <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-900 dark:text-white">Szorzás számmal (λ · v):</span>
                <ul className="list-disc list-inside mt-1 space-y-1 text-xs">
                  <li>Ha λ &gt; 0: hossza λ-szorosára nő, iránya változatlan.</li>
                  <li>Ha λ &lt; 0: hossza |λ|-szorosára nő, de iránya ellentétesre fordul!</li>
                  <li>Ha λ = 0: eredménye a nullvektor (0 · v = 0).</li>
                </ul>
              </div>
            </div>
          </div>

          <TheoryTable
            headers={['Művelet megnevezése', 'Geometriai szabály', 'Koordinátás számítás']}
            rows={[
              ['Vektorok összeadása', 'Háromszög- és paralelogramma-szabály', '(a₁; a₂) + (b₁; b₂) = (a₁+b₁; a₂+b₂)'],
              ['Vektorok kivonása', 'Ellentett vektor hozzáadása', '(a₁; a₂) − (b₁; b₂) = (a₁−b₁; a₂−b₂)'],
              ['Szorzás számmal (λ)', 'Hossz nyújtása/zsugorítása, előjeltől függő irány', 'λ · (v₁; v₂) = (λ·v₁; λ·v₂)'],
              ['Szakasz felezőpontja', 'A és B helyvektorainak számtani közepe', 'f = (a + b) / 2'],
              ['Háromszög súlypontja', 'A három csúcs helyvektorának átlaga', 's = (a + b + c) / 3']
            ]}
          />
        </TheoryCard>
      </TheorySection>

      {/* =========================================================================
          3. RÉSZ: AZ ELTOLÁS MINT EGYBEVÁGÓSÁG
      ========================================================================= */}
      <TheorySection
        title="3. Az eltolás (transzláció) mint egybevágósági transzformáció"
        icon={<Maximize2 className="w-6 h-6 text-teal-600" />}
      >
        <TheoryCard
          title="Definíció és geometriai tulajdonságok"
          icon={<CheckCircle2 className="w-5 h-5 text-teal-600" />}
        >
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Legyen a síkon rögzítve egy v vektor (eltolásvektor). A sík <strong>eltolása a v vektorral</strong> az a transzformáció, amely a sík minden P pontjához azt a P' pontot rendeli, amelyre:
          </p>
          <div className="font-mono font-bold text-center text-lg text-emerald-600 dark:text-emerald-400 my-2">
            PP' = v
          </div>

          <div className="flex justify-center my-4">
            <TranslationSvg size={340} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2 text-xs md:text-sm">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900 space-y-2">
              <h4 className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Megmaradó tulajdonságok (Egybevágóság)
              </h4>
              <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-200 text-xs">
                <li><strong>Távolságtartó:</strong> |A'B'| = |AB| minden pontpárra.</li>
                <li><strong>Szögtartó és aránytartó:</strong> alakzatok szögei és arányai nem torzulnak.</li>
                <li><strong>Körüljárási irány:</strong> nem fordul meg (a háromszög csúcsainak sorrendje megmarad).</li>
                <li><strong>Párhuzamosságtartó:</strong> bármely egyenes képe vele párhuzamos egyenes (e' || e).</li>
              </ul>
            </div>

            <div className="p-4 bg-sky-50 dark:bg-sky-950/40 rounded-xl border border-sky-200 dark:border-sky-900 space-y-2">
              <h4 className="font-bold text-sky-900 dark:text-sky-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-600" />
                Fix alakzatok vizsgálata
              </h4>
              <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-200 text-xs">
                <li><strong>Fixpont:</strong> Ha v ≠ 0, az eltolásnak <em>egyetlen fixpontja sincs</em>! (Minden pont elmozdul |v| távolságra.)</li>
                <li><strong>Fixegyenesek:</strong> Azok az egyenesek, amelyek <em>párhuzamosak a v vektorral</em> (önmagukba mennek át, a pontok rajtuk csúsznak el).</li>
                <li><strong>Kompozíció:</strong> Két eltolás (v₁ majd v₂) egymásutánja ismét eltolás, a v₁ + v₂ összegvektorral!</li>
              </ul>
            </div>
          </div>
        </TheoryCard>

        {/* CSAPDÁK ÉS TÉVHITEK */}
        <TheoryTrapBox
          title="Típushibák és csapdák a vektoroknál és eltolásnál"
          traps={[
            {
              trap: "Két vektor összege mindig hosszabb, mint a tagok hossza: |a + b| = |a| + |b|.",
              correction: "NEM! A háromszög-egyenlőtlenség szerint |a + b| ≤ |a| + |b|. Csak akkor áll fenn egyenlőség, ha a és b azonos irányúak! Ha ellentétes irányúak, az összeg hossza épp a hosszak különbsége!"
            },
            {
              trap: "A vektort nem szabad elmozdítani a rajzon a helyéről.",
              correction: "A szabad vektor a síkban önmagával párhuzamosan bárhová eltolható anélkül, hogy megváltozna (hossza, állása és iránya változatlan marad). Így illeszthetjük össze a háromszög-szabályhoz is!"
            },
            {
              trap: "Az eltolásnak van fixpontja, ha egy alakzat önmagába tolódik.",
              correction: "Nem! Ha v ≠ 0, egyetlen pont sem marad helyben. Még ha egy egyenes vagy díszítősor önmagába megy is át, a rajta fekvő pontok mind elmozdulnak!"
            },
            {
              trap: "Vektorok kivonásánál mindegy a különbség iránya: a − b és b − a ugyanaz.",
              correction: "NEM! A b − a vektor az a − b vektor ellentettje: b − a = −(a − b). Közös kezdőpont esetén az a − b vektor a kivonandó (b) végpontjából a kisebbítendő (a) végpontjába mutat!"
            }
          ]}
        />
      </TheorySection>

      {/* =========================================================================
          4. RÉSZ: INTERAKTÍV LABOR: VEKTOR- ÉS ELTOLÁS-MŰHELY
      ========================================================================= */}
      <TheorySection
        title="4. Interaktív Labor: Vektorműveletek és Eltolás Szimulátor"
        icon={<Sliders className="w-6 h-6 text-emerald-600" />}
      >
        <TheoryCard
          title="Kísérletezz a vektorok koordinátáival és figyeld az eredményt!"
          icon={<Split className="w-5 h-5 text-emerald-600" />}
        >
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Állítsd be az <strong>a</strong> és <strong>b</strong> vektor koordinátáit, válassz műveletet, és figyeld meg az eredő vektort és a számított hosszát!
          </p>

          <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
            {/* Műveletválasztó gombok */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-2">Művelet:</span>
              <Button
                variant={operation === 'add' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setOperation('add')}
                className="h-8 text-xs font-bold rounded-lg gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> Összeadás (a + b)
              </Button>
              <Button
                variant={operation === 'sub' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setOperation('sub')}
                className="h-8 text-xs font-bold rounded-lg gap-1.5"
              >
                <Minus className="w-3.5 h-3.5" /> Kivonás (a − b)
              </Button>
              <Button
                variant={operation === 'scalar' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setOperation('scalar')}
                className="h-8 text-xs font-bold rounded-lg gap-1.5"
              >
                <Maximize2 className="w-3.5 h-3.5" /> Skalárral szorzás (λ · a)
              </Button>
            </div>

            {/* Vektorok beállítása */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Vektor a */}
              <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900 space-y-2">
                <div className="flex items-center justify-between font-bold text-blue-900 dark:text-blue-200">
                  <span>Vektor a = ({ax}; {ay})</span>
                  <span>|a| = {aLen}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>X koordináta ({ax}):</span>
                  </div>
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    value={ax}
                    onChange={(e) => setAx(Number(e.target.value))}
                    className="w-full h-1.5 bg-blue-200 rounded accent-blue-600"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Y koordináta ({ay}):</span>
                  </div>
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    value={ay}
                    onChange={(e) => setAy(Number(e.target.value))}
                    className="w-full h-1.5 bg-blue-200 rounded accent-blue-600"
                  />
                </div>
              </div>

              {/* Vektor b vagy Skalár */}
              {operation !== 'scalar' ? (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900 space-y-2">
                  <div className="flex items-center justify-between font-bold text-emerald-900 dark:text-emerald-200">
                    <span>Vektor b = ({bx}; {by})</span>
                    <span>|b| = {bLen}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>X koordináta ({bx}):</span>
                    </div>
                    <input
                      type="range"
                      min="-5"
                      max="5"
                      value={bx}
                      onChange={(e) => setBx(Number(e.target.value))}
                      className="w-full h-1.5 bg-emerald-200 rounded accent-emerald-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>Y koordináta ({by}):</span>
                    </div>
                    <input
                      type="range"
                      min="-5"
                      max="5"
                      value={by}
                      onChange={(e) => setBy(Number(e.target.value))}
                      className="w-full h-1.5 bg-emerald-200 rounded accent-emerald-600"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-900 space-y-3">
                  <div className="flex items-center justify-between font-bold text-purple-900 dark:text-purple-200">
                    <span>Skalár tényező (λ)</span>
                    <span className="font-mono text-base">{scalarLambda}</span>
                  </div>
                  <input
                    type="range"
                    min="-3"
                    max="3"
                    step="0.5"
                    value={scalarLambda}
                    onChange={(e) => setScalarLambda(Number(e.target.value))}
                    className="w-full h-1.5 bg-purple-200 rounded accent-purple-600"
                  />
                  <div className="flex gap-2">
                    {[-2, -1, 0.5, 2, 3].map((s) => (
                      <button
                        key={s}
                        onClick={() => setScalarLambda(s)}
                        className={`px-2 py-0.5 rounded text-[11px] font-bold border ${
                          scalarLambda === s
                            ? 'bg-purple-600 text-white border-purple-600'
                            : 'bg-white text-slate-700 border-slate-200'
                        }`}
                      >
                        {s}x
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Számított eredmény panel */}
            <div className="p-4 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                  Művelet eredménye ({result.label}):
                </div>
                <div className="text-xl font-black font-mono text-purple-600 dark:text-purple-400">
                  R = ({result.rx}; {result.ry})
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  Eredményvektor hossza: <span className="font-mono font-bold text-slate-900 dark:text-white">|R| = {result.len}</span> egység
                </div>
              </div>

              <div className="px-4 py-2.5 bg-purple-50 dark:bg-purple-950/40 rounded-lg border border-purple-200 dark:border-purple-900 text-xs text-purple-800 dark:text-purple-300">
                {operation === 'add' && `( ${ax} + ${bx}; ${ay} + ${by} ) = (${result.rx}; ${result.ry})`}
                {operation === 'sub' && `( ${ax} − ${bx}; ${ay} − ${by} ) = (${result.rx}; ${result.ry})`}
                {operation === 'scalar' && `${scalarLambda} · (${ax}; ${ay}) = (${result.rx}; ${result.ry})`}
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>
    </TheoryTemplate>
  );
};

