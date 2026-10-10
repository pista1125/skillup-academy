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
  Calendar,
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
  Check,
  Users,
  Coins,
  BookOpen
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';
import { cn } from '@/lib/utils';

interface EquationWordProblemsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

interface StepItem {
  stepNum: number;
  title: string;
  action: string;
  desc: string;
  highlight: string;
}

const DEMO_STEPS: StepItem[] = [
  {
    stepNum: 1,
    title: '1. Lépés: Szövegértés és az ismeretlen kijelölése',
    action: 'Legyen x a legfiatalabb testvér életkora.',
    desc: 'Három testvér életkorának összege 39 év. A középső 3 évvel, a legidősebb 6 évvel idősebb a legfiatalabbnál. Hány évesek?',
    highlight: 'Kikötés: x ∈ ℕ, x > 0 (életkor csak pozitív egész szám lehet)'
  },
  {
    stepNum: 2,
    title: '2. Lépés: A többi adat kifejezése x-szel',
    action: 'Fiatal: x;  Középső: x + 3;  Idős: x + 6',
    desc: 'Mindegyik testvér életkorát visszavezetjük az alapul választott legfiatalabb testvér korára.',
    highlight: 'Összesen: x + (x + 3) + (x + 6)'
  },
  {
    stepNum: 3,
    title: '3. Lépés: Az egyenlet felállítása',
    action: 'x + (x + 3) + (x + 6) = 39',
    desc: 'A szöveg kimondja: az életkorok összege 39 év. Az egyenlőségjelet a felírt összeg és a 39 közé tesszük.',
    highlight: 'Matematikai modell kész'
  },
  {
    stepNum: 4,
    title: '4. Lépés: Megoldás mérlegelvvel',
    action: '3x + 9 = 39  ⟹  3x = 30  ⟹  x = 10',
    desc: 'Összevonás: x + x + x = 3x és 3 + 6 = 9. Kivonunk 9-et mindkét oldalból, majd osztunk 3-mal.',
    highlight: 'x = 10 (a legfiatalabb testvér kora)'
  },
  {
    stepNum: 5,
    title: '5. Lépés: Szöveges ellenőrzés és válasz',
    action: '10 + 13 + 16 = 39 ✓  (13 = 10 + 3, 16 = 10 + 6)',
    desc: 'A szöveg minden feltételét tételesen ellenőrizzük: 10 + 13 + 16 = 39, és a korkülönbségek is stimmelnek.',
    highlight: 'Válasz: A testvérek 10, 13 és 16 évesek.'
  }
];

