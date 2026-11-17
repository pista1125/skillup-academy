import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox } from '../TheoryTemplate';
import { FoldPaperSvg, EqualOrNotSvg, CakesCutSvg, ManyWaysSvg } from './EqualPartsG3Figures';
import { Pie, Bar, Grid, Txt, equalAngles, equalCuts, unequalAngles, unequalCuts, rnd, PART_NAME, INK, PAPER } from './EqualPartsG3Parts';

const btn = 'px-4 py-2 rounded-xl text-sm font-bold min-h-[48px]';

// ---------------------------------------------------------------------------
// Labor I – Hajtogató
// ---------------------------------------------------------------------------
type Fold = 'v' | 'h';
const TARGETS = [2, 4, 8];
const PW = 200;
const PH = 130;
const X0 = 20;
const Y0 = 20;

// ---------------------------------------------------------------------------
// Labor II – Egyenlő részek?
// ---------------------------------------------------------------------------
type Kind = 'pie' | 'bar' | 'grid';
interface Shape {
  kind: Kind;
  n: number;
  equal: boolean;
  bounds?: number[];
  cuts?: number[];
  rows?: number;
  cols?: number;
}
const NS = [2, 3, 4, 5, 6, 8];
const newShape = (): Shape => {
  const equal = Math.random() < 0.55;
  const kinds: Kind[] = equal ? ['pie', 'bar', 'grid'] : ['pie', 'bar'];
  const kind = kinds[rnd(0, kinds.length - 1)];
  if (kind === 'grid') {
    const [rows, cols] = [
      [2, 2],
      [2, 3],
      [2, 4],
      [1, 3]
    ][rnd(0, 3)];
    return { kind, n: rows * cols, equal, rows, cols };
  }
  const n = equal ? NS[rnd(0, NS.length - 1)] : NS.filter((v) => v <= 5)[rnd(0, 3)];
  if (kind === 'pie') return { kind, n, equal, bounds: equal ? equalAngles(n, rnd(0, 2) * 30) : unequalAngles(n) };
  return { kind, n, equal, cuts: equal ? equalCuts(n) : unequalCuts(n) };
};
const FIRST_SHAPE: Shape = { kind: 'pie', n: 4, equal: false, bounds: [0, 70, 180, 240, 360] };

/** A részek nagysága (összehasonlításhoz) és a címke helye. */
const partInfo = (s: Shape, cx: number, cy: number, r: number, bx: number, by: number, bw: number, bh: number) => {
  if (s.kind === 'pie' && s.bounds) {
    return s.bounds.slice(0, -1).map((a, i) => {
      const mid = ((a + s.bounds![i + 1]) / 2 - 90) * (Math.PI / 180);
      return { size: s.bounds![i + 1] - a, x: cx + r * 0.6 * Math.cos(mid), y: cy + r * 0.6 * Math.sin(mid) };
    });
  }
  if (s.kind === 'bar' && s.cuts) {
    const b = [0, ...s.cuts, 1];
    return b.slice(0, -1).map((p, i) => ({ size: b[i + 1] - p, x: bx + ((p + b[i + 1]) / 2) * bw, y: by + bh / 2 }));
  }
  const rows = s.rows ?? 1;
  const cols = s.cols ?? 1;
  return Array.from({ length: rows * cols }, (_, i) => ({ size: 1, x: bx + ((i % cols) + 0.5) * (bw / cols), y: by + (Math.floor(i / cols) + 0.5) * (bh / rows) }));
};

