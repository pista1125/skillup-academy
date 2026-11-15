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
  DilationCenterSvg,
  NegativeRatioSvg,
  AreaPerimeterRatioSvg,
  SquareInTriangleSvg,
  PyramidSliceSvg
} from './CentralDilationFigures';
import {
  Maximize2,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  Zap,
  Check,
  X,
  Compass,
  Layers,
  Scale
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CentralDilationTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

interface Scenario {
  id: string;
  title: string;
  ratio: number;
  type: string;
  description: string;
  sideRatio: string;
  perimeterRatio: string;
  areaRatio: string;
  lessonSource: string;
}

const scenarios: Scenario[] = [
  {
    id: 'sc1',
    title: 'Fotónagyítás kétszeresére',
    ratio: 2,
    type: 'Nagyítás (iránytartó)',
    description: 'Optikai vetítésnél a pontok távolsága a vetítési centrumtól megduplázódik. Minden szakasz kétszeres hosszúságúvá válik.',
    sideRatio: '2×',
    perimeterRatio: '2×',
    areaRatio: '4× (2²)',
    lessonSource: 'Optikai vetítés és fotónagyítás'
  },
  {
    id: 'sc2',
    title: 'Térkép méretarány és kicsinyítés',
    ratio: 0.5,
    type: 'Kicsinyítés (iránytartó)',
    description: 'A méretek a felükre csökkennek. A megfelelő oldalak párhuzamosak maradnak az eredetiekkel (AB ∥ A\'B\').',
    sideRatio: '0,5× (fele)',
    perimeterRatio: '0,5×',
    areaRatio: '0,25× (negyede)',
    lessonSource: 'Síkidomok arányos kicsinyítése'
  },
  {
    id: 'sc3',
    title: 'Negatív arányú átfordulás',
    ratio: -1.5,
    type: 'Nagyítás + Tükrözés (irányváltó)',
    description: 'A képalakzat az O centrum átellenes oldalán keletkezik fejjel lefelé: egy 1,5-szeres nyújtás és egy 180°-os forgatás kompozíciója.',
    sideRatio: '1,5× (|-1,5|)',
    perimeterRatio: '1,5×',
    areaRatio: '2,25× ((-1,5)²)',
    lessonSource: 'Negatív arányú hasonlóság'
  },
  {
    id: 'sc4',
    title: 'Középpontos tükrözés (λ = -1)',
    ratio: -1,
    type: 'Egybevágóság (tükrözött)',
    description: 'Távolságtartó egybevágóság: a távolságok nem változnak, de az alakzat pontjai átfordulnak az O középpontra.',
    sideRatio: '1× (változatlan)',
    perimeterRatio: '1×',
    areaRatio: '1×',
    lessonSource: 'Középpontos tükrözés mint speciális eset'
  },
  {
    id: 'sc5',
    title: 'Háromszögbe írt négyzet',
    ratio: 1.88,
    type: 'Emelt szintű szerkesztés',
    description: 'Tetszőleges segédnégyzetet rajzolunk az AB alapra, majd az A csúcsból nagyítjuk, amíg a szabad csúcs a BC oldalra nem esik.',
    sideRatio: 'λ = |AM\'| / |AM|',
    perimeterRatio: 'λ-szoros',
    areaRatio: 'λ²-szeres',
    lessonSource: 'Hasonlósági szerkesztési eljárás'
  },
  {
    id: 'sc6',
    title: 'Gúla szeletelése párhuzamos síkkal',
    ratio: 0.25,
    type: 'Térbeli kicsinyítés',
    description: 'A csúcstól a magasság negyedénél vett metszet területe az alapterület 1/16 része ((1/4)²).',
    sideRatio: '1/4×',
    perimeterRatio: '1/4×',
    areaRatio: '1/16×',
    lessonSource: 'Térbeli síkmetszetek aránya'
  }
];

export const CentralDilationTheory: React.FC<CentralDilationTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interaktív modul 1 állapota (csúszka / arány)
  const [sliderRatio, setSliderRatio] = useState<number>(2);

  // Interaktív modul 2 állapota (kiválasztott szcenárió)
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('sc1');

  const activeScenario = scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0];

  // Dinamikus számítások az 1. modulhoz
  const baseSideA = 4;
  const baseSideB = 5;
  const baseSideC = 6;
  const basePerimeter = baseSideA + baseSideB + baseSideC; // 15
  // Héron-képlettel terület: s = 7.5, T = sqrt(7.5 * 3.5 * 2.5 * 1.5) ≈ 9.92
  const baseArea = 9.92;

  const currentPerimeter = (Math.abs(sliderRatio) * basePerimeter).toFixed(1);
  const currentArea = (Math.pow(sliderRatio, 2) * baseArea).toFixed(1);

  return (
    <TheoryTemplate
      title="1. Középpontos nagyítás, kicsinyítés"
      subtitle="A középpontos hasonlósági transzformáció alapjai, képpontok szerkesztése, aránytartás, kerület- és területarányok"
      badge="10. OSZTÁLY • IX. HASONLÓSÁG • TANANYAG"
      themeColor="amber"
      pdfExportId="grade10-central-dilation-theory"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLYOK — KÖZÉPPONTOS NAGYÍTÁS, KICSINYÍTÉS',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80">
              <span className="text-xs font-black text-amber-900 dark:text-amber-200 block mb-1">
                ✓ Vektoriális definíció és méretváltozás (centrum: O, arány: λ ≠ 0):
              </span>
              <div className="grid grid-cols-3 gap-1.5 font-mono text-xs font-black text-amber-900 dark:text-amber-200 text-center">
                <div className="p-1 bg-white/80 dark:bg-slate-900/60 rounded border border-amber-300">
                  K&apos; = |λ| · K
                </div>
                <div className="p-1 bg-white/80 dark:bg-slate-900/60 rounded border border-amber-300">
                  T&apos; = λ² · T
                </div>
                <div className="p-1 bg-white/80 dark:bg-slate-900/60 rounded border border-amber-300">
                  V&apos; = |λ|³ · V
                </div>
              </div>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Távolság a centrumtól:</strong> $|OP&apos;| = |\lambda| \cdot |OP|$ ($\lambda &gt; 0$: azonos félegyenesen; $\lambda &lt; 0$: átellenes oldalon).
              </li>
              <li>
                <strong>Esetek:</strong> $|\lambda| &gt; 1$ nagyítás, $0 &lt; |\lambda| &lt; 1$ kicsinyítés, $\lambda = -1$ középpontos tükrözés.
              </li>
              <li>
                <strong>Invarianciák:</strong> Szögtartó ($\alpha&apos; = \alpha$), egyenestartó, a megfelelő szakaszok párhuzamosak ($AB \parallel A&apos;B&apos;$).
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. FEJEZET */}
      <TheorySection
        title="1. A középpontos nagyítás és kicsinyítés szemlélete és fogalma"
        icon={<Compass className="w-5 h-5 text-amber-500" />}
      >
        <TheoryCard title="Hogyan működik a képek nagyítása és kicsinyítése?" variant="normal">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Gondoljunk egy vetítőgépre vagy a fotók optikai nagyítására: a fényforrás egyetlen pontból (<MathText text="O" />) indul ki,
            és az ernyőn megjelenő kép minden részlete arányosan megnő. A hétköznapi értelemben vett „alak- és formamegmaradás” azt jelenti,
            hogy a kép nem torzul: a körből kör, a négyzetből négyzet lesz, és az arc arányai minden méretben pontosan megegyeznek.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="p-4 bg-amber-50/70 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-800 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-amber-900 dark:text-amber-300 text-sm mb-2 flex items-center gap-2">
                  <Maximize2 className="w-4 h-4 text-amber-600" />
                  A Középpontos Hasonlóság Definíciója
                </h4>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Adott a síkban vagy a térben egy rögzített <MathText text="O" /> pont (a hasonlóság <strong>centruma</strong>)
                  és egy <MathText text="\lambda \neq 0" /> valós szám (a <strong>hasonlóság aránya</strong>).
                  Bármely <MathText text="P" /> pont képe az a <MathText text="P'" /> pont, amelyre:
                </p>
                <div className="my-2.5 p-2 bg-white dark:bg-slate-900 rounded-xl text-center border border-amber-200 dark:border-amber-900 font-mono text-sm font-black text-amber-700 dark:text-amber-400">
                  <MathText text="\vec{OP'} = \lambda \cdot \vec{OP} \quad \implies \quad |OP'| = |\lambda| \cdot |OP|" />
                </div>
                <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside">
                  <li>Ha <MathText text="P = O" />, akkor a képpont önmaga: <MathText text="O' = O" /> (az <MathText text="O" /> <strong>fixpont</strong>).</li>
                  <li>Ha <MathText text="P \neq O" />, akkor <MathText text="P'" /> az <MathText text="OP" /> egyenesen fekszik.</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-center p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <DilationCenterSvg size={280} ratio={2} />
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. FEJEZET */}
      <TheorySection
        title="2. Alapvető geometriai tulajdonságok és invarianciák"
        icon={<Sparkles className="w-5 h-5 text-amber-500" />}
      >
        <TheoryCard title="Mit őriz meg és mit változtat meg a középpontos hasonlóság?" variant="highlight">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
                1. Szögtartás
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Bármely szög képe pontosan ugyanakkora szög: <MathText text="\alpha' = \alpha" />.
                A háromszögek belső szögei nem nőnek és nem csökkennek!
              </p>
            </div>

            <div className="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
                2. Egyenestartás & Párhuzamosság
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Egyenes képe egyenes. Ha az egyenes nem megy át <MathText text="O" />-n, a képe vele <strong>párhuzamos</strong> egyenes (<MathText text="e' \parallel e" />).
                Ha átmegy <MathText text="O" />-n, akkor <strong>önmagába megy át</strong> (fixegyenes).
              </p>
            </div>

            <div className="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
                3. Aránytartás
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Bármely két szakasz hosszának aránya megmarad: ha egy háromszögben <MathText text="a/b = 2" />,
                akkor a nagyított háromszögben is <MathText text="a'/b' = 2" />.
              </p>
            </div>
          </div>

          <TheoryTable
            headers={['Tulajdonság', 'Eredeti alakzat', 'Képalakzat', 'Matematikai minősítés']}
            rows={[
              ['Pont távolsága O-tól', '|OP|', '|λ| · |OP|', 'Arányosan változik (|λ|-szoros)'],
              ['Szakasz hossza', '|AB|', '|λ| · |AB|', 'Arányosan változik (|λ|-szoros)'],
              ['Belső szögek', 'α, β, γ', 'α, β, γ', 'Változatlan (szigorúan invariáns)'],
              ['Oldalak párhuzamossága', 'AB ∥ CD', 'A\'B\' ∥ C\'D\'', 'Változatlan (párhuzamosságtartó)'],
              ['Alakzat kerülete', 'K', '|λ| · K', 'Lineárisan skálázódik (|λ|)'],
              ['Alakzat területe', 'T', 'λ² · T', 'Kvadratikusan skálázódik (λ²)'],
              ['Test térfogata (3D)', 'V', '|λ|³ · V', 'Köbösen skálázódik (|λ|³)']
            ]}
          />
        </TheoryCard>
      </TheorySection>

      {/* 3. FEJEZET */}
      <TheorySection
        title="3. Pozitív vs. Negatív Hasonlósági Arányok"
        icon={<RotateCcw className="w-5 h-5 text-amber-500" />}
      >
        <TheoryCard title="Mi történik, ha λ negatív szám?" variant="normal">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="space-y-3">
              <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                A geometriában a hasonlósági arány negatív is lehet. A negatív előjel nem azt jelenti, hogy a szakasz hossza negatív lenne,
                hanem azt, hogy a pontok a centrumhoz képest <strong>átfordulnak az ellenkező irányba</strong>:
              </p>
              <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-900">
                <h5 className="font-bold text-xs text-rose-900 dark:text-rose-300 mb-1 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  Negatív arány = Nyújtás + Középpontos Tükrözés
                </h5>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  Ha <MathText text="\lambda < 0" />, akkor a transzformáció egy <MathText text="|\lambda|" /> arányú pozitív középpontos nagyítás
                  és egy <MathText text="O" /> középpontú <strong>középpontos tükrözés</strong> (180°-os elforgatás) egymásutánja.
                </p>
              </div>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-disc list-inside">
                <li>Az <MathText text="O" /> pont a <MathText text="P" /> és <MathText text="P'" /> pontok <strong>között</strong> helyezkedik el.</li>
                <li>Az alakzat orientációja megváltozik (átfordul, fejjel lefelé áll).</li>
                <li>Távolságszámításkor: <MathText text="|P P'| = |OP| + |OP'| = (1 + |\lambda|) \cdot |OP|" />.</li>
              </ul>
            </div>

            <div className="flex items-center justify-center p-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <NegativeRatioSvg size={280} ratio={-1.5} />
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 4. FEJEZET */}
      <TheorySection
        title="4. Kerület-, Terület- és Térfogatarányok összefüggése"
        icon={<Scale className="w-5 h-5 text-amber-500" />}
      >
        <TheoryCard title="Miért a hasonlósági arány négyzetével nő a terület?" variant="normal">
          <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
            A síkidomok területe két lineáris méret (alap és magasság, vagy két oldal) szorzatából adódik.
            Ha mindkét kiterjedést <MathText text="\lambda" />-szorosára növeljük, a szorzat <MathText text="\lambda \cdot \lambda = \lambda^2" />-szeresére nő!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
            <div className="flex items-center justify-center p-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <AreaPerimeterRatioSvg size={280} scaleFactor={2} />
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900">
                <div className="font-bold text-xs text-emerald-900 dark:text-emerald-300 mb-1">
                  Gyakorlati aranyszabály:
                </div>
                <div className="font-mono text-sm font-black text-emerald-700 dark:text-emerald-400">
                  <MathText text="\frac{K'}{K} = |\lambda|, \qquad \frac{T'}{T} = \lambda^2, \qquad \frac{V'}{V} = |\lambda|^3" />
                </div>
              </div>
              <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 list-disc list-inside">
                <li><strong>2-szeres oldalhossz:</strong> kerület 2×, terület <strong>4×</strong>, térfogat <strong>8×</strong>.</li>
                <li><strong>3-szoros oldalhossz:</strong> kerület 3×, terület <strong>9×</strong>, térfogat <strong>27×</strong>.</li>
                <li><strong>Fele oldalhossz (λ = 0,5):</strong> kerület fele, terület <strong>negyede (0,25×)</strong>, térfogat <strong>nyolcada (0,125×)</strong>.</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <TheoryTrapBox
              title="Tipikus Érettségi Csapda: A lineáris területnövelés tévhite"
              trap="Gyakori hiba: 'Ha a háromszög minden oldala kétszer akkora, akkor a területe is kétszeresére nő'."
              correction="A terület mindig a hasonlósági arány NÉGYZETÉVEL arányos! 2-szeres oldal esetén a terület pontosan 2² = 4-szeresére nő."
            />
            <TheoryTrapBox
              title="Előjelcsapda negatív aránynál"
              trap="Gyakori hiba: 'Ha λ = -2, akkor a képszakasz hossza -2 · 5 = -10 cm'."
              correction="Geometriai távolság és kerület SOHA nem lehet negatív! A képszakasz hossza |-2| · 5 = 10 cm. A területnél pedig (-2)² = +4!"
            />
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 5. FEJEZET */}
      <TheorySection
        title="5. Különleges feladatok és emelt szintű szerkesztések"
        icon={<Layers className="w-5 h-5 text-amber-500" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Négyzet szerkesztése háromszögbe" variant="normal">
            <div className="flex items-center justify-center p-2 mb-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <SquareInTriangleSvg size={260} />
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>Szerkesztési lépések:</strong>
            </p>
            <ol className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-decimal list-inside mt-1">
              <li>Az <MathText text="AB" /> oldalra rajzolunk egy tetszőleges méretű <MathText text="KLMN" /> segédnégyzetet úgy, hogy <MathText text="N" /> az <MathText text="AC" /> oldalon legyen.</li>
              <li>Az <MathText text="A" /> csúcsból félegyenest húzunk az <MathText text="M" /> ponton keresztül a <MathText text="BC" /> oldalig: ez metszi ki a végleges <MathText text="M'" /> csúcsot.</li>
              <li>Az <MathText text="M'" /> csúcsból merőlegeseket állítva megkapjuk a pontosan illeszkedő <MathText text="K'L'M'N'" /> négyzetet!</li>
            </ol>
          </TheoryCard>

          <TheoryCard title="Gúla síkmetszetei" variant="normal">
            <div className="flex items-center justify-center p-2 mb-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <PyramidSliceSvg size={260} />
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Ha egy 12 cm magasságú szabályos gúlát a csúcsától számítva 3 cm-es közönként alaplappal párhuzamos síkokkal elvágunk:
            </p>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside mt-1">
              <li>1. metszet (3 cm-nél): <MathText text="k_1 = 3/12 = 1/4 \implies T_1 = \frac{1}{16} T_{\text{alap}}" />.</li>
              <li>2. metszet (6 cm-nél): <MathText text="k_2 = 6/12 = 1/2 \implies T_2 = \frac{1}{4} T_{\text{alap}}" />.</li>
              <li>3. metszet (9 cm-nél): <MathText text="k_3 = 9/12 = 3/4 \implies T_3 = \frac{9}{16} T_{\text{alap}}" />.</li>
              <li>A síkmetszetek területeinek aránya: <MathText text="1 : 4 : 9 : 16" />!</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6. FEJEZET: INTERAKTÍV LABORATÓRIUMOK */}
      <TheorySection
        title="6. Interaktív Laboratóriumok és Szimulációk"
        icon={<Zap className="w-5 h-5 text-amber-500" />}
      >
        {/* INTERAKTÍV MODUL 1: DINAMIKUS HASONLÓSÁGI SZIMULÁTOR */}
        <TheoryCard title="Laboratórium I: Dinamikus Dilatáció és Skálázó Szimulátor" variant="highlight">
          <p className="text-slate-700 dark:text-slate-300 mb-4 text-xs sm:text-sm">
            Változtasd meg a hasonlósági arányt (<MathText text="\lambda" />) az alábbi gombokkal, és figyeld meg az alakzat méretének,
            orientációjának, kerületének és területének valós idejű változását!
          </p>

          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="text-xs font-bold text-slate-500 mr-2">Arány (λ):</span>
            {[-2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2, 2.5].map((val) => (
              <Button
                key={val}
                size="sm"
                variant={sliderRatio === val ? 'default' : 'outline'}
                onClick={() => setSliderRatio(val)}
                className={`text-xs font-bold h-8 px-3 rounded-xl transition-all ${
                  sliderRatio === val
                    ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-md scale-105'
                    : 'border-slate-200 dark:border-slate-700 hover:border-amber-400'
                }`}
              >
                {val > 0 ? `+${val}` : val}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-center bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              {sliderRatio < 0 ? (
                <NegativeRatioSvg size={300} ratio={sliderRatio} />
              ) : (
                <DilationCenterSvg size={300} ratio={sliderRatio} />
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Transzformáció jellege:</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-black ${
                    Math.abs(sliderRatio) > 1
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : Math.abs(sliderRatio) === 1
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-sky-100 text-sky-900 border border-sky-300'
                  }`}
                >
                  {Math.abs(sliderRatio) > 1
                    ? 'Középpontos Nagyítás'
                    : Math.abs(sliderRatio) === 1
                    ? 'Egybevágóság'
                    : 'Középpontos Kicsinyítés'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Orientáció:</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    sliderRatio > 0
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}
                >
                  {sliderRatio > 0 ? '✓ Iránytartó (egyező állású)' : '↺ Irányváltó (180°-kal átfordult)'}
                </span>
              </div>

              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Kerület aránya (|λ|):</span>
                  <span className="font-bold text-amber-700 dark:text-amber-400">{Math.abs(sliderRatio)}× ({currentPerimeter} cm)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Terület aránya (λ²):</span>
                  <span className="font-bold text-amber-700 dark:text-amber-400">{Math.pow(sliderRatio, 2)}× ({currentArea} cm²)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Csúcsszögek:</span>
                  <span className="font-bold text-emerald-600">Változatlanok (szögtartó)</span>
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>

        {/* INTERAKTÍV MODUL 2: SZCENÁRIÓK */}
        <div className="mt-6">
          <TheoryCard title="Laboratórium II: Mintapéldák & Geometriai Szcenáriók" variant="highlight">
            <p className="text-slate-700 dark:text-slate-300 mb-3 text-xs sm:text-sm">
              Kattints a feladat-szcenáriókra a részletes geometriai magyarázathoz és arányszámításokhoz!
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
              {scenarios.map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => setSelectedScenarioId(sc.id)}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all text-left border ${
                    selectedScenarioId === sc.id
                      ? 'bg-amber-600 text-white border-amber-700 shadow-md scale-[1.02]'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-400'
                  }`}
                >
                  <div className="truncate font-semibold">{sc.title}</div>
                  <div
                    className={`text-[10px] truncate ${
                      selectedScenarioId === sc.id ? 'text-amber-100' : 'text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    λ = {sc.ratio} • {sc.type}
                  </div>
                </button>
              ))}
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Forrás: {activeScenario.lessonSource}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-300">
                  {activeScenario.type}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3 text-center">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="text-[11px] text-slate-400 font-semibold mb-1">Oldalarány</div>
                  <div className="text-base font-bold text-slate-800 dark:text-slate-200 font-mono">
                    {activeScenario.sideRatio}
                  </div>
                </div>
                <div className="p-3 bg-amber-50/70 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-900">
                  <div className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold mb-1">Kerületarány</div>
                  <div className="text-base font-bold text-amber-900 dark:text-amber-200 font-mono">
                    {activeScenario.perimeterRatio}
                  </div>
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="text-[11px] text-slate-400 font-semibold mb-1">Területarány</div>
                  <div className="text-base font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                    {activeScenario.areaRatio}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong>Geometriai magyarázat:</strong> {activeScenario.description}
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default CentralDilationTheory;

