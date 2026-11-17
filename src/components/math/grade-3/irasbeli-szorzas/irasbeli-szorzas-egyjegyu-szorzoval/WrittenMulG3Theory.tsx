import React, { useEffect, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox } from '../TheoryTemplate';
import { WrittenMulNamesSvg, WrittenMulDiscsSvg, WrittenMulStepsSvg, WrittenMulCheckSvg, WrittenMulZeroSvg } from './WrittenMulG3Figures';
import { WrittenMulG3Column, mulSteps, spokenMulStep, carriesAfter, placePluralMul, placeAtMul } from './WrittenMulG3Column';
import { genMul, genHunt, randomMulKind, roundTens, MulKind, MUL_KINDS, MUL_KIND_LABEL, Hunt } from './WrittenMulG3Parts';
import { KeyPad, szor } from '../szorzas-egyjegyu-szammal/MulOneDigitG3Parts';

export const WrittenMulG3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // ---- Labor I: lépésről lépésre ----
  const [kind, setKind] = useState<MulKind>('ketto');
  const [task, setTask] = useState({ a: 178, m: 4 });
  const [col, setCol] = useState(0); // a következő oszlop (0 = egyesek); 3 = kész
  const [bad, setBad] = useState<number | null>(null);
  const [hint, setHint] = useState('');
  const [log, setLog] = useState<string[]>([]);
  const [showCarry, setShowCarry] = useState(true);
  const [demo, setDemo] = useState(false);
  const steps = mulSteps(task.a, task.m);
  const product = task.a * task.m;
  const nCols = steps.length;

  const newTask = (k: MulKind = kind) => {
    setKind(k);
    setTask(genMul(k));
    setCol(0);
    setBad(null);
    setHint('');
    setLog([]);
    setDemo(false);
  };
  const doStep = (c: number) => {
    setLog((l) => [...l, `${c + 1}. lépés (${placePluralMul(c)}): ${spokenMulStep(steps[c])}`]);
    setCol(c + 1);
    setBad(null);
    setHint('');
  };
  const press = (d: number) => {
    if (col >= nCols || demo) return;
    const st = steps[col];
    if (d === st.write) {
      doStep(col);
      return;
    }
    setBad(d);
    if (st.carryIn > 0 && d === st.prod % 10) setHint(`Ne felejtsd el, ami maradt! ${szor(st.m)} ${st.digit} az ${st.prod}, meg ${st.carryIn} az ${st.total}.`);
    else if (st.total >= 10 && d === Math.floor(st.total / 10)) setHint(`Fordítva! ${szor(st.m)} ${st.digit}${st.carryIn ? `, meg ${st.carryIn}` : ''} az ${st.total}. Ebből csak az utolsó jegyet írd le! Ami elöl áll, az marad, azt megjegyezzük.`);
    else if (d === (st.digit + st.m + st.carryIn) % 10) setHint(`Itt szorozni kell, nem összeadni! Mennyi ${szor(st.m)} ${st.digit}?`);
    else setHint(`Számold ki: ${st.m} · ${st.digit}${st.carryIn ? ` + ${st.carryIn}` : ''} = ?`);
  };
  useEffect(() => {
    if (!demo) return;
    if (col >= nCols) {
      setDemo(false);
      return;
    }
    const t = window.setTimeout(() => doStep(col), col === 0 ? 700 : 1800);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demo, col]);
  const startDemo = () => {
    setCol(0);
    setLog([]);
    setBad(null);
    setHint('');
    setDemo(true);
  };
  const resultStr = String(product)
    .padStart(3, ' ')
    .split('')
    .map((ch, i) => (2 - i < col ? ch : ' '))
    .join('');
  const carries = showCarry ? carriesAfter(steps, col) : [];
  const est = roundTens(task.a) * task.m;

  // ---- Labor II: Hol a hiba? ----
  const [hunt, setHunt] = useState<Hunt>({ a: 157, m: 4, type: 'maradek', errCol: 1, shown: 608 });
  const [hPick, setHPick] = useState<number | 'jo' | null>(null);
  const [hDone, setHDone] = useState(false);
  const [hMsg, setHMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [streak, setStreak] = useState(0);
  const hSteps = mulSteps(hunt.a, hunt.m);
  const newHunt = () => {
    setHunt(genHunt());
    setHPick(null);
    setHDone(false);
    setHMsg(null);
  };
  const explainHunt = (h: Hunt) => {
    if (h.errCol === null) return `Minden jegy jó: ${h.a} · ${h.m} = ${h.a * h.m}.`;
    const s = hSteps[h.errCol];
    const why = h.type === 'maradek' ? 'Itt elfelejtette hozzáadni, ami maradt.' : 'Itt fordítva írta: a maradékot írta le.';
    return `${why} Helyesen: ${spokenMulStep(s)} A jó szorzat: ${h.a * h.m}.`;
  };
  const pickHunt = (p: number | 'jo') => {
    if (hDone) return;
    setHPick(p);
    const right = (p === 'jo' && hunt.errCol === null) || p === hunt.errCol;
    if (right) {
      setHDone(true);
      setStreak((s) => s + 1);
      setHMsg({ ok: true, text: `Ügyes nyomozó! ${explainHunt(hunt)}` });
      return;
    }
    setStreak(0);
    if (p === 'jo') setHMsg({ ok: false, text: 'Nézd meg újra! Számold végig jobbról balra, és figyeld, mi maradt.' });
    else if (hunt.errCol === null) setHMsg({ ok: false, text: `Számold ki ${placeAtMul(p)}: ${spokenMulStep(hSteps[p])} Ez jó!` });
    else if (p > hunt.errCol) setHMsg({ ok: false, text: 'Ott is rossz lehet, de a hiba korábban kezdődött. Kezdd az egyeseknél!' });
    else setHMsg({ ok: false, text: `${placeAtMul(p)[0].toUpperCase()}${placeAtMul(p).slice(1)} minden rendben: ${spokenMulStep(hSteps[p])} Nézd a következőt!` });
  };

  return (
    <TheoryTemplate
      topicId="g3-written-mult"
      subtopicId="irasbeli-szorzas-egyjegyu-szorzoval"
      grade={3}
      chapterId="irasbeli-szorzas"
      title="3. Írásbeli szorzás egyjegyű szorzóval"
      subtitle="Szorozz írásban! Jobbról balra haladsz, és ami marad, azt hozzáadod a következő szorzathoz."
      badge="3. OSZTÁLY • XIII. ÍRÁSBELI SZORZÁS • TANANYAG"
      themeColor="orange"
      pdfFilename="3_osztaly_irasbeli_szorzas_egyjegyu_szorzoval_tananyag.pdf"
      practiceTitle="Készen állsz az írásbeli szorzásra?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-orange-50/90 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/80 text-center font-mono text-base font-black text-orange-900 dark:text-orange-200">
              178 · 4 = 712
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Kezdd az <strong>egyeseknél</strong>, és haladj <strong>balra</strong>!</li>
              <li>„4-szer 8 az 32. Leírom a 2-t, <strong>maradt 3</strong>.”</li>
              <li>Ami maradt, azt a <strong>következő szorzathoz adod</strong>: „4-szer 7 az 28, meg 3 az 31.”</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 125–128. o." badgeColor="orange">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>Eddig fejben szoroztál, bontással. Most <strong>írásban</strong> szorzol, mint az összeadásnál.</p>
          <p>A szorzandót leírod, mellé jobbra a szorzót. Alá húzol egy vonalat. A vonal alá kerül a <strong>szorzat</strong>.</p>
          <p>Kimondáskor a szorzót mondjuk előre: 321 · 3-nál „3-szor 1 az 3”. A tényezők felcserélhetők, így ugyanaz az eredmény.</p>
        </div>
        <WrittenMulNamesSvg />
      </TheorySection>

      <TheorySection title="2. Rakjuk ki korongokkal!" badge="126 · 3" badgeColor="amber">
        <WrittenMulDiscsSvg />
        <TheoryCard title="Nézzük meg együtt!" badge="126 · 3 = 378" badgeColor="amber">
          <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-700">
            <li>Egyesek: 3-szor 6 egyes az 18 egyes. Ebből 10 egyes = 1 tízes. Marad <strong>8 egyes</strong>, és kaptunk <strong>1 tízest</strong>.</li>
            <li>Tízesek: 3-szor 2 tízes az 6 tízes. Hozzáadjuk a kapott 1 tízest: <strong>7 tízes</strong>.</li>
            <li>Százasok: 3-szor 1 százas az <strong>3 százas</strong>.</li>
          </ol>
          <p className="text-sm text-slate-700 mt-2">Tehát 126 · 3 = <strong>378</strong>.</p>
        </TheoryCard>
      </TheorySection>

      <TheorySection title="3. Írásban, lépésről lépésre" badge="178 · 4" badgeColor="violet">
        <WrittenMulStepsSvg />
        <TheoryCard title="Így mondjuk ki" badge="Kimondva" badgeColor="violet">
          <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-700">
            <li>„4-szer 8 az 32. Leírom a 2-t, maradt 3.”</li>
            <li>„4-szer 7 az 28, meg 3 az 31. Leírom az 1-et, maradt 3.”</li>
            <li>„4-szer 1 az 4, meg 3 az 7. Leírom a 7-et.”</li>
          </ol>
          <p className="text-sm text-slate-700 mt-2">A szorzat: <strong>712</strong>.</p>
        </TheoryCard>
        <TheoryCallout type="tip" title="A kicsi zöld szám">
          Amit „maradt”, azt eleinte kicsi zöld számmal a következő oszlop fölé írhatod. Ha már biztosan megy, elég fejben tartani.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="4. Becsülj, számolj, ellenőrizz!" badge="162 · 4" badgeColor="emerald">
        <WrittenMulCheckSvg />
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
          <li><strong>Becslés:</strong> 162 ≈ 160, és 160 · 4 = 640. Az eredmény 640 körül lesz.</li>
          <li><strong>Számolás:</strong> 162 · 4 = 648.</li>
          <li><strong>Ellenőrzés:</strong> 162 + 162 + 162 + 162 = 648. Ugyanannyi, tehát jó!</li>
        </ul>
      </TheorySection>

      <TheorySection title="5. Nézzük meg együtt! Szöveges feladat" badge="Mintapélda" badgeColor="sky">
        <TheoryCard title="Egy pékség egy nap 156 kiflit süt. Hány kiflit süt 3 nap alatt?" badge="156 · 3" badgeColor="sky">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <ul className="space-y-1 text-sm text-slate-700">
              <li><strong>Adatok:</strong> 1 nap → 156 kifli, 3 nap → ? kifli</li>
              <li><strong>Terv:</strong> 156 · 3</li>
              <li><strong>Becslés:</strong> 156 ≈ 160, 160 · 3 = 480. Kicsit kevesebb lesz, mert felfelé kerekítettünk.</li>
              <li><strong>Ellenőrzés:</strong> 156 + 156 + 156 = 468.</li>
              <li><strong>Válasz:</strong> 3 nap alatt 468 kiflit süt.</li>
            </ul>
            <WrittenMulG3Column a={156} m={3} result={468} carries={[null, 1, 1]} cell={36} className="w-full max-w-[200px] h-auto mx-auto" />
          </div>
        </TheoryCard>
      </TheorySection>

      <TheorySection title="6. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Elfelejtett maradék"
          wrong="178 · 4 = 482"
          wrongExplanation="Az egyeseknél maradt 3, a tízeseknél is maradt 3 – de ezeket nem adta hozzá."
          correct="178 · 4 = 712"
          correctExplanation="4-szer 7 az 28, meg 3 az 31. 4-szer 1 az 4, meg 3 az 7."
          tip="Becsülj előre! 180 · 4 = 720, ehhez a 482 túl kevés."
        />
        <WrittenMulZeroSvg />
        <TheoryCallout type="warning" title="Nulla a közepén">
          204 · 4: a 0 szorzata 0, de ami maradt, azt <strong>akkor is</strong> hozzáadod! Ezért 816, nem 806.
        </TheoryCallout>
        <TheoryCallout type="warning" title="Ne add össze!">
          A 4-szer 7 az 28, nem 11. Írásbeli szorzásnál minden oszlopban <strong>szorzol</strong>.
        </TheoryCallout>
      </TheorySection>

      {/* Labor I */}
      <TheorySection title="7. Labor I: Szorozz lépésről lépésre!" badge="Labor" badgeColor="orange">
        <div className="bg-white border-2 border-orange-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => newTask(randomMulKind())} className="px-4 py-2 rounded-xl bg-orange-600 text-white text-sm font-bold min-h-[48px]">
              Új feladat
            </button>
            {MUL_KINDS.map((k) => (
              <button
                key={k}
                onClick={() => newTask(k)}
                className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold min-h-[48px] border-2 ${kind === k ? 'bg-orange-100 border-orange-500 text-orange-900' : 'bg-white border-slate-300 text-slate-700'}`}
              >
                {MUL_KIND_LABEL[k]}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <button onClick={startDemo} disabled={demo} className="px-4 py-2 rounded-xl bg-purple-600 text-white text-sm font-bold min-h-[48px] disabled:opacity-50">
              Mutasd meg!
            </button>
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 min-h-[48px]">
              <input type="checkbox" checked={showCarry} onChange={(e) => setShowCarry(e.target.checked)} className="w-5 h-5" />
              Ami maradt, kicsi zöld számmal
            </label>
          </div>
          <div className="text-center text-sm font-bold text-amber-800 bg-amber-50 rounded-xl p-2">
            Becslés: {task.a} ≈ {roundTens(task.a)}, {roundTens(task.a)} · {task.m} = {est}
          </div>
          <WrittenMulG3Column
            a={task.a}
            m={task.m}
            result={resultStr}
            carries={carries}
            carryRow
            highlight={col < nCols ? col : null}
            cell={42}
            className="w-full max-w-[260px] h-auto mx-auto"
          />
          {col < nCols && !demo && (
            <>
              <div className="bg-orange-50 rounded-xl p-3 text-center text-orange-900 font-bold">
                {col === 0 ? 'Kezdd az egyesekkel! ' : ''}
                {`${szor(task.m)} ${steps[col].digit}${steps[col].carryIn ? `, meg ami maradt: ${steps[col].carryIn}` : ''}. Melyik számot írod le a ${placePluralMul(col)} helyére?`}
              </div>
              <KeyPad onKey={press} bad={bad} />
            </>
          )}
          {hint && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">{hint}</div>}
          {log.length > 0 && (
            <div className="bg-slate-50 rounded-xl p-3 space-y-1 text-sm text-slate-700">
              {log.map((l, i) => (
                <div key={i}>{l}</div>
              ))}
            </div>
          )}
          {col >= nCols && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              Kész! {task.a} · {task.m} = {product}. A becslés {est} volt – közel van, jó!
              {task.m <= 4 ? ` Ellenőrzés: ${Array(task.m).fill(task.a).join(' + ')} = ${product}.` : ''} Kérj új feladatot!
            </div>
          )}
        </div>
      </TheorySection>

      {/* Labor II */}
      <TheorySection title="8. Labor II: Hol a hiba?" badge="Labor" badgeColor="rose">
        <div className="bg-white border-2 border-rose-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <button onClick={newHunt} className="px-4 py-2 rounded-xl bg-rose-500 text-white text-sm font-bold min-h-[48px]">
              Új feladat
            </button>
            <div className="ml-auto text-sm font-bold text-rose-800 bg-rose-50 rounded-xl px-3 py-2">Megfejtve egymás után: {streak}</div>
          </div>
          <p className="text-sm text-rose-900 bg-rose-50 rounded-xl p-3 text-center">Egy gyerek így szorzott. Jó lett? Ha nem, hol hibázott először?</p>
          <WrittenMulG3Column a={hunt.a} m={hunt.m} result={hDone ? hunt.a * hunt.m : hunt.shown} cell={42} className="w-full max-w-[240px] h-auto mx-auto" />
          {hDone && hunt.errCol !== null && (
            <p className="text-center text-sm text-slate-600">
              A gyerek eredménye: <span className="line-through text-rose-600 font-bold">{hunt.shown}</span> → jó: <strong className="text-emerald-700">{hunt.a * hunt.m}</strong>
            </p>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-xl mx-auto">
            {[2, 1, 0].map((c) => (
              <button
                key={c}
                onClick={() => pickHunt(c)}
                disabled={hDone}
                className={`min-h-[52px] rounded-xl border-2 text-sm font-bold ${
                  hPick === c ? (c === hunt.errCol ? 'bg-emerald-100 border-emerald-500 text-emerald-800' : 'bg-rose-100 border-rose-400 text-rose-800') : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-rose-50'
                }`}
              >
                Hiba {placeAtMul(c)}
              </button>
            ))}
            <button
              onClick={() => pickHunt('jo')}
              disabled={hDone}
              className={`min-h-[52px] rounded-xl border-2 text-sm font-bold ${
                hPick === 'jo' ? (hunt.errCol === null ? 'bg-emerald-100 border-emerald-500 text-emerald-800' : 'bg-rose-100 border-rose-400 text-rose-800') : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-emerald-50'
              }`}
            >
              Minden jó!
            </button>
          </div>
          {msgBox(hMsg)}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

const msgBox = (m: { ok: boolean; text: string } | null) =>
  m ? <div className={`rounded-xl p-3 text-center text-sm font-bold ${m.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{m.text}</div> : null;

export default WrittenMulG3Theory;
