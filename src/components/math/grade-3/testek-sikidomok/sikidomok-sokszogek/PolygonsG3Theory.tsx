import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox } from '../TheoryTemplate';
import { LinesSvg, PlaneShapesSvg, SidesVerticesSvg, PolygonNamesSvg, RectSquareSvg } from './PolygonsG3Figures';
import { SHAPES, ShapeG, POLY_NAME, Pt, straightVertex, selfCrossing, isRect, isSquare, INK, UNK } from './PolygonsG3Parts';

// ---------------------------------------------------------------------------
// Labor I – Rajzolj a pöttyrácson!
// ---------------------------------------------------------------------------
interface Target {
  label: string;
  ok: (p: Pt[]) => boolean;
  hint: (p: Pt[]) => string;
}
const nameOf = (n: number) => POLY_NAME[n] ?? `${n} csúcsú sokszög`;
const byN = (n: number): Target => ({
  label: `Rajzolj ${nameOf(n)}et!`,
  ok: (p) => p.length === n,
  hint: (p) => `Ez ${p.length} csúcsú: ${nameOf(p.length)}. ${n} csúcs kell.`
});
const TARGETS: Target[] = [
  byN(3),
  byN(4),
  byN(5),
  byN(6),
  { label: 'Rajzolj téglalapot!', ok: isRect, hint: (p) => (p.length !== 4 ? `Ennek ${p.length} csúcsa van. A téglalap négyszög.` : 'Ez négyszög, de nem minden sarka olyan, mint a füzetlap sarka.') },
  { label: 'Rajzolj négyzetet!', ok: isSquare, hint: (p) => (isRect(p) ? 'Ez téglalap, de nem egyenlő mind a 4 oldala.' : p.length !== 4 ? `Ennek ${p.length} csúcsa van. A négyzet négyszög.` : 'Ez négyszög, de a sarkai nem olyanok, mint a füzetlap sarka.') },
  { label: 'Rajzolj olyan négyszöget, amelyik nem téglalap!', ok: (p) => p.length === 4 && !isRect(p), hint: (p) => (p.length !== 4 ? `Ennek ${p.length} csúcsa van, 4 kell.` : 'Ez téglalap! Húzd el valamelyik csúcsát.') }
];
const COLS = 7;
const ROWS = 5;
const G = 40;
const OX = 30;
const OY = 26;

// ---------------------------------------------------------------------------
// Labor II – Milyen síkidom ez?
// ---------------------------------------------------------------------------
const POOL = Object.keys(SHAPES);
const CHOICES: { n: number; label: string }[] = [
  { n: 0, label: 'nem sokszög' },
  { n: 3, label: 'háromszög' },
  { n: 4, label: 'négyszög' },
  { n: 5, label: 'ötszög' },
  { n: 6, label: 'hatszög' }
];

const btn = 'px-4 py-2 rounded-xl text-sm font-bold min-h-[48px]';

