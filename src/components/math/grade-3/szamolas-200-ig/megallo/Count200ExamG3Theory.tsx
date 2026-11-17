import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { Count200BlocksSvg, Count200NumberLineSvg, Count200RoundingSvg, Count200AddSubSvg, Count200MulDivSvg, Count200MoneySvg } from './Count200ExamG3Figures';
import { FONT, INK, Blocks, art, Art, ban, at } from './Count200ExamG3Parts';

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

// ---------------------------------------------------------------------------
// Számok kiírása betűvel (1–200)
// ---------------------------------------------------------------------------
const ONES = ['', 'egy', 'kettő', 'három', 'négy', 'öt', 'hat', 'hét', 'nyolc', 'kilenc'];
const TENS_ALONE = ['', 'tíz', 'húsz', 'harminc', 'negyven', 'ötven', 'hatvan', 'hetven', 'nyolcvan', 'kilencven'];
const TENS_JOIN = ['', 'tizen', 'huszon', 'harminc', 'negyven', 'ötven', 'hatvan', 'hetven', 'nyolcvan', 'kilencven'];
export const numberWord = (n: number): string => {
  if (n === 200) return 'kétszáz';
  const h = Math.floor(n / 100);
  const t = Math.floor((n % 100) / 10);
  const e = n % 10;
  const rest = e === 0 ? TENS_ALONE[t] : TENS_JOIN[t] + ONES[e];
  return (h === 1 ? 'száz' : '') + rest;
};

// ---------------------------------------------------------------------------
// Labor I: vegyes feladatok (minden szám 0 és 200 között)
// ---------------------------------------------------------------------------
export type Count200TaskKind = 'szam' | 'szomszed' | 'kerekites' | 'osszeadas' | 'kivonas' | 'szorzas' | 'osztas' | 'sorrend';
export type Count200Task = { text: string; answer: number; hint: string; mistakes: { v: number; msg: string }[] };

const KINDS: { id: Count200TaskKind; label: string }[] = [
  { id: 'szam', label: 'Számok' },
  { id: 'szomszed', label: 'Szomszédok' },
  { id: 'kerekites', label: 'Kerekítés' },
  { id: 'osszeadas', label: 'Összeadás' },
  { id: 'kivonas', label: 'Kivonás' },
  { id: 'szorzas', label: 'Szorzás' },
  { id: 'osztas', label: 'Osztás' },
  { id: 'sorrend', label: 'Sorrend' }
];

const nonRound = (a: number, b: number) => {
  let n = rnd(a, b);
  while (n % 10 === 0) n = rnd(a, b);
  return n;
};

