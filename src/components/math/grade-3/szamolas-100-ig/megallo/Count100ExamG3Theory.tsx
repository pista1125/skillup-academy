import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import {
  Count100TensOnesSvg,
  Count100NumberLineSvg,
  Count100RemainderSvg,
  Count100OrderStepsSvg,
  Count100DominoSquareSvg,
  Count100ChainSvg
} from './Count100ExamG3Figures';
import { FONT } from './Count100ExamG3Parts';

// ---------------------------------------------------------------------------
// Labor I: vegyes feladatok generátora (minden szám 0 és 100 között marad)
// ---------------------------------------------------------------------------
export type Count100TaskKind = 'szomszed' | 'osszeadas' | 'kivonas' | 'szorzas' | 'osztas' | 'maradekos' | 'sorrend' | 'zarojel';

const KINDS: { id: Count100TaskKind; label: string }[] = [
  { id: 'szomszed', label: 'Szomszédok' },
  { id: 'osszeadas', label: 'Összeadás' },
  { id: 'kivonas', label: 'Kivonás' },
  { id: 'szorzas', label: 'Szorzás' },
  { id: 'osztas', label: 'Osztás' },
  { id: 'maradekos', label: 'Maradékos osztás' },
  { id: 'sorrend', label: 'Sorrend' },
  { id: 'zarojel', label: 'Zárójel' }
];

export type Count100Task = {
  text: string;
  /** Egy vagy két helyes válasz (maradékos osztásnál: hányados és maradék). */
  answers: number[];
  labels: string[];
  hint: string;
  /** Tipikus hibák: ha a gyerek ezt írta, ezt a tippet kapja. */
  mistakes: { values: number[]; msg: string }[];
};

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

