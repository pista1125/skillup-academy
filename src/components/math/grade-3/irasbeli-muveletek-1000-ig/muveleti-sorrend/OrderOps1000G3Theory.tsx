import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import {
  OrderOps1000RuleSvg,
  OrderOps1000ChainSvg,
  OrderOps1000BracketFirstSvg,
  OrderOps1000BracketCompareSvg,
  OrderOps1000ShopSvg
} from './OrderOps1000G3Figures';
import { Tok, isOp, high, nextIdx, applyAt, calc, Op, show, steps, valueOf, naive, noBrackets, genExpr, genBracketTask, BracketTask, parse, ColStep } from './OrderOps1000G3Parts';

interface Done {
  a: number;
  op: Op;
  b: number;
  r: number;
}

export const OrderOps1000G3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // Labor I – lépkedő
  const first = parse('(930 − 570) : 6 + 245');
  const [start, setStart] = useState<Tok[]>(first);
  const [cur, setCur] = useState<Tok[]>(first);
  const [hist, setHist] = useState<Done[]>([]);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const tap = (i: number) => {
    const ni = nextIdx(cur);
    if (i === ni) {
      const n = applyAt(cur, i);
      const d = { a: cur[i - 1] as number, op: cur[i] as Op, b: cur[i + 1] as number, r: calc(cur[i - 1] as number, cur[i] as Op, cur[i + 1] as number) };
      setHist([...hist, d]);
      setCur(n);
      setMsg(n.length === 1 ? { ok: true, text: `Kész! Az eredmény: ${n[0]}.` } : { ok: true, text: 'Jó! Melyik jön most?' });
      return;
    }
    const inBracket = cur.includes('(');
    if (inBracket) setMsg({ ok: false, text: 'Várj! Először a zárójelben lévő műveletet végezd el.' });
    else if (!high(cur[i]) && cur.some((t) => high(t))) setMsg({ ok: false, text: 'Várj! Előbb a szorzás és az osztás jön.' });
    else setMsg({ ok: false, text: 'Balról jobbra haladj! Van előtte egy művelet, ami előbb jön.' });
  };
  const newStepper = () => {
    const t = genExpr(Math.random() < 0.5 ? 'bracket' : 'any');
    // néha egy harmadik lépés: + vagy − egy kis számmal
    const extra = Math.random() < 0.4 && valueOf(t) <= 800 ? [...t, '+' as Tok, 10 * Math.floor(1 + Math.random() * 15)] : t;
    setStart(extra);
    setCur(extra);
    setHist([]);
    setMsg(null);
  };
  const last = hist[hist.length - 1];

  // Labor II – zárójel-kapcsoló
  const [bt, setBt] = useState<BracketTask>(() => ({
    a: 800,
    b: 300,
    c: 200,
    o1: '−',
    o2: '+',
    target: 300,
    forms: [
      { key: 'none', text: '800 − 300 + 200', value: 700 },
      { key: 'left', text: '(800 − 300) + 200', value: 700 },
      { key: 'right', text: '800 − (300 + 200)', value: 300 }
    ]
  }));
  const [picked, setPicked] = useState<string | null>(null);
  const pickedForm = bt.forms.find((f) => f.key === picked);
  const newBracket = () => {
    setBt(genBracketTask());
    setPicked(null);
  };

  // Labor I, rossz eredmény-tipp (beírós rész a lépkedő alatt)
  const [val, setVal] = useState('');
  const [res, setRes] = useState<null | 'ok' | 'naive' | 'nob' | 'bad'>(null);
  const exVal = valueOf(start);
  const check = () => {
    const v = Number(val);
    if (v === exVal) setRes('ok');
    else if (naive(start) !== null && v === naive(start)) setRes('naive');
    else if (noBrackets(start) !== null && v === noBrackets(start)) setRes('nob');
    else setRes('bad');
  };

  return (
    <TheoryTemplate
      topicId="g3-written-ops-1000"
      subtopicId="muveleti-sorrend"
      grade={3}
      chapterId="irasbeli-muveletek-1000-ig"
      title="3. A műveletek sorrendje és a zárójelek"
      subtitle="Mit számolunk először 1000-ig? Zárójel, aztán szorzás és osztás, végül összeadás és kivonás."
      badge="3. OSZTÁLY • XII. ÍRÁSBELI MŰVELETEK 1000-IG • TANANYAG"
      themeColor="orange"
      pdfFilename="3_osztaly_muveletek_sorrendje_1000_tananyag.pdf"
      practiceTitle="Készen állsz a nagy műveletsorokra?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-orange-50/90 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/80 text-center font-mono text-base font-black text-orange-900 dark:text-orange-200">
              (930 − 570) : 6 = 360 : 6 = 60
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>1. a <strong>zárójel</strong> belseje</li>
              <li>2. a <strong>szorzás</strong> és az <strong>osztás</strong></li>
              <li>3. az <strong>összeadás</strong> és a <strong>kivonás</strong></li>
              <li>Egyforma lépcsőn: <strong>balról jobbra</strong>.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 120–121. o." badgeColor="orange">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>Már tudod a sorrendet 100-ig. Most <strong>nagyobb számokkal</strong> számolunk, egészen 1000-ig.</p>
          <p>A szabály ugyanaz. A nagy számokat <strong>írásban</strong> adod össze és vonod ki.</p>
        </div>
        <OrderOps1000RuleSvg />
      </TheorySection>

      <TheorySection title="2. Csak összeadás és kivonás" badge="Balról jobbra" badgeColor="sky">
        <OrderOps1000ChainSvg />
        <TheoryCard title="Nézzük meg együtt!" badge="645 − 280 + 136" badgeColor="sky">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
            <div>
              <p className="text-sm text-slate-700 font-bold mb-1">1. lépés: 645 − 280</p>
              <ColStep a={645} op="−" b={280} result={365} />
              <p className="text-xs text-slate-600 mt-1">0-hoz 5, az 5. 8-hoz 6, az 14, maradt 1. 2 meg 1 az 3, 3-hoz 3, az 6.</p>
            </div>
            <div>
              <p className="text-sm text-slate-700 font-bold mb-1">2. lépés: 365 + 136</p>
              <ColStep a={365} op="+" b={136} result={501} />
              <p className="text-xs text-slate-600 mt-1">Az eredmény: <strong>501</strong>.</p>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      <TheorySection title="3. Szorzás és osztás előbb" badge="Fejben" badgeColor="purple">
        <p className="text-sm text-slate-700">A szorzást és az osztást fejben végzed. A szorzótábla segít: 3 · 9 = 27, ezért 30 · 9 = 270.</p>
        <TheoryTable
          headers={['Műveletsor', '1. lépés', '2. lépés', 'Eredmény']}
          rows={[
            ['850 − 30 · 9', '30 · 9 = 270', '850 − 270 = 580', '580'],
            ['470 + 560 : 8', '560 : 8 = 70', '470 + 70 = 540', '540'],
            ['6 · 90 + 275', '6 · 90 = 540', '540 + 275 = 815', '815'],
            ['1000 − 4 · 200', '4 · 200 = 800', '1000 − 800 = 200', '200']
          ]}
        />
      </TheorySection>

      <TheorySection title="4. A zárójel: azt számold először!" badge="Zárójel" badgeColor="orange">
        <OrderOps1000BracketFirstSvg />
        <TheoryCallout type="tip" title="Szabály">
          Ami <strong>zárójelben</strong> van, azt végezd el <strong>legelőször</strong>. Akkor is, ha kivonás vagy összeadás.
        </TheoryCallout>
        <OrderOps1000BracketCompareSvg />
        <p className="text-sm text-slate-700">A zárójel megváltoztathatja az eredményt. Ezért mindig figyeld meg, hol van!</p>
      </TheorySection>

      <TheorySection title="5. Nézzük meg együtt! Vásárlás" badge="Mintapélda" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <OrderOps1000ShopSvg />
          <TheoryCard title="Mennyi pénz marad?" badge="1000 − (385 + 240)" badgeColor="amber">
            <p className="text-sm text-slate-700">1000 Ft-od van. Veszel egy 385 Ft-os füzetet és egy 240 Ft-os tollat.</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 mt-2">
              <li>Ennyit fizetsz: 385 + 240 = 625</li>
              <li>Ennyi marad: 1000 − 625 = 375</li>
              <li>Egy műveletsorral: <strong>1000 − (385 + 240) = 375</strong></li>
            </ul>
            <p className="text-sm text-slate-700 mt-2"><strong>Válasz:</strong> 375 Ft marad.</p>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="6. Ügyes számolás zárójellel" badge="Gondolkodj!" badgeColor="emerald">
        <TheoryCard title="Keress kerek számot!" badge="367 + 148 + 52" badgeColor="emerald">
          <p className="text-sm text-slate-700">Ha csak összeadás van, a zárójelet bárhová teheted. Az összeg nem változik.</p>
          <p className="text-sm text-slate-700 mt-2 font-mono font-bold">367 + (148 + 52) = 367 + 200 = 567</p>
          <p className="text-sm text-slate-700 mt-1">A 148 + 52 kerek 200. Így fejben is megy!</p>
        </TheoryCard>
        <TheoryCallout type="warning" title="Kivonásnál nem szabad!">
          700 − 250 − 100 = 350, de 700 − (250 − 100) = 550. Kivonásnál a zárójel megváltoztatja az eredményt.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="7. Vigyázz!" badge="Csapda" badgeColor="rose">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="850 − 30 · 9"
            wrong="850 − 30 = 820, 820 · 9 = ?"
            wrongExplanation="Ez balról jobbra ment, pedig a szorzás jön először. Ráadásul 1000-nél is több lenne."
            correct="30 · 9 = 270, 850 − 270 = 580"
            correctExplanation="Először a szorzás, utána a kivonás."
            tip="Keresd meg először a · és a : jelet!"
          />
          <TheoryTrapBox
            title="700 − (250 − 100)"
            wrong="700 − 250 = 450, 450 − 100 = 350"
            wrongExplanation="Itt nem nézte meg a zárójelet."
            correct="250 − 100 = 150, 700 − 150 = 550"
            correctExplanation="A zárójel belseje az első lépés."
            tip="Karikázd be a zárójelet, és azzal kezdd!"
          />
        </div>
      </TheorySection>

      {/* Labor I */}
      <TheorySection title="8. Labor I: Melyiket számolod először?" badge="Labor" badgeColor="orange">
        <div className="bg-white border-2 border-orange-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <p className="text-sm text-orange-900 bg-orange-50 rounded-xl p-3">Koppints arra a műveleti jelre, amelyiket <strong>most</strong> kell elvégezni!</p>
          <div className="flex flex-wrap items-center justify-center gap-1.5 py-2">
            {cur.map((t, i) =>
              isOp(t) ? (
                <button
                  key={i}
                  onClick={() => tap(i)}
                  className="w-14 h-14 rounded-2xl bg-orange-100 border-2 border-orange-300 text-3xl font-black text-orange-800 hover:bg-orange-200"
                  aria-label={`művelet ${t}`}
                >
                  {t}
                </button>
              ) : (
                <span key={i} className={`text-3xl font-black px-0.5 ${t === '(' || t === ')' ? 'text-orange-600' : 'text-slate-800'}`}>{t}</span>
              )
            )}
          </div>
          {msg && <div className={`rounded-xl p-2 text-center text-sm font-bold ${msg.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{msg.text}</div>}
          {hist.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
              <div className="bg-slate-50 rounded-xl p-3 text-base font-mono text-slate-700 space-y-1">
                <div className="text-xs font-sans font-bold text-slate-500">A feladat: {show(start)}</div>
                {hist.map((h, i) => (
                  <div key={i}>
                    {i + 1}. lépés: {h.a} {h.op} {h.b} = {h.r}
                  </div>
                ))}
              </div>
              {last && (last.op === '+' || last.op === '−') && Math.max(last.a, last.b) >= 100 && (
                <div className="bg-slate-50 rounded-xl p-2">
                  <div className="text-xs font-bold text-slate-500 text-center">Írásban:</div>
                  <ColStep a={last.a} op={last.op} b={last.b} result={last.r} />
                </div>
              )}
            </div>
          )}
          <div className="flex flex-wrap items-center justify-center gap-2 border-t pt-3">
            <span className="text-sm font-bold text-slate-600">Vagy számold ki egyben:</span>
            <input
              value={val}
              onChange={(e) => {
                setVal(e.target.value.replace(/[^0-9]/g, ''));
                setRes(null);
              }}
              inputMode="numeric"
              className="w-24 rounded-xl border-2 border-orange-300 px-2 py-2 text-center text-2xl font-black"
              aria-label="eredmény"
            />
            <button onClick={check} className="px-4 py-2 rounded-xl bg-orange-600 text-white text-base font-bold min-h-[48px]">Ellenőrzés</button>
          </div>
          {res === 'ok' && <div className="rounded-xl p-2 text-center bg-emerald-100 text-emerald-800 text-sm font-bold">Szuper! Jó sorrendben számoltál.</div>}
          {res === 'naive' && <div className="rounded-xl p-2 text-center bg-rose-100 text-rose-800 text-sm font-bold">Csak balról jobbra számoltál. Nézd meg a zárójelet és a · : jelet!</div>}
          {res === 'nob' && <div className="rounded-xl p-2 text-center bg-rose-100 text-rose-800 text-sm font-bold">Elfelejtetted a zárójelet! A zárójel belseje az első lépés.</div>}
          {res === 'bad' && <div className="rounded-xl p-2 text-center bg-rose-100 text-rose-800 text-sm font-bold">Még nem jó. Koppintással lépésenként is megnézheted.</div>}
          <button
            onClick={() => {
              newStepper();
              setVal('');
              setRes(null);
            }}
            className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-base font-bold min-h-[48px]"
          >
            Új feladat
          </button>
        </div>
      </TheorySection>

      {/* Labor II */}
      <TheorySection title="9. Labor II: Hová tegyük a zárójelet?" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <p className="text-sm text-purple-900 bg-purple-50 rounded-xl p-3">
            Melyik írásmódnál lesz az eredmény <strong className="text-xl">{bt.target}</strong>? Válassz!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {bt.forms.map((f) => {
              const isPicked = picked === f.key;
              const good = f.value === bt.target;
              return (
                <button
                  key={f.key}
                  onClick={() => setPicked(f.key)}
                  className={`min-h-[64px] rounded-2xl border-2 px-3 py-2 text-xl font-black ${
                    isPicked ? (good ? 'bg-emerald-100 border-emerald-500 text-emerald-900' : 'bg-rose-100 border-rose-500 text-rose-900') : 'bg-purple-50 border-purple-300 text-slate-800 hover:bg-purple-100'
                  }`}
                >
                  {f.text}
                  {picked && <div className="text-sm font-bold mt-1">= {f.value}</div>}
                </button>
              );
            })}
          </div>
          {pickedForm && pickedForm.value === bt.target && (
            <div className="rounded-xl p-2 text-center bg-emerald-100 text-emerald-800 text-sm font-bold">
              Ügyes! {steps(parse(pickedForm.text)).map((s) => s.line).join(', ')}.
              {bt.forms.filter((f) => f.value === bt.target).length > 1 && ' Itt két írásmód is jó: a zárójel ott nem változtat semmit.'}
            </div>
          )}
          {pickedForm && pickedForm.value !== bt.target && (
            <div className="rounded-xl p-2 text-center bg-rose-100 text-rose-800 text-sm font-bold">
              Ennek az eredménye {pickedForm.value}: {steps(parse(pickedForm.text)).map((s) => s.line).join(', ')}. Próbálj egy másikat!
            </div>
          )}
          <button onClick={newBracket} className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-base font-bold min-h-[48px]">
            Új feladat
          </button>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default OrderOps1000G3Theory;
