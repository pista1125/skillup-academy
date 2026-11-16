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
  MentalJumpSvg,
  WrittenAdditionSvg,
  WrittenSubtractionSvg,
  EstimateSvg,
  GiftShopSvg
} from './AddSub1000Figures';

const COL_COLORS = ['#dc2626', '#0ea5e9', '#eab308']; // sz, t, e
const COL_NAMES = ['százasok', 'tízesek', 'egyesek'];

const roundTo100 = (n: number) => Math.floor((n + 50) / 100) * 100;

interface ColumnStep {
  digit: number;
  carryOut: number;
  hint: string;
}

/** Az írásbeli összeadás / kivonás (pótlással) lépései az egyesektől kezdve. */
export const columnSteps = (a: number, b: number, op: '+' | '−'): ColumnStep[] => {
  const steps: ColumnStep[] = [];
  let carry = 0;
  for (let c = 0; c < 3; c++) {
    const da = Math.floor(a / 10 ** c) % 10;
    const db = Math.floor(b / 10 ** c) % 10;
    const name = COL_NAMES[2 - c];
    if (op === '+') {
      const s = da + db + carry;
      const carryText = carry ? ` + ${carry} (átvitel)` : '';
      steps.push({
        digit: s % 10,
        carryOut: s >= 10 ? 1 : 0,
        hint: `${name}: ${da} + ${db}${carryText} = ${s}. Leírom: ${s % 10}${s >= 10 ? ', maradt 1.' : '.'}`
      });
      carry = s >= 10 ? 1 : 0;
    } else {
      const sub = db + carry;
      const carryText = carry ? ` (${db} + 1 átvitel)` : '';
      if (sub <= da) {
        steps.push({
          digit: da - sub,
          carryOut: 0,
          hint: `${name}: ${sub}${carryText} + ? = ${da}. Mivel ${sub} + ${da - sub} = ${da}, leírom: ${da - sub}.`
        });
        carry = 0;
      } else {
        steps.push({
          digit: da + 10 - sub,
          carryOut: 1,
          hint: `${name}: ${sub}${carryText} + ? = ${da}? Nem megy, ezért pótolunk ${da + 10}-ig: ${sub} + ${da + 10 - sub} = ${da + 10}. Leírom: ${da + 10 - sub}, maradt 1.`
        });
        carry = 1;
      }
    }
  }
  return steps;
};

const ADD_PROBLEMS: [number, number][] = [
  [448, 263],
  [346, 259],
  [476, 295],
  [237, 457],
  [352, 430],
  [264, 672]
];
const SUB_PROBLEMS: [number, number][] = [
  [931, 456],
  [934, 456],
  [645, 297],
  [873, 254],
  [764, 467],
  [952, 786]
];

const ColumnOpLab: React.FC<{ op: '+' | '−' }> = ({ op }) => {
  const problems = op === '+' ? ADD_PROBLEMS : SUB_PROBLEMS;
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState<number[]>([]); // beírt számjegyek az egyesektől
  const [wrong, setWrong] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [a, b] = problems[idx];
  const steps = columnSteps(a, b, op);
  const col = done.length; // 0 = egyesek, 1 = tízesek, 2 = százasok
  const finished = col >= 3;
  const result = op === '+' ? a + b : a - b;

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
    setIdx((i) => (i + 1) % problems.length);
    setDone([]);
    setWrong(null);
    setShowHint(false);
  };

  const digitsA = String(a).padStart(3, ' ').split('');
  const digitsB = String(b).padStart(3, ' ').split('');
  // eredmény számjegyei sz–t–e sorrendben
  const resDigits = [2, 1, 0].map((c) => (done[c] !== undefined ? String(done[c]) : ''));
  // átvitel: a c. oszlopból a (c+1). oszlopba, ha már kiszámoltuk
  const carryInto = [2, 1, 0].map((c) => (c > 0 && done.length >= c && steps[c - 1].carryOut ? '1' : ''));
  const leadingZero = op === '−' && finished && result < 100;

  return (
    <div className="bg-white border-2 border-indigo-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-base font-bold text-slate-700">
          Számold ki írásban: <span className="text-indigo-700 font-black text-xl">{a} {op} {b}</span>
        </div>
        <button onClick={next} className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm font-bold text-slate-700">
          Új feladat ➜
        </button>
      </div>

      <div className="text-sm text-slate-600">
        Becslés: {roundTo100(a)} {op} {roundTo100(b)} = <strong>{op === '+' ? roundTo100(a) + roundTo100(b) : roundTo100(a) - roundTo100(b)}</strong>
      </div>

      <div className="flex justify-center">
        <div className="inline-grid grid-cols-[2rem_repeat(3,3.5rem)] gap-y-1 font-mono text-3xl font-black text-center">
          <div />
          {['sz', 't', 'e'].map((h, i) => (
            <div key={h} className="text-sm text-white rounded-t-md py-1" style={{ backgroundColor: COL_COLORS[i] }}>
              {h}
            </div>
          ))}
          <div />
          {digitsA.map((d, i) => (
            <div key={`a${i}`} className="py-1" style={{ backgroundColor: `${COL_COLORS[i]}1f` }}>
              {d.trim()}
            </div>
          ))}
          <div className="py-1">{op}</div>
          {digitsB.map((d, i) => (
            <div key={`b${i}`} className="py-1 relative" style={{ backgroundColor: `${COL_COLORS[i]}1f` }}>
              {d.trim()}
              {carryInto[i] && <span className="absolute right-0.5 bottom-0 text-sm text-slate-500">{carryInto[i]}</span>}
            </div>
          ))}
          <div className="col-span-4 border-t-4 border-slate-800" />
          <div />
          {resDigits.map((d, i) => {
            const active = !finished && 2 - i === col;
            return (
              <div
                key={`r${i}`}
                className={`py-1 rounded-md ${active ? 'ring-4 ring-indigo-400 bg-indigo-50' : ''} ${
                  leadingZero && i === 0 ? 'text-slate-300' : 'text-indigo-700'
                }`}
                style={!active ? { backgroundColor: `${COL_COLORS[i]}1f` } : undefined}
              >
                {d || (active ? '?' : '')}
              </div>
            );
          })}
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
                  wrong === d ? 'bg-rose-100 border-rose-400 text-rose-700' : 'bg-white border-indigo-200 hover:bg-indigo-50 text-slate-800'
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
            {wrong !== null && <span className="text-rose-700 font-bold text-sm">Nem jó, próbáld újra! Ne felejtsd el az átvitelt.</span>}
          </div>
          {showHint && (
            <TheoryCallout type="tip" title="Így gondolkodj">
              {steps[col].hint}
            </TheoryCallout>
          )}
        </>
      ) : (
        <TheoryCallout type="success" title="Kész, ügyes vagy! 🎉">
          {a} {op} {b} = {result}. Ellenőrzés:{' '}
          {op === '+' ? `${b} + ${a} = ${result} (a tagok felcserélésével)` : `${result} + ${b} = ${a} (összeadással)`}.
        </TheoryCallout>
      )}
    </div>
  );
};

