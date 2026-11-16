import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { OpenSentenceCardsSvg, BalanceScaleSvg, SameSymbolsSvg, SwimBarSvg, SolutionsNumberLineSvg, ThinkNumberArrowsSvg } from './OpenSentencesFigures';

// ---------------------------------------------------------------------------
// Labor I: Cédulás próbálgatás – igazzá teszi vagy nem?
// ---------------------------------------------------------------------------
interface CardTask {
  id: string;
  left: string;
  right: string;
  test: (n: number) => boolean;
  cards: number[];
}

const CARD_TASKS: CardTask[] = [
  { id: 't1', left: '367 >', right: '> 67', test: (n) => 367 > n && n > 67, cards: [365, 403, 67, 811, 56, 366, 287, 954, 368] },
  { id: 't2', left: '', right: '+ 40 < 100', test: (n) => n + 40 < 100, cards: [10, 60, 59, 70, 0, 45, 61, 30, 100] },
  { id: 't3', left: '5 ·', right: '< 40', test: (n) => 5 * n < 40, cards: [7, 8, 2, 9, 0, 10, 5, 6, 20] },
  { id: 't4', left: '250 <', right: '< 256', test: (n) => 250 < n && n < 256, cards: [250, 251, 255, 256, 253, 205, 260, 252, 525] }
];

