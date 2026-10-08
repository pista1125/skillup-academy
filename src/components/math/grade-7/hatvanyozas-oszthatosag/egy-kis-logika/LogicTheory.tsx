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
  Brain,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  ArrowLeftRight,
  Sparkles,
  Layers,
  Scale,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogicTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

interface LogicStatementModel {
  id: string;
  conditionA: string;
  consequenceB: string;
  context: string;
  aImpliesB: boolean;
  bImpliesA: boolean;
  counterexampleAtoB?: string;
  counterexampleBtoA?: string;
  isNecessary: boolean; // B is necessary for A?
  isSufficient: boolean; // A is sufficient for B?
  isEquivalent: boolean;
  explanation: string;
}

const PRESET_STATEMENTS: LogicStatementModel[] = [
  {
    id: 'div10-div5',
    conditionA: 'A szám osztható 10-zel',
    consequenceB: 'A szám osztható 5-tel',
    context: 'Egész számok oszthatósága',
    aImpliesB: true,
    bImpliesA: false,
    counterexampleBtoA: 'A 15, 25, 35 osztható 5-tel, de nem osztható 10-zel!',
    isNecessary: true, // 5-tel oszthatóság szükséges a 10-zel való oszthatósághoz
    isSufficient: true, // 10-zel való oszthatóság elégséges az 5-tel való oszthatósághoz
    isEquivalent: false,
    explanation: 'Mivel 10 = 2 · 5, ha egy szám osztható 10-zel, biztosan osztható 5-tel is. Fordítva nem igaz: az 5-tel való oszthatóság szükséges, de nem elégséges a 10-hez.'
  },
  {
    id: 'div9-div3',
    conditionA: 'A szám osztható 9-cel',
    consequenceB: 'A szám osztható 3-mal',
    context: 'Számjegyösszeg szabályok',
    aImpliesB: true,
    bImpliesA: false,
    counterexampleBtoA: 'A 12, 15, 21, 24 osztható 3-mal, de nem osztható 9-cel!',
    isNecessary: true,
    isSufficient: true,
    isEquivalent: false,
    explanation: 'Mivel 9 = 3 · 3, a 9-cel oszthatóság elégséges a 3-mal való oszthatósághoz. A 3-mal oszthatóság szükséges feltétele a 9-nek, de önmagában nem garantálja.'
  },
  {
    id: 'digitsum3-div3',
    conditionA: 'A számjegyek összege osztható 3-mal',
    consequenceB: 'A szám osztható 3-mal',
    context: '3-as oszthatósági szabály',
    aImpliesB: true,
    bImpliesA: true,
    isNecessary: true,
    isSufficient: true,
    isEquivalent: true,
    explanation: 'Mindkét irányban igaz: egy szám pontosan akkor osztható 3-mal, ha a számjegyösszege osztható 3-mal. Ez egy szükséges ÉS elégséges feltétel (ekvivalencia).'
  },
  {
    id: 'div6-even',
    conditionA: 'A szám osztható 6-tal',
    consequenceB: 'A szám páros (osztható 2-vel)',
    context: 'Páros számok és 6-os oszthatóság',
    aImpliesB: true,
    bImpliesA: false,
    counterexampleBtoA: 'A 4, 8, 10, 14, 16 párosak, de nem oszthatók 6-tal!',
    isNecessary: true,
    isSufficient: true,
    isEquivalent: false,
    explanation: 'A párosság elengedhetetlen (szükséges) ahhoz, hogy 6-tal osztható legyen egy szám, de nem elégséges, mert a 3-mal való oszthatóság is kell mellé.'
  },
  {
    id: 'even-div4',
    conditionA: 'A szám páros',
    consequenceB: 'A szám osztható 4-gyel',
    context: 'Gyakori diákcsapda',
    aImpliesB: false,
    bImpliesA: true,
    counterexampleAtoB: 'A 6, 10, 14, 18 páros, de 4-gyel nem osztható!',
    isNecessary: false,
    isSufficient: false,
    isEquivalent: false,
    explanation: 'A párosság csupán 2-vel való oszthatóságot jelent. A 4-gyel való oszthatósághoz az utolsó 2 számjegynek kell oszthatónak lennie 4-gyel.'
  },
  {
    id: 'prime-odd',
    conditionA: 'A szám prímszám',
    consequenceB: 'A szám páratlan',
    context: 'Prímszámok tulajdonságai',
    aImpliesB: false,
    bImpliesA: false,
    counterexampleAtoB: 'A 2 prímszám, mégsem páratlan!',
    counterexampleBtoA: 'A 9, 15, 21, 25 páratlan, de összetett számok (nem prímek)!',
    isNecessary: false,
    isSufficient: false,
    isEquivalent: false,
    explanation: 'A prímszámok között van egyetlen páros szám (a 2), míg a páratlan számok közül rengeteg összetett szám van.'
  }
];

