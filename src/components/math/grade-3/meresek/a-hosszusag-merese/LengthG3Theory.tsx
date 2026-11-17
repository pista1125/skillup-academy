import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { LengthUnitsSvg, RulerMmSvg, RulerStartSvg, WhichUnitSvg, UnitStairsSvg, GridWalkSvg, BookTowerSvg } from './LengthG3Figures';
import { FONT, Ruler, Seg } from './LengthG3Parts';

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
// Labor I – vonalzó-leolvasó
// ---------------------------------------------------------------------------
interface RulerTask { start: number; len: number } // start: cm (egész), len: mm
const makeRulerTask = (): RulerTask => {
  const start = Math.random() < 0.6 ? 0 : rnd(1, 3);
  const len = rnd(12, 100 - start * 10 - 3);
  return { start, len };
};

const Stepper: React.FC<{ label: string; value: number; max: number; onChange: (v: number) => void; color: string }> = ({ label, value, max, onChange, color }) => (
  <div className="flex items-center gap-2">
    <button onClick={() => onChange(Math.max(0, value - 1))} className={`w-12 h-12 rounded-xl text-2xl font-black text-white ${color}`} aria-label={`${label} kevesebb`}>−</button>
    <div className="min-w-[72px] text-center text-2xl font-black text-slate-800">
      {value} <span className="text-base font-bold">{label}</span>
    </div>
    <button onClick={() => onChange(Math.min(max, value + 1))} className={`w-12 h-12 rounded-xl text-2xl font-black text-white ${color}`} aria-label={`${label} több`}>+</button>
  </div>
);

// ---------------------------------------------------------------------------
// Labor II – mértékváltó
// ---------------------------------------------------------------------------
interface ConvTask { prompt: string; answer: string; wrong: string[]; why: string }
const makeConvTask = (): ConvTask => {
  const kind = rnd(0, 5);
  if (kind === 0) {
    const a = rnd(1, 9);
    const b = rnd(1, 9);
    return {
      prompt: `${a} m ${b} dm = □ dm`,
      answer: `${10 * a + b} dm`,
      wrong: [`${a + b} dm`, `${100 * a + b} dm`, `${10 * b + a} dm`, `${10 * a + b + 10} dm`],
      why: `1 m = 10 dm, ezért ${a} m = ${10 * a} dm. ${10 * a} + ${b} = ${10 * a + b} dm.`
    };
  }
  if (kind === 1) {
    const a = rnd(1, 8);
    const c = Math.random() < 0.3 ? rnd(1, 9) : rnd(11, 99);
    return {
      prompt: `${a} m ${c} cm = □ cm`,
      answer: `${100 * a + c} cm`,
      wrong: [`${a + c} cm`, `${10 * a + c} cm`, `${1000 * a + c} cm`, `${100 * a + c + 100} cm`],
      why: `1 m = 100 cm, ezért ${a} m = ${100 * a} cm. ${100 * a} + ${c} = ${100 * a + c} cm.`
    };
  }
  if (kind === 2) {
    const a = rnd(1, 9);
    const b = rnd(1, 9);
    return {
      prompt: `${a} cm ${b} mm = □ mm`,
      answer: `${10 * a + b} mm`,
      wrong: [`${a + b} mm`, `${100 * a + b} mm`, `${10 * b + a} mm`, `${10 * a + b + 10} mm`],
      why: `1 cm = 10 mm, ezért ${a} cm = ${10 * a} mm. ${10 * a} + ${b} = ${10 * a + b} mm.`
    };
  }
  if (kind === 3) {
    const a = rnd(1, 9);
    const c = rnd(1, 99);
    const n = 100 * a + c;
    return {
      prompt: `${n} cm = □ m □ cm`,
      answer: `${a} m ${c} cm`,
      wrong: [`${Math.floor(n / 10)} m ${n % 10} cm`, `${n} m 0 cm`, `${a} m ${c + 10} cm`, `${a + 1} m ${c} cm`],
      why: `100 cm = 1 m. A ${n} cm-ben ${a}-szer van meg a 100 cm, marad ${c} cm.`
    };
  }
  if (kind === 4) {
    const a = rnd(1, 9);
    const b = rnd(1, 9);
    const n = 10 * a + b;
    return {
      prompt: `${n} mm = □ cm □ mm`,
      answer: `${a} cm ${b} mm`,
      wrong: [`${b} cm ${a} mm`, `${n} cm 0 mm`, `${a + 1} cm ${b} mm`, `0 cm ${n} mm`],
      why: `10 mm = 1 cm. A ${n} mm = ${10 * a} mm + ${b} mm = ${a} cm ${b} mm.`
    };
  }
  const a = rnd(2, 9);
  return {
    prompt: `${a} dm = □ cm`,
    answer: `${10 * a} cm`,
    wrong: [`${a} cm`, `${100 * a} cm`, `${a + 10} cm`, `${10 * a + 1} cm`],
    why: `1 dm = 10 cm, ezért ${a} dm = ${a} · 10 cm = ${10 * a} cm.`
  };
};
const optionsOf = (t: ConvTask) => {
  const w = Array.from(new Set(t.wrong.filter((x) => x !== t.answer))).slice(0, 3);
  return shuffle([t.answer, ...w]);
};

