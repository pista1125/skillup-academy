import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { ThreeQuartersSvg, GridColorsSvg, CupsSvg, CountryFlagsSvg, BeadsSvg, ArcherySvg, CheeseSvg, BeadsG } from './ProperFractionsFigures';
import { DENOM_NAMES, fracWord } from '../tortresz-tortek-ertelmezese/FractionIntro4Figures';

/** „3 negyed színes, 1 negyed fehér” – a színes és a fehér rész leolvasása. */
export const readParts = (colored: number, parts: number): { colored: string; white: string } => ({
  colored: colored === 0 ? 'semmi' : fracWord(colored, parts),
  white: parts - colored === 0 ? 'semmi' : fracWord(parts - colored, parts)
});

// ---------------------------------------------------------------------------
// Labor I – Csokitábla-színező
// ---------------------------------------------------------------------------
export const STRIP_PARTS = [2, 3, 4, 5, 6, 8, 10];
export const STRIP_TASKS: { parts: number; colored: number }[] = [
  { parts: 3, colored: 2 },
  { parts: 4, colored: 3 },
  { parts: 5, colored: 3 },
  { parts: 6, colored: 5 },
  { parts: 8, colored: 3 },
  { parts: 10, colored: 7 }
];

const StripLab: React.FC = () => {
  const [parts, setParts] = useState(4);
  const [colored, setColored] = useState<number[]>([]);
  const [ti, setTi] = useState(0);
  const [done, setDone] = useState<number[]>([]);
  const [msg, setMsg] = useState<string | null>(null);
  const task = STRIP_TASKS[ti];
  const read = readParts(colored.length, parts);

  const toggle = (i: number) => {
    setColored((c) => (c.includes(i) ? c.filter((x) => x !== i) : [...c, i]));
    setMsg(null);
  };
  const check = () => {
    if (parts !== task.parts) {
      setMsg(`Hány egyenlő részre kell törni? A „${DENOM_NAMES[task.parts]}” szó ${task.parts} részt jelent. Most ${parts} részed van.`);
      return;
    }
    if (colored.length !== task.colored) {
      setMsg(`A törés jó! Most ${colored.length} részt színeztél, de ${task.colored} kell.`);
      return;
    }
    setMsg(`Ügyes vagy! ${task.parts} egyenlő rész közül ${task.colored} színes: ${fracWord(task.colored, task.parts)}. A fehér rész: ${fracWord(task.parts - task.colored, task.parts)}.`);
    if (!done.includes(ti)) setDone([...done, ti]);
  };

  const W = 300;
  return (
    <div className="bg-white border-2 border-sky-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap gap-2">
        {STRIP_TASKS.map((t, i) => (
          <button
            key={i}
            onClick={() => {
              setTi(i);
              setMsg(null);
            }}
            className={`px-3 h-11 rounded-xl text-sm font-black border-2 ${
              i === ti ? 'bg-sky-600 text-white border-sky-700' : done.includes(i) ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            {fracWord(t.colored, t.parts)} {done.includes(i) ? '✓' : ''}
          </button>
        ))}
      </div>
      <div className="rounded-xl bg-sky-50 border border-sky-200 p-3 text-center font-bold text-slate-800">
        Feladat: törd a csokit egyenlő részekre, és színezd ki a {fracWord(task.colored, task.parts)} részét!
      </div>
      <div className="text-sm font-bold text-slate-600">1. Hány egyenlő részre töröd?</div>
      <div className="grid grid-cols-7 gap-2">
        {STRIP_PARTS.map((n) => (
          <button
            key={n}
            onClick={() => {
              setParts(n);
              setColored([]);
              setMsg(null);
            }}
            className={`h-12 rounded-xl text-lg font-black border-2 ${n === parts ? 'bg-sky-600 text-white border-sky-700' : 'bg-white text-slate-800 border-slate-200 hover:bg-sky-50'}`}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="text-sm font-bold text-slate-600">2. Koppints a kockákra!</div>
      <svg viewBox={`0 0 ${W + 20} 90`} className="w-full max-w-xl h-auto mx-auto select-none">
        {Array.from({ length: parts }, (_, i) => (
          <rect
            key={i}
            x={10 + (i * W) / parts}
            y={10}
            width={W / parts - 3}
            height={70}
            rx="6"
            fill={colored.includes(i) ? '#7c2d12' : '#fde7d2'}
            stroke="#78350f"
            strokeWidth="2"
            onClick={() => toggle(i)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </svg>
      <div className="grid grid-cols-2 gap-3 text-center">
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-2">
          <div className="text-xs text-slate-500">barna (színes) rész</div>
          <div className="text-xl font-black text-amber-900">{read.colored}</div>
        </div>
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-2">
          <div className="text-xs text-slate-500">világos (fehér) rész</div>
          <div className="text-xl font-black text-slate-700">{read.white}</div>
        </div>
      </div>
      <button onClick={check} className="w-full h-12 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-black">
        Ellenőrzöm
      </button>
      {msg && <div className={`text-sm font-bold text-center ${msg.startsWith('Ügyes') ? 'text-emerald-700' : 'text-rose-700'}`}>{msg}</div>}
      {done.length === STRIP_TASKS.length && (
        <TheoryCallout type="success" title="Minden csoki kész! 🍫">
          Mindegyik törtnél kevesebb részt színeztél, mint ahány részre törted a csokit. Ezért mindegyik egynél kisebb tört.
        </TheoryCallout>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Labor II – Gyöngyfűzés
// ---------------------------------------------------------------------------
export const BEAD_TASKS: { n: number; red: number; text: string }[] = [
  { n: 3, red: 2, text: '3 gyöngy, a 2 harmada piros' },
  { n: 4, red: 1, text: '4 gyöngy, az 1 negyede piros' },
  { n: 4, red: 3, text: '4 gyöngy, a 3 negyede piros' },
  { n: 5, red: 2, text: '5 gyöngy, a 2 ötöde piros' },
  { n: 6, red: 5, text: '6 gyöngy, az 5 hatoda piros' }
];

const BeadLab: React.FC = () => {
  const [ti, setTi] = useState(0);
  const task = BEAD_TASKS[ti];
  const [beads, setBeads] = useState<string>('y'.repeat(BEAD_TASKS[0].n));
  const [done, setDone] = useState<number[]>([]);
  const red = beads.split('').filter((b) => b === 'r').length;
  const ok = red === task.red;

  const pickTask = (i: number) => {
    setTi(i);
    setBeads('y'.repeat(BEAD_TASKS[i].n));
  };
  const toggle = (i: number) => {
    const arr = beads.split('');
    arr[i] = arr[i] === 'r' ? 'y' : 'r';
    const nb = arr.join('');
    setBeads(nb);
    if (nb.split('').filter((b) => b === 'r').length === task.red && !done.includes(ti)) setDone([...done, ti]);
  };
  const gap = 44;
  const width = (task.n - 1) * gap + 60;

  return (
    <div className="bg-white border-2 border-rose-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap gap-2">
        {BEAD_TASKS.map((t, i) => (
          <button
            key={i}
            onClick={() => pickTask(i)}
            className={`px-3 h-11 rounded-xl text-sm font-black border-2 ${
              i === ti ? 'bg-rose-600 text-white border-rose-700' : done.includes(i) ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            {i + 1}. {done.includes(i) ? '✓' : ''}
          </button>
        ))}
      </div>
      <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-center font-bold text-slate-800">Fűzd fel: {task.text}! Koppints a gyöngyökre, hogy átszínezd őket.</div>
      <svg viewBox={`0 0 ${width} 70`} className="w-full max-w-md h-auto mx-auto select-none">
        <BeadsG x={30} y={36} beads={beads} r={17} gap={gap} />
        {beads.split('').map((_, i) => (
          <circle key={i} cx={30 + i * gap} cy={36} r={20} fill="transparent" onClick={() => toggle(i)} style={{ cursor: 'pointer' }} />
        ))}
      </svg>
      <div className="grid grid-cols-2 gap-3 text-center">
        <div className="rounded-xl bg-rose-50 border border-rose-200 p-2">
          <div className="text-xs text-slate-500">piros</div>
          <div className="text-xl font-black text-rose-700">{red === 0 ? 'semmi' : fracWord(red, task.n)}</div>
        </div>
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-2">
          <div className="text-xs text-slate-500">sárga</div>
          <div className="text-xl font-black text-amber-700">{task.n - red === 0 ? 'semmi' : fracWord(task.n - red, task.n)}</div>
        </div>
      </div>
      <div className={`text-sm font-bold text-center ${ok ? 'text-emerald-700' : 'text-slate-500'}`}>
        {ok
          ? `Kész! ${task.n} gyöngyből ${task.red} piros: ${fracWord(task.red, task.n)}. Mindegy, melyik gyöngyöt színezed!`
          : `Most ${red} piros gyöngyöd van. ${task.red} kell.`}
      </div>
      {done.length === BEAD_TASKS.length && (
        <TheoryCallout type="success" title="Gyönyörű gyöngysorok! 📿">
          A gyöngyök száma mondja meg, hány egyenlő részre osztjuk a gyöngysort. A piros gyöngyök száma mondja meg, hány részt veszünk.
        </TheoryCallout>
      )}
    </div>
  );
};

export const ProperFractionsTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  return (
    <TheoryTemplate
      grade={4}
      chapterId="tortszamok"
      topicId="g4-fractions"
      subtopicId="egynel-kisebb-tortek"
      title="2. Egynél kisebb törtek"
      subtitle="2 harmad, 3 negyed, 7 tized: hogyan olvassuk le, ha több egyenlő részt színeztünk ki?"
      badge="4. OSZTÁLY • VIII. A TÖRTSZÁMOK • TANANYAG"
      themeColor="sky"
      pdfFilename="4_osztaly_egynel_kisebb_tortek_tananyag.pdf"
      practiceTitle="Készen állsz a törtek leolvasására?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — KÉT KÉRDÉS',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-sky-50/90 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800/80 text-center">
              <span className="text-base font-black text-sky-900 dark:text-sky-200">3 negyed = 4 egyenlő rész közül 3</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Hány egyenlő részre</strong> osztottuk? Ez adja a nevet: negyed.
              </li>
              <li>
                <strong>Hány részt</strong> színeztünk ki? Ez a szám kerül elé: 3.
              </li>
              <li>Ha kevesebb részt veszünk, mint ahány rész van, a tört egynél kisebb.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 149. o." badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Az 1. leckében mindig <strong>1 részt</strong> vettünk: 1 harmad, 1 negyed. Most <strong>több részt</strong> is kiszínezünk.
            </p>
            <p>
              Ha a pizzát 4 egyenlő szeletre vágjuk, és 3 szeletet megeszünk, akkor <strong>3 negyed</strong> pizzát ettünk. Ami megmaradt, az <strong>1 negyed</strong>.
            </p>
            <p>
              A 3 negyed kevesebb, mint az egész pizza. Az ilyen törteket <strong>egynél kisebb törteknek</strong> nevezzük.
            </p>
          </div>
          <ThreeQuartersSvg />
        </div>
      </TheorySection>

      {/* 2. Leolvasás */}
      <TheorySection title="2. Hogyan olvasom le?" badge="Lépésről lépésre" badgeColor="indigo">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <TheoryCard title="Két kérdést teszek fel" badge="Szabály" badgeColor="indigo">
            <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700">
              <li>
                Hány <strong>egyenlő</strong> részre osztottuk az egészet? <em>5 részre → ötöd.</em>
              </li>
              <li>
                Hány részt színeztünk ki? <em>3 részt → 3 ötöd.</em>
              </li>
              <li>
                A fehér rész is tört: 5 rész közül 2 fehér → <strong>2 ötöd</strong>.
              </li>
            </ol>
          </TheoryCard>
          <TheoryTable
            headers={['Egyenlő részek', 'Színes részek', 'Színes', 'Fehér']}
            rows={[
              ['3', '2', '2 harmad', '1 harmad'],
              ['4', '3', '3 negyed', '1 negyed'],
              ['5', '3', '3 ötöd', '2 ötöd'],
              ['6', '5', '5 hatod', '1 hatod'],
              ['8', '3', '3 nyolcad', '5 nyolcad'],
              ['10', '7', '7 tized', '3 tized']
            ]}
          />
        </div>
      </TheorySection>

      {/* 3. Nézzük meg együtt */}
      <TheorySection title="3. Nézzük meg együtt! Kék és sárga, piros és sárga" badge="Tankönyv 149. o., 7–8. feladat" badgeColor="emerald">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <TheoryCard title="Mindegyik ábra 1 egészet ér" badge="7. feladat" badgeColor="sky">
            <GridColorsSvg />
            <p className="text-sm text-slate-700 mt-2">
              Az első rácsban 4 egyforma oszlop van, ebből 1 kék: a rács <strong>1 negyede</strong> kék, <strong>3 negyede</strong> sárga. A másodikban 3 egyforma sor van, 1 kék: <strong>1 harmad</strong> kék, <strong>2 harmad</strong> sárga.
            </p>
          </TheoryCard>
          <TheoryCard title="A vendégek poharai" badge="8. feladat" badgeColor="rose">
            <CupsSvg />
            <p className="text-sm text-slate-700 mt-2">
              12 pohár van, ebből 4 piros. A poharakat 3 egyforma csoportba rakhatjuk, 4-4 pohárral. Egy csoport piros: a poharak <strong>1 harmada</strong> piros, <strong>2 harmada</strong> sárga.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Zászlók */}
      <TheorySection title="4. Hová utaznak a családok?" badge="Tankönyv 151. o., 16. feladat" badgeColor="orange">
        <CountryFlagsSvg />
        <TheoryTable
          headers={['Ki mondta?', 'Mit mondott?', 'Melyik ország?']}
          rows={[
            ['Karesz', 'A zászló 1 harmad része piros, és nincs benne zöld.', 'Németország'],
            ['Manó', 'A zászló 2 harmad része piros.', 'Ausztria'],
            ['Gergő', 'Egy tóhoz utazunk. 1 harmad piros, 1 harmad fehér.', 'Magyarország (Balaton)'],
            ['Bálint', 'A zászló 1 ketted része fehér.', 'Monaco']
          ]}
        />
        <TheoryCallout type="info" title="A kakukktojás">
          A görög zászló a kakukktojás: a csíkjai nem 2 vagy 3 egyenlő részre osztják a zászlót, és a sarkában kereszt is van.
        </TheoryCallout>
      </TheorySection>

      {/* 5. Gyöngyök és céltábla */}
      <TheorySection title="5. Gyöngyök és céltábla" badge="Munkafüzet 67. o., 5–6. feladat" badgeColor="violet">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <TheoryCard title="Hányad része sárga, hányad része piros?" badge="6. feladat" badgeColor="rose">
            <BeadsSvg />
            <p className="text-sm text-slate-700 mt-2">Most nem egy egészet vágunk fel, hanem több dolgot számolunk meg. Az összes gyöngy az egész.</p>
          </TheoryCard>
          <TheoryCard title="Janka 10 lövése" badge="5. feladat" badgeColor="sky">
            <ArcherySvg />
            <p className="text-sm text-slate-700 mt-2">
              10 lövés az egész, így minden lövés <strong>1 tized</strong>. 8 lövés talált: <strong>8 tized</strong>. 2 ment mellé: <strong>2 tized</strong>.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6. Kisegér */}
      <TheorySection title="6. Az éhes kisegér" badge="Tankönyv 149. o., 9. feladat" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <CheeseSvg />
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
            <li>1. nap: megette a sajt felét. Megmaradt a <strong>fele</strong>.</li>
            <li>2. nap: a maradék felét ette meg. A fele fele: megmaradt <strong>1 negyede</strong>.</li>
            <li>3. nap: a megmaradt sajt felét ette meg. Az 1 negyed fele: megmaradt <strong>1 nyolcada</strong>.</li>
            <li>Rajzold le egy csíkkal, és mindig a megmaradt részt felezd!</li>
          </ul>
        </div>
      </TheorySection>

      {/* 7. Vigyázz */}
      <TheorySection title="7. Vigyázz! Az összes részt számold!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="3 színes és 1 fehér rész: ez nem 1 harmad fehér"
          wrong="1 fehér rész van és 3 színes, tehát 1 harmad fehér."
          wrongExplanation="Ilyenkor a fehéret csak a színesekhez hasonlítottuk. Pedig az egész 4 részből áll."
          correct="4 egyenlő rész van, ebből 1 fehér: 1 negyed fehér, 3 negyed színes."
          correctExplanation="A tört neve mindig az ÖSSZES egyenlő rész számából jön (színes + fehér)."
          tip="Először számold meg az összes részt, csak utána a színeseket!"
        />
        <TheoryCallout type="tip" title="Színes + fehér = 1 egész">
          3 negyed színes és 1 negyed fehér: együtt 4 negyed, vagyis az egész. Erről a 3. leckében többet tanulunk!
        </TheoryCallout>
      </TheorySection>

      {/* 8. Labor I */}
      <TheorySection title="8. Játékos labor I: Csokitábla-színező" badge="Labor" badgeColor="sky">
        <p className="text-sm text-slate-600">Válassz törtet! Törd a csokit annyi egyenlő részre, amennyit a tört neve mond, aztán színezd ki a kért számú kockát!</p>
        <StripLab />
      </TheorySection>

      {/* 9. Labor II */}
      <TheorySection title="9. Játékos labor II: Gyöngyfűzés" badge="Labor" badgeColor="rose">
        <p className="text-sm text-slate-600">Fűzz gyöngysort a feladat szerint! A piros és a sárga részt is leolvasod.</p>
        <BeadLab />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ProperFractionsTheory;
