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
  MultiplesVennSvg,
  LastDigitRuleSvg,
  NumberCardsSvg,
  MultiplesLineSvg,
  RepeatingPatternSvg
} from './NumberPropertiesFigures';

export type VennRegion = 'both' | 'two' | 'five' | 'none';

/** Melyik részbe kerül a szám a „2 többszörösei – 5 többszörösei” halmazábrán? */
export const vennRegion = (n: number): VennRegion => {
  const two = n % 2 === 0;
  const five = n % 5 === 0;
  if (two && five) return 'both';
  if (two) return 'two';
  if (five) return 'five';
  return 'none';
};

const REGION_LABELS: Record<VennRegion, string> = {
  two: 'Csak a 2 többszörösei közé',
  five: 'Csak az 5 többszörösei közé',
  both: 'A közös részbe (10 többszörösei)',
  none: 'Egyik halmazba sem'
};

const REGION_STYLE: Record<VennRegion, string> = {
  two: 'bg-sky-100 border-sky-400 text-sky-900',
  five: 'bg-indigo-100 border-indigo-400 text-indigo-900',
  both: 'bg-green-100 border-green-500 text-green-900',
  none: 'bg-orange-100 border-orange-400 text-orange-900'
};

const VENN_NUMBERS = [2965, 4561, 7602, 4310, 7656, 8420, 4802, 5218, 2865, 3990, 2983, 4000, 1175, 5877, 9100, 3454, 7329, 6755, 5552, 9240];

const END_SUFFIX = ['ra', 're', 're', 'ra', 're', 're', 'ra', 're', 'ra', 're'];

const explainRegion = (n: number) => {
  const last = n % 10;
  const end = `${last}-${END_SUFFIX[last]}`;
  const r = vennRegion(n);
  if (r === 'both') return `${n} 0-ra végződik, ezért a 2-nek és az 5-nek is többszöröse (sőt a 10-nek is).`;
  if (r === 'two') return `${n} ${end} végződik: páros, tehát a 2 többszöröse. Nem 0-ra vagy 5-re végződik, így az 5-nek nem többszöröse.`;
  if (r === 'five') return `${n} 5-re végződik: az 5 többszöröse, de páratlan, így a 2-nek nem többszöröse.`;
  return `${n} ${end} végződik: páratlan, és nem 0 vagy 5 az utolsó jegye, ezért egyik halmazba sem kerül.`;
};

/** I. labor: halmazábra-válogató. */
const VennLab: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState<VennRegion | null>(null);
  const [score, setScore] = useState(0);
  const [tries, setTries] = useState(0);
  const n = VENN_NUMBERS[idx];
  const correct = vennRegion(n);
  const choose = (r: VennRegion) => {
    if (answer) return;
    setAnswer(r);
    setTries(tries + 1);
    if (r === correct) setScore(score + 1);
  };
  const next = () => {
    setIdx((i) => (i + 1) % VENN_NUMBERS.length);
    setAnswer(null);
  };
  return (
    <div className="bg-white border-2 border-amber-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-base font-bold text-slate-700">
          Hová kerül a szám? <span className="ml-2 text-3xl font-black text-amber-700">{n}</span>
        </div>
        <div className="text-sm font-bold text-slate-600">
          Pontszám: {score} / {tries}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {(['two', 'five', 'both', 'none'] as VennRegion[]).map((r) => {
          const picked = answer === r;
          const show = answer !== null && r === correct;
          return (
            <button
              key={r}
              onClick={() => choose(r)}
              className={`min-h-[52px] px-3 rounded-xl border-2 font-bold text-sm ${REGION_STYLE[r]} ${
                show ? 'ring-4 ring-green-400' : picked ? 'ring-4 ring-rose-400' : ''
              }`}
            >
              {REGION_LABELS[r]}
            </button>
          );
        })}
      </div>
      {answer && (
        <TheoryCallout type={answer === correct ? 'success' : 'warning'} title={answer === correct ? 'Ügyes! ✔' : 'Nem egészen!'}>
          {explainRegion(n)}
        </TheoryCallout>
      )}
      <button onClick={next} className="px-4 h-12 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold">
        Következő szám ➜
      </button>
    </div>
  );
};

