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
  MulStepsSvg,
  MulCarrySvg,
  PlaceValueMulSvg,
  MulCheckSvg,
  FunicularPricesSvg,
  MUL_COLORS,
  MUL_HEADS
} from './WrittenMulOneDigitFigures';

const COL_NAMES = ['ezresek', 'százasok', 'tízesek', 'egyesek'];
const SHORT = ['E', 'sz', 't', 'e'];

export const roundTo100 = (n: number) => Math.floor((n + 50) / 100) * 100;

interface MulStep {
  digit: number;
  carryOut: number;
  hint: string;
}

/**
 * Az írásbeli szorzás lépései az egyesektől kezdve (négyjegyű szorzandó, egyjegyű szorzó).
 * Előbb szorzunk, utána adjuk hozzá az előző helyi értéken maradt számot.
 */
export const mulSteps = (a: number, m: number): MulStep[] => {
  const steps: MulStep[] = [];
  let carry = 0;
  for (let c = 0; c < 4; c++) {
    const d = Math.floor(a / 10 ** c) % 10;
    const name = COL_NAMES[3 - c];
    const prod = d * m;
    const total = prod + carry;
    const carryText = carry ? `, és hozzáadom a maradékot: ${prod} + ${carry} = ${total}` : '';
    const out = Math.floor(total / 10);
    steps.push({
      digit: total % 10,
      carryOut: out,
      hint: `${name}: ${m} · ${d} ${SHORT[3 - c]} = ${prod} ${SHORT[3 - c]}${carryText}. Leírom: ${total % 10}${out ? `, maradt ${out}.` : '.'}`
    });
    carry = out;
  }
  return steps;
};

const MUL_PROBLEMS: [number, number][] = [
  [1623, 2],
  [2324, 3],
  [1216, 4],
  [2549, 3],
  [1356, 6],
  [1108, 6],
  [1263, 3],
  [1721, 4]
];