export const EqualPartsG3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // ----- Labor I -----
  const [target, setTarget] = useState(4);
  const [folds, setFolds] = useState<Fold[]>([]);
  const [open, setOpen] = useState(false);
  const [foldMsg, setFoldMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const v = folds.filter((f) => f === 'v').length;
  const h = folds.length - v;
  const parts = 2 ** folds.length;
  const fold = (f: Fold) => {
    if (open || folds.length >= 3) return;
    setFolds([...folds, f]);
    setFoldMsg(null);
  };
  const restart = () => {
    setFolds([]);
    setOpen(false);
    setFoldMsg(null);
  };
  const newFoldTask = () => {
    let t: number;
    do t = TARGETS[rnd(0, 2)];
    while (t === target);
    setTarget(t);
    restart();
  };
  const answerCount = (k: number) => {
    if (k !== parts) {
      setFoldMsg({ ok: false, text: `Számold meg újra a szaggatott vonalak közötti részeket! ${k > parts ? 'Kevesebb van.' : 'Több van.'}` });
      return;
    }
    if (parts === target) {
      setFoldMsg({ ok: true, text: `Szuper! ${folds.length} hajtás után ${parts} egyenlő rész lett. Mindegyik rész 1 ${PART_NAME[parts]}.` });
    } else if (parts < target) {
      setFoldMsg({ ok: false, text: `Jól számoltál: ${parts} egyenlő rész. De ${target} kell. Kezdd újra, és hajtsd félbe még egyszer!` });
    } else {
      setFoldMsg({ ok: false, text: `Jól számoltál: ${parts} egyenlő rész. De csak ${target} kell. Kezdd újra, és hajts kevesebbszer!` });
    }
  };

  // ----- Labor II -----
  const [shape, setShape] = useState<Shape>(FIRST_SHAPE);
  const [step, setStep] = useState<'eq' | 'count' | 'done'>('eq');
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [counted, setCounted] = useState<number[]>([]);
  const [showBig, setShowBig] = useState(false);
  const info = partInfo(shape, 120, 95, 72, 20, 55, 200, 80);
  const sizes = info.map((p) => p.size);
  const iMax = sizes.indexOf(Math.max(...sizes));
  const iMin = sizes.indexOf(Math.min(...sizes));
  const answerEq = (yes: boolean) => {
    if (step !== 'eq') return;
    if (yes === shape.equal) {
      if (shape.equal) {
        setMsg({ ok: true, text: 'Igen, minden rész ugyanakkora. Most számold meg: hány egyenlő rész?' });
        setStep('count');
      } else {
        setMsg({ ok: true, text: 'Igen! A részek nem egyenlők: a zöld rész sokkal nagyobb, mint a piros. Az ilyen részeknek nem adunk nevet.' });
        setShowBig(true);
        setStep('done');
      }
    } else if (yes) {
      setMsg({ ok: false, text: 'Nézd meg jobban! A zöld rész sokkal nagyobb, mint a piros. Ezek nem egyenlő részek.' });
      setShowBig(true);
      setStep('done');
    } else {
      setMsg({ ok: false, text: 'Nézd meg jobban! Minden rész ugyanakkora, egymásra téve fednék egymást. Ezek egyenlő részek. Hány van?' });
      setStep('count');
    }
  };
  const answerN = (k: number) => {
    if (step !== 'count') return;
    if (k === shape.n) {
      setMsg({ ok: true, text: `Szuper! ${shape.n} egyenlő részre osztottuk. Egy rész neve: 1 ${PART_NAME[shape.n]}.` });
      setStep('done');
    } else setMsg({ ok: false, text: 'Még nem jó. Koppints a részekre, és megszámozzuk őket!' });
  };
  const tapPart = (i: number) => {
    if (step === 'eq' || counted.includes(i)) return;
    setCounted([...counted, i]);
  };
  const newEqTask = () => {
    setShape(newShape());
    setStep('eq');
    setMsg(null);
    setCounted([]);
    setShowBig(false);
  };
  const colored = info.map((_, i) => showBig && (i === iMax || i === iMin));
  const colorOf = (i: number) => (i === iMax ? '#4ade80' : '#f87171');

  return (
    <TheoryTemplate
      topicId="g3-fractions-intro"
      subtopicId="bevezetes"
      grade={3}
      chapterId="tortes-szamok"
      title="1. Egyenlő részekre osztás"
      subtitle="Hajtogatás, tortavágás: egyenlő és nem egyenlő részek."
      badge="3. OSZTÁLY • XIV. ISMERKEDÉS A TÖRTEKKEL • TANANYAG"
      themeColor="amber"
      pdfFilename="3_osztaly_egyenlo_reszekre_osztas_tananyag.pdf"
      practiceTitle="Készen állsz? Gyakoroljunk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — EGYENLŐ RÉSZEK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 text-center text-sm font-black text-amber-900 dark:text-amber-200">
              Egyenlő részek: mind ugyanakkora.
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Félbehajtás: 2 egyenlő rész. Még egyszer: 4.</li>
              <li>Hány egyenlő rész? Számold meg a részeket!</li>
              <li>Minél több a rész, annál kisebb egy rész.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 134. o." badgeColor="amber">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Egy egész tortát szeletekre vágunk. Egy lapot félbehajtunk. Az egészből <strong>részek</strong> lesznek.</p>
          <p>Megtanulod, mikor <strong>egyenlők</strong> a részek. És megszámolod, <strong>hány egyenlő részre</strong> osztottuk az egészet.</p>
        </div>
        <EqualOrNotSvg />
        <TheoryCallout type="info" title="Mikor egyenlők a részek?">
          Ha mindegyik rész <strong>ugyanakkora</strong>. Egymásra téve pontosan fedik egymást.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="2. Hajtogassunk!" badge="papírlap" badgeColor="sky">
        <FoldPaperSvg />
        <div className="space-y-2 text-sm text-slate-700">
          <p>Hajtsd félbe a lapot: <strong>2 egyenlő rész</strong> lesz.</p>
          <p>Hajtsd félbe még egyszer: <strong>4 egyenlő rész</strong>. Harmadszor: <strong>8 egyenlő rész</strong>.</p>
          <p>Minden félbehajtás <strong>kétszer annyi</strong> részt ad.</p>
        </div>
      </TheorySection>

      <TheorySection title="3. A részek neve" badge="1 negyed" badgeColor="emerald">
        <div className="space-y-2 text-sm text-slate-700">
          <p>Az egyenlő részeknek <strong>nevük</strong> van. A név attól függ, hány egyenlő részre osztottuk az egészet:</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
          {[2, 3, 4, 8].map((n) => (
            <div key={n} className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-2">
              <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto" xmlns="http://www.w3.org/2000/svg">
                <Pie cx={50} cy={50} r={42} bounds={equalAngles(n)} colored={[true]} color="#34d399" base="#fde68a" />
              </svg>
              <div className="text-xs text-slate-600">{n} egyenlő rész</div>
              <div className="text-sm font-black text-emerald-800">1 rész: 1 {PART_NAME[n]}</div>
            </div>
          ))}
        </div>
        <TheoryCallout type="tip" title="A ketted másik neve">
          Az 1 ketted a <strong>fél</strong>. „Hajtsd félbe!” = osszd 2 egyenlő részre!
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="4. Többféleképpen is lehet" badge="4 egyenlő rész" badgeColor="violet">
        <ManyWaysSvg />
        <p className="text-sm text-slate-700">Egy négyzetet sokféleképpen oszthatsz 4 egyenlő részre. A részek alakja más, de <strong>mind a 4 rész ugyanakkora</strong>.</p>
      </TheorySection>

      <TheorySection title="5. Több rész – kisebb szelet" badge="Tankönyv 134/2." badgeColor="orange">
        <CakesCutSvg />
        <p className="text-sm text-slate-700">Ugyanakkora tortákat vágtunk fel. Ha 2 részre vágod, nagy a szelet. Ha 8 részre, kicsi. <strong>Minél több egyenlő részre</strong> vágod, <strong>annál kisebb</strong> egy szelet.</p>
      </TheorySection>

      <TheorySection title="6. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) Csokiszelet" badge="vágások" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A csokit 3 helyen törted el.</li>
              <li>Számold a darabokat: 1, 2, 3, 4.</li>
              <li><strong>4 rész</strong> lett, nem 3!</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Pizza" badge="egyenlő?" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A pizza 4 részből áll.</li>
              <li>Az egyik szelet sokkal nagyobb.</li>
              <li>Ez <strong>nem</strong> 4 egyenlő rész.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Hajtogatás" badge="félbe" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>1. hajtás: 2 rész.</li>
              <li>2. hajtás: 4 rész.</li>
              <li>3. hajtás: <strong>8 egyenlő rész</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="7. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="4 rész még nem 4 egyenlő rész!"
          wrong="A tortát 4 részre vágtuk, tehát egy szelet 1 negyed."
          wrongExplanation="Ha a szeletek nem egyformák, egyik sem 1 negyed."
          correct="Csak akkor 1 negyed egy szelet, ha 4 EGYENLŐ részre vágtuk."
          correctExplanation="Először nézd meg: ugyanakkorák a részek?"
          tip="Kérdezd meg magadtól: igazságos lenne így szétosztani?"
        />
        <TheoryCallout type="warning" title="Vágás vagy rész?">
          Egy csíkon 1 vágás 2 részt ad, 2 vágás 3 részt. A <strong>részeket</strong> számold, ne a vágásokat!
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="8. Labor I: Hajtogató" badge="Labor" badgeColor="sky">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="rounded-xl bg-sky-50 border-2 border-sky-200 p-3 text-center text-base font-black text-sky-900">
            Hajtogass {target} egyenlő részt! Utána nyisd ki a lapot.
          </div>
          <svg viewBox="0 0 240 170" className="w-full max-w-[320px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg">
            <rect x={X0} y={Y0} width={PW} height={PH} fill="none" stroke="#e2e8f0" strokeWidth={1.5} strokeDasharray="4 4" />
            {open ? (
              <Grid x={X0} y={Y0} w={PW} h={PH} rows={2 ** h} cols={2 ** v} dashed sw={2.5} />
            ) : (
              <g style={{ transform: `scale(${1 / 2 ** v}, ${1 / 2 ** h})`, transformOrigin: `${X0}px ${Y0}px`, transition: 'transform 0.6s ease' }}>
                <rect x={X0} y={Y0} width={PW} height={PH} fill="#fef9c3" stroke={INK} strokeWidth={2.5} vectorEffect="non-scaling-stroke" />
              </g>
            )}
            <Txt x={120} y={164} s={12} c="#475569">
              {open ? 'kinyitva' : folds.length === 0 ? 'a lap' : `${folds.length}-szer félbehajtva`}
            </Txt>
          </svg>
          {!open && (
            <div className="flex flex-wrap gap-2 justify-center">
              <button onClick={() => fold('v')} disabled={folds.length >= 3} className={`${btn} bg-sky-600 text-white disabled:opacity-40`}>
                Félbe: jobbról balra
              </button>
              <button onClick={() => fold('h')} disabled={folds.length >= 3} className={`${btn} bg-sky-600 text-white disabled:opacity-40`}>
                Félbe: alulról felfelé
              </button>
              <button onClick={() => setOpen(true)} disabled={folds.length === 0} className={`${btn} bg-amber-500 text-white disabled:opacity-40`}>
                Nyisd ki!
              </button>
            </div>
          )}
          {folds.length >= 3 && !open && <p className="text-xs text-center text-slate-500">A lap már nagyon vastag, többször nem lehet félbehajtani. Nyisd ki!</p>}
          {open && (
            <div className="space-y-2">
              <p className="text-sm font-bold text-center text-slate-700">Hány egyenlő rész lett?</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {[2, 3, 4, 6, 8].map((k) => (
                  <button key={k} onClick={() => answerCount(k)} className={`${btn} min-w-[56px] bg-white border-2 border-sky-300 text-sky-900 text-lg`}>
                    {k}
                  </button>
                ))}
              </div>
            </div>
          )}
          {foldMsg && <div className={`rounded-xl p-3 text-center text-sm font-bold ${foldMsg.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>{foldMsg.text}</div>}
          <div className="flex flex-wrap gap-2 justify-center">
            <button onClick={restart} className={`${btn} bg-slate-200 text-slate-700`}>
              Újrakezdem
            </button>
            <button onClick={newFoldTask} className={`${btn} bg-slate-200 text-slate-700`}>
              Új feladat
            </button>
          </div>
        </div>
      </TheorySection>

      <TheorySection title="9. Labor II: Egyenlő részek?" badge="Labor" badgeColor="orange">
        <div className="bg-white border-2 border-orange-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <p className="text-sm text-slate-700 text-center">Nézd meg jól! Egyenlő részekre vágtuk?</p>
          <svg viewBox="0 0 240 190" className="w-full max-w-[300px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg">
            {shape.kind === 'pie' && shape.bounds && (
              <>
                <Pie cx={120} cy={95} r={72} bounds={shape.bounds} base="#fde68a" onPart={tapPart} colored={colored} color="#4ade80" />
                {showBig && <Pie cx={120} cy={95} r={72} bounds={[shape.bounds[iMin], shape.bounds[iMin + 1]]} colored={[true]} color="#f87171" />}
              </>
            )}
            {shape.kind === 'bar' && shape.cuts && (
              <Bar x={20} y={55} w={200} h={80} cuts={shape.cuts} base="#fde68a" onPart={tapPart} colored={colored.map((c, i) => c && i === iMax)} color={colorOf(iMax)} />
            )}
            {shape.kind === 'bar' && shape.cuts && showBig && (
              <rect
                x={20 + [0, ...shape.cuts][iMin] * 200}
                y={55}
                width={sizes[iMin] * 200}
                height={80}
                fill="#f87171"
                stroke={INK}
                strokeWidth={2.5}
              />
            )}
            {shape.kind === 'grid' && <Grid x={20} y={55} w={200} h={80} rows={shape.rows ?? 1} cols={shape.cols ?? 1} onPart={tapPart} />}
            {counted.map((i, k) => (
              <g key={i} pointerEvents="none">
                <circle cx={info[i].x} cy={info[i].y} r={12} fill={PAPER} stroke="#ea580c" strokeWidth={2.5} />
                <Txt x={info[i].x} y={info[i].y + 5} s={14} c="#9a3412">{k + 1}</Txt>
              </g>
            ))}
          </svg>
          {step === 'eq' && (
            <div className="flex flex-wrap gap-2 justify-center">
              <button onClick={() => answerEq(true)} className={`${btn} bg-emerald-600 text-white`}>
                Igen, egyenlők
              </button>
              <button onClick={() => answerEq(false)} className={`${btn} bg-rose-600 text-white`}>
                Nem egyenlők
              </button>
            </div>
          )}
          {step === 'count' && (
            <div className="space-y-2">
              <p className="text-sm font-bold text-center text-slate-700">Hány egyenlő részre osztottuk? (Koppints a részekre, ha számolni szeretnél!)</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {[2, 3, 4, 5, 6, 8].map((k) => (
                  <button key={k} onClick={() => answerN(k)} className={`${btn} min-w-[56px] bg-white border-2 border-orange-300 text-orange-900 text-lg`}>
                    {k}
                  </button>
                ))}
              </div>
            </div>
          )}
          {msg && <div className={`rounded-xl p-3 text-center text-sm font-bold ${msg.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>{msg.text}</div>}
          <div className="flex justify-center">
            <button onClick={newEqTask} className={`${btn} bg-slate-200 text-slate-700`}>
              Új feladat
            </button>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default EqualPartsG3Theory;
