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
  LadybugLegsSvg,
  RemainderFlowerSvg,
  RoundTensSvg,
  WrittenMultSvg,
  CoinsSvg,
  TrainDivisionSvg
} from './MulDiv1000Figures';

const COL_COLORS = ['#dc2626', '#0ea5e9', '#eab308'];
const COL_NAMES = ['százasok', 'tízesek', 'egyesek'];

/** Írásbeli szorzás egyjegyű szorzóval: az egyesektől kezdve a lépések. */
export const multSteps = (a: number, m: number) => {
  const steps: { digit: number; carryOut: number; hint: string }[] = [];
  let carry = 0;
  const len = String(a).length;
  const resLen = String(a * m).length;
  for (let c = 0; c < resLen; c++) {
    const d = Math.floor(a / 10 ** c) % 10;
    const p = c < len ? m * d + carry : carry;
    const name = COL_NAMES[2 - c] ?? 'ezresek';
    steps.push({
      digit: p % 10,
      carryOut: Math.floor(p / 10),
      hint:
        c < len
          ? `${name}: ${m} · ${d}${carry ? ` + ${carry} (maradék)` : ''} = ${p}. Leírom: ${p % 10}${p >= 10 ? `, maradt ${Math.floor(p / 10)}.` : '.'}`
          : `${name}: itt már csak a maradékot írjuk le: ${p}.`
    });
    carry = Math.floor(p / 10);
  }
  return steps;
};

