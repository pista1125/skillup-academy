import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  Circle,
  Layers,
  Calculator,
  Compass,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Maximize2,
  Ruler,
  HelpCircle,
  Eye,
  Sliders,
  Scale,
  Droplets,
  Flame,
  ArrowRight,
  Globe
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';
import { Button } from '@/components/ui/button';

interface SphereTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const SphereTheory: React.FC<SphereTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interaktív Számítási Labor Állapotok ---
  const [solidMode, setSolidMode] = useState<'sphere' | 'hemisphere'>('sphere');
  const [radiusR, setRadiusR] = useState<number>(6); // sugár [cm]

  // Számítások
  const diameterD = radiusR * 2;
  const greatCircleArea = Math.PI * radiusR * radiusR;
  const greatCircleCircumference = 2 * Math.PI * radiusR;

  // Teljes gömb
  const sphereA = 4 * Math.PI * radiusR * radiusR;
  const sphereV = (4 / 3) * Math.PI * Math.pow(radiusR, 3);

  // Félgömb
  const hemiA = 3 * Math.PI * radiusR * radiusR;
  const hemiCurvedA = 2 * Math.PI * radiusR * radiusR;
  const hemiV = (2 / 3) * Math.PI * Math.pow(radiusR, 3);

  // Önellenőrző mini kvíz állapotok
  const [quiz1Answer, setQuiz1Answer] = useState<number | null>(null);
  const [quiz2Answer, setQuiz2Answer] = useState<number | null>(null);
  const [quiz3Answer, setQuiz3Answer] = useState<number | null>(null);

  return (
    <TheoryTemplate
      title="A Gömb Felszíne és Térfogata"
      subtitle="A gömbfelület és a gömbtest geometriája, főkörök és síkmetszetek, az A = 4πr² és V = (4/3)πr³ képletek szemléletes levezetése és a félgömb tulajdonságai"
      badgeText="8. OSZTÁLY • VII. TESTEK • 📐 TANANYAG"
      themeColor="blue"
      documentId="sphere-theory-document"
      pdfFilename="8_osztaly_a_gomb_felszin_es_terfogat_tananyag.pdf"
      quickRule={{
        label: 'A Gömb Két Alapvető Számítási Képlete',
        align: 'left',
        formula: (
          <div className="flex flex-wrap items-baseline gap-x-8 gap-y-1 text-left font-bold">
            <span className="shrink-0"><MathText text="A = 4\pi r^2," /></span>
            <span className="shrink-0"><MathText text="V = \frac{4}{3}\pi r^3" /></span>
          </div>
        )
      }}
      practiceTitle="Készen állsz a gömb geometriai feladványaira?"
      practiceSubtitle="30 válogatott feladat 3 szinten, Arkhimédész összefüggésekkel, kártyás párosítóval és csoportosítóval!"
      practiceButtonText="Gyakorló Kvíz Indítása"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      onSwitchToQuiz={onStartQuiz}
    >
      {/* =========================================================================
          1. FEJEZET: A GÖMB ÉS GÖMBFELÜLET FOGALMA
          ========================================================================= */}
      <TheorySection
        number={1}
        title="A Gömb és a Gömbfelület Fogalma"
        badge="Alapfogalmak"
        badgeColor="blue"
        icon={<Circle className="w-5 h-5 text-blue-600" />}
      >
        <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            A gömb a tér legszimmetrikusabb teste. Hétköznapi életben gömb alakú a futball-labda, a buborék, a vízcsepp, a bolygók és a csillagok is. A geometriában precízen megkülönböztetjük a <strong>gömbfelületet</strong> (a héjat) és a <strong>gömbtestet</strong> (a tömör testet).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
            <TheoryCard title="Gömbfelület (A felületi burok)" icon={<Maximize2 className="w-4 h-4 text-blue-600" />}>
              <div className="space-y-2 text-xs">
                <p>
                  A tér azon pontjainak halmaza, amelyek egy rögzített <MathText text="O" /> ponttól (a gömb középpontjától) pontosan adott <MathText text="r" /> távolságra vannak:
                </p>
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-center font-mono font-bold text-blue-900 dark:text-blue-200">
                  <MathText text="\{P \in \text{Tér} \mid |OP| = r\}" />
                </div>
                <p className="text-slate-500 text-[11px]">
                  Ez felel meg egy lufi vékony gumi felületének vagy a pingponglabda műanyag héjának. Nincs vastagsága, csak felülete van.
                </p>
              </div>
            </TheoryCard>

            <TheoryCard title="Gömbtest (A tömör térbeli test)" icon={<Globe className="w-4 h-4 text-emerald-600" />}>
              <div className="space-y-2 text-xs">
                <p>
                  A tér azon pontjainak összessége, amelyek a középponttól legfeljebb <MathText text="r" /> távolságra vannak (a felület és a belső pontok együtt):
                </p>
                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center font-mono font-bold text-emerald-900 dark:text-emerald-200">
                  <MathText text="\{P \in \text{Tér} \mid |OP| \le r\}" />
                </div>
                <p className="text-slate-500 text-[11px]">
                  Ez felel meg egy tömör biliárdgolyónak, ágyúgolyónak vagy a Föld kőzetrétegeinek. Van térfogata és tömege.
                </p>
              </div>
            </TheoryCard>
          </div>

          <TheoryCallout title="A Gömb mint Forgástest" color="blue">
            <div className="space-y-2">
              <p>
                Ha egy <MathText text="r" /> sugarú <strong>félkört</strong> az átmérője mint tengely körül <strong>360°-ban megforgatunk</strong>, akkor a körvonal gömbfelületet, a félkörlap pedig gömbtestet súrol ki a térben.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-mono font-semibold pt-1">
                <span className="px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800">
                  Középpont: <MathText text="O" />
                </span>
                <span className="px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800">
                  Sugár: <MathText text="r" />
                </span>
                <span className="px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800">
                  Átmérő: <MathText text="d = 2r" />
                </span>
              </div>
            </div>
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* =========================================================================
          2. FEJEZET: SÍKMETSZETEK (FŐKÖR, KISKÖRÖK ÉS ÉRINTŐSÍK)
          ========================================================================= */}
      <TheorySection
        number={2}
        title="A Gömb Síkmetszetei: Főkör és Kiskörök"
        badge="Síkmetszetek"
        badgeColor="indigo"
        icon={<Compass className="w-5 h-5 text-indigo-600" />}
      >
        <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            A gömb alapvető tulajdonsága, hogy <strong>bármely metszősíkja kört eredményez</strong>. A metszetkör nagysága attól függ, milyen messze van a metszősík a gömb középpontjától (<MathText text="x" />).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <div className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-2">
              <div className="font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                1. Főkör (<MathText text="x = 0" />)
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                A sík pontosan átmegy a gömb középpontján. A metszetkör sugara maga a gömb sugara (<MathText text="R = r" />). Ez a legnagyobb lehetséges síkmetszet.
              </p>
              <div className="p-2 rounded bg-white dark:bg-slate-900 font-mono text-xs font-bold text-center text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800">
                <MathText text="T_{\text{főkör}} = r^2\pi, \quad K = 2\pi r" />
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-2">
              <div className="font-bold text-purple-900 dark:text-purple-200 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                2. Kiskör (<MathText text="0 < x < r" />)
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                A sík nem megy át a középponton. A metszetkör sugara (<MathText text="\rho" />) kisebb a gömbsugárnál. Pitagorasz-tétellel számítható:
              </p>
              <div className="p-2 rounded bg-white dark:bg-slate-900 font-mono text-xs font-bold text-center text-purple-700 dark:text-purple-300 border border-purple-100 dark:border-purple-800">
                <MathText text="\rho = \sqrt{r^2 - x^2}" />
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-500"></span>
                3. Érintősík (<MathText text="x = r" />)
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                A sík távolsága éppen megegyezik a gömbsugárral. A sík és a gömb pontosan egyetlen közös pontban érintkezik (érintési pont).
              </p>
              <div className="p-2 rounded bg-white dark:bg-slate-900 font-mono text-xs font-bold text-center text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                <MathText text="\rho = 0 \implies \text{1 pont}" />
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
            <div className="text-xs space-y-1">
              <strong>Pitagorasz-összefüggés a gömbi síkmetszetben:</strong>
              <p>
                Ha egy gömb sugara <MathText text="r = 10\text{ cm}" />, és egy sík a középponttól <MathText text="x = 6\text{ cm}" /> távolságra metszi el, akkor a metszetkör sugara a derékszögű háromszögből:
              </p>
              <p className="font-mono font-bold text-amber-900 dark:text-amber-200">
                <MathText text="\rho = \sqrt{10^2 - 6^2} = \sqrt{100 - 36} = \sqrt{64} = 8\text{ cm} \implies T_{\text{kiskör}} = 8^2\pi = 64\pi\text{ cm}^2" />.
              </p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          3. FEJEZET: A GÖMB FELSZÍNE
          ========================================================================= */}
      <TheorySection
        number={3}
        title="A Gömb Felszíne (A = 4πr²)"
        badge="Felszínképlet"
        badgeColor="blue"
        icon={<Layers className="w-5 h-5 text-blue-600" />}
      >
        <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Mivel a gömbfelület minden irányban görbült, a gömb felülete <strong>nem kiteríthető a síkba</strong> torzulás nélkül (ezért nem lehet tökéletes síktérképet készíteni a Földről). Ennek ellenére a felszíne pontosan és elegánsan kiszámítható!
          </p>

          <TheoryCallout title="A Gömb Felszínének Képlete" color="blue">
            A gömb felszíne pontosan négyszerese a gömb főkörének területének:
            <div className="my-2.5 text-lg sm:text-xl font-black text-center text-blue-900 dark:text-blue-200 font-mono">
              <MathText text="A = 4 \cdot r^2 \cdot \pi = 4\pi r^2" />
            </div>
            Ha az átmérővel (<MathText text="d = 2r \implies d^2 = 4r^2" />) fejezzük ki:
            <div className="my-1.5 text-base sm:text-lg font-black text-center text-indigo-900 dark:text-indigo-200 font-mono">
              <MathText text="A = d^2 \cdot \pi" />
            </div>
          </TheoryCallout>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
            <TheoryCard title="Szemléletes Jelentés: 4 Főkör Lapja" icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}>
              <div className="space-y-2 text-xs">
                <p>
                  Képzelj el egy narancsot! Ha kettévágod a narancsot, a vágási felület a főkör (<MathText text="r^2\pi" />).
                </p>
                <p>
                  Ha a narancs héját lehámozod és ellapítod a darabkákat, azok pontosan <strong>4 darab ilyen narancs-félmetszet körlapot</strong> fognak lefedni!
                </p>
                <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 font-bold text-emerald-900 dark:text-emerald-200 text-center">
                  <MathText text="A_{\text{héj}} = 4 \cdot T_{\text{főkör}} = 4 \cdot (r^2\pi)" />
                </div>
              </div>
            </TheoryCard>

            <TheoryCard title="Arkhimédész Hengerpalást-Tétele" icon={<Sparkles className="w-4 h-4 text-amber-600" />}>
              <div className="space-y-2 text-xs">
                <p>
                  Arkhimédész fedezte fel, hogy ha a gömb köré egy olyan hengert illesztünk, amelynek alapkörének sugara <MathText text="r" />, magassága pedig a gömb átmérője (<MathText text="m = 2r" />):
                </p>
                <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 font-mono text-[11px] text-amber-950 dark:text-amber-200 text-center font-bold">
                  <MathText text="T_{p,\text{henger}} = 2\pi r \cdot m = 2\pi r \cdot 2r = 4\pi r^2 = A_{\text{gömb}}" />
                </div>
                <p className="text-slate-500 text-[11px]">
                  A gömb felülete pontosan egyenlő a köré írt henger palástjának felületével!
                </p>
              </div>
            </TheoryCard>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2.5">
            <span className="text-xs font-black uppercase text-blue-600 tracking-wider">
              Gyakorlati Mintapélda: Felszínszámítás
            </span>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              Számítsuk ki egy <MathText text="r = 5\text{ cm}" /> sugarú gömb felszínét pontos értékkel (<MathText text="\pi" />-vel) és két tizedesjegyre kerekítve (<MathText text="\pi \approx 3{,}14" />)!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900">
                <strong>Pontos érték:</strong><br />
                <MathText text="A = 4 \cdot 5^2 \cdot \pi = 4 \cdot 25 \cdot \pi = 100\pi\text{ cm}^2" />
              </div>
              <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900">
                <strong>Közelítő érték:</strong><br />
                <MathText text="A \approx 100 \cdot 3{,}1416 = 314{,}16\text{ cm}^2" />
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          4. FEJEZET: A GÖMB TÉRFOGATA
          ========================================================================= */}
      <TheorySection
        number={4}
        title="A Gömb Térfogata (V = 4/3 · π · r³)"
        badge="Térfogatképlet"
        badgeColor="indigo"
        icon={<Calculator className="w-5 h-5 text-indigo-600" />}
      >
        <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            A gömb térfogata a térbeli űrtartalmat adja meg. A képletben a sugár a <strong>köbön</strong> szerepel (<MathText text="r^3" />), és megjelenik a híres <MathText text="\frac{4}{3}" />-os szorzótényező.
          </p>

          <TheoryCallout title="A Gömb Térfogatának Képlete" color="indigo">
            <div className="my-2 text-xl sm:text-2xl font-black text-center text-indigo-900 dark:text-indigo-200 font-mono">
              <MathText text="V = \frac{4}{3} \cdot \pi \cdot r^3 = \frac{4\pi r^3}{3}" />
            </div>
            Ha az átmérővel (<MathText text="d = 2r \implies r = d/2 \implies r^3 = d^3/8" />) fejezzük ki:
            <div className="my-1.5 text-base sm:text-lg font-black text-center text-indigo-900 dark:text-indigo-200 font-mono">
              <MathText text="V = \frac{4}{3}\pi \cdot \frac{d^3}{8} = \frac{\pi d^3}{6}" />
            </div>
          </TheoryCallout>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
            <TheoryCard title="Szemléltetés: Gúlákra Bontás" icon={<Lightbulb className="w-4 h-4 text-purple-600" />}>
              <div className="space-y-2 text-xs">
                <p>
                  Képzeljük el, hogy a gömböt végtelen sok apró, tűhegyes gúlára bontjuk!
                </p>
                <ul className="space-y-1 list-disc list-inside text-slate-600 dark:text-slate-300">
                  <li>Minden kis gúla alapja a gömbfelület egy apró darabkája (<MathText text="\Delta A" />).</li>
                  <li>Minden kis gúla csúcsa a gömb középpontja, magassága pedig éppen <MathText text="m = r" />.</li>
                  <li>Egy kis gúla térfogata: <MathText text="\Delta V = \frac{\Delta A \cdot r}{3}" />.</li>
                </ul>
                <div className="p-2 rounded bg-purple-50 dark:bg-purple-950/40 border border-purple-200 font-bold text-purple-900 dark:text-purple-200 text-center">
                  <MathText text="V_{\text{összes}} = \frac{A_{\text{összes}} \cdot r}{3} = \frac{(4\pi r^2) \cdot r}{3} = \frac{4}{3}\pi r^3" />
                </div>
              </div>
            </TheoryCard>

            <TheoryCard title="Arkhimédész Sírfelirata: Henger és Gömb" icon={<Scale className="w-4 h-4 text-blue-600" />}>
              <div className="space-y-2 text-xs">
                <p>
                  Hasonlítsuk össze a gömböt a köré írt hengerrel (<MathText text="R = r, M = 2r" />):
                </p>
                <div className="p-2 rounded bg-blue-50 dark:bg-blue-950/40 border border-blue-200 font-mono text-[11px] text-blue-900 dark:text-blue-200 space-y-1">
                  <div><MathText text="V_{\text{henger}} = r^2\pi \cdot 2r = 2\pi r^3 = \frac{6}{3}\pi r^3" /></div>
                  <div><MathText text="V_{\text{gömb}} = \frac{4}{3}\pi r^3" /></div>
                </div>
                <p className="text-emerald-700 dark:text-emerald-400 font-bold text-center">
                  <MathText text="V_{\text{gömb}} = \frac{2}{3} \cdot V_{\text{henger}}" />
                </p>
                <p className="text-slate-500 text-[11px]">
                  Arkhimédész annyira büszke volt erre a felfedezésre, hogy végakarata szerint ezt az ábrát vésték a sírkövére!
                </p>
              </div>
            </TheoryCard>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2.5">
            <span className="text-xs font-black uppercase text-indigo-600 tracking-wider">
              Gyakorlati Mintapélda: Térfogatszámítás
            </span>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              Mennyi a térfogata egy <MathText text="r = 3\text{ cm}" /> sugarú gömbnek?
            </p>
            <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 font-mono text-xs">
              <MathText text="V = \frac{4}{3}\pi \cdot 3^3 = \frac{4}{3}\pi \cdot 27 = 4 \cdot 9 \cdot \pi = 36\pi \approx 36 \cdot 3{,}1416 \approx 113{,}10\text{ cm}^3" />
            </div>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          5. FEJEZET: FÉLGÖMB ÉS SPECIÁLIS ALAKZATOK
          ========================================================================= */}
      <TheorySection
        number={5}
        title="A Félgömb Tulajdonságai és Számításai"
        badge="Félgömb"
        badgeColor="teal"
        icon={<Eye className="w-5 h-5 text-teal-600" />}
      >
        <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Ha egy gömböt a főkörének síkjával kettévágunk, két egybevágó <strong>félgömböt</strong> kapunk. A félgömb térfogata és felszíne gyakran szerepel vizsgákon és a hétköznapi életben (pl. kupolák, tálak, fagylaltgombócok).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
            <TheoryCard title="Félgömb Térfogata" icon={<Droplets className="w-4 h-4 text-teal-600" />}>
              <div className="space-y-2 text-xs">
                <p>
                  A félgömb térfogata pontosan fele az eredeti gömb térfogatának:
                </p>
                <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-center font-mono font-bold text-teal-900 dark:text-teal-200 text-base">
                  <MathText text="V_{\text{félgömb}} = \frac{1}{2} \cdot \left(\frac{4}{3}\pi r^3\right) = \frac{2}{3}\pi r^3" />
                </div>
                <p className="text-slate-500 text-[11px]">
                  Példa: ha <MathText text="r = 6\text{ cm}" />, akkor <MathText text="V = \frac{2}{3}\pi \cdot 216 = 144\pi \approx 452{,}39\text{ cm}^3" />.
                </p>
              </div>
            </TheoryCard>

            <TheoryCard title="Félgömb TELJES Felszíne" icon={<AlertTriangle className="w-4 h-4 text-rose-600" />}>
              <div className="space-y-2 text-xs">
                <p>
                  Egy tömör félgömb felülete <strong>két részből</strong> tevődik össze: a görbült gömbsüvegből ÉS a sík körlap alaplapból!
                </p>
                <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-center font-mono font-bold text-rose-900 dark:text-rose-200 text-sm">
                  <MathText text="A_{\text{fél}} = 2\pi r^2 \text{ (palást)} + \pi r^2 \text{ (alaplap)} = 3\pi r^2" />
                </div>
                <p className="text-rose-700 dark:text-rose-400 font-bold text-[11px]">
                  ⚠️ Veszélyes típushiba: Sokan csak felezik a gömbfelszínt (<MathText text="2\pi r^2" />), és elfelejtik hozzáadni a sík körlapot (<MathText text="+\pi r^2" />)!
                </p>
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          6. FEJEZET: INTERAKTÍV GÖMB SZÁMÍTÁSI LABORATÓRIUM
          ========================================================================= */}
      <TheorySection
        number={6}
        title="Interaktív Gömb Számítási Laboratórium (Valós idejű Kalkulátor)"
        badge="Kísérletezz!"
        badgeColor="blue"
        icon={<Sliders className="w-5 h-5 text-blue-600" />}
      >
        <TheoryCard
          title="Dinamikus Paraméterező és Modellkalkulátor"
          icon={<Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
          gradient
          className="border-2 border-blue-200/90 dark:border-blue-900/60"
        >
          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Állítsd be a gömb sugarát (<MathText text="r" />), válassz a teljes gömb és a tömör félgömb között, és figyeld meg a valós időben frissülő eredményeket, főkör-méreteket és az arányokat!
            </p>

            {/* Test típus választó gombok */}
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={() => setSolidMode('sphere')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  solidMode === 'sphere'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <Circle className="w-3.5 h-3.5" />
                Teljes Gömb
              </button>
              <button
                onClick={() => setSolidMode('hemisphere')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  solidMode === 'hemisphere'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                Tömör Félgömb (Alaplappal)
              </button>
            </div>

            {/* Csúszka: Sugár r */}
            <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-slate-900/60 border border-blue-100 dark:border-blue-950">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                <span>Gömb sugara (<MathText text="r" />):</span>
                <span className="font-mono font-black text-blue-600 dark:text-blue-400 text-sm">{radiusR} cm (Átmérő d = {diameterD} cm)</span>
              </div>
              <input
                type="range"
                min={1}
                max={15}
                step={0.5}
                value={radiusR}
                onChange={(e) => setRadiusR(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
                <span>1 cm</span>
                <span>Főkör sugara: {radiusR} cm</span>
                <span>15 cm</span>
              </div>
            </div>

            {/* Vizuális SVG rajz & Dinamikus Eredmények Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              {/* Dinamikus 3D hatású SVG gömb rajz */}
              <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-gradient-to-b from-white to-blue-50/30 dark:from-slate-900 dark:to-slate-850 border border-blue-100 dark:border-blue-900/40">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2">
                  {solidMode === 'sphere' ? 'Gömb 3D Perspektíva' : 'Félgömb Modell'}
                </span>

                {solidMode === 'sphere' ? (
                  <svg viewBox="0 0 200 160" className="w-52 h-40 select-none">
                    <defs>
                      <radialGradient id="sphereGrad" cx="35%" cy="35%" r="65%">
                        <stop offset="0%" stopColor="#93c5fd" />
                        <stop offset="50%" stopColor="#3b82f6" />
                        <stop offset="95%" stopColor="#1e3a8a" />
                      </radialGradient>
                    </defs>
                    {/* Gömb teste */}
                    <circle cx="100" cy="80" r="60" fill="url(#sphereGrad)" opacity="0.9" />
                    {/* Főkör vízszintes ellipszis */}
                    <ellipse cx="100" cy="80" rx="60" ry="18" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeDasharray="4 3" opacity="0.8" />
                    {/* Középpont O */}
                    <circle cx="100" cy="80" r="3" fill="#ffffff" />
                    <text x="100" y="74" className="text-[9px] font-black fill-white" textAnchor="middle">O</text>
                    {/* Sugár vonal */}
                    <line x1="100" y1="80" x2="160" y2="80" stroke="#facc15" strokeWidth="2.5" />
                    <circle cx="160" cy="80" r="2.5" fill="#facc15" />
                    <text x="130" y="74" className="text-[10px] font-black fill-amber-300" textAnchor="middle">r = {radiusR} cm</text>
                  </svg>
                ) : (
                  <svg viewBox="0 0 200 160" className="w-52 h-40 select-none">
                    <defs>
                      <radialGradient id="hemiGrad" cx="40%" cy="40%" r="60%">
                        <stop offset="0%" stopColor="#93c5fd" />
                        <stop offset="60%" stopColor="#2563eb" />
                        <stop offset="100%" stopColor="#1e3a8a" />
                      </radialGradient>
                    </defs>
                    {/* Felső félgömb süveg */}
                    <path d="M 40,90 A 60,60 0 0,1 160,90 Z" fill="url(#hemiGrad)" opacity="0.9" />
                    {/* Sík körlap alaplap ellipszise */}
                    <ellipse cx="100" cy="90" rx="60" ry="18" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="2" opacity="0.95" />
                    <circle cx="100" cy="90" r="3" fill="#1e3a8a" />
                    <line x1="100" y1="90" x2="160" y2="90" stroke="#dc2626" strokeWidth="2" />
                    <text x="130" y="85" className="text-[10px] font-black fill-red-600" textAnchor="middle">r = {radiusR} cm</text>
                    <text x="100" y="102" className="text-[8px] font-bold fill-blue-950" textAnchor="middle">Alaplap: πr²</text>
                  </svg>
                )}
              </div>

              {/* Számított adatok kártyái */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-slate-800/80 border border-blue-200/60 dark:border-slate-700">
                  <div className="text-[10px] uppercase font-bold text-blue-700 dark:text-blue-300">Főkör Területe (Tf)</div>
                  <div className="text-base font-black text-slate-800 dark:text-slate-100 font-mono mt-0.5">
                    {greatCircleArea.toFixed(1)} cm²
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    <MathText text={`\\approx ${(radiusR * radiusR).toFixed(1)}\\pi\\text{ cm}^2`} />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-indigo-50/70 dark:bg-slate-800/80 border border-indigo-200/60 dark:border-slate-700">
                  <div className="text-[10px] uppercase font-bold text-indigo-700 dark:text-indigo-300">Főkör Kerülete (K)</div>
                  <div className="text-base font-black text-slate-800 dark:text-slate-100 font-mono mt-0.5">
                    {greatCircleCircumference.toFixed(1)} cm
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    <MathText text={`\\approx ${(2 * radiusR).toFixed(1)}\\pi\\text{ cm}`} />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-purple-50/70 dark:bg-slate-800/80 border border-purple-200/60 dark:border-slate-700">
                  <div className="text-[10px] uppercase font-bold text-purple-700 dark:text-purple-300">
                    {solidMode === 'sphere' ? 'Teljes Felszín (A)' : 'Félgömb Felszín (A)'}
                  </div>
                  <div className="text-base font-black text-purple-700 dark:text-purple-300 font-mono mt-0.5">
                    {solidMode === 'sphere' ? sphereA.toFixed(1) : hemiA.toFixed(1)} cm²
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    {solidMode === 'sphere'
                      ? <MathText text={`4 \\cdot T_f = ${(4 * radiusR * radiusR).toFixed(0)}\\pi`} />
                      : <MathText text={`3 \\cdot T_f = ${(3 * radiusR * radiusR).toFixed(0)}\\pi`} />}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-slate-800/80 border border-emerald-200/60 dark:border-slate-700">
                  <div className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-300">
                    {solidMode === 'sphere' ? 'Térfogat (V)' : 'Félgömb Térfogat (V)'}
                  </div>
                  <div className="text-base font-black text-emerald-700 dark:text-emerald-300 font-mono mt-0.5">
                    {solidMode === 'sphere' ? sphereV.toFixed(1) : hemiV.toFixed(1)} cm³
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    {solidMode === 'sphere'
                      ? <MathText text={`\\approx ${((4 / 3) * Math.pow(radiusR, 3)).toFixed(1)}\\pi\\text{ cm}^3`} />
                      : <MathText text={`\\approx ${((2 / 3) * Math.pow(radiusR, 3)).toFixed(1)}\\pi\\text{ cm}^3`} />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* =========================================================================
          7. FEJEZET: GYAKORLATI FELADATOK & SŰRŰSÉG
          ========================================================================= */}
      <TheorySection
        number={7}
        title="Gyakorlati Alkalmazások: Sportlabdák, Sűrűség és Tömeg"
        badge="Életszerű Példák"
        badgeColor="blue"
        icon={<Globe className="w-5 h-5 text-blue-600" />}
      >
        <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            A gömbi számítások elengedhetetlenek a sportban, az élelmiszeriparban, a mérnöki tervezésben és a fizikában.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <TheoryCard title="1. Példa: A Futball-labda Bőrfelülete" icon={<Circle className="w-4 h-4 text-blue-600" />}>
              <div className="space-y-2 text-xs">
                <p>
                  Egy 5-ös méretű hivatalos focilabda átmérője kb. <MathText text="d = 22\text{ cm}" /> (<MathText text="r = 11\text{ cm}" />). Mennyi bőr szükséges a borításához?
                </p>
                <div className="p-2 rounded bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 font-mono">
                  <MathText text="A = 4\pi r^2 = 4 \cdot \pi \cdot 11^2 = 484\pi \approx 1520{,}5\text{ cm}^2 \approx 0{,}152\text{ m}^2" />
                </div>
                <p className="text-slate-500 text-[11px]">
                  Kb. 0,15 m² varrott bőrre van szükség (a ráhagyás nélkül).
                </p>
              </div>
            </TheoryCard>

            <TheoryCard title="2. Példa: Tömör Vasgolyó Tömege" icon={<Scale className="w-4 h-4 text-emerald-600" />}>
              <div className="space-y-2 text-xs">
                <p>
                  Mekkora a tömege egy <MathText text="r = 5\text{ cm}" /> sugarú vasgolyónak, ha a vas sűrűsége <MathText text="\rho = 7{,}87\text{ g/cm}^3" />?
                </p>
                <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 font-mono space-y-1">
                  <div><MathText text="V = \frac{4}{3}\pi \cdot 5^3 = \frac{500\pi}{3} \approx 523{,}6\text{ cm}^3" /></div>
                  <div><MathText text="m = \rho \cdot V = 7{,}87 \cdot 523{,}6 \approx 4120{,}7\text{ g} \approx 4{,}12\text{ kg}" /></div>
                </div>
                <p className="text-emerald-700 dark:text-emerald-300 font-bold text-[11px]">
                  A golyó tömege kb. 4,12 kg!
                </p>
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          8. FEJEZET: TIPIKUS CSAPDÁK ÉS TÍPUSHIBÁK
          ========================================================================= */}
      <TheorySection
        number={8}
        title="Tipikus Csapdák és Típushibák"
        badge="Figyelem!"
        badgeColor="rose"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600" />}
      >
        <div className="space-y-3">
          <TheoryTrapBox
            trapTitle="1. Csapda: A négyzet (r²) és a köb (r³) összekeverése"
            explanation="A felszín KÉT dimenziós méret (terület), ezért r² szerepel benne (A = 4πr²). A térfogat HÁROM dimenziós méret (térkitöltés), ezért r³ szerepel benne (V = 4/3 πr³). Soha ne cseréld fel a kitevőket!"
            correction="Jegyezd meg: mértékegység cm² ↔ r² (felszín), mértékegység cm³ ↔ r³ (térfogat)!"
          />

          <TheoryTrapBox
            trapTitle="2. Csapda: Átmérő (d) behelyettesítése sugár (r) helyett"
            explanation="Ha a feladat átmérőt ad meg (pl. d = 10 cm), és közvetlenül beírod r helyére a 4πr² képletbe, akkor az eredmény a helyes érték NÉGYSZERESE lesz, térfogatnál pedig a NYOLCSZOROSA!"
            correction="Mindig ellenőrizd első lépésben: r = d / 2 (10 cm átmérő esetén r = 5 cm)!"
          />

          <TheoryTrapBox
            trapTitle="3. Csapda: Félgömb felszínénél az alaplap elfelejtése"
            explanation="Ha egy tömör félgömb felszínét kérdezik, a diákok gyakran csak a gömbfelszínt felezik meg (2πr²). Ekkor elfelejtik, hogy a vágás mentén keletkezett egy sík körlap is (πr²)!"
            correction="Tömör félgömb teljes felszíne mindig: A = 2πr² (süveg) + πr² (alaplap) = 3πr²!"
          />

          <TheoryTrapBox
            trapTitle="4. Csapda: A méretek skálázódása (Hasonlóság aránya)"
            explanation="Ha egy gömb sugarát a KÉTSZERESÉRE növeljük, a felszíne nem 2-szeresére nő, hanem 2² = 4-szeresére! A térfogata pedig 2³ = 8-szorosára ugrik!"
            correction="A felszín aránya k², a térfogat aránya k³! Például kétszeres sugár = nyolcszoros térfogat és tömeg!"
          />
        </div>
      </TheorySection>

      {/* =========================================================================
          9. FEJEZET: ÖNELLENŐRZŐ GYORS KVÍZ
          ========================================================================= */}
      <TheorySection
        number={9}
        title="Önellenőrző Gyors Kvíz"
        badge="Teszteld magad!"
        badgeColor="blue"
        icon={<HelpCircle className="w-5 h-5 text-blue-600" />}
      >
        <div className="space-y-4">
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Válaszolj a 3 gyors kérdésre, hogy azonnal lásd, mennyire sajátítottad el a gömb elméleti alapjait!
          </p>

          {/* 1. Kvízkérdés */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100">
              1. Egy gömb főkörének területe <MathText text="15\text{ cm}^2" />. Mennyi a gömb teljes felszíne?
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                { id: 0, text: '60 cm² (mivel A = 4 · Tf)', correct: true },
                { id: 1, text: '30 cm² (mivel A = 2 · Tf)', correct: false },
                { id: 2, text: '45 cm² (mivel A = 3 · Tf)', correct: false },
                { id: 3, text: '15 cm² (megegyezik a főkörrel)', correct: false }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setQuiz1Answer(opt.id)}
                  className={`p-2.5 rounded-xl text-left border font-medium transition-all cursor-pointer ${
                    quiz1Answer === opt.id
                      ? opt.correct
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200'
                        : 'bg-rose-50 border-rose-400 text-rose-900 dark:bg-rose-950/60 dark:text-rose-200'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:bg-slate-100 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>
            {quiz1Answer !== null && (
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 text-xs text-slate-600 dark:text-slate-300 border">
                <strong>Magyarázat:</strong> A gömb felszíne pontosan négyszerese a főkörének: <MathText text="A = 4 \cdot T_f = 4 \cdot 15 = 60\text{ cm}^2" />.
              </div>
            )}
          </div>

          {/* 2. Kvízkérdés */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100">
              2. Egy tömör félgömb sugara <MathText text="r" />. Mekkora a TELJES felszíne az alaplapjával együtt?
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                { id: 0, text: '3πr² (2πr² gömbsüveg + πr² alapkörlap)', correct: true },
                { id: 1, text: '2πr² (a teljes gömbfelszín fele)', correct: false },
                { id: 2, text: '4πr² (nem változik a felszín)', correct: false },
                { id: 3, text: 'πr² (csak a körlap)', correct: false }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setQuiz2Answer(opt.id)}
                  className={`p-2.5 rounded-xl text-left border font-medium transition-all cursor-pointer ${
                    quiz2Answer === opt.id
                      ? opt.correct
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200'
                        : 'bg-rose-50 border-rose-400 text-rose-900 dark:bg-rose-950/60 dark:text-rose-200'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:bg-slate-100 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>
            {quiz2Answer !== null && (
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 text-xs text-slate-600 dark:text-slate-300 border">
                <strong>Magyarázat:</strong> A félgömb felülete a gömbsüvegből (<MathText text="2\pi r^2" />) és a sík körlapból (<MathText text="\pi r^2" />) áll, így összege <MathText text="3\pi r^2" />.
              </div>
            )}
          </div>

          {/* 3. Kvízkérdés */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100">
              3. Hogyan változik egy gömb térfogata, ha a sugarát a KÉTSZERESÉRE növeljük?
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                { id: 0, text: '8-szorosára (2³ = 8)', correct: true },
                { id: 1, text: '4-szeresére (2² = 4)', correct: false },
                { id: 2, text: '2-szeresére (arányos a sugárral)', correct: false },
                { id: 3, text: '6-szorosára (2 · 3 = 6)', correct: false }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setQuiz3Answer(opt.id)}
                  className={`p-2.5 rounded-xl text-left border font-medium transition-all cursor-pointer ${
                    quiz3Answer === opt.id
                      ? opt.correct
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200'
                        : 'bg-rose-50 border-rose-400 text-rose-900 dark:bg-rose-950/60 dark:text-rose-200'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:bg-slate-100 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>
            {quiz3Answer !== null && (
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 text-xs text-slate-600 dark:text-slate-300 border">
                <strong>Magyarázat:</strong> Mivel a térfogatképletben a sugár köbön szerepel (<MathText text="r^3" />), a sugarat megduplázva a térfogat <MathText text="2^3 = 8" />-szorosára nő.
              </div>
            )}
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default SphereTheory;
