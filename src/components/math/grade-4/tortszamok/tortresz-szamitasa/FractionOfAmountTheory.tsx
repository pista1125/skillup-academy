import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import {
  TwoStepDiscsSvg,
  PriceBarsSvg,
  CarCollectionSvg,
  MeterTapeSvg,
  ClockPartsSvg,
  SyrupSvg,
  DiscGroupsG,
  partOf,
  fwOf
} from './FractionOfAmountFigures';
import { BarG, vel } from '../tortek-osszehasonlitasa/FractionCompare4Figures';

// ---------------------------------------------------------------------------
// Labor I – Korongosztó (TK 148/4: „Játsszátok el korongokkal!”)
// ---------------------------------------------------------------------------
export const DISC_TASKS: { total: number; n: number; d: number; text: string }[] = [
  { total: 12, n: 1, d: 2, text: '12 bonbon fele' },
  { total: 12, n: 1, d: 3, text: '12 bonbon 1 harmada' },
  { total: 12, n: 3, d: 4, text: '12-nek a 3 negyede' },
  { total: 24, n: 1, d: 4, text: '24 pogácsa negyede' },
  { total: 24, n: 2, d: 3, text: '24 tányér 2 harmada' },
  { total: 20, n: 2, d: 5, text: '20 gyöngy 2 ötöde' },
  { total: 18, n: 5, d: 6, text: '18 korong 5 hatoda' },
  { total: 30, n: 7, d: 10, text: '30 korong 7 tizede' }
];
const divisorsOf = (t: number) => [2, 3, 4, 5, 6, 10].filter((d) => t % d === 0);