interface DigitTask {
  pattern: string; // a □ a hiányzó számjegy (mindig az utolsó)
  label: string;
  test: (d: number) => boolean;
}

const DIGIT_TASKS: DigitTask[] = [
  { pattern: '521□', label: 'a 2 többszöröse', test: (d) => d % 2 === 0 },
  { pattern: '131□', label: 'az 5 többszöröse', test: (d) => d === 0 || d === 5 },
  { pattern: '62□0', label: 'a 2 és az 5 többszöröse is', test: () => true },
  { pattern: '470□', label: 'páratlan', test: (d) => d % 2 === 1 },
  { pattern: '385□', label: 'a 10 többszöröse', test: (d) => d === 0 },
  { pattern: '296□', label: 'páros, de nem a 10 többszöröse', test: (d) => d % 2 === 0 && d !== 0 }
];

/** A feladat helyes számjegyei. */
export const digitSolutions = (taskIdx: number) =>
  Array.from({ length: 10 })
    .map((_, d) => d)
    .filter((d) => DIGIT_TASKS[taskIdx].test(d));

/** II. labor: Melyik számjegy kerülhet a □ helyére? (tankönyv 102. o., 4. feladat) */
const DigitLab: React.FC = () => {
  const [t, setT] = useState(0);
  const [picked, setPicked] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);
  const task = DIGIT_TASKS[t];
  const sol = digitSolutions(t);
  const toggle = (d: number) => {
    setChecked(false);
    setPicked(picked.includes(d) ? picked.filter((x) => x !== d) : [...picked, d].sort());
  };
  const ok = checked && sol.length === picked.length && sol.every((d) => picked.includes(d));
  return (
    <div className="bg-white border-2 border-sky-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap gap-2">
        {DIGIT_TASKS.map((x, i) => (
          <button
            key={x.pattern}
            onClick={() => {
              setT(i);
              setPicked([]);
              setChecked(false);
            }}
            className={`px-3 h-11 rounded-xl font-black border-2 ${
              t === i ? 'bg-sky-600 border-sky-700 text-white' : 'bg-white border-sky-200 hover:bg-sky-50 text-sky-800'
            }`}
          >
            {x.pattern}
          </button>
        ))}
      </div>
      <div className="text-center text-lg font-bold text-slate-700">
        Válaszd ki az összes számjegyet, amellyel a <span className="font-mono text-2xl text-sky-700">{task.pattern}</span> szám{' '}
        <strong>{task.label}</strong>!
      </div>
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
        {Array.from({ length: 10 }).map((_, d) => {
          const on = picked.includes(d);
          const wrongPick = checked && on && !sol.includes(d);
          const missed = checked && !on && sol.includes(d);
          return (
            <button
              key={d}
              onClick={() => toggle(d)}
              className={`h-12 rounded-xl text-xl font-black border-2 ${
                wrongPick
                  ? 'bg-rose-100 border-rose-500 text-rose-700'
                  : missed
                  ? 'bg-amber-50 border-amber-400 text-amber-700 border-dashed'
                  : on
                  ? 'bg-sky-600 border-sky-700 text-white'
                  : 'bg-white border-sky-200 hover:bg-sky-50 text-slate-800'
              }`}
            >
              {d}
            </button>
          );
        })}
      </div>
      <button onClick={() => setChecked(true)} className="px-4 h-12 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold">
        Ellenőrzés ✔
      </button>
      {checked && (
        <TheoryCallout type={ok ? 'success' : 'warning'} title={ok ? 'Mind megvan! 🎉' : 'Még nem tökéletes'}>
          {ok
            ? `Helyes: ${sol.map((d) => task.pattern.replace('□', String(d))).join(', ')}.`
            : `A jó számjegyek: ${sol.join(', ')}. A pirosak rosszak, a szaggatott keretesek hiányoznak. Csak az utolsó számjegyet kell figyelni!`}
        </TheoryCallout>
      )}
    </div>
  );
};

