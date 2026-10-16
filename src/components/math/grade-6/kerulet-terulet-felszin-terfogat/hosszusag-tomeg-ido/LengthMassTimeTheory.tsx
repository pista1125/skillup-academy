import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, MathText } from '../TheoryTemplate';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Ruler,
  Scale,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Info,
  Maximize2,
  Layers,
  Flame,
  Check,
  Zap
} from 'lucide-react';
import {
  MassConversionLadderSvg,
  TimeConversionClockSvg
} from './LengthMassTimeDiagrams';

interface LengthMassTimeTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const LengthMassTimeTheory: React.FC<LengthMassTimeTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interaktív demonstrációs állapot
  const [activeTab, setActiveTab] = useState<'length' | 'mass' | 'time'>('length');
  const [lengthMeters, setLengthMeters] = useState<number>(3.5);
  const [massKg, setMassKg] = useState<number>(2.4);
  const [timeHours, setTimeHours] = useState<number>(1.5);

  const sections: TheorySection[] = [
    {
      id: 'mertekegyseg-alapok',
      title: 'A mérés és a mértékegységek rendszere',
      badge: 'Alapfogalmak',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Amikor megmérünk egy mennyiséget (pl. egy folyosó hosszát, egy zsák liszt tömegét vagy egy futóverseny idejét),
            mindig egy megállapodás szerinti egységhez, a <strong>mértékegységhez</strong> hasonlítjuk.
          </p>

          {/* Aranyszabály kártya */}
          <div className="p-4 sm:p-5 rounded-2xl border-2 border-cyan-300 dark:border-cyan-800 bg-gradient-to-r from-cyan-50 via-sky-50/50 to-blue-50 dark:from-cyan-950/40 dark:via-slate-900 dark:to-cyan-950/30 text-center space-y-2 shadow-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-100 text-cyan-800 dark:bg-cyan-900/60 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-700">
              <Sparkles className="w-3 h-3 text-cyan-600" /> A mérés alaptörvénye
            </span>
            <div className="text-base sm:text-lg font-mono font-bold text-slate-800 dark:text-slate-100">
              Mért mennyiség = Mérőszám × Mértékegység
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Ha <strong>kisebb</strong> mértékegységre váltunk, a mérőszám <strong>ugyanannyiszor nagyobb</strong> lesz (szorzunk).
              Ha <strong>nagyobb</strong> mértékegységre váltunk, a mérőszám <strong>ugyanannyiszor kisebb</strong> lesz (osztunk).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 shrink-0">
                <Ruler className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Hosszúság</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  Alapja a <strong>méter</strong> (m). További egységek: km, dm, cm, mm.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 shrink-0">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Tömeg</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  Alapja a <strong>kilogramm</strong> (kg) és <strong>gramm</strong> (g). Továbbiak: t, q, dkg, mg.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Idő</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  Nem tízes alapú! 60-as és 24-es váltószámok: nap, óra (h), perc (min), másodperc (s).
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'hosszusag',
      title: 'Hosszúság mértékegységei és váltószámai',
      badge: 'Hosszúság',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            A hosszúságmérésnél a szomszédos kisebb egységek közötti váltószám a decimétertől lefelé <strong>10</strong>,
            míg a kilométer és a méter között <strong>1000</strong>.
          </p>

          {/* SVG Ábra: Hosszúság átváltó lépcső */}
          <div className="p-4 rounded-2xl border border-cyan-200 dark:border-cyan-900 bg-gradient-to-b from-cyan-50/40 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-850">
            <div className="text-center mb-3">
              <span className="text-xs font-bold text-cyan-800 dark:text-cyan-300 uppercase tracking-wider">
                Hosszúság átváltási lépcső és irányok
              </span>
            </div>
            <div className="flex justify-center overflow-x-auto py-2">
              <svg viewBox="0 0 700 180" className="w-full max-w-[650px] h-auto drop-shadow-xs">
                {/* Dobozok */}
                <g className="font-bold text-xs">
                  {/* km */}
                  <rect x="20" y="65" width="85" height="50" rx="10" fill="#0284c7" />
                  <text x="62" y="95" fill="white" textAnchor="middle" fontSize="16" fontWeight="bold">km</text>

                  {/* m */}
                  <rect x="180" y="65" width="85" height="50" rx="10" fill="#0ea5e9" />
                  <text x="222" y="95" fill="white" textAnchor="middle" fontSize="16" fontWeight="bold">m</text>

                  {/* dm */}
                  <rect x="330" y="65" width="85" height="50" rx="10" fill="#38bdf8" />
                  <text x="372" y="95" fill="#0f172a" textAnchor="middle" fontSize="16" fontWeight="bold">dm</text>

                  {/* cm */}
                  <rect x="475" y="65" width="85" height="50" rx="10" fill="#7dd3fc" />
                  <text x="517" y="95" fill="#0f172a" textAnchor="middle" fontSize="16" fontWeight="bold">cm</text>

                  {/* mm */}
                  <rect x="610" y="65" width="75" height="50" rx="10" fill="#bae6fd" />
                  <text x="647" y="95" fill="#0f172a" textAnchor="middle" fontSize="16" fontWeight="bold">mm</text>
                </g>

                {/* Felső nyilak: Szorzás (jobbra, kisebb felé) */}
                <defs>
                  <marker id="arrowRight" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <polygon points="0 0, 8 4, 0 8" fill="#0369a1" />
                  </marker>
                  <marker id="arrowLeft" markerWidth="8" markerHeight="8" refX="2" refY="4" orient="auto">
                    <polygon points="8 0, 0 4, 8 8" fill="#dc2626" />
                  </marker>
                </defs>

                {/* km -> m (x1000) */}
                <path d="M 105 60 Q 142 30 175 60" fill="none" stroke="#0369a1" strokeWidth="2.5" markerEnd="url(#arrowRight)" />
                <text x="142" y="32" fill="#0369a1" fontSize="12" fontWeight="bold" textAnchor="middle">· 1000</text>

                {/* m -> dm (x10) */}
                <path d="M 265 60 Q 297 35 325 60" fill="none" stroke="#0369a1" strokeWidth="2.5" markerEnd="url(#arrowRight)" />
                <text x="297" y="38" fill="#0369a1" fontSize="12" fontWeight="bold" textAnchor="middle">· 10</text>

                {/* dm -> cm (x10) */}
                <path d="M 415 60 Q 445 35 470 60" fill="none" stroke="#0369a1" strokeWidth="2.5" markerEnd="url(#arrowRight)" />
                <text x="445" y="38" fill="#0369a1" fontSize="12" fontWeight="bold" textAnchor="middle">· 10</text>

                {/* cm -> mm (x10) */}
                <path d="M 560 60 Q 585 35 605 60" fill="none" stroke="#0369a1" strokeWidth="2.5" markerEnd="url(#arrowRight)" />
                <text x="585" y="38" fill="#0369a1" fontSize="12" fontWeight="bold" textAnchor="middle">· 10</text>

                {/* Alsó nyilak: Osztás (balra, nagyobb felé) */}
                {/* mm -> cm (/10) */}
                <path d="M 605 120 Q 585 145 565 120" fill="none" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#arrowLeft)" />
                <text x="585" y="155" fill="#dc2626" fontSize="12" fontWeight="bold" textAnchor="middle">: 10</text>

                {/* cm -> dm (/10) */}
                <path d="M 470 120 Q 445 145 420 120" fill="none" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#arrowLeft)" />
                <text x="445" y="155" fill="#dc2626" fontSize="12" fontWeight="bold" textAnchor="middle">: 10</text>

                {/* dm -> m (/10) */}
                <path d="M 325 120 Q 297 145 270 120" fill="none" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#arrowLeft)" />
                <text x="297" y="155" fill="#dc2626" fontSize="12" fontWeight="bold" textAnchor="middle">: 10</text>

                {/* m -> km (/1000) */}
                <path d="M 175 120 Q 142 155 110 120" fill="none" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#arrowLeft)" />
                <text x="142" y="160" fill="#dc2626" fontSize="12" fontWeight="bold" textAnchor="middle">: 1000</text>
              </svg>
            </div>
            <div className="flex justify-between items-center text-[11px] text-slate-500 dark:text-slate-400 px-3 pt-1">
              <span className="flex items-center gap-1 text-sky-700 dark:text-sky-400 font-semibold">
                → Kisebb egység felé: Szorzunk (jobbra)
              </span>
              <span className="flex items-center gap-1 text-rose-700 dark:text-rose-400 font-semibold">
                ← Nagyobb egység felé: Osztunk (balra)
              </span>
            </div>
          </div>

          {/* Tizedestörtes példák */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-xl border border-sky-200 dark:border-sky-900 bg-sky-50/60 dark:bg-sky-950/30">
              <h4 className="text-xs font-bold text-sky-900 dark:text-sky-200 flex items-center gap-1.5 mb-1.5">
                <Check className="w-4 h-4 text-sky-600" /> Kisebbre váltás (szorzás)
              </h4>
              <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1 font-mono">
                <li>2,4 m = 2,4 · 100 = 240 cm</li>
                <li>0,75 km = 0,75 · 1000 = 750 m</li>
                <li>5,8 cm = 5,8 · 10 = 58 mm</li>
              </ul>
            </div>

            <div className="p-3 rounded-xl border border-rose-200 dark:border-rose-900 bg-rose-50/60 dark:bg-rose-950/30">
              <h4 className="text-xs font-bold text-rose-900 dark:text-rose-200 flex items-center gap-1.5 mb-1.5">
                <Check className="w-4 h-4 text-rose-600" /> Nagyobbra váltás (osztás)
              </h4>
              <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1 font-mono">
                <li>450 m = 450 : 1000 = 0,45 km</li>
                <li>35 mm = 35 : 10 = 3,5 cm</li>
                <li>120 cm = 120 : 100 = 1,2 m</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'tomeg',
      title: 'Tömeg mértékegységei és a mázsa (q)',
      badge: 'Tömeg',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            A mindennapi életben a leggyakoribb tömegegység a <strong>kilogramm (kg)</strong> és a <strong>gramm (g)</strong>,
            a mezőgazdaságban és fuvarozásban pedig a <strong>mázsa (q)</strong> és a <strong>tonna (t)</strong>.
          </p>

          {/* SVG 1: Tömeg átváltási lépcső */}
          <MassConversionLadderSvg />

          {/* Váltószámok táblázata */}
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                <tr>
                  <th className="p-2.5">Egység neve</th>
                  <th className="p-2.5">Jele</th>
                  <th className="p-2.5">Átváltás kilogrammba / grammba</th>
                  <th className="p-2.5">Gyakorlati példa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-850">
                  <td className="p-2.5 font-bold">Tonna</td>
                  <td className="p-2.5 font-mono font-bold text-emerald-600">t</td>
                  <td className="p-2.5 font-mono font-bold text-slate-800 dark:text-slate-200">1 t = 10 q = 1000 kg</td>
                  <td className="p-2.5">Személyautó tömege (~1-1,5 t)</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-850">
                  <td className="p-2.5 font-bold">Mázsa</td>
                  <td className="p-2.5 font-mono font-bold text-emerald-600">q</td>
                  <td className="p-2.5 font-mono font-bold text-slate-800 dark:text-slate-200">1 q = 100 kg</td>
                  <td className="p-2.5">Két zsák cement vagy felnőtt vaddisznó</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-850">
                  <td className="p-2.5 font-bold">Kilogramm</td>
                  <td className="p-2.5 font-mono font-bold text-emerald-600">kg</td>
                  <td className="p-2.5 font-mono font-bold text-slate-800 dark:text-slate-200">1 kg = 100 dkg = 1000 g</td>
                  <td className="p-2.5">1 csomag kristálycukor vagy 1 liter víz</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-850">
                  <td className="p-2.5 font-bold">Dekagramm</td>
                  <td className="p-2.5 font-mono font-bold text-emerald-600">dkg</td>
                  <td className="p-2.5 font-mono font-bold text-slate-800 dark:text-slate-200">1 dkg = 10 g</td>
                  <td className="p-2.5">1 evőkanál vaj vagy felvágott kimérése</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-850">
                  <td className="p-2.5 font-bold">Gramm</td>
                  <td className="p-2.5 font-mono font-bold text-emerald-600">g</td>
                  <td className="p-2.5 font-mono font-bold text-slate-800 dark:text-slate-200">1 g = 1000 mg</td>
                  <td className="p-2.5">1 szem babszem vagy gemkapocs</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Gyakori hiba figyelmeztetés */}
          <div className="p-3.5 rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50/70 dark:bg-amber-950/30 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <h5 className="font-bold text-amber-900 dark:text-amber-200">Gyakori típushiba a dekagrammnál és grammnál!</h5>
              <p className="text-slate-700 dark:text-slate-300">
                Ne keverd össze: <strong>1 kg = 100 dkg</strong>, de <strong>1 kg = 1000 g</strong>!
                Így <strong>1 dkg = 10 g</strong>. Ezért 25 dkg = 250 g, és 0,5 kg = 50 dkg = 500 g.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'ido',
      title: 'Idő mértékegységei és vegyes számolások',
      badge: 'Idő',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            Az idő mértékegységei nem tízes rendszerűek! Az óra és perc, valamint a perc és másodperc között
            a váltószám <strong>60</strong> (babiloni eredetű 60-as rendszer), egy napban pedig <strong>24 óra</strong> van.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50/40 dark:bg-indigo-950/30 text-center">
              <span className="text-[10px] uppercase font-bold text-indigo-700 dark:text-indigo-300">Nap és Óra</span>
              <div className="text-base font-mono font-black text-slate-800 dark:text-slate-100 my-1">
                1 nap = 24 h
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                fél nap (1/2) = 12 h<br />
                negyed nap (1/4) = 6 h
              </p>
            </div>

            <div className="p-3 rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50/40 dark:bg-indigo-950/30 text-center">
              <span className="text-[10px] uppercase font-bold text-indigo-700 dark:text-indigo-300">Óra és Perc</span>
              <div className="text-base font-mono font-black text-slate-800 dark:text-slate-100 my-1">
                1 h = 60 min
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                fél óra (1/2 h) = 30 min<br />
                negyed óra (1/4 h) = 15 min
              </p>
            </div>

            <div className="p-3 rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50/40 dark:bg-indigo-950/30 text-center">
              <span className="text-[10px] uppercase font-bold text-indigo-700 dark:text-indigo-300">Óra és Másodperc</span>
              <div className="text-base font-mono font-black text-slate-800 dark:text-slate-100 my-1">
                1 h = 3600 s
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                1 min = 60 s<br />
                60 · 60 = 3600 s
              </p>
            </div>
          </div>

          {/* SVG 2: Idő átváltási lánc és analóg tizedes óra */}
          <TimeConversionClockSvg />

          {/* Tizedestört vagy óra-perc? */}
          <div className="p-4 rounded-xl border-2 border-rose-300 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/30 space-y-2">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              <h5 className="font-bold text-xs uppercase tracking-wide text-rose-900 dark:text-rose-200">
                Figyelem: A tizedes óra NEM óra és perc!
              </h5>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Nagyon vigyázz a tizedes formájú időtartamokkal!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2 bg-white/80 dark:bg-slate-900 rounded-lg border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-400">
                ❌ <strong>Tévhit:</strong> 1,5 óra ≠ 1 óra 50 perc!
              </div>
              <div className="p-2 bg-white/80 dark:bg-slate-900 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-bold">
                ✓ <strong>Helyes:</strong> 1,5 óra = 1 óra + 0,5 · 60 perc = 90 perc
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'interaktiv-kalkulator',
      title: 'Interaktív mértékegység-vizsgáló műhely',
      badge: 'Interaktív Műhely',
      content: (
        <div className="space-y-4">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Válaszd ki a mennyiséget, mozgasd a csúszkát, és figyeld meg, hogyan változik egyszerre a mérőszám az összes rokon mértékegységben!
          </p>

          {/* Fülválasztó */}
          <div className="flex gap-2">
            <Button
              variant={activeTab === 'length' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('length')}
              className="gap-1.5 text-xs h-8"
            >
              <Ruler className="w-3.5 h-3.5" /> Hosszúság (m)
            </Button>
            <Button
              variant={activeTab === 'mass' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('mass')}
              className="gap-1.5 text-xs h-8"
            >
              <Scale className="w-3.5 h-3.5" /> Tömeg (kg)
            </Button>
            <Button
              variant={activeTab === 'time' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('time')}
              className="gap-1.5 text-xs h-8"
            >
              <Clock className="w-3.5 h-3.5" /> Idő (h)
            </Button>
          </div>

          {/* Kalkulátor panel */}
          <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
            {activeTab === 'length' && (
              <>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-700 dark:text-slate-300">Alapérték méterben (m):</span>
                    <span className="font-mono text-cyan-600 font-bold text-sm">{lengthMeters.toFixed(2)} m</span>
                  </div>
                  <Slider
                    value={[lengthMeters]}
                    min={0.1}
                    max={10}
                    step={0.1}
                    onValueChange={(val) => setLengthMeters(val[0])}
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Kilométer (km)</span>
                    <div className="font-mono font-bold text-xs sm:text-sm text-cyan-700 dark:text-cyan-300">
                      {(lengthMeters / 1000).toFixed(4)} km
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Deciméter (dm)</span>
                    <div className="font-mono font-bold text-xs sm:text-sm text-cyan-700 dark:text-cyan-300">
                      {(lengthMeters * 10).toFixed(1)} dm
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Centiméter (cm)</span>
                    <div className="font-mono font-bold text-xs sm:text-sm text-cyan-700 dark:text-cyan-300">
                      {(lengthMeters * 100).toFixed(0)} cm
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Milliméter (mm)</span>
                    <div className="font-mono font-bold text-xs sm:text-sm text-cyan-700 dark:text-cyan-300">
                      {(lengthMeters * 1000).toFixed(0)} mm
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'mass' && (
              <>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-700 dark:text-slate-300">Alapérték kilogrammban (kg):</span>
                    <span className="font-mono text-emerald-600 font-bold text-sm">{massKg.toFixed(2)} kg</span>
                  </div>
                  <Slider
                    value={[massKg]}
                    min={0.1}
                    max={10}
                    step={0.1}
                    onValueChange={(val) => setMassKg(val[0])}
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Tonna (t)</span>
                    <div className="font-mono font-bold text-xs sm:text-sm text-emerald-700 dark:text-emerald-300">
                      {(massKg / 1000).toFixed(4)} t
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Mázsa (q)</span>
                    <div className="font-mono font-bold text-xs sm:text-sm text-emerald-700 dark:text-emerald-300">
                      {(massKg / 100).toFixed(3)} q
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Dekagramm (dkg)</span>
                    <div className="font-mono font-bold text-xs sm:text-sm text-emerald-700 dark:text-emerald-300">
                      {(massKg * 100).toFixed(0)} dkg
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Gramm (g)</span>
                    <div className="font-mono font-bold text-xs sm:text-sm text-emerald-700 dark:text-emerald-300">
                      {(massKg * 1000).toFixed(0)} g
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'time' && (
              <>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-700 dark:text-slate-300">Alapérték órában (h):</span>
                    <span className="font-mono text-amber-600 font-bold text-sm">{timeHours.toFixed(2)} h ({Math.floor(timeHours)} h {Math.round((timeHours % 1) * 60)} min)</span>
                  </div>
                  <Slider
                    value={[timeHours]}
                    min={0.25}
                    max={6}
                    step={0.25}
                    onValueChange={(val) => setTimeHours(val[0])}
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Nap része</span>
                    <div className="font-mono font-bold text-xs sm:text-sm text-amber-700 dark:text-amber-300">
                      {(timeHours / 24).toFixed(3)} nap
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Perc (min)</span>
                    <div className="font-mono font-bold text-xs sm:text-sm text-amber-700 dark:text-amber-300">
                      {Math.round(timeHours * 60)} min
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Másodperc (s)</span>
                    <div className="font-mono font-bold text-xs sm:text-sm text-amber-700 dark:text-amber-300">
                      {Math.round(timeHours * 3600)} s
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      title="Hosszúság, tömeg, idő"
      subtitle="Mértékegységrendszer, váltószámok, prefixumok és tizedestörtes átváltások a gyakorlatban"
      badge="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT • 📖 TANANYAG"
      themeColor="cyan"
      ruleTitle="Alapvető Váltószámok"
      ruleFormula="1 km = 1000 m | 1 m = 10 dm = 100 cm = 1000 mm | 1 t = 1000 kg | 1 h = 60 min = 3600 s"
      quickRule={{
        label: 'Alapvető Váltószámok',
        formula: '1 km = 1000 m | 1 t = 1000 kg = 10 q | 1 h = 60 min = 3600 s'
      }}
      sections={sections}
      onBack={onBack}
      onStartPractice={onStartQuiz}
      practiceButtonText="Gyakorló Kvíz indítása"
    />
  );
};
export default LengthMassTimeTheory;
