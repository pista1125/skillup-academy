import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import {
  Zap,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Calculator,
  Layers,
  Scale,
  Divide
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PowersTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const PowersTheory: React.FC<PowersTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive power state
  const [base, setBase] = useState<number>(2);
  const [exponent, setExponent] = useState<number>(4);

  // Interactive division of powers with equal exponents
  const [divBaseA, setDivBaseA] = useState<number>(12);
  const [divBaseB, setDivBaseB] = useState<number>(4);
  const [divExp, setDivExp] = useState<number>(3);

  // Self-test question state
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const calculatePower = (b: number, exp: number) => {
    if (exp < 0) {
      return { val: 'Csak 0 és pozitív kitevő 8. osztályban', expanded: '-' };
    }
    if (b === 0 && exp === 0) {
      return { val: 'Nem értelmezhető (0⁰ nem létezik)', expanded: '-' };
    }
    if (exp === 0) {
      return { val: '1', expanded: 'Bármely nem nulla szám 0. hatványa 1' };
    }
    const val = Math.pow(b, exp);
    const factors = Array(exp).fill(b).join(' · ');
    return { val: String(val), expanded: factors };
  };

  const powerInfo = calculatePower(base, Math.max(0, exponent));

  const quotientBase = divBaseB !== 0 ? divBaseA / divBaseB : 0;
  const quotientPowerVal = divBaseB !== 0 ? Math.pow(quotientBase, Math.max(0, divExp)) : 0;

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      documentId="grade-8-szamok-betuk-hatvanyozas"
      pdfFilename="8_osztaly_hatvanyozas_tananyag.pdf"
      title="6. Hatványozás"
      subtitle="A hatvány fogalma, 0 kitevő, azonos alapú és azonos kitevőjű hatványok műveletei (kiemelten az osztás), valamint a számok normálalakja"
      quickRule={{
        label: "Hatványozás alapszabályai",
        formula: "a⁰ = 1  |  aⁿ · aᵐ = aⁿ⁺ᵐ  |  aⁿ : aᵐ = aⁿ⁻ᵐ  |  aⁿ · bⁿ = (a·b)ⁿ  |  aⁿ : bⁿ = (a:b)ⁿ  |  (aⁿ)ᵐ = aⁿ·ᵐ"
      }}
      themeColor="amber"
    >
      {/* 1. FEJEZET: A HATVÁNY FOGALMA ÉS A NULLADIK HATVÁNY */}
      <TheorySection
        number={1}
        title="A hatvány fogalma és a 0. kitevő értelmezése"
        icon={<Zap className="w-5 h-5 text-amber-600" />}
        badgeColor="amber"
      >
        <TheoryCallout variant="info" title="Miért egyenlő minden nem nulla szám nulladik hatványa 1-gyel?">
          Figyeld meg a 2 pozitív hatványainak sorozatát, ahogy a kitevő 1-gyel csökken (mindig osztunk az alappal, azaz 2-vel):
          <div className="mt-2 p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-slate-800 font-mono font-bold text-xs flex flex-wrap items-center gap-2 text-amber-900 dark:text-amber-200">
            <span>2⁴ = 16</span>
            <span className="text-slate-400">⟶ (:2) ⟶</span>
            <span>2³ = 8</span>
            <span className="text-slate-400">⟶ (:2) ⟶</span>
            <span>2² = 4</span>
            <span className="text-slate-400">⟶ (:2) ⟶</span>
            <span>2¹ = 2</span>
            <span className="text-slate-400">⟶ (:2) ⟶</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-black px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/50 rounded-lg border border-emerald-300 dark:border-emerald-700">2⁰ = 1</span>
          </div>
          <p className="mt-2 text-xs">
            A számsorozat szabályosságának megőrzése érdekében bármely nem nulla valós szám nulladik hatványa pontosan <strong>1</strong> (a⁰ = 1, ha a ≠ 0). A <strong>0⁰ kifejezés nincs értelmezve</strong>!
          </p>
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <TheoryCard
            title="1. Pozitív egész kitevő"
            badge="aⁿ = a · a · ... · a"
            badgeColor="amber"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Az alap önmagával vett többszörös szorzata (pontosan n darab tényező).
            </p>
            <div className="mt-2 space-y-1 text-xs font-mono font-bold text-amber-800 dark:text-amber-300">
              <div>• 3⁴ = 3 · 3 · 3 · 3 = 81</div>
              <div>• 2⁵ = 32</div>
              <div>• (2/3)³ = 2³/3³ = 8/27</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="2. Nulladik hatvány"
            badge="a⁰ = 1 (ha a ≠ 0)"
            badgeColor="emerald"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Bármely nem nulla szám 0-ik hatványa mindig 1.
            </p>
            <div className="mt-2 space-y-1 text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300">
              <div>• 7⁰ = 1</div>
              <div>• (-35.4)⁰ = 1</div>
              <div>• (4/9)⁰ = 1</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="3. Előjelek szabálya"
            badge="(-a)ⁿ vs -aⁿ"
            badgeColor="purple"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Negatív alap páros kitevőn pozitív, páratlan kitevőn negatív!
            </p>
            <div className="mt-2 space-y-1 text-xs font-mono font-bold text-purple-800 dark:text-purple-300">
              <div>• (-2)⁴ = +16 (páros kitevő)</div>
              <div>• (-2)³ = -8 (páratlan kitevő)</div>
              <div>• -2⁴ = -16 (zárójel nélkül!)</div>
            </div>
          </TheoryCard>
        </div>

        {/* Interaktív Hatványozó */}
        <div className="mt-5 p-5 bg-slate-50 dark:bg-slate-850 rounded-2xl border-2 border-amber-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-300">
            <Sparkles className="w-4 h-4" />
            Interaktív Hatványozó Vizualizáló
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Alap (a):</label>
              <input
                type="number"
                value={base}
                onChange={(e) => setBase(parseFloat(e.target.value) || 0)}
                className="w-20 h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-center"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Kitevő (n ≥ 0):</label>
              <input
                type="number"
                min="0"
                max="10"
                value={exponent}
                onChange={(e) => setExponent(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-20 h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-center"
              />
            </div>

            <div className="p-2.5 px-4 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-700 font-mono font-bold text-xs sm:text-sm text-amber-800 dark:text-amber-300">
              {base}<sup>{exponent}</sup> = {powerInfo.expanded} = <strong>{powerInfo.val}</strong>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 2. FEJEZET: A HATVÁNYOZÁS AZONOSSÁGAI */}
      <TheorySection
        number={2}
        title="A hatványozás azonosságai (Azonos alapú és azonos kitevőjű hatványok)"
        icon={<Layers className="w-5 h-5 text-amber-600" />}
        badgeColor="amber"
      >
        <TheoryTable
          headers={['Azonosság Neve', 'Képlet', 'Szöveges Szabály', 'Példa']}
          rows={[
            ['Azonos alapúak szorzása', 'aⁿ · aᵐ = aⁿ⁺ᵐ', 'Az alapot változatlanul hagyjuk, a kitevőket összeadjuk.', '2³ · 2⁴ = 2³⁺⁴ = 2⁷ = 128'],
            ['Azonos alapúak osztása', 'aⁿ : aᵐ = aⁿ⁻ᵐ (a ≠ 0, n ≥ m)', 'Az alapot változatlanul hagyjuk, a kitevőket kivonjuk.', '5⁶ : 5⁴ = 5⁶⁻⁴ = 5² = 25'],
            ['Azonos kitevőjűek osztása (Hányados hatványozása)', 'aⁿ : bⁿ = (a : b)ⁿ = (a/b)ⁿ (b ≠ 0)', 'Az alapokat elosztjuk, a közös kitevőt változatlanul hagyjuk.', '12³ : 4³ = (12 : 4)³ = 3³ = 27'],
            ['Azonos kitevőjűek szorzása (Szorzat hatványozása)', 'aⁿ · bⁿ = (a · b)ⁿ', 'Az alapokat összeszorozzuk, a közös kitevőt változatlanul hagyjuk.', '2⁴ · 5⁴ = (2 · 5)⁴ = 10⁴ = 10 000'],
            ['Hatvány hatványozása', '(aⁿ)ᵐ = aⁿ·ᵐ', 'Az alapot változatlanul hagyjuk, a kitevőket összeszorozzuk.', '(3²)³ = 3²·³ = 3⁶ = 729']
          ]}
        />

        {/* Külön kiemelt blokk: Azonos kitevőjű hatványok osztása */}
        <div className="mt-5 p-5 bg-gradient-to-r from-blue-50/70 to-indigo-50/70 dark:from-slate-850 dark:to-slate-900 rounded-2xl border-2 border-blue-200 dark:border-blue-900/50 space-y-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-700 dark:text-blue-300">
            <Divide className="w-4 h-4" />
            Kiemelt Tananyag: Azonos Kitevőjű Hatványok Osztása (Hányados Hatványozása)
          </div>

          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            Ha két hatvány kitevője megegyezik, sokkal könnyebb először az alapokat elosztani, és csak az eredményt a hatványra emelni:
            <br />
            <strong className="font-mono text-blue-800 dark:text-blue-300">aⁿ : bⁿ = (a : b)ⁿ</strong> vagy tört alakban: <strong className="font-mono text-blue-800 dark:text-blue-300">aⁿ / bⁿ = (a / b)ⁿ</strong>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-slate-800">
              <div className="text-blue-600 dark:text-blue-400 font-bold mb-1">Példa 1: Egész számok osztása</div>
              <div>50² : 25² = (50 : 25)² = <strong>2² = 4</strong></div>
              <div className="text-[11px] text-slate-500 mt-1">(Gyorsabb, mint 2500 : 625 = 4)</div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-slate-800">
              <div className="text-blue-600 dark:text-blue-400 font-bold mb-1">Példa 2: Tört hatványozása</div>
              <div>(2/5)³ = 2³ / 5³ = <strong>8 / 125 = 0.064</strong></div>
              <div className="text-[11px] text-slate-500 mt-1">A számlálót és nevezőt is a 3. hatványra emeljük.</div>
            </div>
          </div>

          {/* Interaktív azonos kitevőjű osztó vizualizáló */}
          <div className="pt-2 border-t border-blue-100 dark:border-slate-800 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
              <span>(</span>
              <input
                type="number"
                value={divBaseA}
                onChange={(e) => setDivBaseA(parseFloat(e.target.value) || 0)}
                className="w-14 h-8 px-1.5 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-xs bg-white dark:bg-slate-900 text-center"
              />
              <span>:</span>
              <input
                type="number"
                value={divBaseB}
                onChange={(e) => setDivBaseB(parseFloat(e.target.value) || 1)}
                className="w-14 h-8 px-1.5 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-xs bg-white dark:bg-slate-900 text-center"
              />
              <span>)<sup>{divExp}</sup> =</span>
            </div>

            <div className="flex items-center gap-1 text-xs font-bold text-slate-700 dark:text-slate-300">
              <span>Kitevő:</span>
              <input
                type="number"
                min="1"
                max="6"
                value={divExp}
                onChange={(e) => setDivExp(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-12 h-8 px-1.5 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-xs bg-white dark:bg-slate-900 text-center"
              />
            </div>

            <div className="p-2 px-3 rounded-xl bg-white dark:bg-slate-900 border border-blue-300 dark:border-blue-800 font-mono font-bold text-xs text-blue-900 dark:text-blue-300">
              = ({quotientBase})<sup>{divExp}</sup> = <strong>{quotientPowerVal}</strong>
            </div>
          </div>
        </div>

        <TheoryTrapBox title="Csapdahelyzet: (-a)ⁿ és -aⁿ előjele, valamint az összeadás tévhite">
          <div className="space-y-1">
            <p>
              • <strong>(-2)⁴ = +16</strong> (páros kitevő esetén a negatív szám négyzete/páros hatványa mindig pozitív).
              <br />
              • <strong>-2⁴ = -16</strong> (zárójel nélkül a hatványozás megelőzi a negatív előjelet).
              <br />
              • <strong>VIGYÁZAT: (a + b)ⁿ ≠ aⁿ + bⁿ!</strong> Összeget és különbséget nem lehet tagonként hatványozni (pl. (3 + 4)² = 7² = 49, míg 3² + 4² = 9 + 16 = 25).
            </p>
          </div>
        </TheoryTrapBox>
      </TheorySection>

      {/* 3. FEJEZET: SZÁMOK NORMÁLALAKJA */}
      <TheorySection
        number={3}
        title="A számok normálalakja (10-nél nagyobb számok tudományos jelölése)"
        icon={<Calculator className="w-5 h-5 text-amber-600" />}
        badgeColor="amber"
      >
        <TheoryCallout variant="info" title="Mi a 10-nél nagyobb számok normálalakjának pontos definíciója?">
          Egy 10-nél nagyobb szám normálalakja: a · 10ᵏ, ahol az <strong>a</strong> mantissza 1 ≤ a &lt; 10 közötti szám, a <strong>k</strong> pedig pozitív egész szám (k ∈ ℕ⁺).
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TheoryCard
            title="1. Nagy számok átírása normálalakra"
            badge="10-nél nagyobb számok (k > 0)"
            badgeColor="emerald"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              A tizedesvesszőt balra toljuk, amíg 1 és 10 közötti számot nem kapunk. Ahány hellyel balra toltuk, akkora a 10 pozitív kitevője.
            </p>
            <div className="mt-2 space-y-1 text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300">
              <div>• 450 000 = 4.5 · 10⁵</div>
              <div>• 384 400 km = 3.844 · 10⁵ km (Föld-Hold távolság)</div>
              <div>• 8 000 000 000 = 8 · 10⁹ (Föld népessége)</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="2. Számok összehasonlítása és nagyságrendje"
            badge="Kitevők összehasonlítása"
            badgeColor="amber"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Két normálalakban adott pozitív szám közül az a nagyobb, amelyiknél a 10-es hatvány kitevője nagyobb. Ha a kitevők megegyeznek, a mantisszák döntenek.
            </p>
            <div className="mt-2 space-y-1 text-xs font-mono font-bold text-amber-800 dark:text-amber-300">
              <div>• 4.2 · 10⁶ &gt; 9.8 · 10⁵ (mert 4 200 000 &gt; 980 000)</div>
              <div>• 7.5 · 10⁴ &gt; 6.9 · 10⁴ (mert 7.5 &gt; 6.9)</div>
            </div>
          </TheoryCard>
        </div>

        <div className="mt-4 p-4 bg-amber-50/60 dark:bg-slate-850 rounded-2xl border border-amber-200 dark:border-slate-700 space-y-2">
          <div className="text-xs font-black uppercase tracking-wider text-amber-800 dark:text-amber-300">
            Műveletek normálalakban adott számokkal:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-800 dark:text-slate-200">
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <strong>Szorzás:</strong> (2 · 10⁴) · (3 · 10⁵) = (2 · 3) · 10⁴⁺⁵ = <strong>6 · 10⁹</strong>
            </div>
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <strong>Osztás:</strong> (8 · 10⁷) : (2 · 10³) = (8 : 2) · 10⁷⁻³ = <strong>4 · 10⁴</strong>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 4. FEJEZET: ÖSSZETETT FELADATOK ÉS ÖNELLENŐRZÉS */}
      <TheorySection
        number={4}
        title="Összetett kifejezések és önellenőrzés"
        icon={<Scale className="w-5 h-5 text-amber-600" />}
        badgeColor="amber"
      >
        <TheoryCallout variant="tip" title="Tipp: Azonos alapra vagy azonos kitevőre hozás">
          Ha egy kifejezésben különböző alapok szerepelnek, alakítsd át őket vagy közös prímhatványokká (pl. 4 = 2², 8 = 2³), vagy alkalmazd az <strong>azonos kitevőjű hatványok osztását</strong>: aⁿ : bⁿ = (a:b)ⁿ!
        </TheoryCallout>

        {/* Önellenőrző kérdés */}
        <div className="mt-5 p-5 bg-gradient-to-br from-amber-50/70 to-orange-50/70 dark:from-slate-850 dark:to-slate-900 rounded-2xl border-2 border-amber-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <h4 className="text-sm font-black text-slate-900 dark:text-white">
              Önellenőrző Kérdés: Mennyi a (18³ : 6³) · 2³ kifejezés pontos értéke?
            </h4>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Használd az azonos kitevőjű hatványok osztásának (18³ : 6³ = (18:6)³) és szorzásának azonosságát!
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            {[
              { text: '6³ = 216', value: 1 },
              { text: '3³ = 27', value: 2 },
              { text: '12³ = 1728', value: 3 },
              { text: '2³ = 8', value: 4 }
            ].map((opt, idx) => (
              <button
                key={idx}
                disabled={quizSubmitted}
                onClick={() => setQuizAnswer(opt.value)}
                className={cn(
                  'p-2.5 rounded-xl text-xs font-bold transition-all border text-center',
                  quizAnswer === opt.value
                    ? 'bg-amber-600 text-white border-amber-700 shadow-sm'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-amber-400'
                )}
              >
                {opt.text}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            {!quizSubmitted ? (
              <Button
                size="sm"
                disabled={quizAnswer === null}
                onClick={() => setQuizSubmitted(true)}
                className="rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4"
              >
                Válasz ellenőrzése
              </Button>
            ) : (
              <div className="flex items-center gap-2 text-xs font-bold">
                {quizAnswer === 1 ? (
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Helyes! 1. lépés: 18³ : 6³ = (18:6)³ = 3³. 2. lépés: 3³ · 2³ = (3·2)³ = 6³ = 216.
                  </span>
                ) : (
                  <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1">
                    <XCircle className="w-4 h-4" /> Nem jó! 18³ : 6³ = (18:6)³ = 3³, majd 3³ · 2³ = (3·2)³ = 6³ = 216.
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default PowersTheory;
