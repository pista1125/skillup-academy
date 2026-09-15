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
import { Card, CardContent } from '@/components/ui/card';
import {
  Brain,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  HelpCircle,
  Layers,
  Sparkles,
  Zap,
  Box,
  Users,
  ShieldCheck,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogicTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const LogicTheory: React.FC<LogicTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive Simulator States
  const [statementTestIdx, setStatementTestIdx] = useState<number>(0);
  const [sockColors, setSockColors] = useState<number>(3); // 3 colors: black, white, blue
  const [islandScenarioIdx, setIslandScenarioIdx] = useState<number>(0);

  const statementExamples = [
    {
      text: 'A 24 osztható 6-tal és 4-gyel is.',
      isStatement: true,
      value: 'Igaz (I)',
      explanation: 'Egyértelműen eldönthető matematikai kijelentés. 24 = 6 · 4, mindkét osztási feltétel teljesül.'
    },
    {
      text: 'Minden négyszögnek 4 derékszöge van.',
      isStatement: true,
      value: 'Hamis (H)',
      explanation: 'Állítás, mert egyértelműen eldönthető, de hamis, hiszen például a trapéznak vagy a rombusznak általában nincsenek derékszögei.'
    },
    {
      text: 'Melyik a kedvenc prímszámod?',
      isStatement: false,
      value: 'Nem állítás',
      explanation: 'Kérdő mondat. Nincs logikai igazságértéke, nem lehet rá azt mondani, hogy „igaz” vagy „hamis”.'
    },
    {
      text: 'Oldd meg a másodfokú egyenletet!',
      isStatement: false,
      value: 'Nem állítás',
      explanation: 'Felszólító mondat / utasítás. Nincs igazságértéke.'
    },
    {
      text: 'A matematika a legszebb tudomány.',
      isStatement: false,
      value: 'Nem matematikai állítás',
      explanation: 'Szubjektív értékítélet / vélemény. Nem objektíven, egyértelműen eldönthető tény.'
    }
  ];

  const islandScenarios = [
    {
      speaker: 'A mondja: „Mindketten lókötők (hazudósok) vagyunk!”',
      question: 'Ki kicsoda?',
      solution: 'A csak Lókötő lehet, B pedig Lovag.',
      steps: [
        '1. Ha A lovag (igazmondó) lenne, akkor az állítása igaz lenne: mindketten lókötők. De ha A lókötő, akkor nem lehet lovag ⟹ Ellentmondás!',
        '2. Ezért A biztosan LÓKÖTŐ (hazudós).',
        '3. Mivel A lókötő, az állítása („mindketten lókötők”) HAMIS.',
        '4. Annak a tagadása, hogy mindketten lókötők, az, hogy legalább egyikük NEM lókötő. Mivel A az, ezért B-nek LOVAGNAK kell lennie.'
      ]
    },
    {
      speaker: 'A mondja: „Legalább egyikünk lókötő!”',
      question: 'Ki kicsoda?',
      solution: 'A Lovag, B pedig Lókötő.',
      steps: [
        '1. Tegyük fel, hogy A lókötő (hazudós). Ekkor az állítása hamis. Az állítás tagadása: egyikük sem lókötő, azaz mindketten lovagok. De A lókötő ⟹ Ellentmondás!',
        '2. Tehát A biztosan LOVAG (igazmondó).',
        '3. Mivel A lovag, az állítása („legalább egyikünk lókötő”) IGAZ.',
        '4. Mivel A maga lovag, a lókötő csak B lehet.'
      ]
    }
  ];

  const activeStatement = statementExamples[statementTestIdx];
  const activeIsland = islandScenarios[islandScenarioIdx];

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      documentId="grade-8-szamok-betuk-logika-feladatok"
      pdfFilename="8_osztaly_logikai_feladatok.pdf"
      title="1. Logikai feladatok"
      subtitle="Matematikai állítások és igazságértékek, tagadás (negáció), összetett állítások, Skatulya-elv és következtetési feladványok"
      quickRule={{
        label: "Skatulya-elv alapszabálya",
        formula: "n + 1 tárgy  ⟶  n skatulya  ⟹  legalább egyben legalább 2 db"
      }}
      themeColor="blue"
    >
      {/* 1. FEJEZET: Matematikai állítások fogalma */}
      <TheorySection
        number={1}
        title="Matematikai állítások és logikai értékük"
        icon={<Brain className="w-5 h-5 text-blue-600" />}
        badgeColor="blue"
      >
        <TheoryCallout variant="info" title="Mi a matematikai állítás (kijelentés)?">
          A matematikában <strong>állításnak (kijelentésnek)</strong> nevezünk minden olyan kijelentő mondatot, amelyről egyértelműen és objektíven eldönthető, hogy <strong>igaz (I)</strong> vagy <strong>hamis (H)</strong>. Az igaz és a hamis értékeket az állítás <em>logikai értékének</em> nevezzük.
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Mi MINŐSÜL állításnak?"
            icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            variant="emerald"
            badge="Egyértelmű tény"
          >
            <ul className="text-xs space-y-2 text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-1.5">
                <span className="font-bold text-emerald-600">✓</span>
                <span>„A 17 prímszám.” ⟹ <strong>Igaz állítás (I)</strong></span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="font-bold text-emerald-600">✓</span>
                <span>„A háromszög belső szögeinek összege 360°.” ⟹ <strong>Hamis állítás (H)</strong> (mert 180°)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="font-bold text-emerald-600">✓</span>
                <span>„Minden páros szám osztható 4-gyel.” ⟹ <strong>Hamis állítás (H)</strong> (pl. a 6 vagy a 10 nem)</span>
              </li>
            </ul>
          </TheoryCard>

          <TheoryCard
            title="Mi NEM állítás?"
            icon={<XCircle className="w-4 h-4 text-rose-600" />}
            variant="rose"
            badge="Nincs igazságértéke"
          >
            <ul className="text-xs space-y-2 text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-1.5">
                <span className="font-bold text-rose-600">✗</span>
                <span><strong>Kérdés:</strong> „Hány oldalú a szabályos sokszög?”</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="font-bold text-rose-600">✗</span>
                <span><strong>Felszólítás / kérés:</strong> „Nyisd ki a tankönyvet!”</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="font-bold text-rose-600">✗</span>
                <span><strong>Szubjektív vélemény:</strong> „A geometria sokkal könnyebb, mint az algebra.”</span>
              </li>
            </ul>
          </TheoryCard>
        </div>

        {/* Interactive Statement Tester */}
        <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-blue-600 dark:text-blue-400">
              Interaktív Példatár: Állítás vagy sem?
            </span>
            <span className="text-[11px] text-slate-400">
              {statementTestIdx + 1} / {statementExamples.length}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {statementExamples.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setStatementTestIdx(idx)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                  statementTestIdx === idx
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-300"
                )}
              >
                {idx + 1}. Mondat
              </button>
            ))}
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              „{activeStatement.text}”
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className={cn(
                "px-2.5 py-0.5 rounded-md font-bold text-[11px]",
                activeStatement.isStatement
                  ? activeStatement.value.startsWith('Igaz') ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300" : "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300"
                  : "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
              )}>
                {activeStatement.value}
              </span>
              <span className="text-slate-600 dark:text-slate-400 font-medium">
                {activeStatement.explanation}
              </span>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 2. FEJEZET: Állítások tagadása (Negáció) */}
      <TheorySection
        number={2}
        title="Állítások tagadása (Negáció) és a leggyakoribb hibák"
        icon={<AlertTriangle className="w-5 h-5 text-amber-600" />}
        badgeColor="amber"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Egy <em>A</em> állítás <strong>tagadása (negációja)</strong> az az állítás, amely pontosan akkor igaz, ha <em>A</em> hamis, és akkor hamis, ha <em>A</em> igaz. Jelölése: ¬<em>A</em> vagy <em>Ā</em> („nem <em>A</em>”).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="1. Csapda: Ellentétes kifejezések használata tagadás helyett"
            wrong="„Péter magas.” ⟹ Tagadása: „Péter alacsony.” ❌"
            correct="„Péter nem magas.” (azaz lehet átlagos testmagasságú is) ✔"
            explanation="A tagadás nem az ellentétet jelenti, hanem a kijelentés érvénytelenségét. Ha Péter 175 cm (átlagos), akkor a 'magas' és az 'alacsony' állítás is hamis lenne!"
          />

          <TheoryTrapBox
            title="2. Csapda: Számok előjelének és nagyságának tagadása"
            wrong="„Az x szám pozitív.” ⟹ Tagadása: „Az x szám negatív.” ❌"
            correct="„Az x szám nem pozitív.” (azaz x negatív VAGY nulla: x ≤ 0) ✔"
            explanation="A nulla (0) se nem pozitív, se nem negatív! Ezért a pozitív tagadása a nemnegatív ellentettje: a nempozitív (nulla vagy negatív)."
          />
        </div>

        {/* Quantifiers: Minden vs Van olyan */}
        <TheoryCard
          title="A legfontosabb szabály: „MINDEN” és „VAN OLYAN” (LÉTEZIK) állítások tagadása"
          icon={<Sparkles className="w-4 h-4 text-purple-600" />}
          variant="purple"
        >
          <TheoryTable
            headers={['Eredeti állítás', 'Helytelen tagadás (Tévhit)', 'Helyes tagadás (Szabály)']}
            rows={[
              [
                '„Minden madár tud repülni.”',
                '„Egyik madár sem tud repülni.” ❌',
                '„Van olyan madár, amelyik nem tud repülni.” (vagy „Nem minden madár...”) ✔'
              ],
              [
                '„Minden páros szám osztható 4-gyel.”',
                '„Egyetlen páros szám sem osztható 4-gyel.” ❌',
                '„Van olyan páros szám, amely nem osztható 4-gyel.” (pl. a 6) ✔'
              ],
              [
                '„Van olyan diák, aki kitűnő.”',
                '„Van olyan diák, aki nem kitűnő.” ❌',
                '„Egyetlen diák sem kitűnő.” (vagy „Minden diák nem kitűnő.”) ✔'
              ]
            ]}
          />
        </TheoryCard>
      </TheorySection>

      {/* 3. FEJEZET: Összetett állítások: ÉS és VAGY */}
      <TheorySection
        number={3}
        title="Összetett állítások: Az „ÉS” és a „VAGY” kötőszavak"
        icon={<Layers className="w-5 h-5 text-indigo-600" />}
        badgeColor="indigo"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="1. „ÉS” művelet (Konjunkció: A ∧ B)"
            icon={<Zap className="w-4 h-4 text-indigo-600" />}
            variant="indigo"
            badge="Mindkettő kötelező"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Az „<em>A</em> ÉS <em>B</em>” (<em>A</em> ∧ <em>B</em>) összetett állítás <strong>csak akkor IGAZ</strong>, ha az <em>A</em> és a <em>B</em> állítás <strong>egyszerre mindkettő igaz</strong>. Ha bármelyik hamis, az összetett állítás hamis.
            </p>
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-indigo-100 dark:border-slate-800 text-xs font-mono">
              „A 12 osztható 3-mal ÉS 4-gyel is.” ⟹ <strong className="text-emerald-600">IGAZ</strong> (I ∧ I = I)
            </div>
          </TheoryCard>

          <TheoryCard
            title="2. „VAGY” művelet (Diszjunkció: A ∨ B)"
            icon={<Layers className="w-4 h-4 text-cyan-600" />}
            variant="cyan"
            badge="Legalább az egyik"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              A matematikában a „VAGY” megengedő: az „<em>A</em> VAGY <em>B</em>” (<em>A</em> ∨ <em>B</em>) állítás akkor IGAZ, ha <strong>legalább az egyik</strong> állítás igaz (akár mindkettő is). Csak akkor hamis, ha mindkettő hamis.
            </p>
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-cyan-100 dark:border-slate-800 text-xs font-mono">
              „A 7 páros VAGY prímszám.” ⟹ <strong className="text-emerald-600">IGAZ</strong> (H ∨ I = I, mert prím!)
            </div>
          </TheoryCard>
        </div>

        <TheoryTable
          title="Logikai műveletek igazságtáblázata:"
          headers={['A állítás', 'B állítás', 'A ÉS B (A ∧ B)', 'A VAGY B (A ∨ B)']}
          rows={[
            ['Igaz (I)', 'Igaz (I)', 'IGAZ (I)', 'IGAZ (I)'],
            ['Igaz (I)', 'Hamis (H)', 'Hamis (H)', 'IGAZ (I)'],
            ['Hamis (H)', 'Igaz (I)', 'Hamis (H)', 'IGAZ (I)'],
            ['Hamis (H)', 'Hamis (H)', 'Hamis (H)', 'Hamis (H)']
          ]}
        />
      </TheorySection>

      {/* 4. FEJEZET: Skatulya-elv (Dirichlet-elv) */}
      <TheorySection
        number={4}
        title="A Skatulya-elv (Dirichlet-elv) és a legrosszabb eset elve"
        icon={<Box className="w-5 h-5 text-emerald-600" />}
        badgeColor="emerald"
      >
        <TheoryCallout variant="tip" title="A Skatulya-elv megfogalmazása:">
          Ha <strong>$n + 1$ darab tárgyat</strong> helyezünk el <strong>$n$ darab skatulyába</strong>, akkor biztosan lesz legalább egy olyan skatulya, amelybe <strong>legalább 2 darab tárgy</strong> kerül.
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <TheoryCard title="1. Születésnapok" badge="13 fő" variant="emerald">
            <p className="text-xs text-slate-700 dark:text-slate-300">
              Egy <strong>13 fős</strong> osztályközösségben biztosan van legalább <strong>2 olyan diák</strong>, aki ugyanabban a hónapban született, mert csak 12 hónap (skatulya) van ($13 &gt; 12$).
            </p>
          </TheoryCard>

          <TheoryCard title="2. Zoknihúzás a sötétben" badge="Párosítás" variant="emerald">
            <p className="text-xs text-slate-700 dark:text-slate-300">
              Egy fiókban sok fekete és fehér zokni van összekeverve. Legalább <strong>3 darabot</strong> kell kivennünk vaktában, hogy biztosan legyen köztük egy <strong>egyszínű pár</strong> (2 szín = 2 skatulya, $2+1 = 3$).
            </p>
          </TheoryCard>

          <TheoryCard title="3. Dobókocka dobások" badge="7 dobás" variant="emerald">
            <p className="text-xs text-slate-700 dark:text-slate-300">
              Egy szabályos dobókockával <strong>7-szer</strong> dobva biztosan lesz olyan számérték (1-től 6-ig), amit <strong>legalább kétszer</strong> dobtunk meg ($7 &gt; 6$).
            </p>
          </TheoryCard>
        </div>

        {/* Worst case logic (Legkedvezőtlenebb eset) */}
        <TheoryCard
          title="A „Legrosszabb eset” (Worst-Case) stratégia"
          icon={<HelpCircle className="w-4 h-4 text-emerald-600" />}
          variant="default"
        >
          <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
            <p>
              Gyakori felvételi feladattípus: <em>„Egy dobozban 10 piros, 8 kék és 6 zöld golyó van. Hányat kell kihúzni vaktában, hogy biztosan legyen köztük legalább egy zöld?”</em>
            </p>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-1">
              <div className="font-bold text-emerald-900 dark:text-emerald-200">Megoldási lépések:</div>
              <div>1. Képzeljük el a lehető legpechesebb (legrosszabb) esetet: először kihúzzuk az összes NEM zöld golyót!</div>
              <div>2. Kihúzzuk mind a 10 pirosat + mind a 8 kéket = <strong>18 golyó</strong>.</div>
              <div>3. Ekkor már csak zöld maradt a dobozban, így a következő (a 19.) már <strong>biztosan zöld lesz</strong>!</div>
              <div className="font-black text-emerald-800 dark:text-emerald-300 pt-1">Eredmény: 10 + 8 + 1 = 19 darab golyót kell húzni.</div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 5. FEJEZET: Lovagok és Lókötők logikai feladványai */}
      <TheorySection
        number={5}
        title="Lovagok és Lókötők szigete – Deduktív logikai következtetés"
        icon={<Users className="w-5 h-5 text-purple-600" />}
        badgeColor="purple"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Egy szigeten kétféle ember él: a <strong>Lovagok (L)</strong> mindig igazat mondanak, míg a <strong>Lókötők (K)</strong> mindig hazudnak. Hogyan lehet eldönteni a kijelentéseikből, hogy ki kicsoda?
        </p>

        {/* Interactive Case Analysis */}
        <div className="p-4 bg-purple-50/50 dark:bg-slate-850 rounded-2xl border border-purple-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-purple-700 dark:text-purple-300">
              Interaktív Fejtörő Esettanulmány
            </span>
            <div className="flex gap-1.5">
              {islandScenarios.map((sc, i) => (
                <button
                  key={i}
                  onClick={() => setIslandScenarioIdx(i)}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-bold transition-all",
                    islandScenarioIdx === i
                      ? "bg-purple-600 text-white"
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-purple-200 dark:border-slate-700"
                  )}
                >
                  {i + 1}. Eset
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-purple-100 dark:border-slate-800 space-y-3">
            <div className="font-bold text-sm text-purple-900 dark:text-purple-200">
              {activeIsland.speaker}
            </div>

            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <div className="font-bold text-slate-900 dark:text-white">Levezetés lépésről lépésre:</div>
              {activeIsland.steps.map((st, sIdx) => (
                <div key={sIdx} className="pl-2 border-l-2 border-purple-300 dark:border-purple-700 py-0.5">
                  {st}
                </div>
              ))}
            </div>

            <div className="p-2.5 bg-purple-50 dark:bg-purple-950/40 rounded-lg border border-purple-200 dark:border-purple-800 font-bold text-xs text-purple-900 dark:text-purple-200 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
              <span>Megoldás: {activeIsland.solution}</span>
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default LogicTheory;
