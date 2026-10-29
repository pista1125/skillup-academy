import React, { useState, useMemo } from 'react';
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
  Sliders,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  FileCode,
  Layers,
  Scale,
  Calculator,
  Square
} from 'lucide-react';
import {
  PythagorasTheoremSvg,
  PythagoreanTriplesSvg,
  ConversePythagorasSvg,
  GeometricApplicationSvg
} from './PythagorasFigures';

interface PythagorasTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const PythagorasTheory: React.FC<PythagorasTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV PITAGORASZ LABOR ÁLLAPOTOK ---
  const [legA, setLegA] = useState<number>(6);
  const [legB, setLegB] = useState<number>(8);

  // Számítások
  const pythagorasData = useMemo(() => {
    const a2 = legA * legA;
    const b2 = legB * legB;
    const c2 = a2 + b2;
    const c = Math.sqrt(c2);
    const isInteger = Math.abs(c - Math.round(c)) < 1e-9;
    const perimeter = legA + legB + c;
    const area = (legA * legB) / 2;

    return {
      a2,
      b2,
      c2,
      c: isInteger ? Math.round(c) : Number(c.toFixed(2)),
      isInteger,
      perimeter: Number(perimeter.toFixed(2)),
      area: Number(area.toFixed(2))
    };
  }, [legA, legB]);

  return (
    <TheoryTemplate
      title="3. Pitagorasz tétele"
      subtitle="A derékszögű háromszögek oldalai közötti összefüggés, területalapú bizonyítás, a tétel megfordítása és geometriai alkalmazásai"
      grade={9}
      chapterId="bevezetes-a-geometriaba"
      topicId="g9-geom-pitagorasz"
      topicBadge="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA • TANANYAG"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        title: "FŐ SZABÁLYOK: PITAGORASZ TÉTELE",
        description: "Bármely derékszögű háromszögben a két befogó négyzetének összege egyenlő az átfogó négyzetével:",
        formula: "a^2 + b^2 = c^2",
        details: (
          <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400 font-black">Átfogó kiszámítása:</span>
              <span className="font-mono text-slate-800 dark:text-slate-100">c = √(a² + b²)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 dark:text-emerald-400 font-black">Befogó kiszámítása:</span>
              <span className="font-mono text-slate-800 dark:text-slate-100">a = √(c² - b²)  |  b = √(c² - a²)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-600 dark:text-purple-400 font-black">Pitagorasz-tétel megfordítása:</span>
              <span className="font-mono text-slate-800 dark:text-slate-100">ha a² + b² = c²  ⇒  a háromszög derékszögű</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-600 dark:text-amber-400 font-black">Alap számhármasok:</span>
              <span className="font-mono text-slate-800 dark:text-slate-100">(3, 4, 5), (5, 12, 13), (8, 15, 17), (7, 24, 25) és ezek többszörösei</span>
            </div>
          </div>
        )
      }}
    >
      {/* =========================================================================
          1. SZEKCIÓ: A TÉTEL KIMONDÁSA ÉS GEOMETRIAI JELENTÉSE
      ========================================================================= */}
      <TheorySection
        title="1. A Pitagorasz-tétel kimondása és területi jelentése"
        icon={<Triangle className="w-6 h-6 text-blue-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
            <p>
              A <strong>Pitagorasz-tétel</strong> a matematika egyik legfontosabb és legtöbbször alkalmazott tétele. Kizárólag <strong>derékszögű háromszögekre</strong> érvényes!
            </p>
            <TheoryCallout
              title="A tétel kimondása"
              type="info"
            >
              Bármely derékszögű háromszögben a befogók négyzetének összege egyenlő az átfogó négyzetével:
              <div className="text-center text-lg font-bold text-indigo-700 dark:text-indigo-300 py-1 font-mono">
                $a^2 + b^2 = c^2$
              </div>
            </TheoryCallout>
            <ul className="space-y-2 text-xs">
              <li className="p-2.5 bg-blue-50 rounded-lg border border-blue-200">
                <strong className="text-blue-900 block text-sm">Geometriai értelmezés (Területek összege):</strong>
                Ha a derékszögű háromszög mindegyik oldalára kifelé egy-egy négyzetet rajzolunk, akkor a két <em>befogóra</em> emelt négyzet területének összege ($a^2 + b^2$) pontosan megegyezik az <em>átfogóra</em> emelt négyzet területével ($c^2$).
              </li>
              <li className="p-2.5 bg-indigo-50 rounded-lg border border-indigo-200">
                <strong className="text-indigo-900 block text-sm">Nevezéktan:</strong>
                <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-600">
                  <li><strong>Befogók ($a, b$):</strong> a derékszöget bezáró két rövidebb oldal.</li>
                  <li><strong>Átfogó ($c$):</strong> a derékszöggel szemközti, mindig leghosszabb oldal.</li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <PythagorasTheoremSvg size={350} />
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          2. SZEKCIÓ: HIÁNYZÓ OLDALAK KISZÁMÍTÁSA (ALGEBRAI LÉPÉSEK)
      ========================================================================= */}
      <TheorySection
        title="2. Számítások derékszögű háromszögben: átfogó és befogó keresése"
        icon={<Calculator className="w-6 h-6 text-emerald-600" />}
      >
        <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
          <p>
            A tételből két alapesetet különböztetünk meg attól függően, hogy az átfogót vagy az egyik befogót keressük:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                A) ÁTFOGÓ KISZÁMÍTÁSA (ismerjük $a$-t és $b$-t)
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                A két befogó négyzetét <strong>összeadjuk</strong>, majd négyzetgyököt vonunk:
              </p>
              <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-emerald-100 text-center font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                c = √(a² + b²)
              </div>
              <p className="text-xs text-slate-500 italic">
                <strong>Példa:</strong> a = 6 cm, b = 8 cm → c = √(6² + 8²) = √(36 + 64) = √100 = 10 cm.
              </p>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-800 space-y-2">
              <div className="flex items-center gap-2 text-blue-800 dark:text-blue-300 font-bold">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                B) BEFOGÓ KISZÁMÍTÁSA (ismerjük $a$-t és $c$-t)
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Az átfogó négyzetéből <strong>kivonjuk</strong> az ismert befogó négyzetét:
              </p>
              <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-blue-100 text-center font-mono text-blue-700 dark:text-blue-400 font-bold">
                b = √(c² - a²)
              </div>
              <p className="text-xs text-slate-500 italic">
                <strong>Példa:</strong> c = 13 cm, a = 5 cm → b = √(13² - 5²) = √(169 - 25) = √144 = 12 cm.
              </p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          3. SZEKCIÓ: A PITAGORASZ-TÉTEL MEGFORDÍTÁSA
      ========================================================================= */}
      <TheorySection
        title="3. A Pitagorasz-tétel megfordítása és háromszögek szög szerinti osztályozása"
        icon={<Scale className="w-6 h-6 text-purple-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
            <p>
              Gyakori feladat, hogy egy háromszög három oldalának ismeretében el kell döntenünk, hogy az derékszögű-e. Erre szolgál a tétel megfordítása.
            </p>
            <TheoryCallout
              title="A Pitagorasz-tétel megfordítása"
              type="tip"
            >
              Ha egy háromszög leghosszabb oldalának négyzete megegyezik a két rövidebb oldal négyzetösszegével ($a^2 + b^2 = c^2$), akkor a háromszög <strong>derékszögű</strong>, és a $c$ oldallal szemben fekszik a derékszög.
            </TheoryCallout>
            <p className="text-xs text-slate-600">
              Az összefüggés általánosítása lehetővé teszi, hogy pusztán az oldalakból megállapítsuk a legnagyobb szöget:
            </p>
            <ul className="space-y-1.5 text-xs">
              <li className="p-2 bg-blue-50 rounded border border-blue-200">
                <strong>$a^2 + b^2 &gt; c^2$:</strong> a háromszög <strong>hegyesszögű</strong> (minden szöge &lt; 90°).
              </li>
              <li className="p-2 bg-emerald-50 rounded border border-emerald-200">
                <strong>$a^2 + b^2 = c^2$:</strong> a háromszög <strong>derékszögű</strong>.
              </li>
              <li className="p-2 bg-amber-50 rounded border border-amber-200">
                <strong>$a^2 + b^2 &lt; c^2$:</strong> a háromszög <strong>tompaszögű</strong> (a $c$ oldallal szemközti szög &gt; 90°).
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <ConversePythagorasSvg size={340} />
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          4. SZEKCIÓ: PITAGORASZI SZÁMHÁRMASOK
      ========================================================================= */}
      <TheorySection
        title="4. Nevezetes pitagoraszi számhármasok és többszöröseik"
        icon={<Square className="w-6 h-6 text-amber-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
            <p>
              Azon három pozitív egész számot $(a, b, c)$, amelyekre $a^2 + b^2 = c^2$ teljesül, <strong>pitagoraszi számhármasnak</strong> nevezzük.
            </p>
            <ul className="space-y-2 text-xs">
              <li className="p-2.5 bg-amber-50 rounded-lg border border-amber-200">
                <strong className="text-amber-900 block text-sm">Legfontosabb primitív számhármasok (relatív prímek):</strong>
                <ul className="list-disc list-inside mt-1 space-y-1 text-slate-700">
                  <li><strong>$(3, 4, 5):$</strong> $3^2 + 4^2 = 9 + 16 = 25 = 5^2$</li>
                  <li><strong>$(5, 12, 13):$</strong> $5^2 + 12^2 = 25 + 144 = 169 = 13^2$</li>
                  <li><strong>$(8, 15, 17):$</strong> $8^2 + 15^2 = 64 + 225 = 289 = 17^2$</li>
                  <li><strong>$(7, 24, 25):$</strong> $7^2 + 24^2 = 49 + 576 = 625 = 25^2$</li>
                </ul>
              </li>
              <li className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200">
                <strong className="text-emerald-900 block text-sm">Többszörösök szabálya ($k \cdot a, k \cdot b, k \cdot c$):</strong>
                Ha egy primitív számhármas mindhárom tagját megszorozzuk egy tetszőleges $k$ pozitív egész számmal, ismét pitagoraszi számhármast kapunk:
                <p className="mt-1 text-slate-600">
                  Például $(3, 4, 5) \cdot 2 = \mathbf{(6, 8, 10)}$; $(3, 4, 5) \cdot 3 = \mathbf{(9, 12, 15)}$.
                </p>
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <PythagoreanTriplesSvg size={340} />
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          5. SZEKCIÓ: GEOMETRIAI ALKALMAZÁSOK
      ========================================================================= */}
      <TheorySection
        title="5. Geometriai és gyakorlati alkalmazások (átlók, magasságok)"
        icon={<Layers className="w-6 h-6 text-rose-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
            <p>
              A síkgeometriában számtalan olyan alakzat fordul elő, amely derékszögű háromszögre bontható, így alkalmazható rá a Pitagorasz-tétel:
            </p>
            <ul className="space-y-2 text-xs">
              <li className="p-2.5 bg-purple-50 rounded-lg border border-purple-200">
                <strong className="text-purple-900 block text-sm">1. Téglalap és négyzet átlója:</strong>
                A téglalap átlója két egybevágó derékszögű háromszögre osztja a síkidomot.
                <div className="font-mono mt-1 text-purple-800">
                  Téglalap: d = √(a² + b²) &nbsp;|&nbsp; Négyzet: d = √(a² + a²) = a√2
                </div>
              </li>
              <li className="p-2.5 bg-rose-50 rounded-lg border border-rose-200">
                <strong className="text-rose-900 block text-sm">2. Egyenlő szárú háromszög magassága:</strong>
                Az alaphoz tartozó magasságvonal felezi az alapot, így derékszögű háromszöget alkot:
                <div className="font-mono mt-1 text-rose-800">
                  m = √(b² - (a/2)²)
                </div>
              </li>
              <li className="p-2.5 bg-teal-50 rounded-lg border border-teal-200">
                <strong className="text-teal-900 block text-sm">3. Szabályos háromszög magassága és területe:</strong>
                <div className="font-mono mt-1 text-teal-800">
                  m = √(a² - (a/2)²) = (a√3) / 2 &nbsp;|&nbsp; T = (a²√3) / 4
                </div>
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <GeometricApplicationSvg size={340} />
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          INTERAKTÍV PITAGORASZ LABORATÓRIUM (A TANANYAG VÉGÉN)
      ========================================================================= */}
      <TheoryCard
        title="Interaktív Pitagorasz Laboratórium"
        icon={<Sliders className="w-6 h-6 text-blue-600" />}
      >
        <div className="space-y-6">
          <p className="text-slate-600 leading-relaxed text-sm">
            Állítsd be a két befogó ($a$ és $b$) hosszát a csúszkákkal! Figyeld meg az átfogó ($c$) és a befogókra emelt négyzetek területének alakulását valós időben!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-900/60 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
            {/* Bal: Csúszkák és számítások */}
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-sm font-semibold mb-1.5">
                  <span className="text-emerald-700 dark:text-emerald-400">a befogó hossza:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{legA} cm</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  step="1"
                  value={legA}
                  onChange={(e) => setLegA(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm font-semibold mb-1.5">
                  <span className="text-blue-700 dark:text-blue-400">b befogó hossza:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{legB} cm</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  step="1"
                  value={legB}
                  onChange={(e) => setLegB(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              {/* Kiértékelés kártya */}
              <div className="p-4 rounded-xl border space-y-2.5 bg-indigo-50/70 border-indigo-200 text-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-900 uppercase tracking-wide">Pitagorasz-egyenlet:</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-indigo-200 text-indigo-900">
                    {pythagorasData.isInteger ? 'Egész számhármas!' : 'Valós szám'}
                  </span>
                </div>

                <div className="font-mono text-sm space-y-1">
                  <div>a² = {legA}² = {pythagorasData.a2} cm²</div>
                  <div>b² = {legB}² = {pythagorasData.b2} cm²</div>
                  <div className="font-bold text-indigo-700 pt-1 border-t border-indigo-200">
                    c² = a² + b² = {pythagorasData.a2} + {pythagorasData.b2} = {pythagorasData.c2} cm²
                  </div>
                  <div className="text-base font-black text-purple-700">
                    c = √{pythagorasData.c2} ≈ {pythagorasData.c} cm
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-indigo-200 text-xs text-slate-600">
                  <div><strong>Kerület ($K$):</strong> {pythagorasData.perimeter} cm</div>
                  <div><strong>Terület ($T$):</strong> {pythagorasData.area} cm²</div>
                </div>
              </div>
            </div>

            {/* Jobb: Dinamikus SVG illusztráció */}
            <div className="flex flex-col items-center justify-center p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 min-h-[220px]">
              <svg viewBox="0 0 240 180" className="w-full max-w-[240px] h-auto select-none">
                {/* Dinamikus méretezés a megadott legA és legB arányában */}
                {(() => {
                  const maxVal = Math.max(legA, legB);
                  const scale = 110 / maxVal;
                  const w = legA * scale;
                  const h = legB * scale;
                  const originX = 40;
                  const originY = 150;

                  return (
                    <g>
                      {/* Háromszög: (originX, originY) derékszögű csúcs, (originX + w, originY) befogó a, (originX, originY - h) befogó b */}
                      <polygon
                        points={`${originX},${originY} ${originX + w},${originY} ${originX},${originY - h}`}
                        fill="rgba(99, 102, 241, 0.15)"
                        stroke="#4f46e5"
                        strokeWidth="2.5"
                      />

                      {/* Magyar derékszög jelölése (negyedkörív ponttal) */}
                      <path
                        d={`M ${originX} ${originY - 14} A 14 14 0 0 1 ${originX + 14} ${originY}`}
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="1.5"
                      />
                      <circle cx={originX + 5} cy={originY - 5} r="1.5" fill="#ef4444" />

                      {/* Oldalcímkék */}
                      <text x={originX + w / 2} y={originY + 16} fontSize="11" fontWeight="bold" textAnchor="middle" fill="#059669">
                        a = {legA}
                      </text>
                      <text x={originX - 18} y={originY - h / 2} fontSize="11" fontWeight="bold" textAnchor="middle" fill="#2563eb">
                        b = {legB}
                      </text>
                      <text
                        x={originX + w / 2 + 10}
                        y={originY - h / 2 - 6}
                        fontSize="11"
                        fontWeight="bold"
                        fill="#7c3aed"
                      >
                        c = {pythagorasData.c}
                      </text>
                    </g>
                  );
                })()}
              </svg>
              <div className="text-[11px] text-slate-500 mt-2 text-center">
                Magyar derékszög-jelölés (negyedkörív belső ponttal)
              </div>
            </div>
          </div>
        </div>
      </TheoryCard>

      {/* =========================================================================
          TIPIKUS HIBÁK ÉS BUKTATÓK
      ========================================================================= */}
      <TheoryTrapBox
        title="Tipikus buktatók és gyakori hibák a Pitagorasz-tételnél"
        traps={[
          {
            trap: "A tétel felírása nem derékszögű háromszögre",
            correction: "A Pitagorasz-tétel KIZÁRÓLAG derékszögű háromszögben érvényes! Hegyesszögű vagy tompaszögű háromszög esetén nem használható (ott a koszinusztétel érvényes).",
            severity: "critical"
          },
          {
            trap: "Befogó keresésekor is összeadjuk a négyzeteket a kivonás helyett",
            correction: "Csak az átfogó kiszámításakor adunk össze: c² = a² + b². Ha befogót keresünk, a leghosszabb oldal (átfogó) négyzetéből KIVONJUK a másik befogó négyzetét: a² = c² - b²!",
            severity: "critical"
          },
          {
            trap: "√(a² + b²) = a + b felbontás",
            correction: "Az összeg négyzetgyöke NEM egyenlő a tagok négyzetgyökeinek összegével! Például √(9 + 16) = √25 = 5, míg √9 + √16 = 3 + 4 = 7 ≠ 5!",
            severity: "moderate"
          },
          {
            trap: "A tétel megfordításánál nem a leghosszabb oldalt választjuk c-nek",
            correction: "A megfordítás ellenőrzésekor a leghosszabb oldal négyzete kell, hogy a jobb oldalon álljon. Például a 3, 5, 4 oldalaknál a leghosszabb az 5, így 3² + 4² = 5².",
            severity: "moderate"
          }
        ]}
      />

      {/* =========================================================================
          ÖSSZEFOGLALÓ TÁBLÁZAT
      ========================================================================= */}
      <TheoryTable
        title="Pitagorasz-tétel és alkalmazási képletek áttekintése"
        headers={['Alkalmazás / Típus', 'Adott elemek', 'Keresett elem', 'Képlet / Összefüggés']}
        rows={[
          ['Átfogó kiszámítása', 'a és b befogók', 'c átfogó', 'c = √(a² + b²)'],
          ['Befogó kiszámítása', 'c átfogó és a befogó', 'b befogó', 'b = √(c² - a²)'],
          ['Pitagorasz megfordítása', 'a, b, c oldalak', 'Derékszögű-e?', 'a² + b² = c² teljesülése'],
          ['Téglalap átlója', 'a és b oldalak', 'd átló', 'd = √(a² + b²)'],
          ['Négyzet átlója', 'a oldal', 'd átló', 'd = a · √2'],
          ['Szabályos háromszög magassága', 'a oldal', 'm magasság', 'm = (a · √3) / 2'],
          ['Szabályos háromszög területe', 'a oldal', 'T terület', 'T = (a² · √3) / 4']
        ]}
      />
    </TheoryTemplate>
  );
};
