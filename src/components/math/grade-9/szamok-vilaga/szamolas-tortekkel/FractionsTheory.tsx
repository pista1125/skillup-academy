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
  Divide,
  Calculator,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  Layers,
  ArrowRightLeft,
  Percent,
  FlaskConical,
  Scale
} from 'lucide-react';
import {
  CommonDenominatorSvg,
  ComplexFractionSvg,
  FractionMultDivSvg,
  FractionPartChainSvg
} from './FractionsFigures';

interface FractionsTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

// LNKO segédfüggvény
function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a || 1;
}

// LKKT segédfüggvény
function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

export const FractionsTheory: React.FC<FractionsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV TÖRT LABOR ÁLLAPOTOK ---
  const [num1, setNum1] = useState<number>(3);
  const [den1, setDen1] = useState<number>(4);
  const [num2, setNum2] = useState<number>(2);
  const [den2, setDen2] = useState<number>(5);
  const [operation, setOperation] = useState<'+' | '-' | '*' | '/'>('+');

  // Lépésről lépésre számítás
  const stepCalculation = useMemo(() => {
    const d1 = den1 === 0 ? 1 : den1;
    const d2 = den2 === 0 ? 1 : den2;

    if (operation === '+' || operation === '-') {
      const commonDen = lcm(d1, d2);
      const mult1 = commonDen / d1;
      const mult2 = commonDen / d2;
      const expandedNum1 = num1 * mult1;
      const expandedNum2 = num2 * mult2;
      const rawNum = operation === '+' ? expandedNum1 + expandedNum2 : expandedNum1 - expandedNum2;
      const commonDiv = gcd(rawNum, commonDen);
      const simpNum = rawNum / commonDiv;
      const simpDen = commonDen / commonDiv;

      return {
        step1: `Közös nevező keresése: lkkt(${d1}, ${d2}) = ${commonDen}`,
        step2: `Bővítés: (${num1} · ${mult1}) / ${commonDen} ${operation} (${num2} · ${mult2}) / ${commonDen} = ${expandedNum1}/${commonDen} ${operation} ${expandedNum2}/${commonDen}`,
        step3: `Számlálók művelete: (${expandedNum1} ${operation} ${expandedNum2}) / ${commonDen} = ${rawNum}/${commonDen}`,
        result: `${simpNum}/${simpDen}`,
        simplified: commonDiv > 1 ? `Egyszerűsítve ${commonDiv}-gyel: ${simpNum}/${simpDen}` : 'Már nem egyszerűsíthető tovább.'
      };
    } else if (operation === '*') {
      const rawNum = num1 * num2;
      const rawDen = d1 * d2;
      const commonDiv = gcd(rawNum, rawDen);
      const simpNum = rawNum / commonDiv;
      const simpDen = rawDen / commonDiv;

      return {
        step1: `Számlálót a számlálóval, nevezőt a nevezővel: (${num1} · ${num2}) / (${d1} · ${d2})`,
        step2: `Kiszámolva: ${rawNum} / ${rawDen}`,
        step3: commonDiv > 1 ? `Egyszerűsítés ${commonDiv}-gyel` : 'Nincs közös osztó',
        result: `${simpNum}/${simpDen}`,
        simplified: `Tizedestörtként: ${(simpNum / simpDen).toFixed(4).replace(/0+$/, '').replace(/\.$/, '')}`
      };
    } else {
      // Osztás
      if (num2 === 0) {
        return {
          step1: 'Nullával való osztás!',
          step2: 'A második tört számlálója nem lehet nulla osztáskor.',
          step3: 'Értelmetlen művelet.',
          result: 'Nem értelmezett',
          simplified: '0-val nem oszthatunk!'
        };
      }
      const rawNum = num1 * d2;
      const rawDen = d1 * num2;
      const commonDiv = gcd(rawNum, rawDen);
      const simpNum = rawNum / commonDiv;
      const simpDen = rawDen / commonDiv;

      return {
        step1: `Szorzás az osztó reciprokával (${d2}/${num2}): (${num1}/${d1}) · (${d2}/${num2})`,
        step2: `Szorzás elvégzése: (${num1} · ${d2}) / (${d1} · ${num2}) = ${rawNum} / ${rawDen}`,
        step3: commonDiv > 1 ? `Egyszerűsítés ${commonDiv}-gyel` : 'Nincs közös osztó',
        result: `${simpNum}/${simpDen}`,
        simplified: `Tizedestörtként: ${(simpNum / simpDen).toFixed(4).replace(/0+$/, '').replace(/\.$/, '')}`
      };
    }
  }, [num1, den1, num2, den2, operation]);

  return (
    <TheoryTemplate
      title="Számolás Törtekkel – Műveletek, Emeletes Törtek és Törtrészek"
      subtitle="Közös nevező, bővítés és egyszerűsítés, a négy alapművelet szabályai, reciprok érték és törtrészek számítása"
      badgeText="9. OSZTÁLY • II. A SZÁMOK VILÁGA • ½ TANANYAG"
      themeColor="cyan"
      documentId="fractions-theory"
      pdfFilename="9_osztaly_szamolas_tortekkel.pdf"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'A Két Legfontosabb Törtműveleti Szabály',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1 text-left font-bold text-xs sm:text-sm">
            <div>
              <span className="text-cyan-600 dark:text-cyan-400 font-black">Összeadás és kivonás: </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">Közös nevezőre hozással: (a/c) ± (b/c) = (a ± b)/c</span>
            </div>
            <div>
              <span className="text-indigo-600 dark:text-indigo-400 font-black">Szorzás és osztás: </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">(a/b) · (c/d) = (a·c)/(b·d) &nbsp;|&nbsp; Osztás: szorzás a reciprokával</span>
            </div>
          </div>
        )
      }}
    >
      {/* 1. SZEKCIÓ: TÖRTEK ALAPMŰVELETEI ÉS SZABÁLYAI */}
      <TheorySection
        number={1}
        title="A Törtek Négy Alapművelete a Tankönyv Szerint"
        icon={<Divide className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />}
        badge="Alapszabályok"
        badgeColor="cyan"
      >
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          A 9. osztályos matematika tankönyv pontos, rendszerezett szabályokat fogalmaz meg a törtekkel való műveletvégzésre:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <TheoryCard title="Összeadás és Kivonás" variant="blue">
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p>
                <strong>Szabály:</strong> Először közös nevezőre hozzuk a törteket (lkkt), majd az összeadást vagy kivonást a számlálókkal végezzük el, a nevező változatlan marad!
              </p>
              <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 font-mono text-xs font-bold text-blue-900 dark:text-blue-200 text-center">
                (a / c) ± (b / c) = (a ± b) / c
              </div>
              <p className="text-slate-500 text-xs">
                Példa a tankönyvből: 7/9 + 3/2 = 14/18 + 27/18 = 41/18.
              </p>
            </div>
          </TheoryCard>

          <TheoryCard title="Szorzás Egész Számmal és Törttel" variant="cyan">
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p>
                <strong>Egész számmal:</strong> A számlálót szorozzuk az egész számmal: (a/b) · c = (a · c)/b.
              </p>
              <p>
                <strong>Tört szorzása törttel:</strong> Számlálót a számlálóval, nevezőt a nevezővel szorozzuk:
              </p>
              <div className="p-2.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/50 font-mono text-xs font-bold text-cyan-900 dark:text-cyan-200 text-center">
                (a / b) · (c / d) = (a · c) / (b · d)
              </div>
              <p className="text-slate-500 text-xs">
                Fontos: szorzás előtt <strong>mindig egyszerűsítsünk keresztbe</strong>, ha lehet!
              </p>
            </div>
          </TheoryCard>

          <TheoryCard title="Osztás Egész Számmal és Törttel" variant="purple">
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p>
                <strong>Egész számmal:</strong> Vagy a nevezőt szorozzuk (3/4 : 5 = 3/20), vagy ha osztható, a számlálót osztjuk (35/4 : 5 = 7/4).
              </p>
              <p>
                <strong>Törttel való osztás:</strong> Az osztandót szorozzuk az osztó <strong>reciprokával</strong>!
              </p>
              <div className="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-950/50 font-mono text-xs font-bold text-purple-900 dark:text-purple-200 text-center">
                (a / b) : (c / d) = (a / b) · (d / c) = (a · d) / (b · c)  (c ≠ 0)
              </div>
            </div>
          </TheoryCard>

          <TheoryCard title="Bővítés és Egyszerűsítés" variant="emerald">
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p>
                <strong>Bővítés:</strong> A számlálót és nevezőt megszorozzuk ugyanazzal a nullától különböző számmal: 5/6 = (5 · 3)/(6 · 3) = 15/18.
              </p>
              <p>
                <strong>Egyszerűsítés:</strong> A számlálót és nevezőt elosztjuk közös osztójukkal: 32/44 = 8/11.
              </p>
              <p className="text-emerald-700 dark:text-emerald-300 font-bold text-xs">
                A tört értéke a bővítés és egyszerűsítés során NEM változik!
              </p>
            </div>
          </TheoryCard>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6 my-6">
          <div className="w-full sm:w-1/2 flex justify-center">
            <CommonDenominatorSvg size={240} />
          </div>
          <div className="w-full sm:w-1/2 flex justify-center">
            <FractionMultDivSvg size={210} />
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: A SZÁMOK RECIPROKA */}
      <TheorySection
        number={2}
        title="A Számok Reciproka"
        icon={<ArrowRightLeft className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badge="Reciprok"
        badgeColor="indigo"
      >
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          A tankönyv definíciója szerint egy nullától különböző x valós szám reciproka az a valós szám, amellyel x-et megszorozva 1-et kapunk:
        </p>

        <div className="my-4 p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-center font-mono font-bold text-base text-indigo-900 dark:text-indigo-200">
          x · (1 / x) = 1  (x ≠ 0)
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-1">
            <div className="text-xs font-bold uppercase text-slate-500">Közönséges Tört Reciproka</div>
            <p className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400">
              Számláló és nevező csere!
            </p>
            <p className="font-mono text-xs text-slate-600 dark:text-slate-400">
              3/5 → 5/3
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-1">
            <div className="text-xs font-bold uppercase text-slate-500">Egész Szám Reciproka</div>
            <p className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400">
              1 / egész szám
            </p>
            <p className="font-mono text-xs text-slate-600 dark:text-slate-400">
              7 → 1/7,   −4 → −1/4
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-1">
            <div className="text-xs font-bold uppercase text-slate-500">Tizedestört Reciproka</div>
            <p className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400">
              Átírás tört alakba:
            </p>
            <p className="font-mono text-xs text-slate-600 dark:text-slate-400">
              0,4 = 2/5 → 5/2 = 2,5
            </p>
          </div>
        </div>

        <TheoryCallout title="Kritikus szabály: A nullának nincs reciproka!" variant="warning">
          A 0 az egyetlen valós szám, amelynek nem létezik reciproka, hiszen bármely számot 0-val szorozva 0-t kapunk, sosem 1-et (0 · x = 0 ≠ 1).
        </TheoryCallout>
      </TheorySection>

      {/* 3. SZEKCIÓ: EMELETES TÖRTEK ÉS MŰVELETI SORREND */}
      <TheorySection
        number={3}
        title="Emeletes Törtek és Zárójelek Használata"
        icon={<Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
        badge="Emeletes Törtek"
        badgeColor="purple"
      >
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Az emeletes tört egy olyan törtkifejezés, amelynek a számlálójában vagy a nevezőjében (vagy mindkettőben) további tört szerepel.
          A legfontosabb lépés a <strong>fő törtvonal</strong> beazonosítása, amely az egyenlőségjel magasságában helyezkedik el, és az osztásjelnek (:) felel meg!
        </p>

        <div className="flex flex-col md:flex-row items-center gap-6 my-6">
          <div className="w-full md:w-1/2 flex justify-center">
            <ComplexFractionSvg size={230} />
          </div>
          <div className="w-full md:w-1/2 space-y-3">
            <TheoryCard title="Tankönyvi Minta-Levezetés" variant="purple">
              <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <p>Számold ki az emeletes tört értékét:</p>
                <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 font-mono text-xs font-bold text-purple-900 dark:text-purple-200">
                  (1 + 1/5) / (1 − 1/5) = (5/5 + 1/5) / (5/5 − 1/5) = (6/5) / (4/5)
                </div>
                <p>
                  Átírás osztássá és szorzás a reciprokával:
                </p>
                <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-xs text-center font-bold">
                  (6/5) : (4/5) = (6/5) · (5/4) = 6/4 = 3/2 = 1,5
                </div>
              </div>
            </TheoryCard>
          </div>
        </div>

        <TheoryCallout title="Műveleti sorrend és felesleges zárójelek" variant="info">
          A tankönyv 50. oldalán kiemelt feladat annak vizsgálata, mely zárójelek hagyhatók el:
          A szorzás és osztás magasabb rendű művelet, mint az összeadás és kivonás. Ha egy szorzás vagy osztás önmagában áll, körülötte a zárójel elhagyható, kivéve ha az összeadás/kivonás eredményével kell előbb elvégezni a szorzást!
        </TheoryCallout>
      </TheorySection>

      {/* 4. SZEKCIÓ: TÖRTRÉSZ ÉS SZÖVEGES FELADATOK */}
      <TheorySection
        number={4}
        title="Törtrész Számítása és Szöveges Típusfeladatok"
        icon={<FlaskConical className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badge="Szöveges Feladatok"
        badgeColor="amber"
      >
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          A 9. osztályos tankönyv két kiemelt típusfeladatot tárgyal részletesen: a láncolt maradékos törtrészeket és az oldatkeverési feladatokat.
        </p>

        <div className="my-6">
          <FractionPartChainSvg size={260} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <TheoryCard title="1. Típus: Láncolt Maradék (Mazsola-feladat)" variant="amber">
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p className="italic text-slate-500">
                „2,5 kg mazsolából Klári feldolgozza az 1/12 részét, majd Andi a maradék 3/11 részét. Ami még maradt, annak 1/4-ét Zsolt kapja, a megmaradt rész 2/3-a pedig Emeséé. Hányadrésze maradt meg?”
              </p>
              <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-xs font-mono font-bold text-amber-900 dark:text-amber-200 space-y-1">
                <div>Klári után marad: 1 − 1/12 = 11/12.</div>
                <div>Andi után marad: (11/12) · (1 − 3/11) = (11/12) · (8/11) = 8/12 = 2/3.</div>
                <div>Zsolt után marad: (2/3) · (1 − 1/4) = (2/3) · (3/4) = 2/4 = 1/2.</div>
                <div>Emese után marad: (1/2) · (1 − 2/3) = (1/2) · (1/3) = 1/6 rész!</div>
              </div>
              <p className="text-emerald-700 dark:text-emerald-400 font-bold text-xs">
                Módszer: Mindig a megmaradt hányadokkal szorzunk!
              </p>
            </div>
          </TheoryCard>

          <TheoryCard title="2. Típus: Oldatok Összeöntése (Ecetsav-feladat)" variant="cyan">
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p className="italic text-slate-500">
                „Összeöntünk 1,5 liter (2/5 ecetsav) és 2,5 liter (1/10 ecetsav) oldatot, majd hozzáadunk 1 liter vizet. Hányadrésze lett ecetsav a végső oldatnak?”
              </p>
              <div className="p-2.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 text-xs font-mono font-bold text-cyan-900 dark:text-cyan-200 space-y-1">
                <div>Összes térfogat: 1,5 + 2,5 + 1 = 5 liter.</div>
                <div>Tiszta ecetsav: 1,5 · (2/5) + 2,5 · (1/10) = 0,6 + 0,25 = 0,85 liter.</div>
                <div>Ecetsav törtrésze: 0,85 / 5 = 85 / 500 = 17/100 (17%).</div>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* --- INTERAKTÍV TÖRT LABORATÓRIUM A LECKE VÉGÉN --- */}
      <div className="bg-gradient-to-br from-cyan-50/70 via-blue-50/40 to-white dark:from-slate-900 dark:via-cyan-950/20 dark:to-slate-900 border-2 border-cyan-200 dark:border-cyan-900/60 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 my-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-100 dark:border-cyan-800/60 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="p-2.5 rounded-xl bg-cyan-600 text-white shadow-xs">
              <Sliders className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">
                Interaktív Lépésről Lépésre Tört-Kalkulátor
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Változtasd a törtek számlálóit, nevezőit és a műveletet, és kövesd a tankönyvi levezetést!
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 dark:bg-cyan-900/60 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-700">
            Tankönyvi Algoritmus
          </span>
        </div>

        {/* Tört beállítók */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* 1. Tört */}
          <div className="flex flex-col items-center p-4 bg-white dark:bg-slate-800/80 rounded-2xl border border-cyan-100 dark:border-slate-700 shadow-2xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase mb-2">1. Tört</span>
            <div className="flex flex-col items-center gap-1.5">
              <input
                type="number"
                value={num1}
                onChange={e => setNum1(parseInt(e.target.value) || 0)}
                className="w-16 p-1.5 text-center font-mono font-bold text-base bg-cyan-50 dark:bg-slate-900 border border-cyan-200 rounded-lg text-cyan-900 dark:text-cyan-200"
              />
              <div className="w-20 h-0.5 bg-slate-400 dark:bg-slate-500 my-0.5" />
              <input
                type="number"
                value={den1}
                onChange={e => setDen1(parseInt(e.target.value) || 1)}
                className="w-16 p-1.5 text-center font-mono font-bold text-base bg-cyan-50 dark:bg-slate-900 border border-cyan-200 rounded-lg text-cyan-900 dark:text-cyan-200"
              />
            </div>
          </div>

          {/* Műveleti gombok */}
          <div className="flex flex-col items-center">
            <span className="text-[11px] font-bold text-slate-500 uppercase mb-2">Művelet</span>
            <div className="grid grid-cols-4 gap-2">
              {[
                { op: '+', label: '+' },
                { op: '-', label: '−' },
                { op: '*', label: '·' },
                { op: '/', label: ':' }
              ].map(item => (
                <button
                  key={item.op}
                  onClick={() => setOperation(item.op as any)}
                  className={`w-10 h-10 rounded-xl font-mono text-base font-black transition-all ${
                    operation === item.op
                      ? 'bg-cyan-600 text-white shadow-md scale-105'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-cyan-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Tört */}
          <div className="flex flex-col items-center p-4 bg-white dark:bg-slate-800/80 rounded-2xl border border-cyan-100 dark:border-slate-700 shadow-2xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase mb-2">2. Tört</span>
            <div className="flex flex-col items-center gap-1.5">
              <input
                type="number"
                value={num2}
                onChange={e => setNum2(parseInt(e.target.value) || 0)}
                className="w-16 p-1.5 text-center font-mono font-bold text-base bg-cyan-50 dark:bg-slate-900 border border-cyan-200 rounded-lg text-cyan-900 dark:text-cyan-200"
              />
              <div className="w-20 h-0.5 bg-slate-400 dark:bg-slate-500 my-0.5" />
              <input
                type="number"
                value={den2}
                onChange={e => setDen2(parseInt(e.target.value) || 1)}
                className="w-16 p-1.5 text-center font-mono font-bold text-base bg-cyan-50 dark:bg-slate-900 border border-cyan-200 rounded-lg text-cyan-900 dark:text-cyan-200"
              />
            </div>
          </div>
        </div>

        {/* Eredmény és levezetés */}
        <div className="bg-white dark:bg-slate-800/95 rounded-2xl p-5 border border-cyan-100 dark:border-slate-700 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-2.5">
            <span className="text-xs font-extrabold uppercase text-slate-500">
              Lépésről lépésre levezetés:
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold">Végeredmény:</span>
              <span className="font-mono text-lg font-black text-cyan-600 dark:text-cyan-400">
                {stepCalculation.result}
              </span>
            </div>
          </div>

          <div className="space-y-1.5 font-mono text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <p>1. {stepCalculation.step1}</p>
            <p>2. {stepCalculation.step2}</p>
            <p>3. {stepCalculation.step3}</p>
          </div>

          <p className="text-xs text-cyan-700 dark:text-cyan-300 font-medium pt-2 border-t border-slate-100 dark:border-slate-700/60">
            💡 {stepCalculation.simplified}
          </p>
        </div>
      </div>

      {/* 5. SZEKCIÓ: TIPIKUS BUKTATÓK ÉS VIZSGATIPPEK */}
      <TheorySection
        number={5}
        title="Tipikus Törtes Buktatók és Érettségi Tippek"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badge="Csapdák"
        badgeColor="rose"
      >
        <div className="space-y-4">
          <TheoryTrapBox
            title="1. Buktató: Nevezők és számlálók közvetlen összeadása"
            trap="Mennyi 1/2 + 1/3 értéke?"
            wrong="(1 + 1) / (2 + 3) = 2/5"
            wrongExplanation="Hiba! Törteket SOHA nem adunk össze úgy, hogy a számlálót a számlálóval, a nevezőt a nevezővel adjuk össze! 1/2 (50%) + 1/3 (33%) nyilván több mint 2/5 (40%)!"
            correct="1/2 + 1/3 = 3/6 + 2/6 = 5/6"
            correctExplanation="Közös nevezőre kell hozni a törteket (lkkt), és csak a számlálókat adjuk össze!"
            tip="Szabály: Összeadásnál és kivonásnál a KÖZÖS NEVEZŐ kötelező!"
          />

          <TheoryTrapBox
            title="2. Buktató: Egyszerűsítés összeadásból"
            trap="Lehet-e egyszerűsíteni a (3 + 5) / 3 kifejezésben a 3-asokat?"
            wrong="Igen, a 3-asok kiesnek, marad 5 vagy 1 + 5 = 6."
            wrongExplanation="Súlyos hiba! Összegből vagy különbségből tagonként tilos egyszerűsíteni! A tört értéke (3 + 5)/3 = 8/3, ami nem 5 és nem 6!"
            correct="(3 + 5) / 3 = 8/3 (nem egyszerűsíthető)"
            correctExplanation="Csak SZORZATBÓL (közös tényező kiemelése után) lehet egyszerűsíteni!"
            tip="Aranyszabály: „Összegből nem egyszerűsítünk!”"
          />

          <TheoryTrapBox
            title="3. Buktató: Emeletes tört fő törtvonalának elnézése"
            trap="Mennyi a (2 / 3) / 4 és a 2 / (3 / 4) értéke?"
            wrong="Mindkettő ugyanaz: 2/12 = 1/6."
            wrongExplanation="Hiba! Nem mindegy, hol van a fő törtvonal! (2/3) : 4 = 2/12 = 1/6. Viszont 2 : (3/4) = 2 · (4/3) = 8/3!"
            correct="(2/3)/4 = 1/6,  míg  2/(3/4) = 8/3"
            correctExplanation="1/6 és 8/3 merőben más érték! Mindig nézd meg, melyik törtvonal van egy magasságban az egyenlőségjellel."
            tip="Tipp: A fő törtvonalat mindig a hosszabb vonal és az egyenlőségjel jelzi!"
          />

          <TheoryTrapBox
            title="4. Buktató: Előjelek negatív törtek szorzásánál és kivonásánál"
            trap="Mennyi - ( - 3/4) és (-3) / (-4) értéke?"
            wrong="Az egyik negatív, a másik pozitív."
            wrongExplanation="Hiba! A negatív előjel negatívval szorozva pozitívvá válik: -(-3/4) = +3/4. Két negatív szám hányadosa pedig szintén pozitív: (-3)/(-4) = +3/4!"
            correct="-(-3/4) = 3/4  és  (-3)/(-4) = 3/4"
            correctExplanation="A tört előjele: ha páratlan sok mínusz van a tört előtt vagy benne, a tört negatív; ha páros sok mínusz van, a tört pozitív!"
            tip="Jegyezd meg: - a/b = (-a)/b = a/(-b), de (-a)/(-b) = + a/b!"
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default FractionsTheory;