export const EquationWordProblemsTheory: React.FC<EquationWordProblemsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  const [activeDemoStep, setActiveDemoStep] = useState<number>(0);

  return (
    <TheoryTemplate
      title="Szöveges Feladatok Megoldása Egyenlettel"
      subtitle="A valós problémák matematikai modellezése: az 5 lépéses stratégia, számelméleti, életkoros, pénzügyi és átrakásos típusfeladatok"
      themeColor="amber"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      badge="7. Osztály • Matematika VI. Témakör"
      rule={{
        label: 'AZ 5 LÉPÉSES MEGOLDÁSI MODELL',
        formula: '1. \\text{Ismeretlen } (x) \\to 2. \\text{Kifejezések} \\to 3. \\text{Egyenlet} \\to 4. \\text{Mérlegelv} \\to 5. \\text{Szöveges ellenőrzés}'
      }}
    >
      {/* 1. SZEKCIÓ: AZ 5 LÉPÉSES MESTER-STRATÉGIA */}
      <TheorySection
        number={1}
        title="A Szöveges Feladatok 5 Lépéses Mester-Stratégiája"
        icon={<Layers className="w-5 h-5 text-amber-600" />}
        badgeColor="amber"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          A matematika egyik legfontosabb célja, hogy valós, hétköznapi szöveges problémákat tudjunk megoldani.
          A szöveges feladat megoldása nem más, mint <strong>egy magyar nyelvű történet lefordítása a matematika
          egyetemes nyelvére (egyenletre)</strong>. Ehhez az alábbi 5 lépéses modellt használjuk:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 my-5">
          <TheoryCard
            title="1. Ismeretlen kijelölése (x)"
            formula="x = \text{keresett mennyiség}"
            description="Pontosan határozzuk meg, mit jelöl az x (mértékegységgel!), és fogalmazzunk meg értelmezési kikötést (pl. x ∈ ℕ, x > 0)."
            badge="1. lépés"
            color="slate"
          />
          <TheoryCard
            title="2. Adatok kifejezése x-szel"
            formula="x + a, \quad k \cdot x, \quad \dots"
            description="A szöveg többi szereplőjét, adatait írjuk le az x segítségével készített algebrai betűs kifejezésekkel."
            badge="2. lépés"
            color="amber"
          />
          <TheoryCard
            title="3. Egyenlet felállítása"
            formula="\text{Bal oldal} = \text{Jobb oldal}"
            description="Keressük meg a szövegben rejtőző egyenlőséget (összeg, különbség vagy kétféleképpen kifejezett azonos mennyiség)."
            badge="3. lépés"
            color="orange"
          />
          <TheoryCard
            title="4. Megoldás mérlegelvvel"
            formula="ax + b = c \implies x = \dots"
            description="Zárójelbontás, összevonás, ismeretlenek és számok szétválogatása, osztás az együtthatóval."
            badge="4. lépés"
            color="indigo"
          />
          <TheoryCard
            title="5. Szöveges ellenőrzés"
            formula="\text{Eredeti szövegbe behelyettesítés!}"
            description="Nem elég az egyenletbe visszatenni! A szöveg minden egyes eredeti mondatának meg kell felelni."
            badge="5. lépés"
            color="emerald"
          />
          <TheoryCard
            title="6. Szöveges válaszadás"
            formula="\text{Egész mondatban válaszolunk}"
            description="A feladat konkrét kérdésére válaszolunk a megfelelő mértékegységgel (nem csak azt írjuk, hogy x = 10)."
            badge="Befejezés"
            color="sky"
          />
        </div>

        {/* Interaktív 5 lépéses bemutató */}
        <div className="bg-gradient-to-br from-amber-50/70 via-orange-50/40 to-white dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 rounded-2xl border-2 border-amber-200 dark:border-amber-900/60 p-4 sm:p-5 shadow-sm mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-amber-100 dark:border-amber-900/40">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/70 px-2 py-0.5 rounded-md">
                Interaktív Modell
              </span>
              <h4 className="text-base font-black text-slate-800 dark:text-slate-100 mt-1">
                A testvérek életkorának kiszámítása 5 lépésben
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
                      ? 'bg-amber-600 text-white shadow-sm scale-105'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-amber-50'
                  )}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-amber-100 dark:border-amber-900/50 shadow-inner space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-black text-amber-800 dark:text-amber-300">
                {DEMO_STEPS[activeDemoStep].title}
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800">
                {DEMO_STEPS[activeDemoStep].highlight}
              </span>
            </div>

            <div className="text-center py-2 px-3 bg-slate-50 dark:bg-slate-850 rounded-lg border border-slate-200/80 dark:border-slate-800 text-sm sm:text-base font-bold font-mono text-slate-900 dark:text-slate-100">
              {DEMO_STEPS[activeDemoStep].action}
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
              className="bg-amber-600 hover:bg-amber-700 text-white text-xs h-8 rounded-lg cursor-pointer"
            >
              Következő lépés
            </Button>
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: SZÁMELMÉLETI ÉS ÖSSZEGZÉSI FELADATOK */}
      <TheorySection
        number={2}
        title="Számelméleti és Összegzési Feladatok"
        icon={<Calculator className="w-5 h-5 text-indigo-600" />}
        badgeColor="indigo"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Gyakori feladattípus az egymást követő egész számok, vagy meghatározott arányban álló számok összegzése:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TheoryCard
            title="Egymást követő egész számok"
            formula="x, \quad x + 1, \quad x + 2, \quad \dots"
            description="Két szomszédos egész szám különbsége mindig 1. Három egymást követő szám összege: x + (x + 1) + (x + 2) = 3x + 3."
            badge="Különbség = 1"
            color="indigo"
          />
          <TheoryCard
            title="Egymást követő páros vagy páratlan számok"
            formula="x, \quad x + 2, \quad x + 4, \quad \dots"
            description="Bármely két szomszédos páros (vagy páratlan) szám különbsége 2! Páratlanoknál a kezdőértékre kikötés, hogy x páratlan."
            badge="Különbség = 2"
            color="purple"
          />
        </div>

        <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <h5 className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-2">
            Mintapélda: Három egymást követő páratlan szám összege 87
          </h5>
          <div className="font-mono text-xs sm:text-sm space-y-1.5 text-slate-700 dark:text-slate-300">
            <div className="flex justify-between items-center py-0.5 border-b border-slate-200/50 dark:border-slate-700/50">
              <span>Számok: x, (x + 2), (x + 4)</span>
              <span className="text-slate-400 text-xs">x páratlan egész szám</span>
            </div>
            <div className="flex justify-between items-center py-0.5 border-b border-slate-200/50 dark:border-slate-700/50">
              <span>x + (x + 2) + (x + 4) = 87</span>
              <span className="text-slate-400 text-xs">/ Egyenlet felállítása</span>
            </div>
            <div className="flex justify-between items-center py-0.5 border-b border-slate-200/50 dark:border-slate-700/50">
              <span>3x + 6 = 87</span>
              <span className="text-indigo-600 font-bold text-xs">/ - 6</span>
            </div>
            <div className="flex justify-between items-center py-0.5 border-b border-slate-200/50 dark:border-slate-700/50">
              <span>3x = 81</span>
              <span className="text-indigo-600 font-bold text-xs">/ : 3</span>
            </div>
            <div className="flex justify-between items-center py-0.5 text-emerald-600 dark:text-emerald-400 font-bold">
              <span>x = 27 ⟹ A számok: 27, 29, 31</span>
              <span className="text-xs font-sans bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded">Ellenőrzés: 27 + 29 + 31 = 87 ✓</span>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: ÉLETKOROS FELADATOK TÁBLÁZATOS MODELLJE */}
      <TheorySection
        number={3}
        title="Életkoros Feladatok Megoldása Táblázattal"
        icon={<Calendar className="w-5 h-5 text-amber-600" />}
        badgeColor="amber"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
          Az életkoros feladatok aranyszabálya: <strong>az idő múlása mindenkire egyformán hat</strong>!
          Ha eltelik $x$ év, mindkét szereplő életkorához hozzáadódik $x$. Ezt a legegyszerűbb táblázatba foglalni.
        </p>

        <TheoryTable
          headers={['Szereplő', 'Jelenlegi életkor', 'x év múlva']}
          rows={[
            ['Apa', '38 év', '38 + x'],
            ['Fia', '10 év', '10 + x']
          ]}
        />

        <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <h5 className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-2">
            Feladat: Hány év múlva lesz az apa 3-szor olyan idős, mint a fia?
          </h5>
          <div className="font-mono text-xs sm:text-sm space-y-1.5 text-slate-700 dark:text-slate-300">
            <div className="flex justify-between items-center py-0.5 border-b border-slate-200/50 dark:border-slate-700/50">
              <span>38 + x = 3(10 + x)</span>
              <span className="text-slate-400 text-xs">/ Apa kora = 3 · fia kora</span>
            </div>
            <div className="flex justify-between items-center py-0.5 border-b border-slate-200/50 dark:border-slate-700/50">
              <span>38 + x = 30 + 3x</span>
              <span className="text-amber-600 font-bold text-xs">/ - x (kisebb ismeretlen levonása)</span>
            </div>
            <div className="flex justify-between items-center py-0.5 border-b border-slate-200/50 dark:border-slate-700/50">
              <span>38 = 30 + 2x</span>
              <span className="text-amber-600 font-bold text-xs">/ - 30</span>
            </div>
            <div className="flex justify-between items-center py-0.5 border-b border-slate-200/50 dark:border-slate-700/50">
              <span>8 = 2x</span>
              <span className="text-amber-600 font-bold text-xs">/ : 2</span>
            </div>
            <div className="flex justify-between items-center py-0.5 text-emerald-600 dark:text-emerald-400 font-bold">
              <span>x = 4 év múlva</span>
              <span className="text-xs font-sans bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded">Apa: 42 év, Fia: 14 év ⟹ 42 = 3 · 14 ✓</span>
            </div>
          </div>
        </div>

        <TheoryTrapBox title="Gyakori hiba az életkoros egyenleteknél">
          Sokan elfelejtik a szorzásnál zárójelbe tenni a fiatalabb személy jövőbeli korát:
          hibásan <span className="font-mono text-rose-600 font-bold">38 + x = 3 · 10 + x</span>-et írnak,
          amiből az jönne ki, hogy 38 = 30, ami ellentmondás!
          Mindig használd a zárójelet: <span className="font-mono text-emerald-700 dark:text-emerald-300 font-bold">3 · (10 + x)</span>!
        </TheoryTrapBox>
      </TheorySection>

      {/* 4. SZEKCIÓ: ÁTRAKÁSOS ÉS KÉTCSOPORTOS FELADATOK */}
      <TheorySection
        number={4}
        title="Átrakásos és Kétcsoportos Problémák"
        icon={<Users className="w-5 h-5 text-purple-600" />}
        badgeColor="purple"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Amikor két polc, két doboz vagy két zseb között mozgatunk tárgyakat vagy pénzt, az átrakott mennyiség
          <strong> az egyikből levonódik, a másikhoz pedig hozzáadódik</strong>!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TheoryCard
            title="Átrakás az egyikből a másikba"
            formula="A - k = B + k"
            description="Ha az A polcról k darab könyvet átrakunk a B polcra, A-n k-val kevesebb lesz, B-n viszont k-val több!"
            badge="Kettős hatás"
            color="purple"
          />
          <TheoryCard
            title="Többszörös átrakás utáni arány"
            formula="A - k = 2 \cdot (B + k)"
            description="Ha az átrakás után az egyik csoport kétszer annyi lesz, mint a másik, a megváltozott B-t szorozzuk 2-vel."
            badge="Arányosítás"
            color="rose"
          />
        </div>

        <TheoryCallout title="Példa: Könyvek két polcon" variant="tip">
          Két polcon összesen 120 könyv van. Az első polcon kétszer annyi van, mint a másodikon:
          <div className="mt-2 p-2.5 bg-white/80 dark:bg-slate-900/80 rounded border font-mono text-xs sm:text-sm">
            2x + x = 120  ⟹  3x = 120  ⟹  x = 40 (második polc), és 2x = 80 (első polc).
          </div>
          Ha a felső polcról átrakunk 20-at az alsóra: felsőn 80 - 20 = 60 lesz, alsón 40 + 20 = 60 lesz (egyenlővé válnak!).
        </TheoryCallout>
      </TheorySection>

      {/* 5. SZEKCIÓ: CSAPDÁK ÉS ELLENŐRZÉSI MÓDSZERTAN */}
      <TheorySection
        number={5}
        title="Módszertani Útmutató és Tipikus Csapdák"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600" />}
        badgeColor="rose"
      >
        <div className="space-y-3">
          <div className="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-xs sm:text-sm">
            <span className="font-bold text-rose-900 dark:text-rose-200 block mb-1">
              1. Csapda: Nem a kérdésre válaszolunk
            </span>
            Ha a feladat azt kérdezte: <em>„Hány éves most az apa?”</em>, és x a fiú kora volt (pl. x = 12), a válasz nem 12,
            hanem ki kell számolni az apa korát is (pl. 3 · 12 = 36 év).
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs sm:text-sm">
            <span className="font-bold text-amber-900 dark:text-amber-200 block mb-1">
              2. Csapda: Értelmetlen eredmény a valóságban (Alaphalmaz)
            </span>
            Ha egy személyek számáról szóló feladatban <MathText text="x = 4{,}5" /> vagy negatív szám jön ki,
            az azt jelenti, hogy vagy elszámoltuk az egyenletet, vagy a feladat szövege szerint nincs valós megoldás!
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm">
            <span className="font-bold text-emerald-900 dark:text-emerald-200 block mb-1">
              3. Szabály: Miért nem elég az egyenletbe helyettesíteni az ellenőrzéskor?
            </span>
            Ha rosszul írtuk fel az egyenletet (félreértelmeztük a szöveget), a mérlegelv hibátlanul megoldja a rossz egyenletet,
            és az egyenletbe visszahelyettesítve is stimmelni fog! Ezért <strong>kizárólag a szöveg mondatait tételesen
            újraolvasva szabad ellenőrizni</strong>.
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default EquationWordProblemsTheory;
