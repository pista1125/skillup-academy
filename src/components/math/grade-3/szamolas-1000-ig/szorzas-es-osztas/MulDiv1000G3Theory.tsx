import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  MulDiv1000TenHundredSvg,
  MulDiv1000StairSvg,
  MulDiv1000FlatsSvg,
  MulDiv1000SharingSvg,
  MulDiv1000HopsSvg,
  MulDiv1000ExchangeSvg
} from './MulDiv1000G3Figures';
import { FONT, Coin, Rod, RodGroups, FlatGroups, flatGroupsHeight, makeStairTask, makeExchangeTask, StairKind, StairTask, ExchangeTask } from './MulDiv1000G3Parts';

const OptButton: React.FC<{ v: number | string; onClick: () => void; state?: 'ok' | 'bad' | null }> = ({ v, onClick, state }) => (
  <button
    onClick={onClick}
    className={`px-4 py-3 rounded-xl text-lg font-black min-h-[52px] min-w-[64px] border-2 transition-colors ${
      state === 'ok' ? 'bg-emerald-500 border-emerald-700 text-white' : state === 'bad' ? 'bg-rose-100 border-rose-400 text-rose-700' : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
    }`}
  >
    {v}
  </button>
);

/** A lépcső képe: szorzásnál csoportok, osztásnál a szétosztandó rudak. */
const StairPicture: React.FC<{ t: StairTask }> = ({ t }) => {
  if (t.kind === 'szazas') {
    const h = flatGroupsHeight(t.a, t.b, 344, 26) + 22;
    return (
      <svg viewBox={`0 0 360 ${h}`} className="w-full h-auto max-w-xl mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
        <FlatGroups groups={t.a} per={t.b} x0={8} width={344} y={14} s={26} />
      </svg>
    );
  }
  if (t.kind === 'tizes') {
    const gw = t.b * 7.5 + 7.5;
    const pl = Math.max(1, Math.min(t.a, Math.floor(350 / (gw + 6))));
    const h = 14 + Math.ceil(t.a / pl) * 52 + 4;
    return (
      <svg viewBox={`0 0 360 ${h}`} className="w-full h-auto max-w-xl mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
        <RodGroups groups={t.a} per={t.b} x0={8} width={344} y={14} rodH={38} />
      </svg>
    );
  }
  const rods = t.a * t.b;
  const perRow = 20;
  const h = 14 + Math.ceil(rods / perRow) * 38;
  return (
    <svg viewBox={`0 0 360 ${h}`} className="w-full h-auto max-w-xl mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {Array.from({ length: rods }).map((_, i) => (
        <Rod key={i} x={22 + (i % perRow) * 16} y={10 + Math.floor(i / perRow) * 38} w={9} h={32} />
      ))}
    </svg>
  );
};

/** A pénzváltó képe: a már kirakott érmék. */
const CoinPile: React.FC<{ coin: number; n: number }> = ({ coin, n }) => {
  const perRow = 5;
  const rows = Math.max(1, Math.ceil(n / perRow));
  const h = 20 + rows * 46;
  return (
    <svg viewBox={`0 0 360 ${h}`} className="w-full h-auto max-w-md mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height={h - 2} rx="12" fill="#fffbeb" stroke="#fcd34d" />
      {n === 0 && <text x="180" y={h / 2 + 5} textAnchor="middle" fontSize="14" fill="#a16207">Még nincs itt érme.</text>}
      {Array.from({ length: n }).map((_, i) => (
        <Coin key={i} cx={60 + (i % perRow) * 60} cy={32 + Math.floor(i / perRow) * 46} v={coin} r={20} />
      ))}
    </svg>
  );
};

const KIND_LABEL: Record<StairKind, string> = {
  tizes: 'Szorzás tízessel',
  szazas: 'Szorzás százassal',
  reszek: 'Osztás: mennyi jut egyre?',
  benn: 'Osztás: hányszor van meg?'
};

