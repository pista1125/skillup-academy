import React, { useState, useMemo } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard } from '../TheoryTemplate';
import {
  Trophy,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Split,
  Binary,
  Layers,
  ShieldCheck,
  RefreshCw,
  Hash,
  Calculator,
  Compass
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Chapter1SummaryTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

// Helper: Prime factor decomposition map (prime -> exponent)
function getPrimeFactorsMap(n: number): Record<number, number> {
  const map: Record<number, number> = {};
  let temp = Math.abs(n);
  if (temp < 2) return map;

  for (let d = 2; d * d <= temp; d++) {
    while (temp % d === 0) {
      map[d] = (map[d] || 0) + 1;
      temp = Math.floor(temp / d);
    }
  }
  if (temp > 1) {
    map[temp] = (map[temp] || 0) + 1;
  }
  return map;
}

function formatPrimeDecomposition(map: Record<number, number>): string {
  const primes = Object.keys(map).map(Number).sort((a, b) => a - b);
  if (primes.length === 0) return '1';
  return primes
    .map((p) => (map[p] > 1 ? `${p}^${map[p]}` : `${p}`))
    .join(' · ');
}

function getAllDivisors(n: number): number[] {
  const num = Math.abs(n);
  if (num === 0) return [];
  const divisors: number[] = [];
  for (let i = 1; i * i <= num; i++) {
    if (num % i === 0) {
      divisors.push(i);
      if (i * i !== num) {
        divisors.push(num / i);
      }
    }
  }
  return divisors.sort((a, b) => a - b);
}

const CHECK_DIVISORS = [2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 25, 36, 45, 100];

export function Chapter1SummaryTheory({ onBack, onStartQuiz }: Chapter1SummaryTheoryProps) {
  // Master Lab state
  const [labInput, setLabInput] = useState('360');

  const parsedNumber = useMemo(() => {
    const val = parseInt(labInput.trim(), 10);
    return isNaN(val) ? 360 : Math.min(Math.abs(val), 999999);
  }, [labInput]);

  const primeMap = useMemo(() => getPrimeFactorsMap(parsedNumber), [parsedNumber]);
  const isPrime = useMemo(() => {
    if (parsedNumber < 2) return false;
    const primes = Object.keys(primeMap);
    return primes.length === 1 && primeMap[Number(primes[0])] === 1;
  }, [parsedNumber, primeMap]);

  const divisors = useMemo(() => getAllDivisors(parsedNumber), [parsedNumber]);
  const divisorCount = useMemo(() => {
    if (parsedNumber < 1) return 0;
    const exponents = Object.values(primeMap);
    if (exponents.length === 0) return 1;
    return exponents.reduce((acc, exp) => acc * (exp + 1), 1);
  }, [parsedNumber, primeMap]);

  const divisibilityMatrix = useMemo(() => {
    return CHECK_DIVISORS.map((d) => ({
      divisor: d,
      isDivisible: parsedNumber % d === 0,
      remainder: parsedNumber % d,
    }));
  }, [parsedNumber]);

  const generateRandomSample = () => {
    const samples = [60, 72, 84, 120, 144, 180, 210, 300, 360, 420, 504, 720, 840, 900, 1080];
    const rand = samples[Math.floor(Math.random() * samples.length)];
    setLabInput(rand.toString());
  };

  return (
    <TheoryTemplate
      title="I. Egész számok, oszthatóság – Összefoglalás"
      description="A teljes fejezet átfogó szintézise: műveletek, kombinatorika, oszthatósági szabályok, prímfelbontás, LNKO és LKKT egyetlen helyen!"
      badgeText="6. Osztály • I. Fejezet Zárás"
      themeColor="indigo"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      pdfElementId="chapter1-summary-theory-content"
      pdfFilename="Egesz_Szamok_Oszthatosag_Osszefoglalas"
    >
      {/* 1. Szekció: Műveletek az egész számok körében */}
      <TheorySection
        number={1}
        title="1. Egész számok és műveleti szabályok"
        icon={<Calculator className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badgeColor="indigo"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Összeadás és kivonás (Előjelszabályok)"
            icon={<Hash className="w-4 h-4 text-indigo-500" />}
          >
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <p>
                <strong>Azonos előjel:</strong> Az abszolút értékeket összeadjuk, és megtartjuk a közös előjelet ($(+4) + (+6) = +10$, $(-4) + (-6) = -10$).
              </p>
              <p>
                <strong>Különböző előjel:</strong> A nagyobb abszolút értékűből kivonjuk a kisebbet, és a nagyobb előjelét kapjuk ($(+7) + (-10) = -3$).
              </p>
              <div className="p-2.5 rounded-lg bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 font-mono text-[11px] text-indigo-950 dark:text-indigo-200">
                Kivonás átalakítása ellentett hozzáadásává: a - b = a + (-b)
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Szorzás és osztás előjelszabálya"
            icon={<Zap className="w-4 h-4 text-indigo-500" />}
          >
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <p>
                <strong>Azonos előjelek:</strong> Az eredmény mindig <strong>POZITÍV</strong> (+ · + = +, - · - = +).
              </p>
              <p>
                <strong>Különböző előjelek:</strong> Az eredmény mindig <strong>NEGATÍV</strong> (+ · - = -, - · + = -).
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 text-white font-mono text-center text-xs space-y-0.5">
                <div className="text-indigo-300 font-bold">(-6) · (-8) = +48 | (-54) : (+9) = -6</div>
                <div className="text-slate-400 text-[10px]">Nullával való osztás értelmetlen!</div>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. Szekció: Kombinatorika és maradékos osztás */}
      <TheorySection
        number={2}
        title="2. Kombinatorika és a maradékos osztás alaptétele"
        icon={<Compass className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badgeColor="indigo"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Szorzási szabály és fadiagram"
            icon={<Split className="w-4 h-4 text-indigo-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              Ha egy döntést $p$-féleképpen, egy másikat $q$-féleképpen hozhatunk meg egymástól függetlenül, akkor a két döntés együttesen <strong>$p \cdot q$-féleképpen</strong> valósítható meg.
            </p>
            <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-[11px] text-indigo-950 dark:text-indigo-200 font-mono">
              Pl. 3 féle nadrág és 4 féle póló ⟹ 3 · 4 = 12 különböző öltözet.
            </div>
          </TheoryCard>

          <TheoryCard
            title="A maradékos osztás tétele"
            icon={<ShieldCheck className="w-4 h-4 text-indigo-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              Bármely <em>a</em> egész számhoz és pozitív <em>b</em> osztóhoz (b &gt; 0) egyértelműen létezik <em>q</em> hányados és <em>r</em> maradék:
            </p>
            <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-xs font-mono text-center font-bold text-indigo-700 dark:text-indigo-300">
              a = b · q + r, ahol 0 ≤ r &lt; b
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. Szekció: Oszthatósági szabályok nagytérképe */}
      <TheorySection
        number={3}
        title="3. Oszthatósági szabályok átfogó rendszere"
        icon={<Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badgeColor="indigo"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard
            title="Utolsó számjegyek szabályai"
            icon={<Hash className="w-4 h-4 text-indigo-500" />}
          >
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <div>• <strong>2-vel:</strong> utolsó jegy páros (0, 2, 4, 6, 8).</div>
              <div>• <strong>5-tel:</strong> utolsó jegy 0 vagy 5.</div>
              <div>• <strong>10-zel:</strong> utolsó jegy 0.</div>
              <div>• <strong>4-gyel:</strong> utolsó két jegy 4-gyel osztható.</div>
              <div>• <strong>100-zal:</strong> utolsó két jegy 00.</div>
              <div>• <strong>8-cal:</strong> utolsó három jegy 8-cal osztható.</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Számjegyösszeg szabályai"
            icon={<Sparkles className="w-4 h-4 text-indigo-500" />}
          >
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <div>• <strong>3-mal:</strong> a számjegyek összege osztható 3-mal.</div>
              <div>• <strong>9-cel:</strong> a számjegyek összege osztható 9-cel.</div>
              <div className="p-2 rounded bg-indigo-50 dark:bg-indigo-950/40 text-[11px] mt-1 font-mono text-indigo-800 dark:text-indigo-300">
                A 3-as és 9-es osztási maradék pontosan megegyezik a számjegyösszeg maradékával!
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Összetett szabályok (Relatív prímek)"
            icon={<Binary className="w-4 h-4 text-indigo-500" />}
          >
            <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
              <div>• <strong>6 = 2 · 3:</strong> páros ÉS összeg osztható 3-mal.</div>
              <div>• <strong>12 = 3 · 4:</strong> 4-gyel és 3-mal is osztható.</div>
              <div>• <strong>15 = 3 · 5:</strong> 5-re/0-ra végződik és összeg: 3.</div>
              <div>• <strong>18 = 2 · 9:</strong> páros ÉS összeg osztható 9-cel.</div>
              <div>• <strong>20 = 4 · 5:</strong> 0-ra végződik és 4-gyel osztható.</div>
              <div>• <strong>36 = 4 · 9:</strong> 4-es ÉS 9-es szabály egyszerre.</div>
              <div>• <strong>45 = 5 · 9:</strong> 5-ös ÉS 9-es szabály egyszerre.</div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Szekció: Interaktív Fejezeti Mesterlabor */}
      <TheorySection
        number={4}
        title="4. Interaktív Fejezeti Számelméleti Mesterlabor"
        icon={<Trophy className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badgeColor="indigo"
      >
        <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/70 dark:from-slate-900 dark:via-slate-900/90 dark:to-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/80 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calculator className="w-5 h-5 text-indigo-600" />
                Komplett Számprofil Vizsgáló
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Írj be bármilyen egész számot a teljes számelméleti profil, prímfelbontás, osztók és oszthatósági mátrix megjelenítéséhez!
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={generateRandomSample}
              className="border-indigo-300 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-700 dark:text-indigo-300 flex items-center gap-1.5"
            >
              <RefreshCw className="w-4 h-4" />
              Véletlen Tesztszám
            </Button>
          </div>

          {/* Input */}
          <div className="max-w-md">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">
              Vizsgálandó pozitív egész szám (N):
            </label>
            <div className="relative">
              <Input
                type="text"
                value={labInput}
                onChange={(e) => setLabInput(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="pl. 360"
                maxLength={6}
                className="font-mono text-base font-bold text-indigo-950 dark:text-indigo-100 bg-white dark:bg-slate-800"
              />
              <Hash className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Szám jellege:</span>
              <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300">
                {parsedNumber === 1 ? 'Egység (nem prím)' : isPrime ? 'Prímszám 🌟' : 'Összetett szám'}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Paritás:</span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {parsedNumber % 2 === 0 ? 'Páros szám' : 'Páratlan szám'}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Osztók száma d(N):</span>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                {divisorCount} db osztó
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Kanonikus alak:</span>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-300 font-mono truncate block">
                {formatPrimeDecomposition(primeMap)}
              </span>
            </div>
          </div>

          {/* Divisibility Matrix */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-indigo-100 dark:border-slate-700 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Oszthatósági mátrix a(z) {parsedNumber} számra:
            </h4>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {divisibilityMatrix.map((item) => (
                <div
                  key={item.divisor}
                  className={`p-2 rounded-lg border text-center transition-all ${
                    item.isDivisible
                      ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-200'
                      : 'bg-slate-50 border-slate-200 text-slate-600 dark:bg-slate-800/40 dark:border-slate-700 dark:text-slate-400'
                  }`}
                >
                  <div className="font-bold text-xs">| {item.divisor}</div>
                  <div className="text-[11px] font-mono mt-0.5">
                    {item.isDivisible ? '✓ Osztható' : `✗ mar: ${item.remainder}`}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Divisors list */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
            <div className="font-bold text-slate-700 dark:text-slate-300">
              Az összes pozitív osztó felsorolása ({divisors.length} db):
            </div>
            <div className="font-mono text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              {divisors.join(', ')}
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 5. Szekció: LNKO és LKKT szintézise */}
      <TheorySection
        number={5}
        title="5. LNKO és LKKT szintézise (A két aranyszabály)"
        icon={<ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badgeColor="indigo"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="LNKO vs. LKKT prímhatványos képlete"
            icon={<Binary className="w-4 h-4 text-indigo-500" />}
          >
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-2 rounded bg-indigo-50 dark:bg-indigo-950/40 font-mono text-[11px] space-y-1">
                <div className="font-bold text-indigo-800 dark:text-indigo-300">
                  LNKO(a, b) ⟹ CSAK A KÖZÖS prímek a LEGKISEBB kitevőn!
                </div>
                <div className="font-bold text-amber-700 dark:text-amber-300">
                  LKKT[a, b] ⟹ MINDEN ELŐFORDULÓ prím a LEGNAGYOBB kitevőn!
                </div>
              </div>
              <div className="text-[11px]">
                Pl. ha $a = 2^3 \cdot 3^2$ és $b = 2^2 \cdot 3^3 \cdot 5$, akkor:
                <div>• $(a, b) = 2^2 \cdot 3^2 = 36$</div>
                <div>• $[a, b] = 2^3 \cdot 3^3 \cdot 5 = 1080$</div>
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="A szorzat-összefüggés tétele"
            icon={<Lightbulb className="w-4 h-4 text-indigo-500" />}
          >
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <p>
                Bármely két pozitív egész szám szorzata egyenlő az LNKO-juk és LKKT-jük szorzatával:
              </p>
              <div className="p-3 rounded-xl bg-slate-900 text-white font-mono text-center text-sm font-bold shadow-md">
                a · b = (a, b) · [a, b]
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Ha $(a, b) = 1$ (relatív prímek), akkor $[a, b] = a \cdot b$.
              </p>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
}
