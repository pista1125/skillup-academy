import React, { useRef, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import {
  TimeUnitsStairsSvg,
  ClockPartsSvg,
  QuarterClocksSvg,
  MorningEveningSvg,
  ElapsedJumpsSvg,
  StopwatchCalendarSvg
} from './TimeG3Figures';
import { FONT, INK, ClockFace, hm, durWords } from './TimeG3Parts';

/** Névelő a szám elé: „az 5”, „az 1”, „a 7”. */
const art = (n: number) => (n === 1 || String(n)[0] === '5' ? 'az' : 'a');
const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// ---------------------------------------------------------------------------
// Labor I – Óraállító
// ---------------------------------------------------------------------------
type TargetKind = 'words' | 'quarter' | 'digital24';
interface ClockTask {
  h: number; // 0–23
  m: number;
  kind: TargetKind;
}
const quarterName = (h: number, m: number): string => {
  const next = (h % 12) + 1;
  if (m === 0) return `${h % 12 === 0 ? 12 : h % 12} óra`;
  if (m === 15) return `negyed ${next}`;
  if (m === 30) return `fél ${next}`;
  return `háromnegyed ${next}`;
};
const targetText = (t: ClockTask): string => {
  if (t.kind === 'quarter') return quarterName(t.h, t.m);
  if (t.kind === 'digital24') return hm(t.h, t.m);
  return t.m === 0 ? `${t.h} óra` : `${t.h} óra ${t.m} perc`;
};
const makeClockTask = (exact: boolean): ClockTask => {
  const r = Math.random();
  if (r < 0.35) return { h: rnd(1, 11), m: [0, 15, 30, 45][rnd(0, 3)], kind: 'quarter' };
  if (r < 0.7) return { h: rnd(13, 22), m: exact ? rnd(0, 59) : rnd(0, 11) * 5, kind: 'digital24' };
  return { h: rnd(1, 11), m: exact ? rnd(1, 59) : rnd(1, 11) * 5, kind: 'words' };
};

const BigBtn: React.FC<{ onClick: () => void; children: React.ReactNode; color?: string }> = ({ onClick, children, color = 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50' }) => (
  <button onClick={onClick} className={`px-3 py-2 rounded-xl text-base font-black min-h-[52px] min-w-[76px] border-2 transition-colors ${color}`}>
    {children}
  </button>
);

const OptButton: React.FC<{ v: string; onClick: () => void; state?: 'ok' | 'bad' | null }> = ({ v, onClick, state }) => (
  <button
    onClick={onClick}
    className={`px-4 py-3 rounded-xl text-base font-black min-h-[52px] min-w-[90px] border-2 transition-colors ${
      state === 'ok' ? 'bg-emerald-500 border-emerald-700 text-white' : state === 'bad' ? 'bg-rose-100 border-rose-400 text-rose-700' : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
    }`}
  >
    {v}
  </button>
);

// ---------------------------------------------------------------------------
// Labor II – Mennyi idő telt el?
// ---------------------------------------------------------------------------
interface ElTask {
  s: number; // kezdés percben (napon belül)
  e: number; // vége percben
}
interface ElStep {
  ask: string;
  ans: string;
  opts: string[];
  from: number;
  to: number;
}
const makeElTask = (): ElTask => {
  const s = rnd(7, 16) * 60 + rnd(1, 11) * 5;
  const d = rnd(3, 22) * 5;
  return { s, e: s + d };
};
const distinctOpts = (correct: string, cands: string[]): string[] => {
  const out = [correct];
  cands.forEach((c) => {
    if (!out.includes(c) && out.length < 4 && !c.startsWith('0') && !c.startsWith('-')) out.push(c);
  });
  let k = 10;
  while (out.length < 4) {
    const c = `${k} perc`;
    if (!out.includes(c)) out.push(c);
    k += 5;
  }
  return shuffle(out);
};
const elSteps = (t: ElTask): ElStep[] => {
  const nextHour = Math.ceil(t.s / 60) * 60;
  const total = t.e - t.s;
  const naive = Math.floor(t.e / 60) * 100 + (t.e % 60) - (Math.floor(t.s / 60) * 100 + (t.s % 60));
  const totalStep: ElStep = {
    ask: 'Mennyi idő telt el összesen?',
    ans: durWords(total),
    opts: distinctOpts(durWords(total), [`${naive} perc`, durWords(total + 10), durWords(Math.max(5, total - 10)), durWords(total + 60)]),
    from: t.s,
    to: t.e
  };
  if (t.e <= nextHour) return [totalStep];
  const a = nextHour - t.s;
  const b = t.e - nextHour;
  return [
    {
      ask: `1. ugrás: mennyi idő van a kezdéstől (${hm(Math.floor(t.s / 60), t.s % 60)}) a következő egész óráig?`,
      ans: durWords(a),
      opts: distinctOpts(durWords(a), [durWords(t.s % 60), durWords(a + 5), durWords(Math.max(5, a - 5)), durWords(a + 10)]),
      from: t.s,
      to: nextHour
    },
    {
      ask: `2. ugrás: mennyi idő van az egész órától (${hm(nextHour / 60, 0)}) a végéig?`,
      ans: durWords(b),
      opts: distinctOpts(durWords(b), [durWords(b + 5), durWords(Math.max(5, b - 5)), durWords(b + 60), durWords(b + 10)]),
      from: nextHour,
      to: t.e
    },
    totalStep
  ];
};

/** Időszalag a laborhoz: ívek a megoldott lépésekhez. */
const Ribbon: React.FC<{ s: number; e: number; arcs: { from: number; to: number; label: string; color: string }[] }> = ({ s, e, arcs }) => {
  const lo = s - 5;
  const hi = e + 5;
  const x0 = 24;
  const x1 = 336;
  const X = (v: number) => x0 + ((x1 - x0) * (v - lo)) / (hi - lo);
  const y = 92;
  const hours: number[] = [];
  for (let v = Math.ceil(lo / 60) * 60; v <= hi; v += 60) hours.push(v);
  const showAt = [s, ...hours, e].filter((v, i, arr) => arr.indexOf(v) === i).sort((p, q) => p - q);
  const low: boolean[] = [];
  showAt.forEach((v, i) => {
    low.push(i > 0 && !low[i - 1] && X(v) - X(showAt[i - 1]) < 40);
  });
  return (
    <svg viewBox="0 0 360 130" className="w-full h-auto max-w-xl mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="128" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
      <line x1={x0} y1={y} x2={x1} y2={y} stroke="#334155" strokeWidth="2.5" />
      {showAt.map((v, i) => {
        const full = v % 60 === 0;
        const lab = hm(Math.floor(v / 60), v % 60);
        return (
          <g key={v}>
            <line x1={X(v)} y1={y - 7} x2={X(v)} y2={y + 7} stroke="#334155" strokeWidth="2" />
            <circle cx={X(v)} cy={y} r="5" fill={full && v !== s && v !== e ? '#16a34a' : '#2563eb'} />
            <text x={X(v)} y={y + (low[i] ? 36 : 22)} textAnchor="middle" fontSize="12.5" fontWeight="bold" fill={INK}>{lab}</text>
          </g>
        );
      })}
      {arcs.map((a, i) => {
        const xa = X(a.from);
        const xb = X(a.to);
        const hgt = Math.min(50, 16 + (xb - xa) * 0.25);
        return (
          <g key={i}>
            <path d={`M ${xa} ${y - 8} Q ${(xa + xb) / 2} ${y - 8 - hgt * 2} ${xb} ${y - 8}`} fill="none" stroke={a.color} strokeWidth="3" />
            <text x={(xa + xb) / 2} y={y - 12 - hgt} textAnchor="middle" fontSize="12" fontWeight="bold" fill={a.color}>{a.label}</text>
          </g>
        );
      })}
    </svg>
  );
};

export const TimeG3Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // ---- Labor I ----
  const [exact, setExact] = useState<boolean>(false);
  const [task, setTask] = useState<ClockTask>({ h: 16, m: 35, kind: 'digital24' });
  const [cur, setCur] = useState<number>(12 * 60); // 12:00 (percben, 12 órás körön)
  const [msg1, setMsg1] = useState<{ ok: boolean; text: string } | null>(null);
  const [streak, setStreak] = useState<number>(0);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const curH = Math.floor(cur / 60) % 12;
  const curM = cur % 60;
  const move = (d: number) => {
    setCur((c) => (((c + d) % 720) + 720) % 720);
    setMsg1(null);
  };
  const newTask = (ex = exact) => {
    let t = makeClockTask(ex);
    while (t.h === task.h && t.m === task.m) t = makeClockTask(ex);
    setTask(t);
    setMsg1(null);
  };
  const onFaceClick = (ev: React.MouseEvent<SVGSVGElement>) => {
    const el = svgRef.current;
    if (!el) return;
    const b = el.getBoundingClientRect();
    if (b.width === 0) return;
    const x = ((ev.clientX - b.left) / b.width) * 200 - 100;
    const y = ((ev.clientY - b.top) / b.height) * 200 - 100;
    if (x * x + y * y < 15 * 15) return;
    let deg = (Math.atan2(x, -y) * 180) / Math.PI;
    if (deg < 0) deg += 360;
    const step = exact ? 1 : 5;
    const mm = (Math.round(deg / 6 / step) * step) % 60;
    setCur((c) => Math.floor(c / 60) * 60 + mm);
    setMsg1(null);
  };
  const check1 = () => {
    const th = task.h % 12;
    const okH = curH === th;
    const okM = curM === task.m;
    if (okH && okM) {
      setStreak((s) => s + 1);
      const extra = task.kind === 'digital24' ? ` Délután vagy este a mutatós óra ugyanígy áll: ${task.h} − 12 = ${task.h - 12}.` : '';
      setMsg1({ ok: true, text: `Szuper! Ez ${hm(task.h, task.m)}.${extra}` });
      return;
    }
    setStreak(0);
    if (okH && !okM) {
      const k = Math.floor(task.m / 5) === 0 ? 12 : Math.floor(task.m / 5);
      const tail = task.m % 5 === 0 ? `${art(k)} ${k} számra mutat.` : `${art(k)} ${k} szám után még ${task.m % 5} kis vonallal áll.`;
      setMsg1({ ok: false, text: `A kismutató jó helyen van. Most a nagymutatót állítsd! ${task.m} percnél a nagymutató ${tail}` });
      return;
    }
    if (okM && !okH) {
      if (task.kind === 'quarter' && task.m > 0 && curH === (th + 1) % 12) {
        setMsg1({ ok: false, text: `A nagymutató jó! De „${quarterName(task.h, task.m)}” azt jelenti: még nem értük el ${art(th + 1)} ${th + 1} órát. Egy órával vissza!` });
      } else if (task.kind === 'digital24') {
        setMsg1({ ok: false, text: `A nagymutató jó! A kismutatóhoz: ${task.h} − 12 = ${task.h - 12}. A kismutató ${art(task.h - 12)} ${task.h - 12} közelében álljon.` });
      } else {
        setMsg1({ ok: false, text: 'A nagymutató jó! Most a kismutatót állítsd az órák gombjaival.' });
      }
      return;
    }
    setMsg1({ ok: false, text: 'Még nem jó. Először a nagymutatót állítsd (perc), utána a kismutatót (óra)!' });
  };

  // ---- Labor II ----
  const [el, setEl] = useState<ElTask>({ s: 8 * 60 + 45, e: 9 * 60 + 20 });
  const [stepIdx, setStepIdx] = useState<number>(0);
  const [bad2, setBad2] = useState<string | null>(null);
  const [msg2, setMsg2] = useState<string>('');
  const [showDigits, setShowDigits] = useState<boolean>(false);
  const steps = elSteps(el);
  // A válaszlehetőségek sorrendje feladatonként rögzített.
  const [optOrder, setOptOrder] = useState<string[][]>(() => steps.map((s) => s.opts));
  const done2 = stepIdx >= steps.length;
  const newEl = () => {
    let t = makeElTask();
    while (t.s === el.s && t.e === el.e) t = makeElTask();
    setEl(t);
    setOptOrder(elSteps(t).map((s) => s.opts));
    setStepIdx(0);
    setBad2(null);
    setMsg2('');
  };
  const pick2 = (v: string) => {
    if (done2) return;
    const st = steps[stepIdx];
    if (v === st.ans) {
      setStepIdx(stepIdx + 1);
      setBad2(null);
      setMsg2('');
      return;
    }
    setBad2(v);
    const nh = Math.ceil(el.s / 60) * 60;
    if (stepIdx === 0 && steps.length === 3) setMsg2(`Számold a nagymutató lépéseit ${el.s % 60}-tól 60-ig! 60 − ${el.s % 60} = ?`);
    else if (stepIdx === 1 && steps.length === 3) setMsg2(`Most az egész órától számolj: ${hm(nh / 60, 0)} → ${hm(Math.floor(el.e / 60), el.e % 60)}. Ha 60 percnél több, az már 1 óra és még valamennyi perc.`);
    else if (steps.length === 3) setMsg2('Add össze a két ugrást! Ha 60 perc vagy több, az már 1 óra.');
    else {
      const endM = el.e % 60 === 0 ? 60 : el.e % 60;
      setMsg2(`Számold a nagymutató lépéseit: ${el.s % 60} → ${endM}. ${endM} − ${el.s % 60} = ?`);
    }
  };
  const colors = ['#f97316', '#8b5cf6', '#16a34a'];
  const arcs = steps.slice(0, stepIdx).filter((s, i) => !(steps.length === 3 && i === 2)).map((s, i) => ({ from: s.from, to: s.to, label: s.ans, color: colors[i] }));
  const sH = Math.floor(el.s / 60);
  const eH = Math.floor(el.e / 60);

  return (
    <TheoryTemplate
      topicId="g3-measurements-1"
      subtopicId="az-ido-merese"
      grade={3}
      chapterId="meresek"
      title="9. Az idő mérése"
      subtitle="Óraleolvasás percre pontosan, napszakok, másodperc, eltelt idő, naptár."
      badge="3. OSZTÁLY • IV. MÉRÉSEK • TANANYAG"
      themeColor="indigo"
      pdfFilename="3_osztaly_az_ido_merese_tananyag.pdf"
      practiceTitle="Készen állsz? Mérjük az időt!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — AZ IDŐ EGYSÉGEI',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-center font-mono text-sm font-black text-indigo-900 dark:text-indigo-200">
              1 perc = 60 másodperc &nbsp; 1 óra = 60 perc &nbsp; 1 nap = 24 óra
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Kismutató: <strong>óra</strong>. Nagymutató: <strong>perc</strong>.</li>
              <li>Délután és este: <strong>+ 12</strong> (4:20 → 16:20).</li>
              <li>Eltelt idő: először ugorj az <strong>egész óráig</strong>!</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 138–141. o." badgeColor="indigo">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Leolvassuk az órát <strong>percre pontosan</strong>.</p>
          <p>Megtanuljuk az új, kicsi egységet: a <strong>másodpercet</strong>.</p>
          <p>Kiszámoljuk, <strong>mennyi idő telt el</strong>. Olvasunk menetrendet és naptárt.</p>
        </div>
      </TheorySection>

      {/* 2. Mértékegységek */}
      <TheorySection title="2. Az idő mértékegységei" badge="Mértékváltás" badgeColor="emerald">
        <TimeUnitsStairsSvg />
        <TheoryTable
          headers={['Egység', 'Mennyi?', 'Példa']}
          rows={[
            ['1 perc', '60 másodperc', '2 perc = 120 másodperc'],
            ['1 óra', '60 perc', '3 óra = 180 perc'],
            ['1 nap', '24 óra', 'reggeltől reggelig'],
            ['1 hét', '7 nap', '2 hét = 14 nap'],
            ['1 év', '12 hónap', '365 nap (szökőévben 366)']
          ]}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Óra és perc → perc" badge="Átváltás" badgeColor="emerald">
            <p className="text-sm text-slate-700">2 óra 40 perc = ? perc</p>
            <p className="text-sm text-slate-700">2 óra = 60 + 60 = 120 perc. 120 + 40 = <strong>160 perc</strong>.</p>
          </TheoryCard>
          <TheoryCard title="Perc → óra és perc" badge="Visszafelé" badgeColor="blue">
            <p className="text-sm text-slate-700">95 perc = ? óra ? perc</p>
            <p className="text-sm text-slate-700">60 perc = 1 óra. 95 − 60 = 35. Tehát <strong>1 óra 35 perc</strong>.</p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. Az óra */}
      <TheorySection title="3. Olvassuk le az órát!" badge="Mutatós óra" badgeColor="sky">
        <ClockPartsSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>A nagymutató két szám között <strong>5 percet</strong> lép. A kis vonalak 1-1 percet jelentenek.</p>
          <p>A kismutató lassan megy. Fél 9-kor már félúton van a 8 és a 9 között.</p>
        </div>
        <QuarterClocksSvg />
        <TheoryCallout type="info" title="Többféleképpen is mondhatod">
          9:15 = 9 óra 15 perc = 9 óra múlt 15 perccel = <strong>negyed 10</strong>. A „negyed 10” azt jelenti: már elindultunk a 10 óra felé.
        </TheoryCallout>
      </TheorySection>

      {/* 4. Napszakok */}
      <TheorySection title="4. Délelőtt, délután, este" badge="24 órás írás" badgeColor="amber">
        <MorningEveningSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>A kismutató egy nap alatt <strong>kétszer</strong> megy körbe. Ezért egy óraállás kétféle időpont lehet.</p>
          <p>Délután és este hozzáadunk 12-t: délután 3 óra = <strong>15 óra</strong>, este 8 óra = <strong>20 óra</strong>.</p>
        </div>
        <TheoryTable
          headers={['Az óra mutatja', 'Délelőtt', 'Délután / este']}
          rows={[
            ['2 óra 10 perc', '2:10 (éjjel)', '14:10'],
            ['6 óra 45 perc', '6:45', '18:45'],
            ['9 óra 30 perc', '9:30', '21:30']
          ]}
        />
      </TheorySection>

      {/* 5. Eltelt idő */}
      <TheorySection title="5. Mennyi idő telt el?" badge="Ugrás az egész óráig" badgeColor="orange">
        <ElapsedJumpsSvg />
        <p className="text-sm text-slate-700 leading-relaxed">Két ugrással számolunk: előbb az <strong>egész óráig</strong>, utána a végéig. A két ugrást összeadjuk.</p>
      </TheorySection>

      {/* 6. Nézzük meg együtt */}
      <TheorySection title="6. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="purple">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) Mikor ér véget?" badge="Mozi" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A mese 14:50-kor kezdődik.</li>
              <li>45 percig tart.</li>
              <li>14:50 + 10 perc = 15:00.</li>
              <li>Még 35 perc: <strong>15:35</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Másodpercek" badge="Stopper" badgeColor="orange">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>1 perc 50 másodperc + 25 másodperc = ?</li>
              <li>50 + 10 = 60 másodperc = 1 perc.</li>
              <li>Marad 15 másodperc.</li>
              <li>Tehát <strong>2 perc 15 másodperc</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Hány napos?" badge="Naptár" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Tábor: július 6-tól 12-ig.</li>
              <li>Az első és az utolsó napot is számoljuk.</li>
              <li>6, 7, 8, 9, 10, 11, 12.</li>
              <li>Ez <strong>7 nap = 1 hét</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
        <StopwatchCalendarSvg />
        <TheoryTable
          headers={['Hány napos?', 'Hónapok']}
          rows={[
            ['31 nap', 'január, március, május, július, augusztus, október, december'],
            ['30 nap', 'április, június, szeptember, november'],
            ['28 nap (szökőévben 29)', 'február']
          ]}
        />
        <TheoryCallout type="tip" title="Évszakok">
          Tél: december, január, február. Tavasz: március, április, május. Nyár: június, július, augusztus. Ősz: szeptember, október, november.
        </TheoryCallout>
      </TheorySection>

      {/* 7. Vigyázz */}
      <TheorySection title="7. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="1 óra 30 perc – hány perc?"
          wrong="1 óra 30 perc = 130 perc"
          wrongExplanation="Az óra nem 100 perc! Itt nem lehet a számokat egymás mellé írni."
          correct="1 óra 30 perc = 90 perc"
          correctExplanation="1 óra = 60 perc. 60 + 30 = 90 perc."
          tip="1 óra = 60 perc, 1 perc = 60 másodperc. Mindig 60-nal számolj!"
        />
        <TheoryCallout type="warning" title="8:45-től 9:20-ig nem 75 perc!">
          A 920 − 845 = 75 hibás, mert egy órában nem 100, hanem 60 perc van. Ugorj az egész óráig: 15 perc + 20 perc = <strong>35 perc</strong>.
        </TheoryCallout>
      </TheorySection>

      {/* 8. Labor I */}
      <TheorySection title="8. Labor I: Óraállító" badge="Labor" badgeColor="sky">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <button onClick={() => newTask()} className="px-4 py-2 rounded-xl bg-sky-600 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
              <button
                onClick={() => {
                  const ex = !exact;
                  setExact(ex);
                  newTask(ex);
                }}
                className={`px-4 py-2 rounded-xl text-sm font-bold min-h-[48px] border-2 ${exact ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-white text-indigo-700 border-indigo-300'}`}
              >
                {exact ? 'Percre pontosan: BE' : 'Percre pontosan: KI'}
              </button>
            </div>
            <div className="text-sm font-bold text-sky-800 bg-sky-50 rounded-xl px-3 py-2">Jó válaszok egymás után: {streak}</div>
          </div>
          <div className="bg-sky-50 rounded-xl p-3 text-center text-sky-900 font-bold text-lg">
            Állítsd be: <span className="text-2xl font-black">{targetText(task)}</span>
            {task.kind === 'digital24' && <div className="text-xs font-bold text-sky-700">(délután vagy este)</div>}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <svg ref={svgRef} viewBox="0 0 200 200" className="w-56 h-56 cursor-pointer touch-manipulation" onClick={onFaceClick} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
              <ClockFace cx={100} cy={100} r={92} h={curH} m={curM} />
            </svg>
            <div className="grid grid-cols-2 gap-2">
              <BigBtn onClick={() => move(-60)}>− 1 óra</BigBtn>
              <BigBtn onClick={() => move(60)}>+ 1 óra</BigBtn>
              <BigBtn onClick={() => move(-5)}>− 5 perc</BigBtn>
              <BigBtn onClick={() => move(5)}>+ 5 perc</BigBtn>
              <BigBtn onClick={() => move(-1)}>− 1 perc</BigBtn>
              <BigBtn onClick={() => move(1)}>+ 1 perc</BigBtn>
            </div>
          </div>
          <p className="text-xs text-center text-slate-500">Tipp: a számlapra koppintva is odaugrik a nagymutató.</p>
          <div className="flex justify-center">
            <button onClick={check1} className="px-6 py-3 rounded-xl bg-emerald-600 text-white text-base font-black min-h-[52px]">Ellenőrzés</button>
          </div>
          {msg1 && <div className={`rounded-xl p-3 text-center text-sm font-bold ${msg1.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{msg1.text}</div>}
        </div>
      </TheorySection>

      {/* 9. Labor II */}
      <TheorySection title="9. Labor II: Mennyi idő telt el?" badge="Labor" badgeColor="orange">
        <div className="bg-white border-2 border-orange-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            <button onClick={newEl} className="px-4 py-2 rounded-xl bg-orange-500 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <button onClick={() => setShowDigits((v) => !v)} className="px-4 py-2 rounded-xl bg-white border-2 border-orange-300 text-orange-700 text-sm font-bold min-h-[48px]">
              {showDigits ? 'Számok elrejtése' : 'Mutasd számokkal is'}
            </button>
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <svg viewBox="0 0 120 120" className="w-32 h-32" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
                <ClockFace cx={60} cy={60} r={54} h={sH} m={el.s % 60} />
              </svg>
              <div className="text-sm font-bold text-slate-700">kezdés{showDigits ? `: ${hm(sH, el.s % 60)}` : ''}</div>
            </div>
            <div className="text-3xl font-black text-emerald-600">→</div>
            <div className="text-center">
              <svg viewBox="0 0 120 120" className="w-32 h-32" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
                <ClockFace cx={60} cy={60} r={54} h={eH} m={el.e % 60} />
              </svg>
              <div className="text-sm font-bold text-slate-700">vége{showDigits ? `: ${hm(eH, el.e % 60)}` : ''}</div>
            </div>
          </div>
          <Ribbon s={el.s} e={el.e} arcs={arcs} />
          {!done2 && (
            <>
              <div className="bg-orange-50 rounded-xl p-3 text-center text-orange-900 font-bold">{steps[stepIdx].ask}</div>
              <div className="flex flex-wrap gap-2 justify-center">
                {(optOrder[stepIdx] ?? steps[stepIdx].opts).map((v) => (
                  <OptButton key={`${stepIdx}-${v}`} v={v} onClick={() => pick2(v)} state={bad2 === v ? 'bad' : null} />
                ))}
              </div>
            </>
          )}
          {msg2 && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">{msg2}</div>}
          {done2 && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              Ügyes vagy! Kezdés {hm(sH, el.s % 60)}, vége {hm(eH, el.e % 60)}: {durWords(el.e - el.s)} telt el. Kérj új feladatot!
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default TimeG3Theory;
