import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { ChapterMapMulSvg, MulNamesSvg, EstimateMulSvg, ChainMulSvg, MuseumMulSvg } from './WrittenMulExamG3Figures';
import { makeTask, TaskKind, TASK_LABEL, ExamTask, genMulPair, mulSteps, MulStep } from './WrittenMulExamG3Parts';

const KINDS: TaskKind[] = ['fejben', 'becsles', 'irasbeli', 'sorrend', 'kovetkeztetes'];
const PLACE_NAME = ['egyesek', 'tízesek', 'százasok'];

const START_TASK: ExamTask = {
  kind: 'irasbeli',
  text: 'Számold ki írásban! 216 · 4 = ?',
  answer: 864,
  hint: 'Egyesek: 4 · 6 = 24, leírom a 4-et, marad 2. Tízesek: 4 · 1 = 4, + 2 = 6. Százasok: 4 · 2 = 8.',
  traps: [
    { v: 844, msg: 'A maradékot elfelejtetted hozzáadni a következő helyiértékhez!' },
    { v: 1224, msg: 'A maradékot a szorzás UTÁN add hozzá, ne előtte!' }
  ]
};

export const WrittenMulExamG3Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I – vegyes feladatok
  const [task, setTask] = useState<ExamTask>(START_TASK);
  const [val1, setVal1] = useState('');
  const [msg1, setMsg1] = useState<{ ok: boolean; text: string } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const newTask = (k: TaskKind) => {
    setTask(makeTask(k));
    setVal1('');
    setMsg1(null);
    setShowHint(false);
  };
  const check1 = () => {
    const v = Number(val1);
    if (val1 === '') return;
    if (v === task.answer) {
      setMsg1({ ok: true, text: `Szuper! A válasz: ${task.answer}.` });
      return;
    }
    const trap = task.traps.find((t) => t.v === v);
    setMsg1({ ok: false, text: trap ? trap.msg : 'Még nem jó. Nézd meg a tippet, és próbáld újra!' });
  };

  // Labor II – írásbeli szorzás lépésenként
  const [mp, setMp] = useState({ a: 216, d: 4 });
  const st: MulStep[] = mulSteps(mp.a, mp.d);
  const [k, setK] = useState(0);
  const [val2, setVal2] = useState('');
  const [msg2, setMsg2] = useState<{ ok: boolean; text: string } | null>(null);
  const finished = k >= st.length;
  const check2 = () => {
    if (finished || val2 === '') return;
    const s = st[k];
    const v = Number(val2);
    if (v === s.write) {
      setK(k + 1);
      setVal2('');
      if (k + 1 >= st.length) setMsg2({ ok: true, text: `Kész! ${mp.a} · ${mp.d} = ${mp.a * mp.d}. Ellenőrizd összeadással is!` });
      else setMsg2({ ok: true, text: s.carryOut ? `Jó! Leírtad a ${s.write}-t, és marad ${s.carryOut}. Jönnek a ${PLACE_NAME[k + 1]}.` : `Jó! Jönnek a ${PLACE_NAME[k + 1]}.` });
      return;
    }
    if (s.carryIn && v === s.prod % 10) setMsg2({ ok: false, text: `Ne felejtsd el a maradékot! ${mp.d} · ${s.digit} = ${s.prod}, és még + ${s.carryIn}.` });
    else if (s.carryOut && v === s.total) setMsg2({ ok: false, text: `${s.total} – ebből csak az egyeseket írd le! A tízes marad, azt továbbviszed.` });
    else setMsg2({ ok: false, text: `Még nem jó. Mennyi ${mp.d} · ${s.digit}?${s.carryIn ? ` Utána add hozzá a maradékot (${s.carryIn}).` : ''}` });
  };
  const new2 = () => {
    setMp(genMulPair(1));
    setK(0);
    setVal2('');
    setMsg2(null);
  };
  const aDigits = String(mp.a).split('');
  const written = st.slice(0, k).map((s) => s.write);
  const productCells = [2, 1, 0].map((c) => (c < written.length ? String(written[c]) : ''));
  const carryCells = [2, 1, 0].map((c) => (c >= 1 && c <= k && st[c - 1].carryOut ? String(st[c - 1].carryOut) : ''));

  return (
    <TheoryTemplate
      topicId="g3-written-mult"
      subtopicId="megallo"
      grade={3}
      chapterId="irasbeli-szorzas"
      title="6. Megálló – tudáspróba"
      subtitle="Összefoglaljuk az írásbeli szorzás fejezetet: fejben, becsléssel, írásban, sorrendben."
      badge="3. OSZTÁLY • XIII. ÍRÁSBELI SZORZÁS • TANANYAG"
      themeColor="sky"
      pdfFilename="3_osztaly_irasbeli_szorzas_megallo_tananyag.pdf"
      practiceTitle="Készen állsz a tudáspróbára?"
      practiceSubtitle="90 feladat vár rád 3 szinten!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'AMIT MÁR TUDSZ',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-sky-50/90 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800/80 text-center font-mono text-base font-black text-sky-900 dark:text-sky-200">
              Terv → Becslés → Számítás → Ellenőrzés
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Írásban az <strong>egyesekkel</strong> kezdesz, a maradékot továbbviszed.</li>
              <li>Becsléshez előbb <strong>kerekítesz</strong>, utána szorzol.</li>
              <li>Sorrend: <strong>zárójel</strong>, aztán <strong>szorzás</strong>, végül + és −.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Amit már tudsz" badge="Tankönyv 122–133. o." badgeColor="sky">
        <p className="text-sm text-slate-700 leading-relaxed">Ebben a fejezetben öt dolgot tanultál. Nézzük át őket egyenként!</p>
        <ChapterMapMulSvg />
      </TheorySection>

      <TheorySection title="2. Szorzás fejben, bontással" badge="Fejben" badgeColor="orange">
        <TheoryTable
          headers={['Feladat', 'Bontás', 'Eredmény']}
          rows={[
            ['230 · 3', '200 · 3 + 30 · 3 = 600 + 90', '690'],
            ['280 · 2', '200 · 2 + 80 · 2 = 400 + 160', '560'],
            ['140 · 5', '100 · 5 + 40 · 5 = 500 + 200', '700']
          ]}
        />
        <TheoryCallout type="tip" title="Tipp">
          A tízeseket is szorozd meg! 280 · 2 nem 480, hanem 560.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="3. Becslés kerekítéssel" badge="Becslés" badgeColor="emerald">
        <EstimateMulSvg />
        <TheoryCard title="Nagyobb vagy kisebb lesz?" badge="214 · 3" badgeColor="emerald">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
            <li>214 ≈ 210, és 210 · 3 = 630.</li>
            <li>Lefelé kerekítettünk, ezért a pontos szorzat <strong>nagyobb</strong> lesz 630-nál: 642.</li>
            <li>Ha fölfelé kerekítünk, a pontos szorzat <strong>kisebb</strong> lesz a becslésnél.</li>
          </ul>
        </TheoryCard>
      </TheorySection>

      <TheorySection title="4. Írásbeli szorzás" badge="Írásban" badgeColor="indigo">
        <MulNamesSvg />
        <TheoryCard title="Nézzük meg együtt!" badge="157 · 2" badgeColor="indigo">
          <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-700">
            <li>Egyesek: 2 · 7 = 14, leírom a 4-et, marad 1.</li>
            <li>Tízesek: 2 · 5 = 10, + 1 = 11, leírom az 1-et, marad 1.</li>
            <li>Százasok: 2 · 1 = 2, + 1 = 3, leírom: 3.</li>
          </ol>
          <p className="text-sm text-slate-700 mt-2">
            <strong>157 · 2 = 314.</strong> Ellenőrzés: 157 + 157 = 314. Jó!
          </p>
        </TheoryCard>
      </TheorySection>

      <TheorySection title="5. Összefüggések, következtetés" badge="Következtetés" badgeColor="purple">
        <TheoryTable
          headers={['Ismert', 'Új', 'Gondolkodás', 'Eredmény']}
          rows={[
            ['4 · 30 = 120', '8 · 30', 'a 4 helyett 8: 2-szeres', '240'],
            ['120 · 4 = 480', '240 · 2', 'egyik · 2, másik : 2', '480'],
            ['3 db 150 Ft', '6 db', '2-szer annyi darab', '300 Ft']
          ]}
        />
      </TheorySection>

      <TheorySection title="6. A műveletek sorrendje" badge="Sorrend" badgeColor="rose">
        <TheoryCard title="Emlékszel?" badge="( ) → · → + −" badgeColor="rose">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
            <li>348 + 126 · 2 = 348 + 252 = <strong>600</strong></li>
            <li>2 · (180 + 95) = 2 · 275 = <strong>550</strong></li>
          </ul>
        </TheoryCard>
        <ChainMulSvg />
      </TheorySection>

      <TheorySection title="7. Nézzük meg együtt! Séta a múzeumban" badge="Mintapélda" badgeColor="amber">
        <MuseumMulSvg />
        <TheoryTable
          headers={['Terem', 'Számolás', 'Eredmény']}
          rows={[
            ['1.', '163 · 4 (írásban)', '652'],
            ['2.', '2 · 275', '550'],
            ['3.', '205 · 4', '820'],
            ['4.', '1000 − 645', '355'],
            ['5.', '2 · 5 = 10, 10 · 3 = 30, 30 · 30', '900'],
            ['6.', '348 + 252', '600']
          ]}
        />
        <p className="text-sm text-slate-700">A legnagyobb eredmény az 5. teremben van (900), a legkisebb a 4.-ben (355).</p>
      </TheorySection>

      <TheorySection title="8. Vigyázz! A maradék csapdái" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="214 · 3 = ?"
          wrong="214 · 3 = 632"
          wrongExplanation="3 · 4 = 12, leírta a 2-t, de az 1 maradékot elfelejtette hozzáadni a tízesekhez."
          correct="214 · 3 = 642"
          correctExplanation="3 · 1 = 3, és még + 1 a maradék: 4. Így lesz 642."
          tip="A maradékot írd fel kicsiben, hogy ne felejtsd el!"
        />
        <TheoryCallout type="warning" title="Még egy csapda">
          A maradékot a szorzás <strong>után</strong> adod hozzá! 216 · 4-nél a tízeseknél: 4 · 1 = 4, + 2 = 6. Nem (1 + 2) · 4!
        </TheoryCallout>
      </TheorySection>

      {/* Labor I */}
      <TheorySection title="9. Labor I: Vegyes feladatok" badge="Labor" badgeColor="sky">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <p className="text-sm text-sky-900 bg-sky-50 rounded-xl p-3 text-center">Válassz egy állomást! Mindig új feladatot kapsz.</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {KINDS.map((kk) => (
              <button
                key={kk}
                onClick={() => newTask(kk)}
                className={`min-h-[52px] rounded-xl border-2 text-base font-bold ${task.kind === kk ? 'bg-sky-100 border-sky-500 text-sky-800' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-sky-50'}`}
              >
                {TASK_LABEL[kk]}
              </button>
            ))}
          </div>
          <div className="text-center text-2xl font-black text-slate-800">{task.text}</div>
          <div className="flex justify-center">
            <input
              value={val1}
              onChange={(e) => setVal1(e.target.value.replace(/[^0-9]/g, ''))}
              inputMode="numeric"
              className="w-32 rounded-xl border-2 border-sky-300 px-2 py-1 text-center text-3xl font-black"
              aria-label="válasz"
            />
          </div>
          {showHint && <div className="rounded-xl bg-amber-50 border border-amber-200 p-2 text-center text-sm text-amber-900">{task.hint}</div>}
          {msg1 && <div className={`rounded-xl p-2 text-center text-sm font-bold ${msg1.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{msg1.text}</div>}
          <div className="flex flex-wrap gap-2 justify-center">
            <button onClick={check1} className="px-4 py-2 rounded-xl bg-sky-600 text-white text-base font-bold min-h-[48px]">
              Ellenőrzés
            </button>
            <button onClick={() => setShowHint(true)} className="px-4 py-2 rounded-xl bg-amber-100 text-amber-800 text-base font-bold min-h-[48px]">
              Tipp
            </button>
            <button onClick={() => newTask(task.kind)} className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-base font-bold min-h-[48px]">
              Új feladat
            </button>
          </div>
        </div>
      </TheorySection>

      {/* Labor II */}
      <TheorySection title="10. Labor II: Írásbeli szorzás lépésenként" badge="Labor" badgeColor="indigo">
        <div className="bg-white border-2 border-indigo-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <p className="text-sm text-indigo-900 bg-indigo-50 rounded-xl p-3 text-center">
            {finished ? 'Kész a szorzás!' : `Most a(z) ${PLACE_NAME[k]} jönnek. Melyik számjegyet írod le?`}
          </p>
          <div className="mx-auto w-fit font-mono">
            <div className="grid grid-cols-4 gap-1 text-center">
              {['sz', 't', 'e', ''].map((h, i) => (
                <div key={i} className={`w-12 rounded text-xs font-bold ${['bg-rose-200', 'bg-sky-200', 'bg-amber-200', ''][i]}`}>{h}</div>
              ))}
              {carryCells.map((c, i) => (
                <div key={`c${i}`} className="w-12 h-5 text-sm font-bold text-rose-500">{c}</div>
              ))}
              <div />
              {aDigits.map((dg, i) => (
                <div key={`a${i}`} className="w-12 text-4xl font-black text-slate-800">{dg}</div>
              ))}
              <div className="w-12 text-3xl font-black text-orange-600">· {mp.d}</div>
              <div className="col-span-3 border-t-4 border-slate-800" />
              <div />
              {productCells.map((p, i) => (
                <div key={`p${i}`} className={`w-12 h-12 text-4xl font-black ${2 - i === k && !finished ? 'bg-indigo-50 rounded-lg ring-2 ring-indigo-400' : ''} text-emerald-700`}>{p}</div>
              ))}
              <div />
            </div>
          </div>
          {!finished && (
            <div className="flex flex-wrap items-center justify-center gap-3 text-2xl font-black text-slate-800">
              <span>
                {mp.d} · {st[k].digit}
                {st[k].carryIn ? ` + ${st[k].carryIn}` : ''} →
              </span>
              <input
                value={val2}
                onChange={(e) => setVal2(e.target.value.replace(/[^0-9]/g, ''))}
                inputMode="numeric"
                className="w-20 rounded-xl border-2 border-indigo-300 px-2 py-1 text-center"
                aria-label="leírt számjegy"
              />
            </div>
          )}
          {msg2 && <div className={`rounded-xl p-2 text-center text-sm font-bold ${msg2.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{msg2.text}</div>}
          <div className="flex flex-wrap gap-2 justify-center">
            <button onClick={check2} disabled={finished} className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-base font-bold min-h-[48px] disabled:opacity-40">
              Ellenőrzés
            </button>
            <button onClick={new2} className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-base font-bold min-h-[48px]">
              Új feladat
            </button>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default WrittenMulExamG3Theory;