const rawTask = (kind: Count200TaskKind): Count200Task => {
  switch (kind) {
    case 'szam': {
      const n = rnd(101, 199);
      const t = Math.floor((n % 100) / 10);
      const e = n % 10;
      if (rnd(0, 1) === 0) {
        return {
          text: `1 százas + ${t} tízes + ${e} egyes =`,
          answer: n,
          hint: 'Írd egymás mellé: százasok, tízesek, egyesek!',
          mistakes: [{ v: 100 + e * 10 + t, msg: 'Felcserélted a tízeseket és az egyeseket. A tízesek jönnek középre!' }]
        };
      }
      const T = Math.floor(n / 10);
      return {
        text: `${T} tízes + ${e} egyes =`,
        answer: n,
        hint: `${T} tízes = ${T * 10}. Ehhez add hozzá az egyeseket!`,
        mistakes: [{ v: T + e, msg: `Nem a számjegyeket kell összeadni. ${T} tízes = ${T * 10}, és még ${e} egyes.` }]
      };
    }
    case 'szomszed': {
      const n = nonRound(101, 199);
      const lo = Math.floor(n / 10) * 10;
      const w = rnd(0, 3);
      if (w === 0) return { text: `A ${n} kisebb egyes szomszédja:`, answer: n - 1, hint: 'Az egyes szomszéd 1-gyel kisebb vagy nagyobb.', mistakes: [{ v: n + 1, msg: 'Ez a nagyobb szomszéd. Most a kisebbet keresd!' }] };
      if (w === 1) return { text: `A ${n} nagyobb egyes szomszédja:`, answer: n + 1, hint: 'Az egyes szomszéd 1-gyel kisebb vagy nagyobb.', mistakes: [{ v: n - 1, msg: 'Ez a kisebb szomszéd. Most a nagyobbat keresd!' }] };
      if (w === 2)
        return {
          text: `A ${n} kisebb tízes szomszédja:`,
          answer: lo,
          hint: 'Melyik két kerek tízes között van a szám?',
          mistakes: [
            { v: lo + 10, msg: 'Ez a nagyobb tízes szomszéd. A kisebbet keresd!' },
            { v: n - 1, msg: 'Ez az egyes szomszéd. Kerek tízest keresünk!' }
          ]
        };
      return {
        text: `A ${n} nagyobb tízes szomszédja:`,
        answer: lo + 10,
        hint: 'Melyik két kerek tízes között van a szám?',
        mistakes: [
          { v: lo, msg: 'Ez a kisebb tízes szomszéd. A nagyobbat keresd!' },
          { v: n + 1, msg: 'Ez az egyes szomszéd. Kerek tízest keresünk!' }
        ]
      };
    }
    case 'kerekites': {
      const n = rnd(0, 3) === 0 ? rnd(10, 19) * 10 + 5 : nonRound(101, 199);
      const lo = Math.floor(n / 10) * 10;
      const ans = n % 10 >= 5 ? lo + 10 : lo;
      const other = ans === lo ? lo + 10 : lo;
      return {
        text: `${n} ≈ ? (tízesre)`,
        answer: ans,
        hint: `A ${n} a ${lo} és a ${lo + 10} között van. Melyikhez van közelebb?`,
        mistakes: [
          {
            v: other,
            msg: n % 10 === 5 ? 'Ha az egyesek helyén 5 áll, a nagyobb tízesre kerekítünk!' : `A ${n} a másik tízeshez van közelebb. Számold meg a lépéseket a számegyenesen!`
          },
          { v: n, msg: 'Kerek tízes kell: az egyesek helyén 0 áll.' }
        ]
      };
    }
    case 'osszeadas': {
      if (rnd(0, 1) === 0) {
        const a = rnd(3, 15) * 10;
        const b = rnd(2, Math.min(9, 20 - a / 10)) * 10;
        return {
          text: `${a} + ${b} =`,
          answer: a + b,
          hint: `Tízesekkel: ${a / 10} tízes + ${b / 10} tízes = ${(a + b) / 10} tízes.`,
          mistakes: [{ v: a + b / 10, msg: `${Art(b)} ${b} nem ${b / 10}, hanem ${b / 10} tízes! Adj hozzá ${b / 10} tízest.` }]
        };
      }
      const a = nonRound(101, 169);
      const b = rnd(1, Math.floor((200 - a) / 10)) * 10;
      return {
        text: `${a} + ${b} =`,
        answer: a + b,
        hint: `Csak a tízesek változnak: ${Math.floor(a / 10)} tízes + ${b / 10} tízes.`,
        mistakes: [{ v: a + b / 10, msg: `${Art(b)} ${b} nem ${b / 10}, hanem ${b / 10} tízes. Az egyesek nem változnak!` }]
      };
    }
    case 'kivonas': {
      if (rnd(0, 1) === 0) {
        const a = rnd(11, 20) * 10;
        const b = rnd(2, 9) * 10;
        return {
          text: `${a} − ${b} =`,
          answer: a - b,
          hint: `Tízesekkel: ${a / 10} tízes − ${b / 10} tízes = ${(a - b) / 10} tízes.`,
          mistakes: [
            { v: a + b, msg: 'Összeadtad a számokat. Itt el kell venni!' },
            { v: a - b / 10, msg: `${Art(b)} ${b} nem ${b / 10}, hanem ${b / 10} tízes!` }
          ]
        };
      }
      const a = nonRound(121, 199);
      const b = rnd(1, Math.floor((a - 100) / 10)) * 10;
      return {
        text: `${a} − ${b} =`,
        answer: a - b,
        hint: `Csak a tízesek változnak: ${Math.floor(a / 10)} tízes − ${b / 10} tízes.`,
        mistakes: [{ v: a - b / 10, msg: `${Art(b)} ${b} nem ${b / 10}, hanem ${b / 10} tízes. Az egyesek maradnak!` }]
      };
    }
    case 'szorzas': {
      let a = rnd(2, 9);
      let t = rnd(2, 9);
      while (a * t > 20) {
        a = rnd(2, 9);
        t = rnd(2, 9);
      }
      return {
        text: `${a} · ${t * 10} =`,
        answer: a * t * 10,
        hint: `${a} · ${t} tízes = ${a * t} tízes.`,
        mistakes: [
          { v: a * t, msg: `Ez csak ${a} · ${t}. Ne felejtsd el: ${a * t} tízes = ${a * t * 10}!` },
          { v: a + t * 10, msg: 'Összeadtad a számokat. Itt szorozni kell!' }
        ]
      };
    }
    case 'osztas': {
      let a = rnd(2, 9);
      let t = rnd(2, 9);
      while (a * t > 20) {
        a = rnd(2, 9);
        t = rnd(2, 9);
      }
      const P = a * t * 10;
      if (rnd(0, 1) === 0) {
        return {
          text: `${P} : ${a} =`,
          answer: t * 10,
          hint: `${P} = ${a * t} tízes. ${a * t} tízes : ${a} = ? tízes`,
          mistakes: [{ v: t, msg: `Ez csak ${a * t} : ${a}. Az eredmény is tízes: ${t} tízes = ${t * 10}.` }]
        };
      }
      return {
        text: `${P} : ${t * 10} =`,
        answer: a,
        hint: `Hányszor van meg ${art(t * 10)} ${t * 10} ${art(P)} ${ban(P)}? Ugráld végig!`,
        mistakes: [{ v: a * 10, msg: `Ellenőrizd szorzással: ${a * 10} · ${t * 10} sokkal több, mint ${P}.` }]
      };
    }
    case 'sorrend':
    default: {
      const w = rnd(0, 2);
      if (w === 0) {
        const b = rnd(2, 4);
        const c = rnd(2, 4) * 10;
        const a = rnd(1, Math.floor((200 - b * c) / 10)) * 10;
        return {
          text: `${a} + ${b} · ${c} =`,
          answer: a + b * c,
          hint: 'Előbb a szorzás, aztán az összeadás!',
          mistakes: [{ v: (a + b) * c, msg: 'Balról jobbra számoltál. Előbb a szorzást kell elvégezni!' }]
        };
      }
      if (w === 1) {
        const b = rnd(2, 4);
        const c = rnd(2, 4) * 10;
        const a = rnd(Math.ceil((b * c) / 10) + 1, 20) * 10;
        return {
          text: `${a} − ${b} · ${c} =`,
          answer: a - b * c,
          hint: 'Előbb a szorzás, aztán a kivonás!',
          mistakes: [{ v: (a - b) * c, msg: 'Balról jobbra számoltál. Előbb a szorzást kell elvégezni!' }]
        };
      }
      const c = rnd(2, 5);
      const q = rnd(1, 4) * 10;
      const a = rnd(1, Math.floor((200 - q) / 10)) * 10;
      return {
        text: `${a} + ${c * q} : ${c} =`,
        answer: a + q,
        hint: 'Előbb az osztás, aztán az összeadás!',
        mistakes: [{ v: (a + c * q) / c, msg: 'Balról jobbra számoltál. Előbb az osztást kell elvégezni!' }]
      };
    }
  }
};

