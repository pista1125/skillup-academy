import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import {
  PizzaSlicesCompareSvg,
  QuarterBarsSvg,
  FractionWallSvg,
  EqualHalvesSvg,
  KmTrackSvg,
  JumpContestSvg,
  BarG,
  FlagG,
  TRACK_FLAGS,

  fw,
  vel,
  compareFractions
} from './FractionCompare4Figures';

// ---------------------------------------------------------------------------
// Labor I – Csíkmérleg: rakd ki a két törtet, és tedd ki a jelet!
// ---------------------------------------------------------------------------
type Rel = '<' | '=' | '>';
export const STRIP_TASKS: { a: [number, number]; b: [number, number] }[] = [
  { a: [1, 3], b: [1, 4] },
  { a: [3, 4], b: [2, 4] },
  { a: [1, 6], b: [1, 2] },
  { a: [2, 4], b: [1, 2] },
  { a: [2, 5], b: [4, 10] },
  { a: [2, 3], b: [2, 5] },
  { a: [3, 8], b: [2, 4] },
  { a: [3, 3], b: [4, 4] }
];
const STRIP_PARTS = [2, 3, 4, 5, 6, 8, 10];

const StripBuilder: React.FC<{
  label: string;
  parts: number;
  filled: number;
  color: string;
  onParts: (p: number) => void;
  onFilled: (f: number) => void;
}> = ({ label, parts, filled, color, onParts, onFilled }) => (
  <div className="space-y-2">
    <div className="text-sm font-bold text-slate-700">{label}</div>
    <div className="flex flex-wrap gap-1.5">
      {STRIP_PARTS.map((p) => (
        <button
          key={p}
          onClick={() => {
            onParts(p);
            onFilled(Math.min(filled, p));
          }}
          className={`h-10 min-w-[44px] px-2 rounded-lg text-sm font-black border-2 ${p === parts ? 'bg-amber-500 text-white border-amber-600' : 'bg-white text-slate-700 border-slate-200 hover:bg-amber-50'}`}
        >
          {p}
        </button>
      ))}
    </div>
    <div className="flex items-center gap-2">
      <button onClick={() => onFilled(Math.max(0, filled - 1))} className="h-11 w-11 rounded-xl bg-slate-100 border-2 border-slate-200 text-xl font-black">
        −
      </button>
      <svg viewBox="0 0 300 36" className="flex-1 h-auto">
        <BarG x={2} y={4} w={296} h={28} parts={parts} filled={filled} color={color} />
      </svg>
      <button onClick={() => onFilled(Math.min(parts, filled + 1))} className="h-11 w-11 rounded-xl bg-slate-100 border-2 border-slate-200 text-xl font-black">
        +
      </button>
    </div>
    <div className="text-center text-lg font-black" style={{ color }}>
      {filled === 0 ? '0 rész' : filled === parts ? `${fw(filled, parts)} = 1 egész` : fw(filled, parts)}
    </div>
  </div>
);

