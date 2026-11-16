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
  MultiplyShiftSvg,
  DivideShiftSvg,
  PiggyBanksSvg,
  CoinArraySvg,
  ProductPyramidSvg,
  MushroomBasketsSvg,
  CoinGrid
} from './MulDiv10000Figures';

const fmt = (n: number) => (n >= 10000 ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : String(n));

const START_NUMBERS = [9, 38, 47, 92, 60, 380, 800, 1500, 4700, 9000];
const OPS: { label: string; f: number; mul: boolean }[] = [
  { label: '· 10', f: 10, mul: true },
  { label: '· 100', f: 100, mul: true },
  { label: '· 1000', f: 1000, mul: true },
  { label: ': 10', f: 10, mul: false },
  { label: ': 100', f: 100, mul: false },
  { label: ': 1000', f: 1000, mul: false }
];
const PLACE_NAMES = ['T', 'E', 'sz', 't', 'e'];
const PLACE_COLORS = ['#a21caf', '#16a34a', '#dc2626', '#0284c7', '#ca8a04'];

const digitsOf = (n: number) => {
  const s = String(n).padStart(5, ' ');
  return s.split('').map((c) => (c === ' ' ? '' : c));
};

export const MulDiv10000Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: nullák vándorlása
  const [start, setStart] = useState<number>(9);
  const [opIdx, setOpIdx] = useState<number>(1);
  const [guess, setGuess] = useState<string>('');
  const [checked, setChecked] = useState<null | boolean>(null);
  const op = OPS[opIdx];
  const raw = op.mul ? start * op.f : start / op.f;
  const valid = op.mul ? raw <= 10000 : Number.isInteger(raw);
  const reset = () => {
    setGuess('');
    setChecked(null);
  };

  // Labor II: szorzás-osztás család
  const [rows, setRows] = useState<number>(4);
  const [cols, setCols] = useState<number>(8);
  const [coin, setCoin] = useState<number>(100);
  const [hideIdx, setHideIdx] = useState<number>(0);
  const [famGuess, setFamGuess] = useState<string>('');
  const [famChecked, setFamChecked] = useState<null | boolean>(null);
  const total = rows * cols * coin;
  const famOk = total <= 10000;
  const facts: { text: string; ans: number }[] = [
    { text: `${rows} · ${cols * coin} =`, ans: total },
    { text: `${cols} · ${rows * coin} =`, ans: total },
    { text: `${fmt(total)} : ${rows} =`, ans: cols * coin },
    { text: `${fmt(total)} : ${cols} =`, ans: rows * coin },
    { text: `${fmt(total)} : ${cols * coin} =`, ans: rows },
    { text: `${fmt(total)} : ${rows * coin} =`, ans: cols }
  ];
  const changeFam = (fn: () => void) => {
    fn();
    setFamGuess('');
    setFamChecked(null);
  };

  return (
    <TheoryTemplate
      topicId="g4-count-10k"
      subtopicId="szorzas-osztas-10000-ig"
      grade={4}
      chapterId="szamolas-10000-ig"
      title="12. Szorzás és osztás 10 000-ig"
      subtitle="Szorzás és osztás 10-zel, 100-zal, 1000-rel, és kerek számok szorzása, osztása fejben."
      badge="4. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 10 000-IG • TANANYAG"
      themeColor="purple"
      pdfFilename="4_osztaly_szorzas_osztas_10000_ig_tananyag.pdf"
      practiceTitle="Készen állsz a szorzásra és osztásra?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A NULLÁK VÁNDORLÁSA',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-purple-50/90 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800/80 text-center font-mono text-base font-black text-purple-900 dark:text-purple-200">
              9 · 10 = 90 • 9 · 100 = 900 • 9 · 1000 = 9000 • 1500 : 100 = 15
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li><strong>Szorzás</strong> 10-zel, 100-zal, 1000-rel: a szám végére 1, 2, 3 nullát írunk.</li>
              <li><strong>Osztás</strong> 10-zel, 100-zal, 1000-rel: a szám végéről 1, 2, 3 nullát elhagyunk.</li>
              <li>Kerek számoknál: 3 · 600 → 3 · 6 = 18, tehát 1800. 2400 : 6 → 24 : 6 = 4, tehát 400.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 48. o." badgeColor="purple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Teó perselyében <strong>10</strong> fabatkások, Tóni perselyében <strong>100</strong> fabatkások, Tódiéban <strong>1000</strong> fabatkások vannak. Ha mindegyikben 5 érme van: Teónak 5 · 10 = 50, Tóninak 5 · 100 = 500, Tódinak 5 · 1000 = 5000 fabatkája van.
            </p>
            <p>
              Visszafelé: ha Tódinak 6000 fabatkája van, akkor 6000 : 1000 = <strong>6</strong> érméje van.
            </p>
          </div>
          <PiggyBanksSvg />
        </div>
      </TheorySection>

      {/* 2. 10, 100, 1000 */}
      <TheorySection title="2. Szorzás és osztás 10-zel, 100-zal, 1000-rel" badge="Tankönyv 48. o." badgeColor="emerald">
        <MultiplyShiftSvg />
        <DivideShiftSvg />
        <TheoryTable
          headers={['Szám', '· 10', '· 100', '· 1000']}
          rows={[
            ['5', '50', '500', '5000'],
            ['7', '70', '700', '7000'],
            ['47', '470', '4700', '–'],
            ['80', '800', '8000', '–']
          ]}
        />
        <TheoryCallout type="info" title="Miért „–”?">
          47 · 1000 = 47 000 – ez már nagyobb 10 000-nél, ilyen nagy számokkal még nem számolunk.
        </TheoryCallout>
      </TheorySection>

      {/* 3. Kerek számok */}
      <TheorySection title="3. Kerek számok szorzása és osztása" badge="Tankönyv 49. o." badgeColor="orange">
        <CoinArraySvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Szorzás kerek számmal" badge="9. a) feladat" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>3 · 600: 3 · 6 sz = 18 sz = <strong>1800</strong></li>
              <li>400 · 9: 4 sz · 9 = 36 sz = <strong>3600</strong></li>
              <li>30 · 60: 3 · 6 = 18, és még 2 nulla: <strong>1800</strong></li>
              <li>70 · 40: 7 · 4 = 28, és még 2 nulla: <strong>2800</strong></li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Osztás kerek számmal" badge="9. b) feladat" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>3600 : 6: 36 sz : 6 = 6 sz = <strong>600</strong></li>
              <li>2800 : 4: 28 sz : 4 = 7 sz = <strong>700</strong></li>
              <li>2400 : 60: 240 t : 6 t = <strong>40</strong></li>
              <li>6400 : 80: 640 : 8 = <strong>80</strong></li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Nézzük meg együtt */}
      <TheorySection title="4. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <MushroomBasketsSvg />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <TheoryCard title="A) Gombák a kosarakban" badge="7. feladat" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Egy gomba 10 dkg, ezért 150 dkg = 150 : 10 = 15 gomba.</li>
              <li>Tóni: 15 : 5 = <strong>3 gomba</strong> kosaranként.</li>
              <li>Tódi: 15 : 3 = <strong>5 gomba</strong> kosaranként.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Ügyes csoportosítás" badge="8. feladat" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>4 · 25 · 21 = (4 · 25) · 21 = 100 · 21 = <strong>2100</strong></li>
              <li>39 · 50 · 2 = 39 · (50 · 2) = 39 · 100 = <strong>3900</strong></li>
              <li>4 · 250 · 5 = 1000 · 5 = <strong>5000</strong></li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Szorzatpiramis" badge="12. a) feladat" badgeColor="rose">
            <ProductPyramidSvg className="w-full h-auto mb-2" />
            <p className="text-sm text-slate-700">
              Alul 10, A, B, 1. Mivel B · 1 = 5, B = 5; A · 5 = 10, így A = 2. Fölötte 10 · 2 = 20; aztán 20 · 10 = 200 és 10 · 5 = 50; a csúcson 200 · 50 = <strong>10 000</strong>.
            </p>
          </TheoryCard>
        </div>
        <TheoryCallout type="tip" title="Műveleti sorrend (13. feladat)">
          Előbb a zárójel, aztán a szorzás és osztás, végül az összeadás és kivonás: 30 · 6 + 120 : 2 = 180 + 60 = <strong>240</strong>; 10 000 − (300 · 30) = 10 000 − 9000 = <strong>1000</strong>.
        </TheoryCallout>
      </TheorySection>

      {/* 5. Vigyázz */}
      <TheorySection title="5. Vigyázz! Számold meg a nullákat!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="70 · 40 és 2400 : 60"
          wrong="70 · 40 = 280 és 2400 : 60 = 400"
          wrongExplanation="Az első esetben lemaradt egy nulla, a másodikban eggyel kevesebb nullát hagytunk el."
          correct="70 · 40 = 2800 és 2400 : 60 = 40"
          correctExplanation="70 · 40: 7 · 4 = 28, és mindkét tényezőben van 1-1 nulla, így 2 nulla kerül a végére. 2400 : 60 = 240 : 6 = 40."
          tip="Ellenőrizz fordított művelettel: 40 · 60 = 2400. ✓"
        />
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Labor I: Vándorló nullák" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div>
            <div className="text-xs font-bold text-slate-500 mb-1">1. Válassz egy számot!</div>
            <div className="flex flex-wrap gap-2">
              {START_NUMBERS.map((n) => (
                <button
                  key={n}
                  onClick={() => {
                    setStart(n);
                    reset();
                  }}
                  className={`px-3 py-2 rounded-xl text-sm font-black min-h-[44px] min-w-[56px] ${n === start ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800'}`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 mb-1">2. Válassz műveletet!</div>
            <div className="flex flex-wrap gap-2">
              {OPS.map((o, i) => (
                <button
                  key={o.label}
                  onClick={() => {
                    setOpIdx(i);
                    reset();
                  }}
                  className={`px-3 py-2 rounded-xl text-sm font-black min-h-[44px] min-w-[64px] ${i === opIdx ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-800'}`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
          {!valid ? (
            <div className="rounded-xl p-3 bg-amber-50 text-amber-800 text-sm font-bold text-center">
              {op.mul
                ? `${start} ${op.label} nagyobb lenne 10 000-nél. Válassz kisebb számot vagy másik műveletet!`
                : `A ${start} végén nincs elég nulla, ezért ${op.label} nem ad egész számot. Válassz mást!`}
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-center gap-2 text-2xl font-black text-slate-800">
                <span>
                  {start} {op.label} =
                </span>
                <input
                  value={guess}
                  onChange={(e) => {
                    setGuess(e.target.value.replace(/[^0-9]/g, ''));
                    setChecked(null);
                  }}
                  inputMode="numeric"
                  aria-label="eredmény"
                  className="w-32 h-12 rounded-xl border-2 border-emerald-300 text-center text-2xl font-black"
                />
                <button onClick={() => setChecked(Number(guess) === raw)} className="px-4 h-12 rounded-xl bg-emerald-600 text-white text-sm font-bold">
                  Ellenőrzés
                </button>
              </div>
              {checked !== null && (
                <div className={`rounded-xl p-2 text-center text-sm font-bold ${checked ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                  {checked ? `Szuper! ${start} ${op.label} = ${fmt(raw)}` : 'Még nem jó. Nézd meg a táblázatot, hova lépnek a számjegyek!'}
                </div>
              )}
              {checked !== null && (
                <div className="overflow-x-auto">
                  <table className="mx-auto border-collapse text-center">
                    <thead>
                      <tr>
                        {PLACE_NAMES.map((p, i) => (
                          <th key={p} className="w-14 h-8 text-white text-sm" style={{ background: PLACE_COLORS[i] }}>
                            {p}
                          </th>
                        ))}
                        <th className="w-20" />
                      </tr>
                    </thead>
                    <tbody>
                      {[start, raw].map((n, r) => (
                        <tr key={r}>
                          {digitsOf(n).map((d, i) => (
                            <td key={i} className="w-14 h-12 border border-slate-300 text-2xl font-black" style={{ color: r === 1 ? PLACE_COLORS[i] : '#0f172a' }}>
                              {d}
                            </td>
                          ))}
                          <td className="text-sm font-bold text-slate-500 pl-2">{r === 0 ? 'előtte' : 'utána'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="text-xs text-center text-slate-500 mt-2">
                    {op.mul ? `A számjegyek ${String(op.f).length - 1} hellyel balra léptek, a végére nullák kerültek.` : `A számjegyek ${String(op.f).length - 1} hellyel jobbra léptek, a nullák eltűntek a végéről.`}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Labor II: Szorzás-osztás család" badge="Labor" badgeColor="orange">
        <div className="bg-white border-2 border-orange-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            {[
              { label: 'Sorok', v: rows, set: setRows },
              { label: 'Érme egy sorban', v: cols, set: setCols }
            ].map((c) => (
              <div key={c.label} className="bg-orange-50 rounded-xl p-2 text-center">
                <div className="text-xs font-bold text-orange-800">{c.label}</div>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <button aria-label={`${c.label} kevesebb`} onClick={() => changeFam(() => c.set(Math.max(2, c.v - 1)))} className="w-11 h-11 rounded-lg bg-white border font-black">
                    −
                  </button>
                  <span className="text-2xl font-black w-8">{c.v}</span>
                  <button aria-label={`${c.label} több`} onClick={() => changeFam(() => c.set(Math.min(9, c.v + 1)))} className="w-11 h-11 rounded-lg bg-white border font-black">
                    +
                  </button>
                </div>
              </div>
            ))}
            <div className="bg-orange-50 rounded-xl p-2 text-center">
              <div className="text-xs font-bold text-orange-800">Érme értéke</div>
              <div className="flex justify-center gap-1 mt-1">
                {[10, 100, 1000].map((v) => (
                  <button
                    key={v}
                    onClick={() => changeFam(() => setCoin(v))}
                    className={`px-2 h-11 rounded-lg text-sm font-black ${coin === v ? 'bg-orange-500 text-white' : 'bg-white border'}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {!famOk ? (
            <div className="rounded-xl p-3 bg-amber-50 text-amber-800 text-sm font-bold text-center">
              Ez már {fmt(total)} fabatka, több mint 10 000. Válassz kevesebb érmét vagy kisebb érmét!
            </div>
          ) : (
            <>
              <svg viewBox={`0 0 ${Math.max(240, cols * 27 + 20)} ${rows * 27 + 20}`} className="w-full max-w-md h-auto mx-auto bg-slate-50 rounded-xl border">
                <CoinGrid x={22} y={22} rows={rows} cols={cols} value={coin} r={11.5} gap={27} />
              </svg>
              <div className="text-center text-sm font-bold text-slate-700">
                Összesen: {rows} sor · {cols} érme · {coin} = <span className="text-orange-700">{fmt(total)}</span> fabatka
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {facts.map((f, i) => (
                  <div key={i} className={`rounded-xl border p-2 flex items-center justify-between gap-2 font-mono font-bold ${i === hideIdx ? 'bg-orange-50 border-orange-300' : 'bg-slate-50'}`}>
                    <span>{f.text}</span>
                    {i === hideIdx ? (
                      <input
                        value={famGuess}
                        onChange={(e) => {
                          setFamGuess(e.target.value.replace(/[^0-9]/g, ''));
                          setFamChecked(null);
                        }}
                        inputMode="numeric"
                        aria-label="hiányzó eredmény"
                        className="w-24 h-10 rounded-lg border-2 border-orange-300 text-center font-black"
                      />
                    ) : (
                      <span className="text-orange-700">{fmt(f.ans)}</span>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                <button onClick={() => setFamChecked(Number(famGuess) === facts[hideIdx].ans)} className="px-4 py-2 rounded-xl bg-orange-500 text-white text-sm font-bold min-h-[44px]">
                  Ellenőrzés
                </button>
                <button onClick={() => changeFam(() => setHideIdx((hideIdx + 1) % 6))} className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-sm font-bold min-h-[44px]">
                  Másik művelet
                </button>
              </div>
              {famChecked !== null && (
                <div className={`rounded-xl p-2 text-center text-sm font-bold ${famChecked ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                  {famChecked ? 'Ügyes! A család minden tagja ugyanarról a képről szól.' : 'Még nem jó. Számold meg a képen a sorokat és az érméket!'}
                </div>
              )}
            </>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default MulDiv10000Theory;
