import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  Calculator,
  Compass,
  ArrowRightLeft,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  BookOpen,
  Sparkles,
  Layers,
  Repeat
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RemainderCalculationTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

const DAYS_OF_WEEK = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap'];

export function RemainderCalculationTheory({ onBack, onStartQuiz }: RemainderCalculationTheoryProps) {
  // Interactive Lab State:
  const [dividend, setDividend] = useState<number>(29);
  const [divisor, setDivisor] = useState<number>(6);

  // Calendar Simulator State:
  const [startDayIndex, setStartDayIndex] = useState<number>(0); // 0 = Hétfő
  const [daysLater, setDaysLater] = useState<number>(100);

  // Calculations:
  const quotient = Math.floor(dividend / divisor);
  const remainder = dividend % divisor;

  const targetDayIndex = (startDayIndex + daysLater) % 7;
  const calendarRemainder = daysLater % 7;
  const fullWeeks = Math.floor(daysLater / 7);

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      topicBadge="⏳ 6. Osztály • I. Egész számok"
      title="Számolás maradékokkal"
      subtitle="A maradékos osztás alaptétele, a lehetséges maradékok és periodikus alkalmazások"
      ruleTitle="A maradékos osztás alaptétele"
      ruleFormula="a = b · q + r (ahol 0 ≤ r < b)"
      themeColor="teal"
      pdfElementId="remainder-calculation-theory-content"
      pdfFilename="Szamolas_Maradekokkal_Tananyag"
    >
      {/* 1. Szekció: A maradékos osztás alaptétele */}
      <TheorySection
        number={1}
        title="A maradékos osztás fogalma és alaptétele"
        icon={<Calculator className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        badgeColor="teal"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="A maradékos osztás képlete" icon={<BookOpen className="w-4 h-4 text-teal-500" />}>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              Ha egy <code className="font-bold">a</code> természetes számot elosztunk egy <code className="font-bold">b &gt; 0</code> természetes számmal, mindig létezik egyértelműen egy <code className="font-bold">q</code> hányados és egy <code className="font-bold">r</code> maradék:
            </p>
            <div className="p-3 rounded-xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900 font-mono text-xs space-y-1">
              <div className="text-teal-900 dark:text-teal-200 font-bold text-center text-sm sm:text-base">
                a = b · q + r
              </div>
              <div className="text-slate-600 dark:text-slate-400 text-center">
                (osztandó = osztó · hányados + maradék)
              </div>
            </div>
          </TheoryCard>

          <TheoryCard title="A legfontosabb feltétel a maradékra!" icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />}>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              A maradék <strong>soha nem lehet negatív</strong>, és <strong>mindig szigorúan kisebbnek kell lennie az osztónál</strong>:
            </p>
            <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900 font-mono text-xs space-y-1 text-center">
              <div className="text-emerald-800 dark:text-emerald-300 font-black text-sm sm:text-base">
                0 ≤ r &lt; b
              </div>
              <div className="text-slate-600 dark:text-slate-400 text-[11px]">
                Ha $r = 0$, akkor a szám maradék nélkül osztható $b$-vel ($b \mid a$).
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. Szekció: Lehetséges maradékok és maradékosztályok */}
      <TheorySection
        number={2}
        title="Hányféle maradék keletkezhet? (Maradékosztályok)"
        icon={<Layers className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        badgeColor="teal"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Az osztó meghatározza a lehetőségeket" icon={<Lightbulb className="w-4 h-4 text-amber-500" />}>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              Ha egy számmal, <code className="font-bold">b</code>-vel osztunk, akkor <strong>pontosan b darab különböző maradék</strong> lehetséges: <code className="font-bold">0, 1, 2, ..., b - 1</code>.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <li>• <strong>2-vel osztva:</strong> 2-féle maradék lehet $\to$ <code>0</code> (páros), <code>1</code> (páratlan).</li>
              <li>• <strong>3-mal osztva:</strong> 3-féle maradék lehet $\to$ <code>0, 1, 2</code>.</li>
              <li>• <strong>5-tel osztva:</strong> 5-féle maradék lehet $\to$ <code>0, 1, 2, 3, 4</code>.</li>
              <li>• <strong>7-tel osztva:</strong> 7-féle maradék lehet $\to$ <code>0, 1, 2, 3, 4, 5, 6</code>.</li>
            </ul>
          </TheoryCard>

          <TheoryTrapBox title="Tipikus hiba: Túl nagy vagy negatív maradék">
            <div className="space-y-2 text-xs sm:text-sm">
              <p className="leading-relaxed">
                Például: <code className="font-bold">38 : 7 = 4, maradék 10</code> $\to$ <strong>HIBÁS!</strong>
              </p>
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs space-y-1">
                <div className="text-rose-600 font-bold">Miért hiba?</div>
                <div className="text-slate-600 dark:text-slate-300">
                  Mert a 10-ből még egyszer kijön a 7 ($10 = 1 \cdot 7 + 3$). A helyes eredmény:
                </div>
                <div className="text-emerald-600 font-bold pt-1">
                  38 : 7 = 5, maradék 3 (mert 38 = 7 · 5 + 3, és 3 &lt; 7).
                </div>
              </div>
            </div>
          </TheoryTrapBox>
        </div>

        <TheoryCallout type="tip" title="Mi történik, ha az osztandó kisebb az osztónál?">
          <p className="text-xs sm:text-sm leading-relaxed">
            Ha $a &lt; b$ (például $3 : 8$), akkor a hányados mindig <strong>0</strong>, a maradék pedig maga az osztandó, azaz <strong>3</strong>!
            <br />
            Ellenőrzés: $3 = 8 \cdot 0 + 3$ (helyes, mert $0 \le 3 &lt; 8$).
          </p>
        </TheoryCallout>
      </TheorySection>

      {/* 3. Szekció: Gyakorlati alkalmazások: Naptár és Ciklikus jelenségek */}
      <TheorySection
        number={3}
        title="Gyakorlati alkalmazások: Naptár- és Időszámítás"
        icon={<Calendar className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        badgeColor="teal"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="A hét napjai (7-es periodicitás)" icon={<Repeat className="w-4 h-4 text-indigo-500" />}>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              Mivel a hét 7 napból áll, 7 nappal (14, 21, 28, ... nappal) később pontosan ugyanaz a nap lesz.
            </p>
            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900 text-xs space-y-1">
              <div className="font-bold text-indigo-900 dark:text-indigo-200">Kérdés: Ha ma Kedd van, milyen nap lesz 100 nap múlva?</div>
              <div className="text-slate-600 dark:text-slate-300 font-mono">100 : 7 = 14 hét (maradék 2 nap)</div>
              <div className="text-indigo-700 dark:text-indigo-300 font-bold pt-1">
                Kedd + 2 nap $\to$ <strong>Csütörtök</strong> lesz!
              </div>
            </div>
          </TheoryCard>

          <TheoryCard title="Az óra számlapja (12-es / 24-es ciklus)" icon={<Clock className="w-4 h-4 text-cyan-500" />}>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              Az időmérésnél 12 vagy 24 óra elteltével a mutató körbeér:
            </p>
            <div className="p-3 rounded-xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-100 dark:border-cyan-900 text-xs space-y-1">
              <div className="font-bold text-cyan-900 dark:text-cyan-200">Kérdés: Most 9 óra van. Hány órát mutat a számlap 50 óra múlva?</div>
              <div className="text-slate-600 dark:text-slate-300 font-mono">50 : 12 = 4 kör (maradék 2 óra)</div>
              <div className="text-cyan-700 dark:text-cyan-300 font-bold pt-1">
                9 óra + 2 óra $\to$ <strong>11 óra</strong> lesz!
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Szekció: Interaktív Laboratórium */}
      <TheorySection
        number={4}
        title="Interaktív Maradék- és Naptárszámoló Laboratórium"
        icon={<Compass className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        badgeColor="teal"
      >
        {/* Lab 1: Általános maradékos osztás */}
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-teal-500/10 via-emerald-500/5 to-cyan-500/10 border-2 border-teal-200/60 dark:border-teal-800/40 mb-6">
          <div className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300 mb-4 flex items-center gap-1.5">
            <Calculator className="w-4 h-4" />
            <span>1. Maradékos osztás generátor és levezetés</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Controls */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Osztandó (a):</span>
                  <span className="text-sm font-mono font-black px-2.5 py-0.5 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-200">
                    {dividend}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={dividend}
                  onChange={(e) => setDividend(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Osztó (b):</span>
                  <span className="text-sm font-mono font-black px-2.5 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200">
                    {divisor}
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="12"
                  value={divisor}
                  onChange={(e) => setDivisor(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>
            </div>

            {/* Visualizer Display */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
              <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 font-bold">
                Levezetés & Ellenőrzés
              </div>
              <div className="text-lg sm:text-xl font-mono font-black text-slate-900 dark:text-slate-100 my-2">
                <span>{dividend} : {divisor} = </span>
                <span className="text-teal-600 dark:text-teal-400">{quotient}</span>
                <span className="text-slate-400"> (maradék: </span>
                <span className="text-amber-600 dark:text-amber-400 underline font-black">{remainder}</span>
                <span className="text-slate-400">)</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 font-mono text-xs text-slate-700 dark:text-slate-300 mt-3 border border-slate-200/60 dark:border-slate-700">
                {dividend} = {divisor} · {quotient} + {remainder}
              </div>
              <div className="text-[11px] text-slate-400 mt-2">
                Feltétel: 0 ≤ {remainder} &lt; {divisor} ({remainder < divisor ? '✓ Teljesül' : '✗ Nem teljesül'})
              </div>
            </div>
          </div>
        </div>

        {/* Lab 2: Naptár szimulátor */}
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-teal-500/10 border-2 border-indigo-200/60 dark:border-indigo-800/40">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 mb-4 flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>2. Naptár kalkulátor (7-es maradékrendszer)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Controls */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-2">Kezdő nap:</span>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-1">
                  {DAYS_OF_WEEK.map((day, idx) => (
                    <Button
                      key={day}
                      size="sm"
                      variant={startDayIndex === idx ? 'default' : 'outline'}
                      className="text-[11px] px-1 py-1 h-7"
                      onClick={() => setStartDayIndex(idx)}
                    >
                      {day.slice(0, 2)}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Eltelt napok száma:</span>
                  <span className="text-sm font-mono font-black px-2.5 py-0.5 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-200">
                    +{daysLater} nap
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="365"
                  value={daysLater}
                  onChange={(e) => setDaysLater(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
            </div>

            {/* Output Display */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-sm space-y-2">
              <div className="text-xs text-slate-400 uppercase font-bold">Kiszámított eredmény</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">
                Ha ma <strong>{DAYS_OF_WEEK[startDayIndex]}</strong> van, akkor <strong>{daysLater} nap</strong> múlva:
              </div>
              <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 py-1">
                🎉 {DAYS_OF_WEEK[targetDayIndex]}
              </div>
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                {daysLater} : 7 = {fullWeeks} hét + <span className="text-indigo-600 font-bold">{calendarRemainder} nap maradék</span>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* Összefoglaló táblázat */}
      <TheoryTable
        title="Maradékos osztás és periodikus minták összefoglalása"
        headers={['Osztó (b)', 'Lehetséges maradékok száma', 'Lehetséges maradékok halmaza', 'Gyakorlati jelentés / Példa']}
        rows={[
          ['2', '2 db', '{0, 1}', 'Páros számok (r = 0) vs. Páratlan számok (r = 1)'],
          ['3', '3 db', '{0, 1, 2}', 'Számjegyösszeg 3-as maradéka megegyezik a szám 3-as maradékával'],
          ['4', '4 db', '{0, 1, 2, 3}', 'Utolsó 2 számjegy vizsgálata; szökőévek ciklikussága'],
          ['5', '5 db', '{0, 1, 2, 3, 4}', 'Utolsó számjegy: ha 0 vagy 5 -> r = 0; ha 3 vagy 8 -> r = 3'],
          ['7', '7 db', '{0, 1, 2, 3, 4, 5, 6}', 'A hét napjai (hétfőtől vasárnapig ismétlődő 7-es ciklus)'],
          ['10', '10 db', '{0, 1, 2, ..., 9}', 'A szám 10-es maradéka pontosan az utolsó számjegye (egyes helyiérték)'],
          ['12', '12 db', '{0, 1, 2, ..., 11}', '12 órás analóg óra számlapja; év 12 hónapja']
        ]}
      />
    </TheoryTemplate>
  );
}
