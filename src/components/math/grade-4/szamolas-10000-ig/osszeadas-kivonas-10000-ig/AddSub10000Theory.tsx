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
  HundredsCoinsSvg,
  ThreeWaysSvg,
  AddJumpsSvg,
  SubJumpsSvg,
  GuestsChartSvg,
  SumPyramidSvg,
  JumpLine
} from './AddSub10000Figures';

const fmt = (n: number) => (n >= 10000 ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : String(n));

/** Összegpiramis-feladatok: alsó sor 4 szám; hidden: [sor, index] párok, amelyeket ki kell találni. */
const PYRAMIDS: { name: string; bottom: number[]; hidden: [number, number][] }[] = [
  { name: 'Tankönyv 12. b)', bottom: [200, 700, 1100, 500], hidden: [[1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [3, 0]] },
  { name: 'Tankönyv 12. a)', bottom: [700, 900, 1100, 1200], hidden: [[0, 1], [0, 3], [1, 1], [2, 0], [3, 0]] },
  { name: 'Munkafüzet 4. a) – 1. hegy', bottom: [1000, 500, 300, 200], hidden: [[1, 0], [1, 2], [2, 0], [2, 1], [3, 0]] },
  { name: 'Munkafüzet 4. a) – 2. hegy', bottom: [400, 400, 600, 1400], hidden: [[1, 1], [2, 0], [2, 1], [3, 0], [0, 2]] }
];

const buildRows = (bottom: number[]) => {
  const rows = [bottom];
  while (rows[rows.length - 1].length > 1) {
    const last = rows[rows.length - 1];
    rows.push(last.slice(0, -1).map((v, i) => v + last[i + 1]));
  }
  return rows;
};

export const AddSub10000Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: kerek százasok
  const [a, setA] = useState<number>(3400);
  const [b, setB] = useState<number>(5700);
  const [op, setOp] = useState<'+' | '−'>('+');
  const [guess, setGuess] = useState<string>('');
  const [result, setResult] = useState<null | boolean>(null);
  const [showSteps, setShowSteps] = useState<boolean>(false);
  const exact = op === '+' ? a + b : a - b;
  const valid = op === '+' ? a + b <= 10000 : b <= a;
  const bigB = Math.floor(b / 1000) * 1000;
  const smallB = b - bigB;
  const mid = op === '+' ? a + bigB : a - bigB;
  const setNum = (which: 'a' | 'b', d: number) => {
    const cur = which === 'a' ? a : b;
    const v = Math.max(0, Math.min(10000, cur + d));
    if (which === 'a') setA(v);
    else setB(v);
    setGuess('');
    setResult(null);
    setShowSteps(false);
  };

  // Labor II: összegpiramis
  const [pIdx, setPIdx] = useState<number>(0);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [pChecked, setPChecked] = useState<boolean>(false);
  const pz = PYRAMIDS[pIdx];
  const rows = buildRows(pz.bottom);
  const isHidden = (r: number, i: number) => pz.hidden.some(([hr, hi]) => hr === r && hi === i);
  const allOk = pz.hidden.every(([r, i]) => Number(inputs[`${r}-${i}`]) === rows[r][i]);

  return (
    <TheoryTemplate
      topicId="g4-count-10k"
      subtopicId="osszeadas-kivonas-10000-ig"
      grade={4}
      chapterId="szamolas-10000-ig"
      title="11. Összeadás és kivonás 10 000-ig"
      subtitle="Kerek ezresek és kerek százasok összeadása és kivonása fejben – ahogy Bence, Jancsi és Marci csinálja!"
      badge="4. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 10 000-IG • TANANYAG"
      themeColor="blue"
      pdfFilename="4_osztaly_osszeadas_kivonas_10000_ig_tananyag.pdf"
      practiceTitle="Készen állsz a fejszámolásra?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — SZÁMOLJ SZÁZASOKKAL!',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center font-mono text-base font-black text-blue-900 dark:text-blue-200">
              3 + 4 = 7 → 3000 + 4000 = 7000 • 34 sz + 57 sz = 91 sz → 3400 + 5700 = 9100
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Kerek ezresekkel úgy számolunk, mint egyesekkel – csak a végére 000 kerül.</li>
              <li>Kerek százasoknál számolj <strong>százasokkal</strong> (34 sz), vagy bontsd a második számot <strong>ezresekre és százasokra</strong>.</li>
              <li>Ellenőrizz: az összeadást kivonással, a kivonást összeadással.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 45. o." badgeColor="blue">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            Tóni és Teó pénztárcájában csak ezerfabatkások vannak, együtt <strong>10 000</strong> fabatkájuk van. Ha Tóninak 3000 jut, Teónak 7000; ha Tóninak 6000, Teónak 4000. Ilyen kerek számokkal <strong>fejben</strong> is gyorsan számolhatunk.
          </p>
          <TheoryTable
            headers={['Kicsiben', 'Százasokkal', 'Ezresekkel']}
            rows={[
              ['3 + 4 = 7', '300 + 400 = 700', '3000 + 4000 = 7000'],
              ['6 + 3 = 9', '600 + 300 = 900', '6000 + 3000 = 9000'],
              ['5 − 2 = 3', '500 − 200 = 300', '5000 − 2000 = 3000'],
              ['10 − 4 = 6', '100 − 40 = 60', '10 000 − 4000 = 6000']
            ]}
          />
        </div>
      </TheorySection>

      {/* 2. Százasokkal */}
      <TheorySection title="2. Számoljunk százasokkal!" badge="Tankönyv 45. o., 4. feladat" badgeColor="orange">
        <HundredsCoinsSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Összeadás" badge="+" badgeColor="emerald">
            <p className="text-sm text-slate-700">11 százas + 12 százas = 23 százas, vagyis <strong>1100 + 1200 = 2300</strong>.</p>
          </TheoryCard>
          <TheoryCard title="Kivonás" badge="−" badgeColor="rose">
            <p className="text-sm text-slate-700">23 százas − 12 százas = 11 százas, vagyis <strong>2300 − 1200 = 1100</strong>.</p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. Három módszer */}
      <TheorySection title="3. Hogyan számoltak a gyerekek?" badge="Tankönyv 46–47. o." badgeColor="purple">
        <ThreeWaysSvg />
        <AddJumpsSvg />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="Bence" badge="százasokkal" badgeColor="blue">
            <p className="text-sm text-slate-700">8200 − 5300: 82 sz − 53 sz = 29 sz = <strong>2900</strong></p>
          </TheoryCard>
          <TheoryCard title="Jancsi" badge="előbb az ezresek" badgeColor="amber">
            <p className="text-sm text-slate-700">8200 − 5000 − 300 = 3200 − 300 = <strong>2900</strong></p>
          </TheoryCard>
          <TheoryCard title="Marci" badge="előbb a százasok" badgeColor="emerald">
            <p className="text-sm text-slate-700">8200 − 300 − 5000 = 7900 − 5000 = <strong>2900</strong></p>
          </TheoryCard>
        </div>
        <SubJumpsSvg />
      </TheorySection>

      {/* 4. Nézzük meg együtt */}
      <TheorySection title="4. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Csoportosítsd ügyesen a tagokat!" badge="6. feladat" badgeColor="teal">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>1200 + 2500 + 500 + 800</li>
              <li>= (1200 + 800) + (2500 + 500)</li>
              <li>= 2000 + 3000 = <strong>5000</strong></li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) A szörp" badge="8. feladat" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Májusban 3700 dl, ez <strong>1200 dl-rel kevesebb</strong>, mint júniusban.</li>
              <li>Tehát júniusban több volt: 3700 + 1200 = <strong>4900 dl</strong>.</li>
              <li>Összesen: 3700 + 4900 = <strong>8600 dl</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <GuestsChartSvg />
          <TheoryCard title="C) Olvasd le a diagramról!" badge="3. feladat" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Áprilisban: Illatosrét 4000, Tavirózsa 5000 vendég.</li>
              <li>Együtt: 4000 + 5000 = <strong>9000</strong> vendég.</li>
              <li>Májusban az Illatosrét 5000 − 2000 = <strong>3000</strong>-rel több vendéget fogadott.</li>
            </ul>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <SumPyramidSvg />
          <TheoryCard title="D) Összegpiramis" badge="12. feladat" badgeColor="amber">
            <p className="text-sm text-slate-700">
              Alul: 200, 700, 1100, 500. Fölöttük: 200 + 700 = 900, 700 + 1100 = 1800, 1100 + 500 = 1600. Aztán 900 + 1800 = 2700 és 1800 + 1600 = 3400. A csúcson: 2700 + 3400 = <strong>6100</strong>.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Vigyázz */}
      <TheorySection title="5. Vigyázz! Az átlépésre figyelj!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="9100 − 6700"
          wrong="9100 − 6700 = 3600"
          wrongExplanation="Itt a százasokat fordítva vonták ki (7 − 1 = 6). De 1 százasból nem lehet elvenni 7-et!"
          correct="9100 − 6700 = 2400"
          correctExplanation="91 sz − 67 sz = 24 sz = 2400. Vagy: 9100 − 6000 = 3100, majd 3100 − 700 = 2400."
          tip="Ellenőrizz összeadással: 2400 + 6700 = 9100. ✓"
        />
        <TheoryCallout type="warning" title="„Kevesebb” nem mindig kivonás!">
          „Májusban 1200 dl-rel kevesebbet készítettek, mint júniusban.” Itt a <strong>júniusi</strong> mennyiség a nagyobb, ezért összeadunk: 3700 + 1200.
        </TheoryCallout>
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Labor I: Fejszámoló ugrásokkal" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
            {(['a', 'b'] as const).map((w) => (
              <div key={w} className="bg-blue-50 rounded-xl p-3 text-center space-y-2">
                <div className="text-xs font-bold text-blue-800">{w === 'a' ? '1. szám' : '2. szám'}</div>
                <div className="text-3xl font-black text-blue-900">{w === 'a' ? a : b}</div>
                <div className="flex justify-center gap-1 flex-wrap">
                  {[-1000, -100, 100, 1000].map((d) => (
                    <button key={d} onClick={() => setNum(w, d)} className="px-2 py-2 rounded-lg bg-white border border-blue-200 text-xs font-bold min-h-[40px] min-w-[52px]">
                      {d > 0 ? `+${d}` : `−${-d}`}
                    </button>
                  ))}
                </div>
              </div>
            )).reduce<React.ReactNode[]>((acc, el, i) => {
              acc.push(el);
              if (i === 0)
                acc.push(
                  <div key="op" className="flex md:flex-col justify-center gap-2 order-first md:order-none">
                    {(['+', '−'] as const).map((o) => (
                      <button
                        key={o}
                        onClick={() => {
                          setOp(o);
                          setGuess('');
                          setResult(null);
                          setShowSteps(false);
                        }}
                        className={`w-14 h-14 rounded-2xl text-2xl font-black ${op === o ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                );
              return acc;
            }, [])}
          </div>
          {!valid ? (
            <div className="rounded-xl p-3 bg-amber-50 text-amber-800 text-sm font-bold text-center">
              {op === '+' ? 'Az összeg nagyobb lenne 10 000-nél. Válassz kisebb számokat!' : 'A 2. szám nagyobb, mint az 1. – így nem tudunk kivonni. Változtass!'}
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-center gap-2 text-2xl font-black text-slate-800">
                <span>{a} {op} {b} =</span>
                <input
                  value={guess}
                  onChange={(e) => {
                    setGuess(e.target.value.replace(/[^0-9]/g, ''));
                    setResult(null);
                  }}
                  inputMode="numeric"
                  aria-label="eredmény"
                  className="w-32 h-12 rounded-xl border-2 border-blue-300 text-center text-2xl font-black"
                />
                <button onClick={() => setResult(Number(guess) === exact)} className="px-4 h-12 rounded-xl bg-blue-600 text-white text-sm font-bold">
                  Ellenőrzés
                </button>
                <button onClick={() => setShowSteps(!showSteps)} className="px-4 h-12 rounded-xl bg-slate-200 text-slate-700 text-sm font-bold">
                  {showSteps ? 'Lépések elrejtése' : 'Mutasd a lépéseket'}
                </button>
              </div>
              {result !== null && (
                <div className={`rounded-xl p-2 text-center text-sm font-bold ${result ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                  {result ? 'Szuper, ez pontosan jó!' : 'Még nem jó. Nézd meg a lépéseket!'}
                </div>
              )}
              {showSteps && (
                <div className="space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="bg-slate-50 rounded-xl p-3 border">
                      <div className="font-bold text-blue-700">Bence: százasokkal</div>
                      {a % 100 === 0 && b % 100 === 0 ? (
                        <div className="font-mono">
                          {a / 100} sz {op} {b / 100} sz = {exact / 100} sz = {fmt(exact)}
                        </div>
                      ) : (
                        <div className="font-mono">—</div>
                      )}
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3 border">
                      <div className="font-bold text-amber-700">Jancsi: előbb az ezresek</div>
                      <div className="font-mono">
                        {a} {op} {bigB} {op} {smallB} = {mid} {op} {smallB} = {fmt(exact)}
                      </div>
                    </div>
                  </div>
                  <svg viewBox="0 0 460 130" className="w-full h-auto bg-slate-50 rounded-xl border">
                    <JumpLine min={0} max={10000} start={a} jumps={[op === '+' ? bigB : -bigB, op === '+' ? smallB : -smallB].filter((j) => j !== 0)} y={92} />
                  </svg>
                </div>
              )}
            </>
          )}
        </div>
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Labor II: Összegpiramis" badge="Labor" badgeColor="amber">
        <div className="bg-white border-2 border-amber-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            {PYRAMIDS.map((p, i) => (
              <button
                key={p.name}
                onClick={() => {
                  setPIdx(i);
                  setInputs({});
                  setPChecked(false);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold min-h-[44px] ${i === pIdx ? 'bg-amber-500 text-white' : 'bg-amber-50 text-amber-800'}`}
              >
                {p.name}
              </button>
            ))}
          </div>
          <p className="text-sm text-slate-700">Minden téglalapba az alatta lévő két szám <strong>összege</strong> kerül. Töltsd ki a hiányzó mezőket!</p>
          <div className="flex flex-col-reverse items-center gap-1">
            {rows.map((row, r) => (
              <div key={r} className="flex gap-1">
                {row.map((v, i) => {
                  const key = `${r}-${i}`;
                  if (!isHidden(r, i))
                    return (
                      <div key={key} className="w-20 h-12 rounded-lg bg-yellow-100 border-2 border-yellow-500 flex items-center justify-center font-black text-amber-900">
                        {v}
                      </div>
                    );
                  const ok = Number(inputs[key]) === v;
                  return (
                    <input
                      key={key}
                      value={inputs[key] ?? ''}
                      onChange={(e) => {
                        setInputs({ ...inputs, [key]: e.target.value.replace(/[^0-9]/g, '') });
                        setPChecked(false);
                      }}
                      inputMode="numeric"
                      aria-label={`piramis ${r + 1}. sor ${i + 1}. mező`}
                      className={`w-20 h-12 rounded-lg border-2 text-center font-black ${
                        pChecked ? (ok ? 'border-emerald-500 bg-emerald-50' : 'border-rose-500 bg-rose-50') : 'border-slate-300 bg-white'
                      }`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button onClick={() => setPChecked(true)} className="px-5 py-2 rounded-xl bg-amber-500 text-white text-sm font-bold min-h-[44px]">
              Ellenőrzés
            </button>
          </div>
          {pChecked && (
            <div className={`rounded-xl p-2 text-center text-sm font-bold ${allOk ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              {allOk
                ? `Ügyes! A csúcson ${rows[rows.length - 1][0]} áll.`
                : 'A pirossal keretezett mezőket számold újra! Tipp: ha az alsó szám hiányzik, vonj ki!'}
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default AddSub10000Theory;