const DiscLab: React.FC = () => {
  const [ti, setTi] = useState(0);
  const [groups, setGroups] = useState(1);
  const [colored, setColored] = useState(0);
  const [done, setDone] = useState<number[]>([]);
  const [msg, setMsg] = useState<{ ok: boolean; t: string } | null>(null);
  const task = DISC_TASKS[ti];
  const per = task.total / groups;
  const r = 9;
  const rowW = per * (2 * r + 6) + 30;
  const vbW = Math.max(260, rowW);
  const vbH = groups * 26 + 16;

  const pick = (i: number) => {
    setTi(i);
    setGroups(1);
    setColored(0);
    setMsg(null);
  };
  const check = () => {
    if (groups !== task.d) {
      setMsg({ ok: false, t: `Most ${groups} csoportod van. ${fwOf(task.n, task.d)} kell, ezért ${task.d} egyenlő csoportba rakd a korongokat!` });
      return;
    }
    if (colored !== task.n) {
      setMsg({ ok: false, t: `Jó a csoportosítás: ${task.total} : ${task.d} = ${per}. Most színezz ki pontosan ${task.n} csoportot (te ${colored}-t színeztél).` });
      return;
    }
    const res = partOf(task.total, task.n, task.d);
    setMsg({
      ok: true,
      t: `Ügyes! ${task.total} : ${task.d} = ${per}${task.n > 1 ? `, ${per} · ${task.n} = ${res}` : ''}. ${task.text} = ${res}.`
    });
    if (!done.includes(ti)) setDone([...done, ti]);
  };

  return (
    <div className="bg-white border-2 border-emerald-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap gap-2">
        {DISC_TASKS.map((t, i) => (
          <button
            key={i}
            onClick={() => pick(i)}
            className={`h-11 px-3 rounded-xl text-sm font-black border-2 ${i === ti ? 'bg-emerald-500 text-white border-emerald-600' : done.includes(i) ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-slate-100 text-slate-700 border-slate-200'}`}
          >
            {i + 1}. {done.includes(i) ? '✓' : ''}
          </button>
        ))}
      </div>
      <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-center text-lg font-black text-slate-800">Számold ki korongokkal: {task.text}!</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
        <div className="space-y-3">
          <div className="text-sm font-bold text-slate-600">1. Hány egyenlő csoportba rakod a {task.total} korongot?</div>
          <div className="flex flex-wrap gap-2">
            {[1, ...divisorsOf(task.total)].map((g) => (
              <button
                key={g}
                onClick={() => {
                  setGroups(g);
                  setColored(0);
                  setMsg(null);
                }}
                className={`h-12 min-w-[48px] px-3 rounded-xl text-lg font-black border-2 ${g === groups ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-white text-slate-800 border-slate-200 hover:bg-emerald-50'}`}
              >
                {g}
              </button>
            ))}
          </div>
          <div className="text-sm font-bold text-slate-600">2. Hány csoportot színezel ki?</div>
          <div className="flex items-center gap-3">
            <button onClick={() => { setColored(Math.max(0, colored - 1)); setMsg(null); }} className="h-12 w-12 rounded-xl bg-slate-100 border-2 border-slate-200 text-2xl font-black">
              −
            </button>
            <div className="text-2xl font-black text-emerald-700 min-w-[60px] text-center">{colored}</div>
            <button onClick={() => { setColored(Math.min(groups, colored + 1)); setMsg(null); }} className="h-12 w-12 rounded-xl bg-slate-100 border-2 border-slate-200 text-2xl font-black">
              +
            </button>
          </div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-center text-sm text-slate-700">
            {groups} csoport, egy csoportban <strong>{per}</strong> korong. Színes korongok: <strong className="text-emerald-700 text-lg">{per * colored}</strong>
          </div>
          <button onClick={check} className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black">
            Ellenőrzöm
          </button>
        </div>
        <svg viewBox={`0 0 ${vbW} ${vbH}`} className="w-full h-auto max-h-[320px] bg-emerald-50/50 rounded-xl border border-emerald-100">
          <DiscGroupsG x={18} y={20} total={task.total} groups={groups} colored={colored} r={r} gap={26} />
        </svg>
      </div>
      {msg && <div className={`rounded-xl p-3 text-sm font-bold ${msg.ok ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'}`}>{msg.t}</div>}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Labor II – Törtrész két lépésben (pénz, hosszúság, idő, tömeg, űrtartalom)
// ---------------------------------------------------------------------------
export const STEP_TASKS: { amount: number; unit: string; n: number; d: number; text: string; color: string }[] = [
  { amount: 4000, unit: 'Ft', n: 3, d: 4, text: '4000 Ft-nak a 3 negyede', color: '#3b82f6' },
  { amount: 100, unit: 'cm', n: 3, d: 4, text: '1 m = 100 cm 3 negyede', color: '#f97316' },
  { amount: 60, unit: 'perc', n: 3, d: 4, text: '1 óra = 60 perc 3 negyede', color: '#8b5cf6' },
  { amount: 1000, unit: 'g', n: 5, d: 10, text: '1 kg = 1000 g 5 tizede', color: '#a16207' },
  { amount: 400, unit: 'liter', n: 6, d: 10, text: 'a 400 literes dézsa 6 tizede', color: '#0ea5e9' },
  { amount: 200, unit: 'cm', n: 4, d: 5, text: '2 m = 200 cm 4 ötöde', color: '#a855f7' },
  { amount: 1000, unit: 'm', n: 3, d: 5, text: '1 km = 1000 m 3 ötöde', color: '#16a34a' },
  { amount: 2400, unit: 'Ft', n: 2, d: 5, text: '2400 Ft-nak a 2 ötöde', color: '#e11d48' }
];

const StepLab: React.FC = () => {
  const [ti, setTi] = useState(0);
  const [one, setOne] = useState('');
  const [res, setRes] = useState('');
  const [stage, setStage] = useState<1 | 2 | 3>(1);
  const [msg, setMsg] = useState<{ ok: boolean; t: string } | null>(null);
  const [done, setDone] = useState<number[]>([]);
  const t = STEP_TASKS[ti];
  const oneVal = t.amount / t.d;
  const resVal = partOf(t.amount, t.n, t.d);

  const pick = (i: number) => {
    setTi(i);
    setOne('');
    setRes('');
    setStage(1);
    setMsg(null);
  };
  const checkOne = () => {
    if (Number(one) === oneVal) {
      setStage(2);
      setMsg({ ok: true, t: `Jó! ${t.amount} : ${t.d} = ${oneVal} ${t.unit}. Ennyi 1 rész. Most szorozd meg ${vel(t.n)}!` });
    } else {
      setMsg({ ok: false, t: `Még nem jó. 1 rész kiszámításához osztani kell ${vel(t.d)}, mert ${t.d} egyenlő részre vágjuk az egészet: ${t.amount} : ${t.d} = ?` });
    }
  };
  const checkRes = () => {
    if (Number(res) === resVal) {
      setStage(3);
      setMsg({ ok: true, t: `Szuper! ${oneVal} · ${t.n} = ${resVal} ${t.unit}. Röviden: ${t.amount} : ${t.d} · ${t.n} = ${resVal}.` });
      if (!done.includes(ti)) setDone([...done, ti]);
    } else {
      setMsg({ ok: false, t: `Majdnem! 1 rész ${oneVal} ${t.unit}, és ${t.n} rész kell: ${oneVal} · ${t.n} = ?` });
    }
  };

  const input = 'h-12 w-32 rounded-xl border-2 border-slate-300 px-3 text-xl font-black text-center';
  return (
    <div className="bg-white border-2 border-sky-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap gap-2">
        {STEP_TASKS.map((s, i) => (
          <button
            key={i}
            onClick={() => pick(i)}
            className={`h-11 px-3 rounded-xl text-sm font-black border-2 ${i === ti ? 'bg-sky-500 text-white border-sky-600' : done.includes(i) ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-slate-100 text-slate-700 border-slate-200'}`}
          >
            {i + 1}. {done.includes(i) ? '✓' : ''}
          </button>
        ))}
      </div>
      <div className="rounded-xl bg-sky-50 border border-sky-200 p-3 text-center text-lg font-black text-slate-800">Mennyi {t.text}?</div>
      <svg viewBox="0 0 420 70" className="w-full h-auto">
        <BarG x={10} y={8} w={400} h={30} parts={t.d} filled={stage >= 2 ? t.n : 0} color={t.color} />
        {stage >= 2 &&
          Array.from({ length: t.d }, (_, i) => (
            <text key={i} x={10 + (400 / t.d) * (i + 0.5)} y={58} fontSize={t.d > 6 ? 10 : 12} fontWeight="bold" textAnchor="middle" fill="#334155">
              {oneVal}
            </text>
          ))}
        {stage < 2 && (
          <text x={210} y={58} fontSize="12" fontWeight="bold" textAnchor="middle" fill="#334155">
            az egész: {t.amount} {t.unit}, {t.d} egyenlő rész
          </text>
        )}
      </svg>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200 p-3 space-y-2">
          <div className="text-sm font-bold text-slate-600">1. lépés: mennyi 1 rész?</div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono font-black text-lg">
              {t.amount} : {t.d} =
            </span>
            <input inputMode="numeric" value={one} onChange={(e) => setOne(e.target.value.replace(/[^0-9]/g, ''))} className={input} aria-label="1 rész" disabled={stage > 1} />
            <span className="text-sm text-slate-500">{t.unit}</span>
          </div>
          <button onClick={checkOne} disabled={stage > 1} className="h-11 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:bg-slate-300 text-white font-black">
            Ellenőrzöm
          </button>
        </div>
        <div className={`rounded-xl border border-slate-200 p-3 space-y-2 ${stage < 2 ? 'opacity-50' : ''}`}>
          <div className="text-sm font-bold text-slate-600">2. lépés: mennyi {t.n} rész?</div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono font-black text-lg">
              {stage >= 2 ? oneVal : '…'} · {t.n} =
            </span>
            <input inputMode="numeric" value={res} onChange={(e) => setRes(e.target.value.replace(/[^0-9]/g, ''))} className={input} aria-label="eredmény" disabled={stage !== 2} />
            <span className="text-sm text-slate-500">{t.unit}</span>
          </div>
          <button onClick={checkRes} disabled={stage !== 2} className="h-11 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:bg-slate-300 text-white font-black">
            Ellenőrzöm
          </button>
        </div>
      </div>
      {msg && <div className={`rounded-xl p-3 text-sm font-bold ${msg.ok ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'}`}>{msg.t}</div>}
    </div>
  );
};

// ---------------------------------------------------------------------------
export const FractionOfAmountTheory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  return (
    <TheoryTemplate
      grade={4}
      chapterId="tortszamok"
      topicId="g4-fractions"
      subtopicId="tortresz-szamitasa"
      title="5. Törtrész kiszámítása, szöveges feladatok"
      subtitle="Mennyi 12-nek a 3 negyede? Mennyibe kerül a radír, ha 300 Ft-nak a 2 harmadába kerül? Törtrész pénzzel, hosszúsággal, idővel és tömeggel."
      badge="4. OSZTÁLY • VIII. A TÖRTSZÁMOK • TANANYAG"
      themeColor="emerald"
      pdfFilename="4_osztaly_tortresz_kiszamitasa_tananyag.pdf"
      practiceTitle="Készen állsz a törtrészek kiszámítására?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A TÖRTRÉSZ KÉT LÉPÉSBEN',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center">
              <span className="font-mono text-base font-black text-emerald-900 dark:text-emerald-200">12-nek a 3 negyede: 12 : 4 = 3, 3 · 3 = 9 → 12 : 4 · 3 = 9</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>1. lépés – osztás:</strong> hány egyenlő részre vágjuk? (negyed → <strong>: 4</strong>) Így megkapod <strong>1 rész</strong> értékét.
              </li>
              <li>
                <strong>2. lépés – szorzás:</strong> hány részt veszünk? (3 negyed → <strong>· 3</strong>)
              </li>
              <li>Mértékegységnél előbb váltsd át: 1 m = 100 cm, 1 óra = 60 perc, 1 kg = 1000 g, 1 km = 1000 m, 1 l = 1000 ml.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 148. o., 4. feladat" badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Manó szülinapjára 12 darabos bonbont kapott. Ha igazságosan osztoznak, egy gyereknek ennyi jut:
            </p>
            <TheoryTable
              headers={['Hányan osztoznak?', 'Művelet', 'Egy gyereknek jut', 'Ez a bonbonok…']}
              rows={[
                ['ketten', '12 : 2', '6 db', 'fele'],
                ['hárman', '12 : 3', '4 db', '1 harmada'],
                ['négyen', '12 : 4', '3 db', '1 negyede'],
                ['hatan', '12 : 6', '2 db', '1 hatoda'],
                ['tizenketten', '12 : 12', '1 db', '1 tizenkettede']
              ]}
            />
            <p>
              Egy törtrész kiszámítása tehát <strong>osztással</strong> kezdődik. Ha több részt veszünk, utána <strong>szorzunk</strong> is.
            </p>
          </div>
          <TwoStepDiscsSvg />
        </div>
      </TheorySection>

      {/* 2. Pénz */}
      <TheorySection title="2. Mennyibe kerül? – törtrész pénzzel" badge="Munkafüzet II. 68. o., 8–9. feladat" badgeColor="blue">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <PriceBarsSvg />
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A munkafüzet műveletkártyái pontosan megmutatják a két lépést. A radír <strong>300 Ft-nak a 2 harmadába</strong> kerül: <strong>300 : 3 · 2</strong> = 100 · 2 = <strong>200 Ft</strong>.
            </p>
            <TheoryTable
              headers={['4000 Ft-nak…', 'Művelet', 'Ár']}
              rows={[
                ['a 3 negyede', '4000 : 4 · 3', '3000 Ft'],
                ['1 ötöde', '4000 : 5', '800 Ft'],
                ['3 ötöde', '4000 : 5 · 3', '2400 Ft'],
                ['2 tizede', '4000 : 10 · 2', '800 Ft'],
                ['2 nyolcada', '4000 : 8 · 2', '1000 Ft'],
                ['4 nyolcada', '4000 : 8 · 4', '2000 Ft']
              ]}
            />
            <TheoryCallout type="tip" title="Figyeld meg!">
              Az 1 ötöd és a 2 tized ugyanannyi: mindkettő 800 Ft. A 4 nyolcad pedig a fele: 2000 Ft.
            </TheoryCallout>
          </div>
        </div>
      </TheorySection>

      {/* 3. Hosszúság */}
      <TheorySection title="3. Hány centiméter? – törtrész hosszúsággal" badge="Tankönyv 150. o., 14. feladat • MF 69–70. o." badgeColor="orange">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <MeterTapeSvg />
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Hajtsd félbe a mérőszalagot! A hajtásvonal az <strong>50 cm</strong>-nél van: fél méter = 50 cm. Hajtsd még egyszer félbe: 4 egyenlő részt kapsz, egy rész a méter <strong>negyede</strong> = 25 cm.
            </p>
            <TheoryTable
              headers={['Törtrész', 'm → dm → cm → mm']}
              rows={[
                ['1 tized m', '1 dm = 10 cm = 100 mm'],
                ['3 tized m', '3 dm = 30 cm = 300 mm'],
                ['1 ötöd m', '2 dm = 20 cm = 200 mm'],
                ['4 ötöd m', '8 dm = 80 cm = 800 mm'],
                ['3 negyed m', '75 cm = 750 mm'],
                ['4 tized dm', '4 cm = 40 mm']
              ]}
            />
            <p className="text-xs text-slate-500">A 200 cm 1 tizede 20 cm, 1 ötöde 40 cm, 1 negyede 50 cm (MF 69. o., 10. feladat).</p>
          </div>
        </div>
      </TheorySection>

      {/* 4. Idő, tömeg */}
      <TheorySection title="4. Idő és tömeg – pogácsasütés" badge="Tankönyv 151. o., 18. feladat" badgeColor="purple">
        <ClockPartsSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TheoryCard title="Pogácsa készül" badge="TK 151. o." badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>
                Az 1 kg = 1000 g liszt <strong>5 tizedét</strong> használták: 1000 : 10 · 5 = 500 g. Maradt: 1000 − 500 = <strong>500 g</strong>.
              </li>
              <li>
                A 30 dkg vaj <strong>1 harmadát</strong> tették bele: 30 : 3 = <strong>10 dkg = 100 g</strong>.
              </li>
              <li>
                <strong>1 és negyed óra</strong> alatt készült el: 60 perc + 15 perc = <strong>75 perc</strong>.
              </li>
              <li>
                Manó a 24 pogácsa <strong>negyedét</strong> ette meg: 24 : 4 = <strong>6 pogácsa</strong>.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCallout type="info" title="Előbb válts át!">
            Ha a feladat grammot, percet vagy centimétert kérdez, először váltsd át az egészet: 1 kg = 1000 g, 1 óra = 60 perc, 1 m = 100 cm. Utána számold ki a törtrészt!
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 5. Nézzük meg együtt! */}
      <TheorySection title="5. Nézzük meg együtt! – szöveges feladatok több lépésben" badge="Tankönyv 150–151. o. • MF 68. o." badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Papírtányérok" badge="TK 150. o., 13. feladat" badgeColor="teal">
            <div className="space-y-1 text-sm text-slate-700 leading-relaxed">
              <p>Édesanya 24 papírtányért vett. A fiúknak a tányérok felét, a lányoknak a harmadát adta, a többit a felnőtteknek. Hány tányér jutott a felnőtteknek?</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>fiúk: 24 : 2 = <strong>12</strong></li>
                <li>lányok: 24 : 3 = <strong>8</strong></li>
                <li>felnőttek: 24 − 12 − 8 = <strong>4 tányér</strong></li>
              </ul>
            </div>
          </TheoryCard>
          <TheoryCard title="B) Szörp a rokonoknak" badge="TK 151. o., 18. e)" badgeColor="rose">
            <SyrupSvg className="w-full h-auto" />
          </TheoryCard>
          <TheoryCard title="C) Palkó autói" badge="MF 68. o., 7. feladat" badgeColor="amber">
            <CarCollectionSvg className="w-full h-auto mb-2" />
            <p className="text-sm text-slate-700">
              6 + 10 + 15 + 20 = 51 színes autó, ezért <strong>60 − 51 = 9</strong> fehér autója van.
            </p>
          </TheoryCard>
          <TheoryCard title="D) A nomád tábor" badge="MF 83. o., 9. feladat" badgeColor="sky">
            <div className="space-y-1 text-sm text-slate-700 leading-relaxed">
              <p>180 diák: a fele kék sátrakban lakott, a <strong>maradék</strong> gyerekek harmada zöld sátrakban, a többiek jurtában.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>kék sátor: 180 : 2 = <strong>90</strong></li>
                <li>maradék: 180 − 90 = 90; zöld sátor: 90 : 3 = <strong>30</strong></li>
                <li>jurta: 90 − 30 = <strong>60</strong></li>
              </ul>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6. Vigyázz! */}
      <TheorySection title="6. Vigyázz! – osztás vagy szorzás jön előbb?" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="12-nek a 3 negyede"
          wrong="12 : 3 · 4 = 16"
          wrongExplanation="A két számot felcserélted! A 16 több, mint a 12 – pedig a 3 negyed kevesebb, mint az egész."
          correct="12 : 4 · 3 = 9"
          correctExplanation="Negyed részek: 4 egyenlő részre osztunk (: 4). 3 részt veszünk (· 3)."
          tip="Figyelj a „maradék” szóra is: a tábor feladatában a zöld sátrasok a maradék 90 gyerek harmada (30), nem a 180-é (60)!"
        />
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Labor I: Korongosztó" badge="Labor" badgeColor="emerald">
        <p className="text-sm text-slate-700 mb-3">Rakd egyenlő csoportokba a korongokat, aztán színezd ki a kért csoportokat! A gép megmutatja a két lépést.</p>
        <DiscLab />
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Labor II: Törtrész két lépésben" badge="Labor" badgeColor="sky">
        <p className="text-sm text-slate-700 mb-3">Válassz feladatot! Előbb számold ki, mennyi 1 rész, aztán azt, hogy mennyi a kért rész. Írd be a számot, és ellenőrizd!</p>
        <StepLab />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default FractionOfAmountTheory;
