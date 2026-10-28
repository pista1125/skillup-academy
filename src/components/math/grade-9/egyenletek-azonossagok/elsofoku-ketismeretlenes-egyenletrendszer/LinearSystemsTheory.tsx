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
  Repeat,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Sliders,
  Calculator,
  Trophy,
  HelpCircle,
  Hash,
  XCircle,
  GitCompare,
  TrendingUp
} from 'lucide-react';
import {
  LinearSystemComparisonSvg,
  SystemIntersectionSvg,
  SubstitutionWorkflowSvg,
  EliminationWorkflowSvg
} from './LinearSystemsFigures';

interface LinearSystemsTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const LinearSystemsTheory: React.FC<LinearSystemsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV EGYENLETRENDSZER LABOR ÁLLAPOTOK ---
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [showMethod, setShowMethod] = useState<'substitution' | 'elimination'>('substitution');

  const systemPresets = [
    {
      title: '1. Egyszerű Összeadás (Ellentett y-ok)',
      eq1: 'x + y = 7',
      eq2: '2x - y = 8',
      methodRecommended: 'elimination',
      steps: [
        'I. x + y = 7 és II. 2x - y = 8',
        'Vegyük észre, hogy az y együtthatói ellentettek (+1 és -1)!',
        'Adjuk össze a két egyenletet: (x + 2x) + (y - y) = 7 + 8',
        '3x = 15 → x = 5',
        'Helyettesítsük vissza az I. egyenletbe: 5 + y = 7 → y = 2',
        'Megoldáshalmaz: M = {(5; 2)}'
      ],
      solution: '(5; 2)',
      check1: '5 + 2 = 7 (Igaz)',
      check2: '2·5 - 2 = 10 - 2 = 8 (Igaz)'
    },
    {
      title: '2. Kifejezett Ismeretlen (Behelyettesítés)',
      eq1: 'x = 2y + 1',
      eq2: '3x + 4y = 23',
      methodRecommended: 'substitution',
      steps: [
        'I. x = 2y + 1 és II. 3x + 4y = 23',
        'Az I. egyenletben x már ki van fejezve y segítségével!',
        'Helyettesítsük be x helyére a (2y + 1) kifejezést a II. egyenletbe:',
        '3 · (2y + 1) + 4y = 23 → 6y + 3 + 4y = 23',
        '10y + 3 = 23 → 10y = 20 → y = 2',
        'Számítsuk ki x értékét: x = 2 · 2 + 1 = 5',
        'Megoldáshalmaz: M = {(5; 2)}'
      ],
      solution: '(5; 2)',
      check1: '5 = 2·2 + 1 (Igaz)',
      check2: '3·5 + 4·2 = 15 + 8 = 23 (Igaz)'
    },
    {
      title: '3. Párhuzamos Egyenesek (Ellentmondás)',
      eq1: '2x + 4y = 10',
      eq2: 'x + 2y = 8',
      methodRecommended: 'elimination',
      steps: [
        'I. 2x + 4y = 10 és II. x + 2y = 8',
        'Szorozzuk meg a II. egyenletet 2-vel: 2x + 4y = 16',
        'Vonjuk ki az I. egyenletből az új II. egyenletet:',
        '(2x - 2x) + (4y - 4y) = 10 - 16',
        '0 = -6  (Ellentmondás!)',
        'Az egyenesek párhuzamosak, nincs metszéspontjuk: M = ∅'
      ],
      solution: '∅ (Nincs megoldás)',
      check1: 'Az együtthatók aránya azonos (2:1 és 4:2), de a konstansok nem (10:8)',
      check2: 'Párhuzamos egyenesek, üres halmaz'
    },
    {
      title: '4. Fejek és Lábak Szöveges Rendszer',
      eq1: 'cs + ny = 35 (fejek)',
      eq2: '2cs + 4ny = 94 (lábak)',
      methodRecommended: 'substitution',
      steps: [
        'I. cs + ny = 35  (fejek száma)',
        'II. 2cs + 4ny = 94  (lábak száma)',
        'Fejezzük ki a csirkék számát: cs = 35 - ny',
        'Helyettesítsük be a II.-be: 2 · (35 - ny) + 4ny = 94',
        '70 - 2ny + 4ny = 94 → 2ny = 24 → ny = 12 nyúl',
        'Csirkék száma: cs = 35 - 12 = 23 csirke',
        'Megoldás: 12 nyúl és 23 csirke van az udvaron.'
      ],
      solution: 'cs = 23, ny = 12',
      check1: '23 + 12 = 35 fej (Igaz)',
      check2: '23·2 + 12·4 = 46 + 48 = 94 láb (Igaz)'
    }
  ];

  const currentPreset = systemPresets[selectedPresetIndex];

  return (
    <TheoryTemplate
      title="Elsőfokú Kétismeretlenes Egyenletrendszerek"
      subtitle="A behelyettesítő és egyenlő együtthatók módszere, grafikus metszéspontok és kétismeretlenes szöveges feladatok"
      badgeText="9. OSZTÁLY • III. EGYENLETEK ÉS AZONOSSÁGOK • 9. TÉMAKÖR"
      themeColor="rose"
      documentId="linear-systems-theory"
      pdfFilename="9_osztaly_egyenletrendszerek.pdf"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'Az Egyenletrendszerek Megoldási Módszereinek Aranyszabálya',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1.5 text-left font-bold text-xs sm:text-sm">
            <div>
              <span className="text-rose-700 dark:text-rose-400 font-black">1. Behelyettesítő módszer: </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">
                Ha valamelyik ismeretlen együtthatója 1 vagy -1 (pl. x = 2y - 3), fejezd ki és helyettesítsd a másikba!
              </span>
            </div>
            <div>
              <span className="text-red-700 dark:text-red-400 font-black">2. Egyenlő együtthatók módszere: </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">
                Szorozd meg az egyenleteket úgy, hogy az egyik változó együtthatói ellentettek legyenek (+k és -k), majd add össze az egyenleteket!
              </span>
            </div>
            <div>
              <span className="text-purple-700 dark:text-purple-400 font-black">3. Eredmény formátuma: </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">
                A megoldás MINDIG egy rendezett számpár: (x; y). Mindkét egyenletbe visszahelyettesítve ellenőrizendő!
              </span>
            </div>
          </div>
        )
      }}
    >
      {/* ============================================================ */}
      {/* 1. FEJEZET: MI AZ EGYENLETRENDSZER?                          */}
      {/* ============================================================ */}
      <TheorySection
        title="1. Az Elsőfokú Kétismeretlenes Egyenletrendszer Fogalma"
        badge="Alapfogalmak"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Kétismeretlenes elsőfokú egyenletrendszerről akkor beszélünk, ha <strong>két olyan egyenletünk van</strong>, amelyekben két ismeretlen (leggyakrabban <span className="font-mono font-bold text-red-600">x</span> és <span className="font-mono font-bold text-rose-600">y</span>) szerepel az első hatványon, és olyan számpárt keresünk, amely <strong>mindkét egyenletet egyszerre kielégíti</strong>.
            </p>
            <TheoryCallout
              icon={<Repeat className="w-5 h-5 text-red-600" />}
              title="A Megoldás egy Rendezett Számpár!"
              color="red"
            >
              Az egyenletrendszer megoldása nem egyetlen szám, hanem egy <strong>rendezett számpár: (x₀; y₀)</strong>! A jelölésnél az x értéke mindig az első, az y értéke a második helyen áll: <span className="font-mono font-bold">M = &#123;(x₀; y₀)&#125;</span>.
            </TheoryCallout>
          </div>
          <div className="flex justify-center">
            <LinearSystemComparisonSvg size={340} />
          </div>
        </div>
      </TheorySection>

      {/* ============================================================ */}
      {/* 2. FEJEZET: A BEHELYETTESÍTŐ MÓDSZER                         */}
      {/* ============================================================ */}
      <TheorySection
        title="2. A Behelyettesítő Módszer Lépésről Lépésre"
        badge="Algebrai módszer 1"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              A <strong>behelyettesítő módszert</strong> akkor a legcélszerűbb választani, ha valamelyik egyenletben az egyik ismeretlen együtthatója <span className="font-mono font-bold">+1</span> vagy <span className="font-mono font-bold">-1</span> (mert így nem keletkeznek törtek a kifejezéskor!).
            </p>
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 text-xs sm:text-sm space-y-2">
              <div className="font-bold text-red-900 dark:text-red-300">A Behelyettesítés 4 Lépése:</div>
              <ol className="list-decimal pl-5 space-y-1 text-slate-700 dark:text-slate-300">
                <li>Az egyik egyenletből kifejezzük az egyik ismeretlent: pl. <span className="font-mono font-bold">x = 7 - 2y</span>.</li>
                <li>Ezt a kifejezést <strong>zárójelben</strong> behelyettesítjük a <em>másik</em> egyenletbe.</li>
                <li>Megoldjuk az így kapott egyismeretlenes egyenletet y-ra.</li>
                <li>A kapott y-t visszahelyettesítjük a kifejezett x képletébe.</li>
              </ol>
            </div>
          </div>
          <div className="flex justify-center">
            <SubstitutionWorkflowSvg size={340} />
          </div>
        </div>

        <TheoryTrapBox title="Zárójel Elhagyásának Csapdája!">
          <p className="text-xs sm:text-sm">
            Ha pl. <span className="font-mono">x = 2y - 1</span>, és a másik egyenlet <span className="font-mono">3x + 4y = 17</span>, akkor behelyettesítéskor a 3-as szorzót a <strong>teljes kifejezésre</strong> kell alkalmazni: <span className="font-mono text-emerald-600 font-bold">3 · (2y - 1) + 4y = 17</span> (nem pedig <span className="font-mono text-rose-600 font-bold">3 · 2y - 1</span>!).
          </p>
        </TheoryTrapBox>
      </TheorySection>

      {/* ============================================================ */}
      {/* 3. FEJEZET: EGYENLŐ EGYÜTTHATÓK MÓDSZERE                     */}
      {/* ============================================================ */}
      <TheorySection
        title="3. Az Egyenlő Együtthatók (Kiküszöbölés) Módszere"
        badge="Algebrai módszer 2"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Ha egyik ismeretlennek sincs 1-es együtthatója (pl. mindkét egyenletben számok állnak x és y előtt is), a <strong>kiküszöbölés (elimináció)</strong> a leggyorsabb módszer.
            </p>
            <TheoryCallout
              icon={<GitCompare className="w-5 h-5 text-red-600" />}
              title="Ellentett Együtthatók Készítése"
              color="red"
            >
              Szorozzuk meg az egyenleteket alkalmas számokkal úgy, hogy az egyik ismeretlen előtt <strong>egymás ellentettjei</strong> álljanak (pl. +6y és -6y). Ekkor a két egyenlet összeadásakor az y egyszerűen <strong>kiesik</strong>!
            </TheoryCallout>
          </div>
          <div className="flex justify-center">
            <EliminationWorkflowSvg size={340} />
          </div>
        </div>
      </TheorySection>

      {/* ============================================================ */}
      {/* 4. FEJEZET: GRAFIKUS MEGOLDÁS ÉS MEGOLDÁSOK SZÁMA            */}
      {/* ============================================================ */}
      <TheorySection
        title="4. Grafikus Megoldás: Két Egyenes Kölcsönös Helyzete"
        badge="Geometriai szemlélet"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Minden kétismeretlenes elsőfokú egyenlet grafikonja egy <strong>egyenes</strong> a derékszögű koordináta-rendszerben. Az egyenletrendszer megoldása geometriailag a <strong>két egyenes közös pontjait (metszéspontját)</strong> jelenti!
            </p>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border text-xs sm:text-sm space-y-1">
              <div><strong>1. Metsző egyenesek:</strong> pontosan 1 metszéspont van → <span className="font-bold text-emerald-600">1 megoldáspár M = &#123;(x₀; y₀)&#125;</span>.</div>
              <div><strong>2. Párhuzamos egyenesek:</strong> nincs közös pont → <span className="font-bold text-rose-600">Nincs megoldás M = ∅</span>.</div>
              <div><strong>3. Egybeeső egyenesek:</strong> végtelen sok közös pont → <span className="font-bold text-blue-600">Végtelen sok megoldás (Azonosság)</span>.</div>
            </div>
          </div>
          <div className="flex justify-center">
            <SystemIntersectionSvg size={340} />
          </div>
        </div>
      </TheorySection>

      {/* ============================================================ */}
      {/* 5. FEJEZET: KÉTISMERETLENES SZÖVEGES FELADATOK              */}
      {/* ============================================================ */}
      <TheorySection
        title="5. Kétismeretlenes Szöveges Feladatok és Ellenőrzés"
        badge="Gyakorlati alkalmazás"
      >
        <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
          Sok feladat sokkal könnyebben és természetesebben oldható meg <strong>két ismeretlen bevezetésével</strong>, mint eggyel:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <TheoryCard title="Fejek és Lábak típus" color="red">
            Legyen <span className="font-mono font-bold">x</span> a csirkék száma, <span className="font-mono font-bold">y</span> a nyulak száma.<br/>
            I. Fejek: <span className="font-mono font-bold">x + y = 35</span><br/>
            II. Lábak: <span className="font-mono font-bold">2x + 4y = 94</span>
          </TheoryCard>
          <TheoryCard title="Pénzérmék / Bankjegyek" color="rose">
            Legyen <span className="font-mono font-bold">x</span> az 50 Ft-osok, <span className="font-mono font-bold">y</span> a 100 Ft-osok darabszáma.<br/>
            I. Darabszám: <span className="font-mono font-bold">x + y = 20</span><br/>
            II. Összérték: <span className="font-mono font-bold">50x + 100y = 1600</span>
          </TheoryCard>
        </div>

        <TheoryTrapBox title="Az Ellenőrzés Aranyszabálya Egyenletrendszernél!">
          <p className="text-xs sm:text-sm">
            Az egyenletrendszer megoldását <strong>MINDKÉT eredeti egyenletbe</strong> kötelező külön-külön behelyettesíteni! Gyakori hiba, hogy csak az egyik egyenletet ellenőrzik: egy számpár kielégítheti az I. egyenletet úgy is, hogy a II.-ben orbitális hibát ad!
          </p>
        </TheoryTrapBox>
      </TheorySection>
    
      {/* ============================================================ */}
      {/* 6. FEJEZET: GYAKORLATI INTERAKTÍV EGYENLETRENDSZER LABOR     */}
      {/* ============================================================ */}
      <TheorySection
        title="6. Gyakorlati Interaktív Egyenletrendszer Megoldó Labor"
        badge="Interaktív Labor"
      >
        {/* ============================================================ */}
      {/* INTERAKTÍV EGYENLETRENDSZER LABOR                            */}
      {/* ============================================================ */}
      <div className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/20 border-2 border-red-200 dark:border-red-800 rounded-3xl p-6 sm:p-8 shadow-xl mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-red-500 text-white flex items-center justify-center shadow-lg shadow-red-500/30">
              <Calculator className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Interaktív Egyenletrendszer Megoldó Labor
              </h2>
              <p className="text-xs sm:text-sm text-red-700 dark:text-red-300 font-medium">
                Kísérletezz a behelyettesítő és egyenlő együtthatós módszerekkel, lásd a lépéseket és ellenőrzést!
              </p>
            </div>
          </div>
        </div>

        {/* Sablon gombok */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {systemPresets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedPresetIndex(idx)}
              className={`p-3 rounded-xl border text-left transition-all ${
                selectedPresetIndex === idx
                  ? 'border-red-500 bg-white dark:bg-slate-900 shadow-md ring-2 ring-red-400/20'
                  : 'border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 hover:border-red-300'
              }`}
            >
              <div className="text-[11px] font-bold text-slate-500 uppercase">{p.title}</div>
              <div className="font-mono text-xs font-black text-slate-900 dark:text-white my-1">
                {p.eq1}<br/>{p.eq2}
              </div>
              <div className="text-[10px] text-red-600 dark:text-red-400 font-bold">M = {p.solution}</div>
            </button>
          ))}
        </div>

        {/* Megoldás bemutató kártya */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-red-100 dark:border-red-800/60 shadow-md space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs font-bold uppercase text-slate-400">Vizsgált egyenletrendszer:</span>
              <div className="text-xl sm:text-2xl font-black font-mono text-red-600 dark:text-red-400 mt-0.5">
                I. {currentPreset.eq1} &nbsp;|&nbsp; II. {currentPreset.eq2}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Ajánlott módszer:</span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300 uppercase">
                {currentPreset.methodRecommended === 'elimination' ? 'Egyenlő együtthatók' : 'Behelyettesítés'}
              </span>
            </div>
          </div>

          {/* Lépések listája */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase text-slate-400 tracking-wider">Levezetés lépései:</div>
            {currentPreset.steps.map((st, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-mono text-slate-700 dark:text-slate-300 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                <span className="w-5 h-5 rounded-full bg-red-500/10 text-red-600 font-bold flex items-center justify-center shrink-0 text-xs">
                  {i + 1}
                </span>
                <span>{st}</span>
              </div>
            ))}
          </div>

          {/* Kétoldalas ellenőrzés */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-xs text-emerald-900 dark:text-emerald-200">
              <span className="font-bold block mb-1">I. egyenlet ellenőrzése:</span>
              <span className="font-mono">{currentPreset.check1}</span>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-xs text-emerald-900 dark:text-emerald-200">
              <span className="font-bold block mb-1">II. egyenlet ellenőrzése:</span>
              <span className="font-mono">{currentPreset.check2}</span>
            </div>
          </div>
        </div>
      </div>
      </TheorySection>
    
    </TheoryTemplate>
  );
};

