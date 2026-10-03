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
  Brain,
  Scale,
  Users,
  Ticket,
  Coins,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calculator,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Crosshair,
  Footprints,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2
} from 'lucide-react';
import { MathText, Fraction } from '@/components/math/shared/MathText';

interface MixedWordProblemsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const MixedWordProblemsTheory: React.FC<MixedWordProblemsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interaktív Labor Állapotok ---
  const [activeLabTab, setActiveLabTab] = useState<'headsLegs' | 'system'>('headsLegs');

  // 1. Fül: Fejek és Lábak / Kétféle Érték Modellező
  // Összes egyed = N, 1. típus lábai = leg1 (pl. tyúk 2), 2. típus lábai = leg2 (pl. nyúl 4)
  const [totalCount, setTotalCount] = useState<number>(30); // Összes fej/egyed
  const [leg1, setLeg1] = useState<number>(2); // 1. egyed lábai / értéke (pl. 2)
  const [leg2, setLeg2] = useState<number>(4); // 2. egyed lábai / értéke (pl. 4)
  // Válasszuk ki az 1. egyed darabszámát (x), amiből kiszámolódik az összes láb
  const [item1Count, setItem1Count] = useState<number>(18); // pl. 18 tyúk

  const item2Count = totalCount - item1Count; // 12 nyúl
  const totalLegs = item1Count * leg1 + item2Count * leg2; // 18*2 + 12*4 = 36 + 48 = 84 láb

  // 2. Fül: Kétismeretlenes Egyenletrendszer Megoldó & Metszéspont Vizuális Labor
  // Egyenlet 1: a1*x + b1*y = c1 (alapértelmezetten a képernyőkép adatai: 5x + 12y = 35)
  // Egyenlet 2: a2*x + b2*y = c2 (alapértelmezetten a képernyőkép adatai: 2x + 4y = 56)
  const [a1, setA1] = useState<string>('5');
  const [b1, setB1] = useState<string>('12');
  const [c1, setC1] = useState<string>('35');

  const [a2, setA2] = useState<string>('2');
  const [b2, setB2] = useState<string>('4');
  const [c2, setC2] = useState<string>('56');

  const [coordViewMode, setCoordViewMode] = useState<'fitBoth' | 'focusM'>('fitBoth');
  const [coordZoom, setCoordZoom] = useState<number>(1);

  const numA1 = parseFloat(a1) || 0;
  const numB1 = parseFloat(b1) || 0;
  const numC1 = parseFloat(c1) || 0;

  const numA2 = parseFloat(a2) || 0;
  const numB2 = parseFloat(b2) || 0;
  const numC2 = parseFloat(c2) || 0;

  // Determináns számítás
  const det = numA1 * numB2 - numA2 * numB1;
  const hasUniqueSolution = Math.abs(det) > 1e-9;
  const sysX = hasUniqueSolution ? (numC1 * numB2 - numC2 * numB1) / det : 0;
  const sysY = hasUniqueSolution ? (numA1 * numC2 - numA2 * numC1) / det : 0;

  return (
    <TheoryTemplate
      title="6. Vegyes feladatok"
      subtitle="Középiskolai felvételi típusú összetett szöveges feladatok: fejek és lábak, hiány-többlet modellek, jegyárak és kétismeretlenes egyenletrendszerek mesterfogásai."
      badge="8. Osztály • III. Témakör"
      badgeColor="violet"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        title: "A Vegyes Feladatok Alapszabályai",
        formula: (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 font-mono text-center">
            <span>c₁ · x + c₂ · (Összes - x) = Összérték</span>
            <span className="hidden sm:inline text-violet-400">|</span>
            <span>k₁ · p + maradék = k₂ · (p - üres)</span>
          </div>
        ),
        description: "Mindig azonosítsd a két összefüggést: az egyik a darabszámok összegét adja meg (x és N - x), a másik az értékek vagy tulajdonságok (forint, láb, ülőhely) mérlegét írja le!"
      }}
    >
      {/* 1. Szekció: Fejek és Lábak Modellje */}
      <TheorySection
        number={1}
        title="A „Fejek és Lábak” Típusú Feladatok"
        icon={<Users className="w-5 h-5 text-violet-600" />}
        badge="Kétféle Egyed"
        badgeColor="violet"
      >
        <TheoryCard
          title="Kétféle Tulajdonságú Egyed és Összérték Modellje"
          badge="Klasszikus Felvételi Modell"
          badgeColor="violet"
        >
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              A felvételik egyik leggyakoribb feladattípusa, amikor kétféle egyedről (pl. tyúkok és nyulak, kerekpárok és autók, kétlábúak és négylábúak) tudjuk az <strong>összes darabszámot</strong> (fejek száma) és az <strong>összes tulajdonságot</strong> (lábak, kerekek száma).
            </p>

            <div className="p-4 rounded-2xl bg-violet-50 dark:bg-violet-950/40 border border-violet-300 dark:border-violet-800 text-center">
              <div className="text-xs uppercase font-bold text-violet-700 dark:text-violet-400">Az 1 Ismeretlenes Egyenlet Általános Képlete</div>
              <div className="text-xl sm:text-2xl font-black text-violet-900 dark:text-violet-100 font-mono my-1">
                c₁ · x + c₂ · (N - x) = Összes tulajdonság
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                Ahol <span className="font-mono font-bold text-violet-700 dark:text-violet-300">x</span> az 1. típus darabszáma, <span className="font-mono font-bold text-violet-700 dark:text-violet-300">N - x</span> a 2. típus darabszáma, <span className="font-mono font-bold">c₁, c₂</span> az egységnyi értékek.
              </div>
            </div>

            <TheoryTable
              headers={['Egyed típusa', 'Darabszám (db)', '1 egyedre eső láb/érték', 'Összes láb/érték']}
              rows={[
                ['1. típus (pl. tyúk)', 'x', '2', '2 · x'],
                ['2. típus (pl. nyúl)', 'N - x', '4', '4 · (N - x)'],
                ['Összesen', 'N db (fejek száma)', '-', '2x + 4(N - x) = Összes láb']
              ]}
            />

            <TheoryCallout
              title="Gyakorlati Példa: Tyúkok és Nyulak az Udvaron"
              variant="example"
              icon={<Lightbulb className="w-5 h-5 text-violet-600" />}
            >
              <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <div><em>Egy udvarban tyúkok és nyulak vannak, összesen 35 fej és 94 láb. Hány tyúk és hány nyúl van?</em></div>
                <div className="font-mono text-violet-900 dark:text-violet-200 bg-violet-50 dark:bg-violet-950/60 p-2.5 rounded-xl border border-violet-300 dark:border-violet-800 space-y-1">
                  <div>Tyúkok száma: x, &nbsp; Nyulak száma: 35 - x</div>
                  <div>Lábak egyenlete: 2x + 4(35 - x) = 94</div>
                  <div>2x + 140 - 4x = 94 ⇒ -2x + 140 = 94 ⇒ 2x = 46 ⇒ x = 23 (tyúk)</div>
                  <div>Nyulak száma: 35 - 23 = 12 (nyúl)</div>
                </div>
                <div><strong>Ellenőrzés:</strong> 23 · 2 + 12 · 4 = 46 + 48 = 94 láb. 23 + 12 = 35 fej. Pontosan helyes!</div>
              </div>
            </TheoryCallout>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. Szekció: Jegyárak és Pénzérmék */}
      <TheorySection
        number={2}
        title="Jegyárak, Pénzérmék és Bevételek Modellje"
        icon={<Ticket className="w-5 h-5 text-violet-600" />}
        badge="Értékek összege"
        badgeColor="violet"
      >
        <TheoryCard
          title="Kétféle Ár / Kétféle Címlet Algebrai Felírása"
          badge="Gyakorlati Matematika"
          badgeColor="violet"
        >
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Ugyanaz a matematikai szerkezet működik a színházjegyek, mozijegyek vagy a perselyben lévő pénzérmék (pl. 20 Ft-os és 50 Ft-os, vagy 100 és 200 Ft-os) kiszámításakor:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="font-bold text-xs text-violet-800 dark:text-violet-300 flex items-center gap-1.5">
                  <Ticket className="w-4 h-4 text-violet-600" />
                  1. Jegyár Modell (Diák és Felnőtt)
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed space-y-1">
                  <div>Összes eladott jegy: <MathText>N</MathText> darab.</div>
                  <div>Diákjegy ára: <MathText>Á_d</MathText>, felnőttjegy ára: <MathText>Á_f</MathText>.</div>
                  <div className="font-mono font-bold text-violet-700 dark:text-violet-300 p-2 rounded-lg bg-white dark:bg-slate-900 border border-violet-200">
                    Á_d · x + Á_f · (N - x) = Összbevétel
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="font-bold text-xs text-violet-800 dark:text-violet-300 flex items-center gap-1.5">
                  <Coins className="w-4 h-4 text-violet-600" />
                  2. Pénzérme Modell (Címletek)
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed space-y-1">
                  <div>Összes érme a perselyben: <MathText>M</MathText> darab.</div>
                  <div>Címletek: 20 Ft és 50 Ft.</div>
                  <div className="font-mono font-bold text-violet-700 dark:text-violet-300 p-2 rounded-lg bg-white dark:bg-slate-900 border border-violet-200">
                    20 · x + 50 · (M - x) = Összeg (Ft)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 3. Szekció: Padok és Diákok – Hiány és Többlet */}
      <TheorySection
        number={3}
        title="A „Padok és Diákok” Hiány-Többlet Modellje"
        icon={<Brain className="w-5 h-5 text-violet-600" />}
        badge="Felvételi Sláger"
        badgeColor="violet"
      >
        <TheoryCard
          title="Kétféle Elrendezés Egyenlővé Tétele"
          badge="Logikai Modell"
          badgeColor="violet"
        >
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Tipikus felvételi feladvány: <em>„Ha minden padba 2 diák ül, 5-nek nem jut hely. Ha 3 diák ül minden padba, 2 pad üresen marad.”</em>
              <br />
              A kulcs: <strong>az ismeretlen legyen a tartók / padok / polcok száma (p)</strong>! A diákok vagy könyvek száma mindkét elrendezésben azonos, így a két kifejezés közé egyenlőségjelet teszünk:
            </p>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-indigo-500/10 border border-violet-300 dark:border-violet-800">
              <div className="text-xs uppercase font-bold text-violet-800 dark:text-violet-300 mb-2">
                A Hiány-Többlet Egyenlet Logikai Felépítése:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-violet-200 dark:border-violet-900">
                  <div className="font-bold text-violet-700 dark:text-violet-400 mb-1">1. Eset: Diákok többlete (kimaradók)</div>
                  <div className="text-slate-600 dark:text-slate-300">Ha minden padban 2 diák ül, és 5 diák állva marad:</div>
                  <div className="font-mono font-bold text-violet-800 dark:text-violet-200 mt-1.5 p-1.5 rounded bg-violet-50 dark:bg-violet-950/40 text-center">
                    Diákok száma = 2 · p + 5
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-violet-200 dark:border-violet-900">
                  <div className="font-bold text-indigo-700 dark:text-indigo-400 mb-1">2. Eset: Padok hiánya (üres padok)</div>
                  <div className="text-slate-600 dark:text-slate-300">Ha minden padban 3 diák ül, de 2 pad teljesen üres:</div>
                  <div className="font-mono font-bold text-indigo-800 dark:text-indigo-200 mt-1.5 p-1.5 rounded bg-indigo-50 dark:bg-indigo-950/40 text-center">
                    Diákok száma = 3 · (p - 2)
                  </div>
                </div>
              </div>

              <div className="mt-3 p-2.5 rounded-xl bg-violet-100 dark:bg-violet-950 border border-violet-300 text-center font-mono font-black text-sm text-violet-900 dark:text-violet-100">
                2p + 5 = 3(p - 2) ⇒ 2p + 5 = 3p - 6 ⇒ p = 11 pad! ⇒ Diákok: 2 · 11 + 5 = 27 diák.
              </div>
            </div>

            <TheoryTrapBox
              title="Vigyázat a Zárójellel: p - üres padok száma!"
              icon={<AlertTriangle className="w-5 h-5 text-rose-600" />}
            >
              <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <div>Gyakori hiba: a diákok a 3-ast nem a csökkentett padszámmal szorozzák, hanem azt írják: <span className="line-through text-rose-600 font-mono font-bold">3p - 2</span>.</div>
                <div>Ha 2 pad üres, akkor csak <span className="font-mono font-bold text-emerald-600">(p - 2)</span> darab padban ülnek tanulók, így a helyes felírás mindig: <span className="font-mono font-bold text-emerald-600">3 · (p - 2) = 3p - 6</span>!</div>
              </div>
            </TheoryTrapBox>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 4. Szekció: Kétismeretlenes Egyenletrendszerek */}
      <TheorySection
        number={4}
        title="Kétismeretlenes Lineáris Egyenletrendszerek"
        icon={<Scale className="w-5 h-5 text-violet-600" />}
        badge="Algebrai Módszerek"
        badgeColor="violet"
      >
        <TheoryCard
          title="A Két Alapvető Megoldási Stratégia"
          badge="Behelyettesítés és Összeadás"
          badgeColor="violet"
        >
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Ha egy szöveges feladatban két független mennyiség szerepel (<MathText>x</MathText> és <MathText>y</MathText>), és két összefüggést ismerünk róluk, kétismeretlenes egyenletrendszert kapunk:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="font-bold text-xs text-violet-800 dark:text-violet-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-violet-600" />
                  1. Behelyettesítő Módszer
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Az egyik egyenletből kifejezzük az egyik változót, majd behelyettesítjük a másik egyenletbe.
                  <br />
                  <span className="font-mono font-bold text-violet-700 dark:text-violet-300 block mt-1.5 bg-white dark:bg-slate-900 p-2 rounded border border-violet-200">
                    x + y = 20 ⇒ y = 20 - x
                    <br />
                    2x + 4(20 - x) = 56
                  </span>
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="font-bold text-xs text-purple-800 dark:text-purple-300 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-purple-600" />
                  2. Egyenlő Együtthatók (Algebrai Összeadás)
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Az egyenleteket olyan számmal szorozzuk be, hogy az egyik ismeretlen együtthatói ellentétesek legyenek, majd összeadjuk a két egyenletet:
                  <br />
                  <span className="font-mono font-bold text-purple-700 dark:text-purple-300 block mt-1.5 bg-white dark:bg-slate-900 p-2 rounded border border-purple-200">
                    x + y = 64 &nbsp; és &nbsp; x - y = 18
                    <br />
                    Összeadva: 2x = 82 ⇒ x = 41, y = 23
                  </span>
                </p>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 5. Szekció: Interaktív Vegyes Feladatok Labor Szimulátor */}
      <TheorySection
        number={5}
        title="Interaktív Vegyes Feladatok Labor Szimulátor"
        icon={<Sliders className="w-5 h-5 text-violet-600" />}
        badge="Szimulátor"
        badgeColor="violet"
      >
        <TheoryCard
          title="Kísérletezz a Fejek & Lábak modellel és a Kétismeretlenes Egyenletrendszerekkel!"
          badge="Interaktív Labor"
          badgeColor="violet"
        >
          {/* Fülváltó */}
          <div className="flex flex-col sm:flex-row gap-2 justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Válaszd ki a kísérleti témát:
            </span>
            <div className="flex gap-2">
              <Button
                variant={activeLabTab === 'headsLegs' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveLabTab('headsLegs')}
                className={`rounded-xl text-xs font-bold gap-1.5 ${
                  activeLabTab === 'headsLegs'
                    ? 'bg-violet-600 hover:bg-violet-700 text-white shadow-2xs'
                    : 'border-violet-200 text-violet-700 dark:text-violet-300'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                Fejek & Lábak Mérleg
              </Button>
              <Button
                variant={activeLabTab === 'system' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveLabTab('system')}
                className={`rounded-xl text-xs font-bold gap-1.5 ${
                  activeLabTab === 'system'
                    ? 'bg-violet-600 hover:bg-violet-700 text-white shadow-2xs'
                    : 'border-violet-200 text-violet-700 dark:text-violet-300'
                }`}
              >
                <Crosshair className="w-3.5 h-3.5" />
                Egyenletrendszer & Metszéspont
              </Button>
            </div>
          </div>

          {/* TAB 1: Fejek & Lábak Labor */}
          {activeLabTab === 'headsLegs' && (
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-violet-200 dark:border-violet-900/60 space-y-4">
                {/* Paraméter csúszkák */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-violet-50/60 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-900/60 space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-violet-800 dark:text-violet-300">Összes egyed (N):</span>
                      <span className="font-mono text-sm px-2 py-0.5 rounded-lg bg-violet-600 text-white font-black">{totalCount} fej</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="60"
                      step="2"
                      value={totalCount}
                      onChange={(e) => {
                        const newTotal = parseInt(e.target.value);
                        setTotalCount(newTotal);
                        if (item1Count > newTotal) setItem1Count(Math.floor(newTotal / 2));
                      }}
                      className="w-full accent-violet-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/60 space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-purple-800 dark:text-purple-300">1. típus aránya (x):</span>
                      <span className="font-mono text-sm px-2 py-0.5 rounded-lg bg-purple-600 text-white font-black">{item1Count} db</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max={totalCount - 1}
                      step="1"
                      value={item1Count}
                      onChange={(e) => setItem1Count(parseInt(e.target.value))}
                      className="w-full accent-purple-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                    />
                    <div className="text-[10px] text-slate-500 font-mono">
                      2. típus = {item2Count} db
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-fuchsia-50/60 dark:bg-fuchsia-950/20 border border-fuchsia-200 dark:border-fuchsia-900/60 space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-fuchsia-800 dark:text-fuchsia-300">1. egyed értéke (c₁):</span>
                      <span className="font-mono text-sm px-2 py-0.5 rounded-lg bg-fuchsia-600 text-white font-black">{leg1} láb</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="4"
                      step="1"
                      value={leg1}
                      onChange={(e) => setLeg1(parseInt(e.target.value))}
                      className="w-full accent-fuchsia-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/60 space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-indigo-800 dark:text-indigo-300">2. egyed értéke (c₂):</span>
                      <span className="font-mono text-sm px-2 py-0.5 rounded-lg bg-indigo-600 text-white font-black">{leg2} láb</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="6"
                      step="1"
                      value={leg2}
                      onChange={(e) => setLeg2(parseInt(e.target.value))}
                      className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                    />
                  </div>
                </div>

                {/* Vizuális Mérleg és Állat-Sáv */}
                <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-50 to-violet-50/40 dark:from-slate-900 dark:to-slate-950 border border-violet-200 dark:border-violet-900/60 space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>⚖️ Dinamikus Mérleg és Egyenletlevezetés:</span>
                    <span className="text-violet-700 dark:text-violet-300 font-mono font-bold bg-violet-100 dark:bg-violet-950 px-2.5 py-0.5 rounded-full border border-violet-300">
                      Összes láb / érték: {totalLegs}
                    </span>
                  </div>

                  {/* SVG Mérleg és Karám */}
                  <svg
                    viewBox="0 0 640 180"
                    className="w-full h-auto select-none rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 drop-shadow-sm"
                  >
                    {/* Karám keret */}
                    <rect x="30" y="20" width="270" height="140" rx="12" fill="#faf5ff" stroke="#c084fc" strokeWidth="2" strokeDasharray="4 2" />
                    <text x="165" y="42" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7e22ce">
                      1. Típus: {item1Count} db ({leg1} lábú)
                    </text>
                    <text x="165" y="62" textAnchor="middle" fontSize="11" fill="#9333ea" fontFamily="monospace">
                      Részösszeg: {item1Count} · {leg1} = {item1Count * leg1} láb
                    </text>

                    {/* Vizuális pontok / ikonok az 1. csoportban */}
                    <g transform="translate(45, 80)">
                      {Array.from({ length: Math.min(24, item1Count) }).map((_, idx) => {
                        const col = idx % 8;
                        const row = Math.floor(idx / 8);
                        return (
                          <circle
                            key={`c1-${idx}`}
                            cx={col * 30 + 15}
                            cy={row * 24 + 10}
                            r="7"
                            fill="#a855f7"
                            stroke="#7e22ce"
                            strokeWidth="1.5"
                          />
                        );
                      })}
                    </g>

                    {/* 2. Karám */}
                    <rect x="340" y="20" width="270" height="140" rx="12" fill="#eef2ff" stroke="#818cf8" strokeWidth="2" strokeDasharray="4 2" />
                    <text x="475" y="42" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#3730a3">
                      2. Típus: {item2Count} db ({leg2} lábú)
                    </text>
                    <text x="475" y="62" textAnchor="middle" fontSize="11" fill="#4338ca" fontFamily="monospace">
                      Részösszeg: {item2Count} · {leg2} = {item2Count * leg2} láb
                    </text>

                    {/* Vizuális pontok a 2. csoportban */}
                    <g transform="translate(355, 80)">
                      {Array.from({ length: Math.min(24, item2Count) }).map((_, idx) => {
                        const col = idx % 8;
                        const row = Math.floor(idx / 8);
                        return (
                          <rect
                            key={`c2-${idx}`}
                            x={col * 30 + 8}
                            y={row * 24 + 3}
                            width="14"
                            height="14"
                            rx="3"
                            fill="#6366f1"
                            stroke="#3730a3"
                            strokeWidth="1.5"
                          />
                        );
                      })}
                    </g>
                  </svg>

                  {/* Élő Algebrai Levezetés */}
                  <div className="p-3 bg-violet-50/70 dark:bg-violet-950/30 rounded-xl border border-violet-200 dark:border-violet-900/60 font-mono text-xs text-violet-950 dark:text-violet-200 space-y-1">
                    <div className="font-bold text-violet-800 dark:text-violet-300">
                      Egyenlet felírása és megoldása (Összes fej: {totalCount}, összes láb: {totalLegs}):
                    </div>
                    <div>{leg1} · x + {leg2} · ({totalCount} - x) = {totalLegs}</div>
                    <div>{leg1}x + {leg2 * totalCount} - {leg2}x = {totalLegs}</div>
                    <div>{leg1 - leg2}x + {leg2 * totalCount} = {totalLegs} ⇒ {Math.abs(leg1 - leg2)}x = {leg2 * totalCount - totalLegs} ⇒ x = {item1Count} db</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Egyenletrendszer & Metszéspont Labor */}
          {activeLabTab === 'system' && (() => {
            // Dinamikus koordinátarendszer méretezése
            let minX = -10, maxX = 10, minY = -10, maxY = 10;

            if (!hasUniqueSolution) {
              minX = -15 * coordZoom;
              maxX = 15 * coordZoom;
              minY = -15 * coordZoom;
              maxY = 15 * coordZoom;
            } else if (coordViewMode === 'focusM') {
              // Ráközelítés közvetlenül a metszéspontra
              const localSpan = Math.max(8, Math.max(Math.abs(sysX), Math.abs(sysY)) * 0.22) * coordZoom;
              minX = sysX - localSpan;
              maxX = sysX + localSpan;
              minY = sysY - localSpan;
              maxY = sysY + localSpan;
            } else {
              // 'fitBoth': Tartalmazza az origót (0,0) ÉS a metszéspontot (sysX, sysY)
              const lowX = Math.min(0, sysX);
              const highX = Math.max(0, sysX);
              const lowY = Math.min(0, sysY);
              const highY = Math.max(0, sysY);

              const sX = Math.max(8, highX - lowX);
              const sY = Math.max(8, highY - lowY);
              const maxSpan = Math.max(sX, sY) * 1.35 * coordZoom;

              const midX = (lowX + highX) / 2;
              const midY = (lowY + highY) / 2;

              minX = midX - maxSpan / 2;
              maxX = midX + maxSpan / 2;
              minY = midY - maxSpan / 2;
              maxY = midY + maxSpan / 2;
            }

            // SVG nézetablak méretei (kompakt 620 × 440 az oszlopos nézethez)
            const svgWidth = 620;
            const svgHeight = 440;
            const padX = 45;
            const padY = 30;
            const graphWidth = svgWidth - 2 * padX;
            const graphHeight = svgHeight - 2 * padY;

            // Izotróp skálázás (1 egység = azonos pixelszám X-en és Y-on)
            const spanX = maxX - minX;
            const spanY = maxY - minY;
            const scale = Math.min(graphWidth / spanX, graphHeight / spanY);

            const contentWidth = spanX * scale;
            const contentHeight = spanY * scale;
            const offsetX = padX + (graphWidth - contentWidth) / 2;
            const offsetY = padY + (graphHeight - contentHeight) / 2;

            const toSvgX = (x: number) => offsetX + (x - minX) * scale;
            const toSvgY = (y: number) => offsetY + (maxY - y) * scale;

            // Rácslépés számítása (szép 1, 2, 5, 10, 20, 50, 100... léptékek)
            const targetTicks = 8;
            const rawStep = Math.max(spanX, spanY) / targetTicks;
            const mag = Math.pow(10, Math.floor(Math.log10(Math.max(0.01, rawStep))));
            let tickStep = mag;
            if (rawStep / mag >= 5) tickStep = 5 * mag;
            else if (rawStep / mag >= 2) tickStep = 2 * mag;

            const startTickX = Math.floor(minX / tickStep) * tickStep;
            const endTickX = Math.ceil(maxX / tickStep) * tickStep;
            const ticksX: number[] = [];
            for (let t = startTickX; t <= endTickX + 1e-6; t += tickStep) {
              if (t >= minX - 1e-4 && t <= maxX + 1e-4) ticksX.push(Number(t.toFixed(4)));
            }

            const startTickY = Math.floor(minY / tickStep) * tickStep;
            const endTickY = Math.ceil(maxY / tickStep) * tickStep;
            const ticksY: number[] = [];
            for (let t = startTickY; t <= endTickY + 1e-6; t += tickStep) {
              if (t >= minY - 1e-4 && t <= maxY + 1e-4) ticksY.push(Number(t.toFixed(4)));
            }

            // Egyenesek végpontjainak kiszámítása a nézetablak keretéig
            const getLineSegment = (a: number, b: number, c: number) => {
              if (Math.abs(a) < 1e-9 && Math.abs(b) < 1e-9) return null;
              const pad = (maxX - minX) * 0.05;
              const bx1 = minX - pad;
              const bx2 = maxX + pad;
              const by1 = minY - pad;
              const by2 = maxY + pad;

              const pts: [number, number][] = [];
              if (Math.abs(b) > 1e-9) {
                const y1 = (c - a * bx1) / b;
                if (y1 >= by1 - 1e-4 && y1 <= by2 + 1e-4) pts.push([bx1, y1]);
                const y2 = (c - a * bx2) / b;
                if (y2 >= by1 - 1e-4 && y2 <= by2 + 1e-4) pts.push([bx2, y2]);
              }
              if (Math.abs(a) > 1e-9) {
                const x1 = (c - b * by1) / a;
                if (x1 >= bx1 - 1e-4 && x1 <= bx2 + 1e-4) pts.push([x1, by1]);
                const x2 = (c - b * by2) / a;
                if (x2 >= bx1 - 1e-4 && x2 <= bx2 + 1e-4) pts.push([x2, by2]);
              }
              if (pts.length < 2) {
                if (Math.abs(b) > 1e-9) {
                  return { x1: toSvgX(bx1), y1: toSvgY((c - a * bx1) / b), x2: toSvgX(bx2), y2: toSvgY((c - a * bx2) / b) };
                }
                return { x1: toSvgX(c / a), y1: toSvgY(by1), x2: toSvgX(c / a), y2: toSvgY(by2) };
              }
              return {
                x1: toSvgX(pts[0][0]),
                y1: toSvgY(pts[0][1]),
                x2: toSvgX(pts[1][0]),
                y2: toSvgY(pts[1][1])
              };
            };

            const line1Seg = getLineSegment(numA1, numB1, numC1);
            const line2Seg = getLineSegment(numA2, numB2, numC2);

            const isZeroXInView = 0 >= minX && 0 <= maxX;
            const isZeroYInView = 0 >= minY && 0 <= maxY;

            const applyPreset = (
              pA1: number, pB1: number, pC1: number,
              pA2: number, pB2: number, pC2: number
            ) => {
              setA1(String(pA1));
              setB1(String(pB1));
              setC1(String(pC1));
              setA2(String(pA2));
              setB2(String(pB2));
              setC2(String(pC2));
              setCoordZoom(1);
              setCoordViewMode('fitBoth');
            };

            return (
              <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-violet-200 dark:border-violet-900/60 space-y-4">
                  {/* Gyors Mintapélda Választó Gombok */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                      <span>Gyors mintapéldák kipróbálása:</span>
                      <span className="text-[10px] text-violet-600 dark:text-violet-400 font-normal">Kattints a betöltéshez!</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => applyPreset(5, 12, 35, 2, 4, 56)}
                        className="text-xs h-7 rounded-lg border-fuchsia-300 hover:bg-fuchsia-50 text-fuchsia-800 dark:text-fuchsia-300 cursor-pointer font-bold shadow-2xs"
                      >
                        ⚡ Képernyőkép adatai (133; -52.5)
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => applyPreset(1, 1, 35, 2, 4, 94)}
                        className="text-xs h-7 rounded-lg border-violet-300 hover:bg-violet-50 text-violet-800 dark:text-violet-300 cursor-pointer"
                      >
                        🐔 Tyúkok & Nyulak (23; 12)
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => applyPreset(1, 1, 7, 2, -1, 8)}
                        className="text-xs h-7 rounded-lg border-indigo-300 hover:bg-indigo-50 text-indigo-800 dark:text-indigo-300 cursor-pointer"
                      >
                        📐 Alap feladat (5; 2)
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => applyPreset(1, 1, 64, 1, -1, 18)}
                        className="text-xs h-7 rounded-lg border-purple-300 hover:bg-purple-50 text-purple-800 dark:text-purple-300 cursor-pointer"
                      >
                        🔢 Számok összege (41; 23)
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => applyPreset(2, 4, 20, 2, 4, 40)}
                        className="text-xs h-7 rounded-lg border-rose-300 hover:bg-rose-50 text-rose-800 dark:text-rose-300 cursor-pointer"
                      >
                        🚫 Párhuzamos egyenesek
                      </Button>
                    </div>
                  </div>

                  {/* Kétoszlopos elrendezés: Balra a koordinátarendszer, Jobbra a két egyenlet állítópanelje egymás alatt */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                    {/* BAL OLDAL: Dinamikus Koordinátarendszer & Metszéspont (lg:col-span-7) */}
                    <div className="lg:col-span-7 p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-slate-50 to-violet-50/40 dark:from-slate-900 dark:to-slate-950 border border-violet-200 dark:border-violet-900/60 space-y-2.5">
                      {/* Koordinátarendszer Fejléc és Nézetvezérlők */}
                      <div className="flex flex-wrap justify-between items-center gap-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                            📈 Koordinátarendszer:
                          </span>
                          <span className="text-[10px] font-mono text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950 px-1.5 py-0.5 rounded border border-purple-300">
                            e₁
                          </span>
                          <span className="text-[10px] font-mono text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-950 px-1.5 py-0.5 rounded border border-blue-300">
                            e₂
                          </span>
                          {hasUniqueSolution && (
                            <span className="text-xs font-mono font-black text-violet-700 dark:text-violet-300 bg-violet-100 dark:bg-violet-950/70 px-2 py-0.5 rounded-full border border-violet-300 shadow-2xs">
                              M({Number.isInteger(sysX) ? sysX : sysX.toFixed(2)}; {Number.isInteger(sysY) ? sysY : sysY.toFixed(2)})
                            </span>
                          )}
                        </div>

                        {/* Nézet és Zoom Gombok */}
                        <div className="flex items-center gap-1 flex-wrap">
                          <Button
                            variant={coordViewMode === 'fitBoth' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => {
                              setCoordViewMode('fitBoth');
                              setCoordZoom(1);
                            }}
                            className={`text-[10px] h-6 px-2 rounded-lg font-bold cursor-pointer ${
                              coordViewMode === 'fitBoth'
                                ? 'bg-violet-600 text-white'
                                : 'border-slate-300 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            📐 Teljes
                          </Button>
                          <Button
                            variant={coordViewMode === 'focusM' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => {
                              setCoordViewMode('focusM');
                              setCoordZoom(1);
                            }}
                            className={`text-[10px] h-6 px-2 rounded-lg font-bold cursor-pointer ${
                              coordViewMode === 'focusM'
                                ? 'bg-violet-600 text-white'
                                : 'border-slate-300 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            🎯 Fókusz
                          </Button>
                          <div className="flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-0.5">
                            <button
                              type="button"
                              title="Nagyítás"
                              onClick={() => setCoordZoom((z) => Math.max(0.2, z * 0.8))}
                              className="w-5 h-5 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold cursor-pointer"
                            >
                              <ZoomIn className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              title="Kicsinyítés"
                              onClick={() => setCoordZoom((z) => Math.min(5, z * 1.25))}
                              className="w-5 h-5 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold cursor-pointer"
                            >
                              <ZoomOut className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              title="Alaphelyzet"
                              onClick={() => {
                                setCoordZoom(1);
                                setCoordViewMode('fitBoth');
                              }}
                              className="w-5 h-5 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold cursor-pointer"
                            >
                              <RotateCcw className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
                        <span>Rácslépés: {tickStep} egység</span>
                        <span>
                          X[{minX.toFixed(1)}..{maxX.toFixed(1)}], Y[{minY.toFixed(1)}..{maxY.toFixed(1)}]
                        </span>
                      </div>

                      {/* SVG Rajzvászon */}
                      <svg
                        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                        className="w-full h-auto select-none rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 drop-shadow-sm"
                      >
                        <defs>
                          <clipPath id="coordClip">
                            <rect x={offsetX} y={offsetY} width={contentWidth} height={contentHeight} rx="10" />
                          </clipPath>
                        </defs>

                        {/* Keret háttere */}
                        <rect
                          x={offsetX}
                          y={offsetY}
                          width={contentWidth}
                          height={contentHeight}
                          rx="10"
                          fill="#fafafa"
                          className="dark:fill-slate-950 stroke-slate-200 dark:stroke-slate-800 stroke-[1]"
                        />

                        {/* Vágómaszkba zárt rács, egyenesek és vetületek */}
                        <g clipPath="url(#coordClip)">
                          {/* Rácsvonalak: Függőleges X vonalak */}
                          {ticksX.map((tx) => {
                            const sx = toSvgX(tx);
                            const isZero = Math.abs(tx) < 1e-6;
                            return (
                              <line
                                key={`grid-x-${tx}`}
                                x1={sx}
                                y1={offsetY}
                                x2={sx}
                                y2={offsetY + contentHeight}
                                stroke={isZero ? '#64748b' : '#e2e8f0'}
                                strokeWidth={isZero ? 2.5 : 0.8}
                                strokeDasharray={isZero ? undefined : '2 2'}
                                className={isZero ? 'dark:stroke-slate-400' : 'dark:stroke-slate-800'}
                              />
                            );
                          })}

                          {/* Rácsvonalak: Vízszintes Y vonalak */}
                          {ticksY.map((ty) => {
                            const sy = toSvgY(ty);
                            const isZero = Math.abs(ty) < 1e-6;
                            return (
                              <line
                                key={`grid-y-${ty}`}
                                x1={offsetX}
                                y1={sy}
                                x2={offsetX + contentWidth}
                                y2={sy}
                                stroke={isZero ? '#64748b' : '#e2e8f0'}
                                strokeWidth={isZero ? 2.5 : 0.8}
                                strokeDasharray={isZero ? undefined : '2 2'}
                                className={isZero ? 'dark:stroke-slate-400' : 'dark:stroke-slate-800'}
                              />
                            );
                          })}

                          {/* 1. Egyenes (Lila) */}
                          {line1Seg && (
                            <line
                              x1={line1Seg.x1}
                              y1={line1Seg.y1}
                              x2={line1Seg.x2}
                              y2={line1Seg.y2}
                              stroke="#9333ea"
                              strokeWidth="3.5"
                              strokeLinecap="round"
                            />
                          )}

                          {/* 2. Egyenes (Kék) */}
                          {line2Seg && (
                            <line
                              x1={line2Seg.x1}
                              y1={line2Seg.y1}
                              x2={line2Seg.x2}
                              y2={line2Seg.y2}
                              stroke="#2563eb"
                              strokeWidth="3.5"
                              strokeLinecap="round"
                            />
                          )}

                          {/* Vetítési vonalak a tengelyekre metszéspont esetén */}
                          {hasUniqueSolution && (
                            <>
                              {/* X tengelyre merőleges vetület */}
                              <line
                                x1={toSvgX(sysX)}
                                y1={toSvgY(sysY)}
                                x2={toSvgX(sysX)}
                                y2={isZeroYInView ? toSvgY(0) : toSvgY(minY)}
                                stroke="#c084fc"
                                strokeWidth="2"
                                strokeDasharray="5 4"
                              />
                              {/* X tengely lábpont jelölése */}
                              <circle
                                cx={toSvgX(sysX)}
                                cy={isZeroYInView ? toSvgY(0) : toSvgY(minY)}
                                r="4"
                                fill="#9333ea"
                              />

                              {/* Y tengelyre merőleges vetület */}
                              <line
                                x1={toSvgX(sysX)}
                                y1={toSvgY(sysY)}
                                x2={isZeroXInView ? toSvgX(0) : toSvgX(minX)}
                                y2={toSvgY(sysY)}
                                stroke="#c084fc"
                                strokeWidth="2"
                                strokeDasharray="5 4"
                              />
                              {/* Y tengely lábpont jelölése */}
                              <circle
                                cx={isZeroXInView ? toSvgX(0) : toSvgX(minX)}
                                cy={toSvgY(sysY)}
                                r="4"
                                fill="#9333ea"
                              />
                            </>
                          )}
                        </g>

                        {/* X Tengely számfeliratok */}
                        {ticksX.map((tx) => {
                          const sx = toSvgX(tx);
                          const sy = isZeroYInView
                            ? Math.min(offsetY + contentHeight - 6, Math.max(offsetY + 14, toSvgY(0) + 14))
                            : offsetY + contentHeight + 14;
                          return (
                            <text
                              key={`lbl-x-${tx}`}
                              x={sx}
                              y={sy}
                              fontSize="9.5"
                              fontFamily="monospace"
                              fill="#64748b"
                              textAnchor="middle"
                              fontWeight={Math.abs(tx) < 1e-6 ? 'bold' : 'normal'}
                            >
                              {Math.abs(tx) < 1e-6 ? '0' : Number.isInteger(tx) ? tx : tx.toFixed(1)}
                            </text>
                          );
                        })}

                        {/* Y Tengely számfeliratok */}
                        {ticksY.map((ty) => {
                          if (Math.abs(ty) < 1e-6 && isZeroXInView) return null;
                          const sy = toSvgY(ty);
                          const sx = isZeroXInView
                            ? Math.max(offsetX + 16, Math.min(offsetX + contentWidth - 16, toSvgX(0) - 6))
                            : offsetX - 8;
                          return (
                            <text
                              key={`lbl-y-${ty}`}
                              x={sx}
                              y={sy + 3.5}
                              fontSize="9.5"
                              fontFamily="monospace"
                              fill="#64748b"
                              textAnchor="end"
                              fontWeight={Math.abs(ty) < 1e-6 ? 'bold' : 'normal'}
                            >
                              {Number.isInteger(ty) ? ty : ty.toFixed(1)}
                            </text>
                          );
                        })}

                        {/* Főtengely Nyilak és Tengely Feliratok */}
                        {isZeroXInView && (
                          <g>
                            <polygon
                              points={`${toSvgX(0)},${offsetY - 6} ${toSvgX(0) - 5},${offsetY + 5} ${toSvgX(0) + 5},${offsetY + 5}`}
                              fill="#334155"
                            />
                            <text
                              x={toSvgX(0) + 9}
                              y={offsetY + 4}
                              fontSize="12"
                              fontWeight="black"
                              fill="#1e293b"
                              className="dark:fill-slate-200"
                            >
                              y
                            </text>
                          </g>
                        )}

                        {isZeroYInView && (
                          <g>
                            <polygon
                              points={`${offsetX + contentWidth + 6},${toSvgY(0)} ${offsetX + contentWidth - 5},${toSvgY(0) - 5} ${offsetX + contentWidth - 5},${toSvgY(0) + 5}`}
                              fill="#334155"
                            />
                            <text
                              x={offsetX + contentWidth + 4}
                              y={toSvgY(0) - 8}
                              fontSize="12"
                              fontWeight="black"
                              fill="#1e293b"
                              className="dark:fill-slate-200"
                            >
                              x
                            </text>
                          </g>
                        )}

                        {/* Lebegő Jelmagyarázat a bal felső sarokban */}
                        <g transform={`translate(${offsetX + 10}, ${offsetY + 10})`}>
                          <rect
                            x="0"
                            y="0"
                            width="145"
                            height="46"
                            rx="8"
                            fill="#ffffff"
                            fillOpacity="0.9"
                            stroke="#cbd5e1"
                            strokeWidth="1"
                            className="dark:fill-slate-900 dark:stroke-slate-700"
                          />
                          <line x1="8" y1="14" x2="24" y2="14" stroke="#9333ea" strokeWidth="3" />
                          <text x="28" y="17" fontSize="9.5" fontWeight="bold" fill="#7e22ce" fontFamily="monospace">
                            e₁: {numA1}x + {numB1}y = {numC1}
                          </text>
                          <line x1="8" y1="32" x2="24" y2="32" stroke="#2563eb" strokeWidth="3" />
                          <text x="28" y="35" fontSize="9.5" fontWeight="bold" fill="#1d4ed8" fontFamily="monospace">
                            e₂: {numA2}x + {numB2}y = {numC2}
                          </text>
                        </g>

                        {/* Metszéspont Kiemelése és Címkéje */}
                        {hasUniqueSolution ? (
                          (() => {
                            const mx = toSvgX(sysX);
                            const my = toSvgY(sysY);

                            const badgeW = 125;
                            const badgeH = 30;
                            const labelX = mx > offsetX + contentWidth - badgeW - 10 ? mx - badgeW - 10 : mx + 12;
                            const labelY = my < offsetY + badgeH + 10 ? my + 12 : my - badgeH;

                            return (
                              <g>
                                <circle cx={mx} cy={my} r="16" fill="#a855f7" fillOpacity="0.25" />
                                <circle cx={mx} cy={my} r="10" fill="#ffffff" stroke="#7e22ce" strokeWidth="2.5" />
                                <circle cx={mx} cy={my} r="4" fill="#7e22ce" />

                                <g transform={`translate(${labelX}, ${labelY})`}>
                                  <rect
                                    x="0"
                                    y="0"
                                    width={badgeW}
                                    height={badgeH}
                                    rx="6"
                                    fill="#1e1b4b"
                                    stroke="#a855f7"
                                    strokeWidth="1.2"
                                    filter="drop-shadow(0 4px 6px rgba(0,0,0,0.3))"
                                  />
                                  <text
                                    x={badgeW / 2}
                                    y="13"
                                    textAnchor="middle"
                                    fontSize="8.5"
                                    fontWeight="bold"
                                    fill="#d8b4fe"
                                  >
                                    Metszéspont (Megoldás)
                                  </text>
                                  <text
                                    x={badgeW / 2}
                                    y="24"
                                    textAnchor="middle"
                                    fontSize="10.5"
                                    fontWeight="black"
                                    fontFamily="monospace"
                                    fill="#ffffff"
                                  >
                                    M({Number.isInteger(sysX) ? sysX : sysX.toFixed(2)}; {Number.isInteger(sysY) ? sysY : sysY.toFixed(2)})
                                  </text>
                                </g>
                              </g>
                            );
                          })()
                        ) : (
                          <g transform={`translate(${svgWidth / 2}, ${svgHeight / 2})`}>
                            <rect
                              x="-140"
                              y="-20"
                              width="280"
                              height="40"
                              rx="10"
                              fill="#ffe4e6"
                              stroke="#f43f5e"
                              strokeWidth="2"
                              filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))"
                            />
                            <text x="0" y="4" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#be123c">
                              ⚠️ Párhuzamos egyenesek — Nincs metszéspont!
                            </text>
                          </g>
                        )}
                      </svg>
                    </div>

                    {/* JOBB OLDAL: Két állítópanel egymás alatt (lg:col-span-5) */}
                    <div className="lg:col-span-5 flex flex-col gap-3">
                      {/* 1. Egyenlet paraméterei */}
                      <div className="p-3.5 rounded-xl bg-violet-50/70 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-900 space-y-2">
                        <div className="font-bold text-xs text-violet-800 dark:text-violet-300 flex items-center justify-between">
                          <span>1. Egyenlet: a₁·x + b₁·y = c₁</span>
                          <span className="w-2.5 h-2.5 rounded-full bg-purple-600 inline-block"></span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <label className="text-[10px] text-slate-500 font-bold block mb-0.5">a₁:</label>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => setA1(String((parseFloat(a1) || 0) - 1))}
                                className="w-6 h-7 flex items-center justify-center rounded bg-violet-100 hover:bg-violet-200 dark:bg-violet-900/60 text-violet-800 dark:text-violet-200 font-bold cursor-pointer select-none"
                              >
                                -
                              </button>
                              <input
                                type="text"
                                inputMode="numeric"
                                value={a1}
                                onChange={(e) => setA1(e.target.value)}
                                className="w-full p-1 h-7 rounded border border-violet-300 dark:border-violet-700 dark:bg-slate-800 text-center font-mono font-bold text-xs"
                              />
                              <button
                                type="button"
                                onClick={() => setA1(String((parseFloat(a1) || 0) + 1))}
                                className="w-6 h-7 flex items-center justify-center rounded bg-violet-100 hover:bg-violet-200 dark:bg-violet-900/60 text-violet-800 dark:text-violet-200 font-bold cursor-pointer select-none"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] text-slate-500 font-bold block mb-0.5">b₁:</label>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => setB1(String((parseFloat(b1) || 0) - 1))}
                                className="w-6 h-7 flex items-center justify-center rounded bg-violet-100 hover:bg-violet-200 dark:bg-violet-900/60 text-violet-800 dark:text-violet-200 font-bold cursor-pointer select-none"
                              >
                                -
                              </button>
                              <input
                                type="text"
                                inputMode="numeric"
                                value={b1}
                                onChange={(e) => setB1(e.target.value)}
                                className="w-full p-1 h-7 rounded border border-violet-300 dark:border-violet-700 dark:bg-slate-800 text-center font-mono font-bold text-xs"
                              />
                              <button
                                type="button"
                                onClick={() => setB1(String((parseFloat(b1) || 0) + 1))}
                                className="w-6 h-7 flex items-center justify-center rounded bg-violet-100 hover:bg-violet-200 dark:bg-violet-900/60 text-violet-800 dark:text-violet-200 font-bold cursor-pointer select-none"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] text-slate-500 font-bold block mb-0.5">c₁:</label>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => setC1(String((parseFloat(c1) || 0) - 1))}
                                className="w-6 h-7 flex items-center justify-center rounded bg-violet-100 hover:bg-violet-200 dark:bg-violet-900/60 text-violet-800 dark:text-violet-200 font-bold cursor-pointer select-none"
                              >
                                -
                              </button>
                              <input
                                type="text"
                                inputMode="numeric"
                                value={c1}
                                onChange={(e) => setC1(e.target.value)}
                                className="w-full p-1 h-7 rounded border border-violet-300 dark:border-violet-700 dark:bg-slate-800 text-center font-mono font-bold text-xs"
                              />
                              <button
                                type="button"
                                onClick={() => setC1(String((parseFloat(c1) || 0) + 1))}
                                className="w-6 h-7 flex items-center justify-center rounded bg-violet-100 hover:bg-violet-200 dark:bg-violet-900/60 text-violet-800 dark:text-violet-200 font-bold cursor-pointer select-none"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="text-center font-mono font-black text-purple-700 dark:text-purple-300 text-sm py-1 bg-white dark:bg-slate-900 rounded border border-violet-200">
                          {numA1}x + {numB1}y = {numC1}
                        </div>
                      </div>

                      {/* 2. Egyenlet paraméterei */}
                      <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 space-y-2">
                        <div className="font-bold text-xs text-blue-800 dark:text-blue-300 flex items-center justify-between">
                          <span>2. Egyenlet: a₂·x + b₂·y = c₂</span>
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <label className="text-[10px] text-slate-500 font-bold block mb-0.5">a₂:</label>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => setA2(String((parseFloat(a2) || 0) - 1))}
                                className="w-6 h-7 flex items-center justify-center rounded bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 font-bold cursor-pointer select-none"
                              >
                                -
                              </button>
                              <input
                                type="text"
                                inputMode="numeric"
                                value={a2}
                                onChange={(e) => setA2(e.target.value)}
                                className="w-full p-1 h-7 rounded border border-blue-300 dark:border-blue-700 dark:bg-slate-800 text-center font-mono font-bold text-xs"
                              />
                              <button
                                type="button"
                                onClick={() => setA2(String((parseFloat(a2) || 0) + 1))}
                                className="w-6 h-7 flex items-center justify-center rounded bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 font-bold cursor-pointer select-none"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] text-slate-500 font-bold block mb-0.5">b₂:</label>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => setB2(String((parseFloat(b2) || 0) - 1))}
                                className="w-6 h-7 flex items-center justify-center rounded bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 font-bold cursor-pointer select-none"
                              >
                                -
                              </button>
                              <input
                                type="text"
                                inputMode="numeric"
                                value={b2}
                                onChange={(e) => setB2(e.target.value)}
                                className="w-full p-1 h-7 rounded border border-blue-300 dark:border-blue-700 dark:bg-slate-800 text-center font-mono font-bold text-xs"
                              />
                              <button
                                type="button"
                                onClick={() => setB2(String((parseFloat(b2) || 0) + 1))}
                                className="w-6 h-7 flex items-center justify-center rounded bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 font-bold cursor-pointer select-none"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] text-slate-500 font-bold block mb-0.5">c₂:</label>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => setC2(String((parseFloat(c2) || 0) - 1))}
                                className="w-6 h-7 flex items-center justify-center rounded bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 font-bold cursor-pointer select-none"
                              >
                                -
                              </button>
                              <input
                                type="text"
                                inputMode="numeric"
                                value={c2}
                                onChange={(e) => setC2(e.target.value)}
                                className="w-full p-1 h-7 rounded border border-blue-300 dark:border-blue-700 dark:bg-slate-800 text-center font-mono font-bold text-xs"
                              />
                              <button
                                type="button"
                                onClick={() => setC2(String((parseFloat(c2) || 0) + 1))}
                                className="w-6 h-7 flex items-center justify-center rounded bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 font-bold cursor-pointer select-none"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="text-center font-mono font-black text-blue-700 dark:text-blue-300 text-sm py-1 bg-white dark:bg-slate-900 rounded border border-blue-200">
                          {numA2}x + {numB2}y = {numC2}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </TheoryCard>
      </TheorySection>

      {/* 6. Szekció: Részletesen Kidolgozott Mintapéldák */}
      <TheorySection
        number={6}
        title="Részletesen Kidolgozott Mintapéldák a Tankönyvből"
        icon={<Calculator className="w-5 h-5 text-violet-600" />}
        badge="Mintapéldák"
        badgeColor="violet"
      >
        {/* 1. MINTAPÉLDA */}
        <TheoryCard
          title="1. Mintapélda: Padok és diákok feladvány"
          badge="Hiány-többlet modell"
          badgeColor="violet"
        >
          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            <p className="font-medium text-slate-800 dark:text-slate-100">
              <strong>Feladat:</strong> Egy tanteremben a tanulók leülnek a padokba. Ha minden padba 2 diák ül, akkor 5 diáknak nem jut ülőhely. Ha minden padba 3 diák ül, akkor 2 pad teljesen üresen marad. Hány pad van a teremben, és hány diák jár az osztályba?
            </p>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5 font-mono">
              <div className="font-bold text-violet-700 dark:text-violet-300">1. Lépés: Ismeretlen kiválasztása</div>
              <div>Legyen a padok száma: p darab.</div>
              <div className="pt-1 font-bold text-purple-700 dark:text-purple-300">2. Lépés: Diákok számának felírása mindkét módon</div>
              <div>1. eset (2 diák ül padonként, 5 áll): Diákok = 2p + 5</div>
              <div>2. eset (3 diák ül padonként, 2 pad üres): Diákok = 3(p - 2)</div>
              <div className="pt-1 font-bold text-indigo-700 dark:text-indigo-300">3. Lépés: Egyenlet megoldása</div>
              <div>2p + 5 = 3(p - 2)</div>
              <div>2p + 5 = 3p - 6</div>
              <div>5 = p - 6 ⇒ p = 11 pad</div>
              <div>Diákok száma: 2 · 11 + 5 = 27 diák.</div>
            </div>

            <p className="text-[11px] text-slate-500">
              <strong>Ellenőrzés:</strong> 11 pad esetén 2-esével leülve: 11 · 2 = 22 hely, 27 - 22 = 5 diák állva marad. 3-asával leülve: 27 / 3 = 9 pad telik meg, 11 - 9 = 2 pad üresen marad. Helyes!
            </p>
          </div>
        </TheoryCard>

        {/* 2. MINTAPÉLDA */}
        <TheoryCard
          title="2. Mintapélda: Mozijegyek bevétele"
          badge="Kétféle ár"
          badgeColor="purple"
        >
          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            <p className="font-medium text-slate-800 dark:text-slate-100">
              <strong>Feladat:</strong> Egy moziban 120 darab jegyet értékesítettek összesen 280 000 Ft értékben. A diákjegy 2000 Ft, a felnőttjegy 3000 Ft volt. Hány diákjegyet és hány felnőttjegyet adtak el?
            </p>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5 font-mono">
              <div className="font-bold text-purple-700 dark:text-purple-300">1. Lépés: Ismeretlenek</div>
              <div>Diákjegyek száma: x darab</div>
              <div>Felnőttjegyek száma: 120 - x darab</div>
              <div className="pt-1 font-bold text-indigo-700 dark:text-indigo-300">2. Lépés: Egyenlet felírása a bevételre</div>
              <div>2000 · x + 3000 · (120 - x) = 280 000</div>
              <div>2000x + 360 000 - 3000x = 280 000</div>
              <div>-1000x + 360 000 = 280 000 ⇒ 1000x = 80 000 ⇒ x = 80 diákjegy</div>
              <div>Felnőttjegyek: 120 - 80 = 40 felnőttjegy.</div>
            </div>

            <p className="text-[11px] text-slate-500">
              <strong>Ellenőrzés:</strong> 80 · 2000 Ft = 160 000 Ft. 40 · 3000 Ft = 120 000 Ft. Összesen: 160 000 + 120 000 = 280 000 Ft. Pontosan stimmel!
            </p>
          </div>
        </TheoryCard>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default MixedWordProblemsTheory;