const rawTask = (kind: Count100TaskKind): Count100Task => {
  switch (kind) {
    case 'szomszed': {
      const n = rnd(11, 89);
      const which = rnd(0, 3);
      if (which === 0) return { text: `Mi a ${n} kisebb egyes szomszédja?`, answers: [n - 1], labels: ['?'], hint: 'Az egyes szomszéd 1-gyel kisebb vagy nagyobb.', mistakes: [{ values: [n + 1], msg: 'Ez a nagyobb szomszéd. Most a kisebbet keressük!' }] };
      if (which === 1) return { text: `Mi a ${n} nagyobb egyes szomszédja?`, answers: [n + 1], labels: ['?'], hint: 'Az egyes szomszéd 1-gyel kisebb vagy nagyobb.', mistakes: [{ values: [n - 1], msg: 'Ez a kisebb szomszéd. Most a nagyobbat keressük!' }] };
      const m = n % 10 === 0 ? n + rnd(1, 9) : n;
      const lo = Math.floor(m / 10) * 10;
      if (which === 2) return { text: `Mi a ${m} kisebb tízes szomszédja?`, answers: [lo], labels: ['?'], hint: 'Keresd meg, melyik két kerek tízes között van a szám!', mistakes: [{ values: [lo + 10], msg: 'Ez a nagyobb tízes szomszéd. A kisebbet keressük!' }, { values: [m - 1], msg: 'Ez az egyes szomszéd. Kerek tízest keresünk!' }] };
      return { text: `Mi a ${m} nagyobb tízes szomszédja?`, answers: [lo + 10], labels: ['?'], hint: 'Keresd meg, melyik két kerek tízes között van a szám!', mistakes: [{ values: [lo], msg: 'Ez a kisebb tízes szomszéd. A nagyobbat keressük!' }, { values: [m + 1], msg: 'Ez az egyes szomszéd. Kerek tízest keresünk!' }] };
    }
    case 'osszeadas': {
      const a = rnd(12, 78);
      const b = rnd(5, Math.min(39, 100 - a));
      const noCarry = Math.floor(a / 10) * 10 + Math.floor(b / 10) * 10 + ((a % 10) + (b % 10)) % 10;
      return {
        text: `${a} + ${b} =`,
        answers: [a + b],
        labels: ['?'],
        hint: `Bontsd fel: ${a} + ${Math.floor(b / 10) * 10} = ${a + Math.floor(b / 10) * 10}, aztán add hozzá a ${b % 10}-t!`,
        mistakes: noCarry !== a + b ? [{ values: [noCarry], msg: 'Az egyesek összege több mint 10 lett. Ne felejtsd el az új tízest!' }] : []
      };
    }
    case 'kivonas': {
      const a = rnd(31, 99);
      const b = rnd(6, a - 5);
      const swapErr = Math.floor(a / 10) * 10 - Math.floor(b / 10) * 10 + Math.abs((a % 10) - (b % 10));
      return {
        text: `${a} − ${b} =`,
        answers: [a - b],
        labels: ['?'],
        hint: `Ellenőrizd összeadással: az eredmény + ${b} legyen ${a}!`,
        mistakes: [
          { values: [a + b], msg: 'Összeadtad a számokat. Itt el kell venni!' },
          ...(swapErr !== a - b ? [{ values: [swapErr], msg: 'Az egyeseknél a kisebből nem vehetsz el többet. Bonts fel egy tízest!' }] : [])
        ]
      };
    }
    case 'szorzas': {
      const a = rnd(2, 10);
      const b = rnd(2, 10);
      return { text: `${a} · ${b} =`, answers: [a * b], labels: ['?'], hint: `Gondolj a ${b}-es szorzótáblára: ${b}, ${2 * b}, ${3 * b} …`, mistakes: [{ values: [a + b], msg: 'Összeadtad a számokat. Itt szorozni kell!' }] };
    }
    case 'osztas': {
      const b = rnd(2, 10);
      const q = rnd(2, 10);
      return { text: `${b * q} : ${b} =`, answers: [q], labels: ['?'], hint: `Melyik számot kell ${b}-vel szorozni, hogy ${b * q} legyen?`, mistakes: [{ values: [b * q - b], msg: 'Kivontad az osztót. Itt osztani kell: hányszor van meg benne?' }] };
    }
    case 'maradekos': {
      const b = rnd(2, 9);
      const q = rnd(2, 9);
      const r = rnd(1, b - 1);
      const n = b * q + r;
      return {
        text: `${n} : ${b} = ?, marad ?`,
        answers: [q, r],
        labels: ['hányados', 'maradék'],
        hint: `Keresd a ${b}-es szorzótáblában a legnagyobb számot, ami még nem több ${n}-nél!`,
        mistakes: [
          { values: [q - 1, r + b], msg: `A maradék nem lehet ${b} vagy annál több! Még egy csoport kijön belőle.` },
          { values: [q + 1, 0], msg: `${q + 1} · ${b} = ${(q + 1) * b}, ez már több ${n}-nél.` }
        ]
      };
    }
    case 'sorrend': {
      const t = rnd(0, 2);
      if (t === 0) {
        const b = rnd(2, 9);
        const c = rnd(2, 9);
        const a = rnd(2, Math.min(40, 100 - b * c));
        return { text: `${a} + ${b} · ${c} =`, answers: [a + b * c], labels: ['?'], hint: 'Előbb a szorzás, aztán az összeadás!', mistakes: [{ values: [(a + b) * c], msg: 'Balról jobbra számoltál. Előbb a szorzást kell elvégezni!' }] };
      }
      if (t === 1) {
        const b = rnd(2, 9);
        const c = rnd(2, 9);
        const a = rnd(b * c + 1, 99);
        return { text: `${a} − ${b} · ${c} =`, answers: [a - b * c], labels: ['?'], hint: 'Előbb a szorzás, aztán a kivonás!', mistakes: [{ values: [(a - b) * c], msg: 'Balról jobbra számoltál. Előbb a szorzást kell elvégezni!' }] };
      }
      const c = rnd(2, 9);
      const q = rnd(2, 9);
      const a = rnd(2, 60);
      return { text: `${a} + ${c * q} : ${c} =`, answers: [a + q], labels: ['?'], hint: 'Előbb az osztás, aztán az összeadás!', mistakes: [{ values: [(a + c * q) / c], msg: 'Balról jobbra számoltál. Előbb az osztást kell elvégezni!' }] };
    }
    case 'zarojel':
    default: {
      if (rnd(0, 1) === 0) {
        const c = rnd(2, 9);
        const s = rnd(3, Math.floor(100 / c));
        const a = rnd(1, s - 1);
        const b = s - a;
        return { text: `(${a} + ${b}) · ${c} =`, answers: [s * c], labels: ['?'], hint: 'Előbb a zárójelben lévő összeadás!', mistakes: [{ values: [a + b * c], msg: 'Elfelejtetted a zárójelet! Előbb ' + a + ' + ' + b + ' = ' + s + '.' }] };
      }
      const c = rnd(2, 9);
      const q = rnd(2, 9);
      const b = rnd(2, Math.min(30, 100 - c * q));
      const a = c * q + b;
      return { text: `(${a} − ${b}) : ${c} =`, answers: [q], labels: ['?'], hint: 'Előbb a zárójelben lévő kivonás!', mistakes: [] };
    }
  }
};

