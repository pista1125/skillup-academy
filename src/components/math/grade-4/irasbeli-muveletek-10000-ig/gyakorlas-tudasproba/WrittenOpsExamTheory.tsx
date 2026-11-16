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
  ChapterStationsSvg,
  ColumnAddSvg,
  ColumnSubSvg,
  ShortDivSvg,
  MultiplesVennSvg,
  SolvingStepsSvg,
  MulLayout
} from './WrittenOpsExamFigures';

// ---------------------------------------------------------------------------
// Labor I – Vegyes feladatgenerátor
// ---------------------------------------------------------------------------
export type MixedKind = 'add' | 'sub' | 'mul' | 'div' | 'order';
export type MixedTask = { kind: MixedKind; text: string; answer: number; remainder?: number; solution: string };

/** Egyszerű, ismételhető álvéletlen-generátor (a teszt és az első feladat miatt). */
export const lcg = (seed: number) => {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};

const rint = (r: () => number, lo: number, hi: number) => lo + Math.floor(r() * (hi - lo + 1));

/** Egy 10 000-es számkörbeli feladat a megadott típusból. */
export const makeTask = (kind: MixedKind, r: () => number): MixedTask => {
  if (kind === 'add') {
    const a = rint(r, 1000, 6999);
    const b = rint(r, 1000, 9999 - a);
    return { kind, text: `${a} + ${b}`, answer: a + b, solution: `${a} + ${b} = ${a + b}. Ellenőrzés a tagok felcserélésével: ${b} + ${a} = ${a + b}.` };
  }
  if (kind === 'sub') {
    const a = rint(r, 3000, 9999);
    const b = rint(r, 1000, a - 1);
    return { kind, text: `${a} − ${b}`, answer: a - b, solution: `${a} − ${b} = ${a - b}. Ellenőrzés összeadással: ${a - b} + ${b} = ${a}.` };
  }
  if (kind === 'mul') {
    const m = rint(r, 2, 9);
    const a = rint(r, 120, Math.floor(9999 / m));
    return { kind, text: `${a} · ${m}`, answer: a * m, solution: `${a} · ${m} = ${a * m}. Becslés: ${Math.round(a / 100) * 100} · ${m} = ${Math.round(a / 100) * 100 * m}.` };
  }
  if (kind === 'div') {
    const d = rint(r, 2, 9);
    const n = rint(r, 1000, 9999);
    const q = Math.floor(n / d);
    const rem = n % d;
    return {
      kind,
      text: `${n} : ${d}`,
      answer: q,
      remainder: rem,
      solution: `${n} : ${d} = ${q}, marad ${rem}. Ellenőrzés: ${q} · ${d} + ${rem} = ${q * d + rem}.`
    };
  }
  // order
  const b = rint(r, 120, 1500);
  const c = rint(r, 2, 6);
  const a = rint(r, b * c + 1, 9999);
  return { kind, text: `${a} − ${b} · ${c}`, answer: a - b * c, solution: `Először a szorzás: ${b} · ${c} = ${b * c}. Utána ${a} − ${b * c} = ${a - b * c}.` };
};

const KIND_LABEL: Record<MixedKind, string> = {
  add: 'Összeadás',
  sub: 'Kivonás',
  mul: 'Szorzás',
  div: 'Osztás',
  order: 'Műveletsor'
};

