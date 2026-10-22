import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  Lock,
  KeyRound,
  ShieldCheck,
  Hash,
  Sliders,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Eye,
  Layers,
  ArrowRight,
  ShieldAlert,
  Car,
  Binary,
  HelpCircle,
  Clock,
  Laptop
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';
import { Button } from '@/components/ui/button';

interface LocksTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const LocksTheory: React.FC<LocksTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive Lab 1: Combination Lock Calculator
  const [positions, setPositions] = useState<number>(3);
  const [charsetSize, setCharsetSize] = useState<number>(10);
  const [allowDuplicates, setAllowDuplicates] = useState<boolean>(true);
  const [zeroFirstAllowed, setZeroFirstAllowed] = useState<boolean>(true);

  // Compute combinations for Lab 1
  const calcCombinations = (): { count: number; formula: string; note: string } => {
    const k = positions;
    const n = charsetSize;

    if (!allowDuplicates && k > n) {
      return {
        count: 0,
        formula: '0',
        note: `Nem készíthető kód, mert több pozíció van (${k}), mint ahány különböző elem választható (${n})!`
      };
    }

    if (allowDuplicates) {
      if (zeroFirstAllowed) {
        const total = Math.pow(n, k);
        return {
          count: total,
          formula: `${n}^{${k}} = ${total.toLocaleString('hu-HU')}`,
          note: `Minden pozícióra ${n} választási lehetőség jut függetlenül.`
        };
      } else {
        const first = n - 1;
        const total = first * Math.pow(n, k - 1);
        return {
          count: total,
          formula: `(${n} - 1) \\cdot ${n}^{${k - 1}} = ${first} \\cdot ${Math.pow(n, k - 1).toLocaleString('hu-HU')} = ${total.toLocaleString('hu-HU')}`,
          note: `Az első helyre a 0 nem kerülhet (${first} lehetőség), a maradék ${k - 1} helyre mind a(z) ${n}.`
        };
      }
    } else {
      // Without duplicates
      if (zeroFirstAllowed) {
        let total = 1;
        const factors: number[] = [];
        for (let i = 0; i < k; i++) {
          total *= (n - i);
          factors.push(n - i);
        }
        return {
          count: total,
          formula: `${factors.join(' \\cdot ')} = ${total.toLocaleString('hu-HU')}`,
          note: `Minden lépésben eggyel kevesebb elem választható a már felhasználtak miatt.`
        };
      } else {
        let total = n - 1; // first position cannot be 0
        const factors: number[] = [n - 1];
        for (let i = 1; i < k; i++) {
          total *= (n - i);
          factors.push(n - i);
        }
        return {
          count: total,
          formula: `${factors.join(' \\cdot ')} = ${total.toLocaleString('hu-HU')}`,
          note: `Az első helyre a 0 kiesik (${n - 1} db), a további helyekre a 0 már visszajöhet (${n - 1}, ${n - 2}, ...).`
        };
      }
    }
  };

  const lockResult = calcCombinations();

  // Interactive Lab 2: Password Security & Crack Time Calculator
  const [passLength, setPassLength] = useState<number>(4);
  const [passType, setPassType] = useState<'digits' | 'lower' | 'alphanumeric'>('digits');

  const getPassCharset = () => {
    if (passType === 'digits') return { size: 10, label: 'Csak számjegyek (0–9)' };
    if (passType === 'lower') return { size: 26, label: 'Angol kisbetűk (a–z)' };
    return { size: 62, label: 'Kisbetű + Nagybetű + Szám (a-z, A-Z, 0-9)' };
  };

  const passInfo = getPassCharset();
  const passCombinations = Math.pow(passInfo.size, passLength);
  // Assume a fast GPU/supercomputer can test 1 billion combinations per second (10^9/s)
  const crackSeconds = passCombinations / 1_000_000_000;

  const formatCrackTime = (secs: number): string => {
    if (secs < 0.000001) return '< 1 mikromásodperc (azonnali)';
    if (secs < 0.001) return '< 1 ezredmásodperc';
    if (secs < 1) return `${(secs * 1000).toFixed(1)} ezredmásodperc`;
    if (secs < 60) return `${secs.toFixed(2)} másodperc`;
    if (secs < 3600) return `${(secs / 60).toFixed(1)} perc`;
    if (secs < 86400) return `${(secs / 3600).toFixed(1)} óra`;
    if (secs < 31536000) return `${(secs / 86400).toFixed(1)} nap`;
    const years = secs / 31536000;
    if (years < 1000) return `${years.toFixed(1)} év`;
    if (years < 1_000_000) return `${(years / 1000).toFixed(1)} ezer év`;
    return `${(years / 1_000_000).toFixed(1)} millió év`;
  };

  // Self-check quiz state
  const [answers, setAnswers] = useState<Record<number, number | null>>({
    0: null,
    1: null,
    2: null,
    3: null,
    4: null
  });
  const [revealed, setRevealed] = useState<Record<number, boolean>>({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false
  });

  const selfQuestions = [
    {
      q: 'Hányféle különböző 3-tárcsás számzár kód állítható be a 0-tól 9-ig terjedő számjegyekből?',
      options: ['30', '720', '900', '1 000'],
      correct: 3,
      expl: 'Mindhárom tárcsán 10 lehetőség van (0–9), az ismétlődés szabad: 10 · 10 · 10 = 10³ = 1000 (000-tól 999-ig).'
    },
    {
      q: 'Hány olyan négyjegyű kód létezik a {0, 1, 2, ..., 9} jegyekből, amelyben MINDEN számjegy KÜLÖNBÖZIK?',
      options: ['10 000', '5 040', '4 536', '656'],
      correct: 1,
      expl: 'Kód esetén a 0 is állhat elöl! 1. hely: 10, 2. hely: 9, 3. hely: 8, 4. hely: 7 lehetőség: 10 · 9 · 8 · 7 = 5040.'
    },
    {
      q: 'Hány darab valódi háromjegyű pozitív egész szám van a tízes számrendszerben?',
      options: ['1 000', '900', '720', '899'],
      correct: 1,
      expl: 'Valódi szám esetén a százasok helyére a 0 NEM kerülhet (9 lehetőség: 1–9). A másik két helyre mind a 10: 9 · 10 · 10 = 900 (100-tól 999-ig).'
    },
    {
      q: 'Hány elméleti rendszám készíthető a régi magyar formátumban (3 angol betű + 3 szám, pl. ABC-123)?',
      options: ['26³ · 10³ = 17 576 000', '26 · 10 = 260', '36⁶ = 2 176 782 336', '26³ + 10³ = 18 576'],
      correct: 0,
      expl: 'A 3 betűs rész: 26 · 26 · 26 = 17 576 lehetőség. A 3 számos rész: 10 · 10 · 10 = 1 000 lehetőség. Szorzatuk: 17 576 000.'
    },
    {
      q: 'Egy 4-jegyű PIN kód esetén mi a leggyorsabb módja kiszámolni, hány olyan kód van, amelyben van LEGALÁBB EGY ismétlődő számjegy?',
      options: [
        'Esetszétválasztás: pontosan 2, 3 vagy 4 azonos jegy',
        'Komplementer módszer: Összes kód − Csupa különböző kód (10 000 − 5 040)',
        '10⁴ osztva 2-vel',
        'Nincs ilyen kód'
      ],
      correct: 1,
      expl: 'A komplementer szabály: a „legalább egy ismétlődés” ellentéte a „csupa különböző jegy”. Így: 10 000 − 5040 = 4960 kód.'
    }
  ];

  return (
    <TheoryTemplate
      title="Számzárak, Kódok és Ismétléses Sorrendek"
      subtitle="9. Osztály • I. Kombinatorika és halmazok • 3. Altéma"
      themeColor="amber"
      pdfFilename="9_osztaly_szamzarak_tananyag.pdf"
      onBack={onBack}
      practiceTitle="Készen állsz a kódfejtésre?"
      practiceSubtitle="Teszteld a tudásodat a 30 kérdéses számzár és kódalkotási kvízben!"
      practiceButtonText="Gyakorló Kvíz Indítása"
      handleQuizStart={onStartQuiz}
    >
      {/* 1. SZEKCIÓ: BEVEZETÉS A KÓDOK VILÁGÁBA */}
      <TheorySection
        number={1}
        title="A Számzárak és Kódok Világa"
        icon={<Lock className="w-5 h-5 text-amber-500" />}
        badge="Bevezetés"
        badgeColor="amber"
      >
        <TheoryCallout
          title="Miért fontos a számzárak kombinatorikája a mindennapokban?"
          variant="info"
        >
          Amikor eltekersz egy 3 tárcsás bőröndzárat, beütöd a 4-jegyű bankkártya PIN kódodat az ATM-nél, vagy egy 8 karakteres jelszót adsz meg az email fiókodhoz, mindannyiszor ugyanazzal a matematikai modellel dolgozol: **adott számú pozícióra ($k$) véges elemkészletből ($n$) választasz elemeket**.
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TheoryCard title="A Számzár Alapmodellje" color="amber">
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
              Egy mechanikus számzárban egymás mellett forgó tárcsák találhatók.
            </p>
            <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-400">
              <li>• <strong>Pozíciók száma ($k$):</strong> Hány tárcsa vagy hány beviteli mező van (pl. 3 tárcsa).</li>
              <li>• <strong>Választék mérete ($n$):</strong> Egyetlen tárcsán hány szimbólum szerepel (pl. a 0, 1, 2, ..., 9 számjegyek esetén $n = 10$).</li>
              <li>• <strong>A döntések függetlensége:</strong> Az egyes tárcsák egymástól teljesen függetlenül forgathatók el.</li>
            </ul>
          </TheoryCard>

          {/* SVG Diagram: 3-tárcsás számzár modell */}
          <div className="p-4 rounded-2xl bg-gradient-to-b from-amber-50/60 to-white dark:from-slate-900 dark:to-slate-850 border border-amber-200 dark:border-amber-900/50 flex flex-col items-center justify-center shadow-xs">
            <span className="text-[11px] font-black text-amber-800 dark:text-amber-300 uppercase tracking-wider mb-2">
              3 Tárcsás Számzár Modell
            </span>
            <svg viewBox="0 0 280 130" className="w-full max-w-[270px] h-auto drop-shadow-md">
              {/* Lock body */}
              <rect x="25" y="15" width="230" height="100" rx="16" fill="#1e293b" stroke="#f59e0b" strokeWidth="2.5" />
              {/* Dial 1 */}
              <rect x="45" y="30" width="50" height="70" rx="8" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
              <text x="70" y="50" fill="#64748b" fontSize="11" fontWeight="bold" textAnchor="middle">6</text>
              <rect x="48" y="55" width="44" height="22" rx="4" fill="#f59e0b" />
              <text x="70" y="71" fill="#78350f" fontSize="15" fontWeight="black" textAnchor="middle">7</text>
              <text x="70" y="93" fill="#64748b" fontSize="11" fontWeight="bold" textAnchor="middle">8</text>
              {/* Dial 2 */}
              <rect x="115" y="30" width="50" height="70" rx="8" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
              <text x="140" y="50" fill="#64748b" fontSize="11" fontWeight="bold" textAnchor="middle">2</text>
              <rect x="118" y="55" width="44" height="22" rx="4" fill="#f59e0b" />
              <text x="140" y="71" fill="#78350f" fontSize="15" fontWeight="black" textAnchor="middle">3</text>
              <text x="140" y="93" fill="#64748b" fontSize="11" fontWeight="bold" textAnchor="middle">4</text>
              {/* Dial 3 */}
              <rect x="185" y="30" width="50" height="70" rx="8" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
              <text x="210" y="50" fill="#64748b" fontSize="11" fontWeight="bold" textAnchor="middle">8</text>
              <rect x="188" y="55" width="44" height="22" rx="4" fill="#f59e0b" />
              <text x="210" y="71" fill="#78350f" fontSize="15" fontWeight="black" textAnchor="middle">9</text>
              <text x="210" y="93" fill="#64748b" fontSize="11" fontWeight="bold" textAnchor="middle">0</text>
              {/* Red Indicator line */}
              <line x1="30" y1="66" x2="250" y2="66" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            </svg>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 text-center">
              A piros vonal mentén beállított kód: <strong className="text-amber-600 dark:text-amber-400">7 - 3 - 9</strong>
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: AZ ISMÉTLÉSES VARIÁCIÓ (n^k ALAPKÉPLET) */}
      <TheorySection
        number={2}
        title="Ismétléses Kódok: Az n^k Alapképlet"
        icon={<Hash className="w-5 h-5 text-amber-500" />}
        badge="Alapképlet"
        badgeColor="amber"
      >
        <TheoryCallout title="A Szorzási Szabály Természetes Alkalmazása" variant="tip">
          Ha egy kódban a karakterek <strong>szabadon ismétlődhetnek</strong> (például a 000, a 777 vagy az 1212 is érvényes kód), akkor minden egyes helyiérték kiválasztása egymástól teljesen független esemény!
        </TheoryCallout>

        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border-2 border-amber-300 dark:border-amber-800 text-center my-4">
          <span className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-widest block mb-1">
            Ismétléses Variáció Képlete
          </span>
          <div className="text-2xl sm:text-3xl font-black text-amber-950 dark:text-amber-200 py-1">
            <MathText size="xl">{'V_{n}^{k, \\text{ism}} = n^k'}</MathText>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-2 max-w-xl mx-auto">
            Ahol <strong className="text-amber-700 dark:text-amber-400">k</strong> a pozíciók száma (kódhossz), és <strong className="text-amber-700 dark:text-amber-400">n</strong> az egyes helyekre választható elemek száma.
          </p>
        </div>

        {/* SVG Diagram: k-hely kitöltő modell */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 my-4 flex flex-col items-center">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-3">
            Helyiértékes Réskitöltő Modell k = 4 és n = 10 esetén (PIN kód)
          </span>
          <svg viewBox="0 0 360 90" className="w-full max-w-[340px] h-auto">
            {/* Box 1 */}
            <rect x="10" y="15" width="60" height="55" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
            <text x="40" y="38" fill="#92400e" fontSize="10" fontWeight="bold" textAnchor="middle">1. hely</text>
            <text x="40" y="57" fill="#b45309" fontSize="16" fontWeight="black" textAnchor="middle">10 db</text>

            <text x="85" y="48" fill="#94a3b8" fontSize="20" fontWeight="bold" textAnchor="middle">×</text>

            {/* Box 2 */}
            <rect x="100" y="15" width="60" height="55" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
            <text x="130" y="38" fill="#92400e" fontSize="10" fontWeight="bold" textAnchor="middle">2. hely</text>
            <text x="130" y="57" fill="#b45309" fontSize="16" fontWeight="black" textAnchor="middle">10 db</text>

            <text x="175" y="48" fill="#94a3b8" fontSize="20" fontWeight="bold" textAnchor="middle">×</text>

            {/* Box 3 */}
            <rect x="190" y="15" width="60" height="55" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
            <text x="220" y="38" fill="#92400e" fontSize="10" fontWeight="bold" textAnchor="middle">3. hely</text>
            <text x="220" y="57" fill="#b45309" fontSize="16" fontWeight="black" textAnchor="middle">10 db</text>

            <text x="265" y="48" fill="#94a3b8" fontSize="20" fontWeight="bold" textAnchor="middle">×</text>

            {/* Box 4 */}
            <rect x="280" y="15" width="60" height="55" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
            <text x="310" y="38" fill="#92400e" fontSize="10" fontWeight="bold" textAnchor="middle">4. hely</text>
            <text x="310" y="57" fill="#b45309" fontSize="16" fontWeight="black" textAnchor="middle">10 db</text>
          </svg>
          <div className="mt-2 text-xs font-mono font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3 py-1 rounded-lg border border-amber-200 dark:border-amber-800">
            Összesen: 10 · 10 · 10 · 10 = 10⁴ = 10 000 különböző PIN kód (0000-tól 9999-ig)
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
          <TheoryCard title="3 Tárcsás Számzár" color="amber">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              $k = 3$, $n = 10$ számjegy (0–9).<br />
              <strong className="text-amber-600 dark:text-amber-400">10 · 10 · 10 = 10³ = 1 000</strong> lehetőség (000-tól 999-ig).
            </p>
          </TheoryCard>
          <TheoryCard title="4 Tárcsás Kerékpárzár" color="teal">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              $k = 4$, $n = 10$ számjegy.<br />
              <strong className="text-teal-600 dark:text-teal-400">10⁴ = 10 000</strong> lehetőség. Tízszer nehezebb kitalálni!
            </p>
          </TheoryCard>
          <TheoryCard title="8 Bites Bináris Bájt" color="purple">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              $k = 8$ pozíció, $n = 2$ állapot (0 vagy 1).<br />
              <strong className="text-purple-600 dark:text-purple-400">2⁸ = 256</strong> különböző bájt érték (0-tól 255-ig).
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: ISMÉTLÉS NÉLKÜLI KÓDOK */}
      <TheorySection
        number={3}
        title="Ismétlés Nélküli Kódok"
        icon={<KeyRound className="w-5 h-5 text-amber-500" />}
        badge="Ismétlés Nélkül"
        badgeColor="amber"
      >
        <TheoryCallout title="Amikor egy elem csak egyszer szerepelhet" variant="info">
          Egyes kódrendszerekben kizárják az ismétlődést. Például a régi mechanikus nyomógombos kaputelefonokon, ahol a gombok benyomva maradnak, minden gombot csak egyszer lehet megnyomni!
        </TheoryCallout>

        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed my-3">
          Mivel az egyszer már felhasznált számjegy vagy szimbólum a következő helyekre már nem választható, a lehetőségek száma minden lépésben 1-gyel csökken:
        </p>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center my-3">
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">
            <MathText size="lg">{'V_{n}^{k} = n \\cdot (n - 1) \\cdot (n - 2) \\dots (n - k + 1)'}</MathText>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Pontosan $k$ darab egymást követő, csökkenő tényező szorzata.
          </p>
        </div>

        {/* SVG Diagram: Fogyó választási készlet */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 my-4 flex flex-col items-center">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">
            Példa: 3-jegyű kód az &#123;1, 2, 3, 4, 5&#125; jegyekből ismétlés nélkül
          </span>
          <svg viewBox="0 0 300 85" className="w-full max-w-[290px] h-auto">
            {/* Box 1 */}
            <rect x="15" y="12" width="65" height="55" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
            <text x="47" y="32" fill="#1e40af" fontSize="10" fontWeight="bold" textAnchor="middle">1. számjegy</text>
            <text x="47" y="52" fill="#2563eb" fontSize="15" fontWeight="black" textAnchor="middle">5 db</text>

            <text x="95" y="44" fill="#94a3b8" fontSize="18" fontWeight="bold" textAnchor="middle">×</text>

            {/* Box 2 */}
            <rect x="110" y="12" width="65" height="55" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
            <text x="142" y="32" fill="#1e40af" fontSize="10" fontWeight="bold" textAnchor="middle">2. számjegy</text>
            <text x="142" y="52" fill="#2563eb" fontSize="15" fontWeight="black" textAnchor="middle">4 db</text>

            <text x="190" y="44" fill="#94a3b8" fontSize="18" fontWeight="bold" textAnchor="middle">×</text>

            {/* Box 3 */}
            <rect x="205" y="12" width="65" height="55" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
            <text x="237" y="32" fill="#1e40af" fontSize="10" fontWeight="bold" textAnchor="middle">3. számjegy</text>
            <text x="237" y="52" fill="#2563eb" fontSize="15" fontWeight="black" textAnchor="middle">3 db</text>
          </svg>
          <div className="mt-2 text-xs font-mono font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-lg border border-blue-200 dark:border-blue-800">
            5 · 4 · 3 = 60 különböző kód készíthető
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: MEGKÖTÉSES SZÁMALKOTÁS */}
      <TheorySection
        number={4}
        title="Megkötéses Számalkotás: A Rettegett 0 és a Paritás"
        icon={<ShieldAlert className="w-5 h-5 text-amber-500" />}
        badge="Kritikus Különbség"
        badgeColor="amber"
      >
        <TheoryTrapBox
          title="Kód vs. Valódi Szám – A Leggyakoribb Dolgozatbeli Hiba!"
        >
          <div className="space-y-2 text-xs sm:text-sm">
            <p>
              • <strong>Kód vagy PIN kód esetén:</strong> A <strong>007</strong> vagy <strong>0123</strong> teljesen érvényes 3- illetve 4-jegyű kód! A nulla nyugodtan állhat az első helyen.
            </p>
            <p>
              • <strong>Valódi szám esetén:</strong> A <strong>0123 nem négyjegyű szám</strong>, hanem a 123 háromjegyű szám! Valódi többjegyű szám <strong>SOHA nem kezdődhet 0-val</strong>.
            </p>
          </div>
        </TheoryTrapBox>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TheoryCard title="Hány 3-jegyű szám van a tízes számrendszerben?" color="amber">
            <p className="text-xs text-slate-700 dark:text-slate-300 mb-2">
              Számjegyek: &#123;0, 1, 2, ..., 9&#125; (10 darab).
            </p>
            <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-400">
              <li>• <strong>Százasok helye:</strong> 0 nem lehet $\to$ <strong className="text-amber-700 dark:text-amber-400">9 lehetőség</strong> (1-től 9-ig).</li>
              <li>• <strong>Tízesek helye:</strong> már a 0 is lehet $\to$ <strong>10 lehetőség</strong>.</li>
              <li>• <strong>Egyesek helye:</strong> <strong>10 lehetőség</strong>.</li>
            </ul>
            <div className="mt-2.5 p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-mono text-xs font-bold border border-amber-200 dark:border-amber-800">
              9 · 10 · 10 = 900 darab háromjegyű szám (100-tól 999-ig)
            </div>
          </TheoryCard>

          <TheoryCard title="Hány 3-jegyű KÜLÖNBÖZŐ jegyű szám van az {0, 1, 2, 3, 4} halmazból?" color="teal">
            <p className="text-xs text-slate-700 dark:text-slate-300 mb-2">
              Készlet: 5 számjegy, ismétlődés tilos.
            </p>
            <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-400">
              <li>• <strong>Százasok:</strong> a 0 kiesik $\to$ <strong className="text-teal-700 dark:text-teal-400">4 lehetőség</strong> (1, 2, 3 vagy 4).</li>
              <li>• <strong>Tízesek:</strong> a 0 visszajöhet, de a használt kiesik $\to$ <strong className="text-teal-700 dark:text-teal-400">4 lehetőség</strong>.</li>
              <li>• <strong>Egyesek:</strong> maradék <strong className="text-teal-700 dark:text-teal-400">3 lehetőség</strong>.</li>
            </ul>
            <div className="mt-2.5 p-2 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-900 dark:text-teal-200 font-mono text-xs font-bold border border-teal-200 dark:border-teal-800">
              4 · 4 · 3 = 48 darab szám készíthető
            </div>
          </TheoryCard>
        </div>

        {/* Paritás és oszthatóság szabály */}
        <TheoryCallout title="A szigorúbb feltétellel rendelkező hellyel kezdj!" variant="tip">
          Ha a feladatban paritási feltétel van (pl. páros számot vagy 5-tel osztható számot keresünk), <strong>mindig az utolsó helyiértékkel kezdd a gondolatmenetet</strong>, mert a párosságot az egyesek helye dönti el!
        </TheoryCallout>
      </TheorySection>

      {/* 5. SZEKCIÓ: BETŰK ÉS SZÁMOK VEGYÍTÉSE (RENDSZÁMOK ÉS JELSZAVAK) */}
      <TheorySection
        number={5}
        title="Betűk és Számok Vegyítése: Rendszámok és Jelszavak"
        icon={<Car className="w-5 h-5 text-amber-500" />}
        badge="Gyakorlati Modellek"
        badgeColor="amber"
      >
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          A való életben a legtöbb azonosító és jelszó nemcsak számjegyeket, hanem betűket is tartalmaz. Mivel az angol ábécében 26 betű található, a betűkombinációk száma ugrásszerűen megnöveli a biztonságot és a kapacitást!
        </p>

        {/* SVG Diagram: Régi vs Új magyar rendszám */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          {/* Régi rendszám */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col items-center">
            <span className="text-xs font-bold text-slate-500 mb-2">Régi Magyar Rendszám (1990–2022)</span>
            <div className="w-full max-w-[220px] h-12 bg-white rounded-lg border-2 border-slate-800 flex items-center px-2 shadow-xs">
              <div className="w-4 h-8 bg-blue-700 rounded-sm flex flex-col items-center justify-center text-[7px] text-white font-bold mr-2">
                <span>H</span>
              </div>
              <span className="font-mono font-black text-slate-900 text-lg tracking-wider">ABC-123</span>
            </div>
            <div className="mt-3 text-xs text-center space-y-1 text-slate-600 dark:text-slate-400">
              <p>3 betű + 3 szám</p>
              <p className="font-mono font-bold text-amber-600 dark:text-amber-400">
                26³ · 10³ = 17 576 · 1 000
              </p>
              <p className="font-black text-slate-900 dark:text-slate-100">
                = 17 576 000 kombináció
              </p>
            </div>
          </div>

          {/* Új rendszám */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col items-center">
            <span className="text-xs font-bold text-slate-500 mb-2">Új Magyar Rendszám (2022-től)</span>
            <div className="w-full max-w-[220px] h-12 bg-white rounded-lg border-2 border-slate-800 flex items-center px-2 shadow-xs">
              <div className="w-4 h-8 bg-blue-700 rounded-sm flex flex-col items-center justify-center text-[7px] text-white font-bold mr-2">
                <span>H</span>
              </div>
              <span className="font-mono font-black text-slate-900 text-base tracking-wider">AA·AA-123</span>
            </div>
            <div className="mt-3 text-xs text-center space-y-1 text-slate-600 dark:text-slate-400">
              <p>4 betű + 3 szám</p>
              <p className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                26⁴ · 10³ = 456 976 · 1 000
              </p>
              <p className="font-black text-slate-900 dark:text-slate-100">
                = 456 976 000 kombináció (~26-szor több!)
              </p>
            </div>
          </div>
        </div>

        <TheoryCard title="Jelszavak Erőssége: Miért kérnek kisbetűt, nagybetűt és számot?" color="purple">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
            Ha egy 6 karakteres jelszó csak kisbetűkből áll: $26^6 \approx 308$ millió kombináció. Egy modern számítógép ezt másodpercek alatt végigpróbálja.
          </p>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Ha megengedjük a 26 kisbetűt + 26 nagybetűt + 10 számjegyet: az alap $n = 62$-re nő! Ekkor $62^6 \approx 56,8$ milliárd lehetőség adódik — a feltörési idő több mint 180-szorosára nő!
          </p>
        </TheoryCard>
      </TheorySection>

      {/* 6. SZEKCIÓ: GYAKORI BUKTATÓK ÉS TÉVHITEK */}
      <TheorySection
        number={6}
        title="Gyakori Buktatók és Tévhitek"
        icon={<AlertTriangle className="w-5 h-5 text-amber-500" />}
        badge="Figyelem"
        badgeColor="amber"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 my-3">
          <TheoryCard title="1. Buktató: Összeadás szorzás helyett" color="rose">
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Egy 4 tárcsás számzárnál nem $10 + 10 + 10 + 10 = 40$ kód van, hanem <strong className="text-rose-600 dark:text-rose-400">10 · 10 · 10 · 10 = 10 000</strong>! Minden tárcsa független döntés, a lehetőségek szorzódnak.
            </p>
          </TheoryCard>

          <TheoryCard title="2. Buktató: 0-val kezdődő számok" color="amber">
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Mindig nézd meg a feladat szövegét: <strong>„kód”</strong>-ról vagy <strong>„szám”</strong>-ról van szó? Kódnál a 0 állhat elöl, valódi számnál nem!
            </p>
          </TheoryCard>

          <TheoryCard title="3. Buktató: „Legalább egy” kérdések" color="teal">
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Ha azt kérdezik, hány olyan kód van, amiben van legalább egy 5-ös, ne próbáld közvetlenül összeszámolni! Használd a <strong>komplementer szabályt</strong>: Összes eset − olyanok, amiben egyetlen 5-ös sincs.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 7. SZEKCIÓ: INTERAKTÍV LABORATÓRIUMOK ÉS ÖSSZEFOGLALÁS */}
      <TheorySection
        number={7}
        title="Interaktív Laboratóriumok és Összefoglaló Táblázat"
        icon={<Sliders className="w-5 h-5 text-amber-500" />}
        badge="Interaktív Labor"
        badgeColor="amber"
      >
        {/* Lab 1: Lock Calculator */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border-2 border-amber-200 dark:border-amber-900/60 mb-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Sliders className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h4 className="text-sm font-black text-slate-900 dark:text-slate-100">
              1. Interaktív Labor: Kódkombináció és Számzár Kalkulátor
            </h4>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
            Állítsd be a tárcsák számát ($k$), a választható szimbólumok számát ($n$), és kapcsold be vagy ki az ismétlődést, valamint a 0 első helyre kerülésének engedélyezését!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Control: Positions (k) */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Pozíciók száma (k): <span className="text-amber-600 dark:text-amber-400 font-black">{positions}</span>
              </label>
              <input
                type="range"
                min={1}
                max={6}
                value={positions}
                onChange={(e) => setPositions(parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>1</span><span>3</span><span>6</span>
              </div>
            </div>

            {/* Control: CharsetSize (n) */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Elemkészlet (n): <span className="text-amber-600 dark:text-amber-400 font-black">{charsetSize}</span>
              </label>
              <input
                type="range"
                min={2}
                max={26}
                value={charsetSize}
                onChange={(e) => setCharsetSize(parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>2 (bináris)</span><span>10 (számok)</span><span>26 (betűk)</span>
              </div>
            </div>

            {/* Toggle: Allow Duplicates */}
            <div className="flex flex-col justify-center space-y-1">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Ismétlődés megengedett?</span>
              <button
                type="button"
                onClick={() => setAllowDuplicates(!allowDuplicates)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  allowDuplicates
                    ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                }`}
              >
                {allowDuplicates ? 'Igen (n^k ismétléses)' : 'Nem (csökkenő szorzat)'}
              </button>
            </div>

            {/* Toggle: Zero first allowed */}
            <div className="flex flex-col justify-center space-y-1">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">0 állhat elöl?</span>
              <button
                type="button"
                onClick={() => setZeroFirstAllowed(!zeroFirstAllowed)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  zeroFirstAllowed
                    ? 'bg-teal-600 text-white border-teal-700 shadow-xs'
                    : 'bg-rose-600 text-white border-rose-700 shadow-xs'
                }`}
              >
                {zeroFirstAllowed ? 'Igen (Kód / PIN)' : 'Nem (Valódi Szám)'}
              </button>
            </div>
          </div>

          {/* Result Card */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block mb-0.5">
                Kiszámított Lehetőségek Száma:
              </span>
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 font-mono">
                {lockResult.count.toLocaleString('hu-HU')} kombináció
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {lockResult.note}
              </p>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-center shrink-0">
              <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase block">Képlet</span>
              <span className="text-sm font-mono font-black text-amber-900 dark:text-amber-200">
                <MathText size="sm">{lockResult.formula}</MathText>
              </span>
            </div>
          </div>
        </div>

        {/* Lab 2: Password Security & Crack Time */}
        <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border-2 border-indigo-200 dark:border-indigo-900/60 mb-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h4 className="text-sm font-black text-slate-900 dark:text-slate-100">
              2. Interaktív Labor: Jelszó és PIN Feltörési Idő Szimulátor
            </h4>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
            Egy szuperszámítógép képes akár <strong>másodpercenként 1 milliárd (10⁹)</strong> próbálkozást leellenőrizni. Nézzük meg, mekkora a különbség egy egyszerű 4-jegyű PIN kód és egy alfanumerikus jelszó között!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Karaktertípus:
              </label>
              <div className="grid grid-cols-1 gap-1.5">
                {[
                  { id: 'digits', label: 'Csak számjegyek (0–9, n = 10)' },
                  { id: 'lower', label: 'Csak kisbetűk (a–z, n = 26)' },
                  { id: 'alphanumeric', label: 'Kis- és nagybetű + Szám (n = 62)' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPassType(item.id as any)}
                    className={`px-3 py-1.5 text-left rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      passType === item.id
                        ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Jelszó hossza: <span className="text-indigo-600 dark:text-indigo-400 font-black">{passLength} karakter</span>
              </label>
              <div className="flex gap-2 mb-3">
                {[4, 6, 8, 10].map((len) => (
                  <button
                    key={len}
                    type="button"
                    onClick={() => setPassLength(len)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      passLength === len
                        ? 'bg-indigo-600 text-white border-indigo-700'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {len}
                  </button>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900">
                <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Becsült brute-force feltörési idő (10⁹ próba/mp):
                </div>
                <div className="text-lg font-black text-indigo-950 dark:text-indigo-200 mt-0.5">
                  {formatCrackTime(crackSeconds)}
                </div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                  {passCombinations.toLocaleString('hu-HU')} kombináció
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Table */}
        <h4 className="text-sm font-black text-slate-900 dark:text-slate-100 mb-2">
          Nagy Összefoglaló: Kódtípusok és Képletek
        </h4>
        <TheoryTable
          headers={['Típus', 'Megkötés', 'Képlet', 'Gyakorlati Példa']}
          rows={[
            ['Ismétléses kód', 'Szabad ismétlődés, 0 elöl lehet', 'n^k', '4-jegyű banki PIN kód: 10⁴ = 10 000'],
            ['Ismétlés nélküli kód', 'Minden elem különböző, 0 elöl lehet', 'n · (n-1) · ... · (n-k+1)', '4-jegyű kód különböző jegyekkel: 10 · 9 · 8 · 7 = 5 040'],
            ['Valódi többjegyű szám', '0 NEM állhat elöl', '(n-1) · n^(k-1)', 'Háromjegyű számok: 9 · 10 · 10 = 900 (100–999)'],
            ['Valódi szám ismétlés nélkül', '0 NEM állhat elöl, jegyek különböznek', '(n-1) · (n-1) · (n-2) · ...', '3-jegyű szám {0..4}-ből: 4 · 4 · 3 = 48'],
            ['Vegyített rendszám', 'Több különálló blokk szorzata', 'n_1^{k_1} · n_2^{k_2}', 'Régi magyar rendszám (3 betű, 3 szám): 26³ · 10³ = 17 576 000']
          ]}
        />
      </TheorySection>

      {/* 8. SZEKCIÓ: AZONNALI TUDÁSPRÓBA */}
      <TheorySection
        number={8}
        title="Azonnali Tudáspróba"
        icon={<CheckCircle2 className="w-5 h-5 text-amber-500" />}
        badge="Önellenőrzés"
        badgeColor="amber"
      >
        <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
          Válaszolj a villámkérdésekre, majd kattints az ellenőrzésre az azonnali visszajelzésért!
        </p>

        <div className="space-y-4">
          {selfQuestions.map((qObj, idx) => {
            const isCorrect = answers[idx] === qObj.correct;
            const isAnswered = answers[idx] !== null;

            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs"
              >
                <div className="flex items-start gap-2.5 mb-3">
                  <span className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-black flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 leading-snug">
                    <MathText>{qObj.q}</MathText>
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                  {qObj.options.map((opt, optIdx) => {
                    const isSelected = answers[idx] === optIdx;
                    let optStyle = "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100";

                    if (revealed[idx]) {
                      if (optIdx === qObj.correct) {
                        optStyle = "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-400 text-emerald-800 dark:text-emerald-200 font-bold";
                      } else if (isSelected) {
                        optStyle = "bg-rose-50 dark:bg-rose-950/50 border-rose-400 text-rose-800 dark:text-rose-200";
                      }
                    } else if (isSelected) {
                      optStyle = "bg-amber-100 dark:bg-amber-950/70 border-amber-400 text-amber-900 dark:text-amber-200 font-bold";
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => {
                          if (!revealed[idx]) {
                            setAnswers({ ...answers, [idx]: optIdx });
                          }
                        }}
                        className={`p-2.5 text-left rounded-xl border text-xs transition-all cursor-pointer ${optStyle}`}
                      >
                        <MathText>{opt}</MathText>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={!isAnswered || revealed[idx]}
                    onClick={() => setRevealed({ ...revealed, [idx]: true })}
                    className="text-xs h-7 px-3 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 mr-1" /> Ellenőrzés
                  </Button>

                  {revealed[idx] && (
                    <span className={`text-xs font-bold flex items-center gap-1 ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {isCorrect ? 'Helyes válasz! 🎉' : 'Nem jó válasz! 🤔'}
                    </span>
                  )}
                </div>

                {revealed[idx] && (
                  <div className="mt-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
                    <strong className="text-amber-700 dark:text-amber-400">Magyarázat: </strong>
                    <MathText>{qObj.expl}</MathText>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default LocksTheory;