/** Új feladat; a tipikus hibák közül kiszűri azt, ami véletlenül épp a helyes válasz. */
export const makeCount100Task = (kind: Count100TaskKind): Count100Task => {
  const t = rawTask(kind);
  return { ...t, mistakes: t.mistakes.filter((m) => !m.values.every((v, i) => v === t.answers[i])) };
};

// ---------------------------------------------------------------------------
// Labor II: korongos maradékos osztás
// ---------------------------------------------------------------------------
type DivTask = { total: number; size: number };
export const makeDivTask = (): DivTask => {
  const size = rnd(2, 9);
  const q = rnd(2, Math.min(9, Math.floor(49 / size)));
  const r = rnd(0, size - 1);
  return { total: size * q + r, size };
};

const DiscBoard: React.FC<{ total: number; size: number; groups: number }> = ({ total, size, groups }) => {
  const cols = size <= 5 ? size : Math.ceil(size / 2);
  const rows = Math.ceil(size / cols);
  const gw = cols * 14 + 8;
  const gh = rows * 14 + 8;
  const perLine = Math.floor(300 / (gw + 8));
  const lines = Math.max(1, Math.ceil(groups / perLine));
  const left = total - groups * size;
  const looseY = 10 + lines * (gh + 8) + 6;
  const looseRows = Math.ceil(left / 15);
  const h = Math.max(110, looseY + looseRows * 16 + 20);
  return (
    <svg viewBox={`0 0 320 ${h}`} className="w-full h-auto bg-orange-50 rounded-xl border border-orange-200" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {Array.from({ length: groups }).map((_, g) => {
        const gx = 10 + (g % perLine) * (gw + 8);
        const gy = 10 + Math.floor(g / perLine) * (gh + 8);
        return (
          <g key={g}>
            <rect x={gx} y={gy} width={gw} height={gh} rx="8" fill="#fff" stroke="#ea580c" strokeWidth="1.6" />
            {Array.from({ length: size }).map((__, k) => (
              <circle key={k} cx={gx + 4 + 7 + (k % cols) * 14} cy={gy + 4 + 7 + Math.floor(k / cols) * 14} r="5.5" fill="#f97316" stroke="#7c2d12" strokeWidth="0.8" />
            ))}
          </g>
        );
      })}
      {Array.from({ length: left }).map((_, i) => (
        <circle key={`l${i}`} cx={18 + (i % 15) * 19} cy={looseY + 8 + Math.floor(i / 15) * 16} r="6.5" fill={left < size ? '#a855f7' : '#f97316'} stroke={left < size ? '#3b0764' : '#7c2d12'} strokeWidth="0.8" />
      ))}
      <text x="160" y={h - 6} textAnchor="middle" fontSize="11" fill="#7c2d12">
        {groups} csoport kész, {left} korong még szabadon
      </text>
    </svg>
  );
};

