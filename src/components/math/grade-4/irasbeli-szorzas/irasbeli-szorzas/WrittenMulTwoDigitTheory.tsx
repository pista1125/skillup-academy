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
  MonaReadingSvg,
  SwapCheckSvg,
  TwoWaysSvg,
  ShortcutSvg,
  EstimateSvg,
  BridgeSvg,
  BRIDGE_NUMBERS,
  WM2_COLORS
} from './WrittenMulTwoDigitFigures';

export const round10 = (n: number) => Math.floor((n + 5) / 10) * 10;

export interface Mul2Step {
  row: 'p1' | 'p2' | 'sum';
  offset: number; // 0 = egyesek oszlopa, 1 = tízesek …
  digit: number;
  carryOut: number;
  hint: string;
}

const PLACE = ['egyesek', 'tízesek', 'százasok', 'ezresek', 'tízezresek'];

/**
 * Írásbeli szorzás kétjegyű szorzóval, az egyesekkel kezdve (tankönyv 138. o.):
 * 1. részletszorzat: a szorzandó · a szorzó egyesei, 2. részletszorzat: a szorzandó · a szorzó tízesei
 * egy hellyel balra tolva, végül a részletszorzatok összeadása.
 */
export const mul2Steps = (a: number, b: number): Mul2Step[] => {
  const e = b % 10;
  const t = Math.floor(b / 10);
  const digitsA = String(a).split('').reverse().map(Number);
  const steps: Mul2Step[] = [];
  const partial = (m: number, row: 'p1' | 'p2', shift: number, label: string) => {
    let carry = 0;
    digitsA.forEach((d, i) => {
      const prod = d * m;
      const total = prod + carry;
      const out = Math.floor(total / 10);
      steps.push({
        row,
        offset: i + shift,
        digit: total % 10,
        carryOut: out,
        hint: `${label}: ${m} · ${d} = ${prod}${carry ? `, és még ${carry}: ${total}` : ''}. Leírom: ${total % 10}${out ? `, maradt ${out}.` : '.'}`
      });
      carry = out;
    });
    if (carry) {
      steps.push({ row, offset: digitsA.length + shift, digit: carry, carryOut: 0, hint: `Nincs több számjegy, ezért leírom a maradékot: ${carry}.` });
    }
  };
  partial(e, 'p1', 0, `1. részletszorzat (${e} egyessel szorzok)`);
  partial(t, 'p2', 1, `2. részletszorzat (${t} tízessel szorzok, egy hellyel balra írom)`);
  const p1 = new Map(steps.filter((s) => s.row === 'p1').map((s) => [s.offset, s.digit]));
  const p2 = new Map(steps.filter((s) => s.row === 'p2').map((s) => [s.offset, s.digit]));
  const len = String(a * b).length;
  let carry = 0;
  for (let off = 0; off < len; off++) {
    const x = p1.get(off) ?? 0;
    const y = p2.get(off) ?? 0;
    const total = x + y + carry;
    const out = Math.floor(total / 10);
    steps.push({
      row: 'sum',
      offset: off,
      digit: total % 10,
      carryOut: out,
      hint: `Összeadás, ${PLACE[off]}: ${x} + ${y}${carry ? ` + ${carry}` : ''} = ${total}. Leírom: ${total % 10}${out ? `, maradt ${out}.` : '.'}`
    });
    carry = out;
  }
  return steps;
};

const PROBLEMS: [number, number][] = [
  [12, 14],
  [21, 14],
  [26, 24],
  [75, 27],
  [29, 48],
  [85, 16],
  [47, 32],
  [239, 36],
  [174, 28],
  [384, 25]
];

const NCOL = 5; // offset 4..0

