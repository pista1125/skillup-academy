import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox } from '../TheoryTemplate';
import { RectOppositeSvg, RectUnfoldSvg, SquarePerimeterSvg, SamePerimeterSvg, PoolSvg } from './RectPerimeterG3Figures';
import { FONT, RectShape, GridRect, RectMarks } from './RectPerimeterG3Parts';

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

// ---------------------------------------------------------------------------
// Labor I – téglalap építése adott kerülettel a négyzetrácson
// ---------------------------------------------------------------------------
const GW = 12;
const GH = 7;
const makeTarget = () => 2 * (rnd(2, 9) + rnd(1, 5));

// ---------------------------------------------------------------------------
// Labor II – szegély, kerítés: valós téglalapok és négyzetek
// ---------------------------------------------------------------------------
interface Thing { name: string; unit: string; a: [number, number]; b: [number, number]; square?: boolean; fill: string }
const THINGS: Thing[] = [
  { name: 'kert', unit: 'm', a: [12, 60], b: [5, 40], fill: '#d9f99d' },
  { name: 'medence', unit: 'm', a: [10, 50], b: [5, 25], fill: '#bae6fd' },
  { name: 'képkeret', unit: 'cm', a: [20, 90], b: [10, 60], fill: '#fde68a' },
  { name: 'asztallap', unit: 'dm', a: [8, 20], b: [5, 12], fill: '#fed7aa' },
  { name: 'sportpálya', unit: 'm', a: [60, 120], b: [30, 80], fill: '#bbf7d0' },
  { name: 'négyzet alakú virágágyás', unit: 'cm', a: [60, 240], b: [0, 0], square: true, fill: '#fbcfe8' },
  { name: 'négyzet alakú homokozó', unit: 'dm', a: [15, 40], b: [0, 0], square: true, fill: '#fef08a' }
];
interface Task { t: Thing; a: number; b: number }
const makeTask = (): Task => {
  const t = THINGS[rnd(0, THINGS.length - 1)];
  const a = rnd(t.a[0], t.a[1]);
  if (t.square) return { t, a, b: a };
  let b = rnd(t.b[0], t.b[1]);
  if (b >= a) b = Math.max(t.b[0], a - rnd(2, 6));
  return { t, a, b };
};

