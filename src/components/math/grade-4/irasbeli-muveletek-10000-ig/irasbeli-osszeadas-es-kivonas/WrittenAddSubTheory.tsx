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
  WrittenAdditionSvg,
  MonaSubtractionSvg,
  ManoSubtractionSvg,
  EstimateSvg,
  FlightRouteSvg,
  SameDifferenceSvg,
  PV_COLORS,
  PV_HEADS
} from './WrittenAddSubFigures';

const COL_NAMES = ['ezresek', 'százasok', 'tízesek', 'egyesek'];

export const roundTo100 = (n: number) => Math.floor((n + 50) / 100) * 100;

interface ColumnStep {
  digit: number;
  carryOut: number;
  hint: string;
}

/**
 * Négyjegyű írásbeli összeadás / kivonás lépései az egyesektől kezdve.
 * Kivonásnál Manó módszerével (pótlással) gondolkodunk: ha nem megy, a felső számjegyhez
 * 10-et adunk, és a következő helyi értéken a kivonandóhoz 1-et („maradt 1”).
 */
export const columnSteps4 = (a: number, b: number, op: '+' | '−'): ColumnStep[] => {
  const steps: ColumnStep[] = [];
  let carry = 0;
  for (let c = 0; c < 4; c++) {
    const da = Math.floor(a / 10 ** c) % 10;
    const db = Math.floor(b / 10 ** c) % 10;
    const name = COL_NAMES[3 - c];
    if (op === '+') {
      const s = da + db + carry;
      const carryText = carry ? ` + 1 (átvitel)` : '';
      steps.push({
        digit: s % 10,
        carryOut: s >= 10 ? 1 : 0,
        hint: `${name}: ${da} + ${db}${carryText} = ${s}. Leírom: ${s % 10}${s >= 10 ? ', maradt 1.' : '.'}`
      });
      carry = s >= 10 ? 1 : 0;
    } else {
      const sub = db + carry;
      const carryText = carry ? ` (${db} + 1, a maradék)` : '';
      if (sub <= da) {
        steps.push({
          digit: da - sub,
          carryOut: 0,
          hint: `${name}: ${sub}${carryText} meg mennyi a ${da}? ${da - sub}, mert ${sub} + ${da - sub} = ${da}. Leírom: ${da - sub}.`
        });
        carry = 0;
      } else {
        steps.push({
          digit: da + 10 - sub,
          carryOut: 1,
          hint: `${name}: ${sub}${carryText} meg mennyi a ${da}? Nem megy, ezért ${sub} meg mennyi a ${da + 10}? ${da + 10 - sub}, maradt 1.`
        });
        carry = 1;
      }
    }
  }
  return steps;
};

const ADD_PROBLEMS: [number, number][] = [
  [3845, 2850],
  [3246, 2415],
  [2548, 3278],
  [2858, 3642],
  [4693, 3287],
  [3956, 2876]
];
const SUB_PROBLEMS: [number, number][] = [
  [7212, 5410],
  [5846, 2415],
  [7426, 4813],
  [6300, 3649],
  [8000, 2873],
  [9007, 2879]
];

