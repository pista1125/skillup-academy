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
  Brain,
  Layers,
  Sparkles,
  CheckCircle2,
  Sliders,
  HelpCircle,
  Lightbulb,
  AlertTriangle,
  RotateCcw,
  Network,
  Package,
  Hash,
  ArrowRight
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';
import { Button } from '@/components/ui/button';

interface CombinatoricsPracticeTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const CombinatoricsPracticeTheory: React.FC<CombinatoricsPracticeTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Lab 1: Digit Number Construction Simulator
  const [lab1Digits, setLab1Digits] = useState<number>(4); // {1,2,3,4} or {0,1,2,3,4}
  const [lab1IncludeZero, setLab1IncludeZero] = useState<boolean>(true);
  const [lab1AllowRepetition, setLab1AllowRepetition] = useState<boolean>(false);
  const [lab1Parity, setLab1Parity] = useState<'all' | 'even' | 'odd'>('all');

  // Compute Lab 1 results
  const calcNumberConstruction = () => {
    // 3-digit numbers formed from digits
    const digits = lab1IncludeZero
      ? Array.from({ length: lab1Digits }, (_, i) => i)
      : Array.from({ length: lab1Digits }, (_, i) => i + 1);

    const evenDigits = digits.filter((d) => d % 2 === 0);
    const oddDigits = digits.filter((d) => d % 2 !== 0);

    let count = 0;
    let explanation = '';

    if (lab1AllowRepetition) {
      const firstPoss = lab1IncludeZero ? digits.length - 1 : digits.length;
      const secondPoss = digits.length;
      let thirdPoss = digits.length;
      if (lab1Parity === 'even') thirdPoss = evenDigits.length;
      if (lab1Parity === 'odd') thirdPoss = oddDigits.length;

      count = firstPoss * secondPoss * thirdPoss;
      explanation = `${firstPoss} · ${secondPoss} · ${thirdPoss} = ${count}`;
    } else {
      // Without repetition for 3-digit number
      // We count manually or systematically
      let valid = 0;
      for (const d1 of digits) {
        if (d1 === 0) continue; // cannot start with 0
        for (const d2 of digits) {
          if (d2 === d1) continue;
          for (const d3 of digits) {
            if (d3 === d1 || d3 === d2) continue;
            if (lab1Parity === 'even' && d3 % 2 !== 0) continue;
            if (lab1Parity === 'odd' && d3 % 2 === 0) continue;
            valid++;
          }
        }
      }
      count = valid;
      explanation = `Összesen ${count} különböző 3-jegyű szám alkotható`;
    }

    return { count, explanation, digitList: digits.join(', ') };
  };

  const lab1Result = calcNumberConstruction();

  // Lab 2: Pigeonhole Principle (Dirichlet-elv)
  const [lab2Pigeons, setLab2Pigeons] = useState<number>(13);
  const [lab2Pigeonholes, setLab2Pigeonholes] = useState<number>(12);

  const guaranteedMaxInHole = Math.ceil(lab2Pigeons / lab2Pigeonholes);

  // Lab 3: Handshake Lemma & Graph Degree Checker
  const [lab3Degrees, setLab3Degrees] = useState<number[]>([3, 3, 2, 2, 2]);

  const degSum = lab3Degrees.reduce((a, b) => a + b, 0);
  const oddDegCount = lab3Degrees.filter((d) => d % 2 !== 0).length;
  const isDegreeSumEven = degSum % 2 === 0;

  return (
    <TheoryTemplate
      title="Kombinatorika Összefoglaló és Feladattár"
      subtitle="9. Osztály • I. Kombinatorika és halmazok • 5. Altéma"
      badgeText="9. OSZTÁLY • I. KOMBINATORIKA, HALMAZOK • 📝 GYAKORLÁS"
      documentId="combinatorics-practice-theory"
      pdfFilename="9_osztaly_kombinatorika_gyakorlas_tananyag.pdf"
      themeColor="rose"
      quickRule={{
        label: 'A Két Legfontosabb Gyakorlati Alaptétel',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1.5 text-left text-xs sm:text-sm font-semibold">
            <div className="flex items-center flex-wrap gap-1.5">
              <span className="px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold text-[11px]">
                Kézfogási Lemma:
              </span>
              <span className="font-mono font-bold text-emerald-900 dark:text-emerald-200">
                ∑ d(v) = 2 · E
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                (a fokszámösszeg mindig páros!)
              </span>
            </div>
            <div className="flex items-center flex-wrap gap-1.5">
              <span className="px-1.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold text-[11px]">
                Dirichlet-elv:
              </span>
              <span className="font-mono font-bold text-amber-900 dark:text-amber-200">
                Ha N &gt; k ⟹ legalább ⌈N / k⌉ elem jut egy skatulyába
              </span>
            </div>
          </div>
        )
      }}
      onBack={onBack}
      practiceTitle="Készen állsz a kombinatorikai tudáspróbára?"
      practiceSubtitle="Tedd próbára magad a 30 válogatott feladatban és mindhárom játékmódban!"
      practiceButtonText="Gyakorló Kvíz Indítása"
      onStartQuiz={onStartQuiz}
    >
      {/* 1. SZEKCIÓ: SZÁMALKOTÁSI ÉS KÓDOLÁSI STRATÉGIÁK */}
      <TheorySection
        number={1}
        title="Számalkotási és Kódolási Típusfeladatok Rendszerezése"
        icon={<Hash className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badge="Számalkotás"
        badgeColor="rose"
      >
        <TheoryCallout
          title="A számalkotási feladatok 3 alapszabálya"
          type="info"
        >
          Amikor megadott számjegyekből készítünk számokat, mindig 3 kulcskérdést kell feltennünk:
          1. **A nulla szerepe:** Valódi többjegyű szám nem kezdődhet 0-val (de kód vagy PIN kód igen!).
          2. **Ismétlődés:** Megengedett-e az azonos számjegyek többszöri használata?
          3. **Megkötések:** Van-e paritási (páros/páratlan), oszthatósági (pl. 5-tel osztható) vagy nagyságrendi feltétel?
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TheoryCard
            title="1. Ismétléssel készített számok"
            color="rose"
            formula="Összes eset = (első jegy) · (többi jegy)^(k-1)"
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              <strong>Példa:</strong> Hány 4-jegyű szám készíthető a {`{0, 1, 2, 3, 4}`} számjegyekből, ha a jegyek ismétlődhetnek?
            </p>
            <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-400">
              <li>• 1. helyiérték (ezresek): 4 választás (a 0 nem lehet!)</li>
              <li>• 2., 3., 4. helyiérték: mindegyikre 5 választás</li>
            </ul>
            <div className="mt-2 p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-center font-mono font-bold text-xs sm:text-sm text-rose-900 dark:text-rose-200">
              4 · 5 · 5 · 5 = 4 · 5³ = 500 szám
            </div>
          </TheoryCard>

          <TheoryCard
            title="2. Ismétlés nélküli számok (fogyó készlet)"
            color="indigo"
            formula="Összes eset = (első) · (második) · (harmadik) · ..."
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              <strong>Példa:</strong> Hány 3-jegyű különböző számjegyű szám készíthető a {`{0, 1, 2, 3, 4}`} halmazból?
            </p>
            <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-400">
              <li>• 1. hely (százasok): 4 választás ({`{1, 2, 3, 4}`})</li>
              <li>• 2. hely (tízesek): 4 választás (a 0 visszalép, de a felhasznált kiesik)</li>
              <li>• 3. hely (egyesek): 3 választás</li>
            </ul>
            <div className="mt-2 p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-center font-mono font-bold text-xs sm:text-sm text-indigo-900 dark:text-indigo-200">
              4 · 4 · 3 = 48 különböző szám
            </div>
          </TheoryCard>
        </div>

        {/* INTERAKTÍV LABOR 1: Számalkotási Feltétel Szimulátor */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-rose-50/50 via-white to-pink-50/40 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 border-2 border-rose-200 dark:border-rose-800/60 my-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-rose-600 text-white shadow-xs">
                <Sliders className="w-4 h-4" />
              </span>
              <div>
                <h4 className="font-black text-sm sm:text-base text-slate-800 dark:text-slate-100">
                  Interaktív Labor 1: 3-jegyű Számalkotási Kísérlet
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Változtasd a paramétereket és vizsgáld meg az alkotható számok darabszámát!
                </p>
              </div>
            </div>

            <div className="px-2.5 py-1 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200 text-xs font-mono font-bold">
              Készlet: {`{${lab1Result.digitList}}`}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <div>
              <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-1">
                Nulla jelenléte:
              </span>
              <div className="flex gap-1.5">
                <Button
                  size="sm"
                  variant={lab1IncludeZero ? 'default' : 'outline'}
                  onClick={() => setLab1IncludeZero(true)}
                  className={lab1IncludeZero ? 'bg-rose-600 hover:bg-rose-700 text-white font-bold h-7 flex-1 text-xs' : 'h-7 flex-1 text-xs'}
                >
                  Van 0
                </Button>
                <Button
                  size="sm"
                  variant={!lab1IncludeZero ? 'default' : 'outline'}
                  onClick={() => setLab1IncludeZero(false)}
                  className={!lab1IncludeZero ? 'bg-rose-600 hover:bg-rose-700 text-white font-bold h-7 flex-1 text-xs' : 'h-7 flex-1 text-xs'}
                >
                  Nincs 0
                </Button>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-1">
                Ismétlődés:
              </span>
              <div className="flex gap-1.5">
                <Button
                  size="sm"
                  variant={lab1AllowRepetition ? 'default' : 'outline'}
                  onClick={() => setLab1AllowRepetition(true)}
                  className={lab1AllowRepetition ? 'bg-rose-600 hover:bg-rose-700 text-white font-bold h-7 flex-1 text-xs' : 'h-7 flex-1 text-xs'}
                >
                  Szabad
                </Button>
                <Button
                  size="sm"
                  variant={!lab1AllowRepetition ? 'default' : 'outline'}
                  onClick={() => setLab1AllowRepetition(false)}
                  className={!lab1AllowRepetition ? 'bg-rose-600 hover:bg-rose-700 text-white font-bold h-7 flex-1 text-xs' : 'h-7 flex-1 text-xs'}
                >
                  Különböző
                </Button>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-1">
                Paritási feltétel:
              </span>
              <div className="flex gap-1.5">
                <Button
                  size="sm"
                  variant={lab1Parity === 'all' ? 'default' : 'outline'}
                  onClick={() => setLab1Parity('all')}
                  className={lab1Parity === 'all' ? 'bg-rose-600 hover:bg-rose-700 text-white font-bold h-7 flex-1 text-xs' : 'h-7 flex-1 text-xs'}
                >
                  Mind
                </Button>
                <Button
                  size="sm"
                  variant={lab1Parity === 'even' ? 'default' : 'outline'}
                  onClick={() => setLab1Parity('even')}
                  className={lab1Parity === 'even' ? 'bg-rose-600 hover:bg-rose-700 text-white font-bold h-7 flex-1 text-xs' : 'h-7 flex-1 text-xs'}
                >
                  Páros
                </Button>
                <Button
                  size="sm"
                  variant={lab1Parity === 'odd' ? 'default' : 'outline'}
                  onClick={() => setLab1Parity('odd')}
                  className={lab1Parity === 'odd' ? 'bg-rose-600 hover:bg-rose-700 text-white font-bold h-7 flex-1 text-xs' : 'h-7 flex-1 text-xs'}
                >
                  Páratlan
                </Button>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Képezhető 3-jegyű számok száma:
            </span>
            <div className="font-mono text-xl font-black text-rose-600 dark:text-rose-400">
              {lab1Result.count} darab szám
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 font-mono">
              {lab1Result.explanation}
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: ÜLTETÉSI ÉS SORBARENDEZÉSI MESTERFOGÁSOK */}
      <TheorySection
        number={2}
        title="Sorbarendezési és Ültetési Trükkök Rendszerezése"
        icon={<Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badge="Ültetés & Sorrend"
        badgeColor="indigo"
      >
        <TheoryCallout
          title="Mikor melyik gondolatmenetet válasszuk?"
          type="tip"
        >
          <div className="space-y-2 text-xs sm:text-sm">
            <p>A feladatokban gyakran előforduló megfogalmazások felismerése fél siker:</p>
            <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
              <li>• <strong>„Egymás mellett vannak”:</strong> Blokk-képzés (összekötés 1 elemmé), majd megszorozzuk a blokk belső permutációjával.</li>
              <li>• <strong>„Nincsenek egymás mellett” / „Legalább egy…”:</strong> Komplementer módszer (Összes eset − Tiltott esetek).</li>
              <li>• <strong>„Körasztal” / „Forgatás nem számít”:</strong> Ciklikus permutáció ((n − 1)!).</li>
            </ul>
          </div>
        </TheoryCallout>

        <div className="my-4">
          <TheoryTable
            headers={['Feladattípus', 'Alkalmazott Módszer', 'Képlet / Lépés', 'Példa']}
            rows={[
              ['Minden elem szabadon sorban', 'Permutáció', 'P_n = n!', '5 könyv polcon: 5! = 120'],
              ['Két elem egymás mellett', 'Blokk-módszer', '(n-1)! · 2!', '5 fő padban, 2 barát együtt: 4! · 2! = 48'],
              ['Két elem NEM egymás mellett', 'Komplementer elv', 'n! - (n-1)! · 2!', '5 fő padban, 2 nem ül együtt: 120 - 48 = 72'],
              ['Körasztal körül n ember', 'Ciklikus permutáció', '(n-1)!', '6 diplomata kerek asztalnál: 5! = 120'],
              ['Körasztalnál 2 ember együtt', 'Körasztal + Blokk', '(n-2)! · 2!', '6 fő körasztalnál, 2 együtt: 4! · 2! = 48'],
              ['Fiúk és lányok felváltva padban', 'Esetszétválasztás', '2 · k! · k!', '3 fiú és 3 lány felváltva: 2 · 3! · 3! = 72'],
              ['Fiúk és lányok körasztalnál', 'Rögzítés + Szorzás', '(k-1)! · k!', '4 fiú és 4 lány kerek asztalnál: 3! · 4! = 144']
            ]}
          />
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: KÉZFOGÁSOK, KÖRMÉRKŐZÉSEK ÉS GRÁFOK */}
      <TheorySection
        number={3}
        title="Kézfogások, Körmérkőzések és a Gráfelméleti Alaptétel"
        icon={<Network className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        badge="Gráfok & Kézfogások"
        badgeColor="emerald"
      >
        <TheoryCallout
          title="Euler Kézfogási Lemmája és a Páratlan Fokszámok Tétele"
          type="info"
        >
          <div className="space-y-2 text-xs sm:text-sm">
            <p>Egy gráfban a csúcsok fokszámainak összege mindig kétszerese az élek számának:</p>
            <div className="p-2 rounded-lg bg-emerald-100/60 dark:bg-emerald-950/60 font-mono font-bold text-center text-emerald-900 dark:text-emerald-200">
              Fokszámok összege = 2 · (Élek száma)
            </div>
            <p>
              Mivel az összeg <strong>2 · E</strong> miatt mindig <strong>páros szám</strong>, ebből egy döntő következtetés adódik:
            </p>
            <p className="font-bold text-emerald-800 dark:text-emerald-300">
              Egy gráfban a páratlan fokszámú csúcsok száma csak páros lehet!
            </p>
          </div>
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TheoryCard
            title="Lehet-e ilyen társaság?"
            color="emerald"
            formula="Páratlan fokú csúcsok száma = PÁROS"
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              <strong>Klasszikus vizsgafeladat:</strong> Lehet-e egy 5 fős társaságban mindenkinek pontosan 3 ismerőse?
            </p>
            <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
              <div>• Fokszámok: 3, 3, 3, 3, 3</div>
              <div>• Fokszámok összege: 5 · 3 = 15 (PÁRATLAN!)</div>
              <div className="font-bold text-rose-600 dark:text-rose-400 pt-1">
                Válasz: NEM létezhet ilyen társaság, mert az összeg páratlan!
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Körmérkőzéses bajnokság meccsei"
            color="teal"
            formula="Mérkőzések száma = (n · (n - 1)) / 2"
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              <strong>Példa:</strong> Egy 8 fős sakkbajnokságon mindenki mindenkivel egyszer mérkőzik meg.
            </p>
            <div className="p-2.5 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-xs text-teal-900 dark:text-teal-200 space-y-1">
              <div>• Mindenki 7 partit játszik → 8 · 7 = 56.</div>
              <div>• Minden partiban két játékos ül a táblánál → 56 / 2 = 28.</div>
              <div className="font-bold pt-1 text-center">Összesen 28 mérkőzést rendeznek.</div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: A SKATULYA-ELV (DIRICHLET-ELV) */}
      <TheorySection
        number={4}
        title="A Skatulya-elv (Dirichlet-elv) Mesterfogásai"
        icon={<Package className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badge="Skatulya-elv"
        badgeColor="amber"
      >
        <TheoryCallout
          title="Mi az a skatulya-elv, és mire jó a kombinatorikában?"
          type="tip"
        >
          <p>
            Peter Gustav Lejeune Dirichlet (1805–1859) német matematikusról elnevezett tétel rendkívül egyszerű, mégis zseniális logikai fegyver:
          </p>
          <p className="mt-1 font-semibold text-amber-950 dark:text-amber-100">
            Ha N tárgyat elhelyezünk k skatulyába, és N &gt; k, akkor legalább egy skatulyába legalább 2 tárgy kerül!
          </p>
          <p className="mt-1 text-xs text-amber-800 dark:text-amber-300">
            Általánosítva: legalább egy skatulyába legalább ⌈N / k⌉ elem jut.
          </p>
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TheoryCard
            title="1. Születésnapok a naptárban"
            color="amber"
          >
            <ul className="text-xs space-y-2 text-slate-600 dark:text-slate-400">
              <li>
                <strong>Hónapok (12 skatulya):</strong> Bármely 13 fős társaságban biztosan van legalább 2 ember, akik ugyanabban a hónapban ünneplik a születésnapjukat (13 &gt; 12).
              </li>
              <li>
                <strong>Hét napjai (7 skatulya):</strong> Bármely 8 ember között van legalább kettő, akik a hét ugyanazon napján (pl. kedden) születtek (8 &gt; 7).
              </li>
            </ul>
          </TheoryCard>

          <TheoryCard
            title="2. Zoknis fiók (Legrosszabb eset elve)"
            color="rose"
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              <strong>Feladvány:</strong> Egy sötét szobában a fiókban 10 fekete és 10 fehér zokni van össze-vissza. Legalább hány zoknit kell kivennünk vakon, hogy biztosan legyen köztük egy azonos színű pár?
            </p>
            <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-900 dark:text-rose-200 space-y-1">
              <div>• Skatulyák száma = Színek száma = 2 (fekete, fehér)</div>
              <div>• Legrosszabb eset: 1 fekete + 1 fehér (2 zokni, még nincs pár).</div>
              <div className="font-bold text-center pt-1 text-emerald-700 dark:text-emerald-300">
                A 3. zokni már biztosan valamelyikhez párt alkot: 3 zokni elég!
              </div>
            </div>
          </TheoryCard>
        </div>

        {/* INTERAKTÍV LABOR 2: Skatulya-elv Kalkulátor */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-50/50 via-white to-orange-50/40 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 border-2 border-amber-200 dark:border-amber-800/60 my-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-600 text-white shadow-xs">
                <Package className="w-4 h-4" />
              </span>
              <div>
                <h4 className="font-black text-sm sm:text-base text-slate-800 dark:text-slate-100">
                  Interaktív Labor 2: Dirichlet Skatulya-elv Kalkulátor
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Állítsd be a tárgyak (galambok) és a skatulyák számát!
                </p>
              </div>
            </div>

            <div className="px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 text-xs font-mono font-bold">
              Garantált minimum egy rekeszben: {guaranteedMaxInHole} db
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                Tárgyak száma (N = {lab2Pigeons}):
              </span>
              <div className="flex gap-1.5">
                {[8, 13, 20, 25, 37].map((num) => (
                  <Button
                    key={num}
                    size="sm"
                    variant={lab2Pigeons === num ? 'default' : 'outline'}
                    onClick={() => setLab2Pigeons(num)}
                    className={lab2Pigeons === num ? 'bg-amber-600 hover:bg-amber-700 text-white font-bold h-7 flex-1 text-xs' : 'h-7 flex-1 text-xs'}
                  >
                    {num}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                Skatulyák száma (k = {lab2Pigeonholes}):
              </span>
              <div className="flex gap-1.5">
                {[6, 7, 10, 12].map((num) => (
                  <Button
                    key={num}
                    size="sm"
                    variant={lab2Pigeonholes === num ? 'default' : 'outline'}
                    onClick={() => setLab2Pigeonholes(num)}
                    className={lab2Pigeonholes === num ? 'bg-amber-600 hover:bg-amber-700 text-white font-bold h-7 flex-1 text-xs' : 'h-7 flex-1 text-xs'}
                  >
                    {num}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-100/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-center space-y-1">
            <span className="text-xs font-bold text-amber-950 dark:text-amber-200">
              Dirichlet Következtetés:
            </span>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              Ha <strong>{lab2Pigeons}</strong> elemet osztunk szét <strong>{lab2Pigeonholes}</strong> rekeszbe, akkor biztosan lesz legalább egy rekesz, amelyben legalább <strong>{guaranteedMaxInHole}</strong> elem található.
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: TIPIKUS CSAPDÁK ÉS BUKTATÓK */}
      <TheorySection
        number={5}
        title="Gyakori Kombinatorikai Buktatók és Vizsga-tippek"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badge="Csapdák"
        badgeColor="rose"
      >
        <div className="space-y-4">
          <TheoryTrapBox
            title="1. Buktató: Számképzésnél a 0-val kezdődő számok elfelejtett kizárása"
            trap="Hány 3-jegyű szám készíthető a {0, 1, 2, 3} jegyekből ismétléssel?"
            wrong="4 · 4 · 4 = 64"
            wrongExplanation="Hiba! Egy valódi 3-jegyű szám nem kezdődhet 0-val (a 012 az a 12 kétjegyű szám)."
            correct="3 · 4 · 4 = 48"
            correctExplanation="Helyes! Az első helyre csak 1, 2 vagy 3 kerülhet (3 lehetőség), a többi helyre mind a 4 számjegy."
            tip="Mindig ellenőrizd: számról vagy kódról van szó? A kód kezdődhet 0-val, a szám nem!"
          />

          <TheoryTrapBox
            title="2. Buktató: Körmérkőzéses mérkőzések kétszeres számlálása"
            trap="Egy 10 fős tornán mindenki mindenkivel játszik. Hány meccset rendeznek?"
            wrong="10 · 9 = 90"
            wrongExplanation="Hiba! A mérkőzés kétirányú, A vs. B ugyanaz a mérkőzés, mint B vs. A."
            correct="(10 · 9) / 2 = 45"
            correctExplanation="Helyes! Mivel minden meccsen 2 csapat játszik, osztani kell 2-vel."
            tip="Kézfogásnál, koccintásnál, meccsnél és gráf éleinél mindig ossz 2-vel!"
          />

          <TheoryTrapBox
            title="3. Buktató: Páratlan fokszámú csúcsok elfelejtett feltétele"
            trap="Létezhet-e olyan 7 fős társaság, ahol mindenkinek pontosan 3 barátja van a társaságból?"
            wrong="Igen, miért ne lehetne mindenkinek 3 barátja?"
            wrongExplanation="Hiba! A fokszámok összege 7 · 3 = 21 lenne, ami páratlan szám."
            correct="Nem létezhet! A fokszámok összege mindig páros kell legyen (2 · élek száma)."
            correctExplanation="Helyes! A páratlan fokszámú csúcsok száma (itt 7 db 3-as fokú csúcs) csak páros szám lehetne."
            tip="Ha a fokszámok összege páratlanra jön ki, a gráf azonnal lehetetlen!"
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default CombinatoricsPracticeTheory;