// ---------------------------------------------------------------------------
// Labor I – Igazságos osztozkodás (maradékos osztás)
// ---------------------------------------------------------------------------
const ShareLab: React.FC = () => {
  const [total, setTotal] = useState(13);
  const [div, setDiv] = useState(3);
  const [qGuess, setQGuess] = useState(0);
  const [rGuess, setRGuess] = useState(0);
  const [checked, setChecked] = useState<null | boolean>(null);
  const [reveal, setReveal] = useState(false);
  const q = Math.floor(total / div);
  const r = total % div;

  const reset = () => {
    setChecked(null);
    setReveal(false);
  };

  return (
    <div className="bg-white border-2 border-emerald-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Ennyi cukorka van: {total}</label>
          <input
            type="range"
            min="5"
            max="60"
            value={total}
            onChange={(e) => {
              setTotal(Number(e.target.value));
              reset();
            }}
            className="w-full accent-emerald-600 h-3"
            aria-label="cukorkák száma"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Ennyi gyerek osztozik: {div}</label>
          <input
            type="range"
            min="2"
            max="9"
            value={div}
            onChange={(e) => {
              setDiv(Number(e.target.value));
              reset();
            }}
            className="w-full accent-emerald-600 h-3"
            aria-label="gyerekek száma"
          />
        </div>
      </div>

      <div className="text-center text-xl font-black text-slate-800">
        {total} : {div} = <span className="text-emerald-700">?</span>, maradék: <span className="text-rose-600">?</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Egy gyerek kap', v: qGuess, set: setQGuess, max: 30 },
          { label: 'Marad', v: rGuess, set: setRGuess, max: 8 }
        ].map((f) => (
          <div key={f.label} className="flex flex-col items-center gap-2 bg-slate-50 rounded-xl p-3 border border-slate-200">
            <div className="text-sm font-bold text-slate-600">{f.label}</div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  f.set(Math.max(0, f.v - 1));
                  setChecked(null);
                }}
                className="w-12 h-12 rounded-xl bg-slate-200 hover:bg-slate-300 text-2xl font-black"
              >
                −
              </button>
              <span className="text-3xl font-black w-12 text-center">{f.v}</span>
              <button
                onClick={() => {
                  f.set(Math.min(f.max, f.v + 1));
                  setChecked(null);
                }}
                className="w-12 h-12 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-2xl font-black"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => {
            setChecked(qGuess === q && rGuess === r);
            setReveal(true);
          }}
          className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
        >
          Ellenőrzöm és szétosztom
        </button>
      </div>

      {reveal && (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2 justify-center">
            {Array.from({ length: div }).map((_, k) => (
              <div key={k} className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-2 w-24">
                <div className="text-xs font-bold text-emerald-800 text-center mb-1">{k + 1}. gyerek</div>
                <div className="flex flex-wrap gap-1 justify-center">
                  {Array.from({ length: q }).map((__, j) => (
                    <span key={j} className="w-3 h-3 rounded-full bg-pink-400 inline-block" />
                  ))}
                </div>
              </div>
            ))}
            <div className="rounded-xl border-2 border-rose-300 bg-rose-50 p-2 w-24">
              <div className="text-xs font-bold text-rose-800 text-center mb-1">maradék</div>
              <div className="flex flex-wrap gap-1 justify-center">
                {Array.from({ length: r }).map((__, j) => (
                  <span key={j} className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                ))}
              </div>
            </div>
          </div>
          <TheoryCallout type={checked ? 'success' : 'warning'} title={checked ? 'Ügyes vagy! 🎉' : 'Nézd meg a szétosztást!'}>
            {total} : {div} = {q}, maradék: {r}. Ellenőrzés: {q} · {div} + {r} = {q * div + r}. A maradék ({r}) kisebb, mint az osztó ({div}).
          </TheoryCallout>
        </div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Labor II – Írásbeli szorzás lépésről lépésre
// ---------------------------------------------------------------------------
const MULT_PROBLEMS: [number, number][] = [
  [214, 3],
  [324, 2],
  [124, 4],
  [162, 3],
  [148, 6],
  [92, 7],
  [137, 3],
  [57, 6]
];

const WrittenMultLab: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState<number[]>([]);
  const [wrong, setWrong] = useState<number | null>(null);
  const [hint, setHint] = useState(false);
  const [a, m] = MULT_PROBLEMS[idx];
  const result = a * m;
  const resLen = String(result).length;
  const steps = multSteps(a, m);
  const col = done.length;
  const finished = col >= resLen;
  const aDigits = String(a).padStart(3, ' ').split('');

  const press = (d: number) => {
    if (finished) return;
    if (d === steps[col].digit) {
      setDone([...done, d]);
      setWrong(null);
      setHint(false);
    } else setWrong(d);
  };

  const next = () => {
    setIdx((i) => (i + 1) % MULT_PROBLEMS.length);
    setDone([]);
    setWrong(null);
    setHint(false);
  };

  const estimate = Math.floor((a + 5) / 10) * 10;

  return (
    <div className="bg-white border-2 border-orange-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-base font-bold text-slate-700">
          Számold ki írásban: <span className="text-orange-600 font-black text-xl">{a} · {m}</span>
        </div>
        <button onClick={next} className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm font-bold text-slate-700">
          Új feladat ➜
        </button>
      </div>
      <div className="text-sm text-slate-600">
        Becslés tízesre kerekítve: {estimate} · {m} = <strong>{estimate * m}</strong>
      </div>

      <div className="flex justify-center">
        <div className="inline-grid grid-cols-[repeat(3,3.5rem)_2rem_2.5rem] gap-y-1 font-mono text-3xl font-black text-center">
          {['sz', 't', 'e'].map((h, i) => (
            <div key={h} className="text-sm text-white rounded-t-md py-1" style={{ backgroundColor: COL_COLORS[i] }}>
              {h}
            </div>
          ))}
          <div />
          <div />
          {aDigits.map((d, i) => (
            <div key={`a${i}`} className="py-1 border-b-4 border-slate-800" style={{ backgroundColor: `${COL_COLORS[i]}1f` }}>
              {d.trim()}
            </div>
          ))}
          <div className="py-1">·</div>
          <div className="py-1 text-emerald-700">{m}</div>
          {[2, 1, 0].map((c, i) => {
            const active = !finished && c === col;
            const carry = c > 0 && done.length >= c && steps[c - 1] && steps[c - 1].carryOut ? steps[c - 1].carryOut : 0;
            return (
              <div
                key={`r${i}`}
                className={`py-1 rounded-md relative ${active ? 'ring-4 ring-orange-400 bg-orange-50' : ''} text-sky-700`}
                style={!active ? { backgroundColor: `${COL_COLORS[i]}1f` } : undefined}
              >
                {done[c] !== undefined ? done[c] : active ? '?' : ''}
                {carry > 0 && done[c] === undefined && <span className="absolute left-0.5 top-0 text-xs text-slate-500">+{carry}</span>}
              </div>
            );
          })}
          <div />
          <div />
        </div>
      </div>

      {!finished ? (
        <>
          <div className="text-center text-sm font-bold text-slate-700">
            Melyik számjegyet írod {col === 0 ? 'az' : 'a'} <span style={{ color: COL_COLORS[2 - col] }}>{COL_NAMES[2 - col]}</span> helyére?
          </div>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {Array.from({ length: 10 }).map((_, d) => (
              <button
                key={d}
                onClick={() => press(d)}
                className={`h-12 rounded-xl text-xl font-black border-2 ${
                  wrong === d ? 'bg-rose-100 border-rose-400 text-rose-700' : 'bg-white border-orange-200 hover:bg-orange-50 text-slate-800'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={() => setHint(true)} className="px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-sm font-bold">
              Segítség 💡
            </button>
            {wrong !== null && <span className="text-rose-700 font-bold text-sm">Nem jó! Ne felejtsd el hozzáadni a maradékot.</span>}
          </div>
          {hint && (
            <TheoryCallout type="tip" title="Így gondolkodj">
              {steps[col].hint}
            </TheoryCallout>
          )}
        </>
      ) : (
        <TheoryCallout type="success" title="Kész, ügyes vagy! 🎉">
          {a} · {m} = {result}. Ellenőrzés összeadással: {Array.from({ length: m }).map(() => a).join(' + ')} = {result}.
        </TheoryCallout>
      )}
    </div>
  );
};

export const MulDiv1000Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  return (
    <TheoryTemplate
      topicId="g4-count-10k"
      subtopicId="szorzas-osztas-1000-ig"
      title="3. Szorzás és osztás 1000-ig"
      subtitle="Szorzótábla, maradékos osztás, szorzás és osztás kerek számokkal, írásbeli szorzás egyjegyű számmal."
      badge="4. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 10 000-IG • TANANYAG"
      themeColor="emerald"
      pdfFilename="4_osztaly_szorzas_osztas_1000_ig_tananyag.pdf"
      practiceTitle="Készen állsz a szorzás és osztás gyakorlására?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — SZORZÁS ÉS OSZTÁS',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center">
              <span className="font-mono text-base font-black text-emerald-900 dark:text-emerald-200">
                szorzandó · szorzó = szorzat &nbsp;|&nbsp; 13 : 3 = 4, maradék 1
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Kerek számoknál a szorzótáblát használd: 4 · 60 = 240, mert 4 · 6 = 24.</li>
              <li>
                <strong>A maradék mindig kisebb, mint az osztó!</strong>
              </li>
              <li>Írásbeli szorzásnál az egyesekkel kezdünk, a maradékot hozzáadjuk a következő szorzathoz.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 17. o." badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>Hány lába van 4 katicának? Összeadással: 6 + 6 + 6 + 6 = 24. Szorzással gyorsabb: 4 · 6 = 24.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>A szorzótábla gyakorlása, hiányzó tényezők keresése.</li>
              <li>Maradékos osztás.</li>
              <li>Szorzás és osztás kerek tízesekkel, százasokkal.</li>
              <li>Írásbeli szorzás egyjegyű szorzóval, becslés, ellenőrzés.</li>
            </ul>
          </div>
          <LadybugLegsSvg />
        </div>
        <TheoryTable
          headers={['Állat', 'Lábak száma', '5 állatnak', '9 állatnak']}
          rows={[
            ['daru', '2', '5 · 2 = 10', '9 · 2 = 18'],
            ['foltos szalamandra', '4', '5 · 4 = 20', '9 · 4 = 36'],
            ['havasi cincér (bogár)', '6', '5 · 6 = 30', '9 · 6 = 54']
          ]}
        />
      </TheorySection>

      {/* 2. Maradékos osztás */}
      <TheorySection title="2. Maradékos osztás" badge="Tankönyv 17. o." badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <RemainderFlowerSvg />
          <div className="space-y-3">
            <TheoryCard title="Nézzük meg együtt! 13 : 3" badge="4. feladat" badgeColor="emerald">
              <ol className="list-decimal pl-5 text-sm text-slate-700 space-y-1">
                <li>Melyik az a 3-mal osztható szám, amely a legközelebb van a 13-hoz, de nem nagyobb nála? A 12.</li>
                <li>12 : 3 = 4.</li>
                <li>13 − 12 = 1, ez a maradék.</li>
                <li>Leírjuk: 13 : 3 = 4, maradék 1. Ellenőrzés: 4 · 3 + 1 = 13.</li>
              </ol>
            </TheoryCard>
            <TheoryCallout type="info" title="Milyen maradék lehet?">
              3-mal osztva a maradék 0, 1 vagy 2 lehet. 4-gyel osztva 0, 1, 2 vagy 3. A maradék mindig kisebb, mint az osztó.
            </TheoryCallout>
          </div>
        </div>
      </TheorySection>

      {/* 3. Kerek számok */}
      <TheorySection title="3. Szorzás és osztás kerek számokkal" badge="Tankönyv 18–19. o." badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <RoundTensSvg />
          <TheoryTable
            headers={['Művelet', 'Gondolkodás', 'Eredmény']}
            rows={[
              ['60 · 5', '6 · 5 = 30, tehát 30 tízes', '300'],
              ['2 · 340', '2 · 300 + 2 · 40 = 600 + 80', '680'],
              ['9 · 90', '9 · 9 = 81, tehát 81 tízes', '810'],
              ['640 : 80', '64 tízes : 8 tízes, 64 : 8', '8'],
              ['540 : 9', '54 tízes : 9 = 6 tízes', '60'],
              ['1000 : 50', '50 · 20 = 1000', '20']
            ]}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Pénzérmék" badge="5. feladat" badgeColor="amber">
            <CoinsSvg className="w-full h-auto mb-2" />
            <p className="text-sm text-slate-700">
              8 nagy kócsagos (5 Ft) és 3 nőszirmos (20 Ft) érme: 8 · 5 + 3 · 20 = 40 + 60 = <strong>100 Ft</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="Kisvasút" badge="12. feladat" badgeColor="emerald">
            <TrainDivisionSvg className="w-full h-auto mb-2" />
            <p className="text-sm text-slate-700">
              20 + 7 + 9 + 7 + 3 + 5 + 20 = <strong>71</strong> utas ül a vonaton.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Írásbeli szorzás */}
      <TheorySection title="4. Írásbeli szorzás egyjegyű számmal" badge="Tankönyv 20. o." badgeColor="orange">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <WrittenMultSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>1. Becslés</strong> tízesre kerekítve: 214 ≈ 210, és 210 · 3 = 630.
            </p>
            <p>
              <strong>2. Egyesek:</strong> 3 · 4 = 12. Leírom a 2-t, maradt 1.
            </p>
            <p>
              <strong>3. Tízesek:</strong> 3 · 1 = 3, meg a maradék 1, az 4. Leírom a 4-et.
            </p>
            <p>
              <strong>4. Százasok:</strong> 3 · 2 = 6. Leírom a 6-ot. A szorzat: <strong>642</strong>.
            </p>
            <p>
              <strong>5. Ellenőrzés</strong> összeadással: 214 + 214 + 214 = 642 ✔
            </p>
          </div>
        </div>
        <TheoryCallout type="tip" title="Nézzük meg együtt! Préselt növények">
          Az évfolyamra 92 tanuló jár, mindenki 7 növényt préselt. 92 · 7: 7 · 2 = 14, leírom a 4-et, maradt 1; 7 · 9 = 63, meg 1 az 64. Összesen <strong>644</strong> préselt növény.
        </TheoryCallout>
      </TheorySection>

      {/* 5. Vigyázz! */}
      <TheorySection title="5. Vigyázz! A maradék nem lehet nagy" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Túl nagy maradék"
          wrong="29 : 3 = 8, maradék 5"
          wrongExplanation="Az 5 nagyobb, mint a 3! Még egyszer jutott volna mindenkinek."
          correct="29 : 3 = 9, maradék 2"
          correctExplanation="9 · 3 = 27, és 29 − 27 = 2. A 2 kisebb, mint a 3, ez jó."
          tip="Ellenőrizz: hányados · osztó + maradék = osztandó."
        />
        <TheoryCallout type="warning" title="Írásbeli szorzásnál se felejtsd el a maradékot!">
          214 · 3 nem 632! A tízeseknél a 3 · 1 = 3-hoz hozzá kell adni az egyesektől maradt 1-et.
        </TheoryCallout>
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Játékos labor I: Igazságos osztozkodás" badge="Labor" badgeColor="emerald">
        <p className="text-sm text-slate-600">Állítsd be a cukorkák és a gyerekek számát! Találd ki, hányat kap egy gyerek, és mennyi marad.</p>
        <ShareLab />
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Játékos labor II: Írásbeli szorzás lépésről lépésre" badge="Labor" badgeColor="orange">
        <p className="text-sm text-slate-600">Kattints a helyes számjegyre! Az egyesekkel kezdünk, a maradékot (+1, +2 …) a következő helyen hozzáadjuk.</p>
        <WrittenMultLab />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default MulDiv1000Theory;
