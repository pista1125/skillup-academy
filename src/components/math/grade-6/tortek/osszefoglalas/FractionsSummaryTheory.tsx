import React, { useState } from 'react';
import { TheoryTemplate, TheorySection } from '../TheoryTemplate';
import { MathText } from '@/components/math/shared/MathText';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  Calculator,
  PieChart,
  Layers,
  ArrowRightLeft,
  Sparkles,
  CheckCircle2,
  Lightbulb,
  Divide,
  X,
  Plus,
  Minus,
  Maximize2,
  Flame,
  Award,
  Zap,
  Target,
  Trophy
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FractionsSummaryTheoryProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
}

export function FractionsSummaryTheory({
  onBack,
  onSwitchToQuiz
}: FractionsSummaryTheoryProps) {
  // Master Interactive Calculator State
  const [calcMode, setCalcMode] = useState<'fraction' | 'decimal'>('fraction');
  const [f1N, setF1N] = useState<number>(3);
  const [f1D, setF1D] = useState<number>(4);
  const [op, setOp] = useState<'+' | '-' | '*' | '/'>('*');
  const [f2N, setF2N] = useState<number>(2);
  const [f2D, setF2D] = useState<number>(3);

  // Decimal calculator state
  const [dec1, setDec1] = useState<number>(3.6);
  const [decOp, setDecOp] = useState<'+' | '-' | '*' | '/'>('/');
  const [dec2, setDec2] = useState<number>(0.9);

  // Math helper functions
  const gcd = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    return b === 0 ? a : gcd(b, a % b);
  };

  const lcm = (a: number, b: number): number => {
    if (a === 0 || b === 0) return 0;
    return Math.abs(a * b) / gcd(a, b);
  };

  // Fraction Calculation logic
  let resN = 0;
  let resD = 1;
  let calcSteps: { title: string; desc: string; formula: string }[] = [];

  if (f1D !== 0 && f2D !== 0) {
    if (op === '+') {
      const common = lcm(f1D, f2D);
      const m1 = common / f1D;
      const m2 = common / f2D;
      resN = f1N * m1 + f2N * m2;
      resD = common;
      calcSteps = [
        {
          title: '1. Közös nevező megkeresése (LKKT)',
          desc: `LKKT(${f1D}, ${f2D}) = ${common}`,
          formula: `LKKT(${f1D}, ${f2D}) = ${common}`
        },
        {
          title: '2. Törtek bővítése',
          desc: `Első tört bővítése ${m1}-gyel: ${f1N * m1}/${common}, második ${m2}-vel: ${f2N * m2}/${common}`,
          formula: `${f1N}/${f1D} + ${f2N}/${f2D} = ${f1N * m1}/${common} + ${f2N * m2}/${common}`
        },
        {
          title: '3. Számlálók összeadása',
          desc: `A nevező változatlan marad (${common}), számlálók összege: ${f1N * m1} + ${f2N * m2} = ${resN}`,
          formula: `(${f1N * m1} + ${f2N * m2})/${common} = ${resN}/${resD}`
        }
      ];
    } else if (op === '-') {
      const common = lcm(f1D, f2D);
      const m1 = common / f1D;
      const m2 = common / f2D;
      resN = f1N * m1 - f2N * m2;
      resD = common;
      calcSteps = [
        {
          title: '1. Közös nevező megkeresése (LKKT)',
          desc: `LKKT(${f1D}, ${f2D}) = ${common}`,
          formula: `LKKT(${f1D}, ${f2D}) = ${common}`
        },
        {
          title: '2. Törtek bővítése',
          desc: `Első tört bővítése: ${f1N * m1}/${common}, második: ${f2N * m2}/${common}`,
          formula: `${f1N}/${f1D} - ${f2N}/${f2D} = ${f1N * m1}/${common} - ${f2N * m2}/${common}`
        },
        {
          title: '3. Számlálók kivonása',
          desc: `Kivonjuk a számlálókat: ${f1N * m1} - ${f2N * m2} = ${resN}`,
          formula: `(${f1N * m1} - ${f2N * m2})/${common} = ${resN}/${resD}`
        }
      ];
    } else if (op === '*') {
      resN = f1N * f2N;
      resD = f1D * f2D;
      calcSteps = [
        {
          title: '1. Számlálót számlálóval, nevezőt nevezővel',
          desc: `Számlálók szorzata: ${f1N} · ${f2N} = ${resN}, nevezők szorzata: ${f1D} · ${f2D} = ${resD}`,
          formula: `${f1N}/${f1D} · ${f2N}/${f2D} = (${f1N} · ${f2N})/(${f1D} · ${f2D}) = ${resN}/${resD}`
        }
      ];
    } else if (op === '/') {
      if (f2N !== 0) {
        resN = f1N * f2D;
        resD = f1D * f2N;
        calcSteps = [
          {
            title: '1. Átírás reciprokkal való szorzásra',
            desc: `A(z) ${f2N}/${f2D} reciproka ${f2D}/${f2N}`,
            formula: `${f1N}/${f1D} : ${f2N}/${f2D} = ${f1N}/${f1D} · ${f2D}/${f2N}`
          },
          {
            title: '2. Szorzás elvégzése',
            desc: `Számláló: ${f1N} · ${f2D} = ${resN}, nevező: ${f1D} · ${f2N} = ${resD}`,
            formula: `(${f1N} · ${f2D})/(${f1D} · ${f2N}) = ${resN}/${resD}`
          }
        ];
      }
    }
  }

  const g = gcd(resN, resD);
  const simpN = resN / g;
  const simpD = resD / g;
  const isMixed = Math.abs(simpN) >= simpD && simpD !== 1;
  const wholeVal = Math.floor(Math.abs(simpN) / simpD) * (simpN < 0 ? -1 : 1);
  const remN = Math.abs(simpN) % simpD;

  // Decimal calculation
  let decResult = 0;
  if (decOp === '+') decResult = dec1 + dec2;
  if (decOp === '-') decResult = dec1 - dec2;
  if (decOp === '*') decResult = dec1 * dec2;
  if (decOp === '/') decResult = dec2 !== 0 ? dec1 / dec2 : 0;
  const roundedDec = Math.round(decResult * 10000) / 10000;

  const sections: TheorySection[] = [
    // 1. FEJEZETI NAGY TABLÓ
    {
      id: 'sec-overview',
      title: '1. A Törtek és Tizedes Törtek Fejezeti Térképe',
      icon: <Layers className="w-5 h-5 text-indigo-500" />,
      content: (
        <div className="space-y-6">
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            A 6. osztályos matematika egyik legfontosabb mérföldköve a <strong>Törtek és Tizedes Törtek</strong> fejezet.
            Ebben a fejezetben megtanultuk a törtek és tizedesek teljes műveleti rendszerét: az összeadástól, kivonástól
            a szorzáson és osztáson át egészen a többszörös zárójeles összetett kifejezésekig!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-2 border-amber-200 dark:border-amber-800 bg-amber-50/40 dark:bg-amber-950/20">
              <CardContent className="p-4 space-y-2">
                <div className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <PieChart className="w-4 h-4" /> 1. Törtek Alapjai
                </div>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Fogalom & Összeadás
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Bővítés, egyszerűsítés, azonos és különböző nevezőjű törtek összeadása és kivonása közös nevezővel (LKKT).
                </p>
                <div className="text-xs font-mono font-bold text-amber-700 dark:text-amber-300 bg-amber-100/60 dark:bg-amber-900/40 p-1.5 rounded">
                  <MathText>a/b ± c/d ➔ LKKT(b, d)</MathText>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 dark:border-blue-800 bg-blue-50/40 dark:bg-blue-950/20">
              <CardContent className="p-4 space-y-2">
                <div className="text-xs font-black uppercase text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <X className="w-4 h-4" /> 2. Szorzás & Reciprok
                </div>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Törtek szorzása
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Számlálót számlálóval, nevezőt nevezővel szorzunk. Keresztbe egyszerűsítés, reciprok: <MathText>a/b · b/a = 1</MathText>.
                </p>
                <div className="text-xs font-mono font-bold text-blue-700 dark:text-blue-300 bg-blue-100/60 dark:bg-blue-900/40 p-1.5 rounded">
                  <MathText>a/b · c/d = (a · c)/(b · d)</MathText>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-violet-200 dark:border-violet-800 bg-violet-50/40 dark:bg-violet-950/20">
              <CardContent className="p-4 space-y-2">
                <div className="text-xs font-black uppercase text-violet-600 dark:text-violet-400 flex items-center gap-1.5">
                  <Divide className="w-4 h-4" /> 3. Osztás Törttel
                </div>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Reciprokkal szorzás
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Törttel úgy osztunk, hogy az osztó reciprokával szorzunk. Vegyes törteket először áltörtté alakítunk!
                </p>
                <div className="text-xs font-mono font-bold text-violet-700 dark:text-violet-300 bg-violet-100/60 dark:bg-violet-900/40 p-1.5 rounded">
                  <MathText>a/b : c/d = a/b · d/c</MathText>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/20">
              <CardContent className="p-4 space-y-2">
                <div className="text-xs font-black uppercase text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <Zap className="w-4 h-4" /> 4. Tizedes Műveletek
                </div>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Szorzás és Osztás
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  10-zel, 100-zal való műveletek (vesszőmozgatás), tizedesek szorzása és osztása bővítéssel egész számmá.
                </p>
                <div className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100/60 dark:bg-emerald-900/40 p-1.5 rounded">
                  <MathText>a : 0,b ➔ (a · 10) : b</MathText>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },

    // 2. KÖZÖNSÉGES TÖRTEK TELJES MŰVELETI KISOKOSA
    {
      id: 'sec-fractions-rules',
      title: '2. Közönséges Törtek Műveleti Szabályai',
      icon: <BookOpen className="w-5 h-5 text-blue-500" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Összeadás & Kivonás */}
            <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-3">
              <div className="text-sm font-bold text-amber-800 dark:text-amber-200 flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-600" />
                Összeadás és Kivonás
              </div>
              <ul className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2 list-disc list-inside">
                <li>
                  <strong>Azonos nevezőnél:</strong> A számlálókat összeadjuk vagy kivonjuk, a nevező <em>változatlan marad</em>.
                </li>
                <li>
                  <strong>Különböző nevezőnél:</strong> Először közös nevezőre hozzuk a törteket (a nevezők <strong>LKKT</strong>-jére), bővítjük a számlálókat, majd elvégezzük a műveletet.
                </li>
              </ul>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl font-mono text-center text-xs sm:text-sm text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 shadow-sm">
                <MathText>1/3 + 2/5 = 5/15 + 6/15 = 11/15</MathText>
              </div>
            </div>

            {/* Szorzás & Osztás */}
            <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 space-y-3">
              <div className="text-sm font-bold text-indigo-800 dark:text-indigo-200 flex items-center gap-2">
                <Divide className="w-4 h-4 text-indigo-600" />
                Szorzás és Osztás
              </div>
              <ul className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2 list-disc list-inside">
                <li>
                  <strong>Szorzás törttel:</strong> Számlálót a számlálóval, nevezőt a nevezővel szorzunk. <em>Mielőtt összeszoroznád, egyszerűsíts keresztbe!</em>
                </li>
                <li>
                  <strong>Osztás törttel:</strong> Az osztandót megszorozzuk az osztó <strong>reciprokával</strong> (felcserélt számlálójú és nevezőjű törtjével).
                </li>
              </ul>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl font-mono text-center text-xs sm:text-sm text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 shadow-sm">
                <MathText>3/4 : 9/8 = 3/4 · 8/9 = (1 · 2)/(1 · 3) = 2/3</MathText>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 space-y-2">
            <div className="text-xs font-black uppercase text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Vegyes törtek aranyszabálya
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Szorzásnál és osztásnál a vegyes törteket <strong>MINDIG alakítsd át közönséges áltörtté</strong> a művelet elvégzése előtt!
            </p>
            <div className="p-2 bg-white dark:bg-slate-900 rounded-lg font-mono text-center text-xs text-purple-700 dark:text-purple-300 font-bold border">
              <MathText>2 1/3 · 1 1/2 = 7/3 · 3/2 = 7/2 = 3 1/2</MathText>
            </div>
          </div>
        </div>
      )
    },

    // 3. TIZEDES TÖRTEK MŰVELETI KISOKOSA
    {
      id: 'sec-decimals-rules',
      title: '3. Tizedes Törtek Műveleti Szabályai és Vesszőmozgatás',
      icon: <Calculator className="w-5 h-5 text-emerald-500" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Szorzás tizedessel */}
            <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-3">
              <div className="text-sm font-bold text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
                <X className="w-4 h-4 text-emerald-600" />
                Szorzás Tizedes Törttel
              </div>
              <ol className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1.5 list-decimal list-inside">
                <li>Szorozzuk össze a számokat úgy, mintha <strong>egész számok</strong> lennének (figyelmen kívül hagyva a tizedesvesszőket).</li>
                <li>Számoljuk össze a tényezőkben található összes tizedesjegy számát.</li>
                <li>A szorzat végéről balra lépve kitesszük a tizedesvesszőt annyi jeggyel.</li>
              </ol>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg font-mono text-center text-xs sm:text-sm text-emerald-700 dark:text-emerald-300 font-bold border">
                <MathText>1,2 (1 jegy) · 0,04 (2 jegy) = 0,048 (3 jegy)</MathText>
              </div>
            </div>

            {/* Osztás tizedessel */}
            <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 space-y-3">
              <div className="text-sm font-bold text-rose-800 dark:text-rose-200 flex items-center gap-2">
                <Divide className="w-4 h-4 text-rose-600" />
                Osztás Tizedes Törttel
              </div>
              <ol className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1.5 list-decimal list-inside">
                <li>Tizedes törttel közvetlenül <strong>nem osztunk</strong>!</li>
                <li>Bővítsük az osztandót és az osztót 10-zel, 100-zal vagy 1000-rel úgy, hogy az <strong>osztó egész szám</strong> legyen!</li>
                <li>Végezzük el az írásbeli osztást. Amikor az osztandóban elérjük a tizedesvesszőt, a hányadosba is kitesszük a vesszőt.</li>
              </ol>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg font-mono text-center text-xs sm:text-sm text-rose-700 dark:text-rose-300 font-bold border">
                <MathText>4,8 : 0,06 = 480 : 6 = 80</MathText>
              </div>
            </div>
          </div>

          {/* 10-es léptetési táblázat */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="text-xs font-black uppercase text-slate-600 dark:text-slate-400">
              ⚡ Gyors áttekintő: Szorzás és osztás 10-zel, 100-zal, 1000-rel
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border space-y-1">
                <span className="font-bold text-blue-600 dark:text-blue-400">Szorzás 10-hatvánnyal:</span>
                <p className="text-slate-600 dark:text-slate-400">A vessző <strong>jobbra</strong> lép annyi hellyel, ahány 0 van.</p>
                <div className="font-mono font-bold text-slate-800 dark:text-slate-200">
                  <MathText>3,456 · 100 = 345,6</MathText>
                </div>
              </div>
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border space-y-1">
                <span className="font-bold text-indigo-600 dark:text-indigo-400">Osztás 10-hatvánnyal:</span>
                <p className="text-slate-600 dark:text-slate-400">A vessző <strong>balra</strong> lép annyi hellyel, ahány 0 van.</p>
                <div className="font-mono font-bold text-slate-800 dark:text-slate-200">
                  <MathText>345,6 : 1000 = 0,3456</MathText>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // 4. MŰVELETI SORREND ÉS ZÁRÓJELFELBONTÁS
    {
      id: 'sec-complex-rules',
      title: '4. Műveleti Sorrend és Zárójelfelbontási Szabályok',
      icon: <Target className="w-5 h-5 text-cyan-500" />,
      content: (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-cyan-50/50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800 space-y-4">
            <div className="text-sm font-bold text-cyan-800 dark:text-cyan-200">
              A Műveleti Sorrend Szigorú Hierarchiája
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-cyan-200 shadow-sm">
                <div className="text-xs font-black text-cyan-600 uppercase">1. Zárójelek</div>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200 my-1 font-mono">
                  ( ) ➔ [ ] ➔ {'{ }'}
                </div>
                <p className="text-xs text-slate-500">Mindig a legbelső kerek zárójeltől kifelé haladunk!</p>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-cyan-200 shadow-sm">
                <div className="text-xs font-black text-cyan-600 uppercase">2. Szorzás & Osztás</div>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200 my-1 font-mono">
                  · és :
                </div>
                <p className="text-xs text-slate-500">Magasabb prioritásúak az összeadásnál. Balról jobbra haladunk!</p>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-cyan-200 shadow-sm">
                <div className="text-xs font-black text-cyan-600 uppercase">3. Összeadás & Kivonás</div>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200 my-1 font-mono">
                  + és -
                </div>
                <p className="text-xs text-slate-500">A legutolsó lépésként elvégzendő alapműveletek.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border space-y-2">
              <div className="text-xs font-black uppercase text-slate-700 dark:text-slate-300">
                ➕ Zárójel előtt PLUSZ jel áll:
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                A zárójelet egyszerűen elhagyhatjuk, a belső előjelek <strong>nem változnak</strong>:
              </p>
              <div className="p-2 bg-white dark:bg-slate-800 rounded font-mono text-xs font-bold text-emerald-600 text-center">
                <MathText>+(a - b + c) = a - b + c</MathText>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border space-y-2">
              <div className="text-xs font-black uppercase text-slate-700 dark:text-slate-300">
                ➖ Zárójel előtt MÍNUSZ jel áll:
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                A zárójel felbontásakor a zárójelen belüli <strong>minden tag előjele az ellentétére vált</strong>:
              </p>
              <div className="p-2 bg-white dark:bg-slate-800 rounded font-mono text-xs font-bold text-rose-600 text-center">
                <MathText>-(a - b + c) = -a + b - c</MathText>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // 5. INTERAKTÍV MESTER LABOR & KALKULÁTOR
    {
      id: 'sec-interactive-calc',
      title: '5. Interaktív Fejezeti Mester Kalkulátor és Lépésről-lépésre Vezető',
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      content: (
        <div className="space-y-6">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Próbáld ki a fejezet összes műveletét ezen az interaktív kalkulátoron! Állítsd be a számokat, válaszd ki a kívánt műveletet,
            és figyeld meg a pontos, lépésről lépésre levezetett matematikai megoldást.
          </p>

          <div className="flex gap-2">
            <Button
              variant={calcMode === 'fraction' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCalcMode('fraction')}
              className="text-xs"
            >
              🍕 Közönséges Törtek Mestere
            </Button>
            <Button
              variant={calcMode === 'decimal' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCalcMode('decimal')}
              className="text-xs"
            >
              ⚡ Tizedes Törtek Mestere
            </Button>
          </div>

          {calcMode === 'fraction' ? (
            <Card className="border-2 border-indigo-200 dark:border-indigo-800 bg-white dark:bg-slate-900 p-4 space-y-4">
              <div className="flex flex-wrap items-center justify-center gap-3">
                {/* Tört 1 */}
                <div className="flex flex-col items-center gap-1 bg-indigo-50/50 dark:bg-indigo-950/30 p-2.5 rounded-xl border border-indigo-200">
                  <div className="text-[10px] font-bold text-indigo-600 uppercase">1. Tört</div>
                  <div className="flex flex-col items-center gap-1">
                    <input
                      type="number"
                      value={f1N}
                      onChange={(e) => setF1N(parseInt(e.target.value) || 0)}
                      className="w-14 h-8 text-center text-sm font-mono font-bold rounded border bg-white dark:bg-slate-800"
                      title="Számláló 1"
                    />
                    <div className="w-12 h-0.5 bg-slate-400"></div>
                    <input
                      type="number"
                      value={f1D}
                      onChange={(e) => setF1D(parseInt(e.target.value) || 1)}
                      className="w-14 h-8 text-center text-sm font-mono font-bold rounded border bg-white dark:bg-slate-800"
                      title="Nevező 1"
                    />
                  </div>
                </div>

                {/* Műveleti jel választó */}
                <div className="flex flex-col gap-1">
                  <div className="text-[10px] font-bold text-center text-slate-500 uppercase">Művelet</div>
                  <div className="grid grid-cols-2 gap-1">
                    {(['+', '-', '*', '/'] as const).map((o) => (
                      <Button
                        key={o}
                        size="sm"
                        variant={op === o ? 'default' : 'outline'}
                        className="w-8 h-8 text-xs font-mono font-bold p-0"
                        onClick={() => setOp(o)}
                      >
                        {o === '*' ? '·' : o === '/' ? ':' : o}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Tört 2 */}
                <div className="flex flex-col items-center gap-1 bg-indigo-50/50 dark:bg-indigo-950/30 p-2.5 rounded-xl border border-indigo-200">
                  <div className="text-[10px] font-bold text-indigo-600 uppercase">2. Tört</div>
                  <div className="flex flex-col items-center gap-1">
                    <input
                      type="number"
                      value={f2N}
                      onChange={(e) => setF2N(parseInt(e.target.value) || 0)}
                      className="w-14 h-8 text-center text-sm font-mono font-bold rounded border bg-white dark:bg-slate-800"
                      title="Számláló 2"
                    />
                    <div className="w-12 h-0.5 bg-slate-400"></div>
                    <input
                      type="number"
                      value={f2D}
                      onChange={(e) => setF2D(parseInt(e.target.value) || 1)}
                      className="w-14 h-8 text-center text-sm font-mono font-bold rounded border bg-white dark:bg-slate-800"
                      title="Nevező 2"
                    />
                  </div>
                </div>

                <div className="text-xl font-bold font-mono text-slate-400">=</div>

                {/* Eredmény kártya */}
                <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 min-w-[120px]">
                  <div className="text-[10px] font-bold text-emerald-600 uppercase">Végeredmény</div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex flex-col items-center font-mono font-black text-base text-emerald-700 dark:text-emerald-300">
                      <span>{simpN}</span>
                      {simpD !== 1 && (
                        <>
                          <span className="w-full h-0.5 bg-emerald-600 my-0.5"></span>
                          <span>{simpD}</span>
                        </>
                      )}
                    </div>
                    {isMixed && (
                      <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-200">
                        = {wholeVal} <span className="inline-flex flex-col items-center text-[10px] leading-tight"><span>{remN}</span><span className="w-full h-px bg-current"></span><span>{simpD}</span></span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Lépések részletezése */}
              <div className="space-y-2 pt-3 border-t">
                <div className="text-xs font-black uppercase text-slate-600 dark:text-slate-400">
                  Lépésről-lépésre levezetés:
                </div>
                {calcSteps.map((step, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border text-xs space-y-1">
                    <div className="font-bold text-slate-800 dark:text-slate-200">{step.title}</div>
                    <div className="text-slate-600 dark:text-slate-400">{step.desc}</div>
                    <div className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                      <MathText>{step.formula}</MathText>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ) : (
            <Card className="border-2 border-emerald-200 dark:border-emerald-800 bg-white dark:bg-slate-900 p-4 space-y-4">
              <div className="flex flex-wrap items-center justify-center gap-3">
                {/* Dec 1 */}
                <div className="flex flex-col items-center gap-1 bg-emerald-50/50 dark:bg-emerald-950/30 p-2.5 rounded-xl border border-emerald-200">
                  <div className="text-[10px] font-bold text-emerald-600 uppercase">1. Szám</div>
                  <input
                    type="number"
                    step="0.01"
                    value={dec1}
                    onChange={(e) => setDec1(parseFloat(e.target.value) || 0)}
                    className="w-20 h-8 text-center text-sm font-mono font-bold rounded border bg-white dark:bg-slate-800"
                  />
                </div>

                {/* Dec Op */}
                <div className="flex flex-col gap-1">
                  <div className="text-[10px] font-bold text-center text-slate-500 uppercase">Művelet</div>
                  <div className="grid grid-cols-2 gap-1">
                    {(['+', '-', '*', '/'] as const).map((o) => (
                      <Button
                        key={o}
                        size="sm"
                        variant={decOp === o ? 'default' : 'outline'}
                        className="w-8 h-8 text-xs font-mono font-bold p-0"
                        onClick={() => setDecOp(o)}
                      >
                        {o === '*' ? '·' : o === '/' ? ':' : o}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Dec 2 */}
                <div className="flex flex-col items-center gap-1 bg-emerald-50/50 dark:bg-emerald-950/30 p-2.5 rounded-xl border border-emerald-200">
                  <div className="text-[10px] font-bold text-emerald-600 uppercase">2. Szám</div>
                  <input
                    type="number"
                    step="0.01"
                    value={dec2}
                    onChange={(e) => setDec2(parseFloat(e.target.value) || 0)}
                    className="w-20 h-8 text-center text-sm font-mono font-bold rounded border bg-white dark:bg-slate-800"
                  />
                </div>

                <div className="text-xl font-bold font-mono text-slate-400">=</div>

                {/* Result */}
                <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 min-w-[120px]">
                  <div className="text-[10px] font-bold text-emerald-600 uppercase">Eredmény</div>
                  <div className="font-mono font-black text-lg text-emerald-700 dark:text-emerald-300 mt-1">
                    {roundedDec}
                  </div>
                </div>
              </div>

              {decOp === '/' && (
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1">
                  <div className="font-bold text-slate-800 dark:text-slate-200">💡 Bővítéses levezetés:</div>
                  <p className="text-slate-600 dark:text-slate-400">
                    Az osztó ({dec2}) egész számmá tétele érdekében a művelet bővítése:
                  </p>
                  <div className="font-mono text-indigo-600 font-bold">
                    <MathText>{`${dec1} : ${dec2} = (${dec1 * 100}) : (${dec2 * 100}) = ${roundedDec}`}</MathText>
                  </div>
                </div>
              )}
            </Card>
          )}
        </div>
      )
    },

    // 6. TÍPUSHIBÁK ÉS ARANY SZABÁLYOK
    {
      id: 'sec-summary-tips',
      title: '6. Fejezeti Típushibák és Arany Szabályok',
      icon: <Lightbulb className="w-5 h-5 text-amber-500" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 space-y-2">
              <div className="text-xs font-black uppercase text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                ⚠️ 1. Típushiba: Nevezők összeadása
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                Összeadáskor a közös nevező <strong>nem adódik össze</strong>!
              </p>
              <div className="p-2 bg-white dark:bg-slate-900 rounded font-mono text-center text-xs text-rose-600 line-through border border-rose-200">
                <MathText>1/4 + 2/4 = 3/8</MathText> (HELYTELEN!)
              </div>
              <div className="p-2 bg-white dark:bg-slate-900 rounded font-mono text-center text-xs text-emerald-600 font-bold border border-emerald-200">
                <MathText>1/4 + 2/4 = 3/4</MathText> (HELYES!)
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 space-y-2">
              <div className="text-xs font-black uppercase text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                ⚠️ 2. Típushiba: Osztásnál az első tört megfordítása
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                Törttel való osztásnál <strong>mindig a második tört (az osztó)</strong> reciprokát vesszük, nem az elsőét!
              </p>
              <div className="p-2 bg-white dark:bg-slate-900 rounded font-mono text-center text-xs text-rose-600 line-through border border-rose-200">
                <MathText>2/3 : 4/5 = 3/2 · 4/5</MathText> (HELYTELEN!)
              </div>
              <div className="p-2 bg-white dark:bg-slate-900 rounded font-mono text-center text-xs text-emerald-600 font-bold border border-emerald-200">
                <MathText>2/3 : 4/5 = 2/3 · 5/4 = 10/12 = 5/6</MathText> (HELYES!)
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 space-y-2">
              <div className="text-xs font-black uppercase text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                ⚠️ 3. Típushiba: Vegyes tört helytelen szorzása
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                Nem szabad csak az egészeket és a törteket külön megszorozni!
              </p>
              <div className="p-2 bg-white dark:bg-slate-900 rounded font-mono text-center text-xs text-rose-600 line-through border border-rose-200">
                <MathText>2 1/2 · 3 1/3 = 6 1/6</MathText> (HELYTELEN!)
              </div>
              <div className="p-2 bg-white dark:bg-slate-900 rounded font-mono text-center text-xs text-emerald-600 font-bold border border-emerald-200">
                <MathText>5/2 · 10/3 = 50/6 = 25/3 = 8 1/3</MathText> (HELYES!)
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-2">
              <div className="text-xs font-black uppercase text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                💡 4. Arany Szabály: Egyszerűsítés a végén
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                A végeredményt mindig egyszerűsítsd <strong>tovább már nem egyszerűsíthető</strong> (törzstört vagy legegyszerűbb) alakra, és ha 1-nél nagyobb áltört, írd át vegyes tört alakba is!
              </p>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded font-mono text-center text-xs text-emerald-700 dark:text-emerald-300 font-bold border">
                <MathText>18/12 = 3/2 = 1 1/2</MathText>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      title="II. Törtek és Tizedes Törtek — Fejezeti Összefoglalás"
      subtitle="Átfogó fejezeti tananyag: törtek és tizedes törtek teljes műveleti rendszere, reciprok, műveleti sorrend és mester kalkulátor."
      emoji="🏆"
      badgeText="🏆 6. Osztály • II. Törtek • Összefoglalás"
      quickRule={{
        label: 'Fejezeti Mesterképletek',
        formula: 'a/b · c/d = (a · c)/(b · d) | a/b : c/d = a/b · d/c | a : 0,b = (a · 10) : b'
      }}
      themeColor="slate"
      sections={sections}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      topicId="g6-fractions-summary-theory"
      pdfFilename="6_osztaly_tortek_osszefoglalas_tananyag.pdf"
    />
  );
}

export default FractionsSummaryTheory;
