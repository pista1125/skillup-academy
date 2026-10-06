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
  Triangle,
  Layers,
  Calculator,
  Compass,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Maximize2,
  Ruler,
  Box,
  HelpCircle,
  Eye,
  Sliders,
  Scale,
  Droplets,
  Flame,
  ArrowRight
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';
import { Button } from '@/components/ui/button';

interface PyramidSurfaceVolumeTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const PyramidSurfaceVolumeTheory: React.FC<PyramidSurfaceVolumeTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interaktív Számítási Labor Állapotok ---
  const [solidType, setSolidType] = useState<'square' | 'tetra'>('square');
  const [edgeA, setEdgeA] = useState<number>(6); // alapél [cm]
  const [heightM, setHeightM] = useState<number>(4); // testmagasság [cm]

  // Szabályos négyzet alapú gúla számított értékei
  const halfA = edgeA / 2;
  // Oldallap magassága: mo = √(m² + (a/2)²)
  const mo = Math.sqrt(heightM * heightM + halfA * halfA);
  // Oldalél: b = √(mo² + (a/2)²)
  const b = Math.sqrt(mo * mo + halfA * halfA);
  // Alaplap átlója: d = a · √2
  const d = edgeA * Math.SQRT2;
  const halfD = d / 2;
  // Alapterület: Ta = a²
  const Ta = edgeA * edgeA;
  // Egy oldalháromszög területe: T_tri = (a · mo) / 2
  const oneSideArea = (edgeA * mo) / 2;
  // Palástterület: Tp = 4 · T_tri = 2 · a · mo
  const Tp = 4 * oneSideArea;
  // Teljes felszín: A = Ta + Tp
  const totalA = Ta + Tp;
  // Térfogat: V = (Ta · m) / 3
  const totalV = (Ta * heightM) / 3;

  // Szabályos tetraéder számítások (minden él = edgeA)
  const tetraMo = (edgeA * Math.sqrt(3)) / 2;
  const tetraM = (edgeA * Math.sqrt(6)) / 3;
  const tetraTa = (edgeA * edgeA * Math.sqrt(3)) / 4;
  const tetraA = edgeA * edgeA * Math.sqrt(3);
  const tetraV = (edgeA * edgeA * edgeA * Math.SQRT2) / 12;

  // Önellenőrző mini kvíz állapotok
  const [quiz1Answer, setQuiz1Answer] = useState<number | null>(null);
  const [quiz2Answer, setQuiz2Answer] = useState<number | null>(null);
  const [quiz3Answer, setQuiz3Answer] = useState<number | null>(null);

  return (
    <TheoryTemplate
      title="A Gúla Felszíne és Térfogata"
      subtitle="A gúla felszínének és térfogatának kiszámítása, a palástterület felbontása, a harmadoló képlet és a Pitagorasz-tétel alkalmazása derékszögű háromszögekben"
      badgeText="8. OSZTÁLY • VII. TESTEK • 📐 TANANYAG"
      themeColor="rose"
      documentId="pyramid-calc-theory-document"
      pdfFilename="8_osztaly_gula_felszin_es_terfogat_tananyag.pdf"
      quickRule={{
        label: 'A Gúla Két Alapvető Számítási Képlete',
        align: 'left',
        formula: (
          <div className="flex flex-wrap items-baseline gap-x-8 gap-y-1 text-left font-bold">
            <span className="shrink-0"><MathText text="A = T_a + T_p," /></span>
            <span className="shrink-0"><MathText text="V = \frac{T_a \cdot m}{3}" /></span>
          </div>
        )
      }}
      practiceTitle="Készen állsz a gúlák felszín- és térfogatszámítására?"
      practiceSubtitle="30 válogatott feladat 3 szinten Pitagorasz-levezetésekkel, kártyás párosítóval és csoportosítóval!"
      practiceButtonText="Gyakorló Kvíz Indítása"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      onSwitchToQuiz={onStartQuiz}
    >
      {/* =========================================================================
          1. FEJEZET: A GÚLA FELSZÍNÉNEK KISZÁMÍTÁSA
          ========================================================================= */}
      <TheorySection
        number={1}
        title="A Gúla Felszínének Kiszámítása (A = Ta + Tp)"
        badge="Felszínképlet"
        badgeColor="rose"
        icon={<Layers className="w-5 h-5 text-rose-600" />}
      >
        <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Minden gúla felszíne (<MathText>A</MathText>) a határoló síklapjai területének összege. A gúla felülete pontosan két fő részből áll: az <strong>1 darab alaplapból</strong> (<MathText>T_a</MathText>) és az <strong>oldallapokból álló palástból</strong> (<MathText>T_p</MathText>).
          </p>

          <TheoryCallout title="A Gúla Felszínének Általános Képlete" color="rose">
            A felszín az alaplap és a palást területének összege:
            <div className="my-2.5 text-base sm:text-lg font-black text-center text-rose-800 dark:text-rose-200 font-mono">
              A = T_a + T_p
            </div>
            ahol <MathText>T_a</MathText> az alapsokszög területe, <MathText>T_p</MathText> pedig az összes oldallap (háromszögek) területének összege.
          </TheoryCallout>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
            <TheoryCard title="1. Alapterület (Ta) Számítása" icon={<Box className="w-4 h-4 text-amber-600" />}>
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
                Az alaplap alakjától függően a már ismert síkidom-területképleteket alkalmazzuk:
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-200">
                <li className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span><strong>Négyzet alapú:</strong> <MathText text="T_a = a^2" /></span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span><strong>Téglalap alapú:</strong> <MathText text="T_a = a \cdot b" /></span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span><strong>Szabályos háromszög (tetraéder):</strong> <MathText text="T_a = \frac{a^2 \cdot \sqrt{3}}{4}" /></span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span><strong>Szabályos hatszög:</strong> <MathText text="T_a = 6 \cdot \frac{a^2 \sqrt{3}}{4} = \frac{3a^2 \sqrt{3}}{2}" /></span>
                </li>
              </ul>
            </TheoryCard>

            <TheoryCard title="2. Palástterület (Tp) Számítása" icon={<Triangle className="w-4 h-4 text-emerald-600" />}>
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
                A palástot az alapsokszög oldalaira emelt háromszögek alkotják.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-200">
                <li className="flex items-start gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0"></span>
                  <span>
                    <strong>Szabályos gúla esetén:</strong> mind az <MathText text="n" /> darab oldallap egybevágó egyenlő szárú háromszög:
                    <div className="font-mono font-bold text-emerald-800 dark:text-emerald-300 my-1">
                      <MathText text="T_p = n \cdot \frac{a \cdot m_o}{2} = \frac{K_a \cdot m_o}{2}" />
                    </div>
                    (ahol <MathText text="K_a = n \cdot a" /> az alap kerülete).
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0"></span>
                  <span>
                    <strong>Téglalap alapú gúla esetén:</strong> a palást 2 pár különböző háromszögből áll, két különböző oldalmagassággal!
                  </span>
                </li>
              </ul>
            </TheoryCard>
          </div>

          {/* Részletes kidolgozott mintapélda */}
          <TheoryCallout title="Kidolgozott Mintapélda 1: Szabályos Négyzet Alapú Gúla Felszíne" color="amber">
            <div className="space-y-2 text-xs sm:text-sm">
              <p className="font-bold text-slate-800 dark:text-slate-100">
                Feladat: Számítsuk ki a szabályos négyzet alapú gúla felszínét, ha alapéle <MathText text="a = 10\text{ cm}" />, és oldallapjának magassága <MathText text="m_o = 12\text{ cm}" />!
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 font-mono">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block font-sans">1. Alapterület</span>
                  <div className="text-xs font-bold text-amber-800 dark:text-amber-200">
                    <MathText text="T_a = a^2 = 10^2 = 100\text{ cm}^2" />
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block font-sans">2. Palástterület</span>
                  <div className="text-xs font-bold text-emerald-800 dark:text-emerald-200">
                    <MathText text="T_p = 4 \cdot \frac{10 \cdot 12}{2} = 240\text{ cm}^2" />
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block font-sans">3. Teljes Felszín</span>
                  <div className="text-xs font-bold text-rose-800 dark:text-rose-200">
                    <MathText text="A = 100 + 240 = 340\text{ cm}^2" />
                  </div>
                </div>
              </div>
            </div>
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* =========================================================================
          2. FEJEZET: A GÚLA TÉRFOGATÁNAK KISZÁMÍTÁSA
          ========================================================================= */}
      <TheorySection
        number={2}
        title="A Gúla Térfogatának Kiszámítása (V = Ta · m / 3)"
        badge="Térfogatképlet"
        badgeColor="indigo"
        icon={<Box className="w-5 h-5 text-indigo-600" />}
      >
        <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            A térgeometria egyik legszebb és legfontosabb tétele kimondja, hogy <strong>minden gúla térfogata pontosan egyharmada</strong> annak a hasábnak a térfogatának, amelynek alapterülete és testmagassága megegyezik a gúláéval!
          </p>

          <TheoryCallout title="A Gúla Térfogatának Általános Képlete" color="indigo">
            A térfogat az alapterület és a testmagasság szorzatának harmada:
            <div className="my-2.5 text-base sm:text-lg font-black text-center text-indigo-800 dark:text-indigo-200 font-mono">
              <MathText text="V = \frac{T_a \cdot m}{3} = \frac{1}{3} \cdot T_a \cdot m" />
            </div>
            <strong>Fontos:</strong> A térfogatképletben mindig a <em>testmagasság</em> (<MathText text="m" />) szerepel, soha nem az oldallap-magasság (<MathText text="m_o" />)!
          </TheoryCallout>

          {/* Szemléltetés: Miért egyharmad? */}
          <TheoryCard
            title="Miért pont egyharmad? – Szemléletes Geometriai Bizonyítás"
            icon={<Lightbulb className="w-4 h-4 text-amber-500" />}
          >
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <p>
                <strong>1. A Kocka 6 gúlára bontása:</strong> Ha egy <MathText text="a" /> élű kocka középpontjából sugarakat húzunk a 6 lap mindegyik csúcsához, a kocka belsejében pontosan 6 darab egybevágó, négyzet alapú gúla keletkezik.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 font-mono text-center text-xs font-bold text-slate-800 dark:text-slate-200">
                <MathText text="V_{\text{kocka}} = a^3 \implies 1\text{ gúla} = \frac{a^3}{6} = \frac{a^2 \cdot (a/2)}{3} = \frac{T_a \cdot m}{3}" />
              </div>
              <p>
                Mivel a kocka középpontja <MathText text="m = a/2" /> magasan van az alaplap felett, a képlet pontosan igazolja az egyharmados osztást!
              </p>
              <p>
                <strong>2. Folyadékáttöltési kísérlet:</strong> Ha egy üreges négyzet alapú gúlát telerakunk vízzel vagy homokkal, és átöntjük egy azonos alapú és magasságú üreges hasábba, <strong>pontosan 3 teli gúla tartalma tölti fel a hasábot színültig</strong>. Így: <MathText text="V_{\text{hasáb}} = 3 \cdot V_{\text{gúla}}" />.
              </p>
            </div>
          </TheoryCard>

          {/* Kidolgozott mintapélda 2 */}
          <TheoryCallout title="Kidolgozott Mintapélda 2: Térfogat és Visszaszámolás" color="emerald">
            <div className="space-y-2 text-xs sm:text-sm">
              <p className="font-bold text-slate-800 dark:text-slate-100">
                A) feladat: Egy négyzet alapú gúla alapéle <MathText text="a = 6\text{ cm}" />, testmagassága <MathText text="m = 10\text{ cm}" />. Mennyi a térfogata?
              </p>
              <div className="font-mono text-xs bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200">
                <MathText text="T_a = 6^2 = 36\text{ cm}^2 \implies V = \frac{T_a \cdot m}{3} = \frac{36 \cdot 10}{3} = 120\text{ cm}^3" />
              </div>
              <p className="font-bold text-slate-800 dark:text-slate-100 pt-1">
                B) feladat (Visszaszámolás): Egy gúla alapterülete <MathText text="T_a = 50\text{ cm}^2" />, térfogata <MathText text="V = 250\text{ cm}^3" />. Milyen magas a gúla?
              </p>
              <div className="font-mono text-xs bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800 text-indigo-800 dark:text-indigo-200">
                <MathText text="V = \frac{T_a \cdot m}{3} \implies 250 = \frac{50 \cdot m}{3} \implies 750 = 50 \cdot m \implies m = 15\text{ cm}" />
              </div>
            </div>
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* =========================================================================
          3. FEJEZET: PITAGORASZ-TÉTEL ALKALMAZÁSA A GÚLÁBAN
          ========================================================================= */}
      <TheorySection
        number={3}
        title="Pitagorasz-tétel a Gúlában: A Három Kulcs-Háromszög"
        badge="Pitagorasz Alkalmazás"
        badgeColor="amber"
        icon={<Ruler className="w-5 h-5 text-amber-600" />}
      >
        <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            A gúlák feladatainak többségében nem adják meg közvetlenül az összes szükséges magasságot. A hiányzó adatokat a szabályos gúlák belsejében és felületén elhelyezkedő <strong>derékszögű háromszögekből számítjuk ki Pitagorasz-tétellel</strong>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            {/* 1. Belső felezősík */}
            <TheoryCard
              title="1. Belső Metszet (m, a/2, mo)"
              icon={<Ruler className="w-4 h-4 text-emerald-600" />}
            >
              <div className="space-y-1.5 text-xs">
                <p className="text-slate-600 dark:text-slate-300">
                  A csúcs, a talppont és az alapél felezőpontja alkotja.
                </p>
                <div className="font-mono font-black text-emerald-700 dark:text-emerald-300 my-1 p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-center">
                  <MathText text="m^2 + \left(\frac{a}{2}\right)^2 = m_o^2" />
                </div>
                <p className="text-[11px] text-slate-500">
                  <strong>Átfogó:</strong> az oldallap-magasság (<MathText text="m_o" />). Befogók: a testmagasság (<MathText text="m" />) és a fél alapél (<MathText text="a/2" />).
                </p>
              </div>
            </TheoryCard>

            {/* 2. Oldallap síkja */}
            <TheoryCard
              title="2. Oldallap (mo, a/2, b)"
              icon={<Triangle className="w-4 h-4 text-amber-600" />}
            >
              <div className="space-y-1.5 text-xs">
                <p className="text-slate-600 dark:text-slate-300">
                  Az egyenlő szárú oldallap felezővonalánál fekszik.
                </p>
                <div className="font-mono font-black text-amber-700 dark:text-amber-300 my-1 p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-center">
                  <MathText text="m_o^2 + \left(\frac{a}{2}\right)^2 = b^2" />
                </div>
                <p className="text-[11px] text-slate-500">
                  <strong>Átfogó:</strong> az oldalél (<MathText text="b" />). Befogók: az oldallap-magasság (<MathText text="m_o" />) és a fél alapél (<MathText text="a/2" />).
                </p>
              </div>
            </TheoryCard>

            {/* 3. Átlós síkmetszet */}
            <TheoryCard
              title="3. Átlós Metszet (m, d/2, b)"
              icon={<Compass className="w-4 h-4 text-purple-600" />}
            >
              <div className="space-y-1.5 text-xs">
                <p className="text-slate-600 dark:text-slate-300">
                  A csúcs, a talppont és az alaplap egyik csúcsa alkotja.
                </p>
                <div className="font-mono font-black text-purple-700 dark:text-purple-300 my-1 p-2 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-center">
                  <MathText text="m^2 + \left(\frac{d}{2}\right)^2 = b^2" />
                </div>
                <p className="text-[11px] text-slate-500">
                  Ahol <MathText text="d = a\sqrt{2}" /> az alapnégyzet átlója, fele pedig <MathText text="d/2 = \frac{a\sqrt{2}}{2}" />.
                </p>
              </div>
            </TheoryCard>
          </div>

          {/* Kidolgozott összetett Pitagorasz példa */}
          <TheoryCallout title="Összetett Mintapélda: Alapélből és Testmagasságból Felszín és Térfogat" color="rose">
            <div className="space-y-2 text-xs sm:text-sm">
              <p className="font-bold text-slate-800 dark:text-slate-100">
                Feladat: Egy szabályos négyzet alapú gúla alapéle <MathText text="a = 12\text{ cm}" />, testmagassága <MathText text="m = 8\text{ cm}" />. Számítsuk ki az oldallap-magasságot (<MathText text="m_o" />), az oldalélt (<MathText text="b" />), a teljes felszínt (<MathText text="A" />) és a térfogatot (<MathText text="V" />)!
              </p>
              <div className="space-y-1.5 font-mono text-xs pt-1">
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-800">
                  <strong>1. Lépés:</strong> Fél alapél: <MathText text="a/2 = 12/2 = 6\text{ cm}" />.
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-800">
                  <strong>2. Lépés:</strong> Oldallap-magasság: <MathText text="m_o^2 = m^2 + (a/2)^2 = 8^2 + 6^2 = 100 \implies m_o = \sqrt{100} = 10\text{ cm}" />.
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-800">
                  <strong>3. Lépés:</strong> Oldalél: <MathText text="b^2 = m_o^2 + (a/2)^2 = 10^2 + 6^2 = 136 \implies b = \sqrt{136} \approx 11{,}66\text{ cm}" />.
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-800">
                  <strong>4. Lépés:</strong> Felszín: <MathText text="T_a = 12^2 = 144\text{ cm}^2, \quad T_p = 4 \cdot \frac{12 \cdot 10}{2} = 240\text{ cm}^2 \implies A = 144 + 240 = 384\text{ cm}^2" />.
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-800">
                  <strong>5. Lépés:</strong> Térfogat: <MathText text="V = \frac{T_a \cdot m}{3} = \frac{144 \cdot 8}{3} = 384\text{ cm}^3" />.
                </div>
              </div>
            </div>
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* =========================================================================
          4. FEJEZET: INTERAKTÍV GÚLA SZÁMÍTÁSI LABORATÓRIUM
          ========================================================================= */}
      <TheorySection
        number={4}
        title="Interaktív Gúla Számítási Laboratórium (Valós idejű Kalkulátor)"
        badge="Kísérletezz!"
        badgeColor="rose"
        icon={<Sliders className="w-5 h-5 text-rose-600" />}
      >
        <TheoryCard
          title="Dinamikus Paraméterező és Modellkalkulátor"
          icon={<Calculator className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
          gradient
          className="border-2 border-rose-200/90 dark:border-rose-900/60"
        >
          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Állítsd be az alapélt (<MathText text="a" />) és a testmagasságot (<MathText text="m" />), és figyeld meg, hogyan számítja ki a rendszer az oldallap-magasságot (<MathText text="m_o" />), az oldalélt (<MathText text="b" />), valamint a gúla felszínét és térfogatát!
            </p>

            {/* Test típus választó gombok */}
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={() => setSolidType('square')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  solidType === 'square'
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-500/25'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                Szabályos Négyzet Alapú Gúla
              </button>
              <button
                onClick={() => setSolidType('tetra')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  solidType === 'tetra'
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-500/25'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <Triangle className="w-3.5 h-3.5" />
                Szabályos Tetraéder (Minden él = a)
              </button>
            </div>

            {/* Csúszkák */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-rose-50/50 dark:bg-slate-900/60 border border-rose-100 dark:border-rose-950">
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                  <span>Alapél (<MathText text="a" />):</span>
                  <span className="font-mono font-black text-rose-600 dark:text-rose-400 text-sm">{edgeA} cm</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={16}
                  step={1}
                  value={edgeA}
                  onChange={(e) => setEdgeA(Number(e.target.value))}
                  className="w-full accent-rose-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
                  <span>2 cm</span>
                  <span>Fél alapél: {halfA} cm</span>
                  <span>16 cm</span>
                </div>
              </div>

              {solidType === 'square' && (
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                    <span>Testmagasság (<MathText text="m" />):</span>
                    <span className="font-mono font-black text-red-600 dark:text-red-400 text-sm">{heightM} cm</span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={16}
                    step={1}
                    value={heightM}
                    onChange={(e) => setHeightM(Number(e.target.value))}
                    className="w-full accent-red-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
                    <span>2 cm</span>
                    <span>Magasság</span>
                    <span>16 cm</span>
                  </div>
                </div>
              )}
            </div>

            {/* Vizuális 3D vázlat & Dinamikus Eredmények Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              {/* Dinamikus SVG vázlat */}
              <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-gradient-to-b from-white to-rose-50/30 dark:from-slate-900 dark:to-slate-850 border border-rose-100 dark:border-rose-900/40">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">
                  Gúla Modell Méretekkel
                </span>
                {solidType === 'square' ? (
                  <svg viewBox="0 0 220 140" className="w-56 h-36 select-none">
                    <ellipse cx="110" cy="118" rx="72" ry="12" fill="#e2e8f0" opacity="0.6" />
                    {/* Rejtett alapélek */}
                    <line x1="50" y1="100" x2="110" y2="82" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
                    <line x1="110" y1="82" x2="170" y2="100" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
                    {/* Testmagasság m */}
                    <line x1="110" y1="20" x2="110" y2="100" stroke="#dc2626" strokeWidth="2" strokeDasharray="3 2" />
                    <circle cx="110" cy="100" r="2" fill="#dc2626" />
                    <text x="105" y="60" className="text-[9.5px] font-mono font-bold fill-red-600" textAnchor="end">m={heightM}</text>
                    {/* Oldallap-magasság mo a jobb első lapon */}
                    <line x1="110" y1="20" x2="140" y2="109" stroke="#16a34a" strokeWidth="2" />
                    <circle cx="140" cy="109" r="2" fill="#16a34a" />
                    <text x="135" y="65" className="text-[9.5px] font-mono font-bold fill-emerald-600" textAnchor="start">mo={mo.toFixed(1)}</text>
                    {/* Felszíni lapok */}
                    <polygon points="110,20 50,100 110,118" fill="#fef3c7" fillOpacity="0.75" stroke="#d97706" strokeWidth="1.5" />
                    <polygon points="110,20 110,118 170,100" fill="#fed7aa" fillOpacity="0.75" stroke="#ea580c" strokeWidth="1.5" />
                    <line x1="50" y1="100" x2="110" y2="118" stroke="#b45309" strokeWidth="1.8" />
                    <line x1="110" y1="118" x2="170" y2="100" stroke="#b45309" strokeWidth="1.8" />
                    {/* Csúcs */}
                    <circle cx="110" cy="20" r="3.5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.2" />
                    <text x="110" y="14" className="text-[9.5px] font-black fill-red-600" textAnchor="middle">M</text>
                    {/* Alapél felirat */}
                    <text x="80" y="121" className="text-[9.5px] font-mono font-black fill-amber-900" textAnchor="middle">a = {edgeA} cm</text>
                  </svg>
                ) : (
                  <svg viewBox="0 0 220 140" className="w-56 h-36 select-none">
                    <ellipse cx="110" cy="118" rx="60" ry="10" fill="#e2e8f0" opacity="0.6" />
                    <line x1="60" y1="110" x2="160" y2="110" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
                    <polygon points="110,24 60,110 110,122" fill="#e0e7ff" fillOpacity="0.8" stroke="#4f46e5" strokeWidth="1.8" />
                    <polygon points="110,24 110,122 160,110" fill="#c7d2fe" fillOpacity="0.8" stroke="#4f46e5" strokeWidth="1.8" />
                    <line x1="60" y1="110" x2="110" y2="122" stroke="#4338ca" strokeWidth="2" />
                    <line x1="110" y1="122" x2="160" y2="110" stroke="#4338ca" strokeWidth="2" />
                    <circle cx="110" cy="24" r="3.5" fill="#ef4444" />
                    <text x="85" y="125" className="text-[9.5px] font-mono font-black fill-indigo-950" textAnchor="middle">a = {edgeA} cm</text>
                  </svg>
                )}
              </div>

              {/* Számított adatok táblázata */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60">
                  <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-300 block">Alapterület (Ta)</span>
                  <span className="text-base font-black text-amber-900 dark:text-amber-100 font-mono">
                    {solidType === 'square' ? `${Ta.toFixed(1)} cm²` : `${tetraTa.toFixed(1)} cm²`}
                  </span>
                  <span className="text-[10px] text-amber-600 dark:text-amber-400 block mt-0.5">
                    {solidType === 'square' ? `Ta = ${edgeA}²` : `Ta = a²√3/4`}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60">
                  <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-300 block">Oldallap-m. (mo)</span>
                  <span className="text-base font-black text-emerald-900 dark:text-emerald-100 font-mono">
                    {solidType === 'square' ? `${mo.toFixed(2)} cm` : `${tetraMo.toFixed(2)} cm`}
                  </span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block mt-0.5">
                    {solidType === 'square' ? `√(m² + (a/2)²)` : `a · √3 / 2`}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/60">
                  <span className="text-[10px] uppercase font-bold text-purple-700 dark:text-purple-300 block">Palást (Tp)</span>
                  <span className="text-base font-black text-purple-900 dark:text-purple-100 font-mono">
                    {solidType === 'square' ? `${Tp.toFixed(1)} cm²` : `${(tetraTa * 3).toFixed(1)} cm²`}
                  </span>
                  <span className="text-[10px] text-purple-600 dark:text-purple-400 block mt-0.5">
                    {solidType === 'square' ? `4 · (a · mo / 2)` : `3 · Ta`}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-900/60">
                  <span className="text-[10px] uppercase font-bold text-cyan-700 dark:text-cyan-300 block">Oldalél (b)</span>
                  <span className="text-base font-black text-cyan-900 dark:text-cyan-100 font-mono">
                    {solidType === 'square' ? `${b.toFixed(2)} cm` : `${edgeA} cm`}
                  </span>
                  <span className="text-[10px] text-cyan-600 dark:text-cyan-400 block mt-0.5">
                    {solidType === 'square' ? `√(mo² + (a/2)²)` : `b = a`}
                  </span>
                </div>

                {/* Teljes Felszín & Térfogat kiemelve */}
                <div className="col-span-2 p-3 rounded-xl bg-gradient-to-r from-rose-100 via-pink-100 to-rose-100 dark:from-rose-950/80 dark:to-pink-950/80 border-2 border-rose-300 dark:border-rose-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-black text-rose-800 dark:text-rose-200 block">Teljes Felszín (A)</span>
                    <span className="text-lg font-black text-rose-950 dark:text-white font-mono">
                      {solidType === 'square' ? `${totalA.toFixed(1)} cm²` : `${tetraA.toFixed(1)} cm²`}
                    </span>
                    <span className="text-[10px] text-rose-700 dark:text-rose-300 block">A = Ta + Tp</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-black text-rose-800 dark:text-rose-200 block">Térfogat (V)</span>
                    <span className="text-lg font-black text-rose-950 dark:text-white font-mono">
                      {solidType === 'square' ? `${totalV.toFixed(1)} cm³` : `${tetraV.toFixed(1)} cm³`}
                    </span>
                    <span className="text-[10px] text-rose-700 dark:text-rose-300 block">V = (Ta · m) / 3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* =========================================================================
          5. FEJEZET: GYAKORLATI ÉS FIZIKAI PROBLÉMÁK (SŰRŰSÉG, TETŐK, SÁTRAK)
          ========================================================================= */}
      <TheorySection
        number={5}
        title="Gyakorlati Feladatok: Anyagi Sűrűség, Tetők és Sátrak"
        badge="Gyakorlati Élet"
        badgeColor="emerald"
        icon={<Scale className="w-5 h-5 text-emerald-600" />}
      >
        <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            A valóságban a gúlák gyakran épületek toronysisakjaiként, sátrakként vagy kőtömbökből épült emlékművekként jelennek meg. A feladatok megoldásakor mindig figyelni kell a szöveg pontos geometriai értelmezésére:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
            <TheoryCard title="1. Sátrak és Tetőszerkezetek: Csak a Palást!" icon={<Flame className="w-4 h-4 text-orange-500" />}>
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
                Ha egy templomtorony gúla alakú sisakját fedik be bádoggal, vagy egy gúla alakú sátor ponyváját készítik el, <strong>az alaplapot nem kell beszámítani</strong>!
              </p>
              <div className="p-2 rounded-lg bg-orange-50 dark:bg-slate-900 font-mono text-xs text-orange-800 dark:text-orange-200">
                <MathText text="A_{\text{fedés}} = T_p = n \cdot \frac{a \cdot m_o}{2}" />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Ha a feladat 10% szabási hulladékot említ: <MathText text="A_{\text{vásárolandó}} = 1{,}1 \cdot T_p" />.
              </p>
            </TheoryCard>

            <TheoryCard title="2. Tömegszámítás Anyagi Sűrűségből" icon={<Scale className="w-4 h-4 text-blue-500" />}>
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
                A fizikából ismert <MathText text="m = \rho \cdot V" /> összefüggés közvetlenül kapcsolja a térfogatot a test tömegéhez:
              </p>
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-slate-900 font-mono text-xs text-blue-800 dark:text-blue-200">
                <MathText text="m_{\text{tömeg}} = \rho \cdot V \quad \left[\text{kg} = \frac{\text{kg}}{\text{dm}^3} \cdot \text{dm}^3\right]" />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Mindig ügyelj az egységekre: <MathText text="1\text{ m}^3 = 1000\text{ dm}^3 = 1\,000\,000\text{ cm}^3" />!
              </p>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          6. FEJEZET: TIPUKUS CSAPDÁK ÉS TÍPUSHIBÁK
          ========================================================================= */}
      <TheorySection
        number={6}
        title="Tipikus Csapdák és Típushibák (Hogyan Kerüld El Őket?)"
        badge="Figyelem!"
        badgeColor="orange"
        icon={<AlertTriangle className="w-5 h-5 text-orange-500" />}
      >
        <div className="space-y-3 pt-1">
          <TheoryTrapBox title="1. Csapda: A testmagasság (m) és az oldallap-magasság (mo) összekeverése">
            A leggyakoribb hiba, hogy a tanuló a térfogatképletbe az oldallap-magasságot (<MathText text="m_o" />) írja be, vagy a palásthoz a testmagasságot (<MathText text="m" />) használja!
            <div className="font-bold text-xs mt-1 text-slate-800 dark:text-slate-100">
              Szabály: Térfogathoz a test belsejében futó <MathText text="m" /> kell (<MathText text="V = \frac{T_a \cdot m}{3}" />), míg a palásthoz a felületen fekvő <MathText text="m_o" /> kell (<MathText text="T_p = 2 \cdot a \cdot m_o" />)!
            </div>
          </TheoryTrapBox>

          <TheoryTrapBox title="2. Csapda: A harmadolás elfelejtése a térfogatban">
            Ha nem osztasz 3-mal, akkor nem a gúla, hanem egy vele azonos méretű hasáb térfogatát kapod meg! Ne feledd: <em>a gúla hegyes test, térfogata harmada a hasábnak</em>: <MathText text="V = \frac{T_a \cdot m}{3}" />!
          </TheoryTrapBox>

          <TheoryTrapBox title="3. Csapda: Átfogó eltévesztése a belső derékszögű háromszögben">
            Az <MathText text="m, a/2, m_o" /> derékszögű háromszögben a leghosszabb oldal a derékszöggel szemközti <strong>oldallap-magasság</strong> (<MathText text="m_o" />). Ezért <MathText text="m_o^2 = m^2 + (a/2)^2" />, és soha nem <MathText text="m^2 = m_o^2 + (a/2)^2" />!
          </TheoryTrapBox>
        </div>
      </TheorySection>

      {/* =========================================================================
          7. FEJEZET: ÖNELLENŐRZŐ MINI KVÍZ
          ========================================================================= */}
      <TheorySection
        number={7}
        title="Önellenőrző Gyors Kvíz (Teszteld a Tudásod!)"
        badge="Önellenőrzés"
        badgeColor="cyan"
        icon={<HelpCircle className="w-5 h-5 text-cyan-600" />}
      >
        <div className="space-y-4 pt-1">
          {/* 1. Kérdés */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2.5">
            <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
              1. Egy négyzet alapú gúla alapéle <MathText text="a = 6\text{ cm}" />, testmagassága <MathText text="m = 10\text{ cm}" />. Mennyi a térfogata?
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 0, text: '120 cm³ (Helyes!)', correct: true },
                { id: 1, text: '360 cm³', correct: false },
                { id: 2, text: '60 cm³', correct: false },
                { id: 3, text: '180 cm³', correct: false }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setQuiz1Answer(opt.id)}
                  className={`p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    quiz1Answer === opt.id
                      ? opt.correct
                        ? 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-500 text-emerald-900 dark:text-emerald-200'
                        : 'bg-rose-100 dark:bg-rose-950/80 border-rose-500 text-rose-900 dark:text-rose-200'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>
            {quiz1Answer !== null && (
              <p className="text-xs font-medium text-slate-600 dark:text-slate-400 pt-1">
                Magyarázat: <MathText text="T_a = 6^2 = 36\text{ cm}^2" />, <MathText text="V = (36 \cdot 10) / 3 = 360 / 3 = 120\text{ cm}^3" />.
              </p>
            )}
          </div>

          {/* 2. Kérdés */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2.5">
            <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
              2. Szabályos négyzet alapú gúla alapéle <MathText text="a = 8\text{ cm}" />, testmagassága <MathText text="m = 3\text{ cm}" />. Mennyi az oldallap-magasság (<MathText text="m_o" />)?
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 0, text: '5 cm (Helyes!)', correct: true },
                { id: 1, text: '4 cm', correct: false },
                { id: 2, text: '√73 cm', correct: false },
                { id: 3, text: '7 cm', correct: false }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setQuiz2Answer(opt.id)}
                  className={`p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    quiz2Answer === opt.id
                      ? opt.correct
                        ? 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-500 text-emerald-900 dark:text-emerald-200'
                        : 'bg-rose-100 dark:bg-rose-950/80 border-rose-500 text-rose-900 dark:text-rose-200'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>
            {quiz2Answer !== null && (
              <p className="text-xs font-medium text-slate-600 dark:text-slate-400 pt-1">
                Magyarázat: A fél alapél <MathText text="a/2 = 4\text{ cm}" />. Pitagorasz: <MathText text="m_o^2 = 3^2 + 4^2 = 9 + 16 = 25 \implies m_o = 5\text{ cm}" />.
              </p>
            )}
          </div>

          {/* 3. Kérdés */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2.5">
            <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
              3. Egy hasáb és egy gúla alapterülete és testmagassága megegyezik. Hányszorosa a hasáb térfogata a gúla térfogatának?
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 0, text: '3-szorosa (Helyes!)', correct: true },
                { id: 1, text: '2-szerese', correct: false },
                { id: 2, text: '4-szerese', correct: false },
                { id: 3, text: 'Egyenlő velük', correct: false }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setQuiz3Answer(opt.id)}
                  className={`p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    quiz3Answer === opt.id
                      ? opt.correct
                        ? 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-500 text-emerald-900 dark:text-emerald-200'
                        : 'bg-rose-100 dark:bg-rose-950/80 border-rose-500 text-rose-900 dark:text-rose-200'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>
            {quiz3Answer !== null && (
              <p className="text-xs font-medium text-slate-600 dark:text-slate-400 pt-1">
                Magyarázat: Mivel <MathText text="V_{\text{hasáb}} = T_a \cdot m" /> és <MathText text="V_{\text{gúla}} = (T_a \cdot m) / 3" />, a hasáb térfogata mindig pontosan 3-szorosa a gúláénak.
              </p>
            )}
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default PyramidSurfaceVolumeTheory;
