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
  SynthesisConceptMapSvg,
  ExamChecklistTreeSvg,
  InequalityRegionsSvg,
  NonlinearSystemsIntersectionSvg,
  GradingRubricTrophySvg
} from './PracticeExamFigures';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  Sliders,
  RotateCcw,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PracticeExamTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const PracticeExamTheory: React.FC<PracticeExamTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- 6. SZEKCIÓ: Interaktív Laboratórium állapota ---
  const [testA, setTestA] = useState<number>(1);
  const [testB, setTestB] = useState<number>(-4);
  const [testC, setTestC] = useState<number>(3);

  // Kvíz válasz
  const [sampleChoice, setSampleChoice] = useState<string | null>(null);

  // Számítások ax² + bx + c = 0
  const disc = testB * testB - 4 * testA * testC;
  let roots: { r1: number; r2: number } | null = null;
  if (disc >= 0 && testA !== 0) {
    const sqrtD = Math.sqrt(disc);
    const r1 = (-testB - sqrtD) / (2 * testA);
    const r2 = (-testB + sqrtD) / (2 * testA);
    roots = {
      r1: Math.round(r1 * 100) / 100,
      r2: Math.round(r2 * 100) / 100
    };
  }

  return (
    <TheoryTemplate
      title="10. Gyakorlás, fejezeti tudáspróba"
      subtitle="10. osztály • VIII. Témakör • 66. lecke: Az egyenletek és egyenlőtlenségek fejezetének átfogó szintézise, érettségi típuspéldák és témazáró összefoglalás"
      badge="10. OSZTÁLY • VIII. EGYENLETEK ÉS EGYENLŐTLENSÉGEK • TANANYAG"
      themeColor="violet"
      topicId="g10-eq-gyakorlas-tudasproba-theory"
      quickRule={{
        label: 'FONTOS SZABÁLYOK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="font-semibold text-violet-700 dark:text-violet-300">
              A Fejezet 4 Alappillére a Témazárón:
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Kikötések:</strong> Nevező $\neq 0$, négyzetgyök alatt $\ge 0$. A felírásért mindig önálló részpont jár!
              </li>
              <li>
                <strong>Négyzetre emelés:</strong> Nem ekvivalens átalakítás $\implies$ a végén a <em>kötelező próba</em> nélkül nem adható teljes pontszám!
              </li>
              <li>
                <strong>Egyenlőtlenségek:</strong> Nullára rendezés után vizsgáljuk a szorzat/hányados előjelét (parabola rajz vagy előjeltáblázat)!
              </li>
              <li>
                <strong>Rendszerek:</strong> Rendezett számpárokban adjuk meg az eredményt ($M = &#123;(x_1; y_1); (x_2; y_2)&#125;$)!
              </li>
            </ul>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* 1. SZEKCIÓ: Ekvivalencia és gyökös egyenletek */}
      <TheorySection
        title="1. Ekvivalens átalakítások és gyökös egyenletek szintézise"
        badge="ALGEBRAI ALAPVETÉS"
      >
        <TheoryCard
          title="Mikor ekvivalens egy lépés, és hogyan szűrjük ki a hamis gyököket?"
          icon={<ShieldCheck className="w-5 h-5 text-violet-600 dark:text-violet-400" />}
        >
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300">
              Az egyenletmegoldás során végzett műveleteket két nagy csoportra osztjuk:
              az <strong>ekvivalens lépésekre</strong> (amelyek nem változtatják meg a megoldáshalmazt)
              és a <strong>nem ekvivalens lépésekre</strong> (amelyeknél hamis gyök keletkezhet vagy gyökvesztés léphet fel).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TheoryCallout variant="warning" title="A Gyökös Egyenletek 3 Lépcsős Modellje">
                <ol className="text-xs list-decimal pl-4 space-y-1.5">
                  <li>
                    <strong>Kikötés (Értelmezési tartomány):</strong> A gyökjel alatti kifejezés nem lehet negatív ($f(x) \ge 0$), és a gyökkel egyenlő oldalnak is $\ge 0$-nak kell lennie!
                  </li>
                  <li>
                    <strong>Négyzetre emelés és rendezés:</strong> Mindkét oldalt négyzetre emelve másodfokú vagy elsőfokú egyenlethez jutunk.
                  </li>
                  <li>
                    <strong>Kötelező próba az eredeti egyenletbe:</strong> A kapott jelölteket behelyettesítjük. Ha a bal oldal nem egyenlő a jobb oldallal, a hamis gyököt azonnal kizárjuk!
                  </li>
                </ol>
              </TheoryCallout>

              <div className="flex flex-col items-center justify-center p-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <ExamChecklistTreeSvg size={240} />
                <span className="text-[11px] text-slate-500 mt-2 font-medium">
                  Érettségi stratégiai döntési fa az egyenletmegoldásban
                </span>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. SZEKCIÓ: Másodfokú, törtes és abszolútértékes egyenlőtlenségek */}
      <TheorySection
        title="2. Másodfokú és törtes egyenlőtlenségek megoldási sémája"
        badge="ELŐJELVIZSGÁLAT"
      >
        <TheoryCard
          title="Parabola-vázlat és előjeltáblázat: a két legbiztosabb módszer"
          icon={<Target className="w-5 h-5 text-violet-600 dark:text-violet-400" />}
        >
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300">
              Egyenlőtlenségek esetén az alapszabály: <strong>nullára rendezzük a kifejezést</strong>,
              meghatározzuk a tényezők zérushelyeit, majd megvizsgáljuk az előjelet a zérushelyek által határolt intervallumokon.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <strong className="text-violet-600 dark:text-violet-400 font-semibold">Másodfokú egyenlőtlenség (ax² + bx + c ≷ 0):</strong>
                  <p className="mt-1">
                    Megkeressük a gyököket ($x_1, x_2$). Ha $a &gt; 0$ (felfelé nyíló parabola), a függvény a gyökökön <em>kívül pozitív</em>,
                    a gyökök <em>között negatív</em>. Ha $a &lt; 0$, épp fordítva!
                  </p>
                </div>

                <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <strong className="text-violet-600 dark:text-violet-400 font-semibold">Törtes egyenlőtlenség (P(x) / Q(x) ≷ 0):</strong>
                  <p className="mt-1">
                    Ismeretlennel tilos átbeszorozni! Helyette a hányados előjelét vizsgáljuk: egy tört akkor pozitív, ha a számláló és nevező <em>azonos előjelű</em>.
                    A nevező zérushelyénél a határpont <strong>mindig nyílt zárójeles</strong>!
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center p-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <InequalityRegionsSvg size={240} />
                <span className="text-[11px] text-slate-500 mt-2 font-medium">
                  A parabola előjelének leolvasása és intervallum-ábrázolása
                </span>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 3. SZEKCIÓ: Polinom gyöktényezős alakja és a Viète-formulák */}
      <TheorySection
        title="3. Polinom gyöktényezős alakja és a Viète-formulák"
        badge="ALGEBRAI ESZKÖZTÁR"
      >
        <TheoryCard
          title="A szorzattá alakítás és a gyökök összefüggéseinek szintézise"
          icon={<Sparkles className="w-5 h-5 text-violet-600 dark:text-violet-400" />}
        >
          <div className="space-y-4">
            <TheoryTable
              headers={['Fogalom / Képlet', 'Matematikai Alak', 'Fő Alkalmazási Terület']}
              rows={[
                ['Gyöktényezős alak', 'a(x - x₁)(x - x₂)', 'Algebai törtek egyszerűsítése, polinom felbontás'],
                ['Viète: Gyökök összege', 'x₁ + x₂ = -b/a  (normált: -p)', 'Gyors fejben számolás, paraméteres feladatok'],
                ['Viète: Gyökök szorzata', 'x₁ · x₂ = c/a  (normált: q)', 'Előjel meghatározása, egyenlet felírása gyökökből'],
                ['Négyzetösszeg azonosság', 'x₁² + x₂² = (x₁ + x₂)² - 2x₁x₂', 'Szimmetrikus kifejezések kiszámítása gyökvonás nélkül']
              ]}
            />

            <TheoryTrapBox
              title="A leggyakoribb hiba: a főegyüttható (a) elhagyása!"
              trap="A 2x² - 10x + 12 polinomot egyszerűen (x - 2)(x - 3) alakban írják fel, elfelejtve a 2-es szorzót."
              correction="A gyöktényezős képletben a főegyüttható elöl áll: 2(x - 2)(x - 3) = 2(x² - 5x + 6) = 2x² - 10x + 12!"
            />
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 4. SZEKCIÓ: Másodfokú egyenletrendszerek és metszéspontok */}
      <TheorySection
        title="4. Másodfokú egyenletrendszerek és geometriai metszéspontok"
        badge="NEMLINEÁRIS RENDSZEREK"
      >
        <TheoryCard
          title="Behelyettesítés és szimmetrikus rendszerek összefoglalása"
          icon={<BookOpen className="w-5 h-5 text-violet-600 dark:text-violet-400" />}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <p>
                  <strong>Lineáris + Másodfokú rendszer:</strong> Az elsőfokúból kifejezünk (pl. $y = mx + d$),
                  behelyettesítünk a másodfokúba, majd a kapott $x$ gyökökből kiszámítjuk a hozzájuk tartozó $y$ értékeket.
                </p>
                <p>
                  <strong>Szimmetrikus rendszer ($x+y=S, xy=P$):</strong> Közvetlenül az $u^2 - Su + P = 0$ segédegyenletet
                  oldjuk meg. A szimmetria miatt ha $(u_1; u_2)$ megoldás, akkor $(u_2; u_1)$ is az!
                </p>
                <div className="p-3 bg-violet-50 dark:bg-violet-950/40 rounded-lg border border-violet-200 dark:border-violet-800 font-semibold text-violet-900 dark:text-violet-200">
                  Eredmény: Mindig rendezett számpárok halmaza: $M = &#123;(x_1; y_1); (x_2; y_2)&#125;$!
                </div>
              </div>

              <div className="flex flex-col items-center justify-center p-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <NonlinearSystemsIntersectionSvg size={240} />
                <span className="text-[11px] text-slate-500 mt-2 font-medium">
                  Kör és egyenes metszéspontjainak száma a diszkrimináns szerint
                </span>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 5. SZEKCIÓ: Érettségi javítókulcs és pontozási stratégia */}
      <TheorySection
        title="5. Érettségi javítókulcs és pontmentő stratégiák"
        badge="ÉRETTSÉGI TIPPEK"
      >
        <TheoryCard
          title="Hogyan szerezzük meg az összes részpontszámot a témazárón?"
          icon={<Trophy className="w-5 h-5 text-violet-600 dark:text-violet-400" />}
        >
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300">
              A magyar matematika érettségin az egyenletek feladatainál szigorú javítókulcs szerint pontoznak.
              Az alábbi szempontok betartásával elkerülheted a legfájóbb pontvesztéseket:
            </p>

            <div className="flex flex-col items-center justify-center p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <GradingRubricTrophySvg size={250} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <TheoryCallout variant="tip" title="Pontmentő tipp 1: Írj le mindent!">
                <p className="text-xs">
                  Még ha nem is vagy biztos a végeredményben, a <strong>kikötés felírásáért</strong> és a
                  <strong> nullára rendezésért</strong> külön részpontok járnak! Soha ne hagyd üresen a feladatot!
                </p>
              </TheoryCallout>

              <TheoryCallout variant="warning" title="Pontmentő tipp 2: Jelöld a kizárást!">
                <p className="text-xs">
                  Ha egy gyök nem felel meg a kikötésnek, nem elég egyszerűen elhagyni a végeredményből:
                  <strong> kifejezetten oda kell írni:</strong> „nem felel meg a kikötésnek (hamis gyök)”!
                </p>
              </TheoryCallout>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 6. SZEKCIÓ: Interaktív Fejezeti Tudáspróba Laboratórium */}
      <TheorySection
        title="6. Interaktív Fejezeti Tudáspróba Laboratórium"
        badge="INTERAKTÍV MŰHELY"
      >
        <div className="bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-violet-950/30 dark:via-purple-950/20 dark:to-slate-900 border border-violet-200 dark:border-violet-800 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                Univerzális Másodfokú Egyenlet és Egyenlőtlenség Vizsgáló
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Állítsd be az együtthatókat, és figyeld a diszkriminánst, a gyököket, a gyöktényezős alakot és az előjelet!
              </p>
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-violet-200 dark:border-violet-800 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-xs font-bold text-violet-700 dark:text-violet-300 uppercase tracking-wider mb-2">
                Kifejezés: f(x) = ax² + bx + c
              </div>
              <div className="my-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg text-center font-mono text-base font-bold text-violet-600 dark:text-violet-400">
                {testA}x² {testB >= 0 ? `+ ${testB}` : `- ${Math.abs(testB)}`}x {testC >= 0 ? `+ ${testC}` : `- ${Math.abs(testC)}`}
              </div>

              {/* Csúszkák */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Főegyüttható (a ≠ 0):</span>
                    <span className="font-mono font-bold text-violet-600">{testA}</span>
                  </div>
                  <input
                    type="range"
                    min="-3"
                    max="3"
                    step="1"
                    value={testA === 0 ? 1 : testA}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      setTestA(val === 0 ? 1 : val);
                    }}
                    className="w-full accent-violet-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Lineáris együttható (b):</span>
                    <span className="font-mono font-bold text-violet-600">{testB}</span>
                  </div>
                  <input
                    type="range"
                    min="-8"
                    max="8"
                    step="1"
                    value={testB}
                    onChange={(e) => setTestB(parseInt(e.target.value, 10))}
                    className="w-full accent-violet-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Konstans tag (c):</span>
                    <span className="font-mono font-bold text-violet-600">{testC}</span>
                  </div>
                  <input
                    type="range"
                    min="-10"
                    max="10"
                    step="1"
                    value={testC}
                    onChange={(e) => setTestC(parseInt(e.target.value, 10))}
                    className="w-full accent-violet-600"
                  />
                </div>
              </div>
            </div>

            {/* Eredmény panel */}
            <div className="flex flex-col justify-between bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-3">
              <div>
                <div className="font-bold text-slate-800 dark:text-slate-200 mb-2">
                  Algebrai és Geometriai Elemzés
                </div>
                <div className="space-y-1 font-mono">
                  <div>Diszkrimináns: D = ({testB})² - 4·({testA})·({testC}) = <strong className={disc > 0 ? 'text-emerald-600' : disc === 0 ? 'text-amber-600' : 'text-rose-600'}>{disc}</strong></div>
                  <div>Parabola állása: {testA > 0 ? 'Felfelé nyíló (minimuma van)' : 'Lefelé nyíló (maximuma van)'}</div>
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-violet-200 dark:border-violet-800 space-y-2">
                <div className="font-bold text-violet-800 dark:text-violet-300">Valós Gyökök és Gyöktényezők:</div>
                {roots ? (
                  <div className="font-mono text-xs space-y-1 text-slate-800 dark:text-slate-200">
                    <div>x₁ = {roots.r1} &nbsp;|&nbsp; x₂ = {roots.r2}</div>
                    <div className="text-violet-700 dark:text-violet-300 font-bold">
                      Gyöktényezős alak: {testA !== 1 ? `${testA}` : ''}(x - ({roots.r1}))(x - ({roots.r2}))
                    </div>
                  </div>
                ) : (
                  <div className="text-rose-600 dark:text-rose-400 font-semibold">Nincs valós gyök (D &lt; 0), nem bontható valós szorzatra</div>
                )}
              </div>

              <div className="p-3 bg-violet-100/60 dark:bg-violet-950/40 rounded-lg text-violet-900 dark:text-violet-200 text-xs font-semibold">
                {disc > 0 ? (
                  testA > 0
                    ? `f(x) ≤ 0 megoldása a zárt intervallum: [${roots?.r1}; ${roots?.r2}]`
                    : `f(x) ≥ 0 megoldása a zárt intervallum: [${roots?.r1}; ${roots?.r2}]`
                ) : disc === 0 ? (
                  `f(x) = 0 megoldása az egyetlen pont: x = ${roots?.r1}`
                ) : (
                  testA > 0 ? 'f(x) > 0 minden valós x-re teljesül (M = ℝ)' : 'f(x) < 0 minden valós x-re teljesül (M = ℝ)'
                )}
              </div>
            </div>
          </div>

          {/* Kvíz indító gomb */}
          <div className="pt-2 flex justify-between items-center">
            <div className="text-xs font-bold text-violet-700 dark:text-violet-300">
              Készen állsz a 90 kérdéses átfogó fejezeti tudáspróbára?
            </div>
            <Button
              onClick={onStartQuiz}
              className="bg-violet-600 hover:bg-violet-700 text-white flex items-center gap-2 font-bold px-6 py-3 shadow-md text-sm"
            >
              Indulhat a 90 Feladatos Tudáspróba Kvíz!
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
