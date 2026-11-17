import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox } from '../TheoryTemplate';
import { ColderWarmerSvg, OrderSvg, UpDownSvg, WarmUpSvg, BothBelowSvg, AcrossZeroSvg, CoolDownSvg } from './NegChangesG3Figures';
import { Thermo, ChangeThermoSvg, fmt, fmtC, changeText, FONT, INK, RED } from './NegChangesG3Parts';

const rnd = (n: number) => Math.floor(Math.random() * n);
const between = (a: number, b: number) => a + rnd(b - a + 1);
const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = rnd(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// ---------------------------------------------------------------------------
// Labor I – Állítsd be a hőmérőt! (kiinduló érték + változás → új érték)
// ---------------------------------------------------------------------------
export interface SetTask {
  start: number;
  k: number;
  up: boolean;
}
export const setTarget = (t: SetTask) => (t.up ? t.start + t.k : t.start - t.k);
export const makeSetTask = (): SetTask => {
  for (;;) {
    const start = between(-8, 8);
    const k = between(2, 9);
    const up = Math.random() < 0.5;
    const end = up ? start + k : start - k;
    // legyen benne a 0-n átlépés is, de maradjunk –10 és 10 között
    if (end >= -10 && end <= 10 && end !== 0 && start !== 0) return { start, k, up };
  }
};
const FIRST_SET: SetTask = { start: -3, k: 5, up: true };

// ---------------------------------------------------------------------------
// Labor II – Mennyit változott? (két leolvasás → változás)
// ---------------------------------------------------------------------------
export interface ReadTask {
  a: number;
  b: number;
  opts: string[];
}
export const makeReadOptions = (a: number, b: number): string[] => {
  const d = Math.abs(a - b);
  const warm = b > a;
  const word = (w: boolean, n: number) => `${w ? 'melegedett' : 'hűlt'} ${n} fokkal`;
  // tipikus hiba: a 0-n átlépésnél kivonja a két számot (–2 → 5: „3 fok”)
  const absErr = Math.abs(Math.abs(a) - Math.abs(b));
  const wrongN = absErr !== d && absErr > 0 ? absErr : d + 1;
  return shuffle([word(warm, d), word(!warm, d), word(warm, wrongN), word(!warm, wrongN)]);
};
export const makeReadTask = (): ReadTask => {
  for (;;) {
    const cross = Math.random() < 0.6;
    const a = between(-9, 9);
    const b = between(-9, 9);
    if (a === b || Math.abs(a - b) < 2) continue;
    if (cross !== (a * b < 0)) continue;
    return { a, b, opts: makeReadOptions(a, b) };
  }
};
const FIRST_READ: ReadTask = { a: -2, b: 5, opts: ['melegedett 3 fokkal', 'hűlt 7 fokkal', 'melegedett 7 fokkal', 'hűlt 3 fokkal'] };

// ---------------------------------------------------------------------------
// Labor III – Sorba rendezés
// ---------------------------------------------------------------------------
export const makeOrderSet = (): number[] => {
  for (;;) {
    const s = new Set<number>();
    while (s.size < 5) s.add(between(-12, 12));
    const v = [...s];
    if (v.filter((x) => x < 0).length >= 2 && v.some((x) => x > 0)) return shuffle(v);
  }
};
const FIRST_ORDER = [3, -7, 0, -2, 9];

const btn = 'px-3 py-3 rounded-xl font-bold text-base min-h-[52px] border-2 transition-colors';

export const NegChangesG3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [st, setSt] = useState<SetTask>(FIRST_SET);
  const [cur, setCur] = useState(FIRST_SET.start);
  const [checked, setChecked] = useState(false);
  const [score1, setScore1] = useState(0);
  const target = setTarget(st);
  const ok1 = checked && cur === target;
  const moved = cur - st.start;
  const fb1 = (): string => {
    if (!checked) return '';
    if (ok1) return `Igen! ${fmtC(st.start)}-ról ${st.up ? 'fölfelé' : 'lefelé'} ${st.k} fokot léptél: ${fmtC(target)} lett.`;
    if (moved === 0) return 'Még nem mozdítottad a hőmérőt. Nyomd a nyilakat!';
    if (st.up && moved < 0) return 'Fordítva! Ha melegedik, a hőmérő fölfelé megy.';
    if (!st.up && moved > 0) return 'Fordítva! Ha hűl, a hőmérő lefelé megy.';
    return `Jó irányba mentél, de ${Math.abs(moved)} fokot léptél. ${st.k} fokot kell lépni!`;
  };
  const step = (d: number) => {
    if (ok1) return;
    setChecked(false);
    setCur((c) => Math.max(-10, Math.min(10, c + d)));
  };
  const p1 = { yTop: 30, yBot: 250, min: -10, max: 10 };

  // Labor II
  const [rt, setRt] = useState<ReadTask>(FIRST_READ);
  const [ans, setAns] = useState<string | null>(null);
  const [score2, setScore2] = useState(0);
  const right2 = changeText(rt.a, rt.b);
  const ok2 = ans === right2;
  const fb2 = (): string => {
    if (ans === null) return '';
    if (ok2) return `Ügyes! ${fmtC(rt.a)} → ${fmtC(rt.b)}: ${right2}.`;
    const warm = rt.b > rt.a;
    const wrongDir = ans.startsWith('melegedett') !== warm;
    const n = Number(ans.match(/\d+/)?.[0]);
    const d = Math.abs(rt.a - rt.b);
    if (wrongDir && n === d) return `A fokok száma jó, de nézd a nyilat! ${warm ? 'Fölfelé ment: melegedett.' : 'Lefelé ment: hűlt.'}`;
    if (rt.a * rt.b < 0) return `Átléptél a 0-n! Számold két részben: ${Math.abs(rt.a)} fok a 0-ig, aztán még ${Math.abs(rt.b)} fok.`;
    return 'Számold meg a lépéseket a hőmérőn az üres karikától a teli karikáig!';
  };

  // Labor III
  const [vals, setVals] = useState<number[]>(FIRST_ORDER);
  const [asc, setAsc] = useState(true);
  const [picked, setPicked] = useState<number[]>([]);
  const [wrong, setWrong] = useState<number | null>(null);
  const sorted = [...vals].sort((a, b) => (asc ? a - b : b - a));
  const done3 = picked.length === vals.length;
  const pick = (v: number) => {
    if (picked.includes(v) || done3) return;
    if (v === sorted[picked.length]) {
      setPicked([...picked, v]);
      setWrong(null);
    } else setWrong(v);
  };
  const fb3 = (): string => {
    if (done3) return `Kész! ${asc ? 'Növekvő' : 'Csökkenő'} sorrend: ${sorted.map(fmt).join(', ')}.`;
    if (wrong === null) return '';
    const need = sorted[picked.length];
    if (asc) {
      if (need < 0) return wrong < 0 ? 'Van ennél hidegebb is! Melyik van a legmesszebb a 0 alatt?' : 'Van ennél hidegebb is! Kezdd a mínuszos számokkal!';
      return 'Van ennél hidegebb is! Melyik a legkisebb a maradékból?';
    }
    if (need >= 0) return wrong < 0 ? 'Van ennél melegebb is! Kezdd a mínusz nélküli számokkal!' : 'Van ennél melegebb is! Melyik a legnagyobb szám?';
    return 'Van ennél melegebb is! Melyik mínuszos van a legközelebb a 0-hoz?';
  };

  return (
    <TheoryTemplate
      topicId="g3-negative-numbers"
      subtopicId="osszehasonlitas-es-valtozasok"
      grade={3}
      chapterId="negativ-szamok"
      title="3. Összehasonlítás és változások"
      subtitle="Melyik a hidegebb? Melegedett vagy hűlt? Hány fokkal?"
      badge="3. OSZTÁLY • IX. A NEGATÍV SZÁMOK • TANANYAG"
      themeColor="indigo"
      pdfFilename="3_osztaly_osszehasonlitas_es_valtozasok_tananyag.pdf"
      practiceTitle="Készen állsz? Gyakoroljunk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — HIDEGEBB, MELEGEBB',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-center text-sm font-black text-indigo-900 dark:text-indigo-200">
              Lejjebb a hőmérőn = hidegebb. Feljebb = melegebb.
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>A –6 °C hidegebb, mint a –1 °C.</li>
              <li>Fölfelé megy: melegedett. Lefelé megy: hűlt.</li>
              <li>Átlépsz a 0-n? Számolj két részben: a 0-ig, aztán tovább.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 99. o." badgeColor="indigo">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Már le tudod olvasni a hőmérőt, akkor is, ha mínuszt mutat.</p>
          <p>
            Most összehasonlítunk: melyik nap volt <strong>hidegebb</strong>? Aztán kiszámoljuk, <strong>hány fokkal</strong> lett melegebb vagy hidegebb.
          </p>
        </div>
      </TheorySection>

      <TheorySection title="2. Melyik a hidegebb?" badge="lejjebb = hidegebb" badgeColor="blue">
        <ColderWarmerSvg />
        <div className="space-y-2 text-sm text-slate-700">
          <p>
            Nézd meg, hol áll a piros oszlop teteje. Ami <strong>lejjebb</strong> van, az a <strong>hidegebb</strong>.
          </p>
          <p>
            A –6 °C 6 fokkal van a 0 alatt, a –1 °C csak 1 fokkal. A –6 °C a hidegebb.
          </p>
          <p>
            A hidegebb hőmérséklet a kisebb szám: <strong>–6 °C &lt; –1 °C</strong>.
          </p>
        </div>
        <TheoryCallout type="tip" title="Minden mínuszos hidegebb">
          Minden mínuszos hőmérséklet hidegebb, mint a 0 °C. A 0 °C pedig hidegebb, mint az 1 °C, 2 °C …
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="3. Sorba rendezés" badge="növekvő – csökkenő" badgeColor="emerald">
        <OrderSvg />
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
          <li>
            <strong>Növekvő sorrend:</strong> a leghidegebbtől a legmelegebbig.
          </li>
          <li>
            <strong>Csökkenő sorrend:</strong> a legmelegebbtől a leghidegebbig.
          </li>
          <li>Kezdd a mínuszos számokkal! Közülük az a leghidegebb, amelyik a legmesszebb van a 0-tól.</li>
        </ul>
      </TheorySection>

      <TheorySection title="4. Melegedett vagy hűlt?" badge="fölfelé – lefelé" badgeColor="rose">
        <UpDownSvg />
        <p className="text-sm text-slate-700">
          Ha a hőmérő oszlopa <strong>fölfelé</strong> megy, <strong>melegedett</strong> a levegő. Ha <strong>lefelé</strong> megy, <strong>hűlt</strong>. Az üres karika a régi, a teli karika az új hőmérséklet.
        </p>
      </TheorySection>

      <TheorySection title="5. Hány fokkal változott?" badge="lépések a hőmérőn" badgeColor="amber">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <WarmUpSvg />
              <p className="text-sm text-slate-700">
                Mindkettő a 0 fölött: 3-tól 8-ig 5 lépés. Kivonással: 8 – 3 = 5. <strong>Melegedett 5 fokkal.</strong>
              </p>
            </div>
            <div className="space-y-1">
              <BothBelowSvg />
              <p className="text-sm text-slate-700">
                Mindkettő a 0 alatt: –8-tól fölfelé –3-ig 5 lépés. <strong>Melegedett 5 fokkal.</strong>
              </p>
            </div>
          </div>
          <TheoryCallout type="info" title="Átlépünk a 0-n: két részben számolunk">
            Először a 0-ig lépünk, aztán tovább. A két részt összeadjuk.
          </TheoryCallout>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <AcrossZeroSvg />
              <p className="text-sm text-slate-700">
                –4 °C → 5 °C: 4 fok a 0-ig, aztán még 5 fok. 4 + 5 = 9. <strong>Melegedett 9 fokkal.</strong>
              </p>
            </div>
            <div className="space-y-1">
              <CoolDownSvg />
              <p className="text-sm text-slate-700">
                6 °C → –2 °C: 6 fok a 0-ig, aztán még 2 fok. 6 + 2 = 8. <strong>Hűlt 8 fokkal.</strong>
              </p>
            </div>
          </div>
        </div>
      </TheorySection>

      <TheorySection title="6. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) Hajnalban –5 °C, délben 4 °C" badge="változás" badgeColor="blue">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Fölfelé ment: melegedett.</li>
              <li>A 0-ig: 5 fok. Utána: 4 fok.</li>
              <li>
                5 + 4 = 9. <strong>Melegedett 9 fokkal.</strong>
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) 7 °C volt, hűlt 9 fokkal" badge="mennyi lett?" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Lefelé lépünk 9 fokot.</li>
              <li>7 fok a 0-ig. Kell még: 9 – 7 = 2 fok.</li>
              <li>
                A 0 alatt 2 fokkal: <strong>–2 °C</strong>.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Igaz vagy hamis?" badge="állítás" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>„A –10 °C melegebb, mint a –7 °C.”</li>
              <li>A –10 °C lejjebb van a hőmérőn. Ez HAMIS.</li>
              <li>
                Igazzá tesszük: <strong>a –10 °C hidegebb, mint a –7 °C.</strong>
              </li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="7. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Átlépés a 0-n"
          wrong="Reggel –2 °C, délben 5 °C. 5 – 2 = 3, tehát 3 fokkal melegedett."
          wrongExplanation="A –2 nem ugyanaz, mint a 2! A –2 a 0 alatt van."
          correct="–2-től a 0-ig 2 fok, a 0-tól az 5-ig 5 fok. 2 + 5 = 7 fok."
          correctExplanation="Ha átlépsz a 0-n, a két részt összeadod."
          tip="Tedd az ujjad a hőmérőre, és lépkedj vele!"
        />
        <TheoryCallout type="warning" title="Nagyobb szám, mégis hidegebb">
          A 9 nagyobb, mint a 4. De a –9 °C <strong>hidegebb</strong>, mint a –4 °C! Mínusznál a nagyobb szám a nagyobb hideg.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="8. Labor I: Állítsd be a hőmérőt!" badge="Labor" badgeColor="indigo">
        <div className="bg-white border-2 border-indigo-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <p className="text-lg font-black text-indigo-900 text-center">
            {fmtC(st.start)} volt. {st.up ? 'Melegedett' : 'Hűlt'} {st.k} fokkal.
          </p>
          <p className="text-sm text-slate-600 text-center">Állítsd be a nyilakkal, mit mutat most a hőmérő!</p>
          <div className="flex items-center justify-center gap-4">
            <svg viewBox="0 0 150 290" className="w-36 h-auto select-none" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
              <Thermo cx={70} {...p1} value={cur} labelStep={5} fs={13} liquid={ok1 ? '#059669' : RED} />
              <circle cx="70" cy={p1.yBot - ((st.start - p1.min) / (p1.max - p1.min)) * (p1.yBot - p1.yTop)} r="5" fill="#ffffff" stroke={INK} strokeWidth="2.2" />
              <text x="104" y={p1.yBot - ((st.start - p1.min) / (p1.max - p1.min)) * (p1.yBot - p1.yTop) + 5} fontSize="12" fontWeight="bold" fill={INK}>
                volt
              </text>
            </svg>
            <div className="flex flex-col items-center gap-3">
              <button onClick={() => step(1)} className={`${btn} bg-orange-100 border-orange-400 text-orange-800 w-32`}>
                ▲ melegebb
              </button>
              <div className="text-center">
                <div className="text-3xl font-black text-slate-800">{fmtC(cur)}</div>
                <div className="text-xs text-slate-500">
                  lépések: {Math.abs(moved)} {moved > 0 ? '(fölfelé)' : moved < 0 ? '(lefelé)' : ''}
                </div>
              </div>
              <button onClick={() => step(-1)} className={`${btn} bg-sky-100 border-sky-400 text-sky-800 w-32`}>
                ▼ hidegebb
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => {
                if (ok1) return;
                setChecked(true);
                if (cur === target) setScore1((s) => s + 1);
              }}
              className={`${btn} bg-indigo-600 text-white border-indigo-700 px-6`}
            >
              Ellenőrzés
            </button>
          </div>
          {checked && <div className={`rounded-xl p-3 text-center text-sm font-bold ${ok1 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{fb1()}</div>}
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-indigo-800">Jó válaszok: {score1}</span>
            <button
              onClick={() => {
                const t = makeSetTask();
                setSt(t);
                setCur(t.start);
                setChecked(false);
              }}
              className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-sm font-bold min-h-[48px]"
            >
              Új feladat
            </button>
          </div>
        </div>
      </TheorySection>

      <TheorySection title="9. Labor II: Mennyit változott?" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <p className="text-lg font-black text-emerald-900 text-center">
            Reggel {fmtC(rt.a)}, délben {fmtC(rt.b)}. Mi történt?
          </p>
          <ChangeThermoSvg from={rt.a} to={rt.b} min={-10} max={10} arrowText="? fok" split={ok2 && rt.a * rt.b < 0 ? [`${Math.abs(rt.a)} fok`, `${Math.abs(rt.b)} fok`] : undefined} className="w-full max-w-[300px] h-auto mx-auto" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-md mx-auto">
            {rt.opts.map((o) => {
              const c = ans === o ? (ok2 ? 'bg-emerald-500 text-white border-emerald-700' : 'bg-rose-400 text-white border-rose-600') : 'bg-white text-slate-800 border-slate-300 hover:bg-emerald-50';
              return (
                <button
                  key={o}
                  onClick={() => {
                    if (ok2) return;
                    setAns(o);
                    if (o === right2) setScore2((s) => s + 1);
                  }}
                  className={`${btn} ${c}`}
                >
                  {o}
                </button>
              );
            })}
          </div>
          {ans !== null && <div className={`rounded-xl p-3 text-center text-sm font-bold ${ok2 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{fb2()}</div>}
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-emerald-800">Jó válaszok: {score2}</span>
            <button
              onClick={() => {
                setRt(makeReadTask());
                setAns(null);
              }}
              className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-sm font-bold min-h-[48px]"
            >
              Új feladat
            </button>
          </div>
        </div>
      </TheorySection>

      <TheorySection title="10. Labor III: Sorba rendezés" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex justify-center gap-2">
            {[true, false].map((m) => (
              <button
                key={String(m)}
                onClick={() => {
                  setAsc(m);
                  setPicked([]);
                  setWrong(null);
                }}
                className={`px-4 py-2 rounded-xl text-sm font-bold min-h-[44px] border-2 ${asc === m ? 'bg-purple-600 text-white border-purple-700' : 'bg-white text-purple-800 border-purple-300'}`}
              >
                {m ? 'növekvő' : 'csökkenő'}
              </button>
            ))}
          </div>
          <p className="text-lg font-black text-purple-900 text-center">{asc ? 'Koppints a leghidegebbre, aztán sorban a melegebbekre!' : 'Koppints a legmelegebbre, aztán sorban a hidegebbekre!'}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {vals.map((v) => {
              const used = picked.includes(v);
              const c = used ? 'bg-slate-100 text-slate-300 border-slate-200' : wrong === v ? 'bg-rose-100 text-rose-800 border-rose-400' : 'bg-white text-slate-800 border-purple-300 hover:bg-purple-50';
              return (
                <button key={v} onClick={() => pick(v)} className={`${btn} ${c} min-w-[84px]`}>
                  {fmtC(v)}
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap justify-center items-center gap-1 min-h-[52px] rounded-xl bg-purple-50 p-2">
            {picked.map((v, i) => (
              <React.Fragment key={v}>
                {i > 0 && <span className="text-purple-700 font-black">{asc ? '<' : '>'}</span>}
                <span className="px-2 py-1 rounded-lg bg-white border-2 border-purple-400 font-bold">{fmtC(v)}</span>
              </React.Fragment>
            ))}
            {picked.length === 0 && <span className="text-sm text-purple-400">Ide kerülnek sorban a számok.</span>}
          </div>
          {(wrong !== null || done3) && <div className={`rounded-xl p-3 text-center text-sm font-bold ${done3 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{fb3()}</div>}
          <button
            onClick={() => {
              setVals(makeOrderSet());
              setPicked([]);
              setWrong(null);
            }}
            className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-sm font-bold min-h-[48px]"
          >
            Új feladat
          </button>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default NegChangesG3Theory;