const StripCompareLab: React.FC = () => {
  const [ti, setTi] = useState(0);
  const [pa, setPa] = useState(4);
  const [fa, setFa] = useState(0);
  const [pb, setPb] = useState(4);
  const [fb, setFb] = useState(0);
  const [done, setDone] = useState<number[]>([]);
  const [msg, setMsg] = useState<{ ok: boolean; t: string } | null>(null);
  const task = STRIP_TASKS[ti];
  const [an, ad] = task.a;
  const [bn, bd] = task.b;

  const choose = (rel: Rel) => {
    if (pa !== ad || fa !== an) {
      setMsg({ ok: false, t: `Előbb rakd ki a felső csíkon a(z) ${fw(an, ad)} részt: ${ad} egyenlő rész, ebből ${an} színes.` });
      return;
    }
    if (pb !== bd || fb !== bn) {
      setMsg({ ok: false, t: `Most rakd ki az alsó csíkon a(z) ${fw(bn, bd)} részt: ${bd} egyenlő rész, ebből ${bn} színes.` });
      return;
    }
    const right = compareFractions(an, ad, bn, bd);
    if (rel === right) {
      setMsg({ ok: true, t: `Ügyes! ${fw(an, ad)} ${right} ${fw(bn, bd)}. Nézd meg a két csíkot: ${right === '=' ? 'pontosan ugyanakkora rész színes.' : right === '>' ? 'a felső csíkon nagyobb rész színes.' : 'az alsó csíkon nagyobb rész színes.'}` });
      if (!done.includes(ti)) setDone([...done, ti]);
    } else {
      setMsg({ ok: false, t: 'Nem ez a jó jel. Hasonlítsd össze, meddig ér a színes rész a két csíkon!' });
    }
  };

  const pick = (i: number) => {
    setTi(i);
    setFa(0);
    setFb(0);
    setMsg(null);
  };

  return (
    <div className="bg-white border-2 border-amber-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap gap-2">
        {STRIP_TASKS.map((t, i) => (
          <button
            key={i}
            onClick={() => pick(i)}
            className={`h-11 px-3 rounded-xl text-sm font-black border-2 ${i === ti ? 'bg-amber-500 text-white border-amber-600' : done.includes(i) ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-slate-100 text-slate-700 border-slate-200'}`}
          >
            {i + 1}. {done.includes(i) ? '✓' : ''}
          </button>
        ))}
      </div>
      <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-center text-lg font-black text-slate-800">
        Hasonlítsd össze: {fw(an, ad)} ☐ {fw(bn, bd)}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <StripBuilder label="Felső csík: hány egyenlő részre vágod?" parts={pa} filled={fa} color="#f97316" onParts={setPa} onFilled={(f) => { setFa(f); setMsg(null); }} />
        <StripBuilder label="Alsó csík: hány egyenlő részre vágod?" parts={pb} filled={fb} color="#2563eb" onParts={setPb} onFilled={(f) => { setFb(f); setMsg(null); }} />
      </div>
      <div className="text-sm font-bold text-slate-600 text-center">Melyik jel illik a két tört közé?</div>
      <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
        {(['<', '=', '>'] as Rel[]).map((r) => (
          <button key={r} onClick={() => choose(r)} className="h-14 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-3xl font-black">
            {r}
          </button>
        ))}
      </div>
      {msg && (
        <div className={`rounded-xl p-3 text-sm font-bold ${msg.ok ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'}`}>{msg.t}</div>
      )}
      <p className="text-xs text-slate-500 italic text-center">Mindkét csík 1 egész. Kész feladatok: {done.length} / {STRIP_TASKS.length}</p>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Labor II – Zászlók a versenypályán (MF II/70, 15. feladat)
// ---------------------------------------------------------------------------
export const flagMeters = (n: number, d: number): number => (1000 / d) * n;

const TrackFlagsLab: React.FC = () => {
  const [placed, setPlaced] = useState<number[]>([]);
  const [msg, setMsg] = useState<{ ok: boolean; t: string } | null>(null);
  const current = TRACK_FLAGS.findIndex((_, i) => !placed.includes(i));
  const x0 = 30;
  const x1 = 490;
  const y = 120;
  const X = (m: number) => x0 + ((x1 - x0) * m) / 1000;

  const tap = (m: number) => {
    if (current < 0) return;
    const f = TRACK_FLAGS[current];
    if (m === f.m) {
      setPlaced([...placed, current]);
      setMsg({ ok: true, t: `Talált! 1 km = 1000 m. 1000 : ${f.d} = ${1000 / f.d}, ${f.n === 1 ? '' : `${1000 / f.d} · ${f.n} = ${f.m}, `}tehát ${fw(f.n, f.d)} km = ${f.m} m.` });
    } else {
      setMsg({ ok: false, t: `Ez ${m} m. Számold ki: 1 km = 1000 m, ennek ${fw(f.n, f.d)} része: előbb oszd el ${vel(f.d)}${f.n > 1 ? `, aztán szorozd meg ${vel(f.n)}` : ""}!` });
    }
  };

  const reset = () => {
    setPlaced([]);
    setMsg(null);
  };
  const sorted = [...placed].sort((a, b) => TRACK_FLAGS[a].m - TRACK_FLAGS[b].m);

  return (
    <div className="bg-white border-2 border-yellow-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="rounded-xl bg-yellow-50 border border-yellow-200 p-3 text-center font-black text-slate-800">
        {current >= 0 ? (
          <>
            Tűzd ki a zászlót: <span className="text-xl" style={{ color: TRACK_FLAGS[current].color }}>{fw(TRACK_FLAGS[current].n, TRACK_FLAGS[current].d)} km</span> – koppints a pálya megfelelő pontjára!
          </>
        ) : (
          'Minden zászló a helyén van! 🎉'
        )}
      </div>
      <svg viewBox="0 0 520 170" className="w-full h-auto select-none bg-lime-50 rounded-xl border border-lime-200">
        <line x1={x0} y1={y} x2={x1 + 14} y2={y} stroke="#334155" strokeWidth={2.5} />
        {[0, 200, 400, 600, 800].map((m) => (
          <text key={m} x={X(m)} y={y + 26} fontSize="12" textAnchor="middle" fill="#334155">
            {m} m
          </text>
        ))}
        <text x={X(1000)} y={y + 26} fontSize="12" fontWeight="bold" textAnchor="middle" fill="#334155">
          1 km
        </text>
        {placed.map((i, k) => (
          <FlagG key={i} x={X(TRACK_FLAGS[i].m)} y={y - 8} color={TRACK_FLAGS[i].color} label={fw(TRACK_FLAGS[i].n, TRACK_FLAGS[i].d)} labelY={k % 2 === 0 ? y - 46 : y - 62} />
        ))}
        {Array.from({ length: 21 }, (_, i) => {
          const m = i * 50;
          return (
            <g key={m} onClick={() => tap(m)} style={{ cursor: 'pointer' }}>
              <rect x={X(m) - 10} y={y - 14} width={20} height={28} fill="transparent" />
              <line x1={X(m)} y1={y - (i % 2 === 0 ? 8 : 5)} x2={X(m)} y2={y + (i % 2 === 0 ? 8 : 5)} stroke="#334155" strokeWidth={i % 10 === 0 ? 2.5 : 1.5} />
              <circle cx={X(m)} cy={y} r={4} fill="#facc15" stroke="#a16207" />
            </g>
          );
        })}
      </svg>
      <p className="text-xs text-slate-500 text-center">A pálya 1 km = 1000 m. Két beosztás között 50 m van, a sárga pöttyökre koppinthatsz.</p>
      {msg && (
        <div className={`rounded-xl p-3 text-sm font-bold ${msg.ok ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'}`}>{msg.t}</div>
      )}
      {placed.length > 0 && (
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-sm text-slate-700">
          <span className="font-bold">A RAJT-tól a CÉL felé haladva: </span>
          {sorted.map((i, k) => (
            <span key={i} className="font-black">
              {k > 0 ? ' < ' : ''}
              {fw(TRACK_FLAGS[i].n, TRACK_FLAGS[i].d)} km
            </span>
          ))}
        </div>
      )}
      <button onClick={reset} className="h-11 px-4 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold">
        Újrakezdem
      </button>
    </div>
  );
};

// ---------------------------------------------------------------------------
export const FractionCompare4Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  return (
    <TheoryTemplate
      grade={4}
      chapterId="tortszamok"
      topicId="g4-fractions"
      subtopicId="tortek-osszehasonlitasa"
      title="4. Törtek összehasonlítása"
      subtitle="Melyik a nagyobb: 1 harmad vagy 1 negyed? Melyik zászló van közelebb a célhoz? Törtek összehasonlítása csíkkal, pizzával és pályán."
      badge="4. OSZTÁLY • VIII. A TÖRTSZÁMOK • TANANYAG"
      themeColor="amber"
      pdfFilename="4_osztaly_tortek_osszehasonlitasa_tananyag.pdf"
      practiceTitle="Készen állsz a törtek összehasonlítására?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — MELYIK A NAGYOBB?',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 text-center">
              <span className="font-mono text-base font-black text-amber-900 dark:text-amber-200">
                1 ketted &gt; 1 harmad &gt; 1 negyed • 1 negyed &lt; 2 negyed &lt; 3 negyed
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Ugyanolyan részek</strong> (pl. negyedek): az a több, amelyikből <strong>több részt</strong> veszünk.
              </li>
              <li>
                <strong>Ugyanannyi rész</strong> (pl. 1-1 szelet): <strong>minél több részre</strong> vágjuk az egészet, <strong>annál kisebb</strong> egy rész.
              </li>
              <li>Csak ugyanakkora egészek részeit hasonlítsd össze! 1 ketted = 2 negyed = 4 nyolcad = 5 tized.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="Munkafüzet II. 66. o., 1. feladat" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Öt egyforma pizzát vágtunk fel: felekre, harmad, negyed, ötöd és hatod részekre. Mindegyik tányérra <strong>1 szelet</strong> került. Melyik szelet a legnagyobb?
            </p>
            <p>
              Ha a pizzát <strong>több részre</strong> vágjuk, egy-egy szelet <strong>kisebb</strong> lesz. Ezért:
            </p>
            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-center font-mono font-bold text-amber-900">
              1 ketted &gt; 1 harmad &gt; 1 negyed &gt; 1 ötöd &gt; 1 hatod
            </div>
            <p>
              Ebben a leckében megtanulod, hogyan döntsd el két törtről, melyik a nagyobb, mikor egyenlők, és hogyan tedd őket <strong>sorba</strong>.
            </p>
          </div>
          <PizzaSlicesCompareSvg />
        </div>
      </TheorySection>

      {/* 2. Ugyanolyan részek */}
      <TheorySection title="2. Ugyanolyan részek: melyikből van több?" badge="Tankönyv 149. o., 5. feladat" badgeColor="blue">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <QuarterBarsSvg />
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A bordó rúd alá pontosan <strong>4 rózsaszín rúd</strong> fér. Egy rózsaszín rúd a bordó <strong>1 negyede</strong>, kettő a <strong>2 negyede</strong>, három a <strong>3 negyede</strong>.
            </p>
            <p>Ha ugyanolyan részeket hasonlítunk össze, csak meg kell számolni őket:</p>
            <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 text-center font-mono font-bold text-blue-900">
              1 negyed &lt; 2 negyed &lt; 3 negyed &lt; 4 negyed = 1 egész
            </div>
            <TheoryCallout type="tip" title="Így is mondhatod">
              Kitti a csokitábla 2 hatodát, Mona a 4 hatodát ette meg. A hatodok egyformák, Mona 4 darabot evett, Kitti csak 2-t: <strong>4 hatod &gt; 2 hatod</strong>.
            </TheoryCallout>
          </div>
        </div>
      </TheorySection>

      {/* 3. Ugyanannyi rész */}
      <TheorySection title="3. Ugyanannyi rész: melyik rész nagyobb?" badge="Törtfal" badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A törtfal minden csíkja ugyanolyan hosszú: mindegyik <strong>1 egész</strong>. Lefelé haladva egyre több részre vágtuk őket, ezért a részek egyre <strong>kisebbek</strong>.
            </p>
            <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-center font-mono font-bold text-emerald-900">
              1 harmad &gt; 1 negyed &nbsp;&nbsp;•&nbsp;&nbsp; 1 hatod &lt; 1 ötöd
            </div>
            <p>
              Ez akkor is igaz, ha <strong>ugyanannyi</strong> részt veszünk: 2 harmad &gt; 2 negyed &gt; 2 ötöd, mert egy harmad nagyobb, mint egy negyed.
            </p>
            <TheoryTable
              headers={['Egész pizza: 2400 Ft', '1 szelet ára', '2 szelet ára']}
              rows={[
                ['ketted (fél)', '1200 Ft', '2400 Ft'],
                ['harmad', '800 Ft', '1600 Ft'],
                ['negyed', '600 Ft', '1200 Ft'],
                ['ötöd', '480 Ft', '960 Ft'],
                ['hatod', '400 Ft', '800 Ft']
              ]}
            />
            <p className="text-xs text-slate-500">Munkafüzet II. 66. o., 1. c) és d): a nagyobb szelet drágább.</p>
          </div>
          <FractionWallSvg />
        </div>
      </TheorySection>

      {/* 4. Egyenlő törtek */}
      <TheorySection title="4. Más néven ugyanannyi" badge="Munkafüzet II. 83. o., 8. feladat" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <EqualHalvesSvg />
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Színezd ki a kör <strong>1 kettedét</strong>, egy másik kör <strong>4 nyolcadát</strong>, egy harmadik kör <strong>2 negyedét</strong>! Mit tapasztalsz? Mindhárom körnek pontosan a <strong>fele</strong> színes.
            </p>
            <div className="bg-teal-50 p-3 rounded-xl border border-teal-200 text-center font-mono font-bold text-teal-900">
              fél = 1 ketted = 2 negyed = 4 nyolcad = 5 tized
            </div>
            <TheoryCard title="Az 1 egész más nevei" badge="Tankönyv 147. o." badgeColor="teal">
              <p className="text-sm text-slate-700 leading-relaxed">
                A francia zászló 3 harmadból áll, ez egy egész. Ugyanígy: <strong>2 ketted = 3 harmad = 4 negyed = 10 tized = 1 egész</strong>.
              </p>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 5. Nézzük meg együtt! */}
      <TheorySection title="5. Nézzük meg együtt! – összehasonlítás számolással" badge="Munkafüzet II. 69. o. • Tankönyv 151. o." badgeColor="purple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Ki ugrott a legnagyobbat?" badge="MF 69. o., 11. feladat" badgeColor="purple">
            <JumpContestSvg className="w-full h-auto mb-3" />
            <div className="space-y-1 text-sm text-slate-700 leading-relaxed">
              <p>A pálya 2 méter = 200 cm. Számold ki, ki hány centimétert ugrott!</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>mókus, 3 negyed: 200 : 4 = 50, 50 · 3 = <strong>150 cm</strong></li>
                <li>béka, 4 tized: 200 : 10 = 20, 20 · 4 = <strong>80 cm</strong></li>
                <li>nyúl, 4 ötöd: 200 : 5 = 40, 40 · 4 = <strong>160 cm</strong></li>
              </ul>
              <p>
                A győztes a <strong>nyúl</strong> (160 cm), az utolsó a <strong>béka</strong> (80 cm). Tehát 4 ötöd &gt; 3 negyed &gt; 4 tized.
              </p>
            </div>
          </TheoryCard>
          <TheoryCard title="B) Ki jár közelebb a célhoz?" badge="TK 151. o., 17. b) feladat" badgeColor="sky">
            <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
              <p>
                Zoliék és Laciék egy Budapesttől <strong>1000 km</strong>-re lévő városba utaznak (684 km + 316 km = 1000 km). Zoliék az út <strong>2 negyed</strong> részét, Laciék a <strong>4 tized</strong> részét tették meg.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Zoliék: 1000 : 4 = 250, 250 · 2 = <strong>500 km</strong> – még 1000 − 500 = <strong>500 km</strong></li>
                <li>Laciék: 1000 : 10 = 100, 100 · 4 = <strong>400 km</strong> – még 1000 − 400 = <strong>600 km</strong></li>
              </ul>
              <p>
                <strong>Zoliék járnak közelebb</strong> az úti célhoz, mert 2 negyed &gt; 4 tized. (A 2 negyed éppen az út fele!)
              </p>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6. Pálya */}
      <TheorySection title="6. Törtek a versenypályán" badge="Munkafüzet II. 70. o., 15. feladat" badgeColor="amber">
        <KmTrackSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TheoryCard title="Hányadik méternél van a zászló?" badge="1 km = 1000 m" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>1 tized km = 100 m • 3 tized km = 300 m</li>
              <li>1 ötöd km = 200 m • 3 ötöd km = 600 m • 4 ötöd km = 800 m</li>
              <li>1 negyed km = 250 m • 3 negyed km = 750 m</li>
            </ul>
          </TheoryCard>
          <TheoryCallout type="info" title="Sorba rendezés">
            A pályán balról jobbra haladva a törtek egyre nagyobbak: 1 tized &lt; 1 ötöd &lt; 1 negyed &lt; 3 tized &lt; 3 ötöd &lt; 3 negyed &lt; 4 ötöd. Amelyik zászló közelebb van a CÉL-hoz, az a nagyobb tört.
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 7. Vigyázz! */}
      <TheorySection title="7. Vigyázz! – a nagyobb szám nem mindig nagyobb részt jelent" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="1 hatod vagy 1 harmad?"
          wrong="1 hatod > 1 harmad, mert a 6 nagyobb, mint a 3."
          wrongExplanation="A 6 azt mutatja meg, hogy 6 egyenlő részre vágtuk az egészet. Több részre vágva egy szelet kisebb lesz!"
          correct="1 hatod < 1 harmad"
          correctExplanation="Egy harmad szelet pont akkora, mint két hatod szelet. Nézd meg a törtfalon!"
          tip="Csak ugyanakkora egészek részeit hasonlítsd össze: egy kis pizza fele lehet kisebb, mint egy óriáspizza negyede."
        />
      </TheorySection>

      {/* 8. Labor I */}
      <TheorySection title="8. Labor I: Csíkmérleg" badge="Labor" badgeColor="amber">
        <p className="text-sm text-slate-700 mb-3">
          Válassz feladatot! Vágd fel mindkét csíkot a megfelelő számú egyenlő részre, színezd ki a kért részeket a + gombbal, végül válaszd ki a jelet: &lt;, = vagy &gt;.
        </p>
        <StripCompareLab />
      </TheorySection>

      {/* 9. Labor II */}
      <TheorySection title="9. Labor II: Zászlók a versenypályán" badge="Labor" badgeColor="orange">
        <p className="text-sm text-slate-700 mb-3">
          A lovas vágtán zászlók jelzik az akadályokat. Számold ki, hányadik méternél van a zászló, és koppints oda! A végén sorba rendezve látod az összes zászlót.
        </p>
        <TrackFlagsLab />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default FractionCompare4Theory;