export const PolygonsG3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [ti, setTi] = useState(1);
  const [pts, setPts] = useState<Pt[]>([]);
  const [closed, setClosed] = useState(false);
  const [drawMsg, setDrawMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [badV, setBadV] = useState(-1);
  const target = TARGETS[ti];
  const evaluate = (p: Pt[]) => {
    const sv = straightVertex(p);
    if (sv >= 0) {
      setBadV(sv);
      setDrawMsg({ ok: false, text: 'A piros pontnál a vonal egyenesen megy tovább. Ott nincs csúcs! Kezdd újra, és kanyarodj el a csúcsoknál.' });
      return;
    }
    if (selfCrossing(p)) {
      setDrawMsg({ ok: false, text: 'A vonalak keresztezik egymást. Kezdd újra úgy, hogy ne keresztezzék!' });
      return;
    }
    if (target.ok(p)) setDrawMsg({ ok: true, text: `Szuper! Ez ${nameOf(p.length)}: ${p.length} oldala és ${p.length} csúcsa van.` });
    else setDrawMsg({ ok: false, text: target.hint(p) });
  };
  const tapDot = (c: number, r: number) => {
    if (closed) return;
    const i = pts.findIndex((p) => p[0] === c && p[1] === r);
    if (i === 0 && pts.length >= 3) {
      setClosed(true);
      evaluate(pts);
      return;
    }
    if (i >= 0) {
      setDrawMsg({ ok: false, text: pts.length >= 3 ? 'Ezt a pontot már használtad. A bezáráshoz koppints a kezdőpontra (zöld)!' : 'Ezt a pontot már használtad.' });
      return;
    }
    setPts([...pts, [c, r]]);
    setDrawMsg(null);
  };
  const clear = () => {
    setPts([]);
    setClosed(false);
    setDrawMsg(null);
    setBadV(-1);
  };
  const undo = () => {
    if (closed) {
      setClosed(false);
      setDrawMsg(null);
      setBadV(-1);
      return;
    }
    setPts(pts.slice(0, -1));
    setDrawMsg(null);
  };
  const newDraw = () => {
    let k: number;
    do k = Math.floor(Math.random() * TARGETS.length);
    while (k === ti);
    setTi(k);
    clear();
  };
  const sp = (p: Pt) => [OX + p[0] * G, OY + p[1] * G];

  // Labor II
  const [cur, setCur] = useState('dart');
  const [answer, setAnswer] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);
  const shape = SHAPES[cur];
  const right = answer !== null && answer === shape.n;
  const choose = (n: number) => {
    if (right) return;
    setAnswer(n);
    setStreak(n === shape.n ? streak + 1 : 0);
  };
  const feedback = (): string => {
    if (answer === null) return '';
    if (right) return shape.n === 0 ? `Igen! ${shape.note ?? 'Görbe vonal is határolja.'} Ezért nem sokszög.` : `Igen! ${shape.n} oldala és ${shape.n} csúcsa van: ${nameOf(shape.n)}. ${shape.note ?? ''}`;
    if (shape.n === 0) return `Nézd meg jobban! ${shape.note ?? ''} A sokszöget csak egyenes vonalak határolják.`;
    if (answer === 0) return 'Ezt csak egyenes vonalak határolják, tehát sokszög. Számold meg a csúcsait!';
    return `Számold meg a piros pöttyöket! Ennek ${shape.n} csúcsa van.`;
  };
  const nextShape = () => {
    let k: string;
    do k = POOL[Math.floor(Math.random() * POOL.length)];
    while (k === cur);
    setCur(k);
    setAnswer(null);
  };

  return (
    <TheoryTemplate
      topicId="g3-shapes-solids"
      subtopicId="sikidomok-sokszogek"
      grade={3}
      chapterId="testek-sikidomok"
      title="3. Síkidomok, sokszögek"
      subtitle="Egyenes és görbe vonalak, sokszögek oldalai és csúcsai, téglalap és négyzet."
      badge="3. OSZTÁLY • X. TESTEK, SÍKIDOMOK • TANANYAG"
      themeColor="emerald"
      pdfFilename="3_osztaly_sikidomok_sokszogek_tananyag.pdf"
      practiceTitle="Készen állsz? Gyakoroljunk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — MI A SOKSZÖG?',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center text-sm font-black text-emerald-900 dark:text-emerald-200">
              Sokszög: csak egyenes vonalak (szakaszok) határolják.
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Ahány oldal, annyi csúcs.</li>
              <li>3 → háromszög, 4 → négyszög, 5 → ötszög, 6 → hatszög.</li>
              <li>Minden négyzet téglalap. A kör nem sokszög.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 104–105. o." badgeColor="emerald">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>A test kézbe vehető. A <strong>síkidom</strong> lapos, mint egy papírból kivágott forma.</p>
          <p>A síkidomot <strong>vonalak</strong> határolják. A vonal lehet <strong>egyenes</strong> vagy <strong>görbe</strong>.</p>
        </div>
        <LinesSvg />
      </TheorySection>

      <TheorySection title="2. Síkidomok és sokszögek" badge="csak egyenes" badgeColor="sky">
        <PlaneShapesSvg />
        <div className="space-y-2 text-sm text-slate-700">
          <p>Azokat a síkidomokat, amelyeket <strong>csak egyenes vonalak (szakaszok)</strong> határolnak, <strong>sokszögeknek</strong> nevezzük.</p>
          <p>A kör, a hold, a kiflis forma nem sokszög: görbe vonal is határolja.</p>
        </div>
      </TheorySection>

      <TheorySection title="3. Oldalak és csúcsok" badge="számold meg!" badgeColor="amber">
        <SidesVerticesSvg />
        <div className="space-y-2 text-sm text-slate-700">
          <p>A sokszöget határoló egyenes vonalak az <strong>oldalai</strong>. Ahol két oldal összeér, ott van egy <strong>csúcs</strong>.</p>
          <p>Minden sokszögnek <strong>ugyanannyi oldala van, mint csúcsa</strong>.</p>
        </div>
        <PolygonNamesSvg />
        <TheoryCallout type="info" title="A név a számból jön">
          3 csúcs: <strong>háromszög</strong>. 4 csúcs: <strong>négyszög</strong>. 5 csúcs: <strong>ötszög</strong>. 6 csúcs: <strong>hatszög</strong>.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="4. Téglalap és négyzet" badge="négyszögek" badgeColor="rose">
        <RectSquareSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Téglalap" badge="4 oldal" badgeColor="sky">
            <p className="text-sm text-slate-700">Olyan négyszög, aminek minden sarka olyan, mint a füzetlap sarka. A szemben lévő oldalai egyenlő hosszúak.</p>
          </TheoryCard>
          <TheoryCard title="Négyzet" badge="4 egyenlő oldal" badgeColor="emerald">
            <p className="text-sm text-slate-700">Olyan téglalap, aminek mind a 4 oldala egyenlő hosszú. Ezért <strong>minden négyzet téglalap</strong>.</p>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="5. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) Sokszög?" badge="vonalak" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Egy ajtó alakú forma: alul és oldalt egyenes.</li>
              <li>A teteje íves, görbe.</li>
              <li>Tehát <strong>nem sokszög</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Házikó" badge="csúcsok" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Tető: 3 csúcs (bal, fönt, jobb).</li>
              <li>Alul még 2 csúcs.</li>
              <li>3 + 2 = 5: <strong>ötszög</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Pálcikák" badge="maradék" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>14 pálcikából külön háromszögeket raksz.</li>
              <li>Egyhez 3 pálcika kell.</li>
              <li>14 : 3 = 4, marad 2. <strong>4 háromszög</strong>, 2 pálcika marad.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="6. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A befelé mutató sarok is csúcs!"
          wrong="A nyílhegy alakú négyszögnek 3 csúcsa van."
          wrongExplanation="A befelé mutató sarkot kihagytad."
          correct="A nyílhegynek 4 csúcsa és 4 oldala van: négyszög."
          correctExplanation="Menj körbe az ujjaddal, és számold, hányszor kanyarodsz!"
          tip="Tegyél pöttyöt minden csúcsra, aztán számold meg a pöttyöket!"
        />
        <TheoryCallout type="warning" title="Nem minden négyszög téglalap">
          A téglalapnak minden sarka olyan, mint a füzetlap sarka. Egy ferde négyszög ettől még négyszög, de nem téglalap.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="7. Labor I: Rajzolj a pöttyrácson!" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-emerald-100 border-2 border-emerald-400 text-emerald-900 font-black text-lg">{target.label}</span>
            <p className="text-sm text-slate-600 mt-2">Koppints a pöttyökre sorban! A végén koppints újra a kezdő (zöld) pöttyre.</p>
          </div>
          <svg viewBox="0 0 300 210" className="w-full max-w-md h-auto mx-auto touch-manipulation" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="298" height="208" rx="12" fill="#f8fafc" stroke="#e2e8f0" />
            {closed && <polygon points={pts.map((p) => sp(p).join(',')).join(' ')} fill={drawMsg?.ok ? '#bbf7d0' : '#fde68a'} opacity="0.8" />}
            {pts.map((p, i) => {
              if (i === pts.length - 1 && !closed) return null;
              const a = sp(p);
              const b = sp(pts[(i + 1) % pts.length]);
              return <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={INK} strokeWidth="4" strokeLinecap="round" />;
            })}
            {Array.from({ length: ROWS }, (_, r) =>
              Array.from({ length: COLS }, (_, c) => {
                const i = pts.findIndex((p) => p[0] === c && p[1] === r);
                const first = i === 0;
                const bad = closed && i === badV && i >= 0;
                return (
                  <g key={`${r}-${c}`} onClick={() => tapDot(c, r)} style={{ cursor: 'pointer' }}>
                    <circle cx={OX + c * G} cy={OY + r * G} r="16" fill="transparent" />
                    <circle cx={OX + c * G} cy={OY + r * G} r={i >= 0 ? 7 : 4.5} fill={bad ? UNK : first ? '#16a34a' : i >= 0 ? INK : '#94a3b8'} />
                  </g>
                );
              })
            )}
          </svg>
          <div className="flex flex-wrap gap-2 justify-center">
            <button onClick={undo} className={`${btn} bg-white border-2 border-slate-300 text-slate-700`}>
              Visszavonás
            </button>
            <button onClick={clear} className={`${btn} bg-white border-2 border-slate-300 text-slate-700`}>
              Törlés
            </button>
            <button onClick={newDraw} className={`${btn} bg-slate-200 text-slate-700`}>
              Új feladat
            </button>
          </div>
          {drawMsg && <div className={`rounded-xl p-3 text-center text-sm font-bold ${drawMsg.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>{drawMsg.text}</div>}
        </div>
      </TheorySection>

      <TheorySection title="8. Labor II: Milyen síkidom ez?" badge="Labor" badgeColor="sky">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <svg viewBox="0 0 200 170" className="w-full max-w-[240px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="198" height="168" rx="12" fill="#f8fafc" stroke="#e2e8f0" />
            <ShapeG shape={shape} x={30} y={15} s={140} fill="#e0f2fe" sw={3} dots={answer !== null && !right && shape.n > 0} />
          </svg>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {CHOICES.map((ch) => {
              const picked = answer === ch.n;
              const cls = picked ? (ch.n === shape.n ? 'bg-emerald-500 text-white border-emerald-700' : 'bg-rose-100 text-rose-800 border-rose-400') : 'bg-white text-slate-800 border-slate-300 hover:bg-sky-50';
              return (
                <button key={ch.n} onClick={() => choose(ch.n)} className={`${btn} border-2 ${cls}`}>
                  {ch.label}
                </button>
              );
            })}
          </div>
          {answer !== null && <div className={`rounded-xl p-3 text-center text-sm font-bold ${right ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>{feedback()}</div>}
          <div className="flex items-center justify-center gap-4">
            <span className="text-sm font-bold text-sky-900">Hibátlan sorozat: {streak}</span>
            <button onClick={nextShape} className={`${btn} bg-slate-200 text-slate-700`}>
              Új feladat
            </button>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default PolygonsG3Theory;