/** I. labor: írásbeli szorzás kétjegyű szorzóval lépésről lépésre. */
const Mul2Lab: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState(0);
  const [wrong, setWrong] = useState<number | null>(null);
  const [hint, setHint] = useState(false);
  const [a, b] = PROBLEMS[idx];
  const steps = mul2Steps(a, b);
  const finished = done >= steps.length;
  const cur = finished ? null : steps[done];
  const product = a * b;

  const cellDigit = (row: 'p1' | 'p2' | 'sum', off: number) => {
    const i = steps.findIndex((s) => s.row === row && s.offset === off);
    if (i === -1 || i >= done) return null;
    return steps[i].digit;
  };
  const carryInto = (row: 'p1' | 'p2' | 'sum', off: number) => {
    const i = steps.findIndex((s) => s.row === row && s.offset === off - 1);
    if (i === -1 || i >= done || !steps[i].carryOut) return '';
    // a maradékot csak addig mutatjuk, amíg nincs leírva a következő számjegy, utána halványan marad
    return String(steps[i].carryOut);
  };
  const press = (d: number) => {
    if (!cur) return;
    if (d === cur.digit) {
      setDone(done + 1);
      setWrong(null);
      setHint(false);
    } else setWrong(d);
  };
  const next = () => {
    setIdx((idx + 1) % PROBLEMS.length);
    setDone(0);
    setWrong(null);
    setHint(false);
  };

  const aDigits = String(a).split('').reverse().map(Number);
  const rowCells = (row: 'p1' | 'p2' | 'sum', color: string) =>
    Array.from({ length: NCOL }).map((_, k) => {
      const off = NCOL - 1 - k;
      const d = cellDigit(row, off);
      const active = cur && cur.row === row && cur.offset === off;
      const zero = row === 'p2' && off === 0;
      const carry = row !== 'sum' ? carryInto(row, off) : '';
      return (
        <div
          key={`${row}${off}`}
          className={`relative w-11 h-12 flex items-center justify-center border border-sky-100 ${active ? 'ring-4 ring-blue-400 bg-blue-50 rounded-md' : ''}`}
          style={{ color: zero ? WM2_COLORS.zero : color }}
        >
          {carry && <span className="absolute right-0.5 top-0 text-xs text-slate-500">{carry}</span>}
          {zero ? '0' : d !== null ? d : active ? '?' : ''}
        </div>
      );
    });
  const sumCarries = Array.from({ length: NCOL }).map((_, k) => {
    const off = NCOL - 1 - k;
    const c = carryInto('sum', off);
    return (
      <div key={`sc${off}`} className="w-11 h-4 text-xs text-center text-slate-500 leading-4">
        {c}
      </div>
    );
  });

  return (
    <div className="bg-white border-2 border-orange-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-base font-bold text-slate-700">
          Szorozz írásban:{' '}
          <span className="text-orange-700 font-black text-xl">
            {a} · {b}
          </span>
        </div>
        <button onClick={next} className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm font-bold text-slate-700">
          Új feladat ➜
        </button>
      </div>
      <div className="text-sm text-slate-600">
        Becslés: {a} ≈ {round10(a)}, {b} ≈ {round10(b)}, {round10(a)} · {round10(b)} = <strong>{round10(a) * round10(b)}</strong>
      </div>
      <div className="flex justify-center overflow-x-auto">
        <div className="font-mono text-2xl font-black">
          <div className="flex">
            <div className="w-8" />
            {Array.from({ length: NCOL }).map((_, k) => {
              const off = NCOL - 1 - k;
              return (
                <div key={`a${off}`} className="w-11 h-12 flex items-center justify-center border border-sky-100 text-slate-900">
                  {aDigits[off] ?? ''}
                </div>
              );
            })}
            <div className="w-8 h-12 flex items-center justify-center text-violet-700">·</div>
            <div className="h-12 flex items-center text-violet-700">{b}</div>
          </div>
          <div className="flex border-t-4 border-slate-800 ml-8" style={{ width: `${NCOL * 2.75}rem` }} />
          <div className="flex">
            <div className="w-8" />
            {rowCells('p1', WM2_COLORS.p1)}
          </div>
          <div className="flex">
            <div className="w-8 h-12 flex items-center justify-center text-slate-800">+</div>
            {rowCells('p2', WM2_COLORS.p2)}
          </div>
          <div className="flex">
            <div className="w-8" />
            {sumCarries}
          </div>
          <div className="flex border-t-4 border-slate-800" style={{ width: `${2 + NCOL * 2.75}rem` }} />
          <div className="flex">
            <div className="w-8" />
            {rowCells('sum', WM2_COLORS.product)}
          </div>
        </div>
      </div>
      {cur ? (
        <>
          <div className="text-center text-sm font-bold text-slate-700">
            {cur.row === 'p1' ? '1. részletszorzat' : cur.row === 'p2' ? '2. részletszorzat' : 'A részletszorzatok összeadása'} – melyik
            számjegy kerül a(z) {PLACE[cur.offset]} helyére?
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
            {wrong !== null && <span className="text-rose-700 font-bold text-sm">Nem jó! Ne felejtsd el a maradékot!</span>}
          </div>
          {hint && (
            <TheoryCallout type="tip" title="Így gondolkodj">
              {cur.hint}
            </TheoryCallout>
          )}
        </>
      ) : (
        <TheoryCallout type="success" title="Kész, ügyes vagy! 🎉">
          {a} · {b} = {product}. A becslés {round10(a) * round10(b)} volt, ez közel van hozzá.{' '}
          {a < 100
            ? `Ellenőrizd a tényezők felcserélésével is: ${b} · ${a} = ${product}.`
            : 'Ellenőrizz úgy, hogy összeveted az eredményt a becsléssel!'}
        </TheoryCallout>
      )}
    </div>
  );
};

