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
  MixingBeakersSvg,
  ParallelFlowTubesSvg,
  DilutionStepsSvg,
  TechnicalFormulaBridgeSvg,
  LabBalanceBeakerSvg
} from './LabDevelopmentFigures';
import {
  FlaskConical,
  Gauge,
  Sliders,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  RotateCcw,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Zap,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LabDevelopmentTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const LabDevelopmentTheory: React.FC<LabDevelopmentTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- 1. Interaktív Oldatkeverő Állapot ---
  const [m1, setM1] = useState<number>(200);
  const [w1, setW1] = useState<number>(10);
  const [m2, setM2] = useState<number>(300);
  const [w2, setW2] = useState<number>(30);

  const dissolved1 = (m1 * w1) / 100;
  const dissolved2 = (m2 * w2) / 100;
  const totalMass = m1 + m2;
  const totalDissolved = dissolved1 + dissolved2;
  const newConcentration = totalMass > 0 ? (totalDissolved / totalMass) * 100 : 0;

  // --- 2. Interaktív Csapfeltöltési Állapot ---
  const [tap1, setTap1] = useState<number>(3);
  const [tap2, setTap2] = useState<number>(6);
  const combinedTime = tap1 > 0 && tap2 > 0 ? (tap1 * tap2) / (tap1 + tap2) : 0;

  return (
    <TheoryTemplate
      title="Ráadás: Laboratóriumi fejlesztések és műszaki modellek"
      subtitle="10. osztály • VIII. Témakör • Ráadás lecke: Keverési és hígítási feladatok, együttes munkavégzés, műszaki és fizikai képletek algebrai modelljei"
      badge="10. OSZTÁLY • VIII. EGYENLETEK ÉS EGYENLŐTLENSÉGEK • TANANYAG"
      themeColor="emerald"
      topicId="g10-eq-laboratoriumi-fejlesztesek-theory"
      quickRule={{
        label: 'A LABORATÓRIUMI MODELLEZÉS ARANYSZABÁLYAI',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80">
              <span className="text-xs font-black text-emerald-900 dark:text-emerald-200 block mb-1">
                ✓ Két alapvető megmaradási és egyensúlyi modell:
              </span>
              <ul className="text-xs space-y-1 text-slate-700 dark:text-slate-300 font-medium list-none">
                <li>• <strong>Anyagmérleg (Keverési törvény):</strong> m₁ · w₁ + m₂ · w₂ = (m₁ + m₂) · w_új</li>
                <li>• <strong>Közös munkavégzés (Teljesítmények összege):</strong> 1/t₁ + 1/t₂ = 1/T_együtt ⟹ T = (t₁ · t₂) / (t₁ + t₂)</li>
              </ul>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/50 text-teal-900 dark:text-teal-200">
                <span className="font-bold text-teal-700 dark:text-teal-300 block mb-0.5">💧 Speciális esetek:</span>
                <span>Víz hozzáadása: w = 0%. Tiszta só/sav: w = 100%. Víz elpárologtatása: - m_víz.</span>
              </div>
              <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-200">
                <span className="font-bold text-amber-700 dark:text-amber-300 block mb-0.5">⚠ Fizikai korlátok:</span>
                <span>Tömeg m &gt; 0, idő t &gt; 0, 0 ≤ w ≤ 100%. Negatív gyökök fizikailag nem értelmezhetők!</span>
              </div>
            </div>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* ==========================================
          1. SZEKCIÓ: KEVERÉSI FELADATOK ÉS AZ ANYAGMÉRLEG
      ========================================== */}
      <TheorySection
        title="1. Keverési és hígítási feladatok: Az anyagmérleg módszere"
        subtitle="Hogyan írható fel egyenlettel az oldatok és ötvözetek koncentrációja?"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-4">
            <TheoryCard title="Tömegszázalék és oldott anyag">
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-3">
                A kémiai és biológiai laboratóriumokban, valamint az élelmiszer- és gyógyszeriparban az egyik leggyakoribb
                matematikai feladat az oldatok hígítása, töményítése vagy keverése.
              </p>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm text-emerald-950 dark:text-emerald-200 space-y-1">
                <div className="font-bold">A tömegszázalék (w%) definíciója:</div>
                <div className="font-mono">
                  w = (m_oldott / m_oldat) · 100% ⟺ m_oldott = m_oldat · (w / 100)
                </div>
              </div>

              <TheoryCallout type="definition" title="Az Anyagmérleg Törvénye">
                Két vagy több oldat összeöntésekor két dolog marad meg:
                <ol className="mt-1.5 list-decimal list-inside space-y-1 font-medium">
                  <li><strong>Az oldat össztömege:</strong> m_össz = m₁ + m₂</li>
                  <li><strong>A tiszta oldott anyag tömege:</strong> m_o1 + m_o2 = m_o_össz</li>
                </ol>
                <div className="mt-2 font-mono font-bold text-emerald-800 dark:text-emerald-300">
                  m₁ · w₁ + m₂ · w₂ = (m₁ + m₂) · w_új
                </div>
              </TheoryCallout>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block mb-0.5">1. Hígítás vízzel</span>
                  <span>A hozzáadott tiszta víz töménysége: w = 0%.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block mb-0.5">2. Só/sav hozzáadása</span>
                  <span>A tiszta oldott anyag töménysége: w = 100%.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block mb-0.5">3. Bepárlás (forralás)</span>
                  <span>Víz távozik: m_új = m₁ - m_víz, w_víz = 0%.</span>
                </div>
              </div>
            </TheoryCard>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <TheoryCard title="Vizuális keverési lombikmodell" variant="highlight">
              <div className="w-full flex justify-center p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200 dark:border-emerald-800/60 shadow-xs mb-3">
                <MixingBeakersSvg size={260} />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Ha 200 g 10%-os és 300 g 30%-os sóoldatot keverünk össze, a bennük lévő tiszta sómennyiség (20 g + 90 g = 110 g)
                eloszlik az 500 g össztömegben, így a kapott keverék pontosan 22%-os lesz (110 / 500 = 0,22).
              </p>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* ==========================================
          2. SZEKCIÓ: KÖZÖS MUNKAVÉGZÉS ÉS CSAPFELTÖLTÉSEK
      ========================================== */}
      <TheorySection
        title="2. Együttes munkavégzés és csapok feltöltési ideje"
        subtitle="A harmonikus modellek és másodfokúra visszavezethető törtes egyenletek"
      >
        <TheoryCard title="Miért a reciprokokat adjuk össze?" variant="highlight">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-3">
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Gyakori tanulói tévedés az idők egyszerű összeadása vagy átlagolása.
                Ha az egyik csap 3 óra alatt tölti meg a tartályt, a másik 6 óra alatt, a két csap együtt <em>gyorsabban</em> végez, mint bármelyikük egyedül!
              </p>
              <div className="p-3 bg-cyan-50 dark:bg-cyan-950/40 rounded-xl border border-cyan-200 dark:border-cyan-800 text-xs sm:text-sm text-cyan-950 dark:text-cyan-200 space-y-1.5">
                <div className="font-bold">A teljesítmény-elv:</div>
                <div>• Az 1. csap 1 óra alatt a medence 1/t₁ = 1/3 részét tölti meg.</div>
                <div>• A 2. csap 1 óra alatt a medence 1/t₂ = 1/6 részét tölti meg.</div>
                <div>• Együtt 1 óra alatt: 1/3 + 1/6 = 2/6 + 1/6 = 3/6 = 1/2 rész telik meg.</div>
                <div className="font-bold text-cyan-800 dark:text-cyan-300 pt-1">
                  Mivel 1 óra alatt a felét töltik meg, a teljes tartályhoz T = 2 óra szükséges!
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Általános képlet: 1/t₁ + 1/t₂ = 1/T ⟹ T = (t₁ · t₂) / (t₁ + t₂) (a harmonikus közép fele).
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center justify-center p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <ParallelFlowTubesSvg size={250} />
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* ==========================================
          3. SZEKCIÓ: MŰSZAKI ÉS FIZIKAI KÉPLETEK ALGEBRÁJA
      ========================================== */}
      <TheorySection
        title="3. Műszaki, elektronikai és optikai formulák rendezése"
        subtitle="Hogyan fejezhető ki a keresett fizikai változó törtes és négyzetes összefüggésekből?"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <TheoryCard title="Párhuzamos kapcsolás és a Lencsetörvény">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
              Az elektrotechnikában párhuzamosan kapcsolt ellenállások eredője (R_e), illetve az optikában a vékony lencsék fókusztávolsága (f)
              pontosan a munkafeladatok reciprok-egyenletével írható le:
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-mono space-y-1 mb-3">
              <div>1/R_e = 1/R₁ + 1/R₂ ⟹ R_e = (R₁ · R₂) / (R₁ + R₂)</div>
              <div>1/f = 1/t + 1/k ⟹ f = (t · k) / (t + k) (t: tárgytáv., k: képtáv.)</div>
            </div>
            <div className="w-full flex justify-center p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <TechnicalFormulaBridgeSvg size={240} />
            </div>
          </TheoryCard>

          <TheoryCard title="Ismeretlen kifejezése: Lépésről lépésre" variant="definition">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
              Tegyük fel, hogy az 1/f = 1/t + 1/k képletből a képtávolságot (k) szeretnénk kifejezni!
            </p>
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800">
                <strong>1. Lépés: Keresett törtes tag izolálása</strong>
                <br />
                Vigyük át az ismert tagot: 1/k = 1/f - 1/t.
              </div>
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800">
                <strong>2. Lépés: Közös nevező a jobb oldalon</strong>
                <br />
                1/k = (t - f) / (f · t).
              </div>
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800">
                <strong>3. Lépés: Mindkét oldal reciproka</strong>
                <br />
                k = (f · t) / (t - f) (feltétel: t ≠ f).
              </div>
            </div>
            <TheoryTrapBox title="Fizikai mértékegységek és kikötések">
              A fizikai egyenletekben a nevező soha nem lehet 0 (pl. t ≠ f). Ha a tárgy éppen a fókuszpontban van (t = f),
              a nevező 0 lenne: a fénysugarak párhuzamosak, kép nem keletkezik (a végtelenben van)!
            </TheoryTrapBox>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* ==========================================
          4. SZEKCIÓ: KÉTSZERES HÍGÍTÁS ÉS MÁSODFOKÚ MODELLEK
      ========================================== */}
      <TheorySection
        title="4. Kétszeres hígítás és nemlineáris laboratóriumi folyamatok"
        subtitle="Hogyan vezet a kísérleti technológia másodfokú algebrai egyenletekhez?"
      >
        <TheoryCard title="A lépcsőzetes hígítás elmélete">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-3">
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Egy V térfogatú, c₀ = 100%-os tömény savból kiveszünk x litert, felöntjük vízzel V literre, alaposan összekeverjük,
                majd <strong>másodszor is kiveszünk x litert</strong>, és újra felöntjük vízzel.
              </p>
              <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
                  <strong>1. Lépés után:</strong> A sav aránya: (V - x) / V = 1 - x/V.
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
                  <strong>2. Lépés után:</strong> Ugyanezzel a törttel szorozzuk meg a maradékot:
                  <div className="font-mono font-bold text-emerald-700 dark:text-emerald-300 mt-1">
                    c₂ = c₀ · (1 - x/V)²
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Ez egy tisztán <strong>másodfokú egyenlet</strong>! Ha például a végső töménység 64% (c₂ = 0,64) és V = 10 liter:
                <br />
                (1 - x/10)² = 0,64 ⟹ 1 - x/10 = 0,8 ⟹ x/10 = 0,2 ⟹ x = 2 liter!
              </p>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <DilutionStepsSvg size={250} />
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* ==========================================
          5. SZEKCIÓ: KIDOLGOZOTT MINTAFELADATOK
      ========================================== */}
      <TheorySection
        title="5. Kidolgozott laboratóriumi és érettségi mintafeladatok"
        subtitle="Részletes levezetések a valós életből vett műszaki problémákra"
      >
        <div className="space-y-4">
          {/* 1. Minta */}
          <TheoryCard title="1. Mintapélda: Oldat töményítése és hígítása keverési táblázattal" variant="example">
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="font-bold text-slate-900 dark:text-white">
                Feladat: Hány gramm 40%-os sósavoldathoz kell hozzáadni 300 gramm 10%-os sósavat és 100 gramm tiszta vizet,
                hogy végül 20%-os oldatot kapjunk?
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div>
                  <strong>Jelölés:</strong> Legyen a 40%-os oldat tömege x gramm (x &gt; 0).
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse border border-slate-300 dark:border-slate-600">
                    <thead>
                      <tr className="bg-slate-100 dark:bg-slate-700">
                        <th className="p-1.5 border border-slate-300 dark:border-slate-600">Komponens</th>
                        <th className="p-1.5 border border-slate-300 dark:border-slate-600">Össztömeg (m)</th>
                        <th className="p-1.5 border border-slate-300 dark:border-slate-600">Töménység (w)</th>
                        <th className="p-1.5 border border-slate-300 dark:border-slate-600">Oldott HCl (m · w/100)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-1.5 border border-slate-300 dark:border-slate-600">1. oldat</td>
                        <td className="p-1.5 border border-slate-300 dark:border-slate-600">x g</td>
                        <td className="p-1.5 border border-slate-300 dark:border-slate-600">40%</td>
                        <td className="p-1.5 border border-slate-300 dark:border-slate-600">0,40x</td>
                      </tr>
                      <tr>
                        <td className="p-1.5 border border-slate-300 dark:border-slate-600">2. oldat</td>
                        <td className="p-1.5 border border-slate-300 dark:border-slate-600">300 g</td>
                        <td className="p-1.5 border border-slate-300 dark:border-slate-600">10%</td>
                        <td className="p-1.5 border border-slate-300 dark:border-slate-600">300 · 0,10 = 30 g</td>
                      </tr>
                      <tr>
                        <td className="p-1.5 border border-slate-300 dark:border-slate-600">Víz</td>
                        <td className="p-1.5 border border-slate-300 dark:border-slate-600">100 g</td>
                        <td className="p-1.5 border border-slate-300 dark:border-slate-600">0%</td>
                        <td className="p-1.5 border border-slate-300 dark:border-slate-600">0 g</td>
                      </tr>
                      <tr className="font-bold bg-emerald-50 dark:bg-emerald-950/40">
                        <td className="p-1.5 border border-slate-300 dark:border-slate-600">Keverék</td>
                        <td className="p-1.5 border border-slate-300 dark:border-slate-600">x + 400 g</td>
                        <td className="p-1.5 border border-slate-300 dark:border-slate-600">20%</td>
                        <td className="p-1.5 border border-slate-300 dark:border-slate-600">0,20 · (x + 400)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <strong>Egyenlet felírása és megoldása:</strong>
                  <br />
                  0,40x + 30 = 0,20(x + 400)
                  <br />
                  0,40x + 30 = 0,20x + 80
                  <br />
                  0,20x = 50 ⟹ x = 50 / 0,20 = 250 g.
                </div>

                <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg text-emerald-800 dark:text-emerald-300 font-bold">
                  Válasz: 250 gramm 40%-os sósavoldatra van szükség.
                </div>
              </div>
            </div>
          </TheoryCard>

          {/* 2. Minta */}
          <TheoryCard title="2. Mintapélda: Másodfokú törtes egyenletre vezető csapfeladat" variant="example">
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="font-bold text-slate-900 dark:text-white">
                Feladat: Egy tartályt két csapon keresztül töltenek. Az első csap egyedül 3 órával gyorsabban töltené meg a tartályt,
                mint a második csap. Ha mindkét csapot egyszerre megnyitják, a tartály 2 óra alatt telik meg. Hány óra alatt töltené meg
                a tartályt az első és a második csap külön-külön?
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div>
                  <strong>Jelölés:</strong> Legyen az 1. (gyorsabb) csap ideje x óra (x &gt; 0). Ekkor a 2. csap ideje x + 3 óra.
                </div>

                <div>
                  <strong>1 óra alatt végzett munka:</strong>
                  <br />
                  1/x + 1/(x + 3) = 1/2
                </div>

                <div>
                  <strong>Beszorzás a közös nevezővel: 2x(x + 3):</strong>
                  <br />
                  2(x + 3) + 2x = x(x + 3)
                  <br />
                  2x + 6 + 2x = x² + 3x
                  <br />
                  4x + 6 = x² + 3x ⟹ x² - x - 6 = 0
                </div>

                <div>
                  <strong>Másodfokú egyenlet megoldása:</strong>
                  <br />
                  (x - 3)(x + 2) = 0 ⟹ x₁ = 3, x₂ = -2.
                  <br />
                  Mivel a fizikai idő nem lehet negatív (x &gt; 0), az x₂ = -2 fizikailag kizárva!
                </div>

                <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg text-emerald-800 dark:text-emerald-300 font-bold">
                  Válasz: Az első csap egyedül 3 óra alatt, a második csap egyedül 6 óra (3 + 3) alatt töltené meg a tartályt.
                </div>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* ==========================================
          6. SZEKCIÓ: INTERAKTÍV LABORATÓRIUM (A TANANYAG VÉGÉN!)
      ========================================== */}
      <TheorySection
        title="6. Interaktív Kísérleti és Modellező Laboratórium"
        subtitle="Szimulálj oldatkeverést és áramlási folyamatokat valós időben!"
      >
        <div className="space-y-6">
          {/* 1. Labor kártya: Kétkomponensű Oldatkeverő Szimulátor */}
          <TheoryCard title="🧪 Kétkomponensű Oldatkeverő Szimulátor" variant="highlight">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
              Állítsd be a két oldat tömegét és töménységét, és figyeld meg az anyagmérleg azonnali számítását:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* 1. Oldat vezérlők */}
              <div className="p-3.5 bg-sky-50 dark:bg-sky-950/40 rounded-xl border border-sky-200 dark:border-sky-800 space-y-3">
                <div className="font-bold text-sm text-sky-900 dark:text-sky-300 flex items-center justify-between">
                  <span>1. Oldat paraméterei</span>
                  <span className="font-mono text-xs">m₁ = {m1} g, {w1}%</span>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                    <span>Tömeg (m₁):</span>
                    <span className="font-bold">{m1} g</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    step="10"
                    value={m1}
                    onChange={(e) => setM1(Number(e.target.value))}
                    className="w-full accent-sky-600"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                    <span>Töménység (w₁):</span>
                    <span className="font-bold">{w1}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={w1}
                    onChange={(e) => setW1(Number(e.target.value))}
                    className="w-full accent-sky-600"
                  />
                </div>
                <div className="text-[11px] font-mono text-sky-800 dark:text-sky-300 pt-1 border-t border-sky-200 dark:border-sky-800">
                  Oldott anyag: {dissolved1.toFixed(1)} g
                </div>
              </div>

              {/* 2. Oldat vezérlők */}
              <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-3">
                <div className="font-bold text-sm text-emerald-900 dark:text-emerald-300 flex items-center justify-between">
                  <span>2. Oldat paraméterei</span>
                  <span className="font-mono text-xs">m₂ = {m2} g, {w2}%</span>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                    <span>Tömeg (m₂):</span>
                    <span className="font-bold">{m2} g</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    step="10"
                    value={m2}
                    onChange={(e) => setM2(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                    <span>Töménység (w₂):</span>
                    <span className="font-bold">{w2}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={w2}
                    onChange={(e) => setW2(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>
                <div className="text-[11px] font-mono text-emerald-800 dark:text-emerald-300 pt-1 border-t border-emerald-200 dark:border-emerald-800">
                  Oldott anyag: {dissolved2.toFixed(1)} g
                </div>
              </div>
            </div>

            {/* Számított eredmény doboz */}
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border-2 border-emerald-300 dark:border-emerald-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-bold text-emerald-600 dark:text-emerald-400 tracking-wider">
                  Keverék eredménye:
                </span>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono mt-0.5">
                  {newConcentration.toFixed(2)}%
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Össztömeg: {totalMass} g &nbsp;|&nbsp; Összes oldott anyag: {totalDissolved.toFixed(1)} g
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setM1(200);
                    setW1(10);
                    setM2(300);
                    setW2(30);
                  }}
                  className="text-xs font-bold gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Alaphelyzet
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setW2(0); // Tiszta víz hozzáadása
                  }}
                  className="text-xs font-bold gap-1 text-sky-700 border-sky-300 hover:bg-sky-50"
                >
                  + Tiszta víz (0%)
                </Button>
              </div>
            </div>
          </TheoryCard>

          {/* 2. Labor kártya: Csap-Feltöltés Kalkulátor */}
          <TheoryCard title="⚡ Együttes Csapfeltöltési Laboratórium">
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p>
                Állítsd be a két csap egyéni töltési idejét, és vizsgáld meg, hogyan adódnak össze a teljesítmények:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between font-bold mb-1">
                    <span>1. Csap ideje (t₁):</span>
                    <span className="text-emerald-600 font-mono text-sm">{tap1} óra</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="12"
                    step="1"
                    value={tap1}
                    onChange={(e) => setTap1(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                  <div className="text-[11px] text-slate-500 mt-1">
                    1 óra alatt: 1/{tap1} rész
                  </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between font-bold mb-1">
                    <span>2. Csap ideje (t₂):</span>
                    <span className="text-emerald-600 font-mono text-sm">{tap2} óra</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="12"
                    step="1"
                    value={tap2}
                    onChange={(e) => setTap2(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                  <div className="text-[11px] text-slate-500 mt-1">
                    1 óra alatt: 1/{tap2} rész
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-900 dark:text-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-2">
                <div>
                  Közös töltési idő: <span className="text-base font-black font-mono">{combinedTime.toFixed(2)} óra</span>
                  <span className="text-[11px] font-normal block text-emerald-700 dark:text-emerald-400">
                    Képlet: T = (t₁ · t₂) / (t₁ + t₂) = ({tap1} · {tap2}) / ({tap1 + tap2})
                  </span>
                </div>
                <div className="text-[11px] font-mono bg-white dark:bg-slate-900 px-3 py-1 rounded-lg border border-emerald-300">
                  1 óra alatt: {(1 / combinedTime).toFixed(2)} rész telik meg
                </div>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
