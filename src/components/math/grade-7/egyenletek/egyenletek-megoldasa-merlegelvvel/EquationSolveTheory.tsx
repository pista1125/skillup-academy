import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import {
  Calculator,
  Scale,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Layers,
  HelpCircle,
  Equal,
  RotateCcw,
  Check
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';
import { cn } from '@/lib/utils';

interface EquationSolveTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

interface StepItem {
  stepNum: number;
  title: string;
  equation: string;
  action: string;
  desc: string;
}

const DEMO_STEPS: StepItem[] = [
  {
    stepNum: 1,
    title: 'Kezdő egyenlet (Törtes, zárójeles)',
    equation: '\\frac{3x - 1}{4} - \\frac{x - 3}{2} = 2',
    action: 'Kiindulás (U = \\mathbb{Q})',
    desc: 'Az egyenletben két tört szerepel: az egyik nevezője 4, a másiké 2. Az alaphalmaz a racionális számok halmaza.'
  },
  {
    stepNum: 2,
    title: '1. Lépés: Törtek eltüntetése (LKKT = 4)',
    equation: '(3x - 1) - 2(x - 3) = 8',
    action: '/ \\cdot 4',
    desc: 'Mindkét oldalt megszorozzuk a nevezők legkisebb közös többszörösével (4-gyel). Vigyázat: a számlálókat zárójelbe tesszük, a jobb oldali 2 is megszorzódik 4-gyel (2 · 4 = 8)!'
  },
  {
    stepNum: 3,
    title: '2. Lépés: Zárójelek felbontása',
    equation: '3x - 1 - 2x + 6 = 8',
    action: 'Bontás: -2 \\cdot (x - 3) = -2x + 6',
    desc: 'A második zárójel előtt negatív szorzó (-2) áll: -2 · x = -2x, és -2 · (-3) = +6! Kiemelt figyelmet igényel az előjelváltás.'
  },
  {
    stepNum: 4,
    title: '3. Lépés: Összevonás a bal oldalon',
    equation: 'x + 5 = 8',
    action: '3x - 2x = x; \\quad -1 + 6 = 5',
    desc: 'Az egynemű tagokat összevonjuk: 3x - 2x = 1x = x, a számtagok pedig: -1 + 6 = +5. Az egyenlet egyszerű alakúvá vált.'
  },
  {
    stepNum: 5,
    title: '4. Lépés: Rendezés mérlegelvvel',
    equation: 'x = 3',
    action: '/ - 5',
    desc: 'Mindkét oldalból kivonunk 5-öt, hogy az ismeretlen teljesen egyedül maradjon a bal oldalon: 8 - 5 = 3.'
  },
  {
    stepNum: 6,
    title: '5. Lépés: Ellenőrzés az eredeti egyenletben',
    equation: 'B = 2, \\quad J = 2 \\implies B = J',
    action: 'Behelyettesítés x = 3-mal',
    desc: 'Bal oldal: (3·3 - 1)/4 - (3 - 3)/2 = 8/4 - 0/2 = 2 - 0 = 2. Jobb oldal: 2. Megegyezik, tehát a gyök helyes: M = {3}.'
  }
];

export const EquationSolveTheory: React.FC<EquationSolveTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  const [activeDemoStep, setActiveDemoStep] = useState<number>(0);

  return (
    <TheoryTemplate
      title="Egyenletek Megoldása Mérlegelvvel"
      subtitle="Elsőfokú egyenletek szabatos megoldási algoritmusa: zárójelfelbontás, törtek kiküszöbölése, mérlegelv, ellenőrzés és speciális esetek"
      themeColor="violet"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      badge="7. Osztály • Matematika VI. Témakör"
      rule={{
        label: 'A MÉRLEGELV ALAPTÖRVÉNYE',
        formula: 'A = B \\iff A \\pm c = B \\pm c \\quad \\text{és} \\quad A \\cdot c = B \\cdot c \\; (c \\neq 0)'
      }}
    >
      {/* 1. SZEKCIÓ: A 7 LÉPÉSES MESTER-ALGORITMUS */}
      <TheorySection
        number={1}
        title="Az Egyenletmegoldás 7 Lépéses Mester-Algoritmusa"
        icon={<Layers className="w-5 h-5 text-violet-600" />}
        badgeColor="violet"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          A 7. osztályos algebrai egyenletek megoldása nem találgatás, hanem egy szigorúan kötött,
          biztonságos lépéssorozat (algoritmus). Bármilyen bonyolultnak tűnő egyenletet kapunk
          (akár sok zárójellel vagy törttel), az alábbi 7 lépést követve mindig biztosan célba érünk:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 my-5">
          <TheoryCard
            title="1. Alaphalmaz rögzítése"
            formula="U = \mathbb{Q}, \; \mathbb{Z} \; \text{vagy} \; \mathbb{N}"
            description="Milyen számok között keressük a megoldást? Ha a kijött gyök nem eleme az alaphalmaznak, nincs megoldás!"
            badge="0. lépés"
            color="slate"
          />
          <TheoryCard
            title="2. Törtek eltüntetése"
            formula="/ \cdot \text{LKKT}"
            description="Beszorozzuk az egyenlet mindkét oldalát a nevezők legkisebb közös többszörösével. A számlálókat zárójelbe tesszük!"
            badge="Törtes eset"
            color="indigo"
          />
          <TheoryCard
            title="3. Zárójelek felbontása"
            formula="a(b + c) = ab + ac"
            description="A disztributivitás szabályával beszorzunk minden tagot. Negatív szorzónál az összes belső előjel megfordul!"
            badge="Zárójeles eset"
            color="purple"
          />
          <TheoryCard
            title="4. Összevonás oldalanként"
            formula="ax + bx = (a + b)x"
            description="Mindkét oldalon külön-külön összevonjuk az egynemű algebrai tagokat (x-eket az x-ekkel, számokat a számokkal)."
            badge="Rendezés előtt"
            color="violet"
          />
          <TheoryCard
            title="5. Ismeretlenek egy oldalra"
            formula="/ - cx \quad (\text{kisebb } x)"
            description="A mérlegelvvel a kisebb együtthatójú ismeretlent levonjuk mindkét oldalból, így az x csak az egyik oldalon marad."
            badge="Mérlegelv"
            color="sky"
          />
          <TheoryCard
            title="6. Számtagok átvitele és osztás"
            formula="ax = b \implies x = \frac{b}{a}"
            description="A számtagot a másik oldalra visszük (+ / -), majd mindkét oldalt elosztjuk az ismeretlen előtti együtthatóval."
            badge="Gyök kiszámítása"
            color="emerald"
          />
        </div>

        {/* Interaktív lépésről lépésre bemutató */}
        <div className="bg-gradient-to-br from-violet-50/70 via-purple-50/40 to-white dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 rounded-2xl border-2 border-violet-200 dark:border-violet-900/60 p-4 sm:p-5 shadow-sm mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-violet-100 dark:border-violet-900/40">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-950/70 px-2 py-0.5 rounded-md">
                Interaktív Modell
              </span>
              <h4 className="text-base font-black text-slate-800 dark:text-slate-100 mt-1">
                Egy összetett egyenlet levezetése lépésről lépésre
              </h4>
            </div>
            <div className="flex items-center gap-1.5 self-end sm:self-auto">
              {DEMO_STEPS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveDemoStep(idx)}
                  className={cn(
                    'w-7 h-7 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center justify-center',
                    activeDemoStep === idx
                      ? 'bg-violet-600 text-white shadow-sm scale-105'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-violet-50'
                  )}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-violet-100 dark:border-violet-900/50 shadow-inner space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-black text-violet-700 dark:text-violet-300">
                {DEMO_STEPS[activeDemoStep].title}
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-violet-100 dark:bg-violet-950/70 text-violet-800 dark:text-violet-200 border border-violet-200 dark:border-violet-800">
                <MathText text={DEMO_STEPS[activeDemoStep].action} />
              </span>
            </div>

            <div className="text-center py-2 px-3 bg-slate-50 dark:bg-slate-850 rounded-lg border border-slate-200/80 dark:border-slate-800 text-lg sm:text-xl font-bold font-mono text-slate-900 dark:text-slate-100">
              <MathText text={DEMO_STEPS[activeDemoStep].equation} />
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {DEMO_STEPS[activeDemoStep].desc}
            </p>
          </div>

          <div className="flex justify-between items-center mt-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              disabled={activeDemoStep === 0}
              onClick={() => setActiveDemoStep((prev) => Math.max(0, prev - 1))}
              className="text-xs h-8 rounded-lg cursor-pointer"
            >
              Előző lépés
            </Button>
            <span className="text-xs text-slate-400 font-medium">
              {activeDemoStep + 1} / {DEMO_STEPS.length}
            </span>
            <Button
              size="sm"
              disabled={activeDemoStep === DEMO_STEPS.length - 1}
              onClick={() => setActiveDemoStep((prev) => Math.min(DEMO_STEPS.length - 1, prev + 1))}
              className="bg-violet-600 hover:bg-violet-700 text-white text-xs h-8 rounded-lg cursor-pointer"
            >
              Következő lépés
            </Button>
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: ZÁRÓJELEK ÉS ELŐJELEK KEZELÉSE */}
      <TheorySection
        number={2}
        title="Zárójeles Egyenletek és az Előjelek Kezelése"
        icon={<Calculator className="w-5 h-5 text-purple-600" />}
        badgeColor="purple"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Ha az egyenletben zárójelek vannak, azokat a <strong>disztributivitás</strong> (tagok szétosztása)
          szabályával bontjuk fel: a zárójel előtti számmal <em>a zárójel minden egyes tagját</em> meg kell szorozni.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TheoryCard
            title="Pozitív szorzó a zárójel előtt"
            formula="3(2x - 5) = 6x - 15"
            description="A belső előjelek változatlanok maradnak: 3 · 2x = 6x és 3 · (-5) = -15."
            badge="Nem változik az előjel"
            color="emerald"
          />
          <TheoryCard
            title="Negatív szorzó a zárójel előtt"
            formula="-4(3x - 2) = -12x + 8"
            description="Kritikus szabály: mindkét belső tag előjele megfordul! -4 · 3x = -12x és -4 · (-2) = +8."
            badge="Minden előjel megfordul!"
            color="rose"
          />
        </div>

        <TheoryTrapBox title="A 'láthatatlan' egyes a zárójel előtt">
          Gyakori hiba: mi történik, ha nincs szám a zárójel előtt, csak egy mínuszjel?
          <div className="my-2 p-2.5 rounded-lg bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 font-mono text-xs sm:text-sm text-rose-900 dark:text-rose-200">
            <MathText text="-(2x - 7) = -1 \cdot (2x - 7) = -2x + 7" />
          </div>
          Mindig képzelj oda egy -1-es szorzót! Ha a mínuszjelet egyszerűen elhagyod, a végeredmény garantáltan hibás lesz.
        </TheoryTrapBox>

        <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <h5 className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-2">
            Mintafeladat levezetése zárójellel mindkét oldalon:
          </h5>
          <div className="font-mono text-xs sm:text-sm space-y-1.5 text-slate-700 dark:text-slate-300">
            <div className="flex justify-between items-center py-0.5 border-b border-slate-200/50 dark:border-slate-700/50">
              <span>5(2x - 1) - 3(x + 4) = 2(x + 6) + 1</span>
              <span className="text-slate-400 text-xs">/ Kezdőállapot</span>
            </div>
            <div className="flex justify-between items-center py-0.5 border-b border-slate-200/50 dark:border-slate-700/50">
              <span>10x - 5 - 3x - 12 = 2x + 12 + 1</span>
              <span className="text-slate-400 text-xs">/ Zárójelek bontása</span>
            </div>
            <div className="flex justify-between items-center py-0.5 border-b border-slate-200/50 dark:border-slate-700/50">
              <span>7x - 17 = 2x + 13</span>
              <span className="text-slate-400 text-xs">/ Összevonás oldalanként</span>
            </div>
            <div className="flex justify-between items-center py-0.5 border-b border-slate-200/50 dark:border-slate-700/50">
              <span>5x - 17 = 13</span>
              <span className="text-violet-600 font-bold text-xs">/ - 2x (kisebb x levonása)</span>
            </div>
            <div className="flex justify-between items-center py-0.5 border-b border-slate-200/50 dark:border-slate-700/50">
              <span>5x = 30</span>
              <span className="text-violet-600 font-bold text-xs">/ + 17</span>
            </div>
            <div className="flex justify-between items-center py-0.5 text-emerald-600 dark:text-emerald-400 font-bold">
              <span>x = 6</span>
              <span className="text-xs font-sans bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded">/ : 5 ⟹ Megoldás: M = &#123;6&#125;</span>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: TÖRTES EGYENLETEK ÉS KÖZÖS NEVEZŐ */}
      <TheorySection
        number={3}
        title="Törtes Egyenletek Megoldása (Közös Nevező)"
        icon={<Scale className="w-5 h-5 text-indigo-600" />}
        badgeColor="indigo"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
          A törtes egyenleteknél a leghatékonyabb módszer a <strong>törtek azonnali eltüntetése</strong>.
          Ehhez megkeressük az összes nevező <em>legkisebb közös többszörösét (LKKT)</em>, és mindkét oldalt
          megszorozzuk vele.
        </p>

        <TheoryCallout title="A törtvonal zárójelként véd!" variant="tip">
          <p className="text-xs sm:text-sm leading-relaxed">
            A törtvonal nemcsak osztást jelent, hanem <strong>összefogja a számlálót</strong>, mintha zárójelben lenne!
            Amikor beszorzunk a közös nevezővel, a számlálót <strong>mindig tegyük zárójelbe</strong>:
          </p>
          <div className="mt-2 p-2 bg-white/80 dark:bg-slate-900/80 rounded border font-mono text-xs sm:text-sm">
            <MathText text="-\frac{x - 4}{3} \cdot 6 \implies -2 \cdot (x - 4) = -2x + 8" />
          </div>
        </TheoryCallout>

        <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <h5 className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-2">
            Példa: Törtes egyenlet megoldása (Nevezők: 3 és 5, LKKT = 15)
          </h5>
          <div className="font-mono text-xs sm:text-sm space-y-1.5 text-slate-700 dark:text-slate-300">
            <div className="flex justify-between items-center py-0.5 border-b border-slate-200/50 dark:border-slate-700/50">
              <span><MathText text="\frac{2x + 1}{3} - \frac{x - 2}{5} = 3" /></span>
              <span className="text-indigo-600 font-bold text-xs">/ · 15 (mindkét oldalt!)</span>
            </div>
            <div className="flex justify-between items-center py-0.5 border-b border-slate-200/50 dark:border-slate-700/50">
              <span>5(2x + 1) - 3(x - 2) = 45</span>
              <span className="text-slate-400 text-xs">/ 15:3 = 5;  15:5 = 3;  3·15 = 45!</span>
            </div>
            <div className="flex justify-between items-center py-0.5 border-b border-slate-200/50 dark:border-slate-700/50">
              <span>10x + 5 - 3x + 6 = 45</span>
              <span className="text-slate-400 text-xs">/ Zárójelek kibontása</span>
            </div>
            <div className="flex justify-between items-center py-0.5 border-b border-slate-200/50 dark:border-slate-700/50">
              <span>7x + 11 = 45</span>
              <span className="text-slate-400 text-xs">/ Összevonás: 10x-3x=7x, 5+6=11</span>
            </div>
            <div className="flex justify-between items-center py-0.5 border-b border-slate-200/50 dark:border-slate-700/50">
              <span>7x = 34</span>
              <span className="text-indigo-600 font-bold text-xs">/ - 11</span>
            </div>
            <div className="flex justify-between items-center py-0.5 text-emerald-600 dark:text-emerald-400 font-bold">
              <span><MathText text="x = \frac{34}{7} = 4\frac{6}{7}" /></span>
              <span className="text-xs font-sans bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded">/ : 7 ⟹ Tört alakú gyök teljesen szabályos!</span>
            </div>
          </div>
        </div>

        <TheoryTrapBox title="Tipikus hiba: Az önálló számtag beszorzásának elfelejtése">
          Ha az egyenletben a törtek mellett önálló szám is áll (pl. a fenti példában a jobb oldali 3), azt is
          <strong> kötelező megszorozni a közös nevezővel</strong>!
          Nem szabad megfeledkezni a mérlegelvről: a szorzás az egyenlet MINDEN tagjára vonatkozik (3 · 15 = 45)!
        </TheoryTrapBox>
      </TheorySection>

      {/* 4. SZEKCIÓ: A SZABATOS ELLENŐRZÉS ÉS ALAPHALMAZ */}
      <TheorySection
        number={4}
        title="A Szabatos Ellenőrzés és az Alaphalmaz Vizsgálata"
        icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
        badgeColor="emerald"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
          Az egyenletmegoldás <strong>nem ér véget a gyök kiszámításával</strong>. Két elengedhetetlen záró lépés van:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
              <Check className="w-4 h-4" />
              <span>1. Szabatos Ellenőrzés</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Mindig az <strong>eredeti egyenletbe</strong> helyettesítünk be, külön kiszámítva a bal oldal (B)
              és a jobb oldal (J) numerikus értékét. Ha B = J, akkor a számolásunk hibátlan volt.
            </p>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded text-[11px] font-mono text-emerald-800 dark:text-emerald-200">
              <MathText text="B = 2(3) + 4 = 10, \quad J = 10 \implies B = J = 10 \quad \checkmark" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-amber-600 font-bold text-sm">
              <ShieldAlert className="w-4 h-4" />
              <span>2. Alaphalmaz (U) ellenőrzése</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              A kapott gyöknek <strong>szerepelnie kell az alaphalmazban</strong>!
              Ha a feladat kikötötte, hogy x természetes szám (U = ℕ), és x = -3 vagy x = 2,5 jött ki:
            </p>
            <div className="p-2 bg-amber-50 dark:bg-amber-950/40 rounded text-[11px] font-mono text-amber-800 dark:text-amber-200 font-bold">
              <MathText text="-3 \notin \mathbb{N} \implies M = \emptyset \quad \text{(üres halmaz, nincs megoldás!)}" />
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: SPECIÁLIS ESETEK: AZONOSSÁG ÉS ELLENTMONDÁS */}
      <TheorySection
        number={5}
        title="Speciális Esetek: Azonosság és Ellentmondás"
        icon={<AlertTriangle className="w-5 h-5 text-amber-600" />}
        badgeColor="amber"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          Nem minden egyenletnek van pontosan egyetlen megoldása. Előfordul, hogy a rendezés során az ismeretlenes tagok
          teljesen kiesnek (mindkét oldalon ugyanannyi x van):
        </p>

        <TheoryTable
          headers={['Típus', 'Levezetés vége', 'Jelentés', 'Megoldáshalmaz']}
          rows={[
            [
              'Egyértelmű megoldás',
              'x = c (pl. x = 4)',
              'Pontosan egyetlen szám teszi igazzá az egyenlőséget',
              'M = {4}'
            ],
            [
              'Azonosság',
              '0x = 0  (vagy 5 = 5)',
              'Bármely számot behelyettesítve igaz kijelentést kapunk',
              'M = U (minden alaphalmazbeli szám)'
            ],
            [
              'Ellentmondás',
              '0x = 7  (vagy 3 = 10)',
              'Nincs olyan szám, amivel szorozva a 0-t nullától eltérőt kapnánk',
              'M = ∅ (nincs megoldás, üres halmaz)'
            ]
          ]}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="p-3.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-xs">
            <span className="font-bold text-purple-900 dark:text-purple-200 block mb-1">
              Példa Azonosságra:
            </span>
            <div className="font-mono text-slate-700 dark:text-slate-300">
              3(2x + 4) = 6x + 12 <br />
              6x + 12 = 6x + 12  &nbsp; /- 6x <br />
              <strong>12 = 12</strong> &nbsp; (vagy 0x = 0) ⟹ <span className="text-purple-700 dark:text-purple-300 font-bold">M = ℚ</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-xs">
            <span className="font-bold text-rose-900 dark:text-rose-200 block mb-1">
              Példa Ellentmondásra:
            </span>
            <div className="font-mono text-slate-700 dark:text-slate-300">
              4x + 5 = 4x - 3  &nbsp; /- 4x <br />
              <strong>5 = -3</strong> &nbsp; (vagy 0x = -8) <br />
              Lehetetlen állítás! ⟹ <span className="text-rose-700 dark:text-rose-300 font-bold">M = ∅</span>
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default EquationSolveTheory;
