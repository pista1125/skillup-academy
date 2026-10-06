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
  Sliders
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';
import { Button } from '@/components/ui/button';

interface PyramidsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const PyramidsTheory: React.FC<PyramidsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interaktív Gúla Labor állapotok
  const [labSolid, setLabSolid] = useState<'square' | 'tetra'>('square');
  const [highlightPart, setHighlightPart] = useState<'all' | 'm' | 'mo' | 'b' | 'base'>('all');

  // Négyzet alapú gúla állapotok
  const [edgeA, setEdgeA] = useState<number>(6); // alapél [cm]
  const [heightM, setHeightM] = useState<number>(4); // testmagasság [cm]

  // Számítások szabályos négyzet alapú gúlához
  const halfA = edgeA / 2;
  // Oldallap magassága: mo = √(m² + (a/2)²)
  const sideHeightMo = Math.sqrt(heightM * heightM + halfA * halfA);
  // Oldalél: b = √(mo² + (a/2)²)
  const sideEdgeB = Math.sqrt(sideHeightMo * sideHeightMo + halfA * halfA);
  // Alaplap átlója: d = a · √2
  const baseDiag = edgeA * Math.SQRT2;

  // Szabályos tetraéder állapotok és számítások
  const [tetraA, setTetraA] = useState<number>(6); // élhossz [cm]
  // Szabályos tetraédernél minden él egyenlő: b = a
  // Oldallap-magasság (egyenlő oldalú háromszög magassága): mo = a · √3 / 2
  const tetraMo = (tetraA * Math.sqrt(3)) / 2;
  // Alaplap területe (szabályos háromszög): Ta = a² · √3 / 4
  const tetraBaseArea = (tetraA * tetraA * Math.sqrt(3)) / 4;
  // Teljes felszín: A = 4 · Ta = a² · √3
  const tetraTotalArea = tetraA * tetraA * Math.sqrt(3);
  // Beírt kör sugara az alapon (vetületi távolság az oldalfelezőtől): r = a · √3 / 6
  const tetraR = (tetraA * Math.sqrt(3)) / 6;
  // Körülírt kör sugara az alapon: R = a · √3 / 3
  const tetraBigR = (tetraA * Math.sqrt(3)) / 3;
  // Testmagasság: m = a · √(2/3) = a · √6 / 3
  const tetraM = (tetraA * Math.sqrt(6)) / 3;
  // Térfogat: V = a³ · √2 / 12
  const tetraVol = (Math.pow(tetraA, 3) * Math.SQRT2) / 12;

  // Euler interaktív kalkulátor állapota
  const [eulerN, setEulerN] = useState<number>(4);
  const eulerC = eulerN + 1; // csúcsok
  const eulerL = eulerN + 1; // lapok
  const eulerE = 2 * eulerN; // élek
  const eulerCheck = eulerC - eulerE + eulerL;

  return (
    <TheoryTemplate
      title="A Gúlák Geometriája"
      subtitle="Fogalmak, szabályos gúlák tulajdonságai, belső derékszögű háromszögek, hálók és az Euler-tétel"
      badge="8. OSZTÁLY • VI. TESTEK • 🔺 2. LECKE"
      badgeText="8. OSZTÁLY • VI. TESTEK • 🔺 2. LECKE"
      themeColor="amber"
      pdfFilename="8_osztaly_gulak_tananyag.pdf"
      practiceTitle="Készen állsz a gúlák gyakorló kvízre?"
      practiceSubtitle="Tedd próbára tudásodat 3 szintre bontott, 30 feladatos interaktív kvízben levezetésekkel, párosítóval és csoportosítóval!"
      practiceButtonText="Gyakorló Kvíz indítása"
      quickRule={{
        label: 'Fontos Szabály: A Gúlák Alapegyenlete és Euler-tétele',
        formula: 'C - É + L = 2 \\quad \\text{és} \\quad C = L = n + 1, \\quad É = 2n'
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* 0. KIEMELT FONTOS SZABÁLYOK ÉS ÖSSZEFÜGGÉSEK A TANANYAG ELEJÉN */}
      <div className="p-4 sm:p-5 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-amber-500/15 rounded-3xl border-2 border-amber-300 dark:border-amber-800/80 shadow-xs space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500 text-white shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-sm sm:text-base text-amber-950 dark:text-amber-200 uppercase tracking-wide">
              Fontos Szabályok és Összefüggések (Ezeket kell megjegyezned!)
            </h3>
            <p className="text-xs text-amber-800/80 dark:text-amber-400">
              A legfontosabb geometriai tételek és törvényszerűségek a gúlákról összefoglalva
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-amber-200 dark:border-amber-900/60 space-y-1">
            <div className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
              1. Csúcsok & Lapok:
            </div>
            <div className="font-mono font-black text-slate-800 dark:text-slate-100 text-sm">
              <MathText>C = L = n + 1</MathText>
            </div>
            <p className="text-[11px] text-slate-500">Minden gúlánál pontosan megegyezik a csúcsok és lapok száma!</p>
          </div>

          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-amber-200 dark:border-amber-900/60 space-y-1">
            <div className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
              2. Élek száma:
            </div>
            <div className="font-mono font-black text-slate-800 dark:text-slate-100 text-sm">
              <MathText>É = 2 · n</MathText>
            </div>
            <p className="text-[11px] text-slate-500">n alapél + n oldalél. A gúla éleinek száma MINDIG páros szám!</p>
          </div>

          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-amber-200 dark:border-amber-900/60 space-y-1">
            <div className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
              3. Euler-tétel:
            </div>
            <div className="font-mono font-black text-slate-800 dark:text-slate-100 text-sm">
              <MathText>C - É + L = 2</MathText>
            </div>
            <p className="text-[11px] text-slate-500">(n+1) - 2n + (n+1) = 2. Minden konvex poliéderre érvényes!</p>
          </div>

          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-amber-200 dark:border-amber-900/60 space-y-1">
            <div className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
              4. Kétféle magasság:
            </div>
            <div className="font-mono font-black text-slate-800 dark:text-slate-100 text-sm">
              <MathText>{'m \\text{ (test)} \\quad \\text{vs.} \\quad m_o \\text{ (oldallap)}'}</MathText>
            </div>
            <p className="text-[11px] text-slate-500">m a belső merőleges testmagasság, mo az oldalháromszög magassága!</p>
          </div>
        </div>
      </div>

      {/* 1. SZEKCIÓ: A GÚLA DEFINÍCIÓJA ÉS ALKOTÓELEMEI */}
      <TheorySection
        number={1}
        title="Mi a gúla? Alkotóelemek és Anatómia"
        icon={<Triangle className="w-5 h-5 text-amber-600" />}
        badge="Alapfogalmak"
        badgeColor="amber"
      >
        <div className="space-y-4">
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            A <strong>gúla</strong> (idegen szóval piramis) olyan térbeli geometriai test (poliéder),
            amelynek alaplapja egy tetszőleges sokszög, az oldallapjai pedig egyetlen közös pontban
            (a <strong>testcsúcsban</strong>) találkozó háromszögek.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TheoryCard
              title="A Gúla Részei és Jelölései"
              color="amber"
              icon={<Box className="w-5 h-5" />}
            >
              <ul className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2">
                <li>
                  <strong>Alaplap (<MathText>T_a</MathText>):</strong> Tetszőleges <MathText>n</MathText>-oldalú síkbeli sokszög (háromszög, négyszög, hatszög stb.).
                </li>
                <li>
                  <strong>Testcsúcs (<MathText>M</MathText>):</strong> A térbeli csúcspont, ahol az összes oldallap összefut.
                </li>
                <li>
                  <strong>Alapélek (<MathText>a</MathText>):</strong> Az alapsokszög határoló élei (<MathText>n</MathText> darab van belőlük).
                </li>
                <li>
                  <strong>Oldalélek (<MathText>b</MathText>):</strong> A testcsúcsot az alaplap csúcsaival összekötő szakaszok (<MathText>n</MathText> darab).
                </li>
                <li>
                  <strong>Oldallapok:</strong> A testcsúcsban találkozó háromszögek (<MathText>n</MathText> darab).
                </li>
                <li>
                  <strong>Palást (<MathText>T_p</MathText>):</strong> Az összes oldallap területének összege.
                </li>
              </ul>
            </TheoryCard>

            <TheoryCard
              title="A Két Kulcsfontosságú Magasság"
              color="rose"
              icon={<Ruler className="w-5 h-5" />}
            >
              <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-900">
                  <div className="font-bold text-rose-800 dark:text-rose-300 mb-1 flex items-center gap-1.5">
                    <Maximize2 className="w-4 h-4" />
                    Testmagasság (<MathText>m</MathText>):
                  </div>
                  <p>
                    A testcsúcsból (<MathText>M</MathText>) az <strong>alaplap síkjára</strong> bocsátott merőleges szakasz hossza. Ez adja meg a gúla valóságos térbeli magasságát!
                  </p>
                </div>

                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-900">
                  <div className="font-bold text-amber-800 dark:text-amber-300 mb-1 flex items-center gap-1.5">
                    <Triangle className="w-4 h-4" />
                    Oldallap-magasság (<MathText>m_o</MathText>):
                  </div>
                  <p>
                    Az oldalháromszög alapélhez tartozó magassága. Mindig az <strong>oldallap síkjában</strong> fekszik, és a palást területének kiszámításához nélkülözhetetlen!
                  </p>
                </div>
              </div>
            </TheoryCard>
          </div>

          <TheoryCallout title="Gúlák Nevezéktana az Alaplap Oldalszáma Szerint" color="amber">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs sm:text-sm">
              <div className="bg-white/80 dark:bg-slate-900/60 p-2.5 rounded-lg border border-amber-200 dark:border-amber-900 text-center">
                <div className="font-bold text-amber-800 dark:text-amber-300">Háromoldalú Gúla</div>
                <div className="text-slate-600 dark:text-slate-400 text-xs mt-1">Alaplapja háromszög. 4 lapja van, ezért <strong>tetraédernek</strong> is nevezzük.</div>
              </div>
              <div className="bg-white/80 dark:bg-slate-900/60 p-2.5 rounded-lg border border-amber-200 dark:border-amber-900 text-center">
                <div className="font-bold text-amber-800 dark:text-amber-300">Négyoldalú Gúla</div>
                <div className="text-slate-600 dark:text-slate-400 text-xs mt-1">Alaplapja négyszög (négyzet, téglalap, rombusz). Pl. Egyiptomi piramisok.</div>
              </div>
              <div className="bg-white/80 dark:bg-slate-900/60 p-2.5 rounded-lg border border-amber-200 dark:border-amber-900 text-center">
                <div className="font-bold text-amber-800 dark:text-amber-300">Sokoldalú Gúla</div>
                <div className="text-slate-600 dark:text-slate-400 text-xs mt-1">Alaplapja ötszög, hatszög, nyolcszög stb. Oldallapjai mindig háromszögek!</div>
              </div>
            </div>
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: SZABÁLYOS GÚLÁK */}
      <TheorySection
        number={2}
        title="A Szabályos Gúlák és Tulajdonságaik"
        icon={<Sparkles className="w-5 h-5 text-indigo-600" />}
        badge="Szabályos Testek"
        badgeColor="indigo"
      >
        <div className="space-y-4">
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            Egy gúlát akkor nevezünk <strong>szabályosnak</strong>, ha teljesül rá az alábbi két szigorú feltétel:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl border border-indigo-200 dark:border-indigo-800 space-y-2">
              <div className="flex items-center gap-2 font-black text-sm text-indigo-800 dark:text-indigo-300">
                <span className="w-6 h-6 rounded-full bg-indigo-200 dark:bg-indigo-900 flex items-center justify-center text-xs">1</span>
                Szabályos Alapsokszög
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                Az alaplapja <strong>szabályos sokszög</strong>: egyenlő oldalú háromszög, négyzet, szabályos ötszög, szabályos hatszög stb.
              </p>
            </div>

            <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl border border-indigo-200 dark:border-indigo-800 space-y-2">
              <div className="flex items-center gap-2 font-black text-sm text-indigo-800 dark:text-indigo-300">
                <span className="w-6 h-6 rounded-full bg-indigo-200 dark:bg-indigo-900 flex items-center justify-center text-xs">2</span>
                Középpont feletti Testcsúcs
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                A testcsúcs merőleges vetülete pontosan az <strong>alaplap középpontjába</strong> (körülírt és beírt kör középpontjába) esik.
              </p>
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              A szabályos gúlák legfontosabb geometriai következményei:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-700">
                <strong className="text-indigo-700 dark:text-indigo-400 block mb-1">Egyenlő Oldalélek:</strong>
                Minden oldalél hossza egyenlő: <MathText>b_1 = b_2 = \dots = b_n = b</MathText>.
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-700">
                <strong className="text-indigo-700 dark:text-indigo-400 block mb-1">Egybevágó Oldallapok:</strong>
                Minden oldallap egybevágó <strong>egyenlő szárú háromszög</strong>!
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-700">
                <strong className="text-indigo-700 dark:text-indigo-400 block mb-1">Egyenlő Magasságok:</strong>
                Minden oldallap magassága egyenlő hosszú (<MathText>m_o</MathText>).
              </div>
            </div>
          </div>

          <TheoryTrapBox
            title="Szabályos gúla oldallapja NEM feltétlenül szabályos háromszög!"
            mistake="Azt hinni, hogy a szabályos gúla oldallapjai szabályos (egyenlő oldalú) háromszögek."
            correction="A szabályos gúla oldallapjai általában EGYENLŐ SZÁRÚ háromszögek, ahol az oldalél (b) nem feltétlenül egyenlő az alapéllel (a)."
            explanation="Csak a szabályos tetraéder esetén szabályos háromszög az oldallap is (ekkor a = b). Minden más szabályos gúlánál az oldalél hossza a gúla testmagasságától függ!"
          />
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: DERÉKSZÖGŰ HÁROMSZÖGEK A GÚLÁBAN */}
      <TheorySection
        number={3}
        title="Derékszögű Háromszögek a Gúlában (Pitagorasz-összefüggések)"
        icon={<Calculator className="w-5 h-5 text-emerald-600" />}
        badge="Pitagorasz a Térben"
        badgeColor="emerald"
      >
        <div className="space-y-4">
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            A térgeometria és gúlaszámítások legnagyobb titka: a szabályos gúlák belsejében és felületén
            <strong> derékszögű háromszögek rejtőznek</strong>! A Pitagorasz-tétel segítségével ha ismerünk két adatot,
            a harmadik azonnal kiszámítható.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1. Háromszög: m, a/2, mo */}
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-2.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 font-black text-xs text-emerald-900 dark:text-emerald-300 uppercase tracking-wide">
                  <span className="w-5 h-5 rounded-md bg-emerald-200 dark:bg-emerald-800 flex items-center justify-center text-[10px]">1</span>
                  Belső Derékszögű Háromszög
                </div>
                <h5 className="font-bold text-slate-800 dark:text-slate-100 text-sm mt-1">
                  Testmagasság és Oldallap-magasság
                </h5>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Befogók: <MathText>m</MathText> és <MathText>a/2</MathText>.<br />
                  Átfogó: <MathText>m_o</MathText> (oldallap-magasság).
                </p>
              </div>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-emerald-300 dark:border-emerald-700 text-center font-mono font-bold text-emerald-700 dark:text-emerald-300 text-sm">
                <MathText>{'m^2 + (\\frac{a}{2})^2 = m_o^2'}</MathText>
              </div>
            </div>

            {/* 2. Háromszög: mo, a/2, b */}
            <div className="p-4 bg-cyan-50 dark:bg-cyan-950/40 rounded-2xl border border-cyan-200 dark:border-cyan-800 space-y-2.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 font-black text-xs text-cyan-900 dark:text-cyan-300 uppercase tracking-wide">
                  <span className="w-5 h-5 rounded-md bg-cyan-200 dark:bg-cyan-800 flex items-center justify-center text-[10px]">2</span>
                  Oldallapon Fekvő Háromszög
                </div>
                <h5 className="font-bold text-slate-800 dark:text-slate-100 text-sm mt-1">
                  Oldallap-magasság és Oldalél
                </h5>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Befogók: <MathText>m_o</MathText> és <MathText>a/2</MathText>.<br />
                  Átfogó: <MathText>b</MathText> (oldalél).
                </p>
              </div>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-cyan-300 dark:border-cyan-700 text-center font-mono font-bold text-cyan-700 dark:text-cyan-300 text-sm">
                <MathText>{'m_o^2 + (\\frac{a}{2})^2 = b^2'}</MathText>
              </div>
            </div>

            {/* 3. Háromszög: m, d/2, b */}
            <div className="p-4 bg-purple-50 dark:bg-purple-950/40 rounded-2xl border border-purple-200 dark:border-purple-800 space-y-2.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 font-black text-xs text-purple-900 dark:text-purple-300 uppercase tracking-wide">
                  <span className="w-5 h-5 rounded-md bg-purple-200 dark:bg-purple-800 flex items-center justify-center text-[10px]">3</span>
                  Átlós Metszet Háromszöge
                </div>
                <h5 className="font-bold text-slate-800 dark:text-slate-100 text-sm mt-1">
                  Testmagasság és Oldalél
                </h5>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Befogók: <MathText>m</MathText> és <MathText>d/2</MathText> (<MathText>a√2 / 2</MathText>).<br />
                  Átfogó: <MathText>b</MathText> (oldalél).
                </p>
              </div>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-purple-300 dark:border-purple-700 text-center font-mono font-bold text-purple-700 dark:text-purple-300 text-sm">
                <MathText>{'m^2 + (\\frac{d}{2})^2 = b^2'}</MathText>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-4 text-xs sm:text-sm">
            <div className="p-3 bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 rounded-2xl shrink-0">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="font-bold text-slate-900 dark:text-slate-100">
                Példa számolásra: Négyzet alapú gúla (<MathText>{'a = 6\\text{ cm}, m = 4\\text{ cm}'}</MathText>)
              </div>
              <div className="text-slate-600 dark:text-slate-400">
                1. Az alapél fele: <MathText>{'a/2 = 3\\text{ cm}'}</MathText>.<br />
                2. Oldallap-magasság: <MathText>{'m_o = \\sqrt{4^2 + 3^2} = \\sqrt{16 + 9} = \\sqrt{25} = 5\\text{ cm}'}</MathText>.<br />
                3. Oldalél: <MathText>{'b = \\sqrt{5^2 + 3^2} = \\sqrt{25 + 9} = \\sqrt{34} \\approx 5,83\\text{ cm}'}</MathText>.
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: GÚLAHÁLÓK */}
      <TheorySection
        number={4}
        title="A Gúla Hálója (Kiterítés Síkba)"
        icon={<Compass className="w-5 h-5 text-sky-600" />}
        badge="Szerkesztés & Hálók"
        badgeColor="sky"
      >
        <div className="space-y-4">
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            A gúla <strong>hálója</strong> a határoló lapok síkbeli kiterítése, amelyet ha a közös élek mentén
            megfelelően összehajtunk, hiánytalanul és átfedés nélkül visszakapjuk a testet.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-sky-50 dark:bg-sky-950/40 rounded-2xl border border-sky-200 dark:border-sky-800 space-y-3">
              <h4 className="font-bold text-sky-900 dark:text-sky-200 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                Hogyan épül fel a gúla hálója?
              </h4>
              <ul className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2 list-disc list-inside">
                <li>
                  Tartalmaz <strong>1 darab alapsokszöget</strong> (háromszög, négyzet, sokszög).
                </li>
                <li>
                  Tartalmaz <strong><MathText>n</MathText> darab háromszöget</strong> (a palást oldallapjait).
                </li>
                <li>
                  A leggyakoribb a <strong>csillag alakú háló</strong>: a középen fekvő alapsokszög minden éléhez kifelé egy-egy háromszög csatlakozik.
                </li>
                <li>
                  Lehetséges a <strong>láncszerű háló</strong> is: ahol a háromszögek egymás mellett fekszenek a száruknál összeérve, és az alaplap az egyik aljához csatlakozik.
                </li>
              </ul>
            </div>

            <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800 space-y-3">
              <h4 className="font-bold text-amber-900 dark:text-amber-200 text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Mikor hajtható össze gúlává? (Összehajthatósági feltételek)
              </h4>
              <ul className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2 list-disc list-inside">
                <li>
                  <strong>Szomszédos oldalélek egyezése:</strong> Az összehajtáskor egymáshoz érő oldaléleknek pontosan egyenlő hosszúaknak kell lenniük!
                </li>
                <li>
                  <strong>Magassági feltétel:</strong> A háromszögek magasságának akkorának kell lennie, hogy összehajtva a testcsúcs az alaplap felett egy pontban találkozzon.
                </li>
                <li>
                  <strong>Nincs átfedés:</strong> A lapok nem fedhetik egymást a térben.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: EULER-FÉLE POLIÉDER-TÉTEL */}
      <TheorySection
        number={5}
        title="Euler-féle Poliéder-tétel Gúlákra"
        icon={<Calculator className="w-5 h-5 text-violet-600" />}
        badge="Euler-tétel"
        badgeColor="violet"
      >
        <div className="space-y-4">
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            Leonhard Euler híres 18. századi tétele minden konvex térbeli poliéderre kimondja, hogy
            a csúcsok (<MathText>C</MathText>), lapok (<MathText>L</MathText>) és élek (<MathText>É</MathText>) száma
            között szigorú törvényszerűség áll fenn:
          </p>

          <div className="my-3 p-4 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-2xl text-white text-center shadow-lg space-y-1">
            <div className="text-xs uppercase tracking-wider font-bold opacity-80">Euler-tétel alapegyenlete:</div>
            <div className="text-xl sm:text-2xl font-mono font-black">
              <MathText>{'C - É + L = 2'}</MathText>
            </div>
            <div className="text-xs opacity-90">(Csúcsok száma - Élek száma + Lapok száma = 2)</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-violet-50 dark:bg-violet-950/40 rounded-2xl border border-violet-200 dark:border-violet-800 space-y-3">
              <h4 className="font-bold text-violet-900 dark:text-violet-200 text-sm">
                Egy <MathText>n</MathText>-oldalú gúla képletei:
              </h4>
              <ul className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2">
                <li>
                  <strong>Csúcsok száma (<MathText>C</MathText>):</strong> <MathText>C = n + 1</MathText><br />
                  <span className="text-xs text-slate-500">1 testcsúcs felül + <MathText>n</MathText> csúcs az alaplapon.</span>
                </li>
                <li>
                  <strong>Lapok száma (<MathText>L</MathText>):</strong> <MathText>L = n + 1</MathText><br />
                  <span className="text-xs text-slate-500">1 alapsokszög + <MathText>n</MathText> háromszög oldallap.</span>
                </li>
                <li>
                  <strong>Élek száma (<MathText>É</MathText>):</strong> <MathText>É = 2n</MathText><br />
                  <span className="text-xs text-slate-500"><MathText>n</MathText> alapél az alaplapon + <MathText>n</MathText> oldalél a paláston.</span>
                </li>
                <li className="pt-2 border-t border-violet-200 dark:border-violet-800 font-bold text-violet-800 dark:text-violet-300">
                  Ellenőrzés: <MathText>{'(n + 1) - 2n + (n + 1) = 2'}</MathText> (Mindig pontosan 2!)
                </li>
              </ul>
            </div>

            {/* Interaktív Euler-kalkulátor */}
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center justify-between">
                <span>Interaktív Euler-Kalkulátor</span>
                <span className="text-xs text-indigo-600 font-normal">Próbáld ki!</span>
              </h4>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
                  <span>Alapsokszög oldalszáma (<MathText>n</MathText>):</span>
                  <span className="font-bold text-indigo-600">{eulerN}-oldalú gúla</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {[3, 4, 5, 6, 8].map((num) => (
                    <Button
                      key={num}
                      size="sm"
                      variant={eulerN === num ? 'default' : 'outline'}
                      onClick={() => setEulerN(num)}
                      className={num === eulerN ? 'bg-indigo-600 text-white font-bold' : ''}
                    >
                      {num}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1.5 text-xs font-mono">
                <div className="flex justify-between">
                  <span>Csúcsok (C = n + 1):</span>
                  <strong className="text-blue-600">{eulerC}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Lapok (L = n + 1):</span>
                  <strong className="text-emerald-600">{eulerL}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Élek (É = 2 · n):</span>
                  <strong className="text-rose-600">{eulerE}</strong>
                </div>
                <div className="pt-1.5 border-t border-slate-200 dark:border-slate-700 flex justify-between font-bold text-indigo-700 dark:text-indigo-300">
                  <span>C - É + L:</span>
                  <span>{eulerC} - {eulerE} + {eulerL} = {eulerCheck}</span>
                </div>
              </div>

              <div className="text-[11px] text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 p-2 rounded-lg border border-amber-200 dark:border-amber-900">
                ⭐ <strong>Arany szabály:</strong> Minden gúlára igaz, hogy <strong><MathText>C = L</MathText></strong> (a csúcsok és lapok száma pontosan megegyezik)!
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 6. SZEKCIÓ: INTERAKTÍV GÚLA LABOR ÉS VIZUALIZÁCIÓ */}
      <TheorySection
        number={6}
        title="Interaktív Gúla Laboratórium"
        icon={<Sliders className="w-5 h-5 text-indigo-600" />}
        badge="Kísérletezz!"
        badgeColor="indigo"
      >
        <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={labSolid === 'square' ? 'default' : 'outline'}
                onClick={() => setLabSolid('square')}
                className={labSolid === 'square' ? 'bg-amber-600 hover:bg-amber-700 text-white font-bold' : ''}
              >
                Négyzet alapú szabályos gúla
              </Button>
              <Button
                size="sm"
                variant={labSolid === 'tetra' ? 'default' : 'outline'}
                onClick={() => setLabSolid('tetra')}
                className={labSolid === 'tetra' ? 'bg-amber-600 hover:bg-amber-700 text-white font-bold' : ''}
              >
                Szabályos tetraéder
              </Button>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Eye className="w-4 h-4 text-indigo-500" />
              <span>Dinamikus 3D ábrázolás és Pitagorasz-levezetés</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* SVG Gúla Vizualizáció - Váltás Négyzet alapú és Szabályos tetraéder között */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
              {labSolid === 'square' ? (
                /* NÉGYZET ALAPÚ SZABÁLYOS GÚLA 3D RAJZA */
                <svg viewBox="0 0 320 260" className="w-full max-w-[280px] h-auto overflow-visible">
                  <defs>
                    <linearGradient id="pyrFaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#d97706" stopOpacity="0.15" />
                    </linearGradient>
                    <linearGradient id="pyrFaceGradRight" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#b45309" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#78350f" stopOpacity="0.25" />
                    </linearGradient>
                  </defs>

                  {/* Alaplap: A(50, 190), B(190, 220), C(270, 180), D(130, 150) */}
                  {/* Hátsó szaggatott élek */}
                  <line x1="50" y1="190" x2="130" y2="150" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" />
                  <line x1="130" y1="150" x2="270" y2="180" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" />
                  {/* Hátsó oldalél: M(160, 40) -> D(130, 150) */}
                  <line x1="160" y1="40" x2="130" y2="150" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" />

                  {/* Alaplap középpontja O: (160, 185) */}
                  {/* Testmagasság: M(160, 40) -> O(160, 185) */}
                  <line
                    x1="160"
                    y1="40"
                    x2="160"
                    y2="185"
                    stroke={highlightPart === 'm' || highlightPart === 'all' ? '#dc2626' : '#cbd5e1'}
                    strokeWidth={highlightPart === 'm' ? '3' : '2'}
                    strokeDasharray="4 2"
                  />

                  {/* Alapél fele szakasz az alapon: O(160, 185) -> P(120, 205) [AB felezője kb] */}
                  <line x1="160" y1="185" x2="120" y2="205" stroke="#2563eb" strokeWidth="2" strokeDasharray="3 2" />

                  {/* Oldallap-magasság mo: M(160, 40) -> P(120, 205) */}
                  <line
                    x1="160"
                    y1="40"
                    x2="120"
                    y2="205"
                    stroke={highlightPart === 'mo' || highlightPart === 'all' ? '#16a34a' : '#cbd5e1'}
                    strokeWidth={highlightPart === 'mo' ? '3' : '2'}
                  />

                  {/* Első lapok kitöltése (félig áttetsző) */}
                  {/* Bal elülső oldallap: M(160, 40), A(50, 190), B(190, 220) */}
                  <polygon points="160,40 50,190 190,220" fill="url(#pyrFaceGrad)" />
                  {/* Jobb elülső oldallap: M(160, 40), B(190, 220), C(270, 180) */}
                  <polygon points="160,40 190,220 270,180" fill="url(#pyrFaceGradRight)" />

                  {/* Elülső folytonos élek */}
                  {/* Alapélek */}
                  <line x1="50" y1="190" x2="190" y2="220" stroke="#f59e0b" strokeWidth="2.5" />
                  <line x1="190" y1="220" x2="270" y2="180" stroke="#f59e0b" strokeWidth="2.5" />
                  {/* Oldalélek */}
                  <line
                    x1="160"
                    y1="40"
                    x2="50"
                    y2="190"
                    stroke={highlightPart === 'b' ? '#9333ea' : '#d97706'}
                    strokeWidth={highlightPart === 'b' ? '3.5' : '2.5'}
                  />
                  <line
                    x1="160"
                    y1="40"
                    x2="190"
                    y2="220"
                    stroke={highlightPart === 'b' ? '#9333ea' : '#d97706'}
                    strokeWidth={highlightPart === 'b' ? '3.5' : '2.5'}
                  />
                  <line
                    x1="160"
                    y1="40"
                    x2="270"
                    y2="180"
                    stroke={highlightPart === 'b' ? '#9333ea' : '#d97706'}
                    strokeWidth={highlightPart === 'b' ? '3.5' : '2.5'}
                  />

                  {/* Csúcsok jelölése */}
                  <circle cx="160" cy="40" r="4.5" fill="#ef4444" />
                  <text x="160" y="28" textAnchor="middle" className="text-[12px] font-black fill-red-600 font-mono">M (testcsúcs)</text>

                  <circle cx="50" cy="190" r="3" fill="#64748b" />
                  <text x="35" y="195" textAnchor="middle" className="text-[10px] font-bold fill-slate-600">A</text>

                  <circle cx="190" cy="220" r="3" fill="#64748b" />
                  <text x="195" y="235" textAnchor="middle" className="text-[10px] font-bold fill-slate-600">B</text>

                  <circle cx="270" cy="180" r="3" fill="#64748b" />
                  <text x="282" y="185" textAnchor="middle" className="text-[10px] font-bold fill-slate-600">C</text>

                  {/* Magasságok feliratai */}
                  <text x="172" y="120" className="text-[10px] font-mono font-black fill-red-600">m = {heightM}</text>
                  <text x="120" y="115" className="text-[10px] font-mono font-black fill-emerald-600">mo = {sideHeightMo.toFixed(2)}</text>
                  <text x="100" y="222" className="text-[10px] font-mono font-black fill-blue-600">a/2 = {halfA}</text>
                  <text x="235" y="125" className="text-[10px] font-mono font-black fill-purple-600">b = {sideEdgeB.toFixed(2)}</text>
                </svg>
              ) : (
                /* SZABÁLYOS TETRAÉDER 3D RAJZA */
                <svg viewBox="0 0 320 260" className="w-full max-w-[280px] h-auto overflow-visible">
                  <defs>
                    <linearGradient id="tetraFaceGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#d97706" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="tetraFaceGradRight" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#b45309" stopOpacity="0.55" />
                      <stop offset="100%" stopColor="#78350f" stopOpacity="0.25" />
                    </linearGradient>
                  </defs>

                  {/* Hátsó szaggatott alapél A(60, 205) -> C(265, 175) */}
                  <line x1="60" y1="205" x2="265" y2="175" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" />

                  {/* Alaplap vetületi súlypontja O: (173, 203) */}
                  {/* Testmagasság m: M(160, 45) -> O(173, 203) */}
                  <line
                    x1="160"
                    y1="45"
                    x2="173"
                    y2="203"
                    stroke={highlightPart === 'm' || highlightPart === 'all' ? '#dc2626' : '#cbd5e1'}
                    strokeWidth={highlightPart === 'm' ? '3' : '2'}
                    strokeDasharray="4 2"
                  />

                  {/* Belső sugár r az alapon: O(173, 203) -> P(127.5, 217.5) [AB felezője] */}
                  <line x1="173" y1="203" x2="127.5" y2="217.5" stroke="#2563eb" strokeWidth="2" strokeDasharray="3 2" />

                  {/* Oldallap-magasság mo: M(160, 45) -> P(127.5, 217.5) */}
                  <line
                    x1="160"
                    y1="45"
                    x2="127.5"
                    y2="217.5"
                    stroke={highlightPart === 'mo' || highlightPart === 'all' ? '#16a34a' : '#cbd5e1'}
                    strokeWidth={highlightPart === 'mo' ? '3' : '2'}
                  />

                  {/* Lapkitöltések */}
                  {/* Bal oldallap: M(160, 45), A(60, 205), B(195, 230) */}
                  <polygon points="160,45 60,205 195,230" fill="url(#tetraFaceGradLeft)" />
                  {/* Jobb oldallap: M(160, 45), B(195, 230), C(265, 175) */}
                  <polygon points="160,45 195,230 265,175" fill="url(#tetraFaceGradRight)" />

                  {/* Elülső folytonos alapélek */}
                  <line x1="60" y1="205" x2="195" y2="230" stroke="#f59e0b" strokeWidth="2.5" />
                  <line x1="195" y1="230" x2="265" y2="175" stroke="#f59e0b" strokeWidth="2.5" />

                  {/* Oldalélek M-ből */}
                  <line
                    x1="160"
                    y1="45"
                    x2="60"
                    y2="205"
                    stroke={highlightPart === 'b' ? '#9333ea' : '#d97706'}
                    strokeWidth={highlightPart === 'b' ? '3.5' : '2.5'}
                  />
                  <line
                    x1="160"
                    y1="45"
                    x2="195"
                    y2="230"
                    stroke={highlightPart === 'b' ? '#9333ea' : '#d97706'}
                    strokeWidth={highlightPart === 'b' ? '3.5' : '2.5'}
                  />
                  <line
                    x1="160"
                    y1="45"
                    x2="265"
                    y2="175"
                    stroke={highlightPart === 'b' ? '#9333ea' : '#d97706'}
                    strokeWidth={highlightPart === 'b' ? '3.5' : '2.5'}
                  />

                  {/* Csúcsok */}
                  <circle cx="160" cy="45" r="4.5" fill="#ef4444" />
                  <text x="160" y="32" textAnchor="middle" className="text-[12px] font-black fill-red-600 font-mono">M (testcsúcs)</text>

                  <circle cx="60" cy="205" r="3" fill="#64748b" />
                  <text x="45" y="210" textAnchor="middle" className="text-[10px] font-bold fill-slate-600">A</text>

                  <circle cx="195" cy="230" r="3" fill="#64748b" />
                  <text x="200" y="245" textAnchor="middle" className="text-[10px] font-bold fill-slate-600">B</text>

                  <circle cx="265" cy="175" r="3" fill="#64748b" />
                  <text x="277" y="180" textAnchor="middle" className="text-[10px] font-bold fill-slate-600">C</text>

                  {/* Feliratok */}
                  <text x="180" y="125" className="text-[10px] font-mono font-black fill-red-600">m = {tetraM.toFixed(2)}</text>
                  <text x="125" y="125" className="text-[10px] font-mono font-black fill-emerald-600">mo = {tetraMo.toFixed(2)}</text>
                  <text x="110" y="228" className="text-[10px] font-mono font-black fill-blue-600">r = {tetraR.toFixed(2)}</text>
                  <text x="235" y="115" className="text-[10px] font-mono font-black fill-purple-600">a = {tetraA}</text>
                </svg>
              )}

              <div className="flex gap-1.5 mt-3 flex-wrap justify-center">
                <Button
                  size="xs"
                  variant={highlightPart === 'all' ? 'default' : 'outline'}
                  onClick={() => setHighlightPart('all')}
                  className="text-[11px]"
                >
                  Mind
                </Button>
                <Button
                  size="xs"
                  variant={highlightPart === 'm' ? 'default' : 'outline'}
                  onClick={() => setHighlightPart('m')}
                  className="text-[11px] text-red-600 border-red-200"
                >
                  Testmagasság (m)
                </Button>
                <Button
                  size="xs"
                  variant={highlightPart === 'mo' ? 'default' : 'outline'}
                  onClick={() => setHighlightPart('mo')}
                  className="text-[11px] text-emerald-600 border-emerald-200"
                >
                  Oldallap-magasság (mo)
                </Button>
                <Button
                  size="xs"
                  variant={highlightPart === 'b' ? 'default' : 'outline'}
                  onClick={() => setHighlightPart('b')}
                  className="text-[11px] text-purple-600 border-purple-200"
                >
                  Oldalél ({labSolid === 'tetra' ? 'a = b' : 'b'})
                </Button>
              </div>
            </div>

            {/* Szabályozók és Értékek */}
            <div className="lg:col-span-6 space-y-4">
              {labSolid === 'square' ? (
                /* NÉGYZET ALAPÚ GÚLA VEZÉRLŐI ÉS SZÁMÍTÁSAI */
                <>
                  <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                    <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center justify-between">
                      <span>Négyzet Alapú Gúla Méretei:</span>
                      <span className="text-xs text-amber-600 font-mono">cm dimenzióban</span>
                    </h4>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
                        <span>Alapél (<MathText>a</MathText>):</span>
                        <span className="font-bold text-amber-600">{edgeA} cm</span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="12"
                        step="1"
                        value={edgeA}
                        onChange={(e) => setEdgeA(Number(e.target.value))}
                        className="w-full accent-amber-600"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
                        <span>Testmagasság (<MathText>m</MathText>):</span>
                        <span className="font-bold text-red-600">{heightM} cm</span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="10"
                        step="1"
                        value={heightM}
                        onChange={(e) => setHeightM(Number(e.target.value))}
                        className="w-full accent-red-600"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-300 dark:border-amber-800 space-y-2 text-xs font-mono">
                    <div className="font-bold text-amber-900 dark:text-amber-200 text-sm font-sans mb-1">
                      Számított értékek (Pitagorasz alapján):
                    </div>
                    <div className="flex justify-between">
                      <span>Alaplap területe (Ta = a²):</span>
                      <strong>{edgeA * edgeA} cm²</strong>
                    </div>
                    <div className="flex justify-between text-emerald-700 dark:text-emerald-300">
                      <span>Oldallap-magasság (mo):</span>
                      <strong>√( {heightM}² + {halfA}² ) = {sideHeightMo.toFixed(2)} cm</strong>
                    </div>
                    <div className="flex justify-between text-purple-700 dark:text-purple-300">
                      <span>Oldalél hossza (b):</span>
                      <strong>√( {sideHeightMo.toFixed(2)}² + {halfA}² ) = {sideEdgeB.toFixed(2)} cm</strong>
                    </div>
                    <div className="flex justify-between text-blue-700 dark:text-blue-300">
                      <span>Alaplap átlója (d = a√2):</span>
                      <strong>{baseDiag.toFixed(2)} cm</strong>
                    </div>
                    <div className="pt-2 border-t border-amber-200 dark:border-amber-800 flex justify-between font-bold text-slate-900 dark:text-slate-100 font-sans">
                      <span>Egy oldallap területe:</span>
                      <span>(a · mo) / 2 = {((edgeA * sideHeightMo) / 2).toFixed(2)} cm²</span>
                    </div>
                  </div>
                </>
              ) : (
                /* SZABÁLYOS TETRAÉDER VEZÉRLŐI ÉS SZÁMÍTÁSAI */
                <>
                  <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                    <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center justify-between">
                      <span>Szabályos Tetraéder Élhossza:</span>
                      <span className="text-xs text-amber-600 font-mono">cm dimenzióban</span>
                    </h4>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
                        <span>Minden él hossza (<MathText>a = b</MathText>):</span>
                        <span className="font-bold text-amber-600">{tetraA} cm</span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="12"
                        step="1"
                        value={tetraA}
                        onChange={(e) => setTetraA(Number(e.target.value))}
                        className="w-full accent-amber-600"
                      />
                    </div>

                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      💡 <strong>Megjegyzés:</strong> A szabályos tetraéder mind a 4 lapja egybevágó szabályos (egyenlő oldalú) háromszög, ezért minden magasság, él és felszín közvetlenül az <MathText>a</MathText> élhosszból adódik!
                    </p>
                  </div>

                  <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-300 dark:border-amber-800 space-y-2 text-xs font-mono">
                    <div className="font-bold text-amber-900 dark:text-amber-200 text-sm font-sans mb-1">
                      Szabályos tetraéder számításai:
                    </div>
                    <div className="flex justify-between">
                      <span>1 lap területe (Ta = a²√3 / 4):</span>
                      <strong>{tetraBaseArea.toFixed(2)} cm²</strong>
                    </div>
                    <div className="flex justify-between text-emerald-700 dark:text-emerald-300">
                      <span>Oldallap-magasság (mo = a√3 / 2):</span>
                      <strong>{tetraMo.toFixed(2)} cm</strong>
                    </div>
                    <div className="flex justify-between text-blue-700 dark:text-blue-300">
                      <span>Belső távolság az alapon (r = a√3 / 6):</span>
                      <strong>{tetraR.toFixed(2)} cm</strong>
                    </div>
                    <div className="flex justify-between text-red-700 dark:text-red-300">
                      <span>Testmagasság (m = a√6 / 3):</span>
                      <strong>{tetraM.toFixed(2)} cm</strong>
                    </div>
                    <div className="flex justify-between text-purple-700 dark:text-purple-300 font-bold">
                      <span>Teljes felszín (A = 4 · Ta = a²√3):</span>
                      <strong>{tetraTotalArea.toFixed(2)} cm²</strong>
                    </div>
                    <div className="flex justify-between text-indigo-700 dark:text-indigo-300">
                      <span>Térfogat (V = a³√2 / 12):</span>
                      <strong>{tetraVol.toFixed(2)} cm³</strong>
                    </div>
                    <div className="pt-2 border-t border-amber-200 dark:border-amber-800 flex justify-between font-bold text-slate-900 dark:text-slate-100 font-sans text-[11px]">
                      <span>Pitagorasz-ellenőrzés:</span>
                      <span>m² + r² = {Math.pow(tetraM, 2).toFixed(1)} + {Math.pow(tetraR, 2).toFixed(1)} = {Math.pow(tetraMo, 2).toFixed(1)} = mo² ✓</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 7. SZEKCIÓ: ÖSSZEFOGLALÓ TÁBLÁZAT ÉS KÉPLETTÁR */}
      <section className="space-y-4">
        <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-amber-600" />
          Gúlák Összegző Képlettára
        </h3>
        <TheoryTable
          headers={['Gúla Típusa', 'Alaplap (Ta)', 'Csúcsok (C)', 'Lapok (L)', 'Élek (É)', 'Euler (C - É + L)']}
          rows={[
            ['Háromoldalú (Tetraéder)', 'Háromszög', '4', '4', '6', '4 - 6 + 4 = 2'],
            ['Négyzet alapú gúla', 'Négyzet (a²)', '5', '5', '8', '5 - 8 + 5 = 2'],
            ['Téglalap alapú gúla', 'Téglalap (a · b)', '5', '5', '8', '5 - 8 + 5 = 2'],
            ['Ötoldalú gúla', 'Ötszög', '6', '6', '10', '6 - 10 + 6 = 2'],
            ['Hatszög alapú gúla', 'Hatszög (6 · (a²√3)/4)', '7', '7', '12', '7 - 12 + 7 = 2'],
            ['n-oldalú tetszőleges gúla', 'n-oldalú sokszög', 'n + 1', 'n + 1', '2n', '(n+1) - 2n + (n+1) = 2']
          ]}
        />
      </section>
    </TheoryTemplate>
  );
};

export default PyramidsTheory;
