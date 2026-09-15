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
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  Calculator,
  Info,
  Layers,
  ArrowRightLeft,
  Plus,
  Minus,
  Binary,
  Hash,
  Scale,
  Award,
  BookOpen,
  Target,
  Trophy,
  AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Chapter1SummaryTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export function Chapter1SummaryTheory({
  onBack,
  onStartQuiz
}: Chapter1SummaryTheoryProps) {
  // Interactive Hub Active Tab
  const [activeTab, setActiveTab] = useState<'roman' | 'placeValue' | 'rounding' | 'integers'>('roman');

  // Simulator States
  // 1. Roman Simulator
  const [romanInput, setRomanInput] = useState<number>(2026);
  // 2. Place Value Simulator
  const [pvInput, setPvInput] = useState<number>(47825);
  // 3. Rounding Simulator
  const [roundInput, setRoundInput] = useState<number>(6847);
  const [roundUnit, setRoundUnit] = useState<10 | 100 | 1000>(100);
  // 4. Integer Simulator
  const [intA, setIntA] = useState<number>(-4);
  const [intOp, setIntOp] = useState<'+' | '-'>('-');
  const [intB, setIntB] = useState<number>(-7);

  // Helper for Roman Numerals
  const toRoman = (num: number): string => {
    if (num < 1 || num > 3999) return '1 és 3999 közötti számot adj meg';
    const val = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const syms = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
    let roman = '';
    let n = num;
    for (let i = 0; i < val.length; i++) {
      while (n >= val[i]) {
        roman += syms[i];
        n -= val[i];
      }
    }
    return roman;
  };

  // Helper for Rounding
  const roundNumber = (val: number, unit: number): number => {
    return Math.round(val / unit) * unit;
  };

  // Helper for Integer Operation
  const intResult = intOp === '+' ? intA + intB : intA - intB;

  return (
    <TheoryTemplate
      title="Az egész számok – Átfogó Tudástár"
      subtitle="Az 5. osztályos matematika I. fejezetének (1–15. altéma) teljes elméleti és gyakorlati rendszerezése a római számoktól az egész számok műveleteiig"
      documentId="chapter1-summary-theory-content"
      pdfFilename="5_osztaly_I_fejezet_egesz_szamok_osszefoglalas_tananyag.pdf"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      themeColor="amber"
      badgeText="🏆 5. Osztály • I. Nagy Témazáró Összefoglalás"
      quickRule={{
        label: "Fő összefüggések",
        formula: "Valódi = Alaki · Helyi | a - (-b) = a + b | () → ·,: → +,-"
      }}
      practiceTitle="Készen állsz az I. Fejezet nagy témazáró tesztjére?"
      practiceSubtitle="Tedd próbára tudásod a 3 szintű kvízben, a 8 páros memóriakártyás játékban vagy a csoportosítóban!"
    >
      {/* 1. SZAKASZ: RÓMAI SZÁMOK ÉS HELYIÉRTÉK */}
      <TheorySection
        number={1}
        title="A számok világa és írásmódjai (1–5. Témakör)"
        icon={<Hash className="w-5 h-5 text-amber-600" />}
        badgeColor="amber"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Római számok alapszabályai" icon={<Sparkles className="w-4 h-4 text-amber-600" />} variant="amber">
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc list-inside">
              <li><strong>Alapjelek:</strong> <code className="font-mono font-bold">I=1, V=5, X=10, L=50, C=100, D=500, M=1000</code>.</li>
              <li><strong>Ismétlési szabály:</strong> Legfeljebb 3-szor ismétlődhet: <code className="font-mono font-bold">I, X, C, M</code>.</li>
              <li><strong>Nem ismételhető:</strong> A <code className="font-mono font-bold">V, L, D</code> sosem állhat kétszer egymás után.</li>
              <li><strong>Összeadás:</strong> Kisebb szám a nagyobb jobb oldalán: pl. <code className="font-mono">VIII = 5 + 3 = 8</code>, <code className="font-mono">LX = 50 + 10 = 60</code>.</li>
              <li><strong>Kivonás:</strong> Csak 1 db kisebb a nagyobb bal oldalán: <code className="font-mono">IV=4, IX=9, XL=40, XC=90, CD=400, CM=900</code>.</li>
            </ul>
          </TheoryCard>

          <TheoryCard title="Helyiértékes írás és helyesírás" icon={<BookOpen className="w-4 h-4 text-blue-600" />} variant="blue">
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc list-inside">
              <li><strong>3 féle érték:</strong> Alaki (számjegy), Helyi (egyes, tízes, százas...), Valódi (Alaki × Helyi).</li>
              <li><strong>Hármas tagolás:</strong> Hátulról hármas csoportokba (osztályokba) tagoljuk szóközzel (pl. 45 820).</li>
              <li><strong>Kétezres szabály:</strong> $2000$-ig minden számnevet egybeírunk (pl. <em>ezerkilencszázkilencvenkilenc</em>). $2000$ felett az osztályok közé kötőjelet teszünk (pl. <em>kétmillió-háromszázezer-ötszáz</em>). A kerek ezresek (<em>kétezer</em>, <em>háromezer</em>) egybeíródnak!</li>
              <li><strong>Számrendszerek:</strong> Tízes (alap 10), Kettes (alap 2, jegyek: 0, 1; helyiértékek: 1, 2, 4, 8, 16, 32...).</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. SZAKASZ: SZÁMEGYES ÉS KEREKÍTÉS */}
      <TheorySection
        number={2}
        title="Számegyenes, viszonyok és kerekítés (6–7. Témakör)"
        icon={<Scale className="w-5 h-5 text-emerald-600" />}
        badgeColor="emerald"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <TheoryCard title="Szomszédok" variant="emerald">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              <strong>Egyes szomszédok:</strong> <code className="font-mono">n - 1</code> és <code className="font-mono">n + 1</code>.<br />
              <strong>Tízes szomszédok:</strong> a legközelebbi alsó és felső kerek 10-es (pl. 473 szomszédai: 470 és 480).
            </p>
          </TheoryCard>

          <TheoryCard title="Kerekítési szabály" variant="emerald">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Mindig a <strong>kerekítendő helyiértéktől közvetlenül jobbra</strong> álló jegyet nézzük!<br />
              <span className="font-bold text-slate-900 dark:text-white">0, 1, 2, 3, 4</span> → Lefelé kerekítünk.<br />
              <span className="font-bold text-emerald-600 dark:text-emerald-400">5, 6, 7, 8, 9</span> → Felfelé kerekítünk.
            </p>
          </TheoryCard>

          <TheoryCard title="Becslés műveleteknél" variant="emerald">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Összeadás, kivonás, szorzás előtt kerekített értékekkel számolunk, hogy megbecsüljük az eredmény nagyságrendjét és azonnal észrevegyük az elszámolásokat.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. SZAKASZ: ALAPMŰVELETEK ÉS MŰVELETI SORREND */}
      <TheorySection
        number={3}
        title="Négy alapművelet és műveleti sorrend (8–12. Témakör)"
        icon={<Calculator className="w-5 h-5 text-indigo-600" />}
        badgeColor="indigo"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Írásbeli műveletek szabályai" icon={<Info className="w-4 h-4 text-indigo-600" />} variant="indigo">
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc list-inside">
              <li><strong>Összeadás & Kivonás:</strong> Helyiértékeket pontosan egymás alá írjuk (egyes alá egyes). Átlépésnél átvitelt jegyzünk fel.</li>
              <li><strong>Írásbeli Szorzás:</strong> A szorzandót a szorzó minden egyes jegyével megszorozzuk, a részletszorzatokat a megfelelő helyiértékkel elcsúsztatva írjuk egymás alá, majd összeadjuk.</li>
              <li><strong>Írásbeli Osztás:</strong> Balról jobbra haladunk. Kétjegyű osztónál becsléssel határozzuk meg a hányados jegyét. Ellenőrzés: <code className="font-mono font-bold">Osztó × Hányados + Maradék = Osztandó</code> ($Maradék &lt; Osztó$).</li>
            </ul>
          </TheoryCard>

          <TheoryCard title="Műveleti hierarchia piramis" icon={<Layers className="w-4 h-4 text-indigo-600" />} variant="indigo">
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg border border-indigo-200/80 dark:border-indigo-800/40 font-semibold text-indigo-900 dark:text-indigo-200">
                1. Zárójelek: legbelső kerek ( ), majd szögletes [ ], majd kapcsos &#123; &#125;
              </div>
              <div className="p-2 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200/80 dark:border-blue-800/40 font-semibold text-blue-900 dark:text-blue-200">
                2. Szorzás (·) és Osztás (:) balról jobbra
              </div>
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-200">
                3. Összeadás (+) és Kivonás (-) balról jobbra
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. SZAKASZ: EGÉSZ SZÁMOK ÉS ELŐJELES MŰVELETEK */}
      <TheorySection
        number={4}
        title="Az egész számok és előjeles műveletek (13–15. Témakör)"
        icon={<Plus className="w-5 h-5 text-purple-600" />}
        badgeColor="purple"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <TheoryCard title="Negatív számok" variant="cyan">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              0-tól balra helyezkednek el a számegyenesen. Két negatív szám közül az a <strong>nagyobb</strong>, amelyik közelebb van a 0-hoz (pl. <code className="font-mono font-bold">-2 &gt; -8</code>). A 0 nem pozitív és nem negatív!
            </p>
          </TheoryCard>

          <TheoryCard title="Ellentett & Abszolút érték" variant="amber">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              <strong>Ellentett:</strong> 0-ra vett tükörkép (pl. +5 ellentettje -5, 0 ellentettje 0).<br />
              <strong>Abszolút érték ($|a|$):</strong> a számnak a 0-tól mért távolsága, soha nem negatív ($|-7| = 7$, $|+4| = 4$, $|0| = 0$).
            </p>
          </TheoryCard>

          <TheoryCard title="Előjeles összeadás & kivonás" variant="purple">
            <p className="text-xs text-slate-600 dark:text-slate-300 font-mono">
              + (+b) → +b (jobbra)<br />
              + (-b) → -b (balra)<br />
              - (+b) → -b (balra)<br />
              <strong className="text-purple-700 dark:text-purple-300">- (-b) → +b (két mínusz = plusz, jobbra!)</strong>
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. SZAKASZ: INTERAKTÍV TÉMAKÖR SZIMULÁTOROK */}
      <TheorySection
        number={5}
        title="Interaktív Fejezet Szimulátor & Tesztelő"
        icon={<Sparkles className="w-5 h-5 text-amber-600" />}
        badgeColor="amber"
        className="no-pdf"
      >
        <div className="space-y-4 no-pdf">
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 flex-wrap">
            <button
              onClick={() => setActiveTab('roman')}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                activeTab === 'roman'
                  ? "bg-white dark:bg-slate-700 text-amber-700 dark:text-amber-300 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              🏛️ Római számok
            </button>
            <button
              onClick={() => setActiveTab('placeValue')}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                activeTab === 'placeValue'
                  ? "bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-300 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              🔢 Helyiérték & Tagolás
            </button>
            <button
              onClick={() => setActiveTab('rounding')}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                activeTab === 'rounding'
                  ? "bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              📐 Kerekítés Labor
            </button>
            <button
              onClick={() => setActiveTab('integers')}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                activeTab === 'integers'
                  ? "bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              ➕➖ Egész számok Műveletei
            </button>
          </div>

          {/* Tab 1: Roman Numerals */}
          {activeTab === 'roman' && (
            <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/40 space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                    Írj be egy arab számot (1–3999):
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={3999}
                    value={romanInput}
                    onChange={(e) => setRomanInput(Math.min(3999, Math.max(1, parseInt(e.target.value, 10) || 1)))}
                    className="w-32 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white"
                  />
                </div>

                <div className="flex-1 min-w-[200px] p-3 rounded-xl bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-800/60 flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Római számmal:</span>
                  <span className="text-lg sm:text-xl font-black font-mono tracking-widest text-amber-600 dark:text-amber-400">
                    {toRoman(romanInput)}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className="text-slate-500 self-center">Gyors példák:</span>
                {[4, 9, 44, 99, 444, 999, 1999, 2026].map((num) => (
                  <button
                    key={num}
                    onClick={() => setRomanInput(num)}
                    className="px-2.5 py-1 rounded-lg bg-amber-100/70 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 font-mono font-bold hover:bg-amber-200 dark:hover:bg-amber-900/70 transition-colors"
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Place Value */}
          {activeTab === 'placeValue' && (
            <div className="p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-800/40 space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                  Szám megadása elemzéshez:
                </label>
                <input
                  type="number"
                  value={pvInput}
                  onChange={(e) => setPvInput(parseInt(e.target.value, 10) || 0)}
                  className="w-48 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-blue-200 dark:border-blue-800/50 text-center">
                  <span className="text-[10px] uppercase text-slate-500 font-bold block">Tagolt alak</span>
                  <span className="text-sm font-mono font-bold text-blue-700 dark:text-blue-300">
                    {pvInput.toLocaleString('hu-HU')}
                  </span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-blue-200 dark:border-blue-800/50 text-center">
                  <span className="text-[10px] uppercase text-slate-500 font-bold block">Helyesírás</span>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {pvInput <= 2000 ? 'Egybeírandó (≤ 2000)' : 'Kötőjeles (> 2000)'}
                  </span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-blue-200 dark:border-blue-800/50 text-center">
                  <span className="text-[10px] uppercase text-slate-500 font-bold block">Kettes rendszerben</span>
                  <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 truncate block">
                    {pvInput > 0 && pvInput < 100000 ? pvInput.toString(2) + '₂' : '—'}
                  </span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-blue-200 dark:border-blue-800/50 text-center">
                  <span className="text-[10px] uppercase text-slate-500 font-bold block">Helyiérték összeg</span>
                  <span className="text-xs font-mono text-slate-600 dark:text-slate-300 truncate block">
                    {String(Math.abs(pvInput)).split('').map((d, i, arr) => `${d}·10^${arr.length - 1 - i}`).join('+')}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Rounding */}
          {activeTab === 'rounding' && (
            <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/40 space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                    Kerekítendő szám:
                  </label>
                  <input
                    type="number"
                    value={roundInput}
                    onChange={(e) => setRoundInput(parseInt(e.target.value, 10) || 0)}
                    className="w-36 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                    Kerekítési pontosság:
                  </label>
                  <div className="flex gap-1.5">
                    {([10, 100, 1000] as (10 | 100 | 1000)[]).map((u) => (
                      <button
                        key={u}
                        onClick={() => setRoundUnit(u)}
                        className={cn(
                          "px-3 py-1.5 rounded-xl text-xs font-bold transition-all border",
                          roundUnit === u
                            ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                        )}
                      >
                        {u === 10 ? 'Tízesre' : u === 100 ? 'Százasra' : 'Ezresre'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 min-w-[200px] p-3 rounded-xl bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Kerekített érték:</span>
                  <span className="text-lg sm:text-xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                    ≈ {roundNumber(roundInput, roundUnit).toLocaleString('hu-HU')}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Integers */}
          {activeTab === 'integers' && (
            <div className="p-5 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/80 dark:border-purple-800/40 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <div>
                  <span className="text-xs text-slate-500 block mb-1">Első szám (a):</span>
                  <input
                    type="number"
                    value={intA}
                    onChange={(e) => setIntA(parseInt(e.target.value, 10) || 0)}
                    className="w-24 px-2.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold font-mono text-center"
                  />
                </div>

                <div className="flex gap-1 pt-4">
                  <button
                    onClick={() => setIntOp('+')}
                    className={cn(
                      "w-9 h-9 rounded-xl font-bold font-mono text-base border transition-all",
                      intOp === '+'
                        ? "bg-purple-600 text-white border-purple-600 shadow-xs"
                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700"
                    )}
                  >
                    +
                  </button>
                  <button
                    onClick={() => setIntOp('-')}
                    className={cn(
                      "w-9 h-9 rounded-xl font-bold font-mono text-base border transition-all",
                      intOp === '-'
                        ? "bg-purple-600 text-white border-purple-600 shadow-xs"
                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700"
                    )}
                  >
                    -
                  </button>
                </div>

                <div>
                  <span className="text-xs text-slate-500 block mb-1">Második szám (b):</span>
                  <input
                    type="number"
                    value={intB}
                    onChange={(e) => setIntB(parseInt(e.target.value, 10) || 0)}
                    className="w-24 px-2.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold font-mono text-center"
                  />
                </div>

                <div className="flex-1 min-w-[200px] p-3 rounded-xl bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-800/60 flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Kifejezés és eredmény:</span>
                  <span className="text-base sm:text-lg font-black font-mono text-purple-700 dark:text-purple-300">
                    ({intA}) {intOp} ({intB}) = <span className="underline decoration-purple-500 font-bold">{intResult}</span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </TheorySection>

      {/* 6. SZAKASZ: TIPIKUS TÉVHITEK ÉS CSAPDÁK */}
      <TheorySection
        number={6}
        title="Top 6 Tipikus Hiba a Témazáróban (Kerüld el!)"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600" />}
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <TheoryTrapBox
            title="1. Római kivonás túlzásba vitele"
            wrong="99 = IC"
            correct="99 = XCIX (90 + 9)"
            explanation="Csak közvetlen előtti nagyságrendből vonhatunk ki (I-t csak V-ből és X-ből)!"
          />
          <TheoryTrapBox
            title="2. Műveleti sorrend figyelmen kívül hagyása"
            wrong="10 + 5 · 2 = 30"
            correct="10 + 5 · 2 = 20"
            explanation="A szorzást és osztást mindig el kell végezni az összeadás és kivonás előtt!"
          />
          <TheoryTrapBox
            title="3. Két mínusz találkozása kivonásnál"
            wrong="-8 - (-3) = -11"
            correct="-8 - (-3) = -8 + 3 = -5"
            explanation="A kivonás műveleti jele és a negatív előjel együtt pluszra vált!"
          />
          <TheoryTrapBox
            title="4. Negatív számok nagyságrendje"
            wrong="-15 > -3"
            correct="-15 < -3"
            explanation="Két negatív szám közül az a nagyobb, amelyik közelebb van a nullához a számegyenesen!"
          />
          <TheoryTrapBox
            title="5. Osztási maradék vizsgálata"
            wrong="Maradék ≥ Osztó"
            correct="Maradék < Osztó"
            explanation="A maradék mindig szigorúan kisebb kell legyen az osztónál, különben a hányados túl kicsi lett."
          />
          <TheoryTrapBox
            title="6. Abszolút érték előjele"
            wrong="|-9| = -9"
            correct="|-9| = +9"
            explanation="Az abszolút érték a nullától mért távolság, ezért soha sem lehet negatív!"
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
}

export default Chapter1SummaryTheory;