export const LengthG3Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [rt, setRt] = useState<RulerTask>({ start: 0, len: 47 });
  const [cm, setCm] = useState(0);
  const [mm, setMm] = useState(0);
  const [msg1, setMsg1] = useState<{ ok: boolean; text: string } | null>(null);
  const S = 36;
  const X = 14;
  const x0 = X + 8;
  const check1 = () => {
    const given = cm * 10 + mm;
    const L = rt.len;
    const C = Math.floor(L / 10);
    const M = L % 10;
    if (given === L) {
      setMsg1({ ok: true, text: `Ügyes vagy! ${C} cm ${M} mm = ${L} mm.` });
    } else if (rt.start > 0 && given === rt.start * 10 + L) {
      setMsg1({ ok: false, text: `Ez a vég helye a vonalzón. De a szakasz a ${rt.start}-nél kezdődik, nem a 0-nál! Vond le a ${rt.start} cm-t.` });
    } else if (cm === C) {
      setMsg1({ ok: false, text: `A centiméter jó! Most számold meg a kis vonásokat a teljes cm után.` });
    } else if (mm === M) {
      setMsg1({ ok: false, text: `A milliméter jó. Nézd meg újra: hány teljes cm fér bele?` });
    } else {
      setMsg1({ ok: false, text: `Nem ennyi. Nézd meg, hol kezdődik és hol végződik a szakasz!` });
    }
  };
  const newRuler = () => {
    setRt(makeRulerTask());
    setCm(0);
    setMm(0);
    setMsg1(null);
  };

  // Labor II
  const [ct, setCt] = useState<ConvTask>(() => ({
    prompt: '2 m 35 cm = □ cm',
    answer: '235 cm',
    wrong: ['37 cm', '55 cm', '2035 cm'],
    why: '1 m = 100 cm, ezért 2 m = 200 cm. 200 + 35 = 235 cm.'
  }));
  const [opts, setOpts] = useState<string[]>(['55 cm', '235 cm', '2035 cm', '37 cm']);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const pick = (o: string) => {
    if (picked === ct.answer) return;
    setPicked(o);
    if (o === ct.answer) setScore(score + 1);
  };
  const newConv = () => {
    const t = makeConvTask();
    setCt(t);
    setOpts(optionsOf(t));
    setPicked(null);
  };

  return (
    <TheoryTemplate
      topicId="g3-measurements-1"
      subtopicId="a-hosszusag-merese"
      grade={3}
      chapterId="meresek"
      title="4. A hosszúság mérése"
      subtitle="Milliméter, centiméter, deciméter, méter. Mérés vonalzóval, átváltás, becslés."
      badge="3. OSZTÁLY • IV. MÉRÉSEK • TANANYAG"
      themeColor="orange"
      pdfFilename="3_osztaly_a_hosszusag_merese_tananyag.pdf"
      practiceTitle="Készen állsz? Gyakoroljunk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — HOSSZÚSÁG',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-orange-50/90 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/80 text-center font-mono text-base font-black text-orange-900 dark:text-orange-200">
              1 m = 10 dm = 100 cm = 1000 mm
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>1 cm = 10 mm. 1 dm = 10 cm.</li>
              <li>Vonalzóval mindig a <strong>0</strong>-tól mérj!</li>
              <li>Kisebb egységre váltasz: <strong>több</strong> lesz a szám.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 142–145. o." badgeColor="orange">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>A hosszúságot már méred: méterrel, deciméterrel, centiméterrel.</p>
          <p>Most megismered a <strong>millimétert</strong> is. Ez nagyon kicsi egység.</p>
          <p>Megtanulod, hogyan mérj pontosan vonalzóval, és hogyan válts át egyik egységről a másikra.</p>
        </div>
      </TheorySection>

      <TheorySection title="2. A hosszúság egységei" badge="m, dm, cm, mm" badgeColor="amber">
        <LengthUnitsSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Méter és deciméter" badge="1 m = 10 dm" badgeColor="emerald">
            <p className="text-sm text-slate-700">A méterrudat 10 egyforma darabra vágjuk. Egy darab <strong>1 dm</strong>.</p>
          </TheoryCard>
          <TheoryCard title="Deciméter és centiméter" badge="1 dm = 10 cm" badgeColor="blue">
            <p className="text-sm text-slate-700">1 dm-ben 10 cm van. Így 1 m-ben <strong>100 cm</strong> van.</p>
          </TheoryCard>
        </div>
        <TheoryTable
          headers={['egység', 'jele', 'mekkora?']}
          rows={[
            ['méter', 'm', '1 m = 10 dm = 100 cm'],
            ['deciméter', 'dm', '1 dm = 10 cm = 100 mm'],
            ['centiméter', 'cm', '1 cm = 10 mm'],
            ['milliméter', 'mm', 'a vonalzó legkisebb osztása']
          ]}
        />
      </TheorySection>

      <TheorySection title="3. A milliméter" badge="1 cm = 10 mm" badgeColor="purple">
        <RulerMmSvg />
        <div className="space-y-2 text-sm text-slate-700">
          <p>Nézd meg a vonalzód! Az 1 cm-t 10 egyforma kis részre osztották. Egy kis rész <strong>1 milliméter</strong>. A jele: <strong>mm</strong>.</p>
          <p>A hosszú vonásoknál vannak a centiméterek. Az 5 cm-nél középhosszú vonás van.</p>
        </div>
        <TheoryCallout type="tip" title="Mikor kell a milliméter?">
          Ha valami kisebb 1 cm-nél, vagy ha pontosan akarsz mérni. Például egy radír vastagsága 8 mm.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="4. Hogyan mérj vonalzóval?" badge="A 0-tól!" badgeColor="emerald">
        <RulerStartSvg />
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
          <li>A vonalzó <strong>0</strong> vonását tedd a szakasz elejéhez. Nem a vonalzó szélét!</li>
          <li>Nézd meg, melyik vonásnál van a vége.</li>
          <li>Ha nem a 0-nál kezdted: a végből vond ki az elejét.</li>
        </ul>
      </TheorySection>

      <TheorySection title="5. Melyik egységgel mérjünk?" badge="Becslés" badgeColor="sky">
        <WhichUnitSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Kicsi dolgok" badge="mm, cm" badgeColor="purple">
            <p className="text-sm text-slate-700">Egy bogár, egy radír, egy ceruza: mm-rel vagy cm-rel mérjük.</p>
          </TheoryCard>
          <TheoryCard title="Nagy dolgok" badge="dm, m" badgeColor="emerald">
            <p className="text-sm text-slate-700">A pad, az ajtó, a tanterem: dm-rel vagy m-rel mérjük.</p>
          </TheoryCard>
        </div>
        <TheoryCallout type="info" title="Előbb becsülj, aztán mérj!">
          Mondd meg, szerinted milyen hosszú. Aztán mérd meg. Mennyi volt a különbség?
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="6. Átváltás" badge="· 10 és : 10" badgeColor="blue">
        <UnitStairsSvg />
        <TheoryTable
          headers={['ezt', 'így váltjuk', 'ennyi']}
          rows={[
            ['4 dm', '4 · 10 cm', '40 cm'],
            ['3 m', '3 · 100 cm', '300 cm'],
            ['6 cm 2 mm', '60 mm + 2 mm', '62 mm'],
            ['1 m 8 dm', '10 dm + 8 dm', '18 dm'],
            ['70 mm', '70 : 10', '7 cm']
          ]}
        />
      </TheorySection>

      <TheorySection title="7. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) Milyen magas a szekrény?" badge="2 m 35 cm" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>1 m = 100 cm.</li>
              <li>2 m = 200 cm.</li>
              <li>200 cm + 35 cm = <strong>235 cm</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) A csiga útja" badge="négyzetrács" badgeColor="emerald">
            <GridWalkSvg />
            <p className="text-sm text-slate-700">Megszámoljuk a kis szakaszokat: 9 darab. Mindegyik 10 cm. Az út <strong>90 cm</strong>.</p>
          </TheoryCard>
          <TheoryCard title="C) Könyvtorony" badge="mm" badgeColor="purple">
            <BookTowerSvg />
            <p className="text-sm text-slate-700">18 + 18 + 18 = <strong>54 mm</strong>. Ez 5 cm és 4 mm.</p>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="8. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Hány cm az 1 m 5 cm?"
          wrong="1 m 5 cm = 15 cm"
          wrongExplanation="Az 1 m nem 1 cm! Nem írhatod csak egymás mellé a két számot."
          correct="1 m 5 cm = 105 cm"
          correctExplanation="1 m = 100 cm. 100 cm + 5 cm = 105 cm."
          tip="Előbb váltsd át a métert centiméterre, csak utána add össze!"
        />
        <TheoryCallout type="warning" title="Csak azonos egységet hasonlíts össze!">
          Melyik hosszabb: 3 dm vagy 25 cm? A 3 kisebb szám, de 3 dm = 30 cm. Tehát a <strong>3 dm</strong> a hosszabb!
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="9. Labor I: Olvasd le a vonalzót!" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-sky-50 rounded-xl p-3 text-center text-sky-900 text-sm">
            Milyen hosszú a kék szakasz? Állítsd be a cm-t és a mm-t!
          </div>
          <svg viewBox="0 0 400 110" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200" fontFamily={FONT}>
            <Seg x1={x0 + rt.start * S} x2={x0 + rt.start * S + (rt.len * S) / 10} y={30} color="#2563eb" w={5} />
            <Ruler x={X} y={48} cm={10} s={S} h={46} fontSize={14} />
          </svg>
          <div className="flex flex-wrap justify-center gap-4">
            <Stepper label="cm" value={cm} max={10} onChange={(v) => { setCm(v); setMsg1(null); }} color="bg-blue-500" />
            <Stepper label="mm" value={mm} max={9} onChange={(v) => { setMm(v); setMsg1(null); }} color="bg-purple-500" />
          </div>
          <div className="text-center text-lg font-bold text-slate-700">
            {cm} cm {mm} mm = {cm * 10 + mm} mm
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={check1} className="px-4 py-2 rounded-xl bg-sky-600 text-white text-sm font-bold min-h-[48px]">Ellenőrzés</button>
            <button onClick={newRuler} className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-sm font-bold min-h-[48px]">Új feladat</button>
          </div>
          {msg1 && (
            <div className={`rounded-xl p-3 text-center text-sm font-bold ${msg1.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{msg1.text}</div>
          )}
        </div>
      </TheorySection>

      <TheorySection title="10. Labor II: Váltsd át!" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-emerald-50 rounded-xl p-4 text-center">
            <div className="text-sm text-emerald-900">Mi kerül a □ helyére?</div>
            <div className="text-3xl font-black text-emerald-950 mt-1">{ct.prompt}</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {opts.map((o) => {
              const chosen = picked === o;
              const ok = o === ct.answer;
              const cls = chosen ? (ok ? 'bg-emerald-500 text-white border-emerald-700' : 'bg-rose-400 text-white border-rose-600') : 'bg-white text-slate-800 border-slate-300';
              return (
                <button key={o} onClick={() => pick(o)} className={`min-h-[56px] rounded-xl border-2 text-xl font-black ${cls}`}>
                  {o}
                </button>
              );
            })}
          </div>
          {picked && (
            <div className={`rounded-xl p-3 text-center text-sm font-bold ${picked === ct.answer ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              {picked === ct.answer ? `Szuper! ${ct.why}` : `Nem ez. Segítek: ${ct.why} Válassz újra!`}
            </div>
          )}
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={newConv} className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-sm font-bold min-h-[48px]">Új feladat</button>
            <span className="text-sm font-bold text-emerald-700">Jó válaszok: {score}</span>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default LengthG3Theory;