export const AddSub1000Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  return (
    <TheoryTemplate
      topicId="g4-count-10k"
      subtopicId="osszeadas-kivonas-1000-ig"
      title="2. Összeadás és kivonás 1000-ig"
      subtitle="Fejben számolás kerek számokkal, becslés, írásbeli összeadás és kivonás, ellenőrzés."
      badge="4. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 10 000-IG • TANANYAG"
      themeColor="indigo"
      pdfFilename="4_osztaly_osszeadas_kivonas_1000_ig_tananyag.pdf"
      practiceTitle="Készen állsz az összeadás és kivonás gyakorlására?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — ÍRÁSBELI MŰVELETEK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-center">
              <span className="font-mono text-base font-black text-indigo-900 dark:text-indigo-200">
                Becsülj → írd egymás alá helyi érték szerint → kezdd az egyesekkel → ellenőrizz!
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Összeadás:</strong> tag + tag = összeg.
              </li>
              <li>
                <strong>Kivonás:</strong> kisebbítendő − kivonandó = különbség.
              </li>
              <li>Az átvitelt (a kis 1-est) mindig vidd tovább a következő helyi értékre!</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 11. o." badgeColor="indigo">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            A nyári szünetben sokan kirándultak nemzeti parkokba, strandokra, táborokba. Közben rengeteget számoltak: hányan voltak, mennyibe került a belépő, mennyi pénz maradt.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Kerek tízesek és százasok összeadása, kivonása fejben 1000-ig.</li>
            <li>Becslés százasra kerekített számokkal.</li>
            <li>Írásbeli összeadás és kivonás, a műveletek tagjainak neve.</li>
            <li>Ellenőrzés, hiányzó számok pótlása, szöveges feladatok.</li>
          </ul>
        </div>
      </TheorySection>

      {/* 2. Fejben */}
      <TheorySection title="2. Fejben számolás: bontsd részekre!" badge="Tankönyv 12–14. o." badgeColor="purple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <MentalJumpSvg />
          <div className="space-y-3">
            <TheoryCard title="Nézzük meg együtt! 250 + 170" badge="4. feladat" badgeColor="indigo">
              <p className="text-sm text-slate-700">Egy üdülőben 250 gyerek és 170 felnőtt nyaralt. Többféleképpen is számolhatunk:</p>
              <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1 mt-1">
                <li>250 + 100 + 70 = 350 + 70 = <strong>420</strong></li>
                <li>250 + 50 + 120 = 300 + 120 = <strong>420</strong></li>
              </ul>
              <p className="text-sm text-slate-700 mt-1">Összesen 420-an nyaraltak.</p>
            </TheoryCard>
            <TheoryCard title="Nézzük meg együtt! 450 − 170" badge="10. feladat" badgeColor="purple">
              <p className="text-sm text-slate-700">450 tanulóból 170 táborozott. Hányan nem voltak táborban?</p>
              <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1 mt-1">
                <li>450 − 100 − 70 = 350 − 70 = <strong>280</strong></li>
                <li>450 − 50 − 120 = 400 − 120 = <strong>280</strong></li>
              </ul>
            </TheoryCard>
          </div>
        </div>
        <TheoryCallout type="tip" title="Kiegészítés 1000-re">
          Hány kell még 1000-hez? 730 + 270 = 1000, mert 730 + 70 = 800, és 800 + 200 = 1000.
        </TheoryCallout>
      </TheorySection>

      {/* 3. Becslés + írásbeli összeadás */}
      <TheorySection title="3. Írásbeli összeadás" badge="Tankönyv 15. o." badgeColor="orange">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <EstimateSvg />
          <WrittenAdditionSvg />
        </div>
        <TheoryTable
          headers={['Lépés', 'Mit csinálunk?', '448 + 263']}
          rows={[
            ['1. Becslés', 'Százasra kerekítünk, és fejben összeadjuk.', '400 + 300 = 700'],
            ['2. Egyesek', 'Az egyesekkel kezdünk.', '8 + 3 = 11 → leírom az 1-et, maradt 1'],
            ['3. Tízesek', 'Hozzáadjuk az átvitelt is.', '4 + 6 + 1 = 11 → leírom az 1-et, maradt 1'],
            ['4. Százasok', 'Itt is jöhet átvitel.', '4 + 2 + 1 = 7'],
            ['5. Ellenőrzés', 'Felcseréljük a tagokat.', '263 + 448 = 711 ✔']
          ]}
        />
      </TheorySection>

      {/* 4. Írásbeli kivonás */}
      <TheorySection title="4. Írásbeli kivonás" badge="Tankönyv 16. o." badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <WrittenSubtractionSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>Becslés:</strong> 931 ≈ 900, 456 ≈ 500, így 900 − 500 = 400.
            </p>
            <p>A kivonást is az egyesekkel kezdjük, és <strong>pótlással</strong> gondolkodunk:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Egyesek: 6 meg mennyi az 1? Nem megy, ezért 6 meg mennyi a 11? <strong>5</strong>, maradt 1.</li>
              <li>Tízesek: 5 + 1 = 6. 6 meg mennyi a 3? Nem megy, 6 meg mennyi a 13? <strong>7</strong>, maradt 1.</li>
              <li>Százasok: 4 + 1 = 5. 5 meg mennyi a 9? <strong>4</strong>.</li>
            </ul>
            <p>
              Különbség: <strong>475</strong>. Ellenőrzés összeadással: 475 + 456 = 931 ✔
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 5. Szöveges feladat */}
      <TheorySection title="5. Nézzük meg együtt! Vásárlás 1000 Ft-ból" badge="Tankönyv 13. o." badgeColor="rose">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <GiftShopSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>Dávid 1000 Ft-ot kapott ajándékokra. Három dolgot vett: plakátot, hűtőmágnest és képeslapot.</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Mennyibe került? 290 + 450 + 70 = <strong>810 Ft</strong></li>
              <li>Mennyi maradt? 1000 − 810 = <strong>190 Ft</strong></li>
              <li>Válasz: Dávidnak 190 Ft-ja maradt.</li>
            </ol>
          </div>
        </div>
      </TheorySection>

      {/* 6. Vigyázz! */}
      <TheorySection title="6. Vigyázz! Ne a kisebből vond ki a nagyobbat" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Fordított kivonás oszloponként"
          wrong="931 − 456 = 525"
          wrongExplanation="Az egyeseknél 6 − 1 = 5-öt, a tízeseknél 5 − 3 = 2-t számolt. Mindig a felső számból (kisebbítendő) kell kivonni!"
          correct="931 − 456 = 475"
          correctExplanation="Ha nem megy, pótolj a következő tízig: 6 meg mennyi a 11? 5, és maradt 1."
          tip="Ellenőrizz összeadással: különbség + kivonandó = kisebbítendő."
        />
        <TheoryCallout type="warning" title="Az átvitelt se felejtsd el!">
          448 + 263 nem 601! Ha elfelejted a maradékot, kisebb eredményt kapsz. A becslés (700) segít észrevenni a hibát.
        </TheoryCallout>
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Játékos labor I: Írásbeli összeadás lépésről lépésre" badge="Labor" badgeColor="indigo">
        <p className="text-sm text-slate-600">Kattints a helyes számjegyre! Az egyesekkel kezdünk, a kis 1-es az átvitel.</p>
        <ColumnOpLab op="+" />
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Játékos labor II: Írásbeli kivonás pótlással" badge="Labor" badgeColor="teal">
        <p className="text-sm text-slate-600">Gondolkodj pótlással: „6 meg mennyi a 11?” Ha elakadsz, kérj segítséget!</p>
        <ColumnOpLab op="−" />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default AddSub1000Theory;
