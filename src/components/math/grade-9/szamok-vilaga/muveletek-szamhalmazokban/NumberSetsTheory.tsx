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
  Variable,
  Lock,
  Scale,
  Sparkles,
  AlertTriangle,
  HelpCircle,
  Binary,
  CheckCircle2,
  XCircle,
  Sliders,
  Divide,
  Calculator,
  RefreshCw
} from 'lucide-react';
import {
  NumberSetsVennSvg,
  ClosureMatrixSvg,
  AxiomsVisualSvg,
  InversesVisualSvg
} from './NumberSetsFigures';

interface NumberSetsTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

interface NumberTestItem {
  label: string;
  value: string;
  inN: boolean;
  inZ: boolean;
  inQ: boolean;
  inQStar: boolean;
  inR: boolean;
  explanation: string;
}

const SAMPLE_NUMBERS: NumberTestItem[] = [
  {
    label: '0',
    value: '0',
    inN: true,
    inZ: true,
    inQ: true,
    inQStar: false,
    inR: true,
    explanation: 'A magyar középiskolai és érettségi követelmények szerint 0 a legkisebb természetes szám (0 ∈ ℕ). Így egész, racionális (0/1) és valós is.'
  },
  {
    label: '7',
    value: '7',
    inN: true,
    inZ: true,
    inQ: true,
    inQStar: false,
    inR: true,
    explanation: 'Pozitív egész szám, így természetes szám (7 ∈ ℕ), egész (ℤ), racionális (7/1) és valós (ℝ).'
  },
  {
    label: '-5',
    value: '-5',
    inN: false,
    inZ: true,
    inQ: true,
    inQStar: false,
    inR: true,
    explanation: 'Negatív egész szám: nem természetes szám (-5 ∉ ℕ), de egész (-5 ∈ ℤ), racionális (-5/1) és valós (ℝ).'
  },
  {
    label: '3/4',
    value: '3/4 (0,75)',
    inN: false,
    inZ: false,
    inQ: true,
    inQStar: false,
    inR: true,
    explanation: 'Két egész szám hányadosa: racionális szám (ℚ), tizedestörtként véges (0,75). Nem egész, így nem is természetes szám.'
  },
  {
    label: '-2,5',
    value: '-2,5 (-5/2)',
    inN: false,
    inZ: false,
    inQ: true,
    inQStar: false,
    inR: true,
    explanation: 'Felírható két egész szám hányadosaként (-5/2), tehát racionális szám (ℚ).'
  },
  {
    label: '0,333... (1/3)',
    value: '0,333... (1/3)',
    inN: false,
    inZ: false,
    inQ: true,
    inQStar: false,
    inR: true,
    explanation: 'Végtelen szakaszos tizedestört, ami felírható 1/3 közönséges törtként, tehát racionális szám (ℚ)!'
  },
  {
    label: '√16',
    value: '√16 = 4',
    inN: true,
    inZ: true,
    inQ: true,
    inQStar: false,
    inR: true,
    explanation: 'Csapda! Bár gyökjel alatt van, az értéke pontosan 4. Így 4 ∈ ℕ, ℤ, ℚ és ℝ, NEM irracionális!'
  },
  {
    label: '√2',
    value: '√2 (≈1,4142...)',
    inN: false,
    inZ: false,
    inQ: false,
    inQStar: true,
    inR: true,
    explanation: 'Nem négyzetszám négyzetgyöke: végtelen nem szakaszos tizedestört, nem írható fel két egész hányadosaként. Irracionális szám (ℚ*) és valós (ℝ).'
  },
  {
    label: 'π',
    value: 'π (≈3,14159...)',
    inN: false,
    inZ: false,
    inQ: false,
    inQStar: true,
    inR: true,
    explanation: 'A kör kerületének és átmérőjének aránya transzcendens, irracionális szám (π ∈ ℚ*). Nem racionális, de valós szám.'
  }
];