export const Count100ExamG3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [kind, setKind] = useState<Count100TaskKind>('osszeadas');
  const [task, setTask] = useState<Count100Task>(() => makeCount100Task('osszeadas'));
  const [guess, setGuess] = useState<string[]>(['', '']);
  const [feedback, setFeedback] = useState<null | { ok: boolean; msg: string }>(null);
  const [score, setScore] = useState({ ok: 0, all: 0 });
  const [counted, setCounted] = useState(false);
  const newTask = (k: Count100TaskKind = kind) => {
    setKind(k);
    setTask(makeCount100Task(k));
    setGuess(['', '']);
    setFeedback(null);
    setCounted(false);
  };
  const check = () => {
    const vals = task.answers.map((_, i) => Number(guess[i].trim()));
    if (task.answers.some((_, i) => guess[i].trim() === '' || Number.isNaN(vals[i]))) return;
    const ok = task.answers.every((a, i) => a === vals[i]);
    let msg = ok ? 'Szuper, ez helyes!' : `Még nem jó. Tipp: ${task.hint}`;
    if (!ok) {
      const hit = task.mistakes.find((m) => m.values.every((v, i) => v === vals[i]));
      if (hit) msg = hit.msg;
      else if (task.answers.length === 2) {
        const divisor = Number(task.text.split(':')[1]);
        if (vals[1] >= divisor) msg = `A maradék mindig kisebb, mint az osztó (${divisor}). Próbáld újra!`;
      }
    }
    setFeedback({ ok, msg });
    if (!counted) {
      setScore((s) => ({ ok: s.ok + (ok ? 1 : 0), all: s.all + 1 }));
      setCounted(true);
    }
  };

  // Labor II
  const [div, setDiv] = useState<DivTask>(() => makeDivTask());
  const [groups, setGroups] = useState(0);
  const [dq, setDq] = useState('');
  const [dr, setDr] = useState('');
  const [divMsg, setDivMsg] = useState<null | { ok: boolean; msg: string }>(null);
  const left = div.total - groups * div.size;
  const q = Math.floor(div.total / div.size);
  const r = div.total % div.size;
  const newDiv = () => {
    setDiv(makeDivTask());
    setGroups(0);
    setDq('');
    setDr('');
    setDivMsg(null);
  };
  const checkDiv = () => {
    const a = Number(dq);
    const b = Number(dr);
    if (dq === '' || dr === '') return;
    if (a === q && b === r) setDivMsg({ ok: true, msg: `Hibátlan! ${div.total} : ${div.size} = ${q}, marad ${r}. Ellenőrzés: ${q} · ${div.size} + ${r} = ${div.total}.` });
    else if (b >= div.size) setDivMsg({ ok: false, msg: `A maradék (${b}) nem lehet ${div.size} vagy több. Ebből még egy csoport kijön!` });
    else if (a * div.size + b !== div.total) setDivMsg({ ok: false, msg: `Ellenőrizd: ${a} · ${div.size} + ${b} = ${a * div.size + b}, de ${div.total} korongunk van.` });
    else setDivMsg({ ok: false, msg: 'Nézd meg újra a képet!' });
  };

  const btn = 'px-3 py-2 rounded-xl text-sm font-black min-h-[44px]';

  return (
    <TheoryTemplate
      topicId="g3-count-100"
      subtopicId="megallo"
      grade={3}
      chapterId="szamolas-100-ig"
      title="8. Megálló – tudáspróba"
      subtitle="Az I. fejezet összefoglalása: számok 100-ig, összeadás, kivonás, szorzás, osztás, maradékos osztás, szöveges feladatok, a műveletek sorrendje és a zárójel."
      badge="3. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 100-IG • TANANYAG"
      themeColor="rose"
      pdfFilename="3_osztaly_szamolas_100_ig_tudasproba_tananyag.pdf"
      practiceTitle="Készen állsz a tudáspróbára?"
      practiceSubtitle="Próbáld ki magad a 90 feladatos, 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'A LEGFONTOSABB SZABÁLY',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-rose-50/90 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80 text-center font-mono text-base font-black text-rose-900 dark:text-rose-200">
              1. zárójel → 2. szorzás, osztás → 3. összeadás, kivonás
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li><strong>Maradékos osztás:</strong> a maradék mindig kisebb, mint az osztó.</li>
              <li><strong>Ellenőrzés:</strong> a kivonást összeadással, az osztást szorzással ellenőrizd.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Amit már tudsz" badge="Ismétlés" badgeColor="blue">
        <p className="text-sm text-slate-700 leading-relaxed mb-3">
          Ügyes voltál! Sok mindent megtanultál ebben a fejezetben. Nézzük át együtt!
        </p>
        <TheoryTable
          headers={['Mit tudsz?', 'Röviden', 'Példa', 'Lecke']}
          rows={[
            ['Számok 100-ig', 'tízesek (t) és egyesek (e)', '47 = 4 t + 7 e = 40 + 7', '1.'],
            ['Számszomszédok', 'egyes szomszéd: ± 1, tízes szomszéd: kerek tízes', '46 < 47 < 48 és 40 < 47 < 50', '1.'],
            ['Összeadás, kivonás', 'részletekben: előbb a tízesek, aztán az egyesek', '68 + 25 = 88 + 5 = 93', '2.'],
            ['Szorzás, osztás', 'a szorzótábla 10 · 10-ig', '7 · 8 = 56, 56 : 8 = 7', '3.'],
            ['Maradékos osztás', 'ami nem fér egy csoportba, az a maradék', '17 : 5 = 3, marad 2', '4.'],
            ['Szöveges feladat', 'adatok → terv → számolás → ellenőrzés → válasz', '27 + 8 = 35', '5.'],
            ['Műveletek sorrendje', '· és : előbb, mint + és −', '24 + 5 · 3 = 24 + 15 = 39', '6.'],
            ['Zárójel', 'ami zárójelben van, azt számold először', '(5 + 3) · 4 = 8 · 4 = 32', '7.']
          ]}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TheoryCard title="Tízesek és egyesek" badge="1. lecke" badgeColor="amber">
            <Count100TensOnesSvg className="w-full h-auto" />
          </TheoryCard>
          <TheoryCard title="A számegyenes" badge="1. lecke" badgeColor="sky">
            <Count100NumberLineSvg className="w-full h-auto" />
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="2. Nézzük meg együtt!" badge="Kidolgozott feladatok" badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Szöveges feladat 5 lépésben" badge="5. lecke" badgeColor="emerald">
            <p className="text-sm text-slate-700 mb-2">
              <strong>Feladat:</strong> Dani 27 kavicsot gyűjtött. Nóra 8-cal többet. Hány kavicsuk van együtt?
            </p>
            <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>Adatok:</strong> Dani 27, Nóra 8-cal több.</li>
              <li><strong>Terv:</strong> előbb Nóra kavicsai, aztán az összeg.</li>
              <li><strong>Számolás:</strong> 27 + 8 = 35, és 27 + 35 = 62.</li>
              <li><strong>Ellenőrzés:</strong> 62 − 27 = 35, és 35 − 8 = 27. ✓</li>
              <li><strong>Válasz:</strong> Együtt 62 kavicsuk van.</li>
            </ol>
          </TheoryCard>
          <TheoryCard title="B) Maradékos osztás korongokkal" badge="4. lecke" badgeColor="orange">
            <Count100RemainderSvg className="w-full h-auto mb-2" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>17 korongot ötösével rakunk csoportba.</li>
              <li>3 csoport lesz, és 2 korong kimarad.</li>
              <li>Így írjuk: <strong>17 : 5 = 3, marad 2</strong>.</li>
              <li>Ellenőrzés: 3 · 5 + 2 = 17. ✓</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Melyiket számolom először?" badge="6–7. lecke" badgeColor="purple">
            <Count100OrderStepsSvg className="w-full h-auto mb-2" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A számozott karikák mutatják a sorrendet.</li>
              <li>Zárójellel más lesz: (24 + 5) · 3 = 29 · 3 = 87.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Fejtörő: dominó-négyzet" badge="Kitekintő" badgeColor="rose">
            <Count100DominoSquareSvg className="w-full h-auto mb-2" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Minden oldalon 10 pötty van.</li>
              <li>Lent: 3 + 2 + 5 = 10. Balra: 4 + 3 + 3 = 10.</li>
              <li>A sarkok két oldalhoz is tartoznak!</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="E) Műveletlánc és szakaszos ábra" badge="5–6. lecke" badgeColor="sky">
            <Count100ChainSvg className="w-full h-auto mb-2" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Lánc: 6 · 3 = 18, 18 + 6 = 24, 24 : 6 = 4.</li>
              <li>Könyv: 60 oldal, ebből 18 + 25 = 43 kész. Hátra van: 60 − 43 = 17.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="3. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Túl nagy maradék"
          wrong="26 : 4 = 5, marad 6"
          wrongExplanation="A 6 korongból még egy négyes csoport kijön! Ez nem lehet maradék."
          correct="26 : 4 = 6, marad 2"
          correctExplanation="6 · 4 = 24, és 26 − 24 = 2. A 2 kisebb, mint 4. Így jó!"
          tip="A maradék mindig KISEBB, mint az osztó. Ha 4-gyel osztasz, a maradék csak 0, 1, 2 vagy 3 lehet."
        />
        <TheoryCallout type="warning" title="Csak kivonás? Balról jobbra!">
          20 − 8 − 2 = 12 − 2 = <strong>10</strong>. Nem szabad előbb a 8 − 2-t kiszámolni!
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="4. Labor I: Vegyes feladatok" badge="Labor" badgeColor="amber">
        <div className="bg-white border-2 border-amber-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div>
            <div className="text-xs font-bold text-slate-500 mb-1">Válassz feladatot!</div>
            <div className="flex flex-wrap gap-2">
              {KINDS.map((k) => (
                <button key={k.id} onClick={() => newTask(k.id)} className={`${btn} ${k.id === kind ? 'bg-amber-500 text-white' : 'bg-amber-50 text-amber-800 hover:bg-amber-100'}`}>
                  {k.label}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-center space-y-3">
            <div className="text-2xl font-black text-slate-800">{task.text}</div>
            <div className="flex flex-wrap items-end justify-center gap-3">
              {task.answers.map((_, i) => (
                <label key={i} className="flex flex-col items-center text-xs font-bold text-slate-500">
                  {task.labels[i] !== '?' && <span>{task.labels[i]}</span>}
                  <input
                    value={guess[i]}
                    inputMode="numeric"
                    onChange={(e) => {
                      const g = [...guess];
                      g[i] = e.target.value.replace(/[^0-9]/g, '');
                      setGuess(g);
                      setFeedback(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') check();
                    }}
                    aria-label={task.labels[i] === '?' ? 'A te válaszod' : task.labels[i]}
                    placeholder="?"
                    className="w-24 text-center text-2xl font-black rounded-xl border-2 border-amber-300 px-2 py-2 min-h-[52px]"
                  />
                </label>
              ))}
              <button onClick={check} className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-black min-h-[52px]">
                Ellenőrzöm
              </button>
              <button onClick={() => newTask()} className="px-4 py-2 rounded-xl bg-slate-700 text-white font-black min-h-[52px]">
                Új feladat
              </button>
            </div>
            {feedback && (
              <div className={`rounded-xl p-2 font-bold ${feedback.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                {feedback.msg}
                {!feedback.ok && (
                  <button onClick={() => setGuess(task.answers.map(String).concat(['']).slice(0, 2))} className="ml-2 underline">
                    Mutasd a megoldást
                  </button>
                )}
              </div>
            )}
            <div className="text-xs text-slate-500">
              Eddig: {score.ok} jó válasz / {score.all} feladat
            </div>
          </div>
          <TheoryCallout type="tip" title="Így gyakorolj!">
            Minden gombból oldj meg legalább 3 feladatot! Ha hibázol, olvasd el a tippet.
          </TheoryCallout>
        </div>
      </TheorySection>

      <TheorySection title="5. Labor II: Korongos maradékos osztás" badge="Labor" badgeColor="orange">
        <div className="bg-white border-2 border-orange-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="text-center text-lg font-black text-slate-800">
            Van <span className="text-orange-600">{div.total}</span> korongod. Rakd őket <span className="text-orange-600">{div.size}</span>-ös csoportokba!
          </div>
          <DiscBoard total={div.total} size={div.size} groups={groups} />
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setGroups((g) => g + 1)}
              disabled={left < div.size}
              className={`${btn} ${left < div.size ? 'bg-slate-200 text-slate-400' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
            >
              Rakj ki egy csoportot!
            </button>
            <button onClick={() => setGroups(0)} className={`${btn} bg-slate-100 text-slate-700`}>
              Újrakezdem
            </button>
            <button onClick={newDiv} className={`${btn} bg-slate-700 text-white`}>
              Új feladat
            </button>
          </div>
          {left < div.size && (
            <div className="text-center text-sm font-bold text-purple-700">
              Már nem jön ki több csoport! Írd le az osztást.
            </div>
          )}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xl font-black text-slate-800">
            <span>{div.total} : {div.size} =</span>
            <input
              value={dq}
              inputMode="numeric"
              onChange={(e) => {
                setDq(e.target.value.replace(/[^0-9]/g, ''));
                setDivMsg(null);
              }}
              aria-label="hányados"
              placeholder="?"
              className="w-16 text-center rounded-xl border-2 border-orange-300 px-2 py-2 min-h-[48px]"
            />
            <span>, marad</span>
            <input
              value={dr}
              inputMode="numeric"
              onChange={(e) => {
                setDr(e.target.value.replace(/[^0-9]/g, ''));
                setDivMsg(null);
              }}
              aria-label="maradék"
              placeholder="?"
              className="w-16 text-center rounded-xl border-2 border-purple-300 px-2 py-2 min-h-[48px]"
            />
            <button onClick={checkDiv} className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-black min-h-[48px] text-base">
              Ellenőrzöm
            </button>
          </div>
          {divMsg && (
            <div className={`rounded-xl p-2 text-center font-bold ${divMsg.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>{divMsg.msg}</div>
          )}
          <TheoryCallout type="info" title="Figyeld meg!">
            Néha nem marad semmi: akkor a maradék 0. A lila korongok a maradék – ezek mindig kevesebben vannak, mint egy csoport.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default Count100ExamG3Theory;