const ColumnOpLab: React.FC<{ op: '+' | '−' }> = ({ op }) => {
  const problems = op === '+' ? ADD_PROBLEMS : SUB_PROBLEMS;
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState<number[]>([]);
  const [wrong, setWrong] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [a, b] = problems[idx];
  const steps = columnSteps4(a, b, op);
  const col = done.length; // 0 = egyesek … 3 = ezresek
  const finished = col >= 4;
  const result = op === '+' ? a + b : a - b;
  const lastCarry = op === '+' && finished && steps[3].carryOut === 1;

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

  const digitsA = String(a).padStart(4, ' ').split('');
  const digitsB = String(b).padStart(4, ' ').split('');
  const resDigits = [3, 2, 1, 0].map((c) => (done[c] !== undefined ? String(done[c]) : ''));
  const carryInto = [3, 2, 1, 0].map((c) => (c > 0 && done.length >= c && steps[c - 1].carryOut ? '1' : ''));
  const est = op === '+' ? roundTo100(a) + roundTo100(b) : roundTo100(a) - roundTo100(b);

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
        Becslés százasra kerekítve: {roundTo100(a)} {op} {roundTo100(b)} = <strong>{est}</strong>
      </div>

      <div className="flex justify-center">
        <div className="inline-grid grid-cols-[2rem_repeat(5,3.2rem)] gap-y-1 font-mono text-3xl font-black text-center">
          <div />
          <div />
          {PV_HEADS.map((h, i) => (
            <div key={h} className="text-sm text-white rounded-t-md py-1" style={{ backgroundColor: PV_COLORS[i] }}>
              {h}
            </div>
          ))}
          <div />
          <div />
          {digitsA.map((d, i) => (
            <div key={`a${i}`} className="py-1" style={{ backgroundColor: `${PV_COLORS[i]}1f` }}>
              {d.trim()}
            </div>
          ))}
          <div className="py-1">{op}</div>
          <div />
          {digitsB.map((d, i) => (
            <div key={`b${i}`} className="py-1 relative" style={{ backgroundColor: `${PV_COLORS[i]}1f` }}>
              {d.trim()}
              {carryInto[i] && <span className="absolute right-0.5 bottom-0 text-sm text-slate-500">{carryInto[i]}</span>}
            </div>
          ))}
          <div className="col-span-6 border-t-4 border-slate-800" />
          <div />
          <div className="py-1 text-indigo-700">{lastCarry ? '1' : ''}</div>
          {resDigits.map((d, i) => {
            const active = !finished && 3 - i === col;
            const leadingZero = finished && op === '−' && i < 4 - String(result).length;
            return (
              <div
                key={`r${i}`}
                className={`py-1 rounded-md ${active ? 'ring-4 ring-indigo-400 bg-indigo-50' : ''} ${leadingZero ? 'text-slate-300' : 'text-indigo-700'}`}
                style={!active ? { backgroundColor: `${PV_COLORS[i]}1f` } : undefined}
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
            Melyik számjegyet írod {col === 0 || col === 3 ? 'az' : 'a'}{' '}
            <span style={{ color: PV_COLORS[3 - col] }}>{COL_NAMES[3 - col]}</span> helyére?
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
            {wrong !== null && <span className="text-rose-700 font-bold text-sm">Nem jó, próbáld újra! Figyelj a maradékra.</span>}
          </div>
          {showHint && (
            <TheoryCallout type="tip" title="Így gondolkodj">
              {steps[col].hint}
            </TheoryCallout>
          )}
        </>
      ) : (
        <TheoryCallout type="success" title="Kész, ügyes vagy! 🎉">
          {a} {op} {b} = {result}. A becslés {est} volt, ez közel van. Ellenőrzés:{' '}
          {op === '+' ? `${b} + ${a} = ${result} (a tagok felcserélésével)` : `${result} + ${b} = ${a} (összeadással)`}.
        </TheoryCallout>
      )}
    </div>
  );
};

/** II. labor: a különbség nem változik, ha mindkét számot ugyanannyival növeljük. */
const SameDifferenceLab: React.FC = () => {
  const [add, setAdd] = useState(0);
  const a = 4876;
  const b = 1325;
  const steps = [0, 10, 100, 1000];
  return (
    <div className="bg-white border-2 border-purple-200 rounded-2xl p-5 shadow-sm space-y-4">
      <p className="text-sm text-slate-700">
        Válaszd ki, mennyit adjunk <strong>a kisebbítendőhöz és a kivonandóhoz is</strong>! Figyeld a különbséget!
      </p>
      <div className="flex flex-wrap gap-2">
        {steps.map((s) => (
          <button
            key={s}
            onClick={() => setAdd(s)}
            className={`px-4 h-12 rounded-xl text-lg font-black border-2 ${
              add === s ? 'bg-purple-600 border-purple-700 text-white' : 'bg-white border-purple-200 hover:bg-purple-50 text-purple-800'
            }`}
          >
            {s === 0 ? 'Eredeti' : `+ ${s}`}
          </button>
        ))}
      </div>
      <div className="flex justify-center">
        <div className="font-mono text-3xl font-black text-right leading-snug">
          <div>{a + add}</div>
          <div>− {b + add}</div>
          <div className="border-t-4 border-slate-800 text-purple-700">{a - b}</div>
        </div>
      </div>
      <TheoryCallout type="info" title="Mit tapasztalsz?">
        {add === 0
          ? `${a} − ${b} = ${a - b}. Most nyomd meg a „+ 10”, „+ 100” vagy „+ 1000” gombot!`
          : `${a + add} − ${b + add} = ${a - b}. Mindkét számhoz ${add}${add === 100 ? '-at' : '-et'} adtunk, és a különbség nem változott! Manó is ezt használja: 10 százast ad fent, 1 ezrest lent.`}
      </TheoryCallout>
    </div>
  );
};

export const WrittenAddSubTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  return (
    <TheoryTemplate
      topicId="g4-written-ops"
      subtopicId="irasbeli-osszeadas-es-kivonas"
      grade={4}
      chapterId="irasbeli-muveletek-10000-ig"
      title="1. Írásbeli összeadás és kivonás"
      subtitle="Négyjegyű számok összeadása és kivonása írásban: becslés, helyi érték szerint egymás alá, ellenőrzés."
      badge="4. OSZTÁLY • III. ÍRÁSBELI MŰVELETEK • TANANYAG"
      themeColor="indigo"
      pdfFilename="4_osztaly_irasbeli_osszeadas_kivonas_tananyag.pdf"
      practiceTitle="Készen állsz az írásbeli összeadás és kivonás gyakorlására?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — ÍRÁSBELI ÖSSZEADÁS ÉS KIVONÁS',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-center">
              <span className="font-mono text-base font-black text-indigo-900 dark:text-indigo-200">
                Adatok → terv → becslés → számítás → ellenőrzés → válasz
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Helyi érték szerint írd egymás alá (E, sz, t, e), és az <strong>egyesekkel</strong> kezdd!</li>
              <li>
                <strong>Összeadás:</strong> tag + tag = összeg. Ellenőrzés: a tagok felcserélésével.
              </li>
              <li>
                <strong>Kivonás:</strong> kisebbítendő − kivonandó = különbség. Ellenőrzés: különbség + kivonandó = kisebbítendő.
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 70–71. o." badgeColor="indigo">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            A napköziben a gyerekek a földgömbbel „utaznak”: a Nílus 6852 km, a Duna 2888 km hosszú. Ilyen nagy számokat már
            nehéz fejben összeadni vagy kivonni. Ezért <strong>írásban</strong> számolunk, ugyanúgy, mint 1000-ig, csak most
            van egy új oszlop is: az <strong>ezresek</strong> (E).
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Négyjegyű számok írásbeli összeadása, két vagy több taggal.</li>
            <li>Négyjegyű számok írásbeli kivonása.</li>
            <li>Becslés százasra és ezresre kerekített értékekkel.</li>
            <li>Ellenőrzés, hiányzó számok, szöveges feladatok (utazás, folyók, cirkusz, vásárlás).</li>
          </ul>
        </div>
      </TheorySection>

      {/* 2. Becslés */}
      <TheorySection title="2. Először becsülj!" badge="Tankönyv 71. o." badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <EstimateSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              Laci osztálya a Balatonhoz kirándult. A vonatjegy oda-vissza <strong>3845 Ft</strong>, a hajójegy{' '}
              <strong>2850 Ft</strong> volt. Mennyi volt egy gyerek útiköltsége?
            </p>
            <p>
              <strong>Terv:</strong> 3845 Ft + 2850 Ft = ?
            </p>
            <p>
              A becslés megmutatja, körülbelül mennyi lesz az eredmény. Ha a számításod nagyon messze van tőle, valahol hibáztál!
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 3. Írásbeli összeadás */}
      <TheorySection title="3. Nézzük meg együtt! Írásbeli összeadás" badge="Tankönyv 71. o." badgeColor="orange">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <WrittenAdditionSvg />
          <TheoryTable
            headers={['Lépés', 'Mit csinálunk?', '3845 + 2850']}
            rows={[
              ['1. lépés', 'Egyesek', '5 e + 0 e = 5 e'],
              ['2. lépés', 'Tízesek', '4 t + 5 t = 9 t'],
              ['3. lépés', 'Százasok – 10-nél több!', '8 sz + 8 sz = 16 sz = 1 E + 6 sz → leírom a 6-ot, maradt 1'],
              ['4. lépés', 'Ezresek + a beváltott ezres', '3 E + 2 E = 5 E, 5 E + 1 E = 6 E'],
              ['Ellenőrzés', 'Felcseréljük a tagokat', '2850 + 3845 = 6695 ✔']
            ]}
          />
        </div>
        <TheoryCallout type="success" title="Válasz">
          Egy gyerek útiköltsége 6695 Ft volt. Ez közel van a becsléshez (6700), tehát jól számoltunk.
        </TheoryCallout>
        <TheoryCard title="Több tag is lehet!" badge="MF 69. o." badgeColor="orange">
          <p className="text-sm text-slate-700">
            2568 + 4213 + 78: írd mindhárom számot helyi érték szerint egymás alá! Egyesek: 8 + 3 + 8 = 19, leírom a 9-et, maradt 1.
            Tízesek: 1 + 6 + 1 + 7 = 15, leírom az 5-öt, maradt 1. Százasok: 1 + 5 + 2 = 8. Ezresek: 2 + 4 = 6. Az összeg:{' '}
            <strong>6859</strong>.
          </p>
        </TheoryCard>
      </TheorySection>

      {/* 4. Írásbeli kivonás */}
      <TheorySection title="4. Nézzük meg együtt! Írásbeli kivonás: 7212 − 5410" badge="Tankönyv 73. o." badgeColor="teal">
        <p className="text-sm text-slate-700 leading-relaxed">
          Becslés: százasra kerekítve 7200 − 5400 = 1800, ezresre kerekítve 7000 − 5000 = 2000. Az egyesekkel kezdünk:
          2 e − 0 e = 2 e, 1 t − 1 t = 0 t. A százasoknál baj van: <strong>2 százasból nem lehet 4 százast elvenni.</strong> Mona
          és Manó kétféleképpen oldja meg:
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <TheoryCard title="Mona módszere: felváltás" badge="1. mód" badgeColor="rose">
            <MonaSubtractionSvg />
            <p className="text-sm text-slate-700 mt-2">
              1 ezrest felvált 10 százasra: 12 sz − 4 sz = 8 sz. A 7 ezresből 6 marad: 6 E − 5 E = 1 E.
            </p>
          </TheoryCard>
          <TheoryCard title="Manó módszere: mindkettőhöz adunk" badge="2. mód" badgeColor="sky">
            <ManoSubtractionSvg />
            <p className="text-sm text-slate-700 mt-2">
              A kisebbítendőhöz 10 százast ad: 12 sz − 4 sz = 8 sz. Hogy a különbség ne változzon, a kivonandóhoz 1 ezrest ad:
              7 E − 6 E = 1 E.
            </p>
          </TheoryCard>
        </div>
        <TheoryCallout type="tip" title="Manó módszere pótlással mondva">
          Százasok: „4 meg mennyi a 2? Nem megy. 4 meg mennyi a 12? <strong>8</strong>, maradt 1.” Ezresek: „5 + 1 = 6. 6 meg
          mennyi a 7? <strong>1</strong>.” A különbség: <strong>1802</strong>. Ellenőrzés: 1802 + 5410 = 7212 ✔
        </TheoryCallout>
      </TheorySection>

      {/* 5. Szöveges feladat */}
      <TheorySection title="5. Nézzük meg együtt! Repülőút" badge="Tankönyv 72. o." badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <FlightRouteSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>Gabriella Budapestről Párizsba repült, onnan Rómába. Hány kilométert utazott?</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Becslés: 1200 + 1100 = 2300</li>
              <li>Számítás: 1246 + 1106 = <strong>2352</strong></li>
              <li>Ellenőrzés: 1106 + 1246 = 2352 ✔</li>
              <li>Válasz: Gabriella 2352 km-t utazott repülővel.</li>
            </ol>
          </div>
        </div>
      </TheorySection>

      {/* 6. Vigyázz! */}
      <TheorySection title="6. Vigyázz! Tipikus hibák" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Fordított kivonás oszloponként"
          wrong="7212 − 5410 = 2202"
          wrongExplanation="A százasoknál 4 − 2 = 2-t számolt, vagyis az alsó számból vonta ki a felsőt. Mindig a felső számból (kisebbítendő) vonunk ki!"
          correct="7212 − 5410 = 1802"
          correctExplanation="4 meg mennyi a 12? 8, maradt 1. Az 1-et a következő helyen a kivonandóhoz adjuk: 5 + 1 = 6, 6 meg mennyi a 7? 1."
          tip="Ellenőrizz összeadással: 1802 + 5410 = 7212."
        />
        <TheoryCallout type="warning" title="A maradékot se felejtsd el!">
          3845 + 2850 nem 5695! A százasoknál 16 lett, ezért 1 ezrest tovább kell vinni. A becslés (6700) segít észrevenni a hibát.
        </TheoryCallout>
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Játékos labor I: Írásbeli összeadás és kivonás lépésről lépésre" badge="Labor" badgeColor="indigo">
        <p className="text-sm text-slate-600">Kattints a helyes számjegyre! Az egyesekkel kezdünk, a kis 1-es a maradék.</p>
        <ColumnOpLab op="+" />
        <p className="text-sm text-slate-600">Most kivonás! Gondolkodj pótlással: „4 meg mennyi a 12? 8, maradt 1.”</p>
        <ColumnOpLab op="−" />
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Játékos labor II: Nem változik a különbség!" badge="Labor" badgeColor="purple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <SameDifferenceSvg />
          <SameDifferenceLab />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default WrittenAddSubTheory;
