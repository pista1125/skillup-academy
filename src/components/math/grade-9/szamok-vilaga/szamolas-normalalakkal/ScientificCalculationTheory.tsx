import React, { useState } from 'react';
import { ArrowLeft, BookOpen, CheckCircle, AlertTriangle, Sparkles, Calculator, Layers, RefreshCw } from 'lucide-react';
import {
  MultiplicationDivisionRuleSvg,
  AdditionCommonExponentSvg,
  SiPrefixChartSvg,
  CalculatorMistakeSvg
} from './ScientificCalculationFigures';

interface ScientificCalculationTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const ScientificCalculationTheory: React.FC<ScientificCalculationTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interaktív labor állapota
  const [labTab, setLabTab] = useState<'calculator' | 'siprefix'>('calculator');

  // Műveleti kalkulátor állapotai
  const [mantissaA, setMantissaA] = useState<number>(3.0);
  const [expA, setExpA] = useState<number>(8);
  const [operation, setOperation] = useState<'mult' | 'div' | 'add' | 'sub'>('mult');
  const [mantissaB, setMantissaB] = useState<number>(2.0);
  const [expB, setExpB] = useState<number>(5);

  // SI Prefix labor állapotai
  const [siValue, setSiValue] = useState<number>(4.5);
  const [fromPrefix, setFromPrefix] = useState<number>(9); // Giga (10^9)
  const [toPrefix, setToPrefix] = useState<number>(6); // Mega (10^6)

  // Számolás a Műveleti Kalkulátorhoz
  const calculateResult = () => {
    if (operation === 'mult') {
      const rawMantissa = mantissaA * mantissaB;
      const rawExp = expA + expB;
      let finalMantissa = rawMantissa;
      let finalExp = rawExp;
      let shiftNote = '';

      if (Math.abs(finalMantissa) >= 10) {
        finalMantissa /= 10;
        finalExp += 1;
        shiftNote = `A nyers mantissza (${rawMantissa.toFixed(2)}) ≥ 10, így a tizedesvesszőt 1-gyel balra toljuk, a kitevő 1-gyel nő (${rawExp} → ${finalExp}).`;
      } else if (Math.abs(finalMantissa) < 1 && finalMantissa !== 0) {
        finalMantissa *= 10;
        finalExp -= 1;
        shiftNote = `A nyers mantissza (${rawMantissa.toFixed(2)}) < 1, így a tizedesvesszőt 1-gyel jobbra toljuk, a kitevő 1-gyel csökken (${rawExp} → ${finalExp}).`;
      }

      return {
        step1: `Mantisszák szorzata: ${mantissaA} · ${mantissaB} = ${rawMantissa.toFixed(2)}`,
        step2: `Kitevők összege: ${expA} + (${expB}) = ${rawExp}`,
        raw: `${rawMantissa.toFixed(2)} · 10^${rawExp}`,
        final: `${finalMantissa.toFixed(2)} · 10^${finalExp}`,
        shiftNote
      };
    } else if (operation === 'div') {
      if (mantissaB === 0) {
        return {
          step1: 'Nullával nem osztunk!',
          step2: '',
          raw: 'Értelmetlen',
          final: 'Értelmetlen',
          shiftNote: ''
        };
      }
      const rawMantissa = mantissaA / mantissaB;
      const rawExp = expA - expB;
      let finalMantissa = rawMantissa;
      let finalExp = rawExp;
      let shiftNote = '';

      if (Math.abs(finalMantissa) >= 10) {
        finalMantissa /= 10;
        finalExp += 1;
        shiftNote = `A nyers mantissza (${rawMantissa.toFixed(3)}) ≥ 10, így 1-gyel balra toljuk a vesszőt, a kitevő 1-gyel nő.`;
      } else if (Math.abs(finalMantissa) < 1 && finalMantissa !== 0) {
        finalMantissa *= 10;
        finalExp -= 1;
        shiftNote = `A nyers mantissza (${rawMantissa.toFixed(3)}) < 1, így 1-gyel jobbra toljuk a vesszőt, a kitevő 1-gyel csökken (${rawExp} → ${finalExp}).`;
      }

      return {
        step1: `Mantisszák hányadosa: ${mantissaA} / ${mantissaB} = ${rawMantissa.toFixed(3)}`,
        step2: `Kitevők különbsége: ${expA} - (${expB}) = ${rawExp}`,
        raw: `${rawMantissa.toFixed(3)} · 10^${rawExp}`,
        final: `${finalMantissa.toFixed(3)} · 10^${finalExp}`,
        shiftNote
      };
    } else if (operation === 'add' || operation === 'sub') {
      const maxExp = Math.max(expA, expB);
      const alignedA = mantissaA * Math.pow(10, expA - maxExp);
      const alignedB = mantissaB * Math.pow(10, expB - maxExp);
      const rawMantissa = operation === 'add' ? alignedA + alignedB : alignedA - alignedB;
      const rawExp = maxExp;
      let finalMantissa = rawMantissa;
      let finalExp = rawExp;
      let shiftNote = '';

      if (Math.abs(finalMantissa) >= 10) {
        finalMantissa /= 10;
        finalExp += 1;
        shiftNote = `A kapott mantissza (${rawMantissa.toFixed(3)}) ≥ 10, így a tizedesvesszőt 1-gyel balra toljuk, a kitevő 1-gyel nő.`;
      } else if (Math.abs(finalMantissa) < 1 && finalMantissa !== 0) {
        const shift = Math.floor(Math.log10(Math.abs(finalMantissa)));
        finalMantissa = finalMantissa / Math.pow(10, shift);
        finalExp += shift;
        shiftNote = `A kapott mantissza < 1, így a vesszőt léptetjük, új kitevő: ${finalExp}.`;
      }

      return {
        step1: `Közös (nagyobb) 10-es hatvány: 10^${maxExp}. Igazított mantisszák: A = ${alignedA.toFixed(3)}, B = ${alignedB.toFixed(3)}`,
        step2: `Mantisszák ${operation === 'add' ? 'összege' : 'különbsége'}: (${alignedA.toFixed(3)} ${operation === 'add' ? '+' : '-'} ${alignedB.toFixed(3)}) = ${rawMantissa.toFixed(3)}`,
        raw: `${rawMantissa.toFixed(3)} · 10^${rawExp}`,
        final: `${finalMantissa.toFixed(3)} · 10^${finalExp}`,
        shiftNote
      };
    }

    return { step1: '', step2: '', raw: '', final: '', shiftNote: '' };
  };

  const labResult = calculateResult();

  // Preset példák a kalkulátorhoz
  const applyPreset = (preset: 'light' | 'atom' | 'addition' | 'subtraction' | 'calcError') => {
    if (preset === 'light') {
      setMantissaA(3.0);
      setExpA(8);
      setOperation('mult');
      setMantissaB(5.0);
      setExpB(2); // 3·10^8 m/s * 500 s
    } else if (preset === 'atom') {
      setMantissaA(1.2);
      setExpA(2);
      setOperation('div');
      setMantissaB(6.0);
      setExpB(23); // 120 g / Avogadro
    } else if (preset === 'addition') {
      setMantissaA(4.2);
      setExpA(6);
      setOperation('add');
      setMantissaB(8.5);
      setExpB(5); // 4,2·10^6 + 8,5·10^5
    } else if (preset === 'subtraction') {
      setMantissaA(5.0);
      setExpA(4);
      setOperation('sub');
      setMantissaB(3.2);
      setExpB(3); // 5·10^4 - 3,2·10^3
    } else if (preset === 'calcError') {
      setMantissaA(6.0);
      setExpA(8);
      setOperation('div');
      setMantissaB(2.0);
      setExpB(3); // (6·10^8)/(2·10^3)
    }
  };

  const prefixNames: Record<number, { name: string; sym: string }> = {
    12: { name: 'Tera', sym: 'T' },
    9: { name: 'Giga', sym: 'G' },
    6: { name: 'Mega', sym: 'M' },
    3: { name: 'kilo', sym: 'k' },
    0: { name: 'alap', sym: '-' },
    [-3]: { name: 'milli', sym: 'm' },
    [-6]: { name: 'mikro', sym: 'µ' },
    [-9]: { name: 'nano', sym: 'n' },
    [-12]: { name: 'piko', sym: 'p' },
  };

  const deltaPrefixExp = fromPrefix - toPrefix;
  const convertedSiValue = siValue * Math.pow(10, deltaPrefixExp);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      {/* Fejléc */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-amber-100 text-amber-800 border border-amber-300">
              ⚡ TANANYAG
            </span>
            <span className="text-xs text-slate-500 font-medium">9. Osztály • II. A számok világa</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Számolás normálalakkal
          </h1>
          <p className="text-base text-slate-600 mt-1 max-w-2xl">
            Alapműveletek végzése normálalakú számokkal, közös kitevőre hozás, SI prefixumok és természettudományos gyakorlati alkalmazások.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors font-semibold text-sm flex items-center gap-2 shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" /> Vissza
            </button>
          )}
          {onStartQuiz && (
            <button
              onClick={onStartQuiz}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold text-sm hover:from-amber-700 hover:to-amber-800 transition-all shadow-md flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" /> Kvíz indítása
            </button>
          )}
        </div>
      </div>

      {/* 1. Miért éri meg normálalakkal számolni? */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-lg">
            1
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            Miért éri meg normálalakban műveleteket végezni?
          </h2>
        </div>

        <p className="text-slate-700 leading-relaxed text-base">
          Amikor a makrovilág óriási adataival (pl. bolygók tömege, fényév) vagy a mikrovilág mikroszkopikus méreteivel (pl. elektron tömege, atomok távolsága) dolgozunk, a hagyományos tizedes alakok használata <strong>áttekinthetetlen és rendkívül hibaveszélyes</strong>:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200">
            <h3 className="font-bold text-rose-900 text-sm mb-1 flex items-center gap-2">
              ❌ Hagyományos tizedes alakban számolni
            </h3>
            <p className="text-xs text-rose-800 font-mono leading-relaxed">
              0,00000000000000000016 · 300 000 000 = ???<br />
              Könnyű elszámolni a nullákat, a papíron elfogy a hely, a számológép pedig hibát vagy túlcsordulást jelezhet.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
            <h3 className="font-bold text-emerald-900 text-sm mb-1 flex items-center gap-2">
              ✅ Normálalakban számolni
            </h3>
            <p className="text-xs text-emerald-800 font-mono leading-relaxed">
              (1,6 · 10⁻¹⁹) · (3 · 10⁸) = (1,6 · 3) · 10⁻¹⁹⁺⁸<br />
              = 4,8 · 10⁻¹¹<br />
              Azonnal, fejben és hibátlanul elvégezhető!
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm">
          <strong>A legfőbb előny:</strong> A műveletet szétbontjuk két független, könnyű lépésre:
          <ol className="list-decimal list-inside mt-2 space-y-1 font-medium">
            <li>A kis számokkal (mantisszákkal: 1 és 10 közöttiek) elvégezzük a megszokott alapműveletet.</li>
            <li>A 10-es hatványok kitevőit a <strong>hatványozás tanult azonosságai</strong> alapján összeadjuk, kivonjuk vagy szorozzuk!</li>
          </ol>
        </div>
      </section>

      {/* 2. Szorzás és Osztás normálalakban */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-lg">
            2
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            Szorzás és osztás normálalakban
          </h2>
        </div>

        <p className="text-slate-700 leading-relaxed text-base">
          A szorzás és osztás a legegyszerűbb műveletek normálalakban, mert a szorzótényezők sorrendje felcserélhető (kommutatív és asszociatív tulajdonság), így a mantisszákat és a 10-es hatványokat külön vonhatjuk össze.
        </p>

        {/* Ábra beágyazása */}
        <MultiplicationDivisionRuleSvg />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Szorzás szabálya */}
          <div className="border border-amber-200 rounded-xl p-5 bg-amber-50/40 space-y-3">
            <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-200 text-amber-900 uppercase">
              1. Szorzás képlete
            </span>
            <div className="font-mono text-base font-bold text-slate-900 bg-white p-3 rounded-lg border border-amber-200 text-center">
              (a · 10ᵏ) · (b · 10ᵐ) = (a · b) · 10ᵏ⁺ᵐ
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              <strong>Lépések:</strong> Mantisszák szorzása ($a \cdot b$), kitevők összeadása ($k + m$).<br />
              <strong>Utólagos normálás:</strong> Ha $a \cdot b \ge 10$, a mantissza tizedesvesszőjét 1-gyel balra toljuk, és a kitevőt 1-gyel megnöveljük!
            </p>
            <div className="bg-white p-2.5 rounded-md text-xs font-mono text-amber-900 border border-amber-100">
              (5 · 10⁶) · (6 · 10⁴) = 30 · 10¹⁰ = <strong>3 · 10¹¹</strong>
            </div>
          </div>

          {/* Osztás szabálya */}
          <div className="border border-blue-200 rounded-xl p-5 bg-blue-50/40 space-y-3">
            <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-200 text-blue-900 uppercase">
              2. Osztás képlete
            </span>
            <div className="font-mono text-base font-bold text-slate-900 bg-white p-3 rounded-lg border border-blue-200 text-center">
              (a · 10ᵏ) / (b · 10ᵐ) = (a / b) · 10ᵏ⁻ᵐ
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              <strong>Lépések:</strong> Mantisszák osztása (a / b), kitevők kivonása (k - m).<br />
              <strong>Utólagos normálás:</strong> Ha a / b &lt; 1, a mantissza vesszőjét 1-gyel jobbra toljuk, és a kitevőt 1-gyel csökkentjük!
            </p>
            <div className="bg-white p-2.5 rounded-md text-xs font-mono text-blue-900 border border-blue-100">
              (2 · 10⁹) / (8 · 10⁴) = 0,25 · 10⁵ = <strong>2,5 · 10⁴</strong>
            </div>
          </div>
        </div>

        {/* Hatványozás normálalakban */}
        <div className="p-4 rounded-xl bg-purple-50 border border-purple-200">
          <h4 className="font-bold text-purple-900 text-sm mb-1 flex items-center gap-2">
            ✨ Ráadás: Hatványozás normálalakban
          </h4>
          <p className="text-xs text-purple-950 font-mono">
            (a · 10ᵏ)ⁿ = aⁿ · 10ᵏ·ⁿ &nbsp;&nbsp;&nbsp; Például: (2 · 10⁴)³ = 2³ · 10⁴·³ = 8 · 10¹²
          </p>
        </div>
      </section>

      {/* 3. Összeadás és Kivonás normálalakban */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-lg">
            3
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            Összeadás és kivonás: A közös kitevő szabálya
          </h2>
        </div>

        <p className="text-slate-700 leading-relaxed text-base">
          Míg a szorzásnál azonnal összevonhatók a kitevők, az <strong>összeadás és kivonás csak azonos helyiértékeken</strong> végezhető el! Ahogyan a törteknél közös nevezőre kell hozni a számlálókat, úgy a normálalakoknál <strong>közös 10-es hatványkitevőre</strong> kell hozni a tagokat, mielőtt kiemelnénk.
        </p>

        {/* Ábra beágyazása */}
        <AdditionCommonExponentSvg />

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <h4 className="font-bold text-slate-900 text-sm">
            Hogyan válasszuk meg a közös kitevőt?
          </h4>
          <p className="text-xs text-slate-700 leading-relaxed">
            Általános bevált szabály, hogy a <strong>nagyobb kitevőt választjuk közösnek</strong>. Ekkor a kisebb kitevőjű szám mantisszájában a tizedesvesszőt balra toljuk annyi helyiértékkel, amennyi a kitevők különbsége. Így az összeg mantisszája nem lépi túl jelentősen a 10-et, megkönnyítve a végső normálást.
          </p>
          <div className="bg-white p-3 rounded-lg border border-slate-200 font-mono text-xs text-slate-800 space-y-1">
            <div>7,8 · 10⁵ - 3 · 10³ = ?</div>
            <div>Kitevők különbsége: 5 - 3 = 2. Ezért 3 · 10³ = 0,03 · 10⁵.</div>
            <div>= (7,8 - 0,03) · 10⁵ = <strong>7,77 · 10⁵</strong></div>
          </div>
        </div>
      </section>

      {/* 4. SI Prefixumok és mértékegység-váltás */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-lg">
            4
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            SI Prefixumok és Átváltások a Természettudományban
          </h2>
        </div>

        <p className="text-slate-700 leading-relaxed text-base">
          Az SI (Nemzetközi Mértékegység-rendszer) a tízhatványok helyett gyakran betűjeles előtagokat (prefixumokat) használ. A normálalak ismeretében az átváltás mindössze a megfelelő $10^k$ szorzótényező behelyettesítéséből áll.
        </p>

        {/* Ábra beágyazása */}
        <SiPrefixChartSvg />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-slate-700 space-y-1.5">
            <h4 className="font-bold text-amber-900 text-sm">Átváltás SI prefixumról alapegységre</h4>
            <p>Egyszerűen helyettesítsd be a prefixumhoz tartozó hatványt:</p>
            <ul className="list-disc list-inside space-y-0.5 font-mono text-slate-800">
              <li>45 nm (nanométer) = 45 · 10⁻⁹ m = <strong>4,5 · 10⁻⁸ m</strong></li>
              <li>2,4 GHz (gigahertz) = <strong>2,4 · 10⁹ Hz</strong></li>
              <li>850 µL (mikroliter) = 850 · 10⁻⁶ L = <strong>8,5 · 10⁻⁴ L</strong></li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-200 text-xs text-slate-700 space-y-1.5">
            <h4 className="font-bold text-sky-900 text-sm">⚠️ Figyelem: Terület és Térfogat átváltása</h4>
            <p>A prefixum hatványát is négyzetre vagy köbre kell emelni!</p>
            <ul className="list-disc list-inside space-y-0.5 font-mono text-slate-800">
              <li>1 km² = (10³ m)² = 10⁶ m² = <strong>1 000 000 m²</strong></li>
              <li>1 mm³ = (10⁻³ m)³ = 10⁻⁹ m³</li>
              <li>1 cm³ = (10⁻² m)³ = 10⁻⁶ m³</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. INTERAKTÍV LABORATÓRIUM */}
      <section className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent rounded-3xl p-6 sm:p-8 border-2 border-amber-400/40 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Gyakorlati kísérlet</span>
              <h2 className="text-2xl font-black text-slate-900">Interaktív Számolási Labor</h2>
            </div>
          </div>

          {/* Fülváltó gombok */}
          <div className="flex p-1 bg-amber-100 rounded-xl border border-amber-300">
            <button
              onClick={() => setLabTab('calculator')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                labTab === 'calculator'
                  ? 'bg-white text-amber-900 shadow-xs'
                  : 'text-amber-800 hover:text-amber-950'
              }`}
            >
              <Calculator className="w-4 h-4" /> Műveleti Kalkulátor
            </button>
            <button
              onClick={() => setLabTab('siprefix')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                labTab === 'siprefix'
                  ? 'bg-white text-amber-900 shadow-xs'
                  : 'text-amber-800 hover:text-amber-950'
              }`}
            >
              <Layers className="w-4 h-4" /> SI Prefix Átváltó
            </button>
          </div>
        </div>

        {/* 1. FÜL: MŰVELETI KALKULÁTOR */}
        {labTab === 'calculator' && (
          <div className="space-y-6">
            {/* Előre beállított tudományos sablonok */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-600">Gyors mintapéldák:</span>
              <button
                onClick={() => applyPreset('light')}
                className="px-3 py-1 bg-white hover:bg-amber-100 border border-amber-300 rounded-lg text-xs font-semibold text-amber-900 transition-colors"
              >
                🌌 Fénysebesség és idő
              </button>
              <button
                onClick={() => applyPreset('atom')}
                className="px-3 py-1 bg-white hover:bg-amber-100 border border-amber-300 rounded-lg text-xs font-semibold text-amber-900 transition-colors"
              >
                🔬 1 atom tömege
              </button>
              <button
                onClick={() => applyPreset('addition')}
                className="px-3 py-1 bg-white hover:bg-amber-100 border border-amber-300 rounded-lg text-xs font-semibold text-amber-900 transition-colors"
              >
                ➕ Összeadás (10⁶ + 10⁵)
              </button>
              <button
                onClick={() => applyPreset('subtraction')}
                className="px-3 py-1 bg-white hover:bg-amber-100 border border-amber-300 rounded-lg text-xs font-semibold text-amber-900 transition-colors"
              >
                ➖ Kivonás (10⁴ - 10³)
              </button>
              <button
                onClick={() => applyPreset('calcError')}
                className="px-3 py-1 bg-white hover:bg-rose-100 border border-rose-300 rounded-lg text-xs font-semibold text-rose-900 transition-colors"
              >
                ⚠️ Számológépes csapda
              </button>
            </div>

            {/* Bemeneti vezérlők */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              {/* Szám A */}
              <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-xs space-y-3">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                  <span>"A" Szám</span>
                  <span className="font-mono text-amber-700">{mantissaA.toFixed(1)} · 10^{expA}</span>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Mantissza (a): {mantissaA.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="9.9"
                    step="0.1"
                    value={mantissaA}
                    onChange={(e) => setMantissaA(parseFloat(e.target.value))}
                    className="w-full accent-amber-600"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Kitevő (k): {expA}</span>
                  </div>
                  <input
                    type="range"
                    min="-12"
                    max="15"
                    step="1"
                    value={expA}
                    onChange={(e) => setExpA(parseInt(e.target.value, 10))}
                    className="w-full accent-amber-600"
                  />
                </div>
              </div>

              {/* Műveletválasztó */}
              <div className="flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-amber-200 space-y-2">
                <span className="text-xs font-bold text-slate-600">Válassz Műveletet:</span>
                <div className="grid grid-cols-2 gap-2 w-full max-w-[200px]">
                  <button
                    onClick={() => setOperation('mult')}
                    className={`py-2 rounded-lg font-black text-sm transition-all ${
                      operation === 'mult' ? 'bg-amber-500 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Szorzás ( · )
                  </button>
                  <button
                    onClick={() => setOperation('div')}
                    className={`py-2 rounded-lg font-black text-sm transition-all ${
                      operation === 'div' ? 'bg-amber-500 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Osztás ( / )
                  </button>
                  <button
                    onClick={() => setOperation('add')}
                    className={`py-2 rounded-lg font-black text-sm transition-all ${
                      operation === 'add' ? 'bg-amber-500 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Összeadás ( + )
                  </button>
                  <button
                    onClick={() => setOperation('sub')}
                    className={`py-2 rounded-lg font-black text-sm transition-all ${
                      operation === 'sub' ? 'bg-amber-500 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Kivonás ( - )
                  </button>
                </div>
              </div>

              {/* Szám B */}
              <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-xs space-y-3">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                  <span>"B" Szám</span>
                  <span className="font-mono text-amber-700">{mantissaB.toFixed(1)} · 10^{expB}</span>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Mantissza (b): {mantissaB.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="9.9"
                    step="0.1"
                    value={mantissaB}
                    onChange={(e) => setMantissaB(parseFloat(e.target.value))}
                    className="w-full accent-amber-600"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Kitevő (m): {expB}</span>
                  </div>
                  <input
                    type="range"
                    min="-12"
                    max="15"
                    step="1"
                    value={expB}
                    onChange={(e) => setExpB(parseInt(e.target.value, 10))}
                    className="w-full accent-amber-600"
                  />
                </div>
              </div>
            </div>

            {/* Részletes levezetés és eredmény doboz */}
            <div className="bg-white p-6 rounded-2xl border-2 border-amber-300 shadow-md space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                  Lépésről lépésre történő levezetés
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                  {operation === 'mult' ? 'Szorzás' : operation === 'div' ? 'Osztás' : operation === 'add' ? 'Összeadás' : 'Kivonás'}
                </span>
              </div>

              <div className="space-y-2 font-mono text-sm text-slate-800">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <strong>1. Lépés:</strong> {labResult.step1}
                </div>
                {labResult.step2 && (
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <strong>2. Lépés:</strong> {labResult.step2}
                  </div>
                )}
                <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900">
                  <strong>Nyers közbenső alak:</strong> {labResult.raw}
                </div>
              </div>

              {labResult.shiftNote && (
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-start gap-2">
                  <RefreshCw className="w-4 h-4 shrink-0 mt-0.5 text-blue-600" />
                  <span><strong>Utólagos normálás szükséges:</strong> {labResult.shiftNote}</span>
                </div>
              )}

              {/* Végleges szabályos normálalak */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-300">
                <span className="text-sm font-bold text-amber-950">Végleges Szabályos Normálalak:</span>
                <span className="text-2xl sm:text-3xl font-black text-amber-800 font-mono tracking-wide">
                  {labResult.final}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 2. FÜL: SI PREFIX ÁTVÁLTÓ */}
        {labTab === 'siprefix' && (
          <div className="bg-white p-6 rounded-2xl border border-amber-200 shadow-xs space-y-6">
            <div className="text-xs text-slate-600">
              Válassz kiinduló értéket, forrás prefixumot és cél prefixumot az azonnali átszámításhoz!
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Érték megadása */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mennyiség értéke: {siValue}
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="100"
                  step="0.1"
                  value={siValue}
                  onChange={(e) => setSiValue(parseFloat(e.target.value))}
                  className="w-full accent-amber-600"
                />
              </div>

              {/* Forrás prefixum */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kiinduló prefix:
                </label>
                <select
                  value={fromPrefix}
                  onChange={(e) => setFromPrefix(parseInt(e.target.value, 10))}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-bold bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="12">Tera (T) — 10¹²</option>
                  <option value="9">Giga (G) — 10⁹</option>
                  <option value="6">Mega (M) — 10⁶</option>
                  <option value="3">kilo (k) — 10³</option>
                  <option value="0">alap (-) — 10⁰</option>
                  <option value="-3">milli (m) — 10⁻³</option>
                  <option value="-6">mikro (µ) — 10⁻⁶</option>
                  <option value="-9">nano (n) — 10⁻⁹</option>
                  <option value="-12">piko (p) — 10⁻¹²</option>
                </select>
              </div>

              {/* Cél prefixum */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Cél prefix:
                </label>
                <select
                  value={toPrefix}
                  onChange={(e) => setToPrefix(parseInt(e.target.value, 10))}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-bold bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="12">Tera (T) — 10¹²</option>
                  <option value="9">Giga (G) — 10⁹</option>
                  <option value="6">Mega (M) — 10⁶</option>
                  <option value="3">kilo (k) — 10³</option>
                  <option value="0">alap (-) — 10⁰</option>
                  <option value="-3">milli (m) — 10⁻³</option>
                  <option value="-6">mikro (µ) — 10⁻⁶</option>
                  <option value="-9">nano (n) — 10⁻⁹</option>
                  <option value="-12">piko (p) — 10⁻¹²</option>
                </select>
              </div>
            </div>

            {/* Átváltás eredménye */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100 border border-amber-300 space-y-2">
              <div className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                Átváltási levezetés:
              </div>
              <div className="text-sm font-mono text-slate-800">
                Kitevőkülönbség: Δk = ({fromPrefix}) - ({toPrefix}) = {deltaPrefixExp} (szorzótényező: 10^{deltaPrefixExp})
              </div>
              <div className="text-xl sm:text-2xl font-black text-amber-900 font-mono">
                {siValue} {prefixNames[fromPrefix].sym} = {convertedSiValue.toLocaleString('hu-HU', { maximumSignificantDigits: 6 })} {prefixNames[toPrefix].sym}
              </div>
              <div className="text-xs text-amber-800 font-medium">
                Normálalakban: {(siValue * Math.pow(10, deltaPrefixExp)).toExponential(2).replace('e', ' · 10^')} {prefixNames[toPrefix].sym}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 6. Tipikus csapdák és hibák */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700 font-bold text-lg">
            5
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            Gyakori Csapdák és Hogyan Kerüld El Őket
          </h2>
        </div>

        {/* Számológépes csapda ábra */}
        <CalculatorMistakeSvg />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-2">
            <h4 className="font-bold text-rose-900 text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              1. Csapda: Kitevők összeadása összeadáskor
            </h4>
            <p className="text-xs text-rose-800 leading-relaxed">
              <strong>Hibás:</strong> 3 · 10⁴ + 2 · 10⁴ = 5 · 10⁸ ❌ (A hatványkitevőket tilos összeadni, mert nem szorzás történik!).<br />
              <strong>Helyes:</strong> 3 · 10⁴ + 2 · 10⁴ = (3 + 2) · 10⁴ = <strong>5 · 10⁴</strong> ✅.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-2">
            <h4 className="font-bold text-rose-900 text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              2. Csapda: A végső normálás elmulasztása
            </h4>
            <p className="text-xs text-rose-800 leading-relaxed">
              <strong>Hibás:</strong> (4 · 10⁵) · (5 · 10³) = 20 · 10⁸ és itt megállni ❌ (A 20 nem normálalak, mert 20 ≥ 10!).<br />
              <strong>Helyes:</strong> 20 · 10⁸ = <strong>2 · 10⁹</strong> ✅.
            </p>
          </div>
        </div>
      </section>

      {/* Záró összefoglaló kártya */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-xl font-black">Készen állsz a tudásod tesztelésére?</h3>
          <p className="text-amber-100 text-sm">
            Próbáld ki a 30 válogatott kvízfeladatot és tedd próbára a párosító, valamint csoportosító játékokat!
          </p>
        </div>
        {onStartQuiz && (
          <button
            onClick={onStartQuiz}
            className="px-6 py-3 rounded-xl bg-white text-amber-800 hover:bg-amber-50 font-black text-sm transition-all shadow-md shrink-0 flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4" /> Kvíz indítása
          </button>
        )}
      </div>
    </div>
  );
};

export default ScientificCalculationTheory;