export const NumberPropertiesTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  return (
    <TheoryTemplate
      topicId="g4-written-ops"
      subtopicId="a-szamok-tulajdonsagai"
      grade={4}
      chapterId="irasbeli-muveletek-10000-ig"
      title="4. A számok tulajdonságai"
      subtitle="Páros és páratlan számok, a 2, az 5, a 10 és a 100 többszörösei, halmazábrák, ismétlődő sorozatok."
      badge="4. OSZTÁLY • III. ÍRÁSBELI MŰVELETEK • TANANYAG"
      themeColor="amber"
      pdfFilename="4_osztaly_a_szamok_tulajdonsagai_tananyag.pdf"
      practiceTitle="Készen állsz a számok tulajdonságainak gyakorlására?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — AZ UTOLSÓ SZÁMJEGY DÖNT',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 text-center">
              <span className="font-mono text-base font-black text-amber-900 dark:text-amber-200">
                2 többszöröse: 0, 2, 4, 6, 8 · 5 többszöröse: 0, 5 · 10 többszöröse: 0
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>A 2 többszörösei a <strong>páros</strong> számok, a többi szám <strong>páratlan</strong>.</li>
              <li>Ha egy szám 0-ra végződik, akkor a 2-nek, az 5-nek és a 10-nek is többszöröse.</li>
              <li>A 100 többszörösei 00-ra végződnek.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 101. o." badgeColor="amber">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            Egy szám <strong>többszöröse</strong> a 2-nek, ha előáll 2 · valamennyi alakban, vagyis 2-vel osztva <strong>0 a maradék</strong>.
            Például 7602 = 2 · 3801, ezért a 7602 a 2 többszöröse. Ugyanígy beszélünk az 5, a 10 és a 100 többszöröseiről.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Páros és páratlan számok felismerése.</li>
            <li>A 2, az 5, a 10 és a 100 többszörösei – az utolsó számjegyek alapján.</li>
            <li>Számok elhelyezése halmazábrában.</li>
            <li>Ismétlődő sorozatok: melyik lesz a 11., a 28. vagy a 100. elem?</li>
          </ul>
        </div>
      </TheorySection>

      {/* 2. Utolsó számjegy */}
      <TheorySection title="2. Az utolsó számjegy elárulja!" badge="Tankönyv 101. o." badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <LastDigitRuleSvg />
          <TheoryTable
            headers={['Tulajdonság', 'Mire végződik?', 'Példa']}
            rows={[
              ['2 többszöröse (páros)', '0, 2, 4, 6, 8', '7602, 4310, 5552'],
              ['páratlan', '1, 3, 5, 7, 9', '4561, 2983, 5877'],
              ['5 többszöröse', '0 vagy 5', '2965, 1175, 8420'],
              ['10 többszöröse', '0', '4310, 3990, 9240'],
              ['100 többszöröse', '00', '9100, 4000, 6400']
            ]}
          />
        </div>
        <MultiplesLineSvg />
      </TheorySection>

      {/* 3. Nézzük meg együtt: kártyák */}
      <TheorySection title="3. Nézzük meg együtt! Számkártyák" badge="Tankönyv 101. o., 1. feladat" badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <NumberCardsSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>A 0, 5, 3, 4, 0 kártyákból számokat raktunk ki. Csoportosítsuk őket!</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>34, 354, 3504</strong>: páros, a 2 többszöröse, de az 5-é nem.</li>
              <li><strong>35, 435, 3045</strong>: 5-re végződik, az 5 többszöröse, de páratlan.</li>
              <li><strong>50, 430, 5430</strong>: 0-ra végződik → 2, 5 és 10 többszöröse.</li>
              <li><strong>300, 5400, 3400</strong>: 00-ra végződik → mind a négy csoportba beírható (2, 5, 10, 100)!</li>
            </ul>
          </div>
        </div>
      </TheorySection>

      {/* 4. Halmazábra */}
      <TheorySection title="4. Halmazábra: 2 és 5 többszörösei" badge="Tankönyv 101. o., 2. feladat" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <MultiplesVennSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>Bence pontszáma az 5 többszöröse, Gergőé a 2 többszöröse, Attiláé a 2-nek és az 5-nek is többszöröse.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Bence: 2965, 2865, 1175, 6755 (vagy a 0-ra végződők is).</li>
              <li>Gergő: 7602, 7656, 4802, 5218, 3454, 5552 (vagy a 0-ra végződők is).</li>
              <li>Attila: csak 0-ra végződő lehet: 4310, 8420, 3990, 4000, 9100, 9240.</li>
            </ul>
            <TheoryCard title="Igaz vagy hamis?" badge="1. e) feladat" badgeColor="indigo">
              <ul className="text-sm text-slate-700 space-y-1">
                <li>✔ Minden páros szám többszöröse a 2-nek. <strong>Igaz</strong></li>
                <li>✔ Nincs olyan páratlan szám, amely a 2 többszöröse. <strong>Igaz</strong></li>
                <li>✔ Ha egy szám 0-ra végződik, a 2-nek, az 5-nek és a 10-nek is többszöröse. <strong>Igaz</strong></li>
                <li>✘ Nincs a 2 többszörösei között olyan, amely az 5-nek is többszöröse. <strong>Hamis</strong> (pl. 4310)</li>
              </ul>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 5. A 4 többszörösei */}
      <TheorySection title="5. És a 4 többszörösei?" badge="Munkafüzet II. 13. o." badgeColor="purple">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>
            A 4 többszöröseit osztással ellenőrizzük: 4-gyel osztva 0 a maradék. 1240 : 4 = 310 ✔, 4304 : 4 = 1076 ✔, de 1422 : 4 = 355,
            marad 2 ✘.
          </p>
          <TheoryCallout type="info" title="Mit vettél észre?">
            A 4 többszörösei mind <strong>párosak</strong>, tehát a 2-nek is többszörösei. De nem minden páros szám a 4 többszöröse (pl.
            1422, 3486, 1350).
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 6. Sorozatok */}
      <TheorySection title="6. Ismétlődő sorozatok" badge="Tankönyv 102. o., 6. feladat" badgeColor="orange">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <RepeatingPatternSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>a)</strong> Piros, sárga, piros, sárga… A páratlan sorszámú léggömbök pirosak, a párosak sárgák. A 11. piros, a 12.
              sárga, a 100. sárga.
            </p>
            <p>
              <strong>b)</strong> Kék, piros, sárga busz ismétlődik. Oszd el a sorszámot 3-mal! Ha a maradék 1 → kék, 2 → piros, 0 → sárga.
              A 12. busz: 12 : 3 = 4, marad 0 → <strong>sárga</strong>. A 28.: 28 : 3 = 9, marad 1 → <strong>kék</strong>.
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 7. Vigyázz! */}
      <TheorySection title="7. Vigyázz! Csak az utolsó számjegyet nézd!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Az első számjegyet nézte"
          wrong="A 4561 páros, mert 4-gyel kezdődik."
          wrongExplanation="A páros vagy páratlan tulajdonságot nem az első, hanem az utolsó (egyesek helyén álló) számjegy dönti el."
          correct="A 4561 páratlan, mert 1-re végződik."
          correctExplanation="Az egyesek helyén álló számjegy mondja meg, hogy a szám a 2, az 5 vagy a 10 többszöröse-e."
          tip="Kérdezd meg magadtól: mi áll az egyesek helyén?"
        />
        <TheoryCallout type="warning" title="Az 5-re végződő szám nem páros!">
          A 2965 az 5 többszöröse, de páratlan – ezért nem kerül a közös részbe. A közös részbe (2 és 5 többszörösei) csak a 0-ra végződő
          számok kerülnek.
        </TheoryCallout>
      </TheorySection>

      {/* 8. Labor I */}
      <TheorySection title="8. Játékos labor I: Halmazábra-válogató" badge="Labor" badgeColor="amber">
        <p className="text-sm text-slate-600">Döntsd el, hová kerül a szám a halmazábrán! Figyeld az utolsó számjegyét!</p>
        <VennLab />
      </TheorySection>

      {/* 9. Labor II */}
      <TheorySection title="9. Játékos labor II: Melyik számjegy jöhet?" badge="Labor" badgeColor="sky">
        <p className="text-sm text-slate-600">A léghajóra írt számokból hiányzik egy számjegy. Válaszd ki az összes jót, aztán ellenőrizz!</p>
        <DigitLab />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default NumberPropertiesTheory;
