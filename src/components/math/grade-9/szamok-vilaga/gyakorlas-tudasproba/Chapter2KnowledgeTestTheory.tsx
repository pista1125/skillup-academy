import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  GeometryFigureCard
} from '../TheoryTemplate';
import {
  Chapter2MindmapSvg,
  ExamNumberSetsVennSvg,
  PowersAndRootsSummarySvg,
  FinancialGrowthFormulaMapSvg
} from './Chapter2KnowledgeTestFigures';
import {
  Sparkles,
  Trophy,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sliders,
  DollarSign,
  Calculator,
  Award,
  Layers,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  TrendingUp,
  Percent
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MathText } from '@/components/math/shared/MathText';

interface Chapter2KnowledgeTestTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const Chapter2KnowledgeTestTheory: React.FC<Chapter2KnowledgeTestTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interaktív laboratórium fülei
  const [labTab, setLabTab] = useState<'powers' | 'finance' | 'proportions'>('powers');

  // 1. Fül: Hatvány- és Gyökkalkulátor
  const [baseA, setBaseA] = useState<number>(2);
  const [expN, setExpN] = useState<number>(3);
  const [expK, setExpK] = useState<number>(4);
  const [sqrtVal, setSqrtVal] = useState<number>(72);

  // 2. Fül: Pénzügyi Szimulátor
  const [initialCapital, setInitialCapital] = useState<number>(1000000);
  const [annualRate, setAnnualRate] = useState<number>(8);
  const [periodYears, setPeriodYears] = useState<number>(5);

  // 3. Fül: Arányos Osztás Szimulátor
  const [totalAmount, setTotalAmount] = useState<number>(120000);
  const [ratioP1, setRatioP1] = useState<number>(2);
  const [ratioP2, setRatioP2] = useState<number>(3);
  const [ratioP3, setRatioP3] = useState<number>(5);

  // Számított értékek
  const powerProduct = Math.pow(baseA, expN + expK);
  const powerQuotient = Math.pow(baseA, expN - expK);
  const powerOfPower = Math.pow(baseA, expN * expK);

  // Gyöktényező kiemelés: sqrtVal = a * sqrt(b)
  const simplifySqrt = (n: number) => {
    let maxSquareFactor = 1;
    for (let i = Math.floor(Math.sqrt(n)); i >= 2; i--) {
      if (n % (i * i) === 0) {
        maxSquareFactor = i;
        break;
      }
    }
    const remainder = n / (maxSquareFactor * maxSquareFactor);
    return { factor: maxSquareFactor, remainder };
  };
  const { factor: sqrtFactor, remainder: sqrtRemainder } = simplifySqrt(sqrtVal);

  // Kamatos kamat
  const factorQ = 1 + annualRate / 100;
  const compoundResult = Math.round(initialCapital * Math.pow(factorQ, periodYears));
  const simpleResult = Math.round(initialCapital * (1 + periodYears * (annualRate / 100)));
  const compoundDiff = compoundResult - simpleResult;

  // Arányos osztás
  const sumParts = ratioP1 + ratioP2 + ratioP3;
  const onePartValue = sumParts > 0 ? Math.round(totalAmount / sumParts) : 0;
  const share1 = onePartValue * ratioP1;
  const share2 = onePartValue * ratioP2;
  const share3 = onePartValue * ratioP3;

  return (
    <TheoryTemplate
      title="II. A számok világa – Összefoglalás & Tudáspróba"
      subtitle="A teljes II. fejezet átfogó szintézise, témazáró dolgozat típuspéldák, érettségi pontszerzési stratégiák és interaktív laboratórium"
      color="rose"
      badge="⚡ TANANYAG"
      pdfFileName="II_Szamok_Vilaga_Osszefoglalas_Tudasproba.pdf"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Készen állsz a 90 kérdéses Fejezeti Tudáspróbára?"
      practiceSubtitle="Teszteld tudásodat mind a 12 témakörből: 30 alapozó, 30 érettségi alapszintű és 30 emelt/versenyszintű feladattal!"
      practiceButtonText="Tudáspróba Kvíz Indítása (90 feladat)"
      rule={{
        title: "A II. FEJEZET LEGFONTOSABB FORMULÁINAK KVINTESSZENCIÁJA",
        formula: "a^n · a^k = a^(n+k)  |  √(a · b) = √a · √b  |  a · 10^k  |  T_n = T_0 · q^n  |  q = 1 + p/100",
        align: "center"
      }}
    >
      {/* 1. SZEKCIÓ: A FEJEZET 6 ALAPPILLÉRE */}
      <TheorySection
        number="01"
        title="A fejezet 6 alappillérének szintézise"
        badge="Elméleti Áttekintés"
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GeometryFigureCard
            title="A II. Fejezet Kapcsolati Térképe (Mindmap)"
            figure={<Chapter2MindmapSvg size={230} />}
            caption="A fejezet 6 pillére: Számhalmazok, Törtek, Arányok, Hatványok-Gyökök, Normálalak és Kamatos kamat."
            badge="Térkép"
            color="rose"
          />
          <GeometryFigureCard
            title="Számhalmazok és Zártság (ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ)"
            figure={<ExamNumberSetsVennSvg size={230} />}
            caption="A valós számok hierarchiája: racionális (felírható p/q alakban) és irracionális (végtelen nem szakaszos) számok."
            badge="Halmazok"
            color="rose"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <TheoryCard
            title="1. Számhalmazok & Törtek"
            badge="Alapok"
            color="rose"
            properties={[
              "ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ hierarchia.",
              "Zártság: ℕ zárt az összeadásra és szorzásra, ℤ a kivonásra is, ℚ az osztásra is (kivéve 0).",
              "Közös nevezőre hozás: legkisebb közös többszörös (lkkt).",
              "Törttel való osztás: szorzás a reciprokával.",
              "Emeletes tört: (a/b) / (c/d) = (a·d) / (b·c)."
            ]}
          >
            A számelméleti alapok biztosítják, hogy minden algebrai kifejezést pontos törtalakban tartsunk, elkerülve a korai kerekítési hibákat.
          </TheoryCard>

          <TheoryCard
            title="2. Arányok & Százalék"
            badge="Gyakorlat"
            color="rose"
            properties={[
              "Egyenes arányosság: y / x = k (állandó hányados).",
              "Fordított arányosság: x · y = k (állandó szorzat).",
              "Arányos osztás: összeg elosztása az arányszámok összegével = 1 rész értéke.",
              "Százalékérték: Érték = Alap · (Láb / 100).",
              "Szorzótényezős módszer: növekedés: 1 + p/100, csökkenés: 1 - p/100."
            ]}
          >
            Egymást követő árváltozásoknál a szorzótényezők összeszorzódnak: q_össz = q_1 · q_2, sohasem adódnak össze!
          </TheoryCard>

          <TheoryCard
            title="3. Hatvány, Gyök, Kamat"
            badge="Haladó"
            color="rose"
            properties={[
              "Hatványazonosságok: a^n · a^k = a^(n+k), (a^n)^k = a^(n·k).",
              "Negatív kitevő: a^(-n) = 1 / a^n; nulladik kitevő: a^0 = 1 (a ≠ 0).",
              "Négyzetgyök: √(a·b) = √a·√b; √(a^2) = |a|.",
              "Normálalak: a · 10^k, ahol 1 ≤ a < 10 és k ∈ ℤ.",
              "Kamatos kamat: T_n = T_0 · q^n (ahol q = 1 + p/100)."
            ]}
          >
            A hatványozás és kamatszámítás közös matematikai gyökere az exponenciális függvény növekedése és a prefixumos nagyságrendek.
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: TIPIKUS ÉRETTSÉGI ÉS TÉMAZÁRÓ FELADATTÍPUSOK */}
      <TheorySection
        number="02"
        title="Tipikus érettségi és témazáró feladattípusok"
        badge="Vizsgastratégia"
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GeometryFigureCard
            title="Hatványozás és Négyzetgyök Szabálymátrix"
            figure={<PowersAndRootsSummarySvg size={240} />}
            caption="Összehasonlító szabályrendszer: vigyázz a gyök alatti összeadás csapdájára!"
            badge="Összehasonlítás"
            color="rose"
          />
          <GeometryFigureCard
            title="Pénzügyi Modellezés és Kamattényezők"
            figure={<FinancialGrowthFormulaMapSvg size={240} />}
            caption="Egyszerű kamat (lineáris) vs. Kamatos kamat (exponenciális T_n = T_0 · q^n) dinamikája."
            badge="Pénzügy"
            color="rose"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TheoryCard
            title="I. Rész típusfeladatok (2-3 pont / feladat)"
            badge="I. Rész: Gyors Pontok"
            color="rose"
            properties={[
              "Számhalmaz azonosítás: Döntsük el √18, -4/2, 0.3̇, π halmazait!",
              "Művelet normálalakban: (4 · 10^6) · (3 · 10^(-2)) = 1.2 · 10^5.",
              "Azonosság alkalmazása betűkkel: (2x^3)^4 = 16x^12.",
              "Tényező kiemelése gyökjel alól: √75 = √(25 · 3) = 5√3.",
              "Egyszerű százalékszámítás szorzótényezővel: 80 000 Ft 27%-os ÁFA-val = 80 000 · 1.27 = 101 600 Ft."
            ]}
          >
            Az érettségi I. részében a precíz alapfogalmak és a számológép gyors, pontos kezelése hozza a biztos maximális pontszámot.
          </TheoryCard>

          <TheoryCard
            title="II. Rész típusfeladatok (10-18 pont / feladat)"
            badge="II. Rész: Kifejtős Példák"
            color="rose"
            properties={[
              "Összetett arányos osztás: Céges nyereség szétosztása 3 befektető között 3 : 5 : 7 arányban, adózási levonással.",
              "Többlépcsős százalékszámítás: Áremelés 15%-kal, majd akcióban 20%-os leárazás. Hány százalékkal változott az eredeti árhoz képest?",
              "Kamatos kamatos befektetés: Mekkora tőkét kell elhelyezni évi 7%-os kamat mellett, hogy 6 év múlva 5 millió Ft-unk legyen?",
              "Törtes hatványkifejezés egyszerűsítése prímtényezős felbontással: (12^4 · 18^3) / (6^8 · 2^2) értéke."
            ]}
          >
            A II. részben mindig írd ki a szövegből kinyert adatokat, a választott képletet betűkkel, majd a behelyettesítést és a mértékegységes szöveges választ!
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: 100 PONTOS MINTADOLGOZAT */}
      <TheorySection
        number="03"
        title="100 pontos mintadolgozat részletes pontozási útmutatóval"
        badge="Mintateszt"
        badgeColor="rose"
      >
        <div className="space-y-4">
          <TheoryCard
            title="A Mintadolgozat Felépítése és Pontozása"
            badge="100 Pont"
            color="rose"
            properties={[
              "1. Feladat: Számhalmazok és igaz-hamis állítások (8 pont)",
              "2. Feladat: Műveleti sorrend közönséges törtekkel (10 pont)",
              "3. Feladat: Hatványozási azonosságok betűs kifejezésekben (10 pont)",
              "4. Feladat: Négyzetgyökök és tényező kiemelése (10 pont)",
              "5. Feladat: Számolás normálalakban és prefixumok (10 pont)",
              "6. Feladat: Egyenes és fordított arányosság a fizikában (10 pont)",
              "7. Feladat: Háromtagú arányos osztás (10 pont)",
              "8. Feladat: Egymást követő százalékos árváltozások (10 pont)",
              "9. Feladat: Kamatos kamat befektetési terv (12 pont)",
              "10. Feladat: Gépjármű értékcsökkenése / amortizáció (10 pont)"
            ]}
          >
            <div className="mt-3 p-3 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
              <span className="font-bold text-rose-700 dark:text-rose-400">Értékelési skála:</span> 85–100 pont: Jeles (5), 70–84 pont: Jó (4), 55–69 pont: Közepes (3), 40–54 pont: Elégséges (2), 0–39 pont: Elégtelen (1).
            </div>
          </TheoryCard>

          {/* Mintapélda kidolgozás 1: Törtes hatvány */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 font-black text-xs flex items-center justify-center">3</span>
                Kidolgozott mintafeladat: Hatványkifejezés egyszerűsítése (10 pont)
              </h4>
              <span className="text-xs font-black text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 px-2.5 py-1 rounded-full">10 PONT</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-mono bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl">
              Egyszerűsítse a következő kifejezést: K = (24^3 · 15^4) / (18^2 · 10^4 · 2^5)
            </p>
            <div className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <p><strong className="text-slate-800 dark:text-slate-200">1. lépés (Prímtényezős felbontás):</strong></p>
              <ul className="list-disc list-inside pl-2 space-y-1 font-mono text-xs">
                <li>24 = 2^3 · 3 ➔ 24^3 = (2^3 · 3)^3 = 2^9 · 3^3</li>
                <li>15 = 3 · 5 ➔ 15^4 = 3^4 · 5^4</li>
                <li>18 = 2 · 3^2 ➔ 18^2 = 2^2 · 3^4</li>
                <li>10 = 2 · 5 ➔ 10^4 = 2^4 · 5^4</li>
              </ul>
              <p className="mt-2"><strong className="text-slate-800 dark:text-slate-200">2. lépés (Számláló és nevező összevonása):</strong></p>
              <p className="font-mono text-xs bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
                Számláló: 2^9 · 3^(3+4) · 5^4 = 2^9 · 3^7 · 5^4<br />
                Nevező: 2^(2+4+5) · 3^4 · 5^4 = 2^11 · 3^4 · 5^4
              </p>
              <p className="mt-2"><strong className="text-slate-800 dark:text-slate-200">3. lépés (Egyszerűsítés hatványkivonással):</strong></p>
              <p className="font-mono text-xs text-rose-700 dark:text-rose-400 font-bold bg-rose-50/60 dark:bg-rose-950/40 p-2 rounded-lg">
                K = (2^9 / 2^11) · (3^7 / 3^4) · (5^4 / 5^4) = 2^(-2) · 3^3 · 1 = (1 / 4) · 27 = 27 / 4 = 6.75
              </p>
            </div>
          </div>

          {/* Mintapélda kidolgozás 2: Kamatos kamat visszafelé */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 font-black text-xs flex items-center justify-center">9</span>
                Kidolgozott mintafeladat: Kezdőtőke visszaszámolása (12 pont)
              </h4>
              <span className="text-xs font-black text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 px-2.5 py-1 rounded-full">12 PONT</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-mono bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl">
              Egy vállalkozó 4 év múlva esedékes fejlesztéséhez 10 000 000 Ft-ot szeretne összegyűjteni. Évi fix 8%-os kamatos kamat mellett mekkora összeget kell ma lekötni a bankban?
            </p>
            <div className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <p><strong className="text-slate-800 dark:text-slate-200">1. lépés (Adatok azonosítása):</strong></p>
              <p className="font-mono text-xs">T_4 = 10 000 000 Ft, p = 8% ➔ q = 1 + 8/100 = 1.08, n = 4 év, T_0 = ?</p>
              <p className="mt-2"><strong className="text-slate-800 dark:text-slate-200">2. lépés (Képlet átrendezése):</strong></p>
              <p className="font-mono text-xs">T_n = T_0 · q^n ➔ T_0 = T_n / q^n = 10 000 000 / (1.08^4)</p>
              <p className="mt-2"><strong className="text-slate-800 dark:text-slate-200">3. lépés (Számolás és kerekítés):</strong></p>
              <p className="font-mono text-xs text-rose-700 dark:text-rose-400 font-bold bg-rose-50/60 dark:bg-rose-950/40 p-2 rounded-lg">
                1.08^4 ≈ 1.360489<br />
                T_0 = 10 000 000 / 1.360489 ≈ 7 350 298.5 Ft ➔ Kerekítve: 7 350 299 Ft.
              </p>
              <p className="text-xs text-slate-700 dark:text-slate-300 italic">
                Szöveges válasz: Ma legalább 7 350 299 Ft-ot kell lekötni ahhoz, hogy 4 év múlva rendelkezésre álljon a 10 millió Ft.
              </p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: INTERAKTÍV TUDÁSPRÓBA LABORATÓRIUM */}
      <TheorySection
        number="04"
        title="Interaktív Tudáspróba Laboratórium"
        badge="Szimulátor"
        badgeColor="rose"
      >
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-rose-300 dark:border-rose-900 shadow-md space-y-5">
          {/* Fülválasztó */}
          <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <button
              onClick={() => setLabTab('powers')}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 ${
                labTab === 'powers'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              <Sliders className="w-4 h-4" />
              1. Hatvány- & Gyökkalkulátor
            </button>
            <button
              onClick={() => setLabTab('finance')}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 ${
                labTab === 'finance'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              2. Pénzügyi Szimulátor
            </button>
            <button
              onClick={() => setLabTab('proportions')}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 ${
                labTab === 'proportions'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              <Percent className="w-4 h-4" />
              3. Arányos Osztás
            </button>
          </div>

          {/* 1. FÜL: HATVÁNY- ÉS GYÖKKALUKLÁTOR */}
          {labTab === 'powers' && (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Állítsd be a hatványalapot és a kitevőket, vagy próbálj ki különböző négyzetgyököket a tényezőkiemelés vizsgálatához!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Alap (a): <span className="text-rose-600 font-black">{baseA}</span>
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="10"
                    value={baseA}
                    onChange={(e) => setBaseA(Number(e.target.value))}
                    className="w-full accent-rose-600 cursor-pointer"
                  />
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Első kitevő (n): <span className="text-rose-600 font-black">{expN}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    value={expN}
                    onChange={(e) => setExpN(Number(e.target.value))}
                    className="w-full accent-rose-600 cursor-pointer"
                  />
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Második kitevő (k): <span className="text-rose-600 font-black">{expK}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    value={expK}
                    onChange={(e) => setExpK(Number(e.target.value))}
                    className="w-full accent-rose-600 cursor-pointer"
                  />
                </div>
              </div>

              {/* Hatvány eredmények */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-center">
                  <span className="text-[10px] font-bold text-purple-700 dark:text-purple-300 block uppercase">Szorzat azonosság</span>
                  <p className="font-mono font-bold text-sm text-purple-900 dark:text-purple-100 mt-1">
                    {baseA}^{expN} · {baseA}^{expK} = {baseA}^{expN + expK}
                  </p>
                  <p className="text-xs font-black text-purple-600 dark:text-purple-400 mt-0.5">
                    = {powerProduct.toLocaleString('hu-HU')}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-center">
                  <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 block uppercase">Hányados azonosság</span>
                  <p className="font-mono font-bold text-sm text-indigo-900 dark:text-indigo-100 mt-1">
                    {baseA}^{expN} / {baseA}^{expK} = {baseA}^{expN - expK}
                  </p>
                  <p className="text-xs font-black text-indigo-600 dark:text-indigo-400 mt-0.5">
                    {expN >= expK ? `= ${powerQuotient.toLocaleString('hu-HU')}` : `= 1 / ${Math.pow(baseA, expK - expN)}`}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-center">
                  <span className="text-[10px] font-bold text-sky-700 dark:text-sky-300 block uppercase">Hatvány hatványa</span>
                  <p className="font-mono font-bold text-sm text-sky-900 dark:text-sky-100 mt-1">
                    ({baseA}^{expN})^{expK} = {baseA}^{expN * expK}
                  </p>
                  <p className="text-xs font-black text-sky-600 dark:text-sky-400 mt-0.5">
                    {powerOfPower > 100000000 ? '≈ ' + powerOfPower.toExponential(2) : '= ' + powerOfPower.toLocaleString('hu-HU')}
                  </p>
                </div>
              </div>

              {/* Gyök kiemelés szekció */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 mt-2">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block">
                      Tényező kiemelése gyökjel alól: <span className="font-mono font-black text-rose-600">√{sqrtVal}</span>
                    </label>
                    <input
                      type="range"
                      min="8"
                      max="200"
                      value={sqrtVal}
                      onChange={(e) => setSqrtVal(Number(e.target.value))}
                      className="w-48 sm:w-64 accent-rose-600 cursor-pointer mt-1"
                    />
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">Kiemelt pontos alak:</span>
                    <span className="font-mono font-bold text-base sm:text-lg text-emerald-600 dark:text-emerald-400">
                      {sqrtFactor > 1 ? (
                        <>
                          {sqrtFactor} · √{sqrtRemainder}
                          {sqrtRemainder === 1 && ` = ${sqrtFactor}`}
                        </>
                      ) : (
                        `√${sqrtVal} (nem emelhető ki négyzetszám)`
                      )}
                    </span>
                    <span className="text-xs text-slate-400 block">
                      ≈ {Math.sqrt(sqrtVal).toFixed(4)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. FÜL: PÉNZÜGYI SZIMULÁTOR */}
          {labTab === 'finance' && (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Hasonlítsd össze az egyszerű és kamatos kamatozást dinamikus kezdőtőkével, kamatlábbal és futamidővel!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Kezdőtőke (T_0): <span className="text-rose-600 font-black">{initialCapital.toLocaleString('hu-HU')} Ft</span>
                  </label>
                  <input
                    type="range"
                    min="100000"
                    max="5000000"
                    step="50000"
                    value={initialCapital}
                    onChange={(e) => setInitialCapital(Number(e.target.value))}
                    className="w-full accent-rose-600 cursor-pointer"
                  />
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Éves kamatláb (p): <span className="text-rose-600 font-black">{annualRate}%</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="25"
                    value={annualRate}
                    onChange={(e) => setAnnualRate(Number(e.target.value))}
                    className="w-full accent-rose-600 cursor-pointer"
                  />
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Futamidő (n): <span className="text-rose-600 font-black">{periodYears} év</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={periodYears}
                    onChange={(e) => setPeriodYears(Number(e.target.value))}
                    className="w-full accent-rose-600 cursor-pointer"
                  />
                </div>
              </div>

              {/* Eredmény kártyák */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-center">
                  <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase block">Kamatos Kamat (T_n)</span>
                  <p className="font-mono text-lg sm:text-xl font-black text-emerald-700 dark:text-emerald-300 mt-1">
                    {compoundResult.toLocaleString('hu-HU')} Ft
                  </p>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 block mt-0.5">
                    Kamat: +{(compoundResult - initialCapital).toLocaleString('hu-HU')} Ft
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 text-center">
                  <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase block">Egyszerű Kamat</span>
                  <p className="font-mono text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200 mt-1">
                    {simpleResult.toLocaleString('hu-HU')} Ft
                  </p>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                    Lineáris növekedés
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 text-center">
                  <span className="text-[10px] font-bold text-rose-700 dark:text-rose-300 uppercase block">Kamatos Kamat Többlete</span>
                  <p className="font-mono text-lg sm:text-xl font-black text-rose-700 dark:text-rose-300 mt-1">
                    +{compoundDiff.toLocaleString('hu-HU')} Ft
                  </p>
                  <span className="text-[11px] text-rose-600 dark:text-rose-400 block mt-0.5">
                    A "kamat kamatozása"
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 3. FÜL: ARÁNYOS OSZTÁS */}
          {labTab === 'proportions' && (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Számold ki az összegek megoszlását háromtagú arányos osztás esetén!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Teljes összeg: <span className="text-rose-600 font-black">{totalAmount.toLocaleString('hu-HU')} Ft</span>
                  </label>
                  <input
                    type="range"
                    min="10000"
                    max="500000"
                    step="5000"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(Number(e.target.value))}
                    className="w-full accent-rose-600 cursor-pointer"
                  />
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    1. Rész: <span className="text-rose-600 font-black">{ratioP1}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={ratioP1}
                    onChange={(e) => setRatioP1(Number(e.target.value))}
                    className="w-full accent-rose-600 cursor-pointer"
                  />
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    2. Rész: <span className="text-rose-600 font-black">{ratioP2}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={ratioP2}
                    onChange={(e) => setRatioP2(Number(e.target.value))}
                    className="w-full accent-rose-600 cursor-pointer"
                  />
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    3. Rész: <span className="text-rose-600 font-black">{ratioP3}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={ratioP3}
                    onChange={(e) => setRatioP3(Number(e.target.value))}
                    className="w-full accent-rose-600 cursor-pointer"
                  />
                </div>
              </div>

              {/* Eredmény táblázat */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                    Összes arányrész: {ratioP1} + {ratioP2} + {ratioP3} = <strong className="text-rose-600">{sumParts} rész</strong>
                  </span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    1 rész értéke: <strong className="text-rose-600">{onePartValue.toLocaleString('hu-HU')} Ft</strong>
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-200 dark:border-slate-700">
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-400 block">1. személy ({ratioP1} rész)</span>
                    <span className="font-mono font-bold text-sm text-slate-800 dark:text-slate-100">{share1.toLocaleString('hu-HU')} Ft</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-400 block">2. személy ({ratioP2} rész)</span>
                    <span className="font-mono font-bold text-sm text-slate-800 dark:text-slate-100">{share2.toLocaleString('hu-HU')} Ft</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-400 block">3. személy ({ratioP3} rész)</span>
                    <span className="font-mono font-bold text-sm text-slate-800 dark:text-slate-100">{share3.toLocaleString('hu-HU')} Ft</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: A 10 LEGGYAKORIBB ÉRETTSÉGI BUKTATÓ */}
      <TheorySection
        number="05"
        title="A 10 leggyakoribb témazáró és érettségi buktató"
        badge="Vigyázz a részletekre!"
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border-2 border-rose-300 dark:border-rose-900 space-y-2">
            <h4 className="font-bold text-sm text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              1. Gyök alatti összeg szétbontása (Tilos!)
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong className="text-rose-600">HIBA:</strong> √(9 + 16) = √9 + √16 = 3 + 4 = 7.<br />
              <strong className="text-emerald-600">HELYES:</strong> √(9 + 16) = √25 = 5. A négyzetgyök összeadásra nem bontható szét, csak szorzásra és osztásra!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border-2 border-rose-300 dark:border-rose-900 space-y-2">
            <h4 className="font-bold text-sm text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              2. Zárójel nélküli negatív alap hatványozása
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong className="text-rose-600">HIBA:</strong> -4^2 = 16.<br />
              <strong className="text-emerald-600">HELYES:</strong> -4^2 = -(4^2) = -16. A hatványozás előbb történik, mint a mínusz előjel. Csak (-4)^2 = +16.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border-2 border-rose-300 dark:border-rose-900 space-y-2">
            <h4 className="font-bold text-sm text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              3. Százalékok összeadása árváltozáskor
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong className="text-rose-600">HIBA:</strong> 20% emelés után 20% akció = 0% változás.<br />
              <strong className="text-emerald-600">HELYES:</strong> q = 1.20 · 0.80 = 0.96, azaz a termék 4%-kal olcsóbb lett az eredeti áránál!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border-2 border-rose-300 dark:border-rose-900 space-y-2">
            <h4 className="font-bold text-sm text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              4. A negatív kitevő nem jelent negatív számot!
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong className="text-rose-600">HIBA:</strong> 5^(-2) = -25 vagy -10.<br />
              <strong className="text-emerald-600">HELYES:</strong> 5^(-2) = 1 / 5^2 = 1 / 25 = 0.04 &gt; 0. A negatív kitevő a reciprokképzést jelenti!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border-2 border-rose-300 dark:border-rose-900 space-y-2">
            <h4 className="font-bold text-sm text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              5. Normálalak első tényezőjének feltétele
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong className="text-rose-600">HIBA:</strong> 42 · 10^5 vagy 0.35 · 10^4 normálalak.<br />
              <strong className="text-emerald-600">HELYES:</strong> A normálalak a · 10^k, ahol kötelezően 1 ≤ a &lt; 10! Tehát 4.2 · 10^6 és 3.5 · 10^3.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border-2 border-rose-300 dark:border-rose-900 space-y-2">
            <h4 className="font-bold text-sm text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              6. Négyzetgyök alatti négyzet nem simán a!
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong className="text-rose-600">HIBA:</strong> √((-7)^2) = -7.<br />
              <strong className="text-emerald-600">HELYES:</strong> √(a^2) = |a|, ezért √((-7)^2) = √49 = +7! A négyzetgyök eredménye sohasem negatív.
            </p>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