export const RectPerimeterG3Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [target, setTarget] = useState(16);
  const [w, setW] = useState(3);
  const [h, setH] = useState(2);
  const [msg1, setMsg1] = useState<{ ok: boolean; text: string } | null>(null);
  const [found, setFound] = useState<string[]>([]);
  const P = 2 * (w + h);
  const check1 = () => {
    const sum = `${w} + ${h} + ${w} + ${h} = ${P}`;
    if (P === target) {
      const key = [Math.max(w, h), Math.min(w, h)].join('×');
      const nf = found.includes(key) ? found : [...found, key];
      setFound(nf);
      setMsg1({ ok: true, text: `Ügyes vagy! ${sum} egység. Van más megoldás is? Próbáld ki!` });
    } else if (w + h === target) {
      setMsg1({ ok: false, text: `Csak két oldalt adtál össze! A szemben lévő oldalak is kellenek: ${sum}.` });
    } else if (P < target) {
      setMsg1({ ok: false, text: `Most: ${sum} egység. Ez kevesebb, mint ${target}. Legyen nagyobb a téglalap!` });
    } else {
      setMsg1({ ok: false, text: `Most: ${sum} egység. Ez több, mint ${target}. Legyen kisebb a téglalap!` });
    }
  };
  const newTarget = () => {
    let t = makeTarget();
    while (t === target) t = makeTarget();
    setTarget(t);
    setFound([]);
    setMsg1(null);
  };
  const S = 26;

  // Labor II
  const [task, setTask] = useState<Task>({ t: THINGS[0], a: 24, b: 15 });
  const [ans, setAns] = useState('');
  const [msg2, setMsg2] = useState<{ ok: boolean; text: string } | null>(null);
  const goal = 2 * (task.a + task.b);
  const u = task.t.unit;
  const check2 = () => {
    const v = parseInt(ans, 10);
    const { a, b } = task;
    const steps = `${a} + ${b} + ${a} + ${b} = ${goal} ${u}`;
    if (Number.isNaN(v)) return setMsg2({ ok: false, text: 'Írj be egy számot!' });
    if (v === goal) return setMsg2({ ok: true, text: `Szuper! ${steps}.` });
    if (v === a + b) return setMsg2({ ok: false, text: `Ez csak két oldal! A szemben lévő oldalak is ugyanilyen hosszúak.` });
    if (v === 2 * a + b || v === a + 2 * b) return setMsg2({ ok: false, text: `Kihagytál egy oldalt. A téglalapnak 4 oldala van!` });
    if (!task.t.square && (v === 4 * a || v === 4 * b)) return setMsg2({ ok: false, text: `Ez nem négyzet! Két oldala ${a} ${u}, két oldala ${b} ${u}.` });
    return setMsg2({ ok: false, text: `Nem ennyi. Írd fel mind a 4 oldalt: ${a} + ${b} + ${a} + ${b}. Mennyi?` });
  };
  const newTask = () => {
    setTask(makeTask());
    setAns('');
    setMsg2(null);
  };
  // rajz méretezése
  const maxW = 200;
  const maxH = 100;
  const k2 = Math.min(maxW / task.a, maxH / task.b);
  const rw = task.a * k2;
  const rh = task.b * k2;

  return (
    <TheoryTemplate
      topicId="g3-measurements-1"
      subtopicId="a-teglalap-es-a-negyzet-kerulete"
      grade={3}
      chapterId="meresek"
      title="6. A téglalap és a négyzet kerülete"
      subtitle="A szemben lévő oldalak egyenlők. A négyzet minden oldala egyenlő. Kerítés, szegély, körbejárás."
      badge="3. OSZTÁLY • IV. MÉRÉSEK • TANANYAG"
      themeColor="orange"
      pdfFilename="3_osztaly_a_teglalap_es_a_negyzet_kerulete_tananyag.pdf"
      practiceTitle="Készen állsz? Gyakoroljunk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — TÉGLALAP, NÉGYZET',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-orange-50/90 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/80 text-center text-sm font-black text-orange-900 dark:text-orange-200">
              A téglalap szemben lévő oldalai egyenlő hosszúak.
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Téglalap 6 cm és 3 cm: 6 + 3 + 6 + 3 = 18 cm.</li>
              <li>A négyzet minden oldala egyenlő: 4 · 5 cm = 20 cm.</li>
              <li>Mind a 4 oldalt add össze!</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 147. o." badgeColor="orange">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Keress téglalap alakú tárgyat: füzet, ajtó, ablak, asztallap!</p>
          <p>Megtanulod, hogyan számolod ki gyorsan a téglalap és a négyzet kerületét.</p>
        </div>
      </TheorySection>

      <TheorySection title="2. A téglalap" badge="Szemben lévő oldalak" badgeColor="blue">
        <RectOppositeSvg />
        <div className="space-y-2 text-sm text-slate-700">
          <p>Mérd meg a téglalap oldalait! A két kék oldal egyforma hosszú. A két piros oldal is.</p>
          <p>A téglalap <strong>szemben lévő oldalai egyenlő hosszúak</strong>. Minden szöge derékszög.</p>
        </div>
        <TheoryCallout type="info" title="A derékszög jele">
          A sarkokban a kis negyedkör és a pont mutatja: ez derékszög.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="3. A téglalap kerülete" badge="Két út" badgeColor="sky">
        <RectUnfoldSvg />
        <div className="space-y-2 text-sm text-slate-700">
          <p>Elég két oldalt megmérni: egy hosszabbat és egy rövidebbet. A másik kettő ugyanennyi.</p>
          <p>Az A) úton körbe megyünk: 6 + 3 + 6 + 3. A B) úton előbb a két hosszút, aztán a két rövidet adjuk össze: 6 + 6 + 3 + 3. Ugyanannyi!</p>
        </div>
      </TheorySection>

      <TheorySection title="4. A négyzet kerülete" badge="Minden oldal egyenlő" badgeColor="emerald">
        <SquarePerimeterSvg />
        <p className="text-sm text-slate-700">Az olyan téglalapot, amelynek minden oldala egyenlő hosszú, <strong>négyzetnek</strong> nevezzük. A négyzet is téglalap! Itt elég egy oldalt megmérni, és 4-szer venni.</p>
      </TheorySection>

      <TheorySection title="5. Ugyanaz a kerület, más téglalap" badge="Négyzetrács" badgeColor="purple">
        <SamePerimeterSvg />
        <p className="text-sm text-slate-700">Ezek a téglalapok nagyon különbözők, mégis ugyanakkora a kerületük. A hosszabb és a rövidebb oldal együtt mindegyiknél 7 egység.</p>
      </TheorySection>

      <TheorySection title="6. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <PoolSvg />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) Séta a medence körül" badge="25 m és 12 m" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Két oldal 25 m, két oldal 12 m.</li>
              <li>25 + 25 = 50. 12 + 12 = 24.</li>
              <li>50 + 24 = <strong>74 m</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Szegély a virágágyásra" badge="négyzet" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A négyzet alakú ágyás oldala 135 cm.</li>
              <li>4 egyforma oldal: 4 · 135 cm.</li>
              <li>4 · 100 = 400, 4 · 35 = 140.</li>
              <li>400 + 140 = <strong>540 cm</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Visszafelé" badge="Fejtörő" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Egy négyzet kerülete 28 cm.</li>
              <li>4 egyforma oldala van.</li>
              <li>28 : 4 = 7.</li>
              <li>Egy oldala <strong>7 cm</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="7. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Egy téglalap oldalai 6 cm és 3 cm. Mennyi a kerülete?"
          wrong="6 + 3 = 9 cm"
          wrongExplanation="Ez csak két oldal! A téglalapnak 4 oldala van."
          correct="6 + 3 + 6 + 3 = 18 cm"
          correctExplanation="A szemben lévő oldalak is 6 cm és 3 cm."
          tip="Rajzold le a téglalapot, és írd mind a 4 oldalára a hosszát!"
        />
        <TheoryCallout type="warning" title="Azonos egység!">
          Ha az egyik oldal 1 m, a másik 40 cm: előbb váltsd át! 100 + 40 + 100 + 40 = 280 cm.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="8. Labor I: Építs téglalapot!" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-sky-50 rounded-xl p-3 text-center text-sky-900 text-sm">
            Készíts olyan téglalapot, amelynek a kerülete <strong className="text-2xl align-middle">{target}</strong> egység!
          </div>
          <svg viewBox="0 0 330 200" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200" fontFamily={FONT}>
            <GridRect x={9} y={8} s={S} cols={GW} rows={GH} c0={0} r0={0} w={w} h={h} />
            <RectMarks x={9} y={8} w={w * S} h={h * S} r={9} />
          </svg>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2">
              <button onClick={() => { setW(Math.max(1, w - 1)); setMsg1(null); }} className="w-12 h-12 rounded-xl bg-blue-500 text-white text-2xl font-black" aria-label="rövidebb">−</button>
              <div className="min-w-[96px] text-center text-lg font-black text-slate-800">hossza: {w}</div>
              <button onClick={() => { setW(Math.min(GW, w + 1)); setMsg1(null); }} className="w-12 h-12 rounded-xl bg-blue-500 text-white text-2xl font-black" aria-label="hosszabb">+</button>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => { setH(Math.max(1, h - 1)); setMsg1(null); }} className="w-12 h-12 rounded-xl bg-rose-500 text-white text-2xl font-black" aria-label="keskenyebb">−</button>
              <div className="min-w-[96px] text-center text-lg font-black text-slate-800">szélessége: {h}</div>
              <button onClick={() => { setH(Math.min(GH, h + 1)); setMsg1(null); }} className="w-12 h-12 rounded-xl bg-rose-500 text-white text-2xl font-black" aria-label="szélesebb">+</button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={check1} className="px-4 py-2 rounded-xl bg-sky-600 text-white text-sm font-bold min-h-[48px]">Ellenőrzés</button>
            <button onClick={newTarget} className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-sm font-bold min-h-[48px]">Új feladat</button>
          </div>
          {msg1 && (
            <div className={`rounded-xl p-3 text-center text-sm font-bold ${msg1.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{msg1.text}</div>
          )}
          {found.length > 0 && (
            <div className="text-center text-sm text-emerald-800">
              Megtalált téglalapok: <strong>{found.map((f) => f.replace('×', ' és ')).join('; ')}</strong>
            </div>
          )}
        </div>
      </TheorySection>

      <TheorySection title="9. Labor II: Mennyi szegély kell?" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-emerald-50 rounded-xl p-3 text-center text-emerald-900 text-sm">
            Körbe akarjuk keríteni: <strong>{task.t.name}</strong>. Hány {u} kell?
          </div>
          <svg viewBox="0 0 300 170" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200" fontFamily={FONT}>
            <RectShape
              x={150 - rw / 2}
              y={30 + (maxH - rh) / 2}
              w={rw}
              h={rh}
              labels={[`${task.a} ${u}`, task.t.square ? null : `${task.b} ${u}`, null, null]}
              fill={task.t.fill}
              fontSize={15}
              same={!!task.t.square}
              markR={10}
            />
          </svg>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <input
              type="number"
              inputMode="numeric"
              value={ans}
              onChange={(e) => { setAns(e.target.value); setMsg2(null); }}
              className="w-32 h-12 rounded-xl border-2 border-emerald-300 text-center text-2xl font-black"
              aria-label="kerület"
            />
            <span className="text-xl font-bold text-slate-700">{u}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={check2} className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-bold min-h-[48px]">Ellenőrzés</button>
            <button onClick={newTask} className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-sm font-bold min-h-[48px]">Új feladat</button>
          </div>
          {msg2 && (
            <div className={`rounded-xl p-3 text-center text-sm font-bold ${msg2.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{msg2.text}</div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default RectPerimeterG3Theory;
