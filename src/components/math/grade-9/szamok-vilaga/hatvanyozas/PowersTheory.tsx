import React, { useState, useMemo } from 'react';
import {
  Zap,
  Sliders,
  Layers,
  ArrowRightLeft,
  AlertTriangle,
  Sparkles,
  Calculator,
  CheckCircle2,
  ChevronRight,
  Divide
} from 'lucide-react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox
} from '../TheoryTemplate';
import {
  PowersConceptSvg,
  NegativeZeroExponentSvg,
  PowerIdentitiesSvg,
  BaseSignParitySvg
} from './PowersFigures';

interface PowersTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const PowersTheory: React.FC<PowersTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV HATVÁNYOZÁSI LABOR ÁLLAPOTOK ---
  const [labMode, setLabMode] = useState<'single' | 'identity'>('single');

  // Single mód: a^n
  const [baseA, setBaseA] = useState<number>(2);
  const [expN, setExpN] = useState<number>(3);
  const [hasParenthesis, setHasParenthesis] = useState<boolean>(true);

  // Identity mód: a^k * a^m, a^k / a^m, (a^k)^m
  const [idOperation, setIdOperation] = useState<'mult' | 'div' | 'power'>('mult');
  const [expK, setExpK] = useState<number>(3);
  const [expM, setExpM] = useState<number>(4);

  // Előre definiált életszerű minták
  const presets = [
    { label: '2⁰ = 1 (Nulladik hatvány)', mode: 'single' as const, a: 2, n: 0, paren: true },
    { label: '2⁻³ = 1/8 = 0,125 (Negatív kitevő)', mode: 'single' as const, a: 2, n: -3, paren: true },
    { label: '(-3)⁴ = +81 (Páros kitevő)', mode: 'single' as const, a: -3, n: 4, paren: true },
    { label: '-3⁴ = -81 (Zárójel nélkül!)', mode: 'single' as const, a: -3, n: 4, paren: false },
    { label: '2³ · 2⁴ = 2⁷ (Azonos alap szorzása)', mode: 'identity' as const, op: 'mult' as const, a: 2, k: 3, m: 4 },
    { label: '5⁶ / 5² = 5⁴ (Azonos alap osztása)', mode: 'identity' as const, op: 'div' as const, a: 5, k: 6, m: 2 },
    { label: '(3²)³ = 3⁶ (Hatvány hatványa)', mode: 'identity' as const, op: 'power' as const, a: 3, k: 2, m: 3 }
  ];

  // Számítások
  const singleCalc = useMemo(() => {
    let result: number;
    let formulaText: string;

    if (baseA < 0 && !hasParenthesis) {
      // Pl. -3^4 = -(3^4)
      const absA = Math.abs(baseA);
      result = -Math.pow(absA, expN);
      formulaText = `-${absA}^{${expN}} = -(${absA}^{${expN}}) = ${result}`;
    } else {
      result = Math.pow(baseA, expN);
      const baseStr = baseA < 0 ? `(${baseA})` : `${baseA}`;
      formulaText = `${baseStr}^{${expN}} = ${result}`;
    }

    let explanation: string;
    if (expN === 0) {
      explanation = 'Bármely nemnulla szám 0. hatványa 1-gyel egyenlő: a⁰ = 1.';
    } else if (expN < 0) {
      explanation = `Negatív kitevő esetén a hatvány a pozitív kitevőjű alak reciproka: a⁻ⁿ = 1 / aⁿ.`;
    } else {
      explanation = `A(z) ${baseA} alapot ${expN} tényezős szorzatként szorozzuk önmagával.`;
    }

    return {
      result: Math.round(result * 100000) / 100000,
      formulaText,
      explanation
    };
  }, [baseA, expN, hasParenthesis]);

  const identityCalc = useMemo(() => {
    let combinedExp: number;
    let opSymbol: string;
    let formulaStr: string;

    if (idOperation === 'mult') {
      combinedExp = expK + expM;
      opSymbol = '·';
      formulaStr = `${baseA}^{${expK}} · ${baseA}^{${expM}} = ${baseA}^{${expK} + ${expM}} = ${baseA}^{${combinedExp}}`;
    } else if (idOperation === 'div') {
      combinedExp = expK - expM;
      opSymbol = ':';
      formulaStr = `${baseA}^{${expK}} / ${baseA}^{${expM}} = ${baseA}^{${expK} - ${expM}} = ${baseA}^{${combinedExp}}`;
    } else {
      combinedExp = expK * expM;
      opSymbol = '^';
      formulaStr = `(${baseA}^{${expK}})^{${expM}} = ${baseA}^{${expK} · ${expM}} = ${baseA}^{${combinedExp}}`;
    }

    const numericResult = Math.pow(baseA, combinedExp);

    return {
      combinedExp,
      opSymbol,
      formulaStr,
      numericResult: Math.round(numericResult * 100000) / 100000
    };
  }, [baseA, idOperation, expK, expM]);

  return (
    <TheoryTemplate
      title="Hatványozás – Pozitív, Nulladik és Negatív Kitevők, Azonosságok"
      subtitle="A hatványozás fogalma, kiterjesztése egész számokra (a⁰ = 1, a⁻ⁿ = 1/aⁿ), a hatványozás 5 alaptétele és algebrai alkalmazásai"
      badgeText="9. OSZTÁLY • II. A SZÁMOK VILÁGA • ⚡ TANANYAG"
      themeColor="purple"
      documentId="powers-theory"
      pdfFilename="9_osztaly_hatvanyozas_tananyag.pdf"
      quickRule={{
        label: 'A Hatványozás Alaptételei',
        formula: 'a⁰ = 1  |  a⁻ⁿ = 1 / aⁿ  |  aᵏ · aᵐ = aᵏ⁺ᵐ  |  aᵏ / aᵐ = aᵏ⁻ᵐ  |  (aᵏ)ᵐ = aᵏ·ᵐ'
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* 1. SZEKCIÓ: A HATVÁNYOZÁS FOGALMA */}
      <TheorySection
        number={1}
        title="A Hatványozás Fogalma és az Exponenciális Növekedés"
        icon={<Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
        badge="Alapfogalom"
        badgeColor="purple"
      >
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Ahogyan az azonos számok <em>ismételt összeadását</em> a szorzással rövidítjük ($3 + 3 + 3 + 3 = 4 \cdot 3$),
          úgy az azonos tényezők <strong>ismételt szorzását</strong> a <strong>hatványozással</strong> írjuk le:
        </p>

        <div className="flex flex-col lg:flex-row items-stretch gap-6 my-6">
          <div className="w-full lg:w-1/2">
            <TheoryCard title="A Pozitív Egész Kitevőjű Hatvány Meghatározása" variant="formula" themeColor="purple">
              <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <p>
                  Legyen a ∈ ℝ valós szám és n ∈ ℤ⁺ pozitív egész szám:
                </p>

                <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-center font-mono font-black text-purple-900 dark:text-purple-200 text-lg">
                  aⁿ = a · a · a · ... · a &nbsp; (n tényező)
                </div>

                <div className="space-y-1.5 p-2.5 rounded-lg bg-white dark:bg-slate-800 border text-xs">
                  <p><strong>• Alap ($a$):</strong> A megszorzandó szám.</p>
                  <p><strong>• Kitevő ($n$):</strong> Megmutatja, hány darab tényező szerepel a szorzatban.</p>
                  <p><strong>• Hatványérték ($a^n$):</strong> A szorzás végeredménye (pl. $2^5 = 32$).</p>
                  <p><strong>• Első hatvány:</strong> $a^1 = a$ minden valós számra.</p>
                </div>
              </div>
            </TheoryCard>
          </div>

          <div className="w-full lg:w-1/2 flex items-center justify-center p-3 sm:p-4 bg-white/80 dark:bg-slate-850/60 rounded-3xl border border-purple-100/80 dark:border-slate-800 shadow-2xs">
            <PowersConceptSvg className="w-full max-w-[500px]" />
          </div>
        </div>

        <TheoryCallout title="A Zárójel Élet-Halál Kérdés! (-2)⁴ vs -2⁴" variant="warning">
          Gyakori érettségi hiba a negatív alapok zárójel nélküli felírása:
          <ul className="list-disc pl-5 mt-1 space-y-0.5">
            <li><strong>(-2)⁴ = (-2) · (-2) · (-2) · (-2) = +16</strong>: A 4-es kitevő a mínuszjelre is vonatkozik (páros kitevőnél pozitív!).</li>
            <li><strong>-2⁴ = -(2 · 2 · 2 · 2) = -16</strong>: A 4-es kitevő CSAK a 2-re vonatkozik, a mínuszjel előtte marad!</li>
          </ul>
        </TheoryCallout>
      </TheorySection>

      {/* 2. SZEKCIÓ: KITERJESZTÉS NULLADIK ÉS NEGATÍV EGÉSZ KITEVŐKRE */}
      <TheorySection
        number={2}
        title="Kiterjesztés 0 és Negatív Egész Kitevőkre"
        icon={<Divide className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badge="Kiterjesztés"
        badgeColor="indigo"
      >
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Mi történik, ha a kitevő 0 vagy negatív egész szám? A tankönyv (20. lecke) szerint a hatványozás azonosságainak megőrzése érdekében
          a matematikusok logikusan kiterjesztették a hatvány fogalmát:
        </p>

        <div className="flex flex-col lg:flex-row items-stretch gap-6 my-6">
          <div className="w-full lg:w-1/2 flex items-center justify-center p-3 sm:p-4 bg-white/80 dark:bg-slate-850/60 rounded-3xl border border-indigo-100/80 dark:border-slate-800 shadow-2xs">
            <NegativeZeroExponentSvg className="w-full max-w-[500px]" />
          </div>

          <div className="w-full lg:w-1/2 space-y-4">
            <TheoryCard title="A Nulladik Hatvány Szabálya ($a^0 = 1$)" variant="highlight" themeColor="amber">
              <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <p>Bármely nemnulla valós szám nulladik hatványa egyenlő 1-gyel:</p>
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 font-mono text-center font-black text-amber-900 dark:text-amber-200 text-base">
                  a⁰ = 1 &nbsp; (a ≠ 0)
                </div>
                <p className="text-xs text-slate-500">
                  <strong>Miért?</strong> Mert az azonosságok szerint aⁿ / aⁿ = aⁿ⁻ⁿ = a⁰. Másfelől egy számot önmagával osztva mindig 1-et kapunk: aⁿ / aⁿ = 1.
                  <em>(Megjegyzés: 0⁰ a matematikában nincs értelmezve!)</em>
                </p>
              </div>
            </TheoryCard>

            <TheoryCard title="Negatív Egész Kitevő: A Reciprok Képzése" variant="highlight" themeColor="rose">
              <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <p>Negatív kitevő esetén a hatvány a megfelelő pozitív kitevőjű hatvány <strong>reciprokával</strong> egyenlő:</p>
                <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 font-mono text-center font-black text-rose-900 dark:text-rose-200 text-base">
                  a⁻ⁿ = 1 / aⁿ &nbsp; és &nbsp; (a / b)⁻ⁿ = (b / a)ⁿ &nbsp; (a, b ≠ 0)
                </div>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li>2⁻¹ = 1 / 2¹ = 1/2 = 0,5</li>
                  <li>2⁻³ = 1 / 2³ = 1/8 = 0,125</li>
                  <li>(2/3)⁻² = (3/2)² = 9/4 = 2,25 (a tört megfordul!)</li>
                </ul>
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: A HATVÁNYOZÁS 5 ALAPAZONOSSÁGA */}
      <TheorySection
        number={3}
        title="A Hatványozás 5 Alapazonossága"
        icon={<Layers className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        badge="Azonosságok"
        badgeColor="teal"
      >
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Az algebrai kifejezések egyszerűsítésének és az érettségi feladatok megoldásának kulcsa a hatványozás 5 alaptétele:
        </p>

        <div className="my-6">
          <PowerIdentitiesSvg className="w-full max-w-[550px] mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="1. és 2. Azonosság: Szorzás és Osztás" variant="default" themeColor="teal">
            <div className="text-xs sm:text-sm space-y-2 text-slate-700 dark:text-slate-300">
              <p><strong>Azonos alapú hatványok szorzásakor a kitevők összeadódnak:</strong></p>
              <p className="font-mono bg-teal-50 dark:bg-teal-950/40 p-2 rounded-lg border border-teal-200 dark:border-teal-800 font-bold">
                aᵏ · aᵐ = aᵏ⁺ᵐ &nbsp; (pl. 2³ · 2⁴ = 2⁷ = 128)
              </p>
              <p><strong>Azonos alapú hatványok osztásakor a kitevők kivonódnak:</strong></p>
              <p className="font-mono bg-teal-50 dark:bg-teal-950/40 p-2 rounded-lg border border-teal-200 dark:border-teal-800 font-bold">
                aᵏ / aᵐ = aᵏ⁻ᵐ &nbsp; (pl. 5⁶ / 5² = 5⁴ = 625)
              </p>
            </div>
          </TheoryCard>

          <TheoryCard title="3., 4. és 5. Azonosság: Hatványozások" variant="default" themeColor="indigo">
            <div className="text-xs sm:text-sm space-y-2 text-slate-700 dark:text-slate-300">
              <p><strong>Hatvány hatványozásakor a kitevők összeszorzódnak:</strong></p>
              <p className="font-mono bg-indigo-50 dark:bg-indigo-950/40 p-2 rounded-lg border border-indigo-200 dark:border-indigo-800 font-bold">
                (aᵏ)ᵐ = aᵏ · ᵐ &nbsp; (pl. (3²)⁴ = 3⁸)
              </p>
              <p><strong>Szorzat és tört tagonként hatványozható:</strong></p>
              <p className="font-mono bg-indigo-50 dark:bg-indigo-950/40 p-2 rounded-lg border border-indigo-200 dark:border-indigo-800 font-bold">
                (a · b)ᵏ = aᵏ · bᵏ &nbsp; és &nbsp; (a / b)ᵏ = aᵏ / bᵏ
              </p>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: INTERAKTÍV HATVÁNYOZÁSI LABOR (A fejezet vége felé!) */}
      <TheorySection
        number={4}
        title="Interaktív Hatványozási és Azonossági Laboratórium"
        icon={<Sliders className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
        badge="Interaktív Szimulátor"
        badgeColor="purple"
      >
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Próbáld ki a laboratóriumot! Számíts ki bármilyen $a^n$ hatványértéket (beleértve negatív alapokat és negatív kitevőket),
          vagy teszteld a hatványozási azonosságokat dinamikus levezetéssel!
        </p>

        <div className="p-4 sm:p-6 bg-slate-50/80 dark:bg-slate-900/60 rounded-3xl border border-purple-200 dark:border-slate-800 space-y-6 my-4 shadow-xs">
          {/* Módválasztó és Minták */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex rounded-xl border border-slate-300 dark:border-slate-600 overflow-hidden text-xs font-bold">
              <button
                onClick={() => setLabMode('single')}
                className={`px-3 py-2 ${labMode === 'single' ? 'bg-purple-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
              >
                1. Egyedi Hatvány (aⁿ)
              </button>
              <button
                onClick={() => setLabMode('identity')}
                className={`px-3 py-2 ${labMode === 'identity' ? 'bg-purple-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
              >
                2. Azonosság Összevonó (aᵏ ⚡ aᵐ)
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-400">Minták:</span>
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setLabMode(p.mode);
                    setBaseA(p.a);
                    if (p.mode === 'single') {
                      setExpN(p.n!);
                      setHasParenthesis(p.paren!);
                    } else {
                      setIdOperation(p.op!);
                      setExpK(p.k!);
                      setExpM(p.m!);
                    }
                  }}
                  className="px-2 py-1 rounded-md text-[11px] font-semibold border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-purple-400 transition-all"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* 1. MÓD: EGYEDI HATVÁNY */}
          {labMode === 'single' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-purple-100 dark:border-slate-700 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Alap (a):
                  </label>
                  <input
                    type="number"
                    value={baseA}
                    onChange={e => setBaseA(parseFloat(e.target.value) || 0)}
                    className="w-28 p-2 rounded-xl border text-center font-mono font-bold text-base bg-purple-50/40 dark:bg-slate-900 border-purple-300 dark:border-slate-600 text-purple-900 dark:text-purple-200"
                  />
                </div>

                <div className="flex items-center justify-between gap-3">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Kitevő (n):
                  </label>
                  <input
                    type="number"
                    value={expN}
                    onChange={e => setExpN(parseInt(e.target.value) || 0)}
                    className="w-28 p-2 rounded-xl border text-center font-mono font-bold text-base bg-amber-50/40 dark:bg-slate-900 border-amber-300 dark:border-slate-600 text-amber-900 dark:text-amber-200"
                  />
                </div>

                {baseA < 0 && (
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border text-xs">
                    <span className="font-semibold text-slate-600 dark:text-slate-300">Zárójeles alap?</span>
                    <button
                      onClick={() => setHasParenthesis(!hasParenthesis)}
                      className={`px-2.5 py-1 rounded-md font-bold text-xs ${hasParenthesis ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}`}
                    >
                      {hasParenthesis ? 'Igen: (-a)ⁿ' : 'Nem: -aⁿ (Csapda!)'}
                    </button>
                  </div>
                )}
              </div>

              {/* Eredmény kártya */}
              <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-purple-200 dark:border-slate-700 space-y-3 shadow-2xs">
                <span className="text-xs font-extrabold uppercase text-slate-400 block">
                  Kiszámított Hatványérték:
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-3xl font-black text-purple-600 dark:text-purple-400">
                    {singleCalc.result}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 font-mono text-xs text-slate-700 dark:text-slate-300 space-y-1">
                  <p><strong>Kifejezés:</strong> {singleCalc.formulaText}</p>
                </div>
                <p className="text-xs text-slate-500">
                  💡 {singleCalc.explanation}
                </p>
              </div>
            </div>
          )}

          {/* 2. MÓD: AZONOSSÁG ÖSSZEVONÓ */}
          {labMode === 'identity' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-center">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border">
                  <label className="text-[11px] font-bold block mb-1">Közös alap (a):</label>
                  <input
                    type="number"
                    min="1"
                    value={baseA}
                    onChange={e => setBaseA(parseFloat(e.target.value) || 2)}
                    className="w-full p-1.5 border rounded-lg font-mono font-bold text-center"
                  />
                </div>

                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border">
                  <label className="text-[11px] font-bold block mb-1">Művelet:</label>
                  <select
                    value={idOperation}
                    onChange={e => setIdOperation(e.target.value as any)}
                    className="w-full p-1.5 border rounded-lg font-bold text-xs bg-white dark:bg-slate-850"
                  >
                    <option value="mult">Szorzás (aᵏ · aᵐ)</option>
                    <option value="div">Osztás (aᵏ / aᵐ)</option>
                    <option value="power">Hatványozás ((aᵏ)ᵐ)</option>
                  </select>
                </div>

                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border">
                  <label className="text-[11px] font-bold block mb-1">1. Kitevő (k):</label>
                  <input
                    type="number"
                    value={expK}
                    onChange={e => setExpK(parseInt(e.target.value) || 0)}
                    className="w-full p-1.5 border rounded-lg font-mono font-bold text-center text-teal-600"
                  />
                </div>

                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border">
                  <label className="text-[11px] font-bold block mb-1">2. Kitevő (m):</label>
                  <input
                    type="number"
                    value={expM}
                    onChange={e => setExpM(parseInt(e.target.value) || 0)}
                    className="w-full p-1.5 border rounded-lg font-mono font-bold text-center text-indigo-600"
                  />
                </div>
              </div>

              {/* Levezetés Kártya */}
              <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-purple-200 dark:border-slate-700 space-y-2">
                <span className="text-xs font-bold text-slate-400 block">Összevont Azonossági Kifejezés:</span>
                <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 font-mono text-base font-bold text-purple-900 dark:text-purple-200">
                  {identityCalc.formulaStr} = {identityCalc.numericResult}
                </div>
                <p className="text-xs text-slate-500">
                  {idOperation === 'mult' && 'Azonos alapú szorzásnál a kitevőket összeadtuk (k + m).'}
                  {idOperation === 'div' && 'Azonos alapú osztásnál a kitevőket kivontuk egymásból (k - m).'}
                  {idOperation === 'power' && 'Hatvány hatványozásánál a kitevőket összeszoroztuk (k · m).'}
                </p>
              </div>
            </div>
          )}
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: TIPIKUS BUKTATÓK ÉS ÉRETTSEGI CSAPDÁK */}
      <TheorySection
        number={5}
        title="Tipikus Hatványozási Buktatók és Érettségi Csapdák"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badge="Csapdák"
        badgeColor="rose"
      >
        <div className="space-y-4">
          <TheoryTrapBox
            title="1. Buktató: 2³ + 2⁴ = 2⁷ ? (Összeadásra NINCS azonosság!)"
            trap="Mennyi 2³ + 2⁴ értéke? Lehet-e összeadni a kitevőket?"
            wrong="2³ + 2⁴ = 2³⁺⁴ = 2⁷ = 128."
            wrongExplanation="Óriási hiba! A kitevők összeadása CSAK SZORZÁSNÁL érvényes (2³ · 2⁴ = 2⁷)! Összeadásra nincs hatványozási azonosság! 2³ = 8, 2⁴ = 16. Az összeg 8 + 16 = 24, ami nagyon messze van a 128-tól!"
            correct="2³ + 2⁴ = 8 + 16 = 24 (vagy kiemeléssel: 2³(1 + 2) = 8 · 3 = 24)!"
            correctExplanation="Azonos alapú hatványok összeadásánál csak kiemelni lehet a közös tényezőt, vagy kiszámolni a tagokat!"
            tip="Aranyszabály: A kitevők csak SZORZÁSNÁL adódnak össze, összeadásnál soha!"
          />

          <TheoryTrapBox
            title="2. Buktató: (-3)² vs -3² különbsége"
            trap="Mennyi (-3)² és mennyi -3² értéke?"
            wrong="Mindkettő +9, mert a mínusz szorozva mínusszal plusz."
            wrongExplanation="Súlyos jelölési hiba! A zárójeles (-3)² azt jelenti, hogy (-3) · (-3) = +9. A zárójel nélküli -3² viszont -(3 · 3) = -9! A hatványozás erősebb művelet az előjelnél, így a négyzetre emelés csak a 3-as számra vonatkozik!"
            correct="(-3)² = +9, de -3² = -9!"
            correctExplanation="A zárójel jelzi, hogy az előjel az alap része-e. Zárójel nélkül a mínuszjel egyszerűen az egész hatványozás előtt álló szorzó (-1)."
            tip="Jegyezd meg: -x² mindig nempozitív, míg (-x)² mindig nemnegatív!"
          />

          <TheoryTrapBox
            title="3. Buktató: (2³)² vs 2^(3²) (Toronyhatvány)"
            trap="Mennyi (2³)² és mennyi 2³² értéke?"
            wrong="Mindkettő ugyanaz: 2³ · ² = 2⁶ = 64."
            wrongExplanation="Veszélyes csapda! (2³)² = 2³·² = 2⁶ = 64 (kitevők szorzódnak). A toronyhatványnál 2^(3²) viszont fentről lefelé haladunk: 3² = 9, tehát 2⁹ = 512! 64 és 512 nem ugyanaz!"
            correct="(2³)² = 2⁶ = 64, míg 2³² = 2⁹ = 512!"
            correctExplanation="Zárójelezett hatvány hatványozásánál szorzunk (k · m), de toronyhatványnál fentről lefelé először a felső hatványértéket számítjuk ki!"
            tip="Tipp: Érettségin mindig figyeld a zárójeleket a kitevők körül!"
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default PowersTheory;