const CardLab: React.FC = () => {
  const [taskIdx, setTaskIdx] = useState(0);
  const [tried, setTried] = useState<number[]>([]);
  const [current, setCurrent] = useState<number | null>(null);
  const task = CARD_TASKS[taskIdx];
  const trueCount = task.cards.filter(task.test).length;
  const foundTrue = tried.filter(task.test).length;

  const pick = (n: number) => {
    setCurrent(n);
    if (!tried.includes(n)) setTried([...tried, n]);
  };
  const switchTask = (i: number) => {
    setTaskIdx(i);
    setTried([]);
    setCurrent(null);
  };

  return (
    <div className="bg-white border-2 border-amber-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap gap-2">
        {CARD_TASKS.map((t, i) => (
          <button
            key={t.id}
            onClick={() => switchTask(i)}
            className={`px-3 py-2 rounded-xl text-sm font-bold border-2 ${i === taskIdx ? 'bg-amber-500 text-white border-amber-500' : 'bg-amber-50 text-amber-800 border-amber-200'}`}
          >
            {t.left} □ {t.right}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-center gap-3 text-2xl md:text-3xl font-black text-slate-800 bg-amber-50 rounded-2xl py-4">
        {task.left && <span>{task.left}</span>}
        <span
          className={`inline-flex items-center justify-center min-w-[5rem] h-14 rounded-xl border-4 ${
            current === null ? 'border-dashed border-amber-400 text-amber-400' : task.test(current) ? 'border-green-500 bg-green-50 text-green-700' : 'border-red-500 bg-red-50 text-red-700'
          }`}
        >
          {current === null ? '□' : current}
        </span>
        <span>{task.right}</span>
      </div>
      {current !== null && (
        <div className={`text-center font-bold text-lg ${task.test(current) ? 'text-green-700' : 'text-red-600'}`}>
          {task.test(current) ? `Igaz! A(z) ${current} igazzá teszi a nyitott mondatot. 🎉` : `Hamis! A(z) ${current} nem teszi igazzá.`}
        </div>
      )}
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
        {task.cards.map((n) => {
          const done = tried.includes(n);
          const ok = task.test(n);
          return (
            <button
              key={n}
              onClick={() => pick(n)}
              className={`h-14 rounded-xl text-lg font-black border-2 transition ${
                !done ? 'bg-yellow-200 border-yellow-400 text-slate-800 hover:scale-105' : ok ? 'bg-green-100 border-green-500 text-green-800' : 'bg-red-100 border-red-400 text-red-700 line-through'
              }`}
            >
              {n}
            </button>
          );
        })}
      </div>
      <p className="text-sm text-slate-600 text-center">
        Igazzá tevő cédulák: <strong>{foundTrue}</strong> / {trueCount}
        {foundTrue === trueCount && ' – Mindet megtaláltad! Ügyes vagy!'}
      </p>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Labor II: Mérleg-labor – keresd meg a □ értékét!
// ---------------------------------------------------------------------------
interface ScaleTask {
  text: string;
  value: (n: number) => number;
  target: number;
  answer: number;
  hint: string;
  max?: number;
}

const SCALE_TASKS: ScaleTask[] = [
  { text: '□ + 240 = 600', value: (n) => n + 240, target: 600, answer: 360, hint: '600 − 240' },
  { text: '□ + 254 = 522', value: (n) => n + 254, target: 522, answer: 268, hint: '522 − 254' },
  { text: '4 · □ = 360', value: (n) => 4 * n, target: 360, answer: 90, hint: '360 : 4' },
  { text: '□ − 560 = 330', value: (n) => n - 560, target: 330, answer: 890, hint: '330 + 560' },
  { text: '803 − □ = 427', value: (n) => 803 - n, target: 427, answer: 376, hint: '803 − 427', max: 803 }
];

const ScaleLab: React.FC = () => {
  const [taskIdx, setTaskIdx] = useState(0);
  const [guess, setGuess] = useState(0);
  const task = SCALE_TASKS[taskIdx];
  const left = task.value(guess);
  const diff = left - task.target;
  const tilt = Math.max(-14, Math.min(14, diff === 0 ? 0 : (diff > 0 ? -1 : 1) * (4 + Math.min(10, Math.abs(diff) / 40))));
  const change = (d: number) => setGuess((g) => Math.max(0, Math.min(task.max ?? 9999, g + d)));
  const fmtLeft = String(left);

  return (
    <div className="bg-white border-2 border-sky-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap gap-2">
        {SCALE_TASKS.map((t, i) => (
          <button
            key={t.text}
            onClick={() => {
              setTaskIdx(i);
              setGuess(0);
            }}
            className={`px-3 py-2 rounded-xl text-sm font-bold border-2 ${i === taskIdx ? 'bg-sky-500 text-white border-sky-500' : 'bg-sky-50 text-sky-800 border-sky-200'}`}
          >
            {t.text}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
        <svg viewBox="0 0 320 180" className="w-full h-auto bg-sky-50 rounded-xl border border-sky-100">
          <polygon points="160,60 140,165 180,165" fill="#94a3b8" />
          <rect x="110" y="162" width="100" height="10" rx="4" fill="#64748b" />
          <g transform={`rotate(${tilt} 160 60)`}>
            <line x1="40" y1="60" x2="280" y2="60" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
            <g transform={`rotate(${-tilt} 50 60)`}>
              <line x1="50" y1="60" x2="20" y2="105" stroke="#94a3b8" strokeWidth="2" />
              <line x1="50" y1="60" x2="80" y2="105" stroke="#94a3b8" strokeWidth="2" />
              <rect x="12" y="105" width="76" height="8" rx="4" fill="#cbd5e1" />
              <rect x="14" y="76" width="72" height="28" rx="6" fill="#fde047" stroke="#ca8a04" strokeWidth="2" />
              <text x="50" y="96" fontSize="15" fontWeight="bold" textAnchor="middle" fill="#713f12">{fmtLeft}</text>
            </g>
            <g transform={`rotate(${-tilt} 270 60)`}>
              <line x1="270" y1="60" x2="240" y2="105" stroke="#94a3b8" strokeWidth="2" />
              <line x1="270" y1="60" x2="300" y2="105" stroke="#94a3b8" strokeWidth="2" />
              <rect x="232" y="105" width="76" height="8" rx="4" fill="#cbd5e1" />
              <rect x="234" y="76" width="72" height="28" rx="6" fill="#86efac" stroke="#16a34a" strokeWidth="2" />
              <text x="270" y="96" fontSize="15" fontWeight="bold" textAnchor="middle" fill="#14532d">{task.target}</text>
            </g>
            <circle cx="160" cy="60" r="7" fill="#f59e0b" />
          </g>
        </svg>
        <div className="space-y-3">
          <div className="text-center text-2xl font-black text-slate-800">
            {task.text.replace('□', String(guess))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {[-100, -10, -1, 1, 10, 100].map((d) => (
              <button
                key={d}
                onClick={() => change(d)}
                className={`min-w-[3.5rem] h-12 rounded-xl font-black text-lg border-2 ${d < 0 ? 'bg-rose-50 border-rose-300 text-rose-700' : 'bg-emerald-50 border-emerald-300 text-emerald-700'}`}
              >
                {d > 0 ? `+${d}` : `−${-d}`}
              </button>
            ))}
          </div>
          <div
            className={`text-center font-bold rounded-xl p-3 ${
              diff === 0 ? 'bg-green-100 text-green-800' : guess > task.answer ? 'bg-orange-50 text-orange-700' : 'bg-blue-50 text-blue-700'
            }`}
          >
            {diff === 0
              ? `Egyensúly! □ = ${task.answer}. Ellenőrzés: ${task.text.replace('□', String(task.answer))} ✓`
              : `${diff > 0 ? 'A bal oldal nehezebb.' : 'A bal oldal könnyebb.'} ${guess > task.answer ? 'A □ túl nagy, csökkentsd!' : 'A □ túl kicsi, növeld!'}`}
          </div>
          <p className="text-xs text-slate-500 text-center">Tipp: próbálgatás helyett számolhatsz is: □ = {task.hint}</p>
        </div>
      </div>
    </div>
  );
};

export const OpenSentencesTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  return (
    <TheoryTemplate
      topicId="g4-count-10k"
      subtopicId="nyitott-mondatok"
      title="5. Nyitott mondatok"
      subtitle="Mit írjunk az üres helyre, hogy igaz legyen az állítás? Próbálgatás, visszafelé számolás és a mérleg segít!"
      badge="4. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 10 000-IG • TANANYAG"
      themeColor="amber"
      pdfFilename="4_osztaly_nyitott_mondatok_tananyag.pdf"
      practiceTitle="Készen állsz a nyitott mondatokra?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — NYITOTT MONDAT',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 text-center">
              <span className="font-mono text-base font-black text-amber-900 dark:text-amber-200">□ + 240 = 600 → □ = 600 − 240 = 360</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>A nyitott mondatban van egy <strong>üres hely</strong> (□, △, ○). Így még se nem igaz, se nem hamis.</li>
              <li>Ha beírunk valamit, <strong>igaz</strong> vagy <strong>hamis</strong> állítás lesz belőle.</li>
              <li>Az <strong>azonos jelek</strong> helyére <strong>azonos számot</strong> írunk.</li>
              <li>Mindig <strong>ellenőrizz</strong>: írd vissza a számot a □ helyére!</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk? Mi az a nyitott mondat?" badge="Tankönyv 22. o." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Nézd ezt a mondatot: <strong>„A gólyának □ lába van, mint a fecskének.”</strong> Hiányzik belőle egy szó. Amíg üres a hely, nem tudjuk eldönteni, hogy igaz-e. Ez egy <strong>nyitott mondat</strong>.
            </p>
            <p>
              Ha beírjuk: „ugyanannyi”, akkor <strong>igaz</strong> állítás lesz. Ha beírjuk: „több”, akkor <strong>hamis</strong>.
            </p>
            <p>
              A matekban a hiányzó számot egy <strong>üres keret</strong> jelöli: □, △ vagy ○. Például: <strong>□ + 240 = 600</strong>.
            </p>
          </div>
          <TheoryTable
            headers={['Nyitott mondat', 'Ezt írjuk be', 'Igaz vagy hamis?']}
            rows={[
              ['□ egyjegyű szám van.', '10', '✅ igaz (0, 1, 2, …, 9)'],
              ['A magyar ábécében □ háromjegyű mássalhangzó van.', '1', '✅ igaz (dzs)'],
              ['Magyarország legnagyobb folyója a □.', 'Duna', '✅ igaz'],
              ['A busz nehezebb, mint a □.', 'kerékpár', '✅ igaz'],
              ['A kerékpár nehezebb, mint a □.', 'busz', '❌ hamis']
            ]}
          />
        </div>
      </TheorySection>

      <TheorySection title="2. Egy megoldás vagy több megoldás?" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <TheoryCard title="Egyenlőség (=)" badge="általában 1 megoldás" badgeColor="emerald">
            <BalanceScaleSvg className="w-full h-auto mb-3" />
            <p className="text-sm text-slate-700 leading-relaxed">
              <strong>□ + 240 = 600</strong>. A mérleg csak akkor van egyensúlyban, ha a □ helyén <strong>360</strong> áll. Ennek a nyitott mondatnak egyetlen megoldása van.
            </p>
          </TheoryCard>
          <TheoryCard title="Egyenlőtlenség (<, >)" badge="sok megoldás" badgeColor="purple">
            <OpenSentenceCardsSvg className="w-full h-auto mb-3" />
            <p className="text-sm text-slate-700 leading-relaxed">
              <strong>367 &gt; □ &gt; 67</strong>. A cédulák közül <strong>365, 366, 287</strong> teszi igazzá (zöld). A 67 nem jó, mert 67 nem nagyobb 67-nél! És még sok más szám is jó: 68, 100, 200, 366 …
            </p>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <SolutionsNumberLineSvg />
          <TheoryCallout type="info" title="Keresd meg az összeset!">
            Az <strong>5 &gt; □</strong> nyitott mondatot a <strong>0, 1, 2, 3, 4</strong> teszi igazzá. Ez <strong>5 szám</strong>, mert a 0-t is számoljuk! Az 5 már nem jó, mert 5 nem nagyobb önmagánál.
          </TheoryCallout>
        </div>
      </TheorySection>

      <TheorySection title="3. Nézzük meg együtt! – Visszafelé számolás" badge="Mintapéldák" badgeColor="sky">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="A) Hiányzik egy tag" badge="összeadás" badgeColor="sky">
            <div className="text-sm text-slate-700 space-y-1">
              <p className="font-mono font-bold">□ + 254 = 522</p>
              <p>1. Az összegből elveszem az ismert tagot: 522 − 254 = <strong>268</strong></p>
              <p>2. Ellenőrzés: 268 + 254 = 522 ✓</p>
            </div>
          </TheoryCard>
          <TheoryCard title="B) Hiányzik, amiből elvettünk" badge="kivonás" badgeColor="rose">
            <div className="text-sm text-slate-700 space-y-1">
              <p className="font-mono font-bold">□ − 560 = 330</p>
              <p>1. Ami megmaradt, ahhoz hozzáadom, amit elvettünk: 330 + 560 = <strong>890</strong></p>
              <p>2. Ellenőrzés: 890 − 560 = 330 ✓</p>
            </div>
          </TheoryCard>
          <TheoryCard title="C) Hiányzik a szorzandó" badge="szorzás" badgeColor="emerald">
            <div className="text-sm text-slate-700 space-y-1">
              <p className="font-mono font-bold">□ · 6 = 480</p>
              <p>1. Elosztom: 480 : 6 = <strong>80</strong></p>
              <p>2. Ellenőrzés: 80 · 6 = 480 ✓</p>
            </div>
          </TheoryCard>
          <TheoryCard title="D) Hiányzik az osztandó" badge="osztás" badgeColor="purple">
            <div className="text-sm text-slate-700 space-y-1">
              <p className="font-mono font-bold">□ : 9 = 80</p>
              <p>1. Visszaszorzok: 80 · 9 = <strong>720</strong></p>
              <p>2. Ellenőrzés: 720 : 9 = 80 ✓</p>
            </div>
          </TheoryCard>
        </div>
        <TheoryCard title="E) Előbb számolj, aztán gondolkodj!" badge="Megálló 5. a)" badgeColor="amber">
          <div className="text-sm text-slate-700 space-y-1">
            <p className="font-mono font-bold">37 · 10 − 350 &gt; □</p>
            <p>1. Kiszámolom a bal oldalt: 37 · 10 = 370, 370 − 350 = 20. Tehát: <strong>20 &gt; □</strong></p>
            <p>2. A megoldások: <strong>0, 1, 2, …, 19</strong>. Ez összesen 20 szám. A 20 már nem jó!</p>
          </div>
        </TheoryCard>
      </TheorySection>

      <TheorySection title="4. Szövegből nyitott mondat és jeles feladványok" badge="Feladatok" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3">
            <SwimBarSvg />
            <p className="text-sm text-slate-700 leading-relaxed">
              <strong>Sanyi leúszott már 200 métert. Hány métert kell még leúsznia, ha az edzésadagja 250 m?</strong> A szöveget legjobban ez tükrözi: <strong>200 m + □ m = 250 m</strong> (előbb 200 m, aztán még □ m, összesen 250 m). Megoldás: □ = 250 − 200 = <strong>50</strong>. Sanyinak még 50 métert kell úsznia.
            </p>
          </div>
          <div className="space-y-3">
            <SameSymbolsSvg />
            <ul className="text-sm text-slate-700 list-disc pl-5 space-y-1">
              <li>● + ● = 100 → két egyforma szám 100 → ● = <strong>50</strong></li>
              <li>▲ + ▲ + ▲ + ▲ = 200 (zöld) → 200 : 4 = <strong>50</strong></li>
              <li>■ + ■ + ■ = 180 → 180 : 3 = <strong>60</strong></li>
              <li>▲ + ▲ = 1000 (piros) → 1000 : 2 = <strong>500</strong></li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <ThinkNumberArrowsSvg />
          <TheoryCallout type="tip" title="Gondoltam egy számra!">
            Megszoroztam 3-mal, hozzáadtam 60-at, és <strong>300</strong>-at kaptam. Menj visszafelé, és fordítsd meg a műveleteket: 300 − 60 = 240, majd 240 : 3 = <strong>80</strong>. Ellenőrzés: 80 · 3 + 60 = 300 ✓
          </TheoryCallout>
        </div>
      </TheorySection>

      <TheorySection title="5. Vigyázz! Gyakori hibák" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Rossz irányba számolsz"
          wrong="□ − 560 = 330 → □ = 560 − 330 = 230"
          wrongExplanation="Próbáld vissza: 230 − 560 nem lehet 330! Ha elvettünk 560-at és 330 maradt, akkor eredetileg többnek kellett lennie."
          correct="□ − 560 = 330 → □ = 330 + 560 = 890"
          correctExplanation="Ellenőrzés: 890 − 560 = 330 ✓"
          tip="A „kisebb” jel (<) és a „nagyobb” jel (>) nem engedi meg az egyenlőséget: a 20 > □ mondatot a 20 NEM teszi igazzá!"
        />
      </TheorySection>

      <TheorySection title="6. Interaktív Labor I: Cédulás próbálgatás" badge="Labor" badgeColor="amber">
        <p className="text-sm text-slate-600 mb-3">
          Válassz egy nyitott mondatot, majd koppints a cédulákra! Minden cédulát betehetsz a □ helyére. Zöld = igazzá teszi, piros = nem teszi igazzá. Keresd meg az összes jót!
        </p>
        <CardLab />
      </TheorySection>

      <TheorySection title="7. Interaktív Labor II: Mérleg-labor" badge="Labor" badgeColor="sky">
        <p className="text-sm text-slate-600 mb-3">
          Változtasd a □ értékét a gombokkal! Ha a mérleg egyensúlyban van, megtaláltad a megoldást.
        </p>
        <ScaleLab />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default OpenSentencesTheory;
