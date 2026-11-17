import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { OrderRuleMulSvg, CinemaTwoWaysSvg, ZooMapSvg, ShelvesSvg, OrderTrapMulSvg } from './OrderOpsMulG3Figures';
import { Tok, Op, genExpr, nextIdx, applyAt, isOp, high, calc, show, genTwinTask, TwinTask, parse } from './OrderOpsMulG3Parts';

const shuffled = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const START: Tok[] = parse('90 + 110 · 4');
const START_TWIN: TwinTask = { expr: '3 · (125 + 95)', options: ['3 · 125 + 3 · 95', '3 · 125 + 95', '125 + 3 · 95'], value: 660 };

export const OrderOpsMulG3Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I – lépésről lépésre
  const [toks, setToks] = useState<Tok[]>(START);
  const [done, setDone] = useState<string[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const [val1, setVal1] = useState('');
  const [msg1, setMsg1] = useState<{ ok: boolean; text: string } | null>(null);
  const finished = toks.length === 1;

  const tapOp = (i: number) => {
    if (finished) return;
    const right = nextIdx(toks);
    if (i === right) {
      setPicked(i);
      setVal1('');
      setMsg1({ ok: true, text: 'Jó választás! Most számold ki ezt a lépést!' });
      return;
    }
    setPicked(null);
    const closeIdx = toks.indexOf(')');
    const openIdx = toks.indexOf('(');
    if (openIdx >= 0 && (i < openIdx || i > closeIdx)) setMsg1({ ok: false, text: 'Van zárójel! Először a zárójelben számolj!' });
    else if (!high(toks[i]) && high(toks[right])) setMsg1({ ok: false, text: 'A szorzás előbb jön, mint az összeadás és a kivonás!' });
    else setMsg1({ ok: false, text: 'Ha egyformák a műveletek, balról jobbra haladj!' });
  };

  const check1 = () => {
    if (picked === null) return;
    const a = toks[picked - 1] as number;
    const b = toks[picked + 1] as number;
    const op = toks[picked] as Op;
    const r = calc(a, op, b);
    if (Number(val1) === r) {
      const next = applyAt(toks, picked);
      setDone((d) => [...d, `${a} ${op} ${b} = ${r}`]);
      setToks(next);
      setPicked(null);
      setVal1('');
      setMsg1(next.length === 1 ? { ok: true, text: `Kész! Az eredmény: ${r}. Ügyes vagy!` } : { ok: true, text: 'Szuper! Melyik művelet jön most?' });
    } else {
      setMsg1({ ok: false, text: `Még nem jó. Számold újra: ${a} ${op} ${b}.` });
    }
  };

  const new1 = () => {
    setToks(genExpr());
    setDone([]);
    setPicked(null);
    setVal1('');
    setMsg1(null);
  };

  // Labor II – keresd a párját!
  const [tw, setTw] = useState<TwinTask>(START_TWIN);
  const [order, setOrder] = useState<string[]>(START_TWIN.options);
  const [pick2, setPick2] = useState<string | null>(null);
  const [val2, setVal2] = useState('');
  const [msg2, setMsg2] = useState<{ ok: boolean; text: string } | null>(null);
  const choose2 = (o: string) => {
    setPick2(o);
    if (o === tw.options[0]) setMsg2({ ok: true, text: 'Igen! A zárójelben lévő mindkét számot szorozni kell. Mennyi az eredmény?' });
    else if (o === tw.options[1]) setMsg2({ ok: false, text: `Itt csak az első számot szoroztad meg. A zárójel miatt a második számot is ${tw.expr.split(' ')[0]}-szer kell venni!` });
    else setMsg2({ ok: false, text: 'Itt csak a második számot szoroztad meg. Mindkét számot szorozni kell!' });
  };
  const check2 = () => {
    const v = Number(val2);
    if (v === tw.value) setMsg2({ ok: true, text: `Szuper! ${tw.expr} = ${tw.value}, és ${tw.options[0]} = ${tw.value}.` });
    else setMsg2({ ok: false, text: 'Még nem jó. Először a zárójelben számolj, utána szorozz!' });
  };
  const new2 = () => {
    const t = genTwinTask();
    setTw(t);
    setOrder(shuffled(t.options));
    setPick2(null);
    setVal2('');
    setMsg2(null);
  };

  return (
    <TheoryTemplate
      topicId="g3-written-mult"
      subtopicId="a-muveletek-sorrendje"
      grade={3}
      chapterId="irasbeli-szorzas"
      title="5. A műveletek sorrendje"
      subtitle="Zárójel, szorzás, összeadás: mit számolj először? Lépésről lépésre haladunk."
      badge="3. OSZTÁLY • XIII. ÍRÁSBELI SZORZÁS • TANANYAG"
      themeColor="violet"
      pdfFilename="3_osztaly_muveletek_sorrendje_szorzas_tananyag.pdf"
      practiceTitle="Készen állsz a műveletsorokra?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center font-mono text-base font-black text-violet-900 dark:text-violet-200">
              1. ( ) &nbsp;→&nbsp; 2. · : &nbsp;→&nbsp; 3. + −
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Ha van <strong>zárójel</strong>, azt számold ki először.</li>
              <li>Utána jön a <strong>szorzás</strong> és az osztás.</li>
              <li>Végül az <strong>összeadás</strong> és a kivonás, balról jobbra.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 130–131. o." badgeColor="violet">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>Egy feladatban sokszor <strong>több művelet</strong> is van.</p>
          <p>Ilyenkor nem mindegy, mit számolsz először! Van egy <strong>sorrend</strong>.</p>
          <p>Most már nagy számokat is szorzunk: például <strong>125 · 3</strong>.</p>
        </div>
        <OrderRuleMulSvg />
      </TheorySection>

      <TheorySection title="2. Először a szorzás" badge="· előbb, mint +" badgeColor="orange">
        <ShelvesSvg />
        <TheoryCard title="Nézzük meg együtt!" badge="126 + 126 · 3" badgeColor="orange">
          <p className="text-sm text-slate-700 mb-2">Az egyik polcon 126 könyv van, a másikon 3-szor annyi. Hány könyv van összesen?</p>
          <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-700">
            <li>Terv: 126 + 126 · 3</li>
            <li>Először szorzunk: 126 · 3 = 378.</li>
            <li>Utána adunk össze: 126 + 378 = <strong>504</strong>.</li>
          </ol>
          <p className="text-sm text-slate-700 mt-2"><strong>Válasz:</strong> 504 könyv van a két polcon.</p>
        </TheoryCard>
        <TheoryTable
          headers={['Műveletsor', '1. lépés', '2. lépés']}
          rows={[
            ['250 + 120 · 4', '120 · 4 = 480', '250 + 480 = 730'],
            ['900 − 215 · 3', '215 · 3 = 645', '900 − 645 = 255'],
            ['140 · 5 + 85', '140 · 5 = 700', '700 + 85 = 785']
          ]}
        />
      </TheorySection>

      <TheorySection title="3. Zárójel: az a legelső!" badge="( )" badgeColor="purple">
        <TheoryCard title="Nézzük meg együtt!" badge="(250 + 120) · 2" badgeColor="purple">
          <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-700">
            <li>A zárójelben összeadunk: 250 + 120 = 370.</li>
            <li>Utána szorzunk: 370 · 2 = <strong>740</strong>.</li>
          </ol>
        </TheoryCard>
        <TheoryCallout type="tip" title="Ugyanazok a számok, más eredmény">
          <div className="space-y-1">
            <div>125 + 205 · 3 = 125 + 615 = <strong>740</strong></div>
            <div>(125 + 205) · 3 = 330 · 3 = <strong>990</strong></div>
          </div>
          A zárójel megváltoztatja a sorrendet, ezért más lesz az eredmény!
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="4. Két út, egy eredmény" badge="Mozi" badgeColor="rose">
        <CinemaTwoWaysSvg />
        <TheoryCard title="3 vetítés. Hány néző volt összesen?" badge="Két terv" badgeColor="rose">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
            <li>1. út: egy vetítésen 50 + 230 = 280 néző. Három vetítésen: 3 · (50 + 230) = 3 · 280 = <strong>840</strong>.</li>
            <li>2. út: fent 3 · 50 = 150, lent 3 · 230 = 690. Összesen: 150 + 690 = <strong>840</strong>.</li>
          </ul>
        </TheoryCard>
        <TheoryCallout type="info" title="Jó tudni">
          3 · (50 + 230) ugyanannyi, mint 3 · 50 + 3 · 230. A zárójelben lévő <strong>mindkét</strong> számot szorozni kell!
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="5. Nézzük meg együtt! Séta az állatkertben" badge="Mintapélda" badgeColor="emerald">
        <ZooMapSvg />
        <TheoryTable
          headers={['Állat', 'Műveletsor', 'Lépések', 'Távolság']}
          rows={[
            ['zsiráf', '2 · (150 + 175)', '325 · 2', '650 m'],
            ['majom', '4 · 120 + 95', '480 + 95', '575 m'],
            ['oroszlán', '1000 − 3 · 215', '1000 − 645', '355 m'],
            ['pingvin', '125 · 3 + 250', '375 + 250', '625 m']
          ]}
        />
        <p className="text-sm text-slate-700">A legközelebb az oroszlán van (355 m), a legmesszebb a zsiráf (650 m).</p>
      </TheorySection>

      <TheorySection title="6. Vigyázz! Ne balról jobbra számolj!" badge="Csapda" badgeColor="rose">
        <OrderTrapMulSvg />
        <TheoryTrapBox
          title="90 + 110 · 4 = ?"
          wrong="90 + 110 = 200, 200 · 4 = 800"
          wrongExplanation="Itt balról jobbra számolt valaki. De a szorzás előbb jön!"
          correct="110 · 4 = 440, 90 + 440 = 530"
          correctExplanation="Először a szorzást végezzük el, utána az összeadást."
          tip="Keresd meg a szorzásjelet! Azt számold ki először."
        />
        <TheoryCallout type="warning" title="Még egy csapda">
          3 · (125 + 95) nem ugyanaz, mint 3 · 125 + 95! A zárójel miatt a 95-öt is 3-szor kell venni.
        </TheoryCallout>
      </TheorySection>

      {/* Labor I */}
      <TheorySection title="7. Labor I: Lépésről lépésre" badge="Labor" badgeColor="violet">
        <div className="bg-white border-2 border-violet-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <p className="text-sm text-violet-900 bg-violet-50 rounded-xl p-3">Koppints arra a műveleti jelre, amelyiket először kell elvégezni!</p>
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-3xl font-black text-slate-800">
            {toks.map((t, i) =>
              isOp(t) ? (
                <button
                  key={i}
                  onClick={() => tapOp(i)}
                  disabled={finished}
                  className={`min-w-[52px] min-h-[52px] rounded-xl border-2 ${
                    picked === i ? 'bg-emerald-100 border-emerald-500 text-emerald-800' : 'bg-violet-50 border-violet-300 text-violet-800 hover:bg-violet-100'
                  }`}
                  aria-label={`művelet ${t}`}
                >
                  {t}
                </button>
              ) : (
                <span key={i} className={t === '(' || t === ')' ? 'text-purple-500' : ''}>
                  {t}
                </span>
              )
            )}
          </div>
          {done.length > 0 && (
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-2 text-center text-base text-slate-700 space-y-0.5">
              {done.map((d, i) => (
                <div key={i}>
                  {i + 1}. lépés: <strong>{d}</strong>
                </div>
              ))}
            </div>
          )}
          {picked !== null && (
            <div className="flex flex-wrap items-center justify-center gap-3 text-2xl font-black text-slate-800">
              <span>
                {String(toks[picked - 1])} {String(toks[picked])} {String(toks[picked + 1])} =
              </span>
              <input
                value={val1}
                onChange={(e) => setVal1(e.target.value.replace(/[^0-9]/g, ''))}
                inputMode="numeric"
                className="w-28 rounded-xl border-2 border-violet-300 px-2 py-1 text-center"
                aria-label="részeredmény"
              />
            </div>
          )}
          {msg1 && <div className={`rounded-xl p-2 text-center text-sm font-bold ${msg1.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{msg1.text}</div>}
          <div className="flex flex-wrap gap-2 justify-center">
            <button onClick={check1} disabled={picked === null} className="px-4 py-2 rounded-xl bg-violet-600 text-white text-base font-bold min-h-[48px] disabled:opacity-40">
              Ellenőrzés
            </button>
            <button onClick={new1} className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-base font-bold min-h-[48px]">
              Új feladat
            </button>
          </div>
        </div>
      </TheorySection>

      {/* Labor II */}
      <TheorySection title="8. Labor II: Keresd a párját!" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <p className="text-sm text-emerald-900 bg-emerald-50 rounded-xl p-3 text-center">Melyik műveletsor ad ugyanannyit?</p>
          <div className="text-center text-3xl font-black text-slate-800">{tw.expr}</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {order.map((o) => (
              <button
                key={o}
                onClick={() => choose2(o)}
                className={`min-h-[56px] rounded-xl border-2 text-lg font-bold ${
                  pick2 === o ? (o === tw.options[0] ? 'bg-emerald-100 border-emerald-500 text-emerald-800' : 'bg-rose-100 border-rose-400 text-rose-800') : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-emerald-50'
                }`}
              >
                {o}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-2xl font-black text-slate-800">
            <span>{tw.expr} =</span>
            <input
              value={val2}
              onChange={(e) => setVal2(e.target.value.replace(/[^0-9]/g, ''))}
              inputMode="numeric"
              disabled={pick2 !== tw.options[0]}
              className="w-28 rounded-xl border-2 border-emerald-300 px-2 py-1 text-center disabled:bg-slate-100"
              aria-label="eredmény"
            />
          </div>
          {msg2 && <div className={`rounded-xl p-2 text-center text-sm font-bold ${msg2.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{msg2.text}</div>}
          <div className="flex flex-wrap gap-2 justify-center">
            <button onClick={check2} disabled={pick2 !== tw.options[0]} className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-base font-bold min-h-[48px] disabled:opacity-40">
              Ellenőrzés
            </button>
            <button onClick={new2} className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-base font-bold min-h-[48px]">
              Új feladat
            </button>
          </div>
          <p className="text-xs text-slate-500 text-center">Tipp: {show(parse(tw.expr))} → a zárójelben lévő mindkét számot szorozd!</p>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default OrderOpsMulG3Theory;
