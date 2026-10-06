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
  Globe,
  Compass,
  Ruler,
  Calculator,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Maximize2,
  HelpCircle,
  Clock,
  Navigation,
  Sun,
  Layers,
  Plane,
  Droplets,
  Scale
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';
import { Button } from '@/components/ui/button';

interface EarthTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const EarthTheory: React.FC<EarthTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interaktív Földrajzi-Geometriai Számítási Labor ---
  const [latitude, setLatitude] = useState<number>(47); // Magyarország szélessége: kb. 47° É
  const earthRadius = 6370; // km

  // Számítások az adott szélességi körre
  const latRad = (latitude * Math.PI) / 180;
  const parallelRadius = Math.round(earthRadius * Math.cos(latRad));
  const parallelCircumference = Math.round(2 * Math.PI * parallelRadius);
  const rotationalSpeed = Math.round(parallelCircumference / 24); // km/h forgási sebesség
  const distancePerDegreeLat = (40000 / 360).toFixed(1); // 111.1 km

  // Önellenőrző mini kvíz állapotok
  const [quiz1Answer, setQuiz1Answer] = useState<number | null>(null);
  const [quiz2Answer, setQuiz2Answer] = useState<number | null>(null);
  const [quiz3Answer, setQuiz3Answer] = useState<number | null>(null);

  return (
    <TheoryTemplate
      title="A Föld Geometriája"
      subtitle="A Föld mint gömb matematikai modellje, az R ≈ 6370 km sugár, az Egyenlítő és a fokhálózat geometriája, a gömbi főkörök (ortodróma), felszín- és térfogatszámítás, valamint Eratoszthenész ókori mérése"
      badgeText="8. OSZTÁLY • VII. TESTEK • 🌍 TANANYAG"
      themeColor="teal"
      documentId="earth-theory-document"
      pdfFilename="8_osztaly_a_fold_geometriaja_tananyag.pdf"
      quickRule={{
        label: 'A Föld Gömbmodelljének Alapadatai és Fő Képletei',
        align: 'left',
        formula: (
          <div className="flex flex-wrap items-baseline gap-x-8 gap-y-1 text-left font-bold">
            <span className="shrink-0"><MathText text="R \approx 6370\text{ km}," /></span>
            <span className="shrink-0"><MathText text="K_{\text{Egyenlítő}} = 2\pi R \approx 40\,000\text{ km}," /></span>
            <span className="shrink-0"><MathText text="A = 4\pi R^2 \approx 510\text{ millió km}^2" /></span>
          </div>
        )
      }}
      practiceTitle="Készen állsz a Föld geometriai feladványaira?"
      practiceSubtitle="30 válogatott feladat 3 szinten, fokhálózattal, Eratoszthenész aránypárjával, kártyás párosítóval és csoportosítóval!"
      practiceButtonText="Gyakorló Kvíz Indítása"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      onSwitchToQuiz={onStartQuiz}
    >
      {/* =========================================================================
          1. FEJEZET: A FÖLD MINT GÖMB
          ========================================================================= */}
      <TheorySection
        number={1}
        title="A Föld Mint Gömb (A Matematikai Modell)"
        badge="Alapadatok"
        badgeColor="teal"
        icon={<Globe className="w-5 h-5 text-teal-600" />}
      >
        <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Bár a Föld valódi alakja a forgásból eredő centrifugális erő és az egyenetlen tömegeloszlás miatt <strong>geoid</strong> (közelítőleg forgási ellipszoid), a sarkoknál való lapultsága mindössze <MathText text="\frac{1}{298}" /> (kb. 0,3%). Emiatt a mindennapi és az iskolai geometriai számításokban kiváló pontossággal <strong>gömbként modellezzük</strong>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            <TheoryCard title="Átlagos Sugár (R)" icon={<Ruler className="w-4 h-4 text-teal-600" />}>
              <div className="space-y-1.5 text-xs">
                <div className="text-xl font-black text-teal-700 dark:text-teal-300 font-mono text-center py-1">
                  <MathText text="R \approx 6370\text{ km}" />
                </div>
                <p className="text-slate-500 text-[11px] leading-tight">
                  Egyenlítői sugár: <MathText text="6378\text{ km}" />, sarki sugár: <MathText text="6357\text{ km}" />. Az átlagos sugár <MathText text="6370\text{ km}" />.
                </p>
              </div>
            </TheoryCard>

            <TheoryCard title="Földátmérő (d)" icon={<Maximize2 className="w-4 h-4 text-blue-600" />}>
              <div className="space-y-1.5 text-xs">
                <div className="text-xl font-black text-blue-700 dark:text-blue-300 font-mono text-center py-1">
                  <MathText text="d = 2R \approx 12\,740\text{ km}" />
                </div>
                <p className="text-slate-500 text-[11px] leading-tight">
                  A gömb középpontján áthaladó, két szemközti felszíni pontot összekötő leghosszabb szakasz.
                </p>
              </div>
            </TheoryCard>

            <TheoryCard title="Egyenlítő Hossza (K)" icon={<Compass className="w-4 h-4 text-emerald-600" />}>
              <div className="space-y-1.5 text-xs">
                <div className="text-xl font-black text-emerald-700 dark:text-emerald-300 font-mono text-center py-1">
                  <MathText text="K \approx 40\,000\text{ km}" />
                </div>
                <p className="text-slate-500 text-[11px] leading-tight">
                  <MathText text="K = 2\pi R = 2 \cdot 6370 \cdot 3,1416 \approx 40\,024\text{ km}" />. Kerekítve <MathText text="40\,000\text{ km}" />-rel számolunk.
                </p>
              </div>
            </TheoryCard>
          </div>

          <TheoryCallout
            title="A Föld forgása és tengelye"
            icon={<Navigation className="w-5 h-5 text-teal-600" />}
            color="teal"
          >
            <p>
              A Föld a saját képzeletbeli tengelye körül forog nyugatról kelet felé, egy teljes fordulatot 24 óra (egy nap) alatt megtéve. A forgástengely a felszínt az <strong>Északi-sarkon</strong> és a <strong>Déli-sarkon</strong> döfi át. A forgástengely a keringési sík merőlegeséhez képest kb. <MathText text="23,5^\circ" />-os szöget zár be (tengelyferdeség), ami az évszakok váltakozásának oka.
            </p>
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* =========================================================================
          2. FEJEZET: A FÖLDRAJZI FOKHÁLÓZAT GEOMETRIÁJA
          ========================================================================= */}
      <TheorySection
        number={2}
        title="A Földrajzi Fokhálózat Geometriája"
        badge="Szélesség & Hosszúság"
        badgeColor="teal"
        icon={<Compass className="w-5 h-5 text-teal-600" />}
      >
        <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            A földgömbön való tájékozódáshoz és helymeghatározáshoz (GPS koordinátákhoz) a matematikai gömbi koordináta-rendszert használjuk: a <strong>szélességi</strong> és <strong>hosszúsági körök</strong> hálózatát.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Szélességi körök */}
            <TheoryCard
              title="Szélességi Körök (Paralell körök)"
              icon={<Layers className="w-4 h-4 text-teal-600" />}
              badge="0° - 90°"
              badgeColor="teal"
            >
              <div className="space-y-2 text-xs">
                <p>
                  Az Egyenlítő síkjával párhuzamos síkmetszetek. Nem főkörök (kivéve magát az Egyenlítőt), hanem kisebb körök:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                  <li><strong>Egyenlítő (<MathText text="0^\circ" />):</strong> Az egyetlen főkör a szélességi körök között, sugara <MathText text="R \approx 6370\text{ km}" />.</li>
                  <li><strong>Északi szélesség (Ész.):</strong> <MathText text="0^\circ \dots 90^\circ\text{ É}" /> (az Északi-sark egy pont, sugara 0).</li>
                  <li><strong>Déli szélesség (Dsz.):</strong> <MathText text="0^\circ \dots 90^\circ\text{ D}" /> (Déli-sark).</li>
                  <li>
                    A <MathText text="\phi" /> szélességi kör sugara:
                    <div className="p-1.5 my-1 rounded bg-teal-50 dark:bg-teal-950/40 border border-teal-200 text-center font-mono font-bold text-teal-900 dark:text-teal-200">
                      <MathText text="r_\phi = R \cdot \cos(\phi)" />
                    </div>
                  </li>
                </ul>
              </div>
            </TheoryCard>

            {/* Hosszúsági körök */}
            <TheoryCard
              title="Hosszúsági Körök (Meridiánok / Délkörök)"
              icon={<Navigation className="w-4 h-4 text-blue-600" />}
              badge="0° - 180°"
              badgeColor="blue"
            >
              <div className="space-y-2 text-xs">
                <p>
                  A két sarkot összekötő, a forgástengelyen áthaladó síkok által kimetszett <strong>fél-főkörök</strong>:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                  <li><strong>Minden délkör egybevágó:</strong> Hosszuk pontosan megegyezik a fél-főkör kerületével: <MathText text="\pi R \approx 20\,000\text{ km}" />.</li>
                  <li><strong>Kezdőmeridián (<MathText text="0^\circ" />):</strong> A London melletti Greenwich-i Királyi Obszervatóriumon áthaladó délkör.</li>
                  <li><strong>Keleti hosszúság (Kh.):</strong> <MathText text="0^\circ \dots 180^\circ\text{ K}" />.</li>
                  <li><strong>Nyugati hosszúság (Nyh.):</strong> <MathText text="0^\circ \dots 180^\circ\text{ NY}" />.</li>
                  <li>A <MathText text="180^\circ" />-os hosszúsági körnél található a nemzetközi dátumválasztó vonal.</li>
                </ul>
              </div>
            </TheoryCard>
          </div>

          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-slate-800 dark:to-slate-850 border border-teal-200 dark:border-teal-800">
            <h4 className="font-bold text-xs sm:text-sm text-teal-900 dark:text-teal-200 mb-1.5 flex items-center gap-2">
              <Ruler className="w-4 h-4 text-teal-600" />
              Fontos távolságarány: 1 fok szélességkülönbség a délkör mentén
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              Mivel a teljes főkör kerülete <MathText text="40\,000\text{ km}" />, és a teljes kör <MathText text="360^\circ" />, így a délkör mentén <strong>1 fok szélességkülönbség távolsága</strong>:
            </p>
            <div className="text-center my-2 p-2 rounded-xl bg-white dark:bg-slate-900 border border-teal-300 font-mono font-black text-sm text-teal-800 dark:text-teal-200">
              <MathText text="1^\circ \text{ szélesség} = \frac{40\,000\text{ km}}{360^\circ} \approx 111,1\text{ km}" />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Ez azt jelenti, hogy ha a délkör mentén pontosan <MathText text="1^\circ" />-ot mozdulunk el északra vagy délre, mindig kb. <strong>111 kilométert</strong> teszünk meg!
            </p>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          3. FEJEZET: GÖMBI TÁVOLSÁG ÉS ORTODRÓMA (REPÜLÉSI UTAK)
          ========================================================================= */}
      <TheorySection
        number={3}
        title="Távolságok a Föld Felszínén és az Ortodróma"
        badge="Légi folyosók"
        badgeColor="teal"
        icon={<Plane className="w-5 h-5 text-teal-600" />}
      >
        <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Sík térképen (pl. a Mercator-vetületen) a két város közötti legrövidebb útnak a vonalzóval húzott egyenes szakasz látszik. A valóságban azonban a Föld gömbfelület, és a gömbön a két pont közötti legrövidebb út <strong>nem a szélességi kör</strong>, hanem a pontokon átmenő <strong>főkör íve</strong>!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <TheoryCard title="Ortodróma (A legrövidebb gömbi út)" icon={<Plane className="w-4 h-4 text-emerald-600" />}>
              <div className="space-y-2 text-xs">
                <p>
                  A két felszíni pontot és a Föld középpontját (<MathText text="O" />) összekötő sík által kimetszett <strong>főkör rövidebb íve</strong>.
                </p>
                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-slate-700 dark:text-slate-300">
                  <strong>Példa:</strong> London (<MathText text="51,5^\circ\text{ É}" />) és Tokió (<MathText text="35,7^\circ\text{ É}" />) között a repülőgépek nem egyenesen keletre mennek, hanem az északi sarkvidék és Szibéria felett repülnek, mert a főkör ívén több mint <strong>1500 km-t takarítanak meg</strong>!
                </div>
              </div>
            </TheoryCard>

            <TheoryCard title="Loxodróma (Állandó irányszögű út)" icon={<Compass className="w-4 h-4 text-amber-600" />}>
              <div className="space-y-2 text-xs">
                <p>
                  Olyan útvonal a Föld felszínén, amely a délköröket állandó szögben metszi.
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  A régi vitorláshajók azért szerették, mert nem kellett állandóan állítani az iránytűt, egyszerű volt navigálni. Viszont hosszabb utat jelent, mint a főkör menti ortodróma.
                </p>
              </div>
            </TheoryCard>
          </div>

          <TheoryTrapBox title="Gyakori tévhit: Az 1 fok hosszúság nem mindenhol 111 km!">
            <p>
              Míg a szélességi fokok mentén (észak-déli irányban) <MathText text="1^\circ" /> mindig kb. <MathText text="111\text{ km}" />, addig kelet-nyugati irányban a szélességi körök kerülete a sarkok felé csökken!
            </p>
            <p className="mt-1">
              Az Egyenlítőnél (<MathText text="0^\circ" />) <MathText text="1^\circ \approx 111\text{ km}" />, de a <MathText text="60^\circ" />-os szélességi körön már csak <MathText text="111 \cdot \cos(60^\circ) = 55,5\text{ km}" />, a sarkon pedig pontosan <MathText text="0\text{ km}" />!
            </p>
          </TheoryTrapBox>
        </div>
      </TheorySection>

      {/* =========================================================================
          4. FEJEZET: FELSZÍN ÉS TÉRFOGAT
          ========================================================================= */}
      <TheorySection
        number={4}
        title="A Föld Felszíne, Térfogata és a Szárazföld-Víz Arány"
        badge="Felszín & Térfogat"
        badgeColor="teal"
        icon={<Calculator className="w-5 h-5 text-teal-600" />}
      >
        <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Alkalmazva a gömb felszínének és térfogatának képleteit az <MathText text="R \approx 6370\text{ km}" /> sugárral:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TheoryCard
              title="A Föld Felszíne (A)"
              icon={<Maximize2 className="w-4 h-4 text-teal-600" />}
              variant="formula"
              formula="A = 4\pi R^2 \approx 510\text{ millió km}^2"
            >
              <div className="space-y-2 text-xs">
                <p>
                  <MathText text="A = 4 \cdot \pi \cdot 6370^2 = 4 \cdot 3,1416 \cdot 40\,576\,900 \approx 509\,904\,363\text{ km}^2" />.
                </p>
                <div className="p-2.5 rounded-xl bg-blue-50/70 dark:bg-slate-800 border border-blue-200 dark:border-slate-700 space-y-1">
                  <div className="flex justify-between font-bold text-blue-900 dark:text-blue-300">
                    <span>Világtenger (Óceánok és tengerek):</span>
                    <span>kb. 71% (~361 M km²)</span>
                  </div>
                  <div className="flex justify-between font-bold text-amber-900 dark:text-amber-300">
                    <span>Szárazföld (Kontinensek és szigetek):</span>
                    <span>kb. 29% (~149 M km²)</span>
                  </div>
                </div>
              </div>
            </TheoryCard>

            <TheoryCard
              title="A Föld Térfogata (V)"
              icon={<Layers className="w-4 h-4 text-purple-600" />}
              variant="formula"
              formula="V = \frac{4}{3}\pi R^3 \approx 1083\text{ milliárd km}^3"
            >
              <div className="space-y-2 text-xs">
                <p>
                  <MathText text="V = \frac{4}{3} \cdot \pi \cdot 6370^3 \approx 1\,083 \times 10^{12}\text{ km}^3" /> (több mint 1 billió köbkilométer).
                </p>
                <p className="text-slate-500">
                  A Föld átlagos sűrűsége <MathText text="\rho \approx 5,52\text{ g/cm}^3 = 5520\text{ kg/m}^3" />, így tömege:
                  <br />
                  <span className="font-mono font-bold text-purple-700 dark:text-purple-300"><MathText text="M = \rho \cdot V \approx 5,97 \times 10^{24}\text{ kg}" /></span> (közel 6 trillió tonna).
                </p>
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          5. FEJEZET: ERATOSZTHENÉSZ ÓKORI KÍSÉRLETE ÉS IDŐZÓNÁK
          ========================================================================= */}
      <TheorySection
        number={5}
        title="Történelmi Távlat: Eratoszthenész Földmérése és az Időzónák"
        badge="Történelem & Idő"
        badgeColor="teal"
        icon={<Sun className="w-5 h-5 text-amber-500" />}
      >
        <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 via-yellow-50/60 to-amber-50 dark:from-slate-800 dark:to-slate-850 border border-amber-200 dark:border-amber-800/60">
            <h4 className="font-bold text-sm text-amber-950 dark:text-amber-200 mb-2 flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-600" />
              Eratoszthenész zseniális mérése (Kr. e. kb. 240)
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Eratoszthenész alexandriai tudós felfigyelt arra, hogy a nyári napforduló napján (június 21.) délben <strong>Szüéné</strong> (ma Asszuán) városában a Nap sugarai függőlegesen estek le, és a legmélyebb kút fenekét is megvilágították (<MathText text="0^\circ" />-os eltérés a függőlegestől).
            </p>
            <p className="text-xs text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
              Ugyanekkor északabbra, <strong>Alexandriában</strong> a déli napsugarak már árnyékot vetettek: egy függőleges pálca árnyékából kiszámolta, hogy a beesési szög <MathText text="7,2^\circ" />-kal tért el a függőlegestől.
            </p>

            <div className="my-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-750 text-center font-mono text-xs">
              <div className="text-amber-800 dark:text-amber-300 font-bold mb-1">Az aránypár:</div>
              <MathText text="\frac{7,2^\circ}{360^\circ} = \frac{1}{50} \implies \text{A Föld kerülete} = 50 \times \text{Távolság}(\text{Alexandria}, \text{Szüéné})" />
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300">
              A két város távolsága a tevék menetidejéből kb. 5000 stádium volt. Ezt 50-nel megszorozva <MathText text="250\,000\text{ stádium}" /> adódott, ami mai mértékegységekkel kb. <strong>40 000 km</strong>! Több mint 2200 évvel ezelőtt, pusztán egy bottal és a geometriai arányossággal megmérte a bolygónk méretét!
            </p>
          </div>

          {/* Időzónák */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-600" />
              Az Időzónák Matematikája
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Mivel a Föld <MathText text="360^\circ" />-ot fordul el 24 óra alatt:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-2">
              <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border text-center font-mono font-bold text-teal-700 dark:text-teal-300 text-xs">
                <MathText text="1\text{ óra} = \frac{360^\circ}{24} = 15^\circ \text{ hosszúság}" />
              </div>
              <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border text-center font-mono font-bold text-blue-700 dark:text-blue-300 text-xs">
                <MathText text="1^\circ \text{ hosszúság} = \frac{60\text{ perc}}{15} = 4\text{ perc}" />
              </div>
            </div>
            <p className="text-[11px] text-slate-500">
              A Föld felszínét 24 standard, egyenként <MathText text="15^\circ" /> széles időzónára osztották fel. Ha kelet felé utazunk, óránk előre jár, ha nyugat felé, hátra.
            </p>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          INTERAKTÍV FÖLDLABOR: SZÉLESSÉGI KÖRÖK ÉS FORGÁSI SEBESSÉG
          ========================================================================= */}
      <TheorySection
        number={6}
        title="Interaktív Földlabor: Szélességi Körök és Forgási Sebesség"
        badge="Szimuláció"
        badgeColor="teal"
        icon={<Sparkles className="w-5 h-5 text-teal-600" />}
      >
        <div className="space-y-4">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Mozgasd a csúszkát és figyeld meg, hogyan változik egy adott szélességi kör sugara, kerülete és a Föld forgásából származó kerületi sebessége az Egyenlítőtől (<MathText text="0^\circ" />) az Északi-sarkig (<MathText text="90^\circ" />)!
          </p>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border-2 border-teal-200 dark:border-teal-800/80 shadow-sm space-y-5">
            {/* Csúszka */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-teal-600" />
                  Választott szélességi fok (φ):
                </span>
                <span className="text-sm font-mono font-black text-teal-600 bg-teal-50 dark:bg-teal-950 px-2.5 py-1 rounded-lg border border-teal-200">
                  {latitude}° Északi szélesség
                  {latitude === 0 ? ' (Egyenlítő)' : latitude === 47 ? ' (Magyarország)' : latitude === 90 ? ' (Északi-sark)' : ''}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="90"
                step="1"
                value={latitude}
                onChange={(e) => setLatitude(Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-750 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold px-1">
                <span>0° (Egyenlítő)</span>
                <span>47° (Budapest)</span>
                <span>60° (Oslo)</span>
                <span>90° (Északi-sark)</span>
              </div>
            </div>

            {/* Számított eredmények kártyákban */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900 text-center">
                <div className="text-[10px] uppercase tracking-wider font-bold text-teal-800 dark:text-teal-300">
                  Szélességi kör sugara (r)
                </div>
                <div className="text-lg font-black font-mono text-teal-900 dark:text-teal-100 mt-1">
                  {parallelRadius.toLocaleString()} km
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  <MathText text={`6370 \\cdot \\cos(${latitude}^\\circ)`} />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-center">
                <div className="text-[10px] uppercase tracking-wider font-bold text-blue-800 dark:text-blue-300">
                  Szélességi kör kerülete (K)
                </div>
                <div className="text-lg font-black font-mono text-blue-900 dark:text-blue-100 mt-1">
                  {parallelCircumference.toLocaleString()} km
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  <MathText text={`2\\pi r`} />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900 text-center">
                <div className="text-[10px] uppercase tracking-wider font-bold text-purple-800 dark:text-purple-300">
                  Forgási sebesség (v)
                </div>
                <div className="text-lg font-black font-mono text-purple-900 dark:text-purple-100 mt-1">
                  {rotationalSpeed.toLocaleString()} km/h
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  <MathText text={`K / 24\\text{ h}`} />
                </div>
              </div>
            </div>

            {/* Vizuális Földgömb SVG ábra a szélességi körrel */}
            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
              <svg viewBox="0 0 240 240" className="w-56 h-56">
                <defs>
                  <radialGradient id="globeGrad" cx="40%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#5eead4" />
                    <stop offset="60%" stopColor="#0d9488" />
                    <stop offset="100%" stopColor="#115e59" />
                  </radialGradient>
                  <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0.8" />
                  </linearGradient>
                </defs>

                {/* Földgömb körvonal */}
                <circle cx="120" cy="120" r="90" fill="url(#globeGrad)" stroke="#0f766e" strokeWidth="2.5" />

                {/* Forgástengely */}
                <line x1="120" y1="16" x2="120" y2="224" stroke="#f8fafc" strokeWidth="2" strokeDasharray="4 3" opacity="0.75" />
                <circle cx="120" cy="30" r="3.5" fill="#f8fafc" />
                <text x="120" y="14" textAnchor="middle" className="text-[8px] font-black fill-slate-700 dark:fill-slate-300">Északi-sark (90°)</text>
                <circle cx="120" cy="210" r="3.5" fill="#f8fafc" />
                <text x="120" y="234" textAnchor="middle" className="text-[8px] font-black fill-slate-700 dark:fill-slate-300">Déli-sark (-90°)</text>

                {/* Egyenlítő (0°) elöl és hátul ellipszissel */}
                <ellipse cx="120" cy="120" rx="90" ry="24" fill="none" stroke="#f8fafc" strokeWidth="2" strokeDasharray="5 3" opacity="0.6" />
                <text x="215" y="123" textAnchor="start" className="text-[7.5px] font-bold fill-slate-700 dark:fill-slate-300">Egyenlítő (0°)</text>

                {/* Dinamikusan számolt Szélességi kör */}
                {(() => {
                  const yOffset = 90 * Math.sin(latRad);
                  const currentY = 120 - yOffset;
                  const currentRx = 90 * Math.cos(latRad);
                  const currentRy = 24 * Math.cos(latRad);

                  return (
                    <>
                      {/* Vízszintes síkmetszet vonala a középpontból */}
                      <line x1="120" y1="120" x2={120 + currentRx} y2={currentY} stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="2 2" />
                      {/* Sugár szakasz */}
                      <line x1="120" y1={currentY} x2={120 + currentRx} y2={currentY} stroke="#f59e0b" strokeWidth="2" />

                      {/* Szélességi kör ellipszise */}
                      <ellipse
                        cx="120"
                        cy={currentY}
                        rx={Math.max(currentRx, 1)}
                        ry={Math.max(currentRy, 1)}
                        fill="#fef3c7"
                        fillOpacity="0.25"
                        stroke="url(#orbitGrad)"
                        strokeWidth="2.5"
                      />

                      {/* Jelölő pont a peremen */}
                      <circle cx={120 + currentRx} cy={currentY} r="4" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
                    </>
                  );
                })()}

                {/* Magyarország jelölés ha a slider közel van 47°-hoz */}
                {Math.abs(latitude - 47) <= 2 && (
                  <text x="120" y="70" textAnchor="middle" className="text-[8px] font-black fill-amber-300">
                    ★ Magyarország (~47° É)
                  </text>
                )}
              </svg>
              <span className="text-[11px] font-bold text-slate-500 mt-1">
                A narancssárga ellipszis a választott szélességi kör síkmetszete.
              </span>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          7. FEJEZET: ÖNELLENŐRZŐ MINI KVÍZ
          ========================================================================= */}
      <TheorySection
        number={7}
        title="Gyors Önellenőrző Kérdések"
        badge="Teszteld a tudásod"
        badgeColor="teal"
        icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
      >
        <div className="space-y-3.5 text-xs sm:text-sm">
          {/* 1. kérdés */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 space-y-2">
            <p className="font-bold text-slate-800 dark:text-slate-200">
              1. Mekkora hozzávetőlegesen a Föld teljes felszíne?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { text: 'kb. 510 millió km²', correct: true },
                { text: 'kb. 40 000 km²', correct: false },
                { text: 'kb. 1 milliárd km²', correct: false }
              ].map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setQuiz1Answer(i)}
                  className={`p-2 rounded-xl text-left font-bold text-xs border-2 transition-all cursor-pointer ${
                    quiz1Answer === i
                      ? opt.correct
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                        : 'bg-rose-50 border-rose-500 text-rose-900'
                      : 'border-slate-200 dark:border-slate-700 hover:border-teal-400'
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>
            {quiz1Answer !== null && (
              <p className="text-[11px] text-slate-500 pt-1">
                {quiz1Answer === 0 ? '✓ Helyes! A = 4πR² ≈ 4 · 3,14 · 6370² ≈ 510 millió km².' : '✗ Nem jó! A helyes válasz: kb. 510 millió km².'}
              </p>
            )}
          </div>

          {/* 2. kérdés */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 space-y-2">
            <p className="font-bold text-slate-800 dark:text-slate-200">
              2. Mi a legrövidebb út a gömbfelület bármely két pontja között?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { text: 'A szélességi kör íve', correct: false },
                { text: 'A két ponton átmenő főkör íve (ortodróma)', correct: true },
                { text: 'Mindig a térképi egyenes vonal', correct: false }
              ].map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setQuiz2Answer(i)}
                  className={`p-2 rounded-xl text-left font-bold text-xs border-2 transition-all cursor-pointer ${
                    quiz2Answer === i
                      ? opt.correct
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                        : 'bg-rose-50 border-rose-500 text-rose-900'
                      : 'border-slate-200 dark:border-slate-700 hover:border-teal-400'
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>
            {quiz2Answer !== null && (
              <p className="text-[11px] text-slate-500 pt-1">
                {quiz2Answer === 1 ? '✓ Pontos! Gömbfelületen a legrövidebb távolság a főkör íve (ortodróma).' : '✗ Próbáld újra! Gömbi felületen a főkör íve adja a legrövidebb távolságot.'}
              </p>
            )}
          </div>

          {/* 3. kérdés */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 space-y-2">
            <p className="font-bold text-slate-800 dark:text-slate-200">
              3. Hány kilométer távolságot jelent 1° észak-déli elmozdulás a délkör mentén?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { text: 'kb. 111,1 km (40 000 km / 360°)', correct: true },
                { text: 'kb. 40 km', correct: false },
                { text: 'kb. 1000 km', correct: false }
              ].map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setQuiz3Answer(i)}
                  className={`p-2 rounded-xl text-left font-bold text-xs border-2 transition-all cursor-pointer ${
                    quiz3Answer === i
                      ? opt.correct
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                        : 'bg-rose-50 border-rose-500 text-rose-900'
                      : 'border-slate-200 dark:border-slate-700 hover:border-teal-400'
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>
            {quiz3Answer !== null && (
              <p className="text-[11px] text-slate-500 pt-1">
                {quiz3Answer === 0 ? '✓ Helyes! A 40 000 km-es meridián kerület 360-ad része pontosan kb. 111,1 km.' : '✗ Nem! 40 000 km / 360° ≈ 111,1 km.'}
              </p>
            )}
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default EarthTheory;