export const NumberSetsTheory: React.FC<NumberSetsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV LABOR ÁLLAPOTOK ---
  const [selectedNumIndex, setSelectedNumIndex] = useState<number>(0);
  const activeNumber = SAMPLE_NUMBERS[selectedNumIndex];

  // Műveleti Zártság Vizsgáló
  const [testSet, setTestSet] = useState<'N' | 'Z' | 'Q' | 'QStar' | 'R'>('N');
  const [testOp, setTestOp] = useState<'+' | '-' | '*' | '/'>('+');

  const closureResult = useMemo(() => {
    if (testSet === 'N') {
      if (testOp === '+') return { isClosed: true, text: 'ZÁRT! Bármely két természetes szám összege szintén természetes szám (pl. 3 + 5 = 8 ∈ ℕ).' };
      if (testOp === '-') return { isClosed: false, text: 'NEM ZÁRT! Kisebb számból nagyobbat kivonva negatív számot kapunk (pl. 2 - 5 = -3 ∉ ℕ).' };
      if (testOp === '*') return { isClosed: true, text: 'ZÁRT! Bármely két természetes szám szorzata természetes szám (pl. 4 · 6 = 24 ∈ ℕ).' };
      if (testOp === '/') return { isClosed: false, text: 'NEM ZÁRT! Az osztás eredménye legtöbbször tört szám (pl. 1 : 2 = 0,5 ∉ ℕ), és 0-val nem oszthatunk.' };
    }
    if (testSet === 'Z') {
      if (testOp === '+') return { isClosed: true, text: 'ZÁRT! Két egész szám összege mindig egész szám (pl. -7 + 3 = -4 ∈ ℤ).' };
      if (testOp === '-') return { isClosed: true, text: 'ZÁRT! Két egész szám különbsége mindig egész szám (pl. 3 - 8 = -5 ∈ ℤ).' };
      if (testOp === '*') return { isClosed: true, text: 'ZÁRT! Két egész szám szorzata mindig egész szám (pl. -4 · (-3) = 12 ∈ ℤ).' };
      if (testOp === '/') return { isClosed: false, text: 'NEM ZÁRT! Két egész hányadosa nem feltétlenül egész (pl. 3 : 4 = 0,75 ∉ ℤ).' };
    }
    if (testSet === 'Q') {
      if (testOp === '+') return { isClosed: true, text: 'ZÁRT! Törtek összege közös nevezőre hozva mindig felírható két egész hányadosaként (a/b + c/d ∈ ℚ).' };
      if (testOp === '-') return { isClosed: true, text: 'ZÁRT! Törtek különbsége mindig racionális szám (a/b - c/d ∈ ℚ).' };
      if (testOp === '*') return { isClosed: true, text: 'ZÁRT! Törtek szorzata a számlálók és nevezők szorzata, így racionális (a/b · c/d ∈ ℚ).' };
      if (testOp === '/') return { isClosed: true, text: 'ZÁRT (a 0 kivételével)! Ha az osztó nem 0, a reciprokával szorozva mindig racionális törtet kapunk.' };
    }
    if (testSet === 'QStar') {
      if (testOp === '+') return { isClosed: false, text: 'NEM ZÁRT! Ellenpélda: √2 + (-√2) = 0 ∈ ℚ (racionális számot kaptunk!).' };
      if (testOp === '-') return { isClosed: false, text: 'NEM ZÁRT! Ellenpélda: √3 - √3 = 0 ∈ ℚ, vagy (π + 1) - π = 1 ∈ ℚ.' };
      if (testOp === '*') return { isClosed: false, text: 'NEM ZÁRT! Ellenpélda: √2 · √2 = 2 ∈ ℚ (két irracionális szorzata racionális!).' };
      if (testOp === '/') return { isClosed: false, text: 'NEM ZÁRT! Ellenpélda: √8 : √2 = √4 = 2 ∈ ℚ.' };
    }
    // R
    if (testOp === '/') return { isClosed: true, text: 'ZÁRT (a 0 kivételével)! Bármely két valós szám hányadosa valós szám, ha az osztó nem nulla.' };
    return { isClosed: true, text: 'ZÁRT! A valós számok teste mind a négy alapműveletre zárt (0-val való osztás kizárásával).' };
  }, [testSet, testOp]);

  return (
    <TheoryTemplate
      title="Műveletek Számhalmazokban – Számfogalom és Zártság"
      subtitle="Nevezetes számhalmazok (ℕ, ℤ, ℚ, ℚ*, ℝ), műveleti axiómák és a műveleti zártság vizsgálata"
      badgeText="9. OSZTÁLY • II. A SZÁMOK VILÁGA • 🔢 TANANYAG"
      themeColor="blue"
      documentId="numbersets-theory"
      pdfFilename="9_osztaly_muveletek_szamhalmazokban.pdf"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'A Két Legfontosabb Számhalmazos Szabály',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1 text-left font-bold text-xs sm:text-sm">
            <div>
              <span className="text-blue-600 dark:text-blue-400 font-black">Tartalmazási lánc: </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ &nbsp;|&nbsp; ℚ ∩ ℚ* = ∅</span>
            </div>
            <div>
              <span className="text-emerald-600 dark:text-emerald-400 font-black">Műveleti zártság: </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">ℕ (+, ·) &nbsp;|&nbsp; ℤ (+, −, ·) &nbsp;|&nbsp; ℚ, ℝ (+, −, ·, :)</span>
            </div>
          </div>
        )
      }}
    >
      {/* 1. SZEKCIÓ: A NEVEZETES SZÁMHALMAZOK HIERARCHIÁJA */}
      <TheorySection
        number={1}
        title="A Nevezetes Számhalmazok és Tartalmazási Láncuk"
        icon={<Variable className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        badge="Számfogalom"
        badgeColor="blue"
      >
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          A matematika fejlődése során a számfogalom fokozatosan bővült: az egyszerű megszámlálástól a valós számokig.
          A középiskolában az alábbi hierarchikus láncot és jelölésrendszert használjuk:
        </p>

        <div className="my-4 p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-center font-mono font-black text-sm sm:text-lg text-blue-900 dark:text-blue-200 tracking-wider">
          ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ &nbsp; és &nbsp; ℚ* ⊂ ℝ
        </div>

        <div className="flex flex-col lg:flex-row items-stretch gap-6 my-6">
          <div className="w-full lg:w-1/2 flex items-center justify-center p-3 bg-white/70 dark:bg-slate-850/60 rounded-3xl border border-blue-100/80 dark:border-slate-800 shadow-2xs">
            <NumberSetsVennSvg className="w-full max-w-[520px]" />
          </div>
          <div className="w-full lg:w-1/2 space-y-3">
            <TheoryCard
              title="A számhalmazok definíciói"
              variant="blue"
            >
              <ul className="text-xs sm:text-sm space-y-2 text-slate-700 dark:text-slate-300">
                <li>
                  <span className="font-mono font-black text-purple-600">ℕ (Természetes számok):</span> {'{0, 1, 2, 3, …}'} — tárgyak megszámlálására szolgálnak. <strong>A 0 természetes szám!</strong>
                </li>
                <li>
                  <span className="font-mono font-black text-indigo-600">ℤ (Egész számok):</span> {'{…, -2, -1, 0, 1, 2, …}'} — a természetes számok és azok ellentettjei.
                </li>
                <li>
                  <span className="font-mono font-black text-cyan-600">ℚ (Racionális számok):</span> Olyan számok, amelyek felírhatók két egész szám hányadosaként (a/b alakban, ahol a, b ∈ ℤ és b ≠ 0). Tizedestört alakjuk <strong>véges vagy végtelen szakaszos</strong>!
                </li>
                <li>
                  <span className="font-mono font-black text-amber-600">ℚ* (Irracionális számok):</span> Nem írhatók fel két egész szám hányadosaként. Tizedestört alakjuk <strong>végtelen nem szakaszos</strong> (pl. √2, √3, π, e).
                </li>
                <li>
                  <span className="font-mono font-black text-blue-600">ℝ (Valós számok):</span> A racionális és irracionális számok egyesítése: ℝ = ℚ ∪ ℚ*. A számegyenes minden pontja egy-egy valós számnak felel meg.
                </li>
              </ul>
            </TheoryCard>
          </div>
        </div>

        <TheoryCallout title="Fontos tétel: Racionális vs. Irracionális számok" variant="info">
          Egy valós szám vagy racionális, vagy irracionális, a két halmaz metszete üres: ℚ ∩ ℚ* = ∅.
          A tizedestört alak alapján azonnal eldönthető: ha a tizedesjegyek egy idő után ismétlődnek (periodikusak), a szám racionális! Ha nincs benne ismétlődő periódus, a szám irracionális.
        </TheoryCallout>
      </TheorySection>

      {/* 2. SZEKCIÓ: MŰVELETI AXIÓMÁK ÉS TULAJDONSÁGOK */}
      <TheorySection
        number={2}
        title="Műveleti Axiómák és Alaptulajdonságok"
        icon={<Scale className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badge="Axiómák"
        badgeColor="indigo"
      >
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Az alapműveletek nem mindegyikére érvényesek ugyanazok a szabályok. Az összeadás és szorzás kényelmes, szimmetrikus tulajdonságokkal bír, míg a kivonás és osztás jóval több figyelmet igényel!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <TheoryCard title="1. Kommutativitás" variant="indigo">
            <p className="text-xs text-slate-500 mb-2">Felcserélhetőség törvénye:</p>
            <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 font-mono text-xs font-bold text-indigo-900 dark:text-indigo-200 text-center mb-2">
              a + b = b + a <br />
              a · b = b · a
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Az összeadás és a szorzás felcserélhető. A kivonás és az osztás <strong>NEM kommutatív</strong> (pl. 5 − 2 ≠ 2 − 5 és 8 : 2 ≠ 2 : 8).
            </p>
          </TheoryCard>

          <TheoryCard title="2. Asszociativitás" variant="blue">
            <p className="text-xs text-slate-500 mb-2">Csoportosíthatóság törvénye:</p>
            <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 font-mono text-xs font-bold text-blue-900 dark:text-blue-200 text-center mb-2">
              (a + b) + c = a + (b + c) <br />
              (a · b) · c = a · (b · c)
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              A zárójelezés szabadon átcsoportosítható összeadásnál és szorzásnál. A kivonás és osztás <strong>NEM asszociatív</strong>!
            </p>
          </TheoryCard>

          <TheoryCard title="3. Disztributivitás" variant="cyan">
            <p className="text-xs text-slate-500 mb-2">Széttagolhatóság törvénye:</p>
            <div className="p-2.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/50 font-mono text-xs font-bold text-cyan-900 dark:text-cyan-200 text-center mb-2">
              a · (b + c) = a·b + a·c <br />
              (a + b) : c = a:c + b:c
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              A szorzás disztributív az összeadásra és kivonásra nézve (zárójelfelbontás és kiemelés alapja).
            </p>
          </TheoryCard>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6 my-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700">
          <div className="w-full sm:w-1/2 flex justify-center">
            <InversesVisualSvg size={220} />
          </div>
          <div className="w-full sm:w-1/2 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Semleges és Inverz Elemek:</h4>
            <p>
              • <strong>Összeadás semleges eleme a 0:</strong> a + 0 = a.
              <br />
              • <strong>Összeadási inverz (Ellentett):</strong> Minden a számhoz létezik egy −a, amire a + (−a) = 0.
            </p>
            <p>
              • <strong>Szorzás semleges eleme az 1:</strong> a · 1 = a.
              <br />
              • <strong>Szorzási inverz (Reciprok):</strong> Minden a ≠ 0 valós számhoz létezik 1/a, amire a · (1/a) = 1.
            </p>
            <p className="text-rose-600 dark:text-rose-400 font-bold">
              Figyelem: A 0-nak NINCS reciproka, és 0-val osztani tilos!
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: A MŰVELETI ZÁRTSÁG ELMÉLETE */}
      <TheorySection
        number={3}
        title="A Műveleti Zártság Fogalma és Teljes Táblázata"
        icon={<Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        badge="Műveleti Zártság"
        badgeColor="emerald"
      >
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          A modern algebra egyik legfontosabb fogalma a műveleti zártság. Egy halmaz akkor és csak akkor zárt egy műveletre, ha a halmazból tetszőlegesen választott két elemmel elvégezve a műveletet, az eredmény is garantáltan a halmaz eleme marad!
        </p>

        <div className="my-4 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm text-emerald-950 dark:text-emerald-200">
          <strong>Definíció:</strong> A H halmaz zárt a ∘ műveletre nézve, ha minden a, b ∈ H esetén a ∘ b ∈ H.
          Ha akár csak egyetlen olyan számpárt is találunk, amelyre az eredmény kiesik a halmazból, a halmaz <strong>NEM zárt</strong> (ezt nevezzük ellenpéldának).
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6 my-6">
          <div className="w-full md:w-1/2 flex justify-center">
            <ClosureMatrixSvg size={270} />
          </div>
          <div className="w-full md:w-1/2 space-y-2">
            <TheoryCard title="Zártsági összefoglaló" variant="emerald">
              <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
                <li>• <strong>ℕ:</strong> Zárt a + és · műveletre. NEM zárt a kivonásra (2 − 5 = −3) és osztásra (1 : 2 = 0,5).</li>
                <li>• <strong>ℤ:</strong> Zárt a +, − és · műveletre. NEM zárt az osztásra (3 : 4 = 0,75).</li>
                <li>• <strong>ℚ:</strong> Zárt a +, −, · és osztásra (ha az osztó ≠ 0).</li>
                <li>• <strong>ℚ*:</strong> NEM zárt SEMELYIK alapműveletre sem!</li>
                <li>• <strong>ℝ:</strong> Zárt mind a négy alapműveletre (ha az osztó ≠ 0). Testet alkot!</li>
              </ul>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: AZ IRRACIONÁLIS SZÁMOK KÜLÖNLEGES VISELKEDÉSE */}
      <TheorySection
        number={4}
        title="Miért NEM Zárt a ℚ* Semelyik Alapműveletre?"
        icon={<AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badge="Ellenpéldák"
        badgeColor="amber"
      >
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Gyakori tévhit a diákok körében, hogy „ha két fura irracionális számot összeadok vagy összeszorzok, az eredmény is fura irracionális lesz”.
          Ez azonban <strong>HAMIS</strong>! Mind a négy alapműveletre léteznek olyan irracionális számpárok, amelyek eredménye racionális:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300 text-sm">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs">+</span>
              Összeadás ellenpéldája:
            </div>
            <p className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
              √2 + (−√2) = 0 ∈ ℚ
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Vagy: (3 + √5) + (2 − √5) = 5 ∈ ℚ.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300 text-sm">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs">−</span>
              Kivonás ellenpéldája:
            </div>
            <p className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
              π − π = 0 ∈ ℚ
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Bármely irracionális számból önmagát kivonva 0-t kapunk, ami racionális szám!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300 text-sm">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs">·</span>
              Szorzás ellenpéldája:
            </div>
            <p className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
              √3 · √3 = 3 ∈ ℚ
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Vagy: √2 · √8 = √16 = 4 ∈ ℚ.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300 text-sm">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs">:</span>
              Osztás ellenpéldája:
            </div>
            <p className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
              √18 / √2 = √(18 / 2) = √9 = 3 ∈ ℚ
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Vagy bármely x ∈ ℚ* esetén x / x = 1 ∈ ℚ.
            </p>
          </div>
        </div>

        <TheoryCallout title="Vegyes műveletek (Racionális + Irracionális)" variant="tip">
          Ha egy nem nulla racionális számhoz hozzáadunk egy irracionális számot, az összeg <strong>mindig irracionális</strong>: q ∈ ℚ, i ∈ ℚ* ⟹ q + i ∈ ℚ*.
          Hasonlóan, nem nulla racionális számmal szorozva egy irracionálisat, a szorzat is <strong>mindig irracionális</strong>: q ≠ 0 ⟹ q · i ∈ ℚ*.
        </TheoryCallout>
      </TheorySection>

      {/* 5. SZEKCIÓ: TIPIKUS BUKTATÓK ÉS VIZSGATIPPEK */}
      <TheorySection
        number={5}
        title="Tipikus Számhalmazos Buktatók és Érettségi Tippek"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badge="Csapdák"
        badgeColor="rose"
      >
        <div className="space-y-4">
          <TheoryTrapBox
            title="1. Buktató: A nulla (0) besorolása"
            trap="Természetes szám-e a 0?"
            wrong="Nem, a természetes számok 1-gyel kezdődnek."
            wrongExplanation="Bár a nemzetközi jelölésben néha különbséget tesznek (ℕ vs ℕ₀), a MAGYAR középiskolai tanterv és az érettségi egyértelműen meghatározza: 0 ∈ ℕ!"
            correct="0 ∈ ℕ (Természetes szám)"
            correctExplanation="A 0 a legkisebb természetes szám, páros szám, de sem nem pozitív, sem nem negatív!"
            tip="Szabály: ℕ = {0, 1, 2, 3, ...}. Pozitív egészek: ℤ⁺ = {1, 2, 3, ...}."
          />

          <TheoryTrapBox
            title="2. Buktató: Gyökjel láttán automatikus irracionálisnak bélyegzés"
            trap="Melyik számhalmazba tartozik a √25 és a √(9/16) ?"
            wrong="Gyökjel van rajtuk, ezért irracionális (ℚ*) számok."
            wrongExplanation="Hiba! Előbb mindig végezd el a műveletet! √25 = 5, ami természetes szám. √(9/16) = 3/4, ami racionális szám!"
            correct="√25 = 5 ∈ ℕ,  √(9/16) = 3/4 ∈ ℚ"
            correctExplanation="Csak a nem négyzetszámok négyzetgyöke irracionális (pl. √2, √3, √5, √7)."
            tip="Vizsgatipp: Mindig számold ki a pontos értéket a besorolás előtt!"
          />

          <TheoryTrapBox
            title="3. Buktató: Kivonás és osztás asszociativitása"
            trap="Egyenlő-e: (12 - 6) - 2 és 12 - (6 - 2) ?"
            wrong="Igen, a kivonás zárójelei elhagyhatók és átcsoportosíthatók."
            wrongExplanation="Hiba! (12 - 6) - 2 = 6 - 2 = 4, viszont 12 - (6 - 2) = 12 - 4 = 8! A két eredmény NEM azonos!"
            correct="(12 - 6) - 2 ≠ 12 - (6 - 2)"
            correctExplanation="A kivonás és az osztás NEM asszociatív! Balról jobbra haladunk, ha nincs zárójel."
            tip="Szabály: Csak az összeadás és szorzás asszociatív!"
          />

          <TheoryTrapBox
            title="4. Buktató: Miért nem oszthatunk nullával?"
            trap="Mennyi 5 : 0 értéke?"
            wrong="0 vagy végtelen."
            wrongExplanation="Hiba! Ha 5 : 0 = x lenne, akkor a szorzás inverz műveleteként x · 0 = 5-nek kellene teljesülnie. De bármilyen számot szorzunk 0-val, 0-t kapunk, sosem 5-öt! Nincs ilyen valós szám!"
            correct="Nullával való osztás NEM ÉRTELMEZETT!"
            correctExplanation="A nullával való osztás sem a természetes, sem az egész, sem a racionális vagy valós számok körében nincs értelmezve."
            tip="Jegyezd meg: 0 : 5 = 0, de 5 : 0 értelmetlen!"
          />
        </div>
      </TheorySection>

      {/* --- INTERAKTÍV GYAKORLÓ LABORATÓRIUM A LECKE VÉGÉN --- */}
      <div className="bg-gradient-to-br from-blue-50/70 via-indigo-50/50 to-white dark:from-slate-900 dark:via-blue-950/20 dark:to-slate-900 border-2 border-blue-200 dark:border-blue-900/60 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 my-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-blue-100 dark:border-blue-800/60 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="p-2.5 rounded-xl bg-blue-600 text-white shadow-xs">
              <Sliders className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">
                Interaktív Számhalmaz & Műveleti Zártság Labor
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Gyakorold és teszteld a számok besorolását, valamint a halmazok műveleti zártságát a tanultak alapján!
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-700">
            Kísérletező Labor
          </span>
        </div>

        {/* LABOR 1: Számhalmaz-Besoroló */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              1. Válassz egy számot a besoroláshoz:
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_NUMBERS.map((item, idx) => (
              <button
                key={item.label}
                onClick={() => setSelectedNumIndex(idx)}
                className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
                  selectedNumIndex === idx
                    ? 'bg-blue-600 text-white shadow-md scale-105'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-blue-100 dark:border-slate-700 shadow-2xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-500">Vizsgált szám:</span>
                <span className="font-mono text-base font-black text-blue-600 dark:text-blue-400">
                  {activeNumber.value}
                </span>
              </div>
              <span className="text-xs font-semibold text-slate-400">
                Nevezetes számhalmazok vizsgálata
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className={`p-3 rounded-xl border text-center transition-all ${
                activeNumber.inN
                  ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-300 text-purple-900 dark:text-purple-200 font-bold'
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 text-slate-400 line-through opacity-70'
              }`}>
                <div className="text-xs uppercase font-extrabold">ℕ (Természetes)</div>
                <div className="text-sm mt-1">{activeNumber.inN ? '✓ Eleme' : '✗ Nem eleme'}</div>
              </div>

              <div className={`p-3 rounded-xl border text-center transition-all ${
                activeNumber.inZ
                  ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-300 text-indigo-900 dark:text-indigo-200 font-bold'
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 text-slate-400 line-through opacity-70'
              }`}>
                <div className="text-xs uppercase font-extrabold">ℤ (Egész)</div>
                <div className="text-sm mt-1">{activeNumber.inZ ? '✓ Eleme' : '✗ Nem eleme'}</div>
              </div>

              <div className={`p-3 rounded-xl border text-center transition-all ${
                activeNumber.inQ
                  ? 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-300 text-cyan-900 dark:text-cyan-200 font-bold'
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 text-slate-400 line-through opacity-70'
              }`}>
                <div className="text-xs uppercase font-extrabold">ℚ (Racionális)</div>
                <div className="text-sm mt-1">{activeNumber.inQ ? '✓ Eleme' : '✗ Nem eleme'}</div>
              </div>

              <div className={`p-3 rounded-xl border text-center transition-all ${
                activeNumber.inQStar
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-900 dark:text-amber-200 font-bold'
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 text-slate-400 line-through opacity-70'
              }`}>
                <div className="text-xs uppercase font-extrabold">ℚ* (Irracionális)</div>
                <div className="text-sm mt-1">{activeNumber.inQStar ? '✓ Eleme' : '✗ Nem eleme'}</div>
              </div>

              <div className={`p-3 rounded-xl border text-center transition-all ${
                activeNumber.inR
                  ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-300 text-blue-900 dark:text-blue-200 font-bold'
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 text-slate-400 line-through opacity-70'
              }`}>
                <div className="text-xs uppercase font-extrabold">ℝ (Valós)</div>
                <div className="text-sm mt-1">{activeNumber.inR ? '✓ Eleme' : '✗ Nem eleme'}</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 text-xs sm:text-sm text-blue-950 dark:text-blue-200">
              💡 <strong>Magyarázat:</strong> {activeNumber.explanation}
            </div>
          </div>
        </div>

        {/* LABOR 2: Műveleti Zártság Szimulátor */}
        <div className="space-y-4 pt-4 border-t border-blue-100 dark:border-blue-800/60">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            2. Válassz egy számhalmazt és műveletet a zártság teszteléséhez:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500">Számhalmaz:</label>
              <div className="grid grid-cols-5 gap-1.5">
                {[
                  { id: 'N', label: 'ℕ' },
                  { id: 'Z', label: 'ℤ' },
                  { id: 'Q', label: 'ℚ' },
                  { id: 'QStar', label: 'ℚ*' },
                  { id: 'R', label: 'ℝ' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setTestSet(item.id as any)}
                    className={`py-2 rounded-xl font-bold font-mono text-sm transition-all ${
                      testSet === item.id
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500">Művelet:</label>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { op: '+', label: '+' },
                  { op: '-', label: '−' },
                  { op: '*', label: '·' },
                  { op: '/', label: ':' }
                ].map((item) => (
                  <button
                    key={item.op}
                    onClick={() => setTestOp(item.op as any)}
                    className={`py-2 rounded-xl font-bold font-mono text-sm transition-all ${
                      testOp === item.op
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border flex items-start gap-3.5 transition-all ${
            closureResult.isClosed
              ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
              : 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
          }`}>
            <div className="mt-0.5">
              {closureResult.isClosed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              )}
            </div>
            <div className="text-xs sm:text-sm font-medium">
              <span className="font-extrabold uppercase mr-1.5">
                A(z) {testSet === 'QStar' ? 'ℚ*' : testSet} halmaz a(z) &quot;{testOp}&quot; műveletre nézve:
              </span>
              {closureResult.text}
            </div>
          </div>
        </div>
      </div>
    </TheoryTemplate>
  );
};

export default NumberSetsTheory;
