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
  LineAndParabolaIntersectionSvg,
  SymmetricSystemVieteBridgeSvg,
  CircleAndLineSystemSvg,
  EliminationQuadraticsSvg,
  OrderedPairsVerificationSvg
} from './QuadraticSystemsFigures';
import {
  GitFork,
  Sliders,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Zap,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuadraticSystemsTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const QuadraticSystemsTheory: React.FC<QuadraticSystemsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- 6. SZEKCIÓ: Interaktív Laboratórium állapota ---
  const [labMode, setLabMode] = useState<'line-parabola' | 'symmetric'>('line-parabola');

  // Egyenes-parabola paraméterek: y = x² és y = mx + b
  const [paramM, setParamM] = useState<number>(1);
  const [paramB, setParamB] = useState<number>(2);

  // Szimmetrikus rendszer paraméterek: x + y = S és x * y = P
  const [paramS, setParamS] = useState<number>(7);
  const [paramP, setParamP] = useState<number>(10);

  // Interaktív kvíz állapot
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);

  // Számítások Egyenes-parabola: x² - mx - b = 0 ⇒ D = m² + 4b
  const discLP = paramM * paramM + 4 * paramB;
  let lpRoots: { x1: number; y1: number; x2: number; y2: number } | null = null;
  if (discLP >= 0) {
    const sqrtD = Math.sqrt(discLP);
    const x1 = (-(-paramM) + sqrtD) / 2;
    const x2 = (-(-paramM) - sqrtD) / 2;
    lpRoots = {
      x1: Math.round(x1 * 100) / 100,
      y1: Math.round((paramM * x1 + paramB) * 100) / 100,
      x2: Math.round(x2 * 100) / 100,
      y2: Math.round((paramM * x2 + paramB) * 100) / 100
    };
  }

  // Számítások Szimmetrikus: u² - Su + P = 0 ⇒ D = S² - 4P
  const discSym = paramS * paramS - 4 * paramP;
  let symRoots: { u1: number; u2: number } | null = null;
  if (discSym >= 0) {
    const sqrtD = Math.sqrt(discSym);
    const u1 = (paramS + sqrtD) / 2;
    const u2 = (paramS - sqrtD) / 2;
    symRoots = {
      u1: Math.round(u1 * 100) / 100,
      u2: Math.round(u2 * 100) / 100
    };
  }

  return (
    <TheoryTemplate
      title="9. Ráadás – Másodfokú egyenletrendszerek"
      subtitle="10. osztály • VIII. Témakör • Kétismeretlenes nemlineáris rendszerek, behelyettesítés, Viète-szimmetria és geometriai metszéspontok"
      badge="10. OSZTÁLY • VIII. EGYENLETEK ÉS EGYENLŐTLENSÉGEK • TANANYAG"
      themeColor="orange"
      topicId="g10-eq-masodfoku-egyenletrendszerek-theory"
      quickRule={{
        label: 'FONTOS SZABÁLYOK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="font-semibold text-orange-700 dark:text-orange-300">
              A Másodfokú Egyenletrendszerek 4 Aranyszabálya:
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Lineáris + Másodfokú:</strong> Az elsőfokúból fejezzük ki az egyik ismeretlent, és helyettesítsük be a másodfokúba!
              </li>
              <li>
                <strong>Szimmetrikus rendszer:</strong> Ha $x+y=S$ és $xy=P$, $x$ és $y$ az $u^2 - Su + P = 0$ egyenlet gyökei! Mindkét pár megoldás: $(u_1; u_2)$ és $(u_2; u_1)$.
              </li>
              <li>
                <strong>Tagelimináció:</strong> Ha mindkét egyenletben azonos együtthatójú négyzetes tagok szerepelnek, kivonással lineáris összefüggést nyerünk!
              </li>
              <li>
                <strong>Rendezett számpárok:</strong> A megoldás mindig összetartozó számpárok halmaza: $M = &#123;(x_1; y_1); (x_2; y_2)&#125;$, nem külön $x$ és $y$!
              </li>
            </ul>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* 1. SZEKCIÓ: Egy elsőfokú és egy másodfokú egyenletből álló rendszerek */}
      <TheorySection
        title="1. Egy elsőfokú és egy másodfokú egyenletből álló rendszerek"
        badge="BEHELYETTESÍTŐ MÓDSZER"
      >
        <TheoryCard
          title="A behelyettesítés algoritmusa és geometriai jelentése"
          icon={<GitFork className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
        >
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300">
              Ha egy kétismeretlenes egyenletrendszerben az egyik egyenlet <strong>elsőfokú</strong> (lineáris),
              a másik pedig <strong>másodfokú</strong>, a legbiztosabb és leguniverzálisabb megoldási stratégia a
              <strong> behelyettesítő módszer</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-orange-50 dark:bg-orange-950/40 p-4 rounded-xl border border-orange-200 dark:border-orange-800 space-y-2">
                <div className="font-bold text-orange-800 dark:text-orange-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> A Megoldás 4 Lépése
                </div>
                <ol className="text-xs list-decimal pl-4 space-y-1.5 text-slate-700 dark:text-slate-300">
                  <li>
                    <strong>Kifejezés:</strong> Az elsőfokú egyenletből fejezd ki a könnyebb együtthatójú ismeretlent (pl. $y = 2x - 3$).
                  </li>
                  <li>
                    <strong>Behelyettesítés:</strong> Helyettesítsd be a kifejezést a másodfokú egyenletbe minden $y$ helyére! Ügyelj a zárójelekre: $(2x - 3)^2$!
                  </li>
                  <li>
                    <strong>Megoldás:</strong> Oldd meg a kapott egyismeretlenes másodfokú egyenletet ($x_1$ és $x_2$).
                  </li>
                  <li>
                    <strong>Összerendelés:</strong> Számítsd ki a hozzájuk tartozó $y_1$ és $y_2$ értékeket az 1. lépés kifejezéséből!
                  </li>
                </ol>
              </div>

              <div className="flex flex-col items-center justify-center p-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <LineAndParabolaIntersectionSvg size={240} />
                <span className="text-[11px] text-slate-500 mt-2 font-medium">
                  Geometriai jelentés: egyenes és parabola metszéspontjai
                </span>
              </div>
            </div>

            <TheoryTable
              headers={['Diszkrimináns (D)', 'Geometriai Helyzet', 'Valós Megoldáspárok Száma']}
              rows={[
                ['D > 0', 'Szelő: az egyenes két különböző pontban metszi a görbét', '2 rendezett számpár: (x₁; y₁) és (x₂; y₂)'],
                ['D = 0', 'Érintő: az egyenes pontosan egy pontban érinti a görbét', '1 rendezett számpár (kétszeres gyök): (x₁; y₁)'],
                ['D < 0', 'Elkerülő: az egyenes és a másodfokú görbe nem metszi egymást', '0 valós megoldáspár (M = ∅)']
              ]}
            />
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. SZEKCIÓ: Szimmetrikus másodfokú egyenletrendszerek */}
      <TheorySection
        title="2. Szimmetrikus másodfokú egyenletrendszerek"
        badge="A VIÈTE-HÍD"
      >
        <TheoryCard
          title="Szimmetrikus kifejezések és az u² - Su + P = 0 segédegyenlet"
          icon={<Lightbulb className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
        >
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300">
              Egy egyenletrendszert akkor nevezünk <strong>szimmetrikusnak</strong>, ha az $x$ és $y$ ismeretlenek
              felcserélésével az egyenletek nem változnak meg. Ilyen rendszerek megoldása villámgyors a
              <strong> Viète-tétel</strong> segítségével!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TheoryCallout variant="tip" title="Az Alapeset: x + y = S és x · y = P">
                <p className="text-xs">
                  Mivel ismerjük a két szám összegét ($S$) és szorzatát ($P$), a Viète-formulák szerint
                  $x$ és $y$ pontosan az alábbi másodfokú segédegyenlet két valós gyöke:
                </p>
                <div className="my-2 p-2 bg-orange-100 dark:bg-orange-950/60 rounded text-center font-mono font-bold text-orange-900 dark:text-orange-200 text-sm">
                  u² - S · u + P = 0
                </div>
                <p className="text-xs">
                  Ha az egyenlet gyökei $u_1$ és $u_2$, akkor a szimmetria miatt <strong>mindkét számpár megoldás</strong>:
                  $(x_1; y_1) = (u_1; u_2)$ és $(x_2; y_2) = (u_2; u_1)$!
                </p>
              </TheoryCallout>

              <div className="flex flex-col items-center justify-center p-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <SymmetricSystemVieteBridgeSvg size={240} />
                <span className="text-[11px] text-slate-500 mt-2 font-medium">
                  A szimmetrikus rendszer átváltása Viète-segédegyenletre
                </span>
              </div>
            </div>

            <TheoryCallout variant="info" title="Négyzetösszeg visszavezetése összegre és szorzatra">
              <p className="text-xs">
                Gyakori feladattípus az $x^2 + y^2 = K$ és $xy = P$ rendszer. Használjuk az ismert azonosságot:
              </p>
              <div className="my-1 font-mono font-bold text-xs text-center text-slate-800 dark:text-slate-200">
                x² + y² = (x + y)² - 2xy  ⇒  K = S² - 2P  ⇒  S = ±√(K + 2P)
              </div>
              <p className="text-xs mt-1">
                Így két külön szimmetrikus alapesetre bomlik a feladat ($S_1 = +\sqrt(K+2P)$ és $S_2 = -\sqrt(K+2P)$),
                összesen akár 4 valós megoldáspárt eredményezve!
              </p>
            </TheoryCallout>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 3. SZEKCIÓ: Két másodfokú egyenletből álló rendszerek */}
      <TheorySection
        title="3. Két másodfokú egyenletből álló rendszerek és tagelimináció"
        badge="ELIMINÁCIÓS STRATÉGIA"
      >
        <TheoryCard
          title="Hogyan szabaduljunk meg a négyzetes tagoktól?"
          icon={<Zap className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
        >
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300">
              Amikor mindkét egyenlet másodfokú (például két kör, vagy egy kör és egy parabola metszéspontjait keressük),
              a behelyettesítés negyedfokú egyenlethez vezetne. Helyette használjuk a <strong>tageliminációt</strong>:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <strong className="text-orange-600 dark:text-orange-400 font-semibold">1. Lépés: Egyenlő együtthatók megteremtése</strong>
                  <p className="mt-1">
                    Szorozzuk meg az egyenleteket konstansokkal úgy, hogy a másodfokú tagok ($x^2, y^2$) együtthatói megegyezzenek.
                  </p>
                </div>

                <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <strong className="text-orange-600 dark:text-orange-400 font-semibold">2. Lépés: Kivonás és lineáris kapcsolat</strong>
                  <p className="mt-1">
                    A két egyenlet egymásból való kivonásával a négyzetes tagok kiesnek, és egy egyszerű <em>elsőfokú összefüggést</em> kapunk (pl. $x - y = 2$).
                  </p>
                </div>

                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
                  <strong className="font-semibold">3. Lépés: Visszahelyettesítés az 1. szakasz mintájára</strong>
                  <p className="mt-1">
                    A kapott lineáris kifejezést ($x = y + 2$) visszahelyettesítjük az egyik eredeti másodfokú egyenletbe!
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center p-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <EliminationQuadraticsSvg size={240} />
                <span className="text-[11px] text-slate-500 mt-2 font-medium">
                  A négyzetes tagok eliminálása kivonással
                </span>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 4. SZEKCIÓ: Kidolgozott érettségi mintapéldák */}
      <TheorySection
        title="4. Kidolgozott érettségi mintapéldák teljes levezetéssel"
        badge="MINTAPÉLDÁK"
      >
        <TheoryCard
          title="1. Mintapélda: Kör és egyenes metszéspontjai"
          icon={<Target className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
        >
          <div className="space-y-4">
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-sm">
              <strong className="text-orange-700 dark:text-orange-300">Feladat:</strong> Határozzuk meg az alábbi egyenletrendszer valós megoldáspárjait:
              <div className="my-2 text-center text-sm font-bold font-mono text-slate-800 dark:text-slate-100">
                (I.) y = 2x - 3  &nbsp;&nbsp;és&nbsp;&nbsp;  (II.) x² + y² = 26
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <p>
                <strong>1. Behelyettesítés:</strong> Az (I.) egyenletből kifejezett $y$-t beírjuk a (II.) egyenletbe:
                <br />
                $x^2 + (2x - 3)^2 = 26 \implies x^2 + (4x^2 - 12x + 9) = 26 \implies 5x^2 - 12x - 17 = 0$.
              </p>
              <div className="space-y-1">
                <strong>2. Megoldóképlet:</strong>
                <div className="my-1">
                  <MathText text="x_{1,2} = \frac{12 \pm \sqrt{144 - 4 \cdot 5 \cdot (-17)}}{10} = \frac{12 \pm \sqrt{484}}{10} = \frac{12 \pm 22}{10}" />
                </div>
                <div>
                  <MathText text="x_1 = \frac{34}{10} = 3.4 \quad \text{és} \quad x_2 = \frac{-10}{10} = -1" />
                </div>
              </div>
              <p>
                <strong>3. $y$ kiszámítása a lineáris egyenletből ($y = 2x - 3$):</strong>
                <br />
                Ha $x_1 = 3.4 \implies y_1 = 2(3.4) - 3 = 6.8 - 3 = 3.8$. &nbsp;⇒ Első pont: <strong>(3.4; 3.8)</strong>.
                <br />
                Ha $x_2 = -1 \implies y_2 = 2(-1) - 3 = -2 - 3 = -5$. &nbsp;⇒ Második pont: <strong>(-1; -5)</strong>.
              </p>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-300 dark:border-emerald-800 font-semibold text-emerald-900 dark:text-emerald-200">
                Megoldáshalmaz: $M = &#123;(3.4; 3.8); (-1; -5)&#125;$. Geometriailag a kör és az egyenes 2 pontban metszi egymást.
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 mt-2">
              <CircleAndLineSystemSvg size={240} />
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 5. SZEKCIÓ: Típushibák és csapdák */}
      <TheorySection
        title="5. Tipikus hibák és pontvesztési csapdák az érettségin"
        badge="CSAPDÁK ÉS TIPPEK"
      >
        <TheoryCard
          title="A 3 leggyakoribb hiba, amiért pontlevonás jár"
          icon={<AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TheoryTrapBox
                title="1. Csapda: A gyökök összekeverése (keresztezett párosítás)"
                trap="Kiszámolják: x₁ = 2, x₂ = 5, y₁ = -1, y₂ = 8, és tetszőlegesen párosítják őket (pl. (2; 8) és (5; -1))."
                correction="Minden egyes x gyökhöz AZT az y értéket kell rendelni, amit pontosan abból az x-ből számoltunk ki a kifejezett összefüggéssel!"
              />

              <TheoryTrapBox
                title="2. Csapda: A szimmetrikus pár elfelejtése"
                trap="Szimmetrikus rendszernél az u² - 7u + 10 = 0 gyökei 2 és 5, és csak az (x=2, y=5) párt adják meg válaszként."
                correction="Mivel a rendszer szimmetrikus, az (x=5, y=2) számpár UGYANÚGY megoldás! Mindkét párt kötelező leírni!"
              />
            </div>

            <div className="flex flex-col items-center justify-center p-3 bg-orange-50 dark:bg-orange-950/30 rounded-xl border border-orange-200 dark:border-orange-800 mt-2">
              <OrderedPairsVerificationSvg size={250} />
              <span className="text-[11px] text-orange-800 dark:text-orange-300 mt-2 font-medium">
                Az összetartozó rendezett számpárok mátrixa és az ellenőrzés fontossága
              </span>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 6. SZEKCIÓ: Interaktív Másodfokú Egyenletrendszer Laboratórium */}
      <TheorySection
        title="6. Interaktív Másodfokú Rendszer Laboratórium"
        badge="INTERAKTÍV SZIMULÁTOR"
      >
        <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 dark:from-orange-950/30 dark:via-amber-950/20 dark:to-slate-900 border border-orange-200 dark:border-orange-800 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                Interaktív Rendszer Laboratórium
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Változtasd az egyenletek paramétereit, és figyeld a diszkriminánst és a metszéspontokat!
              </p>
            </div>

            {/* Módválasztó gombok */}
            <div className="flex gap-2">
              <Button
                variant={labMode === 'line-parabola' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLabMode('line-parabola')}
                className={labMode === 'line-parabola' ? 'bg-orange-600 hover:bg-orange-700 text-white' : ''}
              >
                Egyenes &amp; Parabola
              </Button>
              <Button
                variant={labMode === 'symmetric' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLabMode('symmetric')}
                className={labMode === 'symmetric' ? 'bg-orange-600 hover:bg-orange-700 text-white' : ''}
              >
                Szimmetrikus Rendszer
              </Button>
            </div>
          </div>

          {/* 1. MÓD: Egyenes és Parabola szimulátor */}
          {labMode === 'line-parabola' && (
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-orange-200 dark:border-orange-800 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-xs font-bold text-orange-700 dark:text-orange-300 uppercase tracking-wider mb-2">
                    Egyenletrendszer: y = x² és y = mx + b
                  </div>
                  <div className="my-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg text-center font-mono text-base font-bold text-orange-600 dark:text-orange-400">
                    y = x² &nbsp;&nbsp;és&nbsp;&nbsp; y = {paramM}x {paramB >= 0 ? `+ ${paramB}` : `- ${Math.abs(paramB)}`}
                  </div>

                  {/* Csúszkák */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Meredekség (m):</span>
                        <span className="font-mono font-bold text-orange-600">{paramM}</span>
                      </div>
                      <input
                        type="range"
                        min="-4"
                        max="4"
                        step="1"
                        value={paramM}
                        onChange={(e) => setParamM(parseInt(e.target.value, 10))}
                        className="w-full accent-orange-600"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Tengelymetszet (b):</span>
                        <span className="font-mono font-bold text-orange-600">{paramB}</span>
                      </div>
                      <input
                        type="range"
                        min="-4"
                        max="6"
                        step="1"
                        value={paramB}
                        onChange={(e) => setParamB(parseInt(e.target.value, 10))}
                        className="w-full accent-orange-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Eredmény panel */}
                <div className="flex flex-col justify-between bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-3">
                  <div>
                    <div className="font-bold text-slate-800 dark:text-slate-200 mb-2">
                      Algebrai Levezetés: x² - {paramM}x - ({paramB}) = 0
                    </div>
                    <div className="space-y-1 font-mono">
                      <div>Diszkrimináns: D = ({paramM})² - 4·1·(-{paramB}) = <strong className={discLP > 0 ? 'text-emerald-600' : discLP === 0 ? 'text-amber-600' : 'text-rose-600'}>{discLP}</strong></div>
                      <div>
                        Állapot: {discLP > 0 ? '✓ Szelő (2 metszéspont)' : discLP === 0 ? '✓ Érintő (1 metszéspont)' : '✗ Elkerülő (0 metszéspont)'}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-orange-200 dark:border-orange-800">
                    <div className="font-bold text-orange-800 dark:text-orange-300 mb-1">Metszéspontok:</div>
                    {lpRoots ? (
                      <div className="font-mono text-xs space-y-1 text-slate-800 dark:text-slate-200">
                        <div>P₁ = ({lpRoots.x1}; {lpRoots.y1})</div>
                        {discLP > 0 && <div>P₂ = ({lpRoots.x2}; {lpRoots.y2})</div>}
                      </div>
                    ) : (
                      <div className="text-rose-600 dark:text-rose-400 font-semibold">Nincs valós metszéspont (M = ∅)</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. MÓD: Szimmetrikus rendszer kalkulátor */}
          {labMode === 'symmetric' && (
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-orange-200 dark:border-orange-800 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-xs font-bold text-orange-700 dark:text-orange-300 uppercase tracking-wider mb-2">
                    Szimmetrikus Rendszer: x + y = S és x · y = P
                  </div>
                  <div className="my-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg text-center font-mono text-base font-bold text-orange-600 dark:text-orange-400">
                    x + y = {paramS} &nbsp;&nbsp;és&nbsp;&nbsp; x · y = {paramP}
                  </div>

                  {/* Csúszkák */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Összeg (S):</span>
                        <span className="font-mono font-bold text-orange-600">{paramS}</span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="15"
                        step="1"
                        value={paramS}
                        onChange={(e) => setParamS(parseInt(e.target.value, 10))}
                        className="w-full accent-orange-600"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Szorzat (P):</span>
                        <span className="font-mono font-bold text-orange-600">{paramP}</span>
                      </div>
                      <input
                        type="range"
                        min="-20"
                        max="30"
                        step="1"
                        value={paramP}
                        onChange={(e) => setParamP(parseInt(e.target.value, 10))}
                        className="w-full accent-orange-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Eredmény panel */}
                <div className="flex flex-col justify-between bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-3">
                  <div>
                    <div className="font-bold text-slate-800 dark:text-slate-200 mb-2">
                      Viète Segédegyenlet: u² - {paramS}u + ({paramP}) = 0
                    </div>
                    <div className="space-y-1 font-mono">
                      <div>Diszkrimináns: D = ({paramS})² - 4·({paramP}) = <strong className={discSym > 0 ? 'text-emerald-600' : discSym === 0 ? 'text-amber-600' : 'text-rose-600'}>{discSym}</strong></div>
                    </div>
                  </div>

                  <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-orange-200 dark:border-orange-800">
                    <div className="font-bold text-orange-800 dark:text-orange-300 mb-1">Szimmetrikus Megoldáspárok:</div>
                    {symRoots ? (
                      <div className="font-mono text-xs space-y-1 text-slate-800 dark:text-slate-200">
                        <div>(x₁; y₁) = ({symRoots.u1}; {symRoots.u2})</div>
                        <div>(x₂; y₂) = ({symRoots.u2}; {symRoots.u1})</div>
                      </div>
                    ) : (
                      <div className="text-rose-600 dark:text-rose-400 font-semibold">Nincs valós megoldáspár (D &lt; 0)</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Interaktív Kvíz modul */}
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-orange-200 dark:border-orange-800 space-y-3">
            <div className="text-xs font-bold text-orange-700 dark:text-orange-300 uppercase tracking-wider">
              Gyors Ellenőrző Kvíz: x + y = 6 és x · y = 8
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              Melyek a rendszer pontos megoldáspárjai?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuizAnswer('wrong1')}
                className={`text-xs ${quizAnswer === 'wrong1' ? 'border-rose-500 bg-rose-50 text-rose-800' : ''}`}
              >
                Csak (2; 4)
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuizAnswer('correct')}
                className={`text-xs ${quizAnswer === 'correct' ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : ''}`}
              >
                (2; 4) és (4; 2)
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuizAnswer('wrong2')}
                className={`text-xs ${quizAnswer === 'wrong2' ? 'border-rose-500 bg-rose-50 text-rose-800' : ''}`}
              >
                (1; 5) és (5; 1)
              </Button>
            </div>
            {quizAnswer === 'correct' && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 rounded-lg text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                Tökéletes! Az u² - 6u + 8 = 0 gyökei 2 és 4. A szimmetria miatt mindkét számpár megoldás: (2; 4) és (4; 2)!
              </div>
            )}
            {quizAnswer && quizAnswer !== 'correct' && (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-300 rounded-lg text-xs font-semibold text-rose-800 dark:text-rose-300">
                Nem pontos! Ne feledd: a szimmetrikus rendszereknél az ismeretlenek felcserélhetők!
              </div>
            )}
          </div>

          {/* Kvíz indító gomb */}
          <div className="pt-2 flex justify-end">
            <Button
              onClick={onStartQuiz}
              className="bg-orange-600 hover:bg-orange-700 text-white flex items-center gap-2 font-bold px-5 py-2.5 shadow-md"
            >
              Tovább a Másodfokú Rendszerek Kvízre!
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
