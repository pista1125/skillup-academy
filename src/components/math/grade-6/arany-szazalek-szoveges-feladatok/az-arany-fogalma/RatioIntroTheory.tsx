import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, MathText } from '../TheoryTemplate';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Scale,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Compass,
  ArrowRight,
  Info,
  Maximize2,
  Layers,
  FlaskConical,
  Flag,
  MapPin
} from 'lucide-react';

interface RatioIntroTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

// Helper: Legnagyobb közös osztó
function getGCD(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

export const RatioIntroTheory: React.FC<RatioIntroTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interaktív szemléltető állapot: A és B részek
  const [partA, setPartA] = useState<number>(2);
  const [partB, setPartB] = useState<number>(3);

  const gcd = getGCD(partA, partB);
  const simpA = partA / gcd;
  const simpB = partB / gcd;
  const total = partA + partB;
  const fractionValue = (partA / partB).toFixed(2);
  const percentA = Math.round((partA / total) * 100);
  const percentB = 100 - percentA;

  const sections: TheorySection[] = [
    {
      id: 'fogalom',
      title: 'Mi az arány? Fogalom és jelölés',
      badge: 'Alapfogalmak',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            A mindennapi életben lépten-nyomon összehasonlítunk dolgokat: például egy szörp hígításakor,
            sütemény készítésekor, vagy amikor azt vizsgáljuk, hány fiú és lány jár egy osztályba.
          </p>

          {/* Kiemelt képlet kártya */}
          <div className="p-4 sm:p-5 rounded-2xl border-2 border-orange-300 dark:border-orange-800 bg-gradient-to-r from-orange-50 via-amber-50/50 to-orange-50 dark:from-orange-950/40 dark:via-slate-900 dark:to-orange-950/30 text-center space-y-2 shadow-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-100 text-orange-800 dark:bg-orange-900/60 dark:text-orange-300 border border-orange-200 dark:border-orange-700">
              <Sparkles className="w-3 h-3 text-orange-600" /> Kiemelt képlet
            </span>
            <div className="text-lg sm:text-2xl font-mono font-black text-orange-950 dark:text-orange-100 tracking-wide">
              a : b = a / b &nbsp;(ahol b ≠ 0)
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Két mennyiség aránya a mérőszámok hányadosa. Bővítéssel és egyszerűsítéssel az arány értéke változatlan.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-orange-200 dark:border-orange-900/50 bg-orange-50/70 dark:bg-orange-950/20 space-y-2">
            <h4 className="font-bold text-orange-900 dark:text-orange-200 flex items-center gap-2 text-sm">
              <Scale className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              Az arány matematikai definíciója
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Két mennyiség <strong>arányán</strong> a két mennyiség mérőszámának <strong>hányadosát</strong> (osztását) értjük.
              Az arány megmutatja, hogy az első mennyiség <strong>hányszorosa</strong> a másodiknak, vagy <strong>mekkora része</strong> annak.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-center font-mono font-bold text-sm text-orange-900 dark:text-orange-200 bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-orange-200 dark:border-orange-800">
              <span>Jelölése: <strong>a : b</strong></span>
              <span className="text-slate-400">•</span>
              <span>Olvasd: „a aránylik a b-hez”</span>
              <span className="text-slate-400">•</span>
              <span>Tört alakban: <strong>a / b</strong> (ahol b ≠ 0)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider block mb-1">
                Előtag és Utótag
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Az <strong>a : b</strong> arányban az <strong>a</strong> az arány <strong>első tagja (előtag)</strong>,
                a <strong>b</strong> pedig az arány <strong>második tagja (utótag)</strong>.
              </p>
            </div>
            <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-850 bg-amber-50/40 dark:bg-amber-950/20">
              <span className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider block mb-1 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> A sorrend szigorúan számít!
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                A <strong>2 : 5</strong> és az <strong>5 : 2</strong> két teljesen különböző arány! Ha egy osztályban a lányok és fiúk aránya 2 : 5, akkor lányból van jóval kevesebb.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'egyszerusites-bovites',
      title: 'Az arány bővítése és egyszerűsítése',
      badge: 'Műveletek',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Mivel az arány valójában egy osztás (tört), az arányokra pontosan ugyanazok a szabályok érvényesek, mint a törtek bővítésére és egyszerűsítésére.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20">
              <h5 className="font-bold text-emerald-800 dark:text-emerald-300 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Egyszerűsítés (Osztás)
              </h5>
              <p className="text-xs text-slate-700 dark:text-slate-300 mb-2 leading-relaxed">
                Ha az arány mindkét tagját elosztjuk ugyanazzal a 0-tól különböző számmal, az arány értéke változatlan marad:
              </p>
              <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-emerald-200 dark:border-emerald-800 text-center font-mono font-bold text-xs text-emerald-700 dark:text-emerald-300">
                12 : 18 = (12 : 6) : (18 : 6) = 2 : 3
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 italic">
                A legkisebb egész számok arányát <strong>egyszerűsített alaknak</strong> nevezzük (relatív prímek).
              </p>
            </div>

            <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/40 bg-blue-50/50 dark:bg-blue-950/20">
              <h5 className="font-bold text-blue-800 dark:text-blue-300 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Bővítés (Szorzás)
              </h5>
              <p className="text-xs text-slate-700 dark:text-slate-300 mb-2 leading-relaxed">
                Ha az arány mindkét tagját megszorozzuk ugyanazzal a 0-tól különböző számmal, az arány értéke változatlan marad:
              </p>
              <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-blue-200 dark:border-blue-800 text-center font-mono font-bold text-xs text-blue-700 dark:text-blue-300">
                2 : 5 = (2 · 4) : (5 · 4) = 8 : 20
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 italic">
                A recept kétszerezésekor vagy háromszorozásakor bővítést hajtunk végre.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-900/40 bg-indigo-50/40 dark:bg-indigo-950/20">
            <h5 className="font-bold text-indigo-900 dark:text-indigo-200 text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-indigo-600" /> Törtek és tizedestörtek aránya
            </h5>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Ha az arány tagjai törtek vagy tizedestörtek, bővítéssel mindig át tudjuk őket alakítani egész számok arányára:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono font-bold text-indigo-800 dark:text-indigo-300">
              <div className="bg-white dark:bg-slate-900 p-2 rounded border border-indigo-200 dark:border-indigo-800 text-center">
                0,4 : 1,2 = (·10) = 4 : 12 = 1 : 3
              </div>
              <div className="bg-white dark:bg-slate-900 p-2 rounded border border-indigo-200 dark:border-indigo-800 text-center">
                1/2 : 1/4 = (·4) = 2 : 1
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'mertekegyseg-tobbtagu',
      title: 'Azonos mértékegységek és többtagú arányok',
      badge: 'Gyakorlat',
      content: (
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/60 dark:bg-rose-950/20">
            <h4 className="font-bold text-rose-900 dark:text-rose-200 flex items-center gap-2 text-sm mb-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              Az aranyszabály: Mindig azonos mértékegységben számolj!
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Nem hasonlíthatunk össze közvetlenül métert centiméterrel vagy kilogrammot grammal!
              Arányképzés előtt <strong>mindkét mennyiséget ugyanarra a mértékegységre</strong> kell átváltani:
            </p>
            <div className="mt-2.5 p-3 rounded-lg bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-800 flex flex-col sm:flex-row items-center justify-around gap-2 text-xs font-mono">
              <div className="text-center">
                <span className="text-slate-500 block text-[10px]">Hibás közvetlen felírás:</span>
                <span className="text-rose-600 font-bold line-through">20 cm : 1 m ≠ 20 : 1</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 hidden sm:block" />
              <div className="text-center">
                <span className="text-emerald-600 block text-[10px] font-bold">Helyes átváltva (1 m = 100 cm):</span>
                <span className="text-emerald-700 dark:text-emerald-300 font-bold">20 cm : 100 cm = 1 : 5</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <h5 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-orange-600" /> Többtagú arányok (pl. 2 : 3 : 5)
            </h5>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              Ha nem kettő, hanem három vagy több mennyiséget hasonlítunk össze egyszerre, <strong>összetett arányt</strong> használunk.
              Ilyenkor a részek összege adja meg az egész egységeinek számát:
            </p>
            <div className="p-3 rounded-lg bg-orange-50/60 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50 text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
              <div className="font-bold text-orange-900 dark:text-orange-200 flex items-center justify-between">
                <span>Példa: Sütemény tészta (liszt : cukor : vaj = 3 : 2 : 1)</span>
                <span className="text-[10px] bg-orange-200 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-2 py-0.5 rounded-full font-mono">
                  Összesen: 3 + 2 + 1 = 6 rész
                </span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Ez azt jelenti, hogy a tésztának 3/6-a (fele) liszt, 2/6-a (egyharmada) cukor, és 1/6-a vaj.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'mindennapok',
      title: 'Arányok a mindennapi életben',
      badge: 'Alkalmazások',
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 flex items-center justify-center font-bold mb-2">
              <MapPin className="w-4 h-4" />
            </div>
            <h6 className="font-bold text-slate-900 dark:text-white text-xs mb-1">Térképek méretaránya</h6>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              Az <strong>1 : 50 000</strong> méretarány azt jelenti, hogy a térképen mért 1 cm a valóságban 50 000 cm = 500 m.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold mb-2">
              <FlaskConical className="w-4 h-4" />
            </div>
            <h6 className="font-bold text-slate-900 dark:text-white text-xs mb-1">Szörp hígítás</h6>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              Az <strong>1 : 7</strong> hígítási arány azt jelenti, hogy 1 rész szörphöz 7 rész vizet öntünk, így összesen 8 rész ital keletkezik.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold mb-2">
              <Maximize2 className="w-4 h-4" />
            </div>
            <h6 className="font-bold text-slate-900 dark:text-white text-xs mb-1">Képarányok (Monitor)</h6>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              A <strong>16 : 9</strong> képarány azt jelenti, hogy a kijelző szélességének és magasságának aránya 16 a 9-hez.
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      title="Az arány fogalma"
      subtitle="Két mennyiség hányadosa, egyszerűsítés, bővítés és gyakorlati szemléltetés"
      badge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK • 📖 TANANYAG"
      themeColor="orange"
      pdfFilename="6_osztaly_IV_arany_fogalma_tananyag.pdf"
      quickRule={{
        label: 'Az arány alaptétele',
        formula: 'a : b = a / b  (ahol b ≠ 0). Az arány értéke bővítéssel és egyszerűsítéssel nem változik.'
      }}
      practiceTitle="Készen állsz a kvízre és az aránypárokra?"
      practiceSubtitle="Gyakorold az arányok felírását, egyszerűsítését és a szöveges feladványokat 3 fokozatban!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      sections={sections}
    >
      {/* Interaktív Keverő & Szemléltető Laboratórium */}
      <Card className="border-2 border-orange-200 dark:border-orange-900/60 bg-gradient-to-br from-orange-50/50 via-white to-amber-50/30 dark:from-slate-900 dark:to-slate-900 p-5 rounded-2xl shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b border-orange-100 dark:border-slate-800 pb-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300 mb-1">
              <FlaskConical className="w-3 h-3 text-orange-600" /> Interaktív Labor
            </div>
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              Arány Szemléltető és Keverő
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Állítsd be az „A” és „B” részek mennyiségét, figyeld meg az arány egyszerűsítését és a grafikus megjelenést!
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Gyors beállítás:</span>
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-7 px-2"
              onClick={() => { setPartA(2); setPartB(3); }}
            >
              2 : 3
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-7 px-2"
              onClick={() => { setPartA(6); setPartB(8); }}
            >
              6 : 8
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-7 px-2"
              onClick={() => { setPartA(4); setPartB(12); }}
            >
              4 : 12
            </Button>
          </div>
        </div>

        {/* Sliders & Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            {/* Part A slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-1.5 text-orange-700 dark:text-orange-400">
                  <span className="w-3 h-3 rounded-full bg-orange-500 inline-block" /> „A” rész (pl. Szörp / Piros)
                </span>
                <span className="px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300 font-mono font-bold">
                  {partA} egység
                </span>
              </div>
              <Slider
                value={[partA]}
                min={1}
                max={16}
                step={1}
                onValueChange={(val) => setPartA(val[0])}
                className="py-1"
              />
            </div>

            {/* Part B slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-1.5 text-blue-700 dark:text-blue-400">
                  <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" /> „B” rész (pl. Víz / Kék)
                </span>
                <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-mono font-bold">
                  {partB} egység
                </span>
              </div>
              <Slider
                value={[partB]}
                min={1}
                max={16}
                step={1}
                onValueChange={(val) => setPartB(val[0])}
                className="py-1"
              />
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-center">
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Felírt arány</div>
                <div className="text-base font-black text-slate-900 dark:text-white font-mono mt-0.5">
                  {partA} : {partB}
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-orange-50/80 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800">
                <div className="text-[10px] text-orange-700 dark:text-orange-400 uppercase tracking-wider font-bold">Egyszerűsítve</div>
                <div className="text-base font-black text-orange-700 dark:text-orange-300 font-mono mt-0.5">
                  {simpA} : {simpB}
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Hányados érték</div>
                <div className="text-base font-black text-slate-900 dark:text-white font-mono mt-0.5">
                  ≈ {fractionValue}
                </div>
              </div>
            </div>
          </div>

          {/* Visual representation container */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between h-full min-h-[220px]">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-bold">
                <span>Vizuális sáv ({total} egyenlő rész)</span>
                <span>A: {percentA}% | B: {percentB}%</span>
              </div>

              {/* Stacked bar */}
              <div className="h-7 w-full rounded-lg overflow-hidden flex border border-slate-300 dark:border-slate-700 shadow-inner">
                <div
                  className="bg-orange-500 transition-all duration-300 flex items-center justify-center text-white text-xs font-black"
                  style={{ width: `${percentA}%` }}
                >
                  {percentA > 15 ? `${partA}` : ''}
                </div>
                <div
                  className="bg-blue-500 transition-all duration-300 flex items-center justify-center text-white text-xs font-black"
                  style={{ width: `${percentB}%` }}
                >
                  {percentB > 15 ? `${partB}` : ''}
                </div>
              </div>

              {/* Discrete unit blocks visualizer */}
              <div className="mt-3">
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1.5">
                  Egységek kirakása ({partA} db narancs, {partB} db kék kocka):
                </span>
                <div className="flex flex-wrap gap-1 max-h-[70px] overflow-y-auto p-1 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-850">
                  {Array.from({ length: partA }).map((_, idx) => (
                    <div
                      key={`a-${idx}`}
                      className="w-5 h-5 rounded bg-orange-500 text-white flex items-center justify-center text-[10px] font-bold shadow-xs"
                      title={`A egység #${idx + 1}`}
                    >
                      A
                    </div>
                  ))}
                  {Array.from({ length: partB }).map((_, idx) => (
                    <div
                      key={`b-${idx}`}
                      className="w-5 h-5 rounded bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold shadow-xs"
                      title={`B egység #${idx + 1}`}
                    >
                      B
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Insight text */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {gcd > 1 ? (
                  <>
                    Mindkét szám osztható <strong>{gcd}</strong>-val, ezért az arány egyszerűsítve: <strong>{simpA} : {simpB}</strong>.
                  </>
                ) : (
                  <>
                    A számok relatív prímek, az arány már <strong>legegyszerűbb alakban</strong> van: <strong>{partA} : {partB}</strong>.
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </TheoryTemplate>
  );
};
export default RatioIntroTheory;