const BRIDGE_TASKS: [number, number][] = [
  [83, 59],
  [74, 38],
  [62, 69],
  [58, 85],
  [46, 96],
  [37, 75],
  [28, 63]
];

/** II. labor: a Kilenclyukú híd párosítója (munkafüzet II. 53. o., 2. feladat). */
const BridgeLab: React.FC = () => {
  const [sel, setSel] = useState<number | null>(null);
  const [found, setFound] = useState<Record<number, number>>({});
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const foundValues = Object.values(found);
  const allDone = foundValues.length === BRIDGE_TASKS.length;

  const pickNumber = (n: number) => {
    if (sel === null) {
      setMsg({ ok: false, text: 'Előbb válassz egy szorzást!' });
      return;
    }
    const [x, y] = BRIDGE_TASKS[sel];
    if (x * y === n) {
      setFound({ ...found, [sel]: n });
      setMsg({ ok: true, text: `Talált! ${x} · ${y} = ${n}.` });
      setSel(null);
    } else {
      setMsg({ ok: false, text: `Nem jó. Becsülj! ${x} · ${y} ≈ ${round10(x)} · ${round10(y)} = ${round10(x) * round10(y)}.` });
    }
  };

  return (
    <div className="bg-white border-2 border-sky-200 rounded-2xl p-5 shadow-sm space-y-4">
      <BridgeSvg marked={foundValues} className="w-full max-w-xl mx-auto h-auto" />
      <div className="flex flex-wrap gap-2">
        {BRIDGE_TASKS.map(([x, y], i) => (
          <button
            key={i}
            disabled={found[i] !== undefined}
            onClick={() => setSel(i)}
            className={`px-3 h-12 rounded-xl text-lg font-black border-2 ${
              found[i] !== undefined
                ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                : sel === i
                ? 'bg-sky-600 border-sky-700 text-white'
                : 'bg-white border-sky-200 hover:bg-sky-50 text-sky-800'
            }`}
          >
            {x} · {y}
            {found[i] !== undefined ? ` = ${found[i]}` : ''}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-9 gap-2">
        {BRIDGE_NUMBERS.map((n) => (
          <button
            key={n}
            disabled={foundValues.includes(n)}
            onClick={() => pickNumber(n)}
            className={`h-12 rounded-t-full text-sm font-black border-2 ${
              foundValues.includes(n) ? 'bg-emerald-100 border-emerald-300 text-emerald-700' : 'bg-stone-50 border-stone-300 hover:bg-amber-50 text-slate-800'
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      {msg && (
        <TheoryCallout type={msg.ok ? 'success' : 'warning'} title={msg.ok ? 'Ügyes!' : 'Próbáld újra!'}>
          {msg.text}
        </TheoryCallout>
      )}
      {allDone && (
        <TheoryCallout type="info" title="Megfejtés 🌉">
          Két szám maradt pár nélkül: 1827 és 1833. A hidat 1827-ben kezdték építeni, és 1833-ban fejezték be: 1833 − 1827 = 6 év alatt készült
          el.
        </TheoryCallout>
      )}
    </div>
  );
};

export const WrittenMulTwoDigitTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  return (
    <TheoryTemplate
      topicId="g4-written-mult"
      subtopicId="irasbeli-szorzas"
      grade={4}
      chapterId="irasbeli-szorzas"
      title="2. Írásbeli szorzás"
      subtitle="Szorzás kétjegyű számmal írásban: becslés, részletszorzatok, eltolás, összeadás, ellenőrzés."
      badge="4. OSZTÁLY • VII. ÍRÁSBELI SZORZÁS • TANANYAG"
      themeColor="orange"
      pdfFilename="4_osztaly_irasbeli_szorzas_ketjegyu_tananyag.pdf"
      practiceTitle="Készen állsz az írásbeli szorzás gyakorlására?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — SZORZÁS KÉTJEGYŰ SZÁMMAL',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-orange-50/90 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/80 text-center">
              <span className="font-mono text-base font-black text-orange-900 dark:text-orange-200">
                12 · 14 → 48 + 120 = 168
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Becslés:</strong> kerekítsd mindkét tényezőt tízesre (26 · 24 ≈ 30 · 20 = 600).
              </li>
              <li>
                Szorozz az <strong>egyesekkel</strong>, aztán a <strong>tízesekkel</strong>. A második részletszorzatot{' '}
                <strong>egy hellyel balra</strong> told!
              </li>
              <li>
                Add össze a részletszorzatokat. <strong>Ellenőrzés:</strong> a tényezők felcserélésével vagy a becsléssel.
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 138. o." badgeColor="orange">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            Mona minden este <strong>12 oldalt</strong> olvas. Hány oldalt olvas el két hét, vagyis <strong>14 este</strong> alatt? Ehhez
            egy kétjegyű számot kell kétjegyű számmal szorozni: 12 · 14.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>A szorzás neve: tényezők (szorzandó és szorzó), részletszorzatok, szorzat.</li>
            <li>Becslés tízesre kerekítéssel.</li>
            <li>Az írásbeli szorzás lépései: egyesekkel, tízesekkel, eltolás, összeadás.</li>
            <li>Ellenőrzés a tényezők felcserélésével.</li>
            <li>Rövidebb írásmód, ha a szorzóban 1-es van (85 · 16, 85 · 61).</li>
          </ul>
        </div>
      </TheorySection>

      {/* 2. Nézzük meg együtt: 12 · 14 */}
      <TheorySection title="2. Nézzük meg együtt! 12 · 14" badge="Tankönyv 138. o., 1. feladat" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <MonaReadingSvg />
          <TheoryTable
            headers={['Lépés', 'Mit csinálok?']}
            rows={[
              ['Adatok', '1 este → 12 oldal, 14 este → ? oldal'],
              ['Terv', '12 · 14 = ?'],
              ['Becslés', '12 ≈ 10, 14 ≈ 10, 10 · 10 = 100. Az eredmény biztosan nagyobb lesz, mert mindkettőt lefelé kerekítettük.'],
              ['1. részletszorzat', '4 egyessel szorzok: 12 · 4 = 48. Helyi érték szerint a szorzandó alá írom.'],
              ['2. részletszorzat', '1 tízessel szorzok: 12 · 1 = 12 tízes. Egy hellyel balra tolom, az egyesek helyére 0-t írhatok: 120.'],
              ['Összeadás', '48 + 120 = 168'],
              ['Válasz', 'Mona 168 oldalt olvas el két hét alatt.']
            ]}
          />
        </div>
      </TheorySection>

      {/* 3. Ellenőrzés */}
      <TheorySection title="3. Ellenőrzés a tényezők felcserélésével" badge="Tankönyv 138. o." badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <SwapCheckSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>Cseréld fel a tényezőket, és számold ki újra! Ha ugyanaz jön ki, jól számoltál.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>14 · 2 = 28</li>
              <li>14 · 1 tízes = 14 tízes → 140</li>
              <li>
                28 + 140 = <strong>168</strong> ✔
              </li>
            </ul>
            <TheoryCard title="Becsléssel is ellenőrizhetsz" badge="Tipp" badgeColor="emerald">
              <p className="text-sm text-slate-700">Ha az eredmény nagyon messze van a becsléstől, valahol hibáztál.</p>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 4. Kétféle sorrend */}
      <TheorySection title="4. Nézzük meg együtt! 26 gyerek, 24 filctoll" badge="Tankönyv 140. o., 8. feladat" badgeColor="purple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <EstimateSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>A 26 gyerek mindegyike egy 24 darabos filctollkészletet kapott. Hány filcet kaptak összesen?</p>
            <p>
              <strong>Terv:</strong> 26 · 24 = ? &nbsp; <strong>Becslés:</strong> 26 ≈ 30, 24 ≈ 20, 30 · 20 = 600.
            </p>
            <p>Írásban így számolunk (24 · 26):</p>
          </div>
        </div>
        <TwoWaysSvg />
        <TheoryTable
          headers={['Az egyesekkel kezdve', 'A tízesekkel kezdve']}
          rows={[
            ['1. lépés: 6 egyessel szorzok: 24 · 6 = 144', '1. lépés: 2 tízessel szorzok: 24 · 2 = 48'],
            ['2. lépés: 2 tízessel szorzok: 48, egy hellyel balra tolva', '2. lépés: 6 egyessel szorzok: 144, egy hellyel jobbra tolva'],
            ['3. lépés: összeadom: 624', '3. lépés: összeadom: 624']
          ]}
        />
        <TheoryCallout type="success" title="Válasz">
          Összesen 624 filctollat kapott a 26 gyerek. Ez közel van a becsült 600-hoz. ✔
        </TheoryCallout>
      </TheorySection>

      {/* 5. Rövidebben */}
      <TheorySection title="5. Rövidebben, ha a szorzóban 1-es van" badge="Tankönyv 141–142. o." badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <ShortcutSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>85 önkéntes mindegyike 16 facsemetét ültetett. 85 · 16 = ?</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>1 tízessel szorozva a részletszorzat maga a szorzandó: 85.</li>
              <li>Ezért nem kell külön leírni, a 85 az első részletszorzat.</li>
              <li>6 egyessel: 85 · 6 = 510, egy hellyel jobbra tolva.</li>
              <li>
                850 + 510 = <strong>1360</strong> facsemete.
              </li>
            </ul>
            <p>
              Ugyanígy: 85 · 61 = 5185. Itt az 1 egyessel szorzott részletszorzat a 85, a 6 tízessel szorzott 510 tízes, vagyis 5100.
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 6. Vigyázz! */}
      <TheorySection title="6. Vigyázz! Az eltolás" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Elfelejtett eltolás"
          wrong="24 · 26: 144 + 48 = 192"
          wrongExplanation="A 48 nem 48 egyes, hanem 48 tízes! Ha nem tolod el egy hellyel balra, túl kicsi lesz a szorzat."
          correct="24 · 26: 144 + 480 = 624"
          correctExplanation="A tízesekkel szorzott részletszorzatot egy hellyel balra írd (vagy írj a végére 0-t)."
          tip="A becslés (600) azonnal mutatja, hogy a 192 nem lehet jó."
        />
        <TheoryCallout type="warning" title="Ne keverd a maradékokat!">
          Minden részletszorzatnak saját maradékai vannak. Ha egy részletszorzattal végeztél, a maradékokat felejtsd el, és új sort kezdj! Az
          összeadásnál is figyelj a maradékra.
        </TheoryCallout>
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Játékos labor I: Írásbeli szorzás lépésről lépésre" badge="Labor" badgeColor="orange">
        <p className="text-sm text-slate-600">
          Kattints a helyes számjegyre! Előbb az egyesekkel szorzol (narancs sor), aztán a tízesekkel (kék sor, egy hellyel balra), végül
          összeadod a részletszorzatokat (zöld sor). A kis számok a maradékok.
        </p>
        <Mul2Lab />
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Játékos labor II: A Kilenclyukú híd" badge="Munkafüzet II. 53. o." badgeColor="sky">
        <p className="text-sm text-slate-600">
          Válassz egy szorzást, aztán kattints a híd nyílásában a szorzatára! Két szám pár nélkül marad – ezek elárulják, mikor épült a híd.
        </p>
        <BridgeLab />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default WrittenMulTwoDigitTheory;