const MulLab: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState<number[]>([]);
  const [wrong, setWrong] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [a, m] = MUL_PROBLEMS[idx];
  const steps = mulSteps(a, m);
  const col = done.length;
  const finished = col >= 4;
  const result = a * m;

  const press = (d: number) => {
    if (finished) return;
    if (d === steps[col].digit) {
      setDone([...done, d]);
      setWrong(null);
      setShowHint(false);
    } else {
      setWrong(d);
    }
  };
  const next = () => {
    setIdx((i) => (i + 1) % MUL_PROBLEMS.length);
    setDone([]);
    setWrong(null);
    setShowHint(false);
  };

  const digitsA = String(a).padStart(4, ' ').split('');
  const resDigits = [3, 2, 1, 0].map((c) => (done[c] !== undefined ? String(done[c]) : ''));
  // a szorzat fölé írt maradék: a (c-1). oszlopból a c. oszlopba
  const carryInto = [3, 2, 1, 0].map((c) => (c > 0 && done.length >= c && steps[c - 1].carryOut ? String(steps[c - 1].carryOut) : ''));

  return (
    <div className="bg-white border-2 border-blue-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-base font-bold text-slate-700">
          Szorozz írásban: <span className="text-blue-700 font-black text-xl">{a} · {m}</span>
        </div>
        <button onClick={next} className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm font-bold text-slate-700">
          Új feladat ➜
        </button>
      </div>
      <div className="text-sm text-slate-600">
        Becslés: {a} ≈ {roundTo100(a)}, {roundTo100(a)} · {m} = <strong>{roundTo100(a) * m}</strong>
      </div>
      <div className="flex justify-center">
        <div className="inline-grid grid-cols-[repeat(4,3.2rem)_3.5rem] gap-y-1 font-mono text-3xl font-black text-center">
          {MUL_HEADS.map((h, i) => (
            <div key={h} className="text-sm text-white rounded-t-md py-1" style={{ backgroundColor: MUL_COLORS[i] }}>
              {h}
            </div>
          ))}
          <div />
          {digitsA.map((d, i) => (
            <div key={`a${i}`} className="py-1" style={{ backgroundColor: `${MUL_COLORS[i]}1f` }}>
              {d.trim()}
            </div>
          ))}
          <div className="py-1 text-violet-700">· {m}</div>
          <div className="col-span-5 border-t-4 border-slate-800" />
          {resDigits.map((d, i) => {
            const active = !finished && 3 - i === col;
            return (
              <div
                key={`r${i}`}
                className={`py-1 rounded-md relative ${active ? 'ring-4 ring-blue-400 bg-blue-50' : ''} text-blue-700`}
                style={!active ? { backgroundColor: `${MUL_COLORS[i]}1f` } : undefined}
              >
                {carryInto[i] && <span className="absolute right-0.5 top-0 text-sm text-slate-500">{carryInto[i]}</span>}
                {d || (active ? '?' : '')}
              </div>
            );
          })}
          <div />
        </div>
      </div>
      {!finished ? (
        <>
          <div className="text-center text-sm font-bold text-slate-700">
            Melyik számjegyet írod {col === 0 || col === 3 ? 'az' : 'a'}{' '}
            <span style={{ color: MUL_COLORS[3 - col] }}>{COL_NAMES[3 - col]}</span> helyére?
          </div>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {Array.from({ length: 10 }).map((_, d) => (
              <button
                key={d}
                onClick={() => press(d)}
                className={`h-12 rounded-xl text-xl font-black border-2 ${
                  wrong === d ? 'bg-rose-100 border-rose-400 text-rose-700' : 'bg-white border-blue-200 hover:bg-blue-50 text-slate-800'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={() => setShowHint(true)} className="px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-sm font-bold">
              Segítség 💡
            </button>
            {wrong !== null && <span className="text-rose-700 font-bold text-sm">Nem jó! Előbb szorozz, aztán add hozzá a maradékot.</span>}
          </div>
          {showHint && (
            <TheoryCallout type="tip" title="Így gondolkodj">
              {steps[col].hint}
            </TheoryCallout>
          )}
        </>
      ) : (
        <TheoryCallout type="success" title="Kész, ügyes vagy! 🎉">
          {a} · {m} = {result}. A becslés {roundTo100(a) * m} volt, ez közel van hozzá. Ellenőrzés összeadással:{' '}
          {Array.from({ length: m }).map(() => a).join(' + ')} = {result}.
        </TheoryCallout>
      )}
    </div>
  );
};

const TARGET_NUMBERS = [1217, 1136, 642, 2547];

/** II. labor: Találj a célba! A szorzat legyen 4500 és 6000 között (munkafüzet 80. o., 13. feladat). */
const TargetLab: React.FC = () => {
  const [n, setN] = useState<number | null>(null);
  const [m, setM] = useState<number | null>(null);
  const [hits, setHits] = useState<string[]>([]);
  const prod = n !== null && m !== null ? n * m : null;
  const hit = prod !== null && prod > 4500 && prod < 6000;
  const key = n !== null && m !== null ? `${n} · ${m} = ${prod}` : '';

  const choose = (nn: number | null, mm: number | null) => {
    setN(nn);
    setM(mm);
    if (nn !== null && mm !== null) {
      const p = nn * mm;
      const k = `${nn} · ${mm} = ${p}`;
      if (p > 4500 && p < 6000 && !hits.includes(k)) setHits([...hits, k]);
    }
  };

  return (
    <div className="bg-white border-2 border-emerald-200 rounded-2xl p-5 shadow-sm space-y-4">
      <p className="text-sm text-slate-700">
        Válassz egy számot és egy szorzót! A célterület: a szorzat legyen <strong>4500-nál nagyobb, de 6000-nél kisebb</strong>. Előbb
        becsülj fejben!
      </p>
      <div className="flex flex-wrap gap-2">
        {TARGET_NUMBERS.map((t) => (
          <button
            key={t}
            onClick={() => choose(t, m)}
            className={`px-4 h-12 rounded-xl text-lg font-black border-2 ${
              n === t ? 'bg-emerald-600 border-emerald-700 text-white' : 'bg-white border-emerald-200 hover:bg-emerald-50 text-emerald-800'
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
        {[2, 3, 4, 5, 6, 7, 8, 9].map((x) => (
          <button
            key={x}
            onClick={() => choose(n, x)}
            className={`h-12 rounded-xl text-lg font-black border-2 ${
              m === x ? 'bg-violet-600 border-violet-700 text-white' : 'bg-white border-violet-200 hover:bg-violet-50 text-violet-800'
            }`}
          >
            · {x}
          </button>
        ))}
      </div>
      {prod !== null ? (
        <TheoryCallout type={hit ? 'success' : 'warning'} title={hit ? 'Talált! 🎯' : 'Mellé ment!'}>
          {key}.{' '}
          {hit
            ? 'Ez benne van a célterületben.'
            : prod <= 4500
            ? 'Ez túl kicsi, válassz nagyobb szorzót vagy szorzandót!'
            : 'Ez túl nagy, válassz kisebb szorzót vagy szorzandót!'}
        </TheoryCallout>
      ) : (
        <div className="text-sm text-slate-500">Válassz számot és szorzót is!</div>
      )}
      <div className="text-sm text-slate-700">
        <strong>Találataid ({hits.length}):</strong> {hits.length ? hits.join('; ') : 'még nincs'}
      </div>
    </div>
  );
};

export const WrittenMulOneDigitTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  return (
    <TheoryTemplate
      topicId="g4-written-ops"
      subtopicId="irasbeli-szorzas-egyjegyu-szammal"
      grade={4}
      chapterId="irasbeli-muveletek-10000-ig"
      title="2. Írásbeli szorzás egyjegyű számmal"
      subtitle="Négyjegyű szám szorzása egyjegyű számmal: becslés, szorzás az egyesektől kezdve, a maradék továbbvitele, ellenőrzés."
      badge="4. OSZTÁLY • III. ÍRÁSBELI MŰVELETEK • TANANYAG"
      themeColor="blue"
      pdfFilename="4_osztaly_irasbeli_szorzas_egyjegyu_tananyag.pdf"
      practiceTitle="Készen állsz az írásbeli szorzás gyakorlására?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — ÍRÁSBELI SZORZÁS',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center">
              <span className="font-mono text-base font-black text-blue-900 dark:text-blue-200">
                szorzandó · szorzó = szorzat &nbsp;&nbsp; 1623 · 2 = 3246
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>A többjegyű számot szorozzuk az egyjegyűvel, az <strong>egyesekkel</strong> kezdve.</li>
              <li>Előbb <strong>szorzunk</strong>, utána <strong>hozzáadjuk</strong> az előző helyről maradt számot.</li>
              <li>Becslés: a szorzandót százasra kerekítjük. Ellenőrzés: összeadással.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 80. o." badgeColor="blue">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            Egy óceánjáró hajón <strong>1623 kétszemélyes kabin</strong> van. Hány ember lakhat bennük? Ezt már nem jó összeadással
            számolni – sokkal gyorsabb az <strong>írásbeli szorzás</strong>.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Többjegyű szám szorzása egyjegyű számmal írásban.</li>
            <li>A maradék (beváltott tízes, százas, ezres) továbbvitele.</li>
            <li>Becslés a szorzandó százasra kerekítésével, ellenőrzés összeadással.</li>
            <li>Szöveges feladatok: kabinok, múzeumi jegyek, sikló, repülő, színház.</li>
          </ul>
        </div>
      </TheorySection>

      {/* 2. Nézzük meg együtt */}
      <TheorySection title="2. Nézzük meg együtt! 1623 · 2" badge="Tankönyv 80. o." badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <PlaceValueMulSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>Adatok:</strong> 1 kabinban 2 személy, 1623 kabinban ? személy.
            </p>
            <p>
              <strong>Terv:</strong> 1623 · 2 = ?
            </p>
            <p>
              <strong>Becslés:</strong> 1623 ≈ 1600, 1600 · 2 = 3200.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <MulStepsSvg />
          <TheoryTable
            headers={['Lépés', 'Számolás']}
            rows={[
              ['1. lépés – egyesek', '2 · 3 e = 6 e'],
              ['2. lépés – tízesek', '2 · 2 t = 4 t'],
              ['3. lépés – százasok', '2 · 6 sz = 12 sz = 1 E + 2 sz → leírom a 2-t, maradt 1'],
              ['4. lépés – ezresek', '2 · 1 E = 2 E, hozzáadom a maradékot: 2 E + 1 E = 3 E'],
              ['Válasz', 'Legfeljebb 3246 személy lakhat a kabinokban.']
            ]}
          />
        </div>
      </TheorySection>

      {/* 3. Ellenőrzés */}
      <TheorySection title="3. Ellenőrzés összeadással" badge="Tankönyv 80. o." badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <MulCheckSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>Az eredmény (3246) közel van a becsléshez (3200). Jó jel!</p>
            <p>
              A szorzás ismételt összeadás: 1623 · 2 = 1623 + 1623. Ha háromszor szorzol, háromszor add össze: 1244 · 3 = 1244 + 1244 +
              1244 = 3732.
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 4. Több maradék */}
      <TheorySection title="4. Nézzük meg együtt! Több maradék: 2549 · 3" badge="Tankönyv 80. o., 2. feladat" badgeColor="purple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <MulCarrySvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>Becslés:</strong> 2549 ≈ 2500, 2500 · 3 = 7500.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Egyesek: 3 · 9 = 27. Leírom a 7-et, maradt 2.</li>
              <li>Tízesek: 3 · 4 = 12, és még 2: 14. Leírom a 4-et, maradt 1.</li>
              <li>Százasok: 3 · 5 = 15, és még 1: 16. Leírom a 6-ot, maradt 1.</li>
              <li>Ezresek: 3 · 2 = 6, és még 1: 7. Leírom a 7-et.</li>
            </ul>
            <p>
              A szorzat: <strong>7647</strong>.
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 5. Szöveges feladat */}
      <TheorySection title="5. Nézzük meg együtt! Utazás a Budavári Siklóval" badge="Tankönyv 81. o." badgeColor="orange">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <FunicularPricesSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>4 felnőtt, 2 tízéves és 3 kétéves gyerek utazik felfelé (csak egy útra). Mennyit fizetnek?</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Felnőttek: 1200 · 4 = 4800 Ft</li>
              <li>Tízévesek: 700 · 2 = 1400 Ft</li>
              <li>Kétévesek: ingyen utaznak, 0 Ft</li>
              <li>
                Összesen: 4800 + 1400 = <strong>6200 Ft</strong>
              </li>
            </ol>
            <TheoryCard title="Retúrjeggyel?" badge="b) kérdés" badgeColor="orange">
              <p className="text-sm text-slate-700">
                1800 · 4 + 1100 · 2 = 7200 + 2200 = 9400 Ft. Ez 9400 − 6200 = 3200 Ft-tal több.
              </p>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 6. Vigyázz! */}
      <TheorySection title="6. Vigyázz! Előbb szorozz, aztán adj hozzá!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Elfelejtett maradék"
          wrong="2549 · 3 = 6527"
          wrongExplanation="Mindig csak az utolsó számjegyet írta le, a maradékot nem vitte tovább (27 → 7, de a 2 elveszett)."
          correct="2549 · 3 = 7647"
          correctExplanation="A maradékot mindig a következő helyi érték szorzatához add hozzá!"
          tip="A becslés (7500) azonnal megmutatja, hogy a 6527 túl kicsi."
        />
        <TheoryCallout type="warning" title="Ne a maradékot szorozd!">
          A tízeseknél ne így számolj: (4 + 2) · 3 = 18. Helyesen: 3 · 4 = 12, és utána adod hozzá a 2-t: 12 + 2 = 14.
        </TheoryCallout>
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Játékos labor I: Írásbeli szorzás lépésről lépésre" badge="Labor" badgeColor="blue">
        <p className="text-sm text-slate-600">Kattints a helyes számjegyre! A kis szám a szorzat fölött a maradék.</p>
        <MulLab />
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Játékos labor II: Találj a célba!" badge="Labor" badgeColor="emerald">
        <TargetLab />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default WrittenMulOneDigitTheory;