const MixedLab: React.FC = () => {
  const [kind, setKind] = useState<MixedKind>('add');
  const [seed, setSeed] = useState(7);
  const task = makeTask(kind, lcg(seed * 31 + kind.length));
  const [ans, setAns] = useState('');
  const [rem, setRem] = useState('');
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState({ ok: 0, all: 0 });

  const isOk = Number(ans) === task.answer && ans !== '' && (task.kind !== 'div' || Number(rem || '0') === task.remainder);

  const check = () => {
    if (checked || ans === '') return;
    setChecked(true);
    setScore({ ok: score.ok + (isOk ? 1 : 0), all: score.all + 1 });
  };

  const next = (k: MixedKind = kind) => {
    setKind(k);
    setSeed(seed + 1);
    setAns('');
    setRem('');
    setChecked(false);
  };

  return (
    <div className="bg-white border-2 border-rose-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(KIND_LABEL) as MixedKind[]).map((k) => (
          <button
            key={k}
            onClick={() => next(k)}
            className={`px-4 py-2 rounded-xl text-sm font-black ${k === kind ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            {KIND_LABEL[k]}
          </button>
        ))}
        <span className="ml-auto text-sm font-bold text-slate-600 self-center">
          Pontszám: {score.ok} / {score.all}
        </span>
      </div>
      <p className="text-sm text-slate-600">Számold ki a füzetedben írásban, aztán írd be az eredményt!</p>
      <div className="flex flex-wrap items-center justify-center gap-3 text-3xl font-black text-slate-800">
        <span>{task.text} =</span>
        <input
          inputMode="numeric"
          aria-label="eredmény"
          value={ans}
          onChange={(e) => {
            setAns(e.target.value.replace(/[^0-9]/g, ''));
            setChecked(false);
          }}
          className="w-32 h-14 text-center text-2xl font-black rounded-xl border-2 border-rose-300 outline-none focus:border-rose-500"
        />
        {task.kind === 'div' && (
          <>
            <span className="text-xl">marad</span>
            <input
              inputMode="numeric"
              aria-label="maradék"
              value={rem}
              onChange={(e) => {
                setRem(e.target.value.replace(/[^0-9]/g, ''));
                setChecked(false);
              }}
              className="w-16 h-14 text-center text-2xl font-black rounded-xl border-2 border-rose-300 outline-none focus:border-rose-500"
            />
          </>
        )}
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        <button onClick={check} className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black">
          Ellenőrzöm
        </button>
        <button onClick={() => next()} className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold">
          Új feladat
        </button>
      </div>
      {checked && (
        <TheoryCallout type={isOk ? 'success' : 'warning'} title={isOk ? 'Helyes! 🎉' : 'Még nem jó – nézd meg a megoldást!'}>
          {task.solution}
        </TheoryCallout>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Labor II – Számjegy-detektív (Kitekintő, 86. o., 1. b)
// ---------------------------------------------------------------------------
type Puzzle = { op: '+' | '−' | '·'; a: string; b: string; res: string };

export const DIGIT_PUZZLES: Puzzle[] = [
  { op: '+', a: 'a134', b: '37b6', res: '6c30' },
  { op: '+', a: '234a', b: '37b6', res: 'cd63' },
  { op: '−', a: '934a', b: 'b7c6', res: '6d32' },
  { op: '·', a: 'a34', b: '7', res: '9bc' }
];

const fill = (s: string, v: Record<string, number>) => s.replace(/[a-d]/g, (ch) => String(v[ch]));

/** Igaz-e a kitöltött számjegyekkel a művelet? */
export const puzzleHolds = (p: Puzzle, v: Record<string, number>): boolean => {
  const A = Number(fill(p.a, v));
  const B = Number(fill(p.b, v));
  const R = Number(fill(p.res, v));
  if (fill(p.res, v)[0] === '0') return false;
  return p.op === '+' ? A + B === R : p.op === '−' ? A - B === R : A * B === R;
};

const DigitLab: React.FC = () => {
  const [pi, setPi] = useState(0);
  const p = DIGIT_PUZZLES[pi];
  const letters = Array.from(new Set((p.a + p.b + p.res).replace(/[^a-d]/g, '').split(''))).sort();
  const [vals, setVals] = useState<Record<string, number | null>>({});
  const [msg, setMsg] = useState<{ ok: boolean; t: string } | null>(null);
  const [solved, setSolved] = useState<Record<number, boolean>>({});

  const load = (i: number) => {
    setPi(i);
    setVals({});
    setMsg(null);
  };

  const cycle = (l: string) => {
    const cur = vals[l];
    setVals({ ...vals, [l]: cur === null || cur === undefined ? 0 : (cur + 1) % 10 });
    setMsg(null);
  };

  const check = () => {
    if (letters.some((l) => vals[l] === null || vals[l] === undefined)) {
      setMsg({ ok: false, t: 'Még van kitöltetlen mező! Koppints a piros négyzetekre.' });
      return;
    }
    const ok = puzzleHolds(p, vals as Record<string, number>);
    if (ok) setSolved({ ...solved, [pi]: true });
    setMsg(
      ok
        ? { ok: true, t: 'Szuper, igaz a művelet! Ellenőrizd a füzetedben is!' }
        : { ok: false, t: 'Nem jön ki. Kezdd az egyeseknél, és figyelj a maradékra!' }
    );
  };

  const cols = 4;
  const cell = (ch: string, key: string) => {
    if (/[a-d]/.test(ch)) {
      const v = vals[ch];
      return (
        <button
          key={key}
          onClick={() => cycle(ch)}
          aria-label={`ismeretlen számjegy ${ch}`}
          className={`w-12 h-12 rounded-lg text-2xl font-black border-2 ${v === null || v === undefined ? 'bg-rose-500 text-white border-rose-600' : 'bg-amber-100 text-amber-900 border-amber-400'}`}
        >
          {v === null || v === undefined ? '?' : v}
        </button>
      );
    }
    return (
      <span key={key} className="w-12 h-12 inline-flex items-center justify-center text-2xl font-black text-slate-800">
        {ch === ' ' ? '' : ch}
      </span>
    );
  };
  const row = (s: string, k: string) => (
    <div className="flex">{s.padStart(cols, ' ').split('').map((ch, i) => cell(ch, `${k}${i}`))}</div>
  );

  return (
    <div className="bg-white border-2 border-amber-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap gap-2">
        {DIGIT_PUZZLES.map((q, i) => (
          <button
            key={i}
            onClick={() => load(i)}
            className={`px-4 h-10 rounded-xl text-sm font-black ${
              i === pi ? 'bg-amber-500 text-white' : solved[i] ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
            }`}
          >
            {i + 1}. {q.op === '+' ? 'összeadás' : q.op === '−' ? 'kivonás' : 'szorzás'} {solved[i] ? '✔' : ''}
          </button>
        ))}
      </div>
      <p className="text-sm text-slate-600">Koppints a piros négyzetekre: a számjegy minden koppintásra eggyel nő (0–9). Melyik számjegy illik a helyére?</p>
      <div className="flex justify-center">
        {p.op === '·' ? (
          <div className="space-y-1">
            <div className="flex items-center">
              {row(p.a, 'a')}
              <span className="w-10 text-center text-2xl font-black">·</span>
              <span className="text-2xl font-black">{p.b}</span>
            </div>
            <div className="border-t-2 border-slate-800 w-48" />
            {row(p.res, 'r')}
          </div>
        ) : (
          <div className="space-y-1">
            {row(p.a, 'a')}
            <div className="flex items-center -ml-8">
              <span className="w-8 text-center text-2xl font-black">{p.op}</span>
              {row(p.b, 'b')}
            </div>
            <div className="border-t-2 border-slate-800 w-48" />
            {row(p.res, 'r')}
          </div>
        )}
      </div>
      <div className="flex justify-center">
        <button onClick={check} className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black">
          Ellenőrzöm
        </button>
      </div>
      {msg && <div className={`text-center text-sm font-bold ${msg.ok ? 'text-emerald-700' : 'text-rose-700'}`}>{msg.t}</div>}
      {Object.keys(solved).length === DIGIT_PUZZLES.length && (
        <TheoryCallout type="success" title="Igazi számjegy-detektív vagy! 🕵️">
          3134 + 3796 = 6930, 2347 + 3716 = 6063, 9348 − 2716 = 6632, 134 · 7 = 938.
        </TheoryCallout>
      )}
    </div>
  );
};

export const WrittenOpsExamTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  return (
    <TheoryTemplate
      grade={4}
      chapterId="irasbeli-muveletek-10000-ig"
      topicId="g4-written-ops"
      subtopicId="gyakorlas-tudasproba"
      title="8. Gyakorlás, tudáspróba"
      subtitle="Amit már tudsz: írásbeli összeadás, kivonás, szorzás és osztás, többszörösök, következtetések, műveletsorok."
      badge="4. OSZTÁLY • III. ÍRÁSBELI MŰVELETEK • TANANYAG"
      themeColor="rose"
      pdfFilename="4_osztaly_irasbeli_muveletek_tudasproba_tananyag.pdf"
      practiceTitle="Készen állsz a nagy tudáspróbára?"
      practiceSubtitle="90 feladat vár rád 3 szinten – szintenként 30!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'ÖSSZEFOGLALÓ — ÍRÁSBELI MŰVELETEK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-rose-50/90 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80 text-center">
              <span className="font-mono text-sm font-black text-rose-900 dark:text-rose-200">+ − · : jobbról (egyesek) · osztás balról (legnagyobb helyi érték)</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Összeadás, kivonás, szorzás: az egyesekkel kezdünk, a maradékot a következő helyi értékhez adjuk.</li>
              <li>Osztás: a legnagyobb helyi értékkel kezdünk; a maradék mindig kisebb az osztónál.</li>
              <li>Mindig becsülj előtte, és ellenőrizz utána!</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Amit már tudsz */}
      <TheorySection title="1. Amit már tudsz – a fejezet állomásai" badge="Tankönyv 70–107. o." badgeColor="rose">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <ChapterStationsSvg />
          <TheoryTable
            headers={['Lecke', 'A legfontosabb']}
            rows={[
              ['1. Írásbeli összeadás és kivonás', 'Helyi érték szerint egymás alá, az egyesekkel kezdünk. Kivonás: Manó módszerével pótolunk.'],
              ['2. Írásbeli szorzás egyjegyű számmal', 'A többjegyű számot szorozzuk az egyjegyűvel, az egyesekkel kezdve.'],
              ['3. Írásbeli osztás egyjegyű osztóval', 'A legnagyobb helyi értékkel kezdünk, rövid alakban csak a maradékot írjuk le.'],
              ['4. A számok tulajdonságai', '2 többszöröse: páros. 5 többszöröse: 0-ra vagy 5-re végződik. 10 többszöröse: 0-ra végződik.'],
              ['5. Összefüggések, következtetések', 'Egyről többre, többről egyre; változatlan szorzat és hányados.'],
              ['6. A műveletek közötti kapcsolatok', '+ ⇄ −, · ⇄ :; visszafelé számolás, ellenőrzés.'],
              ['7. A műveletek sorrendje', 'Zárójel → · és : → + és −.']
            ]}
          />
        </div>
        <SolvingStepsSvg className="w-full h-auto max-w-[520px] mx-auto" />
      </TheorySection>

      {/* 2. Írásbeli összeadás és kivonás */}
      <TheorySection title="2. Írásbeli összeadás és kivonás" badge="Tankönyv 71–73. o." badgeColor="indigo">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <TheoryCard title="3845 + 2850 = 6695" badge="Laci útiköltsége" badgeColor="indigo">
            <ColumnAddSvg />
            <p className="text-sm text-slate-700 mt-2">
              5 e + 0 e = 5 e; 4 t + 5 t = 9 t; 8 sz + 8 sz = 16 sz = 1 E + 6 sz; 3 E + 2 E + 1 E = 6 E. Becslés: 3800 + 2900 = 6700 – közel van!
            </p>
          </TheoryCard>
          <TheoryCard title="7212 − 5410 = 1802" badge="Manó módszere" badgeColor="violet">
            <ColumnSubSvg />
            <p className="text-sm text-slate-700 mt-2">
              2 százasból nem lehet 4-et elvenni, ezért a kisebbítendőhöz 10 százast, a kivonandóhoz 1 ezrest adunk: 12 sz − 4 sz = 8 sz, 7 E − 6 E = 1 E. Ellenőrzés: 1802 + 5410 = 7212.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. Szorzás és osztás */}
      <TheorySection title="3. Írásbeli szorzás és osztás" badge="Tankönyv 80. és 95–99. o." badgeColor="blue">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <TheoryCard title="1623 · 2 = 3246" badge="Óceánjáró kabinjai" badgeColor="blue">
            <MulLayout a="1623" b="2" result="3246" />
            <p className="text-sm text-slate-700 mt-2">
              2 · 3 e = 6 e; 2 · 2 t = 4 t; 2 · 6 sz = 12 sz = 1 E + 2 sz; 2 · 1 E = 2 E, + 1 E = 3 E. Ellenőrzés összeadással: 1623 + 1623 = 3246.
            </p>
          </TheoryCard>
          <TheoryCard title="2872 : 2 = 1436" badge="Rövid alak" badgeColor="violet">
            <ShortDivSvg />
            <p className="text-sm text-slate-700 mt-2">
              2 E : 2 = 1 E, marad 0. 8 sz : 2 = 4 sz, marad 0. 7 t : 2 = 3 t, marad 1 t. 1 t + 2 e = 12 e, 12 e : 2 = 6 e. Ellenőrzés: 1436 · 2 = 2872. Maradékkal: 224 : 3 = 74, marad 2, mert 74 · 3 + 2 = 224.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Többszörösök, összefüggések, sorrend */}
      <TheorySection title="4. Többszörösök, következtetések, műveletsorok" badge="Tankönyv 101–107. o." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <MultiplesVennSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>Többszörösök:</strong> a 4310 a 2-nek és az 5-nek is többszöröse (0-ra végződik). A 2965 csak az 5-nek, a 7602 csak a 2-nek.
            </p>
            <p>
              <strong>Következtetés:</strong> 1 vonatjegy 325 Ft → 4 jegy 4 · 325 = 1300 Ft. 12 kanál 768 Ft → 6 kanál 384 Ft.
            </p>
            <p>
              <strong>Kapcsolatok:</strong> □ − 2223 = 3229 → □ = 3229 + 2223 = 5452. Osztandó = hányados · osztó + maradék.
            </p>
            <p>
              <strong>Sorrend:</strong> 3564 − 215 · 2 = 3564 − 430 = 3134, de (3564 − 215) · 2 = 6698.
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 5. Megálló – vegyes feladatok */}
      <TheorySection title="5. Nézzük meg együtt! Megálló-feladatok" badge="Tankönyv 84–85. és 108–110. o." badgeColor="sky">
        <TheoryTable
          headers={['Feladat', 'Megoldás', 'Eredmény']}
          rows={[
            ['Hányan jelentkeztek a versenyre? 1776, 1296, 2070, 2346, 1278 tanuló', 'írásbeli összeadás, öt tag', '8766 tanuló'],
            ['1534 · 5 − 7596; 2225 − 547 · 4; (6852 − 6778) · 2', '7670 − 7596; 2225 − 2188; 74 · 2', '74; 37; 148'],
            ['A 37, 74, 148 sorozat folytatása 6 taggal (kétszerezés)', '296, 592, 1184, 2368, 4736, 9472 → T, I, SZ, A, F, A', 'tiszafa'],
            ['Mennyi az 1824 negyede? Melyik számnak a negyede az 1824?', '1824 : 4 és 1824 · 4', '456 és 7296'],
            ['9-féle kitűzőből összesen 8055 db, fajtánként ugyanannyi', '8055 : 9', '895 db'],
            ['Pozsony 200 km, onnan még 5 · 200 − 326 km Varsóig', '200 + (1000 − 326)', '874 km']
          ]}
        />
      </TheorySection>

      {/* 6. Vigyázz */}
      <TheorySection title="6. Vigyázz! A leggyakoribb hibák" badge="Csapda" badgeColor="rose">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="Elfelejtette a maradékot"
            wrong="3845 + 2850 = 5695"
            wrongExplanation="A 16 százasból 1 ezres lett, de nem adta hozzá az ezresekhez."
            correct="3845 + 2850 = 6695"
            correctExplanation="3 E + 2 E + 1 E (a maradék) = 6 E."
            tip="Írd le kicsiben a maradékot a következő oszlop fölé!"
          />
          <TheoryTrapBox
            title="Kimaradt a 0 a hányadosból"
            wrong="3150 : 3 = 105"
            wrongExplanation="1 tízesben nincs meg a 3, ezért oda 0 kerül a hányadosba – ezt kihagyta."
            correct="3150 : 3 = 1050"
            correctExplanation="Becslés: 3000 : 3 = 1000, tehát négyjegyű a hányados."
            tip="Becsléssel előre megtudod, hány jegyű lesz a hányados!"
          />
        </div>
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Játékos labor I: Vegyes feladatgenerátor" badge="Labor" badgeColor="rose">
        <p className="text-sm text-slate-600">Válassz műveletet, számold ki írásban, és ellenőrizd! Az „Új feladat” gomb mindig új számokat ad.</p>
        <MixedLab />
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Játékos labor II: Számjegy-detektív" badge="Labor · Tankönyv 86. o., 1. feladat" badgeColor="amber">
        <p className="text-sm text-slate-600">A Kitekintő feladatában néhány számjegy elbújt. Találd meg őket!</p>
        <DigitLab />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default WrittenOpsExamTheory;