export const MulDiv1000G3Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // ---- Labor I: Szorzótábla-lépcső ----
  const [st, setSt] = useState<StairTask>(() => ({
    kind: 'tizes',
    a: 6,
    b: 8,
    small: '6 · 8',
    smallAns: 48,
    smallOpts: [48, 54, 42, 14],
    big: '6 · 80',
    bigAns: 480,
    bigOpts: [480, 48, 540, 86]
  }));
  const [stStep, setStStep] = useState<number>(0);
  const [stBad, setStBad] = useState<number | null>(null);
  const [stMsg, setStMsg] = useState<string>('');
  const newStair = (kind: StairKind) => {
    setSt(makeStairTask(kind));
    setStStep(0);
    setStBad(null);
    setStMsg('');
  };
  const pickStair = (x: number) => {
    if (stStep > 1) return;
    const ans = stStep === 0 ? st.smallAns : st.bigAns;
    if (x === ans) {
      setStStep(stStep + 1);
      setStBad(null);
      setStMsg('');
      return;
    }
    setStBad(x);
    if (stStep === 0) {
      setStMsg('Ez a szorzótábla! Gondold végig még egyszer.');
      return;
    }
    if (st.kind === 'tizes') {
      if (x === st.smallAns) setStMsg(`Ne hagyd le a nullát! ${st.a} · ${st.b} tízes = ${st.smallAns} tízes.`);
      else if (x === st.bigAns * 10) setStMsg('Egy nulla elég! Tízessel szoroztál, nem százassal.');
      else setStMsg(`Használd a lépcsőt: ${st.small} = ${st.smallAns}, tehát ${st.smallAns} tízes.`);
    } else if (st.kind === 'szazas') {
      if (x === st.smallAns * 10) setStMsg(`Százasokkal szorzol! ${st.smallAns} százas = ${st.bigAns}. Két nulla kell.`);
      else if (x === st.smallAns) setStMsg(`Ne hagyd le a nullákat! ${st.smallAns} százas = ${st.bigAns}.`);
      else setStMsg(`Számold meg a piros lapokat! Egy lap 100.`);
    } else if (st.kind === 'reszek') {
      if (x === st.smallAns) setStMsg(`Ez csak a tízesek száma. ${st.smallAns} tízes = ${st.bigAns}.`);
      else setStMsg(`${st.a * st.b} tízes : ${st.a} = ${st.smallAns} tízes. Ellenőrizz szorzással!`);
    } else {
      if (x === st.smallAns * 10) setStMsg('Ez túl sok! Itt azt kérdezzük, hányszor van meg. Az nem tízes, hanem darab.');
      else setStMsg(`${st.a * st.b} tízesben hányszor van meg ${st.a} tízes? Ellenőrizz: ? · ${st.a * 10} = ${st.a * st.b * 10}.`);
    }
  };

  // ---- Labor II: Pénzváltó ----
  const [ex, setEx] = useState<ExchangeTask>(() => ({ total: 600, coin: 200, count: 3, countOpts: [3, 30, 4, 60] }));
  const [laid, setLaid] = useState<number>(0);
  const [exBad, setExBad] = useState<number | null>(null);
  const [exDone, setExDone] = useState<boolean>(false);
  const [exMsg, setExMsg] = useState<string>('');
  const newEx = () => {
    setEx(makeExchangeTask());
    setLaid(0);
    setExBad(null);
    setExDone(false);
    setExMsg('');
  };
  const sum = laid * ex.coin;
  const pickEx = (x: number) => {
    if (exDone) return;
    if (x === ex.count) {
      setExDone(true);
      setExBad(null);
      setExMsg('');
      return;
    }
    setExBad(x);
    if (x === ex.total / 10) setExMsg('Ezt a 10 forintosokkal kapnád. Számold meg a kirakott érméket!');
    else if (x === ex.count * 10) setExMsg('Nem a forintokat kérdezzük, hanem az érméket. Számold meg őket!');
    else setExMsg('Számold meg pontosan a kirakott érméket!');
  };

  return (
    <TheoryTemplate
      topicId="g3-count-1000"
      subtopicId="szorzas-es-osztas"
      grade={3}
      chapterId="szamolas-1000-ig"
      title="4. Szorzás és osztás"
      subtitle="Szorzás és osztás 10-zel és 100-zal, kerek tízesek és kerek százasok szorzása és osztása 1000-ig, a kétféle osztás, pénzváltás."
      badge="3. OSZTÁLY • XI. SZÁMOLÁS 0-TÓL 1000-IG • TANANYAG"
      themeColor="indigo"
      pdfFilename="3_osztaly_szorzas_es_osztas_1000_ig_tananyag.pdf"
      practiceTitle="Készen állsz? Számoljunk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — A SZORZÓTÁBLA SEGÍT',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-center font-mono text-base font-black text-indigo-900 dark:text-indigo-200">
              3 · 3 = 9 → 3 · 30 = 90 → 3 · 300 = 900
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Számolj <strong>tízesekkel</strong> vagy <strong>százasokkal</strong>.</li>
              <li>720 : 8 = 90, mert 72 tízes : 8 = 9 tízes.</li>
              <li>Ellenőrizz szorzással: 8 · 90 = 720.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 114–115. o." badgeColor="indigo">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Szorzunk és osztunk 10-zel és 100-zal.</p>
          <p>Kerek tízeseket és kerek százasokat szorzunk és osztunk.</p>
          <p>Minden eredmény legfeljebb 1000.</p>
        </div>
      </TheorySection>

      {/* 2. Szorzás 10-zel és 100-zal */}
      <TheorySection title="2. Szorzás 10-zel és 100-zal" badge="Tízszeres, százszoros" badgeColor="amber">
        <MulDiv1000TenHundredSvg />
        <TheoryTable
          headers={['Művelet', 'Így gondold', 'Eredmény']}
          rows={[
            ['8 · 10', '8 tízes', '80'],
            ['8 · 100', '8 százas', '800'],
            ['a 63 tízszerese', '63 · 10 = 63 tízes', '630'],
            ['10 · 100', '10 százas', '1000']
          ]}
        />
        <TheoryCallout type="tip" title="Ügyes trükk">
          10-zel szorzol: egy 0 kerül a végére (63 · 10 = 630). 100-zal szorzol: két 0 kerül a végére (5 · 100 = 500).
        </TheoryCallout>
      </TheorySection>

      {/* 3. Osztás 10-zel és 100-zal */}
      <TheorySection title="3. Osztás 10-zel és 100-zal" badge="Beváltás" badgeColor="rose">
        <MulDiv1000ExchangeSvg />
        <TheoryTable
          headers={['Kérdés', 'Művelet', 'Válasz']}
          rows={[
            ['Hány 100 Ft-os 700 Ft?', '700 : 100', '7'],
            ['Hány 10 Ft-os 700 Ft?', '700 : 10', '70'],
            ['Hány 10 Ft-os 1000 Ft?', '1000 : 10', '100']
          ]}
        />
      </TheorySection>

      {/* 4. A szorzótábla segít */}
      <TheorySection title="4. A szorzótábla segít" badge="Lépcső" badgeColor="sky">
        <MulDiv1000StairSvg />
        <MulDiv1000FlatsSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Tízesekkel" badge="9 · 80" badgeColor="emerald">
            <p className="text-sm text-slate-700">9 · 8 = 72, tehát 9 · 8 tízes = 72 tízes. <strong>9 · 80 = 720</strong>.</p>
          </TheoryCard>
          <TheoryCard title="Százasokkal" badge="5 · 200" badgeColor="orange">
            <p className="text-sm text-slate-700">5 · 2 = 10, tehát 5 · 2 százas = 10 százas. <strong>5 · 200 = 1000</strong>.</p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Kétféle osztás */}
      <TheorySection title="5. Kétféle osztás" badge="Részekre, bennfoglalás" badgeColor="teal">
        <MulDiv1000SharingSvg />
        <TheoryCard title="Részekre osztás" badge="560 : 7 = 80" badgeColor="emerald">
          <p className="text-sm text-slate-700">A 560-at 7 egyforma részre osztod. Egy részbe <strong>80</strong> jut. Kérdés: „Mennyi jut egyre?”</p>
        </TheoryCard>
        <MulDiv1000HopsSvg />
        <TheoryCard title="Bennfoglalás" badge="1000 : 200 = 5" badgeColor="purple">
          <p className="text-sm text-slate-700">200-asával ugrálsz az 1000-ig. <strong>5</strong> ugrás kell. Kérdés: „Hányszor van meg?”, „Hány darab kell?”</p>
        </TheoryCard>
      </TheorySection>

      {/* 6. Nézzük meg együtt */}
      <TheorySection title="6. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="indigo">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="A) Hány gyöngy?" badge="Szorzás" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Egy dobozban 70 gyöngy van. Van 9 doboz.</li>
              <li>9 · 70 = ? Gondold: 9 · 7 = 63.</li>
              <li>9 · 70 = <strong>630 gyöngy</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Hány zacskó kell?" badge="Bennfoglalás" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Van 480 cukor. Egy zacskóba 60 kerül.</li>
              <li>480 : 60 = ? Gondold: 48 : 6 = 8.</li>
              <li><strong>8 zacskó kell.</strong> Ellenőrzés: 8 · 60 = 480.</li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryCard title="C) Előbb a szorzás!" badge="Műveleti sorrend" badgeColor="amber">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
            <li>Van 1000 Ft-od. Veszel 4 tollat, mindegyik 90 Ft. Mennyi marad?</li>
            <li>1000 − 4 · 90. Előbb szorzunk: 4 · 90 = 360.</li>
            <li>Aztán kivonunk: 1000 − 360 = <strong>640 Ft</strong> marad.</li>
          </ul>
        </TheoryCard>
      </TheorySection>

      {/* 7. Vigyázz */}
      <TheorySection title="7. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Elveszett nulla"
          wrong="8 · 90 = 72"
          wrongExplanation="8 · 9 = 72, de itt 9 tízest szorzunk! 72 tízes lesz."
          correct="8 · 90 = 720"
          correctExplanation="8 · 9 tízes = 72 tízes = 720."
          tip="Becsüld meg! 8 · 90 biztosan több, mint 8 · 10 = 80."
        />
        <TheoryTrapBox
          title="Hány nulla kell?"
          wrong="4 · 200 = 80"
          wrongExplanation="200 két nullára végződik: százasokkal szorzunk, nem tízesekkel."
          correct="4 · 200 = 800"
          correctExplanation="4 · 2 százas = 8 százas = 800."
        />
        <TheoryTrapBox
          title="640 : 8 és 640 : 80 nem ugyanaz!"
          wrong="640 : 80 = 80"
          wrongExplanation="A 80 a 640 : 8 eredménye. A 80 tízszer akkora, mint a 8, ezért kevesebbszer van meg."
          correct="640 : 80 = 8"
          correctExplanation="64 tízes : 8 tízes = 8. Ellenőrzés: 8 · 80 = 640."
        />
      </TheorySection>

      {/* 8. Labor I */}
      <TheorySection title="8. Labor I: Szorzótábla-lépcső" badge="Labor" badgeColor="teal">
        <div className="bg-white border-2 border-teal-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            {(['tizes', 'szazas', 'reszek', 'benn'] as StairKind[]).map((k) => (
              <button key={k} onClick={() => newStair(k)} className={`px-3 py-2 rounded-xl text-sm font-bold min-h-[48px] ${st.kind === k ? 'bg-teal-600 text-white' : 'bg-teal-50 text-teal-900 border border-teal-200'}`}>
                {KIND_LABEL[k]}
              </button>
            ))}
          </div>
          <div className="text-sm font-bold text-teal-900 bg-teal-50 rounded-xl px-3 py-2 text-center">
            {st.kind === 'szazas' ? 'Egy piros lap = 100' : 'Egy kék rúd = 10'}
          </div>
          <StairPicture t={st} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-center">
            {[st.small, st.big].map((txt, i) => (
              <div key={i} className={`rounded-xl p-2 text-lg font-black ${stStep > i ? 'bg-emerald-100 text-emerald-800' : stStep === i ? 'bg-teal-50 text-teal-900 ring-2 ring-teal-300' : 'bg-slate-50 text-slate-400'}`}>
                {i === 0 ? '1. lépcső: ' : '2. lépcső: '}
                {txt} = {stStep > i ? (i === 0 ? st.smallAns : st.bigAns) : '?'}
              </div>
            ))}
          </div>
          {stStep < 2 && (
            <>
              <div className="text-center text-sm text-slate-700">{stStep === 0 ? 'Először a szorzótábla:' : 'Most a nagy számok:'}</div>
              <div className="flex flex-wrap gap-2 justify-center">
                {(stStep === 0 ? st.smallOpts : st.bigOpts).map((x) => (
                  <OptButton key={`${stStep}-${x}`} v={x} onClick={() => pickStair(x)} state={stBad === x ? 'bad' : null} />
                ))}
              </div>
            </>
          )}
          {stMsg && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">{stMsg}</div>}
          {stStep === 2 && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              Szuper! {st.small} = {st.smallAns}, ezért {st.big} = {st.bigAns}.
              <button onClick={() => newStair(st.kind)} className="ml-2 underline">Új feladat</button>
            </div>
          )}
        </div>
      </TheorySection>

      {/* 9. Labor II */}
      <TheorySection title="9. Labor II: Pénzváltó" badge="Labor" badgeColor="amber">
        <div className="bg-white border-2 border-amber-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <button onClick={newEx} className="px-4 py-2 rounded-xl bg-amber-500 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <div className="text-sm font-bold text-amber-900 bg-amber-50 rounded-xl px-3 py-2">Eddig: {sum} Ft</div>
          </div>
          <div className="text-center text-base font-black text-amber-900 bg-amber-50 rounded-xl px-3 py-2">
            Váltsd be a {ex.total} Ft-ot {ex.coin} forintosokra!
          </div>
          <CoinPile coin={ex.coin} n={laid} />
          {sum < ex.total && (
            <div className="flex justify-center">
              <button onClick={() => setLaid(laid + 1)} className="px-5 py-3 rounded-xl bg-amber-500 text-white text-base font-black min-h-[52px]">
                Tegyél le egy {ex.coin} forintost!
              </button>
            </div>
          )}
          {sum === ex.total && (
            <>
              <div className="text-center text-xl font-black text-slate-800">
                {ex.total} : {ex.coin} = {exDone ? <span className="text-emerald-600">{ex.count}</span> : '?'}
              </div>
              {!exDone && (
                <>
                  <div className="text-center text-sm text-slate-700">Pont {ex.total} Ft lett! Hány érmét tettél le?</div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {ex.countOpts.map((x) => (
                      <OptButton key={x} v={x} onClick={() => pickEx(x)} state={exBad === x ? 'bad' : null} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
          {exMsg && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">{exMsg}</div>}
          {exDone && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              Ügyes vagy! {ex.total} : {ex.coin} = {ex.count}. Ellenőrzés: {ex.count} · {ex.coin} = {ex.total}.
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default MulDiv1000G3Theory;
