import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  MathText
} from '../TheoryTemplate';
import {
  Zap,
  BookOpen,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Calculator,
  Compass,
  Layers,
  Sparkles,
  ArrowRight,
  Scale,
  Binary,
  Globe
} from 'lucide-react';
import {
  ScientificNotationStructureSvg,
  SiPrefixScaleSvg,
  ScientificMultiplicationSvg,
  ScientificAdditionSvg
} from './ScientificNotationFigures';

interface ScientificNotationTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const ScientificNotationTheory: React.FC<ScientificNotationTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Laboratórium állapota
  const [labTab, setLabTab] = useState<'convert' | 'calc'>('convert');

  // Convert state
  const [sampleIndex, setSampleIndex] = useState<number>(0);
  const sampleNumbers = [
    { name: 'Föld-Hold távolság (km)', value: 384000, desc: '384 000 km' },
    { name: 'Fénysebesség (m/s)', value: 300000000, desc: '300 000 000 m/s' },
    { name: 'Nap-Föld távolság (km)', value: 149600000, desc: '149 600 000 km' },
    { name: 'Vörösvértest átmérője (m)', value: 0.0000075, desc: '0,0000075 m' },
    { name: 'Porszemcse tömege (g)', value: 0.000002, desc: '0,000002 g' },
    { name: 'Magyarország lakossága (fő)', value: 9600000, desc: '9 600 000 fő' }
  ];

  // Calc state
  const [calcA1, setCalcA1] = useState<number>(4);
  const [calcK1, setCalcK1] = useState<number>(6);
  const [calcA2, setCalcA2] = useState<number>(5);
  const [calcK2, setCalcK2] = useState<number>(4);
  const [calcOp, setCalcOp] = useState<'mul' | 'div' | 'add'>('mul');

  // Converter helper
  const currentSample = sampleNumbers[sampleIndex];
  const numToSci = (num: number) => {
    const expStr = num.toExponential();
    const [mStr, eStr] = expStr.split('e');
    const mant = parseFloat(mStr);
    const exp = parseInt(eStr, 10);
    return { mant, exp };
  };
  const sciRes = numToSci(currentSample.value);

  // Calc calculations
  let rawMant = 0;
  let rawExp = 0;
  let finalMant = 0;
  let finalExp = 0;

  if (calcOp === 'mul') {
    rawMant = calcA1 * calcA2;
    rawExp = calcK1 + calcK2;
    if (Math.abs(rawMant) >= 10) {
      finalMant = rawMant / 10;
      finalExp = rawExp + 1;
    } else {
      finalMant = rawMant;
      finalExp = rawExp;
    }
  } else if (calcOp === 'div') {
    rawMant = calcA1 / calcA2;
    rawExp = calcK1 - calcK2;
    if (Math.abs(rawMant) < 1 && rawMant !== 0) {
      finalMant = rawMant * 10;
      finalExp = rawExp - 1;
    } else {
      finalMant = rawMant;
      finalExp = rawExp;
    }
  } else {
    // add
    const diff = calcK1 - calcK2;
    const alignedA2 = calcA2 * Math.pow(10, -diff);
    rawMant = calcA1 + alignedA2;
    rawExp = calcK1;
    if (Math.abs(rawMant) >= 10) {
      finalMant = rawMant / 10;
      finalExp = rawExp + 1;
    } else {
      finalMant = rawMant;
      finalExp = rawExp;
    }
  }

  return (
    <TheoryTemplate
      badgeText="10. OSZTÁLY • III. HATVÁNYOZÁS ÉS A NÉGYZETGYÖK"
      title="4. Számok normálalakja"
      subtitle="A normálalak definíciója (a · 10ᵏ, ahol 1 ≤ |a| < 10), műveletek normálalakú számokkal és SI mértékegység-prefixumok"
      themeColor="emerald"
      quickRule={{
        label: 'FONTOS SZABÁLYOK',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1.5 text-left font-bold text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-emerald-600 dark:text-emerald-400 font-black">Normálalak:</span>
              <span className="text-slate-800 dark:text-slate-100"><MathText>x = a · 10ᵏ</MathText> &nbsp; (1 ≤ |a| &lt; 10, k ∈ ℤ)</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-sky-600 dark:text-sky-400 font-black">Szorzás / Osztás:</span>
              <span className="text-slate-800 dark:text-slate-100"><MathText>(a · 10ᵏ) · (b · 10ᵐ) = (ab) · 10ᵏ⁺ᵐ</MathText> &nbsp; ⟹ Mantissza újraigazítása!</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-amber-600 dark:text-amber-400 font-black">Összeadás:</span>
              <span className="text-slate-800 dark:text-slate-100">Azonos kitevőre hozás: <MathText>4 · 10⁵ + 3 · 10⁴ = 4,3 · 10⁵</MathText></span>
            </div>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Gyakorló Kvíz indítása"
    >
      {/* 1. SZEKCIÓ: A NORMÁLALAK FOGALMA ÉS ANATÓMIÁJA */}
      <TheorySection
        number={1}
        title="A normálalak fogalma és anatómiája"
        icon={<Binary className="w-5 h-5 text-emerald-500" />}
        badge="ALAPFOGALOM"
        badgeColor="emerald"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            <p>
              A természettudományokban – a csillagászattól és geofizikától kezdve a molekuláris biológián át
              a mikrofizikáig – gyakran találkozunk elképzelhetetlenül nagy (pl. a csillagok távolsága,
              a Föld tömege) vagy felfoghatatlanul parányi számokkal (pl. az atommag átmérője, az elektron töltése).
            </p>
            <p>
              Ha ezeket a számokat a hagyományos tizedes helyiértékes rendszerben írnánk le sok-sok nullával
              (pl. 149 600 000 000 m vagy 0,000 000 000 000 000 000 16 C), az áttekinthetetlen, nehezen olvasható
              és rendkívül hibaveszélyes lenne. Erre nyújt univerzális megoldást a <strong>normálalak</strong>{' '}
              (nemzetközi nevén <em>tudományos jelölésrendszer / scientific notation</em>).
            </p>

            <TheoryCard
              title="A normálalak szabatos matematikai definíciója"
              icon={<BookOpen className="w-4 h-4 text-emerald-500" />}
            >
              <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-lg border border-emerald-200/60 dark:border-emerald-900/40 text-center space-y-2">
                <div className="text-xl sm:text-2xl font-black text-emerald-700 dark:text-emerald-300 font-mono tracking-wide">
                  x = a · 10ᵏ
                </div>
                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  ahol <strong className="text-emerald-800 dark:text-emerald-200">1 ≤ |a| &lt; 10</strong> a{' '}
                  <strong>mantissza</strong> (valós szám), és <strong className="text-emerald-800 dark:text-emerald-200">k ∈ ℤ</strong> a{' '}
                  <strong>karakterisztika</strong> (egész kitevő, nagyságrend).
                </div>
              </div>

              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2">
                <li>
                  <strong>A mantissza kötött határai:</strong> A mantissza abszolút értéke legalább 1, de szigorúan
                  kisebb 10-nél. Ez azt jelenti, hogy a tizedesvessző előtt <em>pontosan egyetlen, nullától különböző számjegy</em> állhat!
                  Például: <strong>3,84 · 10⁵</strong> szabályos, de 38,4 · 10⁴ vagy 0,384 · 10⁶ NEM normálalak!
                </li>
                <li>
                  <strong>Pozitív kitevő (k &gt; 0):</strong> A szám abszolút értéke 10-nél nagyobb (nagyméretű, sokjegyű számok).
                </li>
                <li>
                  <strong>Negatív kitevő (k &lt; 0):</strong> A szám abszolút értéke 0 és 1 közé esik (nagyon apró, valódi törtek).
                </li>
                <li>
                  <strong>Nulla kitevő (k = 0):</strong> Ha 1 ≤ |x| &lt; 10, akkor k = 0 (pl. 7,42 = 7,42 · 10⁰).
                </li>
              </ul>
            </TheoryCard>
          </div>

          <div className="lg:col-span-6 flex flex-col items-center w-full">
            <ScientificNotationStructureSvg className="w-full" />
            <span className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2 italic">
              1. ábra: A normálalak anatómiája: a mantissza és a nagyságrendi kitevő
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: ÁTVÁLTÁS HAGYOMÁNYOS ÉS NORMÁLALAK KÖZÖTT */}
      <TheorySection
        number={2}
        title="Átváltás hagyományos tizedestört és normálalak között"
        icon={<Compass className="w-5 h-5 text-sky-500" />}
        badge="GYAKORLATI MÓDSZER"
        badgeColor="sky"
      >
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            A normálalakra hozás a tizedesvessző gondos léptetésén alapul. A szabály egyszerű és könnyen megjegyezhető:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nagy számok átváltása */}
            <div className="p-4 bg-sky-50/70 dark:bg-sky-950/30 rounded-xl border border-sky-200/80 dark:border-sky-900/50 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  ←
                </span>
                <h4 className="font-bold text-sky-950 dark:text-sky-200 text-sm sm:text-base">
                  1. Nagy számok (Tizedesvessző tolása BALRA)
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Léptesd a tizedesvesszőt balra addig, amíg pontosan egyetlen nem nulla számjegy marad előtte.
                Ahány helyiértéket léptél balra, annyi lesz a 10 kitevője (<strong>pozitív kitevő</strong>):
              </p>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-sky-200 dark:border-sky-800 text-xs sm:text-sm space-y-1">
                <div>• <MathText>450 000 = 4,5 · 10⁵</MathText> &nbsp; (5 helyet léptünk balra)</div>
                <div>• <MathText>7 890 000 000 = 7,89 · 10⁹</MathText> &nbsp; (9 helyet léptünk balra)</div>
                <div>• <MathText>-32 000 = -3,2 · 10⁴</MathText> &nbsp; (az előjel megmarad!)</div>
              </div>
            </div>

            {/* Kis számok átváltása */}
            <div className="p-4 bg-rose-50/70 dark:bg-rose-950/30 rounded-xl border border-rose-200/80 dark:border-rose-900/50 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  →
                </span>
                <h4 className="font-bold text-rose-950 dark:text-rose-200 text-sm sm:text-base">
                  2. Kis számok (Tizedesvessző tolása JOBBRA)
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Léptesd a tizedesvesszőt jobbra addig, amíg az első nem nulla számjegy a vessző elé nem kerül.
                Ahány helyiértéket léptél jobbra, annyi lesz a 10 kitevője <strong>negatív előjellel</strong>:
              </p>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-rose-200 dark:border-rose-800 text-xs sm:text-sm space-y-1">
                <div>• <MathText>0,003 4 = 3,4 · 10⁻³</MathText> &nbsp; (3 helyet léptünk jobbra)</div>
                <div>• <MathText>0,000 000 7 = 7 · 10⁻⁷</MathText> &nbsp; (7 helyet léptünk jobbra)</div>
                <div>• <MathText>-0,056 = -5,6 · 10⁻²</MathText> &nbsp; (2 helyet léptünk jobbra)</div>
              </div>
            </div>
          </div>

          <TheoryCallout
            type="warning"
            title="A leggyakoribb érettségi hiba: A nullák megszámlálása"
          >
            Sokan tévesen azt hiszik, hogy a negatív kitevő a tizedesvessző utáni nullák számát jelenti.
            Ez hibás! Például a <strong>0,004</strong> számban 2 darab nulla van a vessző után, de a vesszőt{' '}
            <strong>3 hellyel kell jobbra tolni</strong>, hogy a 4 mögé kerüljön, ezért <strong>4 · 10⁻³</strong>!
            A kitevő mindig a <em>vessző eltolásának távolságát</em> adja meg!
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: MŰVELETEK NORMÁLALAKÚ SZÁMOKKAL */}
      <TheorySection
        number={3}
        title="Műveletek normálalakú számokkal és a mantissza újraigazítása"
        icon={<Zap className="w-5 h-5 text-emerald-500" />}
        badge="SZÁMÍTÁSTECHNIKA"
        badgeColor="emerald"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            <p>
              A normálalak legnagyobb előnye, hogy a rendkívül nagy vagy kicsi számok szorzását és osztását
              fejszámolással, a hatványozási azonosságok közvetlen alkalmazásával teszi lehetővé:
            </p>

            <TheoryCard
              title="1. Szorzás és osztás szabálya"
              icon={<Calculator className="w-4 h-4 text-emerald-500" />}
            >
              <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <div>
                  <strong>Szorzás:</strong> A mantisszákat megszorozzuk, a 10 hatványainak kitevőit összeadjuk:
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded border border-emerald-200 dark:border-emerald-800 font-bold text-emerald-800 dark:text-emerald-200 my-1 flex items-center justify-center">
                    <MathText>(a · 10ᵏ) · (b · 10ᵐ) = (a · b) · 10ᵏ⁺ᵐ</MathText>
                  </div>
                </div>
                <div>
                  <strong>Osztás:</strong> A számláló mantisszáját osztjuk a nevezőével, a kitevőket kivonjuk:
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded border border-emerald-200 dark:border-emerald-800 font-bold text-emerald-800 dark:text-emerald-200 my-1 flex items-center justify-center">
                    <MathText>(a · 10ᵏ) : (b · 10ᵐ) = (a / b) · 10ᵏ⁻ᵐ</MathText>
                  </div>
                </div>
              </div>
            </TheoryCard>

            <TheoryCallout
              type="danger"
              title="KÖTELEZŐ LÉPÉS: A mantissza újraigazítása!"
            >
              A szorzás vagy osztás után a kapott mantissza gyakran kilép az [1; 10[ intervallumból!
              Ekkor <strong>kötelező újra normálalakra hozni</strong>:
              <ul className="list-disc pl-5 mt-1 space-y-1 text-xs sm:text-sm font-mono">
                <li>Ha a · b ≥ 10 (pl. 24 · 10⁵): 24 = 2,4 · 10¹ ⟹ <strong>2,4 · 10⁶</strong> (kitevő +1).</li>
                <li>Ha a / b &lt; 1 (pl. 0,4 · 10⁸): 0,4 = 4 · 10⁻¹ ⟹ <strong>4 · 10⁷</strong> (kitevő -1).</li>
              </ul>
            </TheoryCallout>
          </div>

          <div className="lg:col-span-6 flex flex-col items-center w-full">
            <ScientificMultiplicationSvg className="w-full" />
            <span className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2 italic">
              2. ábra: Szorzás és a kapott mantissza visszaterelése az [1; 10[ intervallumba
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: ÖSSZEADÁS ÉS KIVONÁS KÖZÖS KITEVŐVEL */}
      <TheorySection
        number={4}
        title="Összeadás és kivonás: a közös kitevőre hozás trükkje"
        icon={<AlertTriangle className="w-5 h-5 text-indigo-500" />}
        badge="BUKTATÓK"
        badgeColor="indigo"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 flex flex-col items-center w-full order-2 lg:order-1">
            <ScientificAdditionSvg className="w-full" />
            <span className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2 italic">
              3. ábra: Különböző nagyságrendű számok összeadása azonos kitevőre hozás után
            </span>
          </div>

          <div className="lg:col-span-6 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base order-1 lg:order-2">
            <p>
              Míg a szorzás és osztás tetszőleges kitevők esetén azonnal elvégezhető, addig az{' '}
              <strong>összeadás és kivonás csak akkor hajtható végre, ha a kitevők megegyeznek</strong>!
            </p>
            <p>
              Gondoljunk a mértékegységekre: 4 métert sem adhatunk össze közvetlenül 3 centiméterrel anélkül,
              hogy előbb azonos egységre (pl. 4 m + 0,03 m = 4,03 m) ne hoznánk őket. Ugyanez érvényes a 10 hatványaira is:
            </p>

            <TheoryCard
              title="A közös kitevőre hozás 3 lépése"
              icon={<CheckCircle2 className="w-4 h-4 text-indigo-500" />}
            >
              <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <li>
                  <strong>1. Válaszd ki a nagyobb kitevőt:</strong> Célszerű a kisebb kitevőjű számot átalakítani a nagyobb kitevőjű nagyságrendre.
                </li>
                <li>
                  <strong>2. Tizedesvessző eltolása:</strong> Ha a kitevőt n-nel növeljük, a mantissza tizedesvesszőjét n hellyel balra toljuk (pl. 3 · 10⁴ = 0,3 · 10⁵).
                </li>
                <li>
                  <strong>3. Mantisszák összevonása kiemeléssel:</strong> Emeld ki a közös 10-hatványt: (4 + 0,3) · 10⁵ = 4,3 · 10⁵.
                </li>
              </ol>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: SI PREFIXUMOK ÉS VALÓS PÉLDÁK */}
      <TheorySection
        number={5}
        title="Az SI mértékegység-prefixumok és a valós világ méretei"
        icon={<Globe className="w-5 h-5 text-teal-500" />}
        badge="ALKALMAZÁS"
        badgeColor="teal"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            <p>
              A tudományban és a mindennapi technológiában a tízes hatványokhoz szabványos{' '}
              <strong>SI előtagok (prefixumok)</strong> tartoznak. Ezek három nagyságrendenként (1000-es szorzókkal)
              követik egymást:
            </p>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs sm:text-sm">
              <div className="font-bold text-slate-900 dark:text-white border-b pb-1">
                Gyakorlati átszámítási példák:
              </div>
              <div className="space-y-1 font-mono">
                <div>• 1 Terabájt (TB) = 10¹² Bájt = 1 000 000 000 000 Bájt</div>
                <div>• 1 Gigawatt (GW) = 10⁹ Watt = 1 000 000 000 W (egy atomerőmű nagyságrendje)</div>
                <div>• 1 mikrométer (μm) = 10⁻⁶ m = 0,000 001 m (baktériumok, sejtek mérete)</div>
                <div>• 1 nanométer (nm) = 10⁻⁹ m = 0,000 000 001 m (félvezető chipek tranzisztorai)</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col items-center w-full">
            <SiPrefixScaleSvg className="w-full" />
            <span className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2 italic">
              4. ábra: Az SI prefixumok rendszere a terától a pikóig
            </span>
          </div>
        </div>
      </TheorySection>

      {/* INTERAKTÍV LABORATÓRIUM */}
      <div className="p-5 sm:p-6 bg-gradient-to-br from-emerald-50/60 via-slate-50 to-teal-50/60 dark:from-emerald-950/20 dark:via-slate-900 dark:to-teal-950/20 rounded-2xl border-2 border-emerald-200/80 dark:border-emerald-900/50 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-200/60 dark:border-emerald-900/40 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 mb-1">
              <Calculator className="w-3.5 h-3.5" />
              Interaktív Laboratórium
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              Normálalak Átváltó & Műveleti Stúdió
            </h3>
          </div>

          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 self-start sm:self-auto">
            <button
              onClick={() => setLabTab('convert')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${labTab === 'convert'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              Átváltó Stúdió
            </button>
            <button
              onClick={() => setLabTab('calc')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${labTab === 'calc'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              Műveleti Kalkulátor
            </button>
          </div>
        </div>

        {labTab === 'convert' ? (
          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Válassz ki egy valós természettudományos mennyiséget, és figyeld meg az átváltás logikáját!
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {sampleNumbers.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setSampleIndex(idx)}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all ${sampleIndex === idx
                    ? 'bg-emerald-600 text-white border-emerald-700 font-bold shadow-xs'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-emerald-50/50'
                    }`}
                >
                  <div className="font-bold truncate">{s.name}</div>
                  <div className="text-[11px] opacity-80 font-mono truncate">{s.desc}</div>
                </button>
              ))}
            </div>

            {/* Eredmény kártya */}
            <div className="p-4 bg-emerald-900/10 dark:bg-emerald-950/40 rounded-xl border border-emerald-300/80 dark:border-emerald-800 space-y-2 text-center">
              <div className="text-xs text-emerald-700 dark:text-emerald-300 font-bold uppercase tracking-wider">
                Átváltás eredménye normálalakban:
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-black text-emerald-700 dark:text-emerald-300">
                {sciRes.mant} · 10<sup>{sciRes.exp}</sup>
              </div>
              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-0.5">
                <div>• Mantissza: <strong>{sciRes.mant}</strong> (teljesíti: 1 ≤ {sciRes.mant} &lt; 10)</div>
                <div>
                  • Nagyságrendi kitevő: <strong>{sciRes.exp}</strong>{' '}
                  ({sciRes.exp > 0 ? `${sciRes.exp} helyiértékkel toltuk balra` : `${Math.abs(sciRes.exp)} helyiértékkel toltuk jobbra`})
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Végezz műveleteket két normálalakú számmal, és figyeld meg a mantissza kötelező újraigazítását!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 1. Szám */}
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  1. Szám: {calcA1} · 10^{calcK1}
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={calcA1}
                    onChange={(e) => setCalcA1(Number(e.target.value))}
                    className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-600 text-xs bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-bold"
                  >
                    {[1.5, 2, 3, 4, 5, 6, 8].map(v => <option key={v} value={v}>Mant: {v}</option>)}
                  </select>
                  <select
                    value={calcK1}
                    onChange={(e) => setCalcK1(Number(e.target.value))}
                    className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-600 text-xs bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-bold"
                  >
                    {[2, 3, 4, 5, 6, 8].map(v => <option key={v} value={v}>Kitevő: 10^{v}</option>)}
                  </select>
                </div>
              </div>

              {/* 2. Szám */}
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  2. Szám: {calcA2} · 10^{calcK2}
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={calcA2}
                    onChange={(e) => setCalcA2(Number(e.target.value))}
                    className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-600 text-xs bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-bold"
                  >
                    {[2, 2.5, 3, 4, 5, 6, 8].map(v => <option key={v} value={v}>Mant: {v}</option>)}
                  </select>
                  <select
                    value={calcK2}
                    onChange={(e) => setCalcK2(Number(e.target.value))}
                    className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-600 text-xs bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-bold"
                  >
                    {[2, 3, 4, 5, 6].map(v => <option key={v} value={v}>Kitevő: 10^{v}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Művelet választó gombok */}
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setCalcOp('mul')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${calcOp === 'mul' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
              >
                Szorzás ( · )
              </button>
              <button
                onClick={() => setCalcOp('div')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${calcOp === 'div' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
              >
                Osztás ( : )
              </button>
              <button
                onClick={() => setCalcOp('add')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${calcOp === 'add' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
              >
                Összeadás ( + )
              </button>
            </div>

            {/* Műveleti eredmény */}
            <div className="p-4 bg-emerald-900/10 dark:bg-emerald-950/40 rounded-xl border border-emerald-300/80 dark:border-emerald-800 text-center space-y-2">
              <div className="text-xs font-bold text-slate-600 dark:text-slate-400">
                Közbenső számítás: {rawMant} · 10^{rawExp}
              </div>
              <div className="text-xl sm:text-2xl font-mono font-black text-emerald-700 dark:text-emerald-300">
                Szabályos végeredmény: {finalMant} · 10<sup>{finalExp}</sup>
              </div>
              {rawMant >= 10 && (
                <div className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                  💡 A mantissza ({rawMant}) nagyobb volt 10-nél, ezért a tizedesvessző balra tolat, a kitevő pedig 1-gyel nőtt!
                </div>
              )}
              {rawMant < 1 && calcOp === 'div' && (
                <div className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                  💡 A mantissza ({rawMant}) kisebb volt 1-nél, ezért a tizedesvessző jobbra tolat, a kitevő pedig 1-gyel csökkent!
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </TheoryTemplate>
  );
};