export const makeCount200Task = (kind: Count200TaskKind): Count200Task => {
  const t = rawTask(kind);
  return { ...t, mistakes: t.mistakes.filter((m) => m.v !== t.answer) };
};

// ---------------------------------------------------------------------------
// Labor II: Építsd meg a számot! (1–200)
// ---------------------------------------------------------------------------
export const makeBuildTarget = (): { n: number; asWord: boolean } => {
  const r = rnd(0, 9);
  const n = r === 0 ? 200 : r === 1 ? rnd(2, 9) * 10 + rnd(0, 9) : rnd(101, 199);
  return { n, asWord: rnd(0, 1) === 1 };
};

export const Count200ExamG3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [kind, setKind] = useState<Count200TaskKind>('szam');
  const [task, setTask] = useState<Count200Task>(() => ({
    text: '1 százas + 6 tízes + 4 egyes =',
    answer: 164,
    hint: 'Írd egymás mellé: százasok, tízesek, egyesek!',
    mistakes: [{ v: 146, msg: 'Felcserélted a tízeseket és az egyeseket. A tízesek jönnek középre!' }]
  }));
  const [input, setInput] = useState('');
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const pickKind = (k: Count200TaskKind) => {
    setKind(k);
    setTask(makeCount200Task(k));
    setInput('');
    setMsg(null);
  };
  const press = (d: string) => {
    setMsg(null);
    setInput((s) => (s.length >= 3 ? s : s + d));
  };
  const check = () => {
    if (!input) return;
    const v = Number(input);
    if (v === task.answer) {
      const solved = task.text.includes('?') ? task.text.replace('?', String(task.answer)).replace(' (tízesre)', '') : `${task.text} ${task.answer}`;
      setMsg({ ok: true, text: `Ügyes! ${solved}` });
      return;
    }
    const m = task.mistakes.find((x) => x.v === v);
    setMsg({ ok: false, text: m ? m.msg : `Még nem jó. Tipp: ${task.hint}` });
  };

  // Labor II
  const [target, setTarget] = useState<{ n: number; asWord: boolean }>({ n: 158, asWord: true });
  const [hh, setH] = useState(0);
  const [tt, setT] = useState(0);
  const [ee, setE] = useState(0);
  const [msg2, setMsg2] = useState<{ ok: boolean; text: string } | null>(null);
  const built = hh * 100 + tt * 10 + ee;
  const check2 = () => {
    const n = target.n;
    const th = Math.floor(n / 100);
    const tT = Math.floor((n % 100) / 10);
    const tE = n % 10;
    if (built === n) {
      setMsg2({ ok: true, text: `Szuper! ${hh} százas + ${tt} tízes + ${ee} egyes = ${n}${target.asWord ? ` (${numberWord(n)})` : ''}.` });
    } else if (hh === th && tt === tE && ee === tT) {
      setMsg2({ ok: false, text: 'Felcserélted a tízeseket és az egyeseket! Nézd meg újra, mennyi a tízes és mennyi az egyes.' });
    } else if (hh !== th) {
      setMsg2({ ok: false, text: `Most ${built > 0 ? at(built) : 'semmit sem'} raktál ki. Nézd meg a százasokat: ${th} százas kell.` });
    } else if (tt !== tT) {
      setMsg2({ ok: false, text: `A százasok jók. A tízesekkel van baj: ${tT} tízes kell.` });
    } else {
      setMsg2({ ok: false, text: `Már csak az egyesek: ${tE} egyes kell.` });
    }
  };
  const new2 = () => {
    let t = makeBuildTarget();
    while (t.n === target.n) t = makeBuildTarget();
    setTarget(t);
    setH(0);
    setT(0);
    setE(0);
    setMsg2(null);
  };
  const steppers = [
    { label: 'Százas', v: hh, set: setH, max: 2, color: 'bg-red-500' },
    { label: 'Tízes', v: tt, set: setT, max: 9, color: 'bg-blue-500' },
    { label: 'Egyes', v: ee, set: setE, max: 9, color: 'bg-yellow-400' }
  ];
  const blockW = hh * 56 + tt * 10 + (ee ? 30 : 0) + 30;
  const scale = Math.min(1, 220 / Math.max(1, blockW));

  return (
    <TheoryTemplate
      topicId="g3-count-200"
      subtopicId="megallo"
      grade={3}
      chapterId="szamolas-200-ig"
      title="6. Megálló – tudáspróba"
      subtitle="Amit a 200-as számkörről tanultál: számok, számegyenes, szomszédok, kerekítés és a négy alapművelet."
      badge="3. OSZTÁLY • III. SZÁMOLÁS 0-TÓL 200-IG • TANANYAG"
      themeColor="emerald"
      pdfFilename="3_osztaly_megallo_200_ig_tananyag.pdf"
      practiceTitle="Jöhet a tudáspróba?"
      practiceSubtitle="90 kérdés 3 szinten – próbáld ki magad!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'A LEGFONTOSABBAK 200-IG',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center font-mono text-base font-black text-emerald-900 dark:text-emerald-200">
              176 = 1 százas + 7 tízes + 6 egyes
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Tízesre kerekítés: a közelebbi kerek tízes. Ha az egyes 5, felfelé: 185 ≈ 190.</li>
              <li>Kerek tízesekkel úgy számolj, mint a szorzótáblával: 4 · 30 = 12 tízes = 120.</li>
              <li>Előbb a szorzás és az osztás, aztán az összeadás és a kivonás.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Amit már tudsz" badge="Tankönyv 28–43. o." badgeColor="emerald">
        <TheoryTable
          headers={['Mit tudsz?', 'Röviden', 'Példa', 'Lecke']}
          rows={[
            ['Számok 200-ig', 'százas, tízes, egyes', '163 = 1 sz + 6 t + 3 e = 16 tízes + 3 egyes', '1.'],
            ['Számegyenes', 'nézd meg, mennyit ér egy kis osztás', '100 és 200 között 10-esével: 130, 140 …', '2.'],
            ['Számszomszédok', 'egyes szomszéd ± 1, tízes szomszéd: kerek tízes', '147: 146 és 148; 140 és 150', '3.'],
            ['Kerekítés tízesre', 'a közelebbi kerek tízes, 5-nél felfelé', '143 ≈ 140, 145 ≈ 150', '3.'],
            ['Összeadás, kivonás', 'tízesekkel számolunk, 100-on át is', '60 + 50 = 110, 180 − 90 = 90', '4.'],
            ['Szorzás, osztás', 'kerek tízesek, a szorzótábla segít', '4 · 30 = 120, 120 : 4 = 30', '5.']
          ]}
        />
      </TheorySection>

      <TheorySection title="2. Számok és számegyenes" badge="Ismétlés" badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Count200BlocksSvg />
          <Count200NumberLineSvg />
        </div>
        <TheoryCallout type="tip" title="Alaki és valódi érték">
          A 176-ban a 7 <strong>alaki értéke</strong> 7, a <strong>helyi értéke</strong> tízes, a <strong>valódi értéke</strong> 70.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="3. Szomszédok és kerekítés" badge="Ismétlés" badgeColor="cyan">
        <Count200RoundingSvg />
        <p className="text-sm text-slate-700">
          A 147 tízes szomszédjai: 140 és 150. A 150-hez van közelebb, ezért <strong>147 ≈ 150</strong>.
        </p>
      </TheorySection>

      <TheorySection title="4. A négy alapművelet" badge="Ismétlés" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Count200AddSubSvg />
          <Count200MulDivSvg />
          <Count200MoneySvg />
        </div>
      </TheorySection>

      <TheorySection title="5. Nézzük meg együtt!" badge="Vegyes feladatok" badgeColor="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="A) Melyik szám ez?" badge="számok" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>15 tízes és 8 egyes.</li>
              <li>15 tízes = 150.</li>
              <li>150 + 8 = <strong>158</strong> (százötvennyolc).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) 180 − 90 = ?" badge="kivonás" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Két lépésben: 180 − 80 = 100.</li>
              <li>100 − 10 = <strong>90</strong>.</li>
              <li>Ellenőrzés: 90 + 90 = 180.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) 100 + 60 : 2 = ?" badge="sorrend" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Előbb az osztás: 60 : 2 = 30.</li>
              <li>Aztán az összeadás: 100 + 30 = <strong>130</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Mennyit fizetsz kb.?" badge="szöveges" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A kifli 46 Ft, a tej 128 Ft.</li>
              <li>Kerekítve: 46 ≈ 50, 128 ≈ 130.</li>
              <li>Kb. 50 + 130 = <strong>180 Ft</strong>-ot fizetsz.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="6. Vigyázz! Gyakori hibák" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Hiányzó tízes"
          wrong="1 százas + 8 egyes = 18"
          wrongExplanation="A százas nem tűnhet el! És a tízesek helyére 0 kerül, ha nincs tízes."
          correct="1 százas + 8 egyes = 108"
          correctExplanation="1 százas, 0 tízes, 8 egyes: 108."
          tip="Rakd ki: egy piros lap, egy kék rúd sem, nyolc sárga kocka."
        />
        <TheoryCallout type="warning" title="Kerekítés 5-nél">
          A 165 pont középen van a 160 és a 170 között. Ilyenkor <strong>felfelé</strong> kerekítünk: 165 ≈ 170.
        </TheoryCallout>
      </TheorySection>

      {/* Labor I */}
      <TheorySection title="7. Labor I: Vegyes feladatok" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {KINDS.map((k) => (
              <button
                key={k.id}
                onClick={() => pickKind(k.id)}
                className={`px-3 py-2 rounded-xl text-sm font-bold min-h-[44px] border-2 ${kind === k.id ? 'bg-emerald-600 border-emerald-700 text-white' : 'bg-white border-emerald-200 text-emerald-800'}`}
              >
                {k.label}
              </button>
            ))}
          </div>
          <div className="text-center text-2xl sm:text-3xl font-black text-emerald-900 bg-emerald-50 rounded-xl py-4 px-2">
            {task.text} <span className="text-rose-600">{input || '?'}</span>
          </div>
          <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((d) => (
              <button key={d} onClick={() => press(d)} className="rounded-xl bg-slate-100 border-2 border-slate-200 text-2xl font-black py-3 min-h-[52px]">
                {d}
              </button>
            ))}
            <button
              onClick={() => {
                setInput((s) => s.slice(0, -1));
                setMsg(null);
              }}
              className="rounded-xl bg-slate-200 text-xl font-black py-3 min-h-[52px] col-span-2"
              aria-label="Törlés"
            >
              ⌫
            </button>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <button onClick={check} className="px-5 py-3 rounded-xl bg-emerald-600 text-white font-bold min-h-[48px]">
              Ellenőrzés
            </button>
            <button onClick={() => pickKind(kind)} className="px-5 py-3 rounded-xl bg-slate-200 text-slate-700 font-bold min-h-[48px]">
              Új feladat
            </button>
          </div>
          {msg && (
            <div className={`rounded-xl p-3 text-center text-sm font-bold ${msg.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}`}>{msg.text}</div>
          )}
        </div>
      </TheorySection>

      {/* Labor II */}
      <TheorySection title="8. Labor II: Építsd meg a számot!" badge="Labor" badgeColor="sky">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-sky-50 rounded-xl p-3 text-xl text-sky-900 font-black text-center">Rakd ki: {target.asWord ? numberWord(target.n) : target.n}</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {steppers.map((s) => (
              <div key={s.label} className="flex items-center justify-center gap-2 bg-slate-50 rounded-xl p-2 border">
                <button
                  onClick={() => {
                    s.set(Math.max(0, s.v - 1));
                    setMsg2(null);
                  }}
                  className="w-12 h-12 rounded-xl bg-slate-200 text-2xl font-black"
                  aria-label={`${s.label} kevesebb`}
                >
                  −
                </button>
                <div className="text-center min-w-[64px]">
                  <div className="text-xs text-slate-500">{s.label}</div>
                  <div className="text-2xl font-black text-slate-800">{s.v}</div>
                </div>
                <button
                  onClick={() => {
                    s.set(Math.min(s.max, s.v + 1));
                    setMsg2(null);
                  }}
                  className={`w-12 h-12 rounded-xl ${s.color} text-white text-2xl font-black`}
                  aria-label={`${s.label} több`}
                >
                  +
                </button>
              </div>
            ))}
          </div>
          <svg viewBox="0 0 240 90" className="w-full max-w-md h-auto mx-auto bg-sky-50/40 rounded-xl border border-sky-100" fontFamily={FONT}>
            <g transform={`translate(${120 - 120 * scale} ${8 + 30 * (1 - scale)}) scale(${scale})`}>
              <Blocks h={hh} t={tt} e={ee} y={4} s={50} />
            </g>
            <text x="120" y="84" textAnchor="middle" fontSize="11" fill={INK}>
              {hh} százas, {tt} tízes, {ee} egyes
            </text>
          </svg>
          <div className="flex flex-wrap gap-2 justify-center">
            <button onClick={check2} className="px-5 py-3 rounded-xl bg-sky-600 text-white font-bold min-h-[48px]">
              Ellenőrzés
            </button>
            <button onClick={new2} className="px-5 py-3 rounded-xl bg-slate-200 text-slate-700 font-bold min-h-[48px]">
              Új feladat
            </button>
          </div>
          {msg2 && (
            <div className={`rounded-xl p-3 text-center text-sm font-bold ${msg2.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}`}>{msg2.text}</div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default Count200ExamG3Theory;
