import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  Sliders,
  Scale,
  Table,
  AlertTriangle,
  ArrowRightLeft,
  Sparkles,
  Calculator,
  CheckCircle2
} from 'lucide-react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox
} from '../TheoryTemplate';
import {
  DirectProportionalitySvg,
  InverseProportionalitySvg,
  ProportionsBalanceSvg,
  UnitaryMethodTableSvg
} from './ProportionalityFigures';

interface ProportionalityTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const ProportionalityTheory: React.FC<ProportionalityTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV ARÁNYOSSÁGI LABOR ÁLLAPOTOK ---
  const [labMode, setLabMode] = useState<'direct' | 'inverse'>('direct');
  const [kFactor, setKFactor] = useState<number>(450);
  const [xVal, setXVal] = useState<number>(3);

  // Előre definiált életszerű minták
  const presets = [
    { label: 'Alma vásárlása (450 Ft/kg)', mode: 'direct' as const, k: 450, x: 3, unitX: 'kg', unitY: 'Ft', context: 'ár = egységár · tömeg' },
    { label: 'Gépkocsi út 90 km/h-val', mode: 'direct' as const, k: 90, x: 2.5, unitX: 'óra', unitY: 'km', context: 'út = sebesség · idő' },
    { label: '120 km-es út menetideje', mode: 'inverse' as const, k: 120, x: 60, unitX: 'km/h', unitY: 'óra', context: 'idő = távolság / sebesség' },
    { label: 'Kerítésfestés (24 munkásóra)', mode: 'inverse' as const, k: 24, x: 4, unitX: 'munkás', unitY: 'óra', context: 'idő = összes munka / munkások' }
  ];

  const currentPreset = presets.find(p => p.mode === labMode && p.k === kFactor) || {
    unitX: 'egység',
    unitY: 'érték',
    context: labMode === 'direct' ? 'y = k · x' : 'y = k / x'
  };

  const calculatedResult = useMemo(() => {
    if (labMode === 'direct') {
      const y = kFactor * xVal;
      const ratio = xVal !== 0 ? (y / xVal) : kFactor;
      return {
        y: Math.round(y * 100) / 100,
        constantText: `Hányados: y / x = ${y} / ${xVal} = ${ratio}`,
        formula: `y = ${kFactor} · ${xVal} = ${Math.round(y * 100) / 100}`,
        description: `Ha a bemeneti mennyiség (${xVal} ${currentPreset.unitX}) a kétszeresére nőne (${xVal * 2} ${currentPreset.unitX}), az eredmény is pontosan a kétszeresére nőne: ${Math.round(y * 2 * 100) / 100} ${currentPreset.unitY}.`
      };
    } else {
      const safeX = xVal === 0 ? 1 : xVal;
      const y = kFactor / safeX;
      const product = safeX * y;
      return {
        y: Math.round(y * 100) / 100,
        constantText: `Szorzat: x · y = ${safeX} · ${Math.round(y * 100) / 100} = ${Math.round(product * 100) / 100}`,
        formula: `y = ${kFactor} / ${safeX} = ${Math.round(y * 100) / 100}`,
        description: `Ha a bemeneti mennyiség (${safeX} ${currentPreset.unitX}) a duplájára nőne (${safeX * 2} ${currentPreset.unitX}), az eredmény a FELÉRE csökkenne: ${Math.round((y / 2) * 100) / 100} ${currentPreset.unitY}!`
      };
    }
  }, [labMode, kFactor, xVal, currentPreset]);

  return (
    <TheoryTemplate
      title="Arányosság – Egyenes és Fordított Arányosság, Aránypárok"
      subtitle="Összetartozó mennyiségek, arányossági tényező, keresztszorzat, hármasszabály és grafikonos ábrázolás a 9. osztályos tankönyv szerint"
      badgeText="9. OSZTÁLY • II. A SZÁMOK VILÁGA • 📈 TANANYAG"
      themeColor="emerald"
      documentId="proportionality-theory"
      pdfFilename="9_osztaly_aranyossag_tananyag.pdf"
      quickRule={{
        label: 'Az Arányosság Két Alaptörvénye',
        formula: 'Egyenes: y/x = k  (y = k·x)  |  Fordított: x·y = k  (y = k/x)'
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* 1. SZEKCIÓ: EGYENES ARÁNYOSSÁG */}
      <TheorySection
        number={1}
        title="Egyenes Arányosság: Állandó Hányados és az Origón Átmenő Egyenes"
        icon={<TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        badge="Egyenes Arányosság"
        badgeColor="emerald"
      >
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          A mindennapi életben és a természettudományokban a leggyakoribb matematikai kapcsolat az <strong>egyenes arányosság</strong>.
          A 9. osztályos tankönyv (16. lecke) pontos meghatározása szerint:
        </p>

        <div className="flex flex-col lg:flex-row items-stretch gap-6 my-6">
          <div className="w-full lg:w-1/2">
            <TheoryCard title="Az Egyenes Arányosság Definíciója" variant="emerald">
              <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <p>
                  Két összetartozó változó mennyiség (<em>x</em> és <em>y</em>) <strong>egyenesen arányos</strong>, ha:
                </p>
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center font-mono font-black text-emerald-900 dark:text-emerald-200 text-base">
                  y / x = k &nbsp;⟺&nbsp; y = k · x &nbsp; (k ≠ 0 állandó)
                </div>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>k</strong> az arányossági tényező (pl. egységár, sebesség, sűrűség).</li>
                  <li>Ha az egyik mennyiség <strong>n-szeresére nő</strong>, a másik is <strong>n-szeresére nő</strong>.</li>
                  <li>Ha az egyik mennyiség <strong>felére csökken</strong>, a másik is <strong>felére csökken</strong>.</li>
                </ul>
                <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
                  <strong>Mindennapi példák:</strong> Vett kenyér súlya és fizetendő ára; Megtett út állandó sebességnél ($s = v \cdot t$); Ledolgozott órák és órabér.
                </div>
              </div>
            </TheoryCard>
          </div>

          <div className="w-full lg:w-1/2 flex items-center justify-center p-3 sm:p-4 bg-white/80 dark:bg-slate-850/60 rounded-3xl border border-emerald-100/80 dark:border-slate-800 shadow-2xs">
            <DirectProportionalitySvg className="w-full max-w-[500px]" />
          </div>
        </div>

        <TheoryCallout title="A Grafikon Kulcstulajdonsága: Mindig átmegy az origón (0; 0)!" variant="tip">
          Az egyenes arányosság grafikonja a derékszögű koordináta-rendszerben egy <strong>olyan egyenes (vagy félegyenes), amely átmegy az origón</strong>.
          Ha $x = 0$, akkor $y = k \cdot 0 = 0$! Ha egy függvény nem megy át a $(0; 0)$ ponton (például $y = 500 + 200x$), az <strong>NEM egyenes arányosság</strong>, még akkor sem, ha a grafikonja egyenes vonal!
        </TheoryCallout>
      </TheorySection>

      {/* 2. SZEKCIÓ: FORDÍTOTT ARÁNYOSSÁG */}
      <TheorySection
        number={2}
        title="Fordított Arányosság: Állandó Szorzat és a Hiperbola Görbe"
        icon={<Scale className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        badge="Fordított Arányosság"
        badgeColor="indigo"
      >
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Gyakran előfordul, hogy az egyik mennyiség növekedése a másik mennyiség csökkenését vonja maga után.
          Kiemelkedő szerepe van annak az esetnek, amikor a szorzatuk szigorúan állandó:
        </p>

        <div className="flex flex-col lg:flex-row items-stretch gap-6 my-6">
          <div className="w-full lg:w-1/2 flex items-center justify-center p-3 sm:p-4 bg-white/80 dark:bg-slate-850/60 rounded-3xl border border-indigo-100/80 dark:border-slate-800 shadow-2xs">
            <InverseProportionalitySvg className="w-full max-w-[520px]" />
          </div>

          <div className="w-full lg:w-1/2">
            <TheoryCard title="A Fordított Arányosság Definíciója" variant="indigo">
              <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <p>
                  Két összetartozó változó mennyiség (<em>x</em> és <em>y</em>) <strong>fordítottan arányos</strong>, ha:
                </p>
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-indigo-950/40 border border-blue-200 dark:border-indigo-800 text-center font-mono font-black text-indigo-900 dark:text-indigo-200 text-base">
                  x · y = k &nbsp;⟺&nbsp; y = k / x &nbsp; (k ≠ 0 állandó)
                </div>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>k</strong> az állandó összérték (pl. fix távolság, összes munkaóra, téglalap területe).</li>
                  <li>Ha az egyik mennyiség <strong>n-szeresére nő</strong>, a másik az <strong>n-ed részére csökken</strong> (<em>n</em> &gt; 0).</li>
                  <li>A szorzat geometrikusan a görbe alatti téglalapok állandó területét jelenti!</li>
                </ul>
                <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
                  <strong>Mindennapi példák:</strong> Állandó távolság megtételéhez szükséges sebesség és idő ($v \cdot t = s$); Adott munka elvégzéséhez szükséges munkások száma és ideje; Adott területű téglalap szomszédos oldalai ($a \cdot b = T$).
                </div>
              </div>
            </TheoryCard>
          </div>
        </div>

        <TheoryCallout title="A Hiperbola Tulajdonsága" variant="info">
          A fordított arányosság grafikonja egy <strong>hiperbola</strong>. A görbe soha nem éri el sem az $x$, sem az $y$ tengelyt (mert 0-val nem oszthatunk, és szorzatuk sem lehet 0), de tetszőlegesen megközelíti azokat (aszimptoták).
        </TheoryCallout>
      </TheorySection>

      {/* 3. SZEKCIÓ: ARÁNYPÁROK ÉS KERESZTSZORZAT */}
      <TheorySection
        number={3}
        title="Aránypárok és a Keresztszorzat Alaptétele"
        icon={<ArrowRightLeft className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badge="Aránypárok"
        badgeColor="amber"
      >
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Az <strong>arány</strong> két azonos fajta mennyiség hányadosa, amely megmutatja, hogy az egyik hányszorosa a másiknak.
          Két arány egyenlőségét <strong>aránypárnak</strong> nevezzük:
        </p>

        <div className="my-6 flex justify-center">
          <ProportionsBalanceSvg size={500} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TheoryCard title="Az Aránypár Fogalma és Tagjai" variant="amber">
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p className="font-mono text-center text-base font-bold text-amber-900 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/40 p-2 rounded-lg">
                a : b = c : d &nbsp; vagy &nbsp; a / b = c / d
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>a és d:</strong> a külső tagok (a széleken állnak).</li>
                <li><strong>b és c:</strong> a belső tagok (belül állnak).</li>
                <li>Feltétel: $b \ne 0$ és $d \ne 0$.</li>
              </ul>
            </div>
          </TheoryCard>

          <TheoryCard title="A Keresztszorzat Szabálya" variant="emerald">
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p>
                <strong>Tétel:</strong> Bármely aránypárban a külső tagok szorzata egyenlő a belső tagok szorzatával:
              </p>
              <p className="font-mono text-center text-base font-black text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg">
                a · d = b · c
              </p>
              <p className="text-xs text-slate-500">
                Alkalmazás: Ha 4 tagból 3 ismert, az ismeretlen 4. tag azonnal kiszámolható: $x = (b \cdot c) / a$.
              </p>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: A HÁRMASSZABÁLY ÉS EGYSÉGRE KÖVETKEZTETÉS */}
      <TheorySection
        number={4}
        title="A Hármasszabály és az Egységre Következtetés Módszere"
        icon={<Table className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        badge="Gyakorlati Számítások"
        badgeColor="teal"
      >
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          A gyakorlati szöveges feladatok megoldásának legbiztosabb, legáttekinthetőbb eszköze a <strong>hármasszabály</strong> (egységre következtetés):
        </p>

        <div className="my-6 flex justify-center">
          <UnitaryMethodTableSvg size={500} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Egyenes Arányosság Hármasszabálya" variant="emerald">
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p className="font-bold text-emerald-800 dark:text-emerald-300">
                Példa: 3 kg sajt ára 7200 Ft. Mennyibe kerül 5 kg?
              </p>
              <div className="font-mono p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 space-y-1 text-xs">
                <p>3 kg &nbsp; ⟶ &nbsp; 7200 Ft</p>
                <p>1 kg &nbsp; ⟶ &nbsp; 7200 : 3 = <strong>2400 Ft</strong> (egységár)</p>
                <p>5 kg &nbsp; ⟶ &nbsp; 2400 · 5 = <strong>12 000 Ft</strong></p>
              </div>
              <p className="text-xs text-slate-500">
                Szabály: Mindkét oldalon <strong>ugyanazzal a számmal</strong> osztunk, majd szorzunk!
              </p>
            </div>
          </TheoryCard>

          <TheoryCard title="Fordított Arányosság Hármasszabálya" variant="indigo">
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p className="font-bold text-indigo-800 dark:text-indigo-300">
                Példa: 4 munkás 6 óra alatt ás fel egy kertet. Hány óra kell 3 munkásnak?
              </p>
              <div className="font-mono p-2.5 rounded-lg bg-blue-50 dark:bg-indigo-950/40 space-y-1 text-xs">
                <p>4 munkás &nbsp; ⟶ &nbsp; 6 óra (összesen 4·6 = 24 munkásóra)</p>
                <p>1 munkás &nbsp; ⟶ &nbsp; 6 · 4 = <strong>24 óra</strong> (:4 helyett ·4!)</p>
                <p>3 munkás &nbsp; ⟶ &nbsp; 24 : 3 = <strong>8 óra</strong> (·3 helyett :3!)</p>
              </div>
              <p className="text-xs text-slate-500">
                Szabály: A bal oldalon osztunk, a jobb oldalon <strong>szorzunk</strong> (ellentétes műveletek)!
              </p>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* --- INTERAKTÍV GYAKORLÓ LABORATÓRIUM A LECKE VÉGÉN --- */}
      <div className="bg-gradient-to-br from-emerald-50/70 via-teal-50/40 to-white dark:from-slate-900 dark:via-emerald-950/20 dark:to-slate-900 border-2 border-emerald-200 dark:border-emerald-800/60 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 my-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-100 dark:border-emerald-800/60 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="p-2.5 rounded-xl bg-emerald-600 text-white shadow-xs">
              <Sliders className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                Interaktív Arányossági Laboratórium
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                  Élő szimuláció
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Válts a két arányossági típus között, válassz életszerű szituációt vagy állíts be tetszőleges értékeket!
              </p>
            </div>
          </div>

          {/* Típusváltó gombok */}
          <div className="flex bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
            <button
              onClick={() => {
                setLabMode('direct');
                setKFactor(450);
                setXVal(3);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                labMode === 'direct'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              📈 Egyenes arányosság
            </button>
            <button
              onClick={() => {
                setLabMode('inverse');
                setKFactor(120);
                setXVal(60);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                labMode === 'inverse'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              ⚖️ Fordított arányosság
            </button>
          </div>
        </div>

        {/* Előre beállított minták */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400">Mintapéldák:</span>
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setLabMode(p.mode);
                setKFactor(p.k);
                setXVal(p.x);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                labMode === p.mode && kFactor === p.k
                  ? 'bg-emerald-100 dark:bg-emerald-950/70 border-emerald-400 text-emerald-900 dark:text-emerald-200'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-300'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Input beállítók */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-emerald-100 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Arányossági tényező (k):
                <span className="block text-[11px] text-slate-400 font-normal">
                  {labMode === 'direct' ? 'pl. egységár, sebesség' : 'pl. össztávolság, összes munka'}
                </span>
              </label>
              <input
                type="number"
                value={kFactor}
                onChange={e => setKFactor(parseFloat(e.target.value) || 1)}
                className="w-28 p-2 rounded-xl border text-center font-mono font-bold text-base bg-emerald-50/50 dark:bg-slate-900 border-emerald-300 dark:border-slate-600 text-emerald-900 dark:text-emerald-200"
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Bemeneti érték (x):
                <span className="block text-[11px] text-slate-400 font-normal">
                  {currentPreset.unitX}
                </span>
              </label>
              <input
                type="number"
                value={xVal}
                step="0.5"
                onChange={e => setXVal(parseFloat(e.target.value) || 0)}
                className="w-28 p-2 rounded-xl border text-center font-mono font-bold text-base bg-emerald-50/50 dark:bg-slate-900 border-emerald-300 dark:border-slate-600 text-emerald-900 dark:text-emerald-200"
              />
            </div>
          </div>

          {/* Eredmény kártya */}
          <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-emerald-200 dark:border-slate-700 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between border-b pb-2 border-slate-100 dark:border-slate-700">
              <span className="text-xs font-extrabold uppercase text-slate-400">
                Kiszámított eredmény (y):
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                {labMode === 'direct' ? 'Egyenes arányosság' : 'Fordított arányosság'}
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="font-mono text-3xl font-black text-emerald-600 dark:text-emerald-400">
                {calculatedResult.y}
              </span>
              <span className="text-sm font-bold text-slate-500">
                {currentPreset.unitY}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 font-mono text-xs text-slate-700 dark:text-slate-300 space-y-1">
              <p><strong>Képlet:</strong> {calculatedResult.formula}</p>
              <p className="text-emerald-700 dark:text-emerald-300 font-bold">{calculatedResult.constantText}</p>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              💡 {calculatedResult.description}
            </p>
          </div>
        </div>
      </div>

      {/* 5. SZEKCIÓ: TIPIKUS BUKTATÓK ÉS ÉRETTSÉGI CSAPDÁK */}
      <TheorySection
        number={5}
        title="Tipikus Arányossági Buktatók és Érettségi Csapdák"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badge="Csapdák"
        badgeColor="rose"
      >
        <div className="space-y-4">
          <TheoryTrapBox
            title="1. Buktató: „Együtt nőnek, tehát egyenesen arányosak” tévhit"
            trap="Egy taxi tarifája: 1000 Ft alapdíj + 400 Ft/km. Egyenesen arányos-e a fizetendő összeg a megtett kilométerrel?"
            wrong="Igen, mert ha többet utazunk, többet fizetünk (együtt nőnek)."
            wrongExplanation="Óriási tévedés! Bár mindkét mennyiség nő, a HÁNYADOSUK NEM ÁLLANDÓ! 1 km = 1400 Ft (hányados: 1400). 2 km = 1800 Ft (hányados: 900). A grafikon sem megy át az origón (0 km = 1000 Ft)! Ez lineáris kapcsolat, de NEM egyenes arányosság!"
            correct="NEM egyenes arányos, mert y / x nem állandó, és (0; 0) nincs a grafikonon!"
            correctExplanation="Egyenes arányosságnál a kétszeres távolságért PONTOSAN KÉTSZERES árat kellene fizetni (1400 Ft duplája 2800 Ft lenne, nem 1800 Ft)!"
            tip="Aranyszabály: Csak akkor egyenes arányos, ha az egyik duplázódásakor a másik is pontosan duplázódik, és 0-hoz 0 tartozik!"
          />

          <TheoryTrapBox
            title="2. Buktató: Hármasszabály mechanikus alkalmazása fordított arányosságnál"
            trap="3 munkás 8 óra alatt festi le a kerítést. Hány óra kell 6 munkásnak?"
            wrong="3 munkás -> 8 óra, tehát 6 munkás -> 16 óra (hiszen 6 = 2·3, így 2·8 = 16 óra)."
            wrongExplanation="Abszurd hiba! Kétszer annyi munkás nyilván GYORSABBAN (kevesebb idő alatt) végez, nem kétszer lassabban! 6 ember nem 16 óra alatt, hanem feleannyi, azaz 4 óra alatt végez!"
            correct="6 munkás 4 óra alatt végez (8 : 2 = 4 óra)."
            correctExplanation="Fordított arányosságnál ha a munkások száma duplázódik, az idő FELEZŐDIK!"
            tip="Tipp: Szöveges feladatnál mindig kérdezd meg: „Ha ebből több van, a másikból több vagy kevesebb kell?”"
          />

          <TheoryTrapBox
            title="3. Buktató: Keresztszorzat mechanikus alkalmazása fordított arányosságnál"
            trap="Alkalmazható-e a keresztszorzat (a · d = b · c) fordított arányosságnál?"
            wrong="Igen, a hármasszabály táblázatban mindig átlósan szorzunk össze."
            wrongExplanation="Hiba! A keresztszorzat (a/b = c/d ⟹ a·d = b·c) KIZÁRÓLAG egyenes arányosságnál érvényes! Fordított arányosságnál a SOROK SZORZATA állandó: x₁ · y₁ = x₂ · y₂ !"
            correct="Fordított arányosságnál a sorok szorzata egyenlő: x₁ · y₁ = x₂ · y₂"
            correctExplanation="Például: 3 munkás · 8 óra = 6 munkás · x óra ⟹ 24 = 6 · x ⟹ x = 4 óra!"
            tip="Jegyezd meg: Egyenes arányosság ⟹ Keresztszorzat egyenlő. Fordított arányosság ⟹ Sorok szorzata egyenlő!"
          />

          <TheoryTrapBox
            title="4. Buktató: Mértékegységek elnézése (sebesség és idő)"
            trap="Egy autó 90 km/h sebességgel 40 percig halad. Mekkora utat tesz meg?"
            wrong="s = v · t = 90 · 40 = 3600 km."
            wrongExplanation="Katasztrofális hiba! A sebesség km/ÓRA-ban van megadva, az idő pedig PERCBEN! Előbb a perceket órává kell alakítani: 40 perc = 40/60 óra = 2/3 óra!"
            correct="s = 90 km/h · (2/3 h) = 60 km."
            correctExplanation="Mielőtt az arányossági képleteket használnád, mindig hozd azonos mértékegységre az összetartozó mennyiségeket!"
            tip="Aranyszabály: 1 óra = 60 perc. x perc = (x/60) óra!"
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ProportionalityTheory;