export const LogicTheory: React.FC<LogicTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('div10-div5');

  const activeStatement = useMemo(() => {
    return PRESET_STATEMENTS.find(s => s.id === selectedPresetId) || PRESET_STATEMENTS[0];
  }, [selectedPresetId]);

  return (
    <TheoryTemplate
      title="Egy kis logika a matematikában"
      subtitle="Feltételes állítások („ha..., akkor...”), megfordítások, szükséges és elégséges feltételek az oszthatóságban, valamint esetszétválasztásos bizonyítások."
      badgeText="7. Osztály • Matematika IV. Témakör • 4. Lecke"
      topicBadge="Hatványozás és oszthatóság"
      emoji="💡"
      themeColor="indigo"
      documentId="g7-powers-logic-theory-doc"
      pdfFilename="7_osztaly_egy_kis_logika_tananyag.pdf"
      quickRule={{
        label: 'Fontos Szabályok – Logikai Alapelvek',
        formula: 'Tagadás: I ⟷ H  |  „Minden...” tagadása: „Van olyan, ami nem...”  |  A ⟹ B: A elégséges, B szükséges  |  A ⟺ B: ekvivalens'
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      readTime="15 perc"
    >
      {/* 1. SZEKCIÓ: MATEMATIKAI ÁLLÍTÁSOK ÉS TAGADÁSUK */}
      <TheorySection
        number={1}
        title="1. Matematikai Állítások és Tagadásuk"
        badgeColor="indigo"
        icon={<Brain className="w-6 h-6 text-indigo-600" />}
      >
        <TheoryCard title="Mi a matematikai állítás?">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
            A matematikában <strong>állításnak</strong> (kijelentésnek) nevezünk minden olyan kijelentő mondatot, amelyről egyértelműen eldönthető, hogy <strong>IGAZ</strong> vagy <strong>HAMIS</strong>. Harmadik lehetőség nincs!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-2">
            <div className="p-3 bg-emerald-50/80 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-800 dark:text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Ezek ÁLLÍTÁSOK:</span>
              </div>
              <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-300 list-disc list-inside">
                <li>„Minden páros szám osztható 2-vel.” → <strong>IGAZ</strong></li>
                <li>„A 15 osztható 4-gyel.” → <strong>HAMIS</strong></li>
                <li>„Két páratlan szám összege páros.” → <strong>IGAZ</strong></li>
              </ul>
            </div>

            <div className="p-3 bg-rose-50/80 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-800 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-xs text-rose-800 dark:text-rose-300">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>Ezek NEM állítások:</span>
              </div>
              <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-300 list-disc list-inside">
                <li>„Tanulj sokat a matekórára!” → <em>felszólítás</em></li>
                <li>„Hány osztója van a 36-nak?” → <em>kérdés</em></li>
                <li>„A matek a legszebb tantárgy.” → <em>vélemény</em></li>
              </ul>
            </div>
          </div>
        </TheoryCard>

        <TheoryCard title="Állítás Tagadása (Negáció)">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
            Egy állítás tagadása pontosan akkor <strong>igaz</strong>, ha az eredeti állítás hamis, és pontosan akkor <strong>hamis</strong>, ha az eredeti igaz.
          </p>
          <div className="p-3 bg-indigo-50/60 dark:bg-indigo-950/30 rounded-xl border border-indigo-200 dark:border-indigo-800 text-xs space-y-1.5">
            <div>
              <strong>Eredeti:</strong> „A 24 osztható 3-mal.” (Igaz)
            </div>
            <div>
              <strong>Tagadás:</strong> „A 24 <em>nem</em> osztható 3-mal.” (Hamis)
            </div>
          </div>
        </TheoryCard>

        <TheoryTrapBox title="A Legnagyobb Logikai Csapda: A „Minden” és a „Van olyan” tagadása!">
          <div className="space-y-2 text-xs leading-relaxed">
            <p>
              Ha egy állítás azt mondja, hogy <strong>„Minden számra teljesül...”</strong>, akkor a tagadásához <strong>NEM KELL</strong> az, hogy semmire se teljesüljön! Elég, ha <strong>legalább egyetlenegy olyan szám van, amire NEM teljesül</strong>!
            </p>
            <div className="p-3 bg-rose-50 dark:bg-rose-950/50 rounded-lg border border-rose-200 dark:border-rose-900/60 space-y-1.5 text-rose-900 dark:text-rose-200 font-medium">
              <div>
                ❌ <strong>TÉVHIT:</strong> „Minden prímszám páratlan” tagadása az, hogy „Minden prímszám páros”. (Ez teljesen hibás!)
              </div>
              <div>
                ✔️ <strong>HELYES TAGADÁS:</strong> „<em>Van olyan</em> prímszám, amelyik <em>nem</em> páratlan.” (És ez igaz is, hiszen a <strong>2</strong> páros prím!)
              </div>
            </div>
          </div>
        </TheoryTrapBox>
      </TheorySection>

      {/* 2. SZEKCIÓ: FELTÉTELES ÁLLÍTÁSOK ÉS MEGFORDÍTÁSUK */}
      <TheorySection
        number={2}
        title="2. Feltételes Állítások és a Megfordításuk („Ha A, akkor B”)"
        badgeColor="blue"
        icon={<ArrowRight className="w-6 h-6 text-blue-600" />}
      >
        <TheoryCard title="A matematikai tételek szerkezete">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
            A legtöbb matematikai összefüggés feltételes állítás formájában fogalmazható meg:
          </p>
          <div className="p-3.5 bg-blue-50/70 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800 text-center font-bold text-sm sm:text-base text-blue-900 dark:text-blue-200">
            „Ha <em>A</em> igaz, akkor <em>B</em> is igaz” &nbsp; (A ⟹ B)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-xs">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <strong className="text-blue-700 dark:text-blue-300">A (Feltétel / Premissza):</strong>
              <div className="text-slate-600 dark:text-slate-400 mt-0.5">Amit feltételezünk, amiből kiindulunk.</div>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <strong className="text-emerald-700 dark:text-emerald-300">B (Következmény / Konklúzió):</strong>
              <div className="text-slate-600 dark:text-slate-400 mt-0.5">Ami a feltételből logikusan következik.</div>
            </div>
          </div>
        </TheoryCard>

        <TheoryCard title="Az Állítás Megfordítása (B ⟹ A)">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
            Egy állítás <strong>megfordítását</strong> úgy kapjuk, hogy <strong>megcseréljük a feltételt és a következményt</strong>:
          </p>
          <div className="p-3 bg-amber-50/70 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 text-center font-bold text-sm text-amber-900 dark:text-amber-200">
            „Ha <em>B</em> igaz, akkor <em>A</em> is igaz” &nbsp; (B ⟹ A)
          </div>

          <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold shrink-0">Eredeti</span>
              <div>
                „Ha egy szám osztható 10-zel, akkor osztható 5-tel is.” → <strong>IGAZ</strong> (mert minden 0-ra végződő szám 5-re vagy 0-ra is végződik).
              </div>
            </div>
            <div className="flex items-start gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
              <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 font-bold shrink-0">Megfordítás</span>
              <div>
                „Ha egy szám osztható 5-tel, akkor osztható 10-zel is.” → <strong>HAMIS!</strong>
              </div>
            </div>
          </div>
        </TheoryCard>

        <TheoryCallout variant="warning" title="Aranyszabály: Az Igaz Állítás Megfordítása NEM Feltétlenül Igaz!">
          <div className="text-xs space-y-1.5 leading-relaxed">
            <p>
              Gyakori hiba azt hinni, hogy ha egy tétel igaz, akkor a megfordítása is automatikusan igaz. <strong>Nem!</strong>
            </p>
            <p>
              Egy állítás megdöntéséhez (cáfolásához) a matematikában pontosan <strong>EGYETLEN ELLENPÉLDA</strong> felmutatása elegendő!
            </p>
            <div className="font-semibold text-amber-900 dark:text-amber-200">
              Ellenpélda: A <strong>15</strong> és a <strong>35</strong> osztható 5-tel, de <strong>nem</strong> osztható 10-zel. Ezzel a megfordítás elbukott!
            </div>
          </div>
        </TheoryCallout>
      </TheorySection>

      {/* 3. SZEKCIÓ: SZÜKSÉGES ÉS ELÉGSÉGES FELTÉTELEK */}
      <TheorySection
        number={3}
        title="3. Szükséges és Elégséges Feltételek"
        badgeColor="purple"
        icon={<Scale className="w-6 h-6 text-purple-600" />}
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          A matematikai gondolkodás egyik legfontosabb eszköze annak tisztázása, hogy egy feltétel <em>elengedhetetlen</em> (szükséges), vagy már <em>önmagában garancia</em> (elégséges).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Szükséges Feltétel" badge="Elengedhetetlen">
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
              Olyan feltétel, amely <strong>nélkül az állítás biztosan nem teljesülhet</strong>.
            </p>
            <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800 text-xs space-y-1.5">
              <div className="font-bold text-purple-900 dark:text-purple-200">
                Példa: „A páros számok vizsgálata a 6-os oszthatósághoz”
              </div>
              <div className="text-slate-700 dark:text-slate-300">
                Ahhoz, hogy egy szám osztható legyen 6-tal, <strong>SZÜKSÉGES</strong>, hogy páros legyen. Ha egy szám páratlan, már szóba sem jöhet a 6-os oszthatóság!
              </div>
              <div className="text-[11px] text-purple-700 dark:text-purple-400 font-semibold pt-1 border-t border-purple-200 dark:border-purple-800">
                Viszont önmagában NEM elégséges: pl. a 14 páros, mégsem osztható 6-tal!
              </div>
            </div>
          </TheoryCard>

          <TheoryCard title="Elégséges Feltétel" badge="Garancia">
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
              Olyan feltétel, amely <strong>önmagában garantálja a következmény bekövetkeztét</strong>.
            </p>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs space-y-1.5">
              <div className="font-bold text-emerald-900 dark:text-emerald-200">
                Példa: „Utolsó számjegy 0 az 5-ös oszthatósághoz”
              </div>
              <div className="text-slate-700 dark:text-slate-300">
                Ha egy szám utolsó jegye 0, az <strong>ELÉGSÉGES</strong> ahhoz, hogy a szám osztható legyen 5-tel. Nem kell semmi mást ellenőrizni, a siker garantált!
              </div>
              <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold pt-1 border-t border-emerald-200 dark:border-emerald-800">
                Viszont NEM szükséges: a 35 utolsó jegye 5, és mégis osztható 5-tel!
              </div>
            </div>
          </TheoryCard>
        </div>

        <div className="my-4">
          <TheoryCard title="Szükséges és Elégséges Feltétel (Akkor és csak akkor / A ⟺ B)">
            <p className="text-xs text-slate-700 dark:text-slate-300 mb-2">
              Ha az állítás és a megfordítása is <strong>egyszerre igaz</strong>, akkor a feltétel <strong>szükséges ÉS elégséges</strong>. Ezt hívjuk <strong>ekvivalenciának</strong>.
            </p>
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800 text-xs space-y-1">
              <div className="font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5">
                <ArrowLeftRight className="w-4 h-4 text-indigo-600" />
                <span>Példa a 9-cel való oszthatóságra:</span>
              </div>
              <div className="text-slate-700 dark:text-slate-300">
                Egy szám <strong>akkor és csak akkor</strong> osztható 9-cel, <strong>ha a számjegyeinek összege osztható 9-cel</strong>.
              </div>
              <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-1">
                (Ha az összeg osztható 9-cel, a szám is. És ha a szám osztható 9-cel, az összeg is.)
              </div>
            </div>
          </TheoryCard>
        </div>

        <TheoryTable
          headers={['Feltétel (A)', 'Következmény (B)', 'Kapcsolat típusa', 'Indoklás']}
          rows={[
            [
              'A szám osztható 10-zel',
              'A szám osztható 5-tel',
              'Elégséges, de nem szükséges',
              '10-zel oszthatóság garantálja az 5-öt, de 25 is osztható 5-tel'
            ],
            [
              'A szám utolsó jegye páros',
              'A szám osztható 6-tal',
              'Szükséges, de nem elégséges',
              'Páratlan szám nem lehet 6-tal osztható, de 8 páros és nem osztható 6-tal'
            ],
            [
              'Számjegyösszeg osztható 3-mal',
              'A szám osztható 3-mal',
              'Szükséges ÉS elégséges',
              'Mindkét irányban igaz tétel (A ⟺ B)'
            ],
            [
              'A szám osztható 100-zal',
              'A szám osztható 25-tel',
              'Elégséges, de nem szükséges',
              '100-as osztó garantálja a 25-öt, de 75 is osztható 25-tel'
            ],
            [
              'A szám osztható 4-gyel',
              'A szám páros',
              'Elégséges, de nem szükséges',
              'Minden 4-gyel osztható páros, de a 6 is páros és nem osztható 4-gyel'
            ]
          ]}
        />
      </TheorySection>

      {/* 4. SZEKCIÓ: ESETSZÉTVÁLASZTÁSOS BIZONYÍTÁSOK */}
      <TheorySection
        number={4}
        title="4. Esetszétválasztásos Bizonyítások a Számelméletben"
        badgeColor="emerald"
        icon={<ShieldCheck className="w-6 h-6 text-emerald-600" />}
      >
        <div className="space-y-4">
          <TheoryCard title="1. Tétel: Két egymást követő egész szám szorzata mindig páros">
            <p className="text-xs text-slate-700 dark:text-slate-300 mb-2">
              Jelöljünk két egymást követő egész számot: <strong>n</strong> és <strong>n + 1</strong>. Szorzatuk: <strong>n · (n + 1)</strong>.
            </p>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs space-y-2">
              <div className="font-bold text-emerald-900 dark:text-emerald-200">Bizonyítás esetszétválasztással:</div>
              <div className="space-y-1.5 text-slate-700 dark:text-slate-300">
                <div>
                  <strong>1. Eset:</strong> Ha <em>n</em> páros, akkor a szorzat tartalmaz páros tényezőt, így a szorzat <strong>páros</strong>.
                </div>
                <div>
                  <strong>2. Eset:</strong> Ha <em>n</em> páratlan, akkor a rákövetkező <em>n + 1</em> kötelezően páros, így a szorzat ekkor is <strong>páros</strong>.
                </div>
              </div>
              <div className="text-emerald-800 dark:text-emerald-300 font-semibold pt-1 border-t border-emerald-200 dark:border-emerald-800">
                Következtetés: Mivel minden egész szám vagy páros, vagy páratlan, a szorzat minden esetben osztható 2-vel!
              </div>
            </div>
          </TheoryCard>

          <TheoryCard title="2. Tétel: Három egymást követő szám szorzata mindig osztható 6-tal">
            <p className="text-xs text-slate-700 dark:text-slate-300 mb-2">
              Legyen a három szám: <strong>n · (n + 1) · (n + 2)</strong>.
            </p>
            <div className="p-3 bg-teal-50 dark:bg-teal-950/30 rounded-xl border border-teal-200 dark:border-teal-800 text-xs space-y-2">
              <div className="font-bold text-teal-900 dark:text-teal-200">Bizonyítás két lépésben:</div>
              <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 list-disc list-inside">
                <li>
                  <strong>2-vel oszthatóság:</strong> Három egymást követő szám közül legalább egy páros (gyakran kettő is). Így a szorzat osztható 2-vel.
                </li>
                <li>
                  <strong>3-mal oszthatóság:</strong> Három egymást követő szám közül pontosan egy szám 3-mal osztható (maradékaik: 0, 1, 2). Így a szorzat osztható 3-mal.
                </li>
              </ul>
              <div className="text-teal-800 dark:text-teal-300 font-semibold pt-1 border-t border-teal-200 dark:border-teal-800">
                Mivel 2 és 3 relatív prímek, a szorzat osztható 2 · 3 = 6-tal is! (Pl. 4 · 5 · 6 = 120, ami : 6 = 20).
              </div>
            </div>
          </TheoryCard>

          <TheoryCard title="3. Tétel: Két egymást követő páratlan szám összege mindig osztható 4-gyel">
            <p className="text-xs text-slate-700 dark:text-slate-300 mb-2">
              Írjunk fel két szomszédos páratlan számot: <strong>2k + 1</strong> és <strong>2k + 3</strong> (ahol k egész szám).
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1.5">
              <div className="font-mono font-bold text-sm text-indigo-700 dark:text-indigo-300 text-center py-1">
                (2k + 1) + (2k + 3) = 4k + 4 = 4 · (k + 1)
              </div>
              <div className="text-slate-700 dark:text-slate-300">
                Mivel az összeg felírható 4 és egy egész szám szorzataként, az eredmény <strong>bármilyen két szomszédos páratlan szám esetén biztosan osztható 4-gyel</strong>!
              </div>
              <div className="text-slate-500 dark:text-slate-400">
                Példák: 1 + 3 = 4 (4 : 4 = 1 ✓), 5 + 7 = 12 (12 : 4 = 3 ✓), 29 + 31 = 60 (60 : 4 = 15 ✓).
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. INTERAKTÍV LOGIKAI IGAZSÁGVIZSGÁLÓ ÉS FELTÉTELELEMZŐ LABOR (A LEGALJÁN) */}
      <div className="my-10 p-5 sm:p-7 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-blue-500/10 rounded-2xl border-2 border-indigo-300 dark:border-indigo-700/60 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Interaktív Logikai Igazságvizsgáló és Feltételelemző Labor
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Válassz ki egy állításpárt, és vizsgáld meg azonnal az oda-vissza következtetéseket, a szükséges/elégséges kapcsolatot és az ellenpéldákat!
              </p>
            </div>
          </div>
        </div>

        {/* Preset Selector Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {PRESET_STATEMENTS.map(item => {
            const isSelected = selectedPresetId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedPresetId(item.id)}
                className={cn(
                  "px-3 py-1.5 text-xs font-bold rounded-xl border-2 transition-all cursor-pointer",
                  isSelected
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-slate-700"
                )}
              >
                {item.context}
              </button>
            );
          })}
        </div>

        {/* Statement Comparison Workspace */}
        <div className="bg-white dark:bg-slate-850 p-5 rounded-2xl border border-indigo-200 dark:border-indigo-800 shadow-sm space-y-5 animate-in fade-in duration-200">
          {/* Conditions comparison banner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
              <div className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                „A” Feltétel
              </div>
              <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                {activeStatement.conditionA}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-purple-50/80 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800">
              <div className="text-[10px] font-black uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-1">
                „B” Következmény
              </div>
              <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                {activeStatement.consequenceB}
              </div>
            </div>
          </div>

          {/* Direct implications & reverses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* A -> B */}
            <div className={cn(
              "p-4 rounded-xl border-2 space-y-2",
              activeStatement.aImpliesB
                ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-700"
                : "bg-rose-50/50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-700"
            )}>
              <div className="flex items-center justify-between">
                <span className="font-black text-xs uppercase tracking-wider">
                  Eredeti állítás: A ⟹ B
                </span>
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-xs font-bold",
                  activeStatement.aImpliesB
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                    : "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200"
                )}>
                  {activeStatement.aImpliesB ? '✓ IGAZ' : '✗ HAMIS'}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                „Ha {activeStatement.conditionA.toLowerCase()}, akkor {activeStatement.consequenceB.toLowerCase()}.”
              </p>
              {activeStatement.counterexampleAtoB && (
                <div className="p-2 rounded bg-rose-100/70 dark:bg-rose-950/50 text-rose-800 dark:text-rose-300 text-xs font-semibold">
                  Ellenpélda: {activeStatement.counterexampleAtoB}
                </div>
              )}
            </div>

            {/* B -> A */}
            <div className={cn(
              "p-4 rounded-xl border-2 space-y-2",
              activeStatement.bImpliesA
                ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-700"
                : "bg-rose-50/50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-700"
            )}>
              <div className="flex items-center justify-between">
                <span className="font-black text-xs uppercase tracking-wider">
                  Megfordítás: B ⟹ A
                </span>
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-xs font-bold",
                  activeStatement.bImpliesA
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                    : "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200"
                )}>
                  {activeStatement.bImpliesA ? '✓ IGAZ' : '✗ HAMIS'}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                „Ha {activeStatement.consequenceB.toLowerCase()}, akkor {activeStatement.conditionA.toLowerCase()}.”
              </p>
              {activeStatement.counterexampleBtoA && (
                <div className="p-2 rounded bg-rose-100/70 dark:bg-rose-950/50 text-rose-800 dark:text-rose-300 text-xs font-semibold">
                  Ellenpélda: {activeStatement.counterexampleBtoA}
                </div>
              )}
            </div>
          </div>

          {/* Logic conclusions tags */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-[10px] font-bold text-slate-500 uppercase">Szükséges feltétel?</div>
              <div className={cn(
                "font-black text-sm mt-0.5",
                activeStatement.isNecessary ? "text-emerald-600 dark:text-emerald-400" : "text-slate-600 dark:text-slate-400"
              )}>
                {activeStatement.isNecessary ? '✓ B szükséges A-hoz' : '✗ Nem szükséges'}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-[10px] font-bold text-slate-500 uppercase">Elégséges feltétel?</div>
              <div className={cn(
                "font-black text-sm mt-0.5",
                activeStatement.isSufficient ? "text-emerald-600 dark:text-emerald-400" : "text-slate-600 dark:text-slate-400"
              )}>
                {activeStatement.isSufficient ? '✓ A elégséges B-hez' : '✗ Nem elégséges'}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-[10px] font-bold text-slate-500 uppercase">Ekvivalencia (A ⟺ B)?</div>
              <div className={cn(
                "font-black text-sm mt-0.5",
                activeStatement.isEquivalent ? "text-indigo-600 dark:text-indigo-400" : "text-slate-500 dark:text-slate-400"
              )}>
                {activeStatement.isEquivalent ? '✓ Akkor és csak akkor' : '✗ Nem egyenértékű'}
              </div>
            </div>
          </div>

          {/* Detailed explanation */}
          <div className="p-3.5 bg-indigo-50/40 dark:bg-indigo-950/20 rounded-xl border border-indigo-100 dark:border-indigo-900/50 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <span className="font-bold text-indigo-900 dark:text-indigo-200">Részletes matematikai indoklás: </span>
            {activeStatement.explanation}
          </div>
        </div>
      </div>
    </TheoryTemplate>
  );
};

export default LogicTheory;
