import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  BreakEvenSvg,
  ProjectileMotionSvg,
  GeometricOptSvg
} from './PracticalFigures';
import {
  Sparkles,
  BookOpen,
  DollarSign,
  Rocket,
  Maximize2,
  AlertTriangle,
  Layers,
  Wrench
} from 'lucide-react';

export interface PracticalTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

type SimulationTab = 'business' | 'physics' | 'geometry';

export const PracticalTheory: React.FC<PracticalTheoryProps> = ({
  onBack,
  onStartQuiz,
}) => {
  const [tab, setTab] = useState<SimulationTab>('business');

  // Üzleti állapot
  const [fixCost, setFixCost] = useState<number>(40000);
  const [unitCost, setUnitCost] = useState<number>(1000);
  const [unitPrice, setUnitPrice] = useState<number>(2500);

  // Fizikai állapot
  const [v0, setV0] = useState<number>(20);
  const [h0, setH0] = useState<number>(5);

  // Geometriai állapot
  const [fenceLen, setFenceLen] = useState<number>(40);

  // Üzleti számítások
  const marginPerUnit = unitPrice - unitCost;
  const breakEvenUnits = marginPerUnit > 0 ? Math.ceil(fixCost / marginPerUnit) : 0;
  const breakEvenRevenue = breakEvenUnits * unitPrice;

  // Fizikai számítások: h(t) = -5t^2 + v0*t + h0
  const tPeak = v0 / 10;
  const hMax = -5 * Math.pow(tPeak, 2) + v0 * tPeak + h0;
  const disc = v0 * v0 + 4 * 5 * h0;
  const tLanding = (v0 + Math.sqrt(disc)) / 10;

  // Geometriai számítások (folyóparti 3-oldalú kert: T(x) = x*(L - 2x) = -2x^2 + Lx)
  const optX = fenceLen / 4;
  const optY = fenceLen / 2;
  const maxArea = optX * optY;

  return (
    <TheoryTemplate
      title="14. Gyakorlati Feladatok & Modellezés"
      subtitle="Gazdasági költség-bevétel elemzés, hajítások másodfokú pályája és geometriai szélsőértékek a mindennapokban"
      badge="9. OSZTÁLY • V. FÜGGVÉNYEK"
      topicBadge="9. OSZTÁLY • V. FÜGGVÉNYEK • 14. GYAKORLATI FELADATOK"
      themeColor="sky"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      onSwitchToQuiz={onStartQuiz}
      quickRule={{
        label: "A Modellezés Fő Képletei",
        formula: "Fedezeti pont: B(x) = K(x) | Hajítás csúcsa: t = v₀ / 10 | Optimális téglalap: T(x) csúcspontja",
        align: "center"
      }}
      practiceTitle="Készen állsz a valódi problémák modellezésére?"
      practiceSubtitle="30 izgalmas életszerű feladat vár: vállalkozási költségek, mobilcsomagok, fékút-számítás, dobások és területi optimumok"
      practiceButtonText="Gyakorló Kvíz Indítása"
    >
      {/* =========================================================================
          1. SZEKCIÓ: ÁTTEKINTÉS ÉS ALAPMODELLEK
      ========================================================================= */}
      <TheorySection
        title="1. A Három Legfontosabb Életszerű Modell"
        subtitle="Milyen valós helyzetekben nyújtanak nélkülözhetetlen segítséget a függvények?"
        icon={<Wrench className="w-6 h-6 text-sky-500" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center shadow-xs">
            <BreakEvenSvg size={240} className="mb-2" />
            <h4 className="text-sm font-bold text-amber-700 dark:text-amber-300">Pénzügyi Modellek</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Költség {'$K(x) = K_{\\text{fix}} + v \\cdot x$'}, Bevétel $B(x) = p \cdot x$. A metszéspont a nullszaldó (fedezeti pont).
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center shadow-xs">
            <ProjectileMotionSvg size={240} className="mb-2" />
            <h4 className="text-sm font-bold text-sky-700 dark:text-sky-300">Fizikai Hajítások</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              A függőleges hajítás magasság-idő függvénye lefelé nyíló parabola: $h(t) = -5t^2 + v_0 t + h_0$.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center shadow-xs">
            <GeometricOptSvg size={240} className="mb-2" />
            <h4 className="text-sm font-bold text-emerald-700 dark:text-emerald-300">Geometriai Optimum</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Adott kerületből a legnagyobb zárt terület megtalálása a másodfokú területfüggvény csúcspontjával.
            </p>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          2. SZEKCIÓ: INTERAKTÍV MODELLEZŐ SZIMULÁTOR
      ========================================================================= */}
      <TheorySection
        title="2. Interaktív Modellező Szimulátor"
        subtitle="Válassz szakterületet, állítsd a paramétereket, és figyeld a valós idejű matematikai kalkulációt!"
        icon={<Sparkles className="w-6 h-6 text-sky-500" />}
      >
        <div className="bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-700 shadow-md space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <span className="text-sm font-bold text-white uppercase tracking-wider">Szimulációs forgatókönyv:</span>
            <div className="flex rounded-lg bg-slate-800 p-1 border border-slate-700">
              <button
                type="button"
                onClick={() => setTab('business')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                  tab === 'business'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <DollarSign className="w-3.5 h-3.5" /> Üzlet & Fedezet
              </button>
              <button
                type="button"
                onClick={() => setTab('physics')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                  tab === 'physics'
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Rocket className="w-3.5 h-3.5" /> Hajítás & Pálya
              </button>
              <button
                type="button"
                onClick={() => setTab('geometry')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                  tab === 'geometry'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Maximize2 className="w-3.5 h-3.5" /> Terület & Kerítés
              </button>
            </div>
          </div>

          {/* 1. ÜZLETI SZIMULÁCIÓ */}
          {tab === 'business' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Fix költség (K_fix):</span>
                    <strong className="text-amber-400 font-mono text-sm">{fixCost.toLocaleString('hu-HU')} Ft</strong>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="100000"
                    step="5000"
                    value={fixCost}
                    onChange={e => setFixCost(parseInt(e.target.value, 10))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500 block mt-1">Bérleti díj, eszközök</span>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Darabonkénti önköltség (v):</span>
                    <strong className="text-rose-400 font-mono text-sm">{unitCost.toLocaleString('hu-HU')} Ft/db</strong>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="3000"
                    step="100"
                    value={unitCost}
                    onChange={e => setUnitCost(parseInt(e.target.value, 10))}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500 block mt-1">Alapanyag és gyártás</span>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Eladási egységár (p):</span>
                    <strong className="text-emerald-400 font-mono text-sm">{unitPrice.toLocaleString('hu-HU')} Ft/db</strong>
                  </div>
                  <input
                    type="range"
                    min="1200"
                    max="6000"
                    step="100"
                    value={unitPrice}
                    onChange={e => setUnitPrice(parseInt(e.target.value, 10))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500 block mt-1">Fogyasztói eladási ár</span>
                </div>
              </div>

              {/* Eredménykártyák */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <span className="text-xs text-slate-400 block">Haszonkulcs (Fedezeti hozzájárulás):</span>
                  <span className="text-2xl font-bold text-amber-400 font-mono">
                    {(unitPrice - unitCost).toLocaleString('hu-HU')} Ft/db
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-1">p - v = egységhaszon</span>
                </div>

                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <span className="text-xs text-slate-400 block">Szükséges eladott darabszám (Fedezeti pont):</span>
                  <span className="text-2xl font-bold text-sky-400 font-mono">
                    {breakEvenUnits} db
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-1">x_fedezet = K_fix / (p - v)</span>
                </div>

                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <span className="text-xs text-slate-400 block">Fedezeti forgalom (Kritikus árbevétel):</span>
                  <span className="text-2xl font-bold text-emerald-400 font-mono">
                    {breakEvenRevenue.toLocaleString('hu-HU')} Ft
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-1">B(x_fedezet) = x · p</span>
                </div>
              </div>

              <div className="bg-amber-950/30 border border-amber-500/30 p-4 rounded-xl text-xs text-slate-300 leading-relaxed">
                <strong className="text-amber-300 block mb-1">Gazdasági összefoglaló:</strong>
                A vállalkozás az első <strong>{breakEvenUnits} eladott darabig veszteséges</strong>, pontosan {breakEvenUnits} darabnál éri el a nullszaldót, és minden efelett eladott termék darabonként <strong>{(unitPrice - unitCost).toLocaleString('hu-HU')} Ft tiszta profitot</strong> termel.
              </div>
            </div>
          )}

          {/* 2. FIZIKAI SZIMULÁCIÓ */}
          {tab === 'physics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Kezdősebesség (v₀):</span>
                    <strong className="text-sky-400 font-mono text-sm">{v0} m/s</strong>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="40"
                    step="1"
                    value={v0}
                    onChange={e => setV0(parseInt(e.target.value, 10))}
                    className="w-full accent-sky-500 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500 block mt-1">Kilövési sebesség</span>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Kezdőmagasság (h₀):</span>
                    <strong className="text-emerald-400 font-mono text-sm">{h0} m</strong>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    step="1"
                    value={h0}
                    onChange={e => setH0(parseInt(e.target.value, 10))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500 block mt-1">Indítási magasság a talajhoz képest</span>
                </div>
              </div>

              {/* Fizikai eredménykártyák */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <span className="text-xs text-slate-400 block">Tetőpont elérésének ideje:</span>
                  <span className="text-2xl font-bold text-sky-400 font-mono">
                    {tPeak.toFixed(2)} s
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-1">t_tető = v₀ / g (ahol g ≈ 10 m/s²)</span>
                </div>

                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <span className="text-xs text-slate-400 block">Maximális magasság (Tetőpont):</span>
                  <span className="text-2xl font-bold text-emerald-400 font-mono">
                    {hMax.toFixed(1)} m
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-1">h_max = h(t_tető) (parabola csúcsa)</span>
                </div>

                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <span className="text-xs text-slate-400 block">Becsapódás ideje (Repülési idő):</span>
                  <span className="text-2xl font-bold text-amber-400 font-mono">
                    {tLanding.toFixed(2)} s
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-1">h(t) = 0 zérushely megoldása</span>
                </div>
              </div>

              <div className="bg-sky-950/30 border border-sky-500/30 p-4 rounded-xl text-xs text-slate-300 leading-relaxed">
                <strong className="text-sky-300 block mb-1">Fizikai modell:</strong>
                A test magassága az idő függvényében: <code className="font-mono font-bold text-white">h(t) = -5t² + {v0}t + {h0}</code>. A parabola szimmetriatengelye a tetőpontnál van, a talajra érkezés pillanatát pedig a pozitív zérushely adja meg.
              </div>
            </div>
          )}

          {/* 3. GEOMETRIAI SZIMULÁCIÓ */}
          {tab === 'geometry' && (
            <div className="space-y-6">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Rendelkezésre álló kerítés hossza (L):</span>
                  <strong className="text-emerald-400 font-mono text-sm">{fenceLen} m</strong>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  step="4"
                  value={fenceLen}
                  onChange={e => setFenceLen(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500 block mt-1">Folyópartra illesztett 3-oldalú kerítés (2 mélység + 1 szélesség)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <span className="text-xs text-slate-400 block">Optimális mélység (folyóra merőleges x):</span>
                  <span className="text-2xl font-bold text-amber-400 font-mono">
                    {optX.toFixed(1)} m
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-1">x_opt = L / 4</span>
                </div>

                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <span className="text-xs text-slate-400 block">Optimális szélesség (folyóval párhuzamos y):</span>
                  <span className="text-2xl font-bold text-sky-400 font-mono">
                    {optY.toFixed(1)} m
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-1">y_opt = L / 2 = 2x</span>
                </div>

                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <span className="text-xs text-slate-400 block">Elérhető maximális terület:</span>
                  <span className="text-2xl font-bold text-emerald-400 font-mono">
                    {maxArea.toFixed(1)} m²
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-1">T_max = x · y = L² / 8</span>
                </div>
              </div>

              <div className="bg-emerald-950/30 border border-emerald-500/30 p-4 rounded-xl text-xs text-slate-300 leading-relaxed">
                <strong className="text-emerald-300 block mb-1">Geometriai levezetés:</strong>
                A kerítés hossza: $2x + y = {fenceLen} \implies y = {fenceLen} - 2x$.
                A terület függvénye: $T(x) = x({fenceLen} - 2x) = -2x^2 + {fenceLen}x = -2(x - {optX})^2 + {maxArea}$.
                Mivel a parabola lefelé nyílik, a maximum a csúcsponton, $x = {optX}$ m-nél van, ahol {'$T_{\\text{max}} = ' + maxArea + '$'} m².
              </div>
            </div>
          )}
        </div>
      </TheorySection>

      {/* =========================================================================
          3. SZEKCIÓ: A SZÖVEGES FELADATOK MEGOLDÁSÁNAK 4 ARANYSZABÁLYA
      ========================================================================= */}
      <TheorySection
        title="3. A Szöveges Feladatok Megoldásának 4 Aranyszabálya"
        subtitle="Hogyan fordítsuk le a köznapi szöveget egzakt matematikai modellre?"
        icon={<BookOpen className="w-6 h-6 text-sky-500" />}
      >
        <TheoryCard
          title="A szisztematikus modellezés lépései"
          icon={<BookOpen className="w-5 h-5 text-sky-500" />}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-xl border border-amber-200 dark:border-amber-900/50 space-y-1.5">
              <span className="text-amber-800 dark:text-amber-300 font-bold block text-sm">1. Változók kijelölése</span>
              <p className="text-slate-600 dark:text-slate-400">
                Mi a kérdés? Legyen $x$ a független változó (pl. eladott darabszám, eltelt idő, oldalhossz). Írd fel a mértékegységet!
              </p>
            </div>

            <div className="bg-sky-50 dark:bg-sky-950/30 p-4 rounded-xl border border-sky-200 dark:border-sky-900/50 space-y-1.5">
              <span className="text-sky-800 dark:text-sky-300 font-bold block text-sm">2. Hozzárendelés felírása</span>
              <p className="text-slate-600 dark:text-slate-400">
                Írd fel a szöveg alapján a függvény képletét: $K(x)$, $h(t)$ vagy $T(x)$. Tisztázd a reális értelmezési tartományt ($D_f$)!
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-xl border border-purple-200 dark:border-purple-900/50 space-y-1.5">
              <span className="text-purple-800 dark:text-purple-300 font-bold block text-sm">3. Számítás elvégzése</span>
              <p className="text-slate-600 dark:text-slate-400">
                Kérdéstől függően: oldj meg egyenletet (zérushely, fedezeti pont) vagy keresd meg a parabola csúcspontját (szélsőérték)!
              </p>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/50 space-y-1.5">
              <span className="text-emerald-800 dark:text-emerald-300 font-bold block text-sm">4. Valóságos ellenőrzés</span>
              <p className="text-slate-600 dark:text-slate-400">
                Megfelel a válasz a józan észnek? Darabszám csak nemnegatív egész lehet, idő és hosszúság nem lehet negatív!
              </p>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* =========================================================================
          4. SZEKCIÓ: TIPIKUS MODELLEZÉSI BUKTATÓK
      ========================================================================= */}
      <TheorySection
        title="4. Tipikus Hibák a Szöveges Modellezésnél"
        subtitle="Ezeket a gyakori elcsúszásokat kerüld el az érettségin!"
        icon={<AlertTriangle className="w-6 h-6 text-amber-500" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="1. Kezdőérték (h₀ vagy K_fix) lehagyása"
            trap="Ha a feladat hídról dobott kőről vagy fix havidíjról szól, sokan origóból (0-ról) indítják a képletet."
            solution="A kezdőmagasság vagy fix költség a függvény y-metszete: h(t) = -5t² + v₀t + h₀, illetve K(x) = v·x + K_fix!"
          />
          <TheoryTrapBox
            title="2. Törtszámú darabszám rossz kerekítése"
            trap="Fedezeti pontnál x = 14.3 darab jön ki, és a tanuló lefelé kerekít 14-re."
            solution="14 darab eladásánál még veszteséges a bolt! A fedezethez és profithoz mindig FELFELÉ kell kerekíteni egész darabszámra (15 db)!"
          />
          <TheoryTrapBox
            title="3. Negatív fizikai megoldások megtartása"
            trap="A becsapódás idejére kijön t₁ = -1 s és t₂ = 4 s, és mindkettőt felírják válaszként."
            solution="A fizikai valóságban az idő nem folyhat visszafelé: a negatív gyök értelmetlen a valós folyamatban, csak a t = 4 s fogadható el!"
          />
          <TheoryTrapBox
            title="4. Mértékegységek keverése"
            trap="A sebességet km/h-ban kapjuk, az időt másodpercben, és átváltás nélkül összeszorozzuk őket."
            solution="Mindig váltsunk kompatibilis SI mértékegységekre: 72 km/h = 20 m/s, vagy a perceket órára!"
          />
        </div>
      </TheorySection>

      {/* =========================================================================
          5. SZEKCIÓ: GYAKORLATI MODELLEZÉSI TÁBLÁZAT
      ========================================================================= */}
      <TheorySection
        title="5. Modellezési Típusok Összefoglalása"
        subtitle="A leggyakoribb szöveges feladatok matematikai váza"
        icon={<Layers className="w-6 h-6 text-sky-500" />}
      >
        <TheoryTable
          headers={['Feladat típusa', 'Függvényképlet', 'Matematikai feladat', 'Tipikus kérdés']}
          rows={[
            ['Költség-Bevétel (Lineáris)', 'K(x) = K_fix + v·x, B(x) = p·x', 'Egyenlet: B(x) = K(x)', 'Hány darabtól lesz nyereséges a vállalkozás?'],
            ['Függőleges hajítás (Másodfokú)', 'h(t) = -5t² + v₀t + h₀', 'Csúcspontkeresés és zérushely', 'Milyen magasra jut a kő és mikor ér földet?'],
            ['Területoptimalizálás (Másodfokú)', 'T(x) = x·(L - 2x)', 'Parabola csúcspontja (maximum)', 'Milyen méretek mellett lesz a legnagyobb a kert?'],
            ['Féktávolság (Négyzetes)', 's_fék(v) = c·v²', 'Másodfokú helyettesítés', 'Hányszorosára nő a fékút a sebesség duplázódásakor?'],
            ['Munkamegosztás (Fordított arányosság)', 't(n) = W / n', 'Hiperbolikus számítás', 'Hány nap alatt végeznek kétszer annyian?']
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};
