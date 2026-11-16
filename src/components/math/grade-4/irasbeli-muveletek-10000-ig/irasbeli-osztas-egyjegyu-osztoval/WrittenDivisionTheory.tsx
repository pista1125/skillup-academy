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
  DivShortFormSvg,
  DivLongFormSvg,
  DivRemainderSvg,
  DivSplitSvg,
  CoinShareSvg,
  divSteps,
  DIV_COLORS4,
  DIV_HEADS4
} from './WrittenDivisionFigures';

const PLACE_NAMES = ['ezres', 'százas', 'tízes', 'egyes'];

const DIV_PROBLEMS: [number, number][] = [
  [3693, 3],
  [2872, 2],
  [750, 3],
  [734, 2],
  [224, 3],
  [5840, 5],
  [7319, 4],
  [3150, 3]
];

/** I. labor: írásbeli osztás rövid alakban, lépésről lépésre. */
const ShortDivisionLab: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [phase, setPhase] = useState<'q' | 'r'>('q');
  const [wrong, setWrong] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [a, d] = DIV_PROBLEMS[idx];
  const steps = divSteps(a, d);
  const digits = String(a).split('');
  const n = digits.length;
  const offset = 4 - n; // helyiérték-index eltolás
  const finished = stepIdx >= steps.length;
  const cur = steps[Math.min(stepIdx, steps.length - 1)];
  const place = cur.col + offset;

  const reset = (i: number) => {
    setIdx(i);
    setStepIdx(0);
    setPhase('q');
    setWrong(null);
    setShowHint(false);
  };

  const press = (v: number) => {
    if (finished) return;
    if (phase === 'q') {
      if (v === cur.q) {
        setPhase('r');
        setWrong(null);
        setShowHint(false);
      } else setWrong(v);
    } else if (v === cur.r) {
      setStepIdx(stepIdx + 1);
      setPhase('q');
      setWrong(null);
      setShowHint(false);
    } else setWrong(v);
  };

  // A már kiszámolt sorok (rövid alak): maradék + lehozott számjegy
  const doneRows = steps.slice(0, stepIdx).map((s, k) => {
    const last = k === steps.length - 1;
    return last ? { text: String(s.r), endCol: s.col } : { text: `${s.r}${digits[s.col + 1]}`, endCol: s.col + 1 };
  });
  const quotient = steps
    .slice(0, stepIdx)
    .map((s) => s.q)
    .join('') + (phase === 'r' && !finished ? String(cur.q) : '');
  const dots = '.'.repeat(Math.max(0, steps.length - quotient.length));

  const hint =
    phase === 'q'
      ? `Gondolj a szorzótáblára! ? · ${d} legfeljebb ${cur.partial} lehet. Próbáld: ${cur.q} · ${d} = ${cur.q * d}, de ${cur.q + 1} · ${d} = ${(cur.q + 1) * d} – ez már több!`
      : `${cur.q} · ${d} = ${cur.q * d}. Mennyi marad? ${cur.partial} − ${cur.q * d} = ?`;

  return (
    <div className="bg-white border-2 border-violet-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-base font-bold text-slate-700">
          Oszd el írásban: <span className="text-violet-700 font-black text-xl">{a} : {d}</span>
        </div>
        <button onClick={() => reset((idx + 1) % DIV_PROBLEMS.length)} className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm font-bold text-slate-700">
          Új feladat ➜
        </button>
      </div>

      <div className="flex justify-center">
        <div className="flex items-start gap-3">
          <div className="inline-grid gap-y-1 font-mono text-3xl font-black text-center" style={{ gridTemplateColumns: `repeat(${n}, 3rem)` }}>
            {digits.map((_, i) => (
              <div key={`h${i}`} className="text-sm text-white rounded-t-md py-1" style={{ backgroundColor: DIV_COLORS4[i + offset] }}>
                {DIV_HEADS4[i + offset]}
              </div>
            ))}
            {digits.map((dg, i) => {
              const used = i <= (finished ? n - 1 : cur.col) && i >= steps[0].col;
              const active = !finished && i <= cur.col && i > (stepIdx === 0 ? -1 : steps[stepIdx - 1].col);
              return (
                <div
                  key={`d${i}`}
                  className={`py-1 relative ${active ? 'ring-4 ring-violet-400 rounded-md' : ''}`}
                  style={{ backgroundColor: `${DIV_COLORS4[i + offset]}1f` }}
                >
                  {dg}
                  {used && <span className="absolute right-0.5 top-0 text-base text-violet-600">'</span>}
                </div>
              );
            })}
            {doneRows.map((r, k) =>
              digits.map((_, i) => {
                const start = r.endCol - r.text.length + 1;
                const ch = i >= start && i <= r.endCol ? r.text[i - start] : '';
                return (
                  <div key={`r${k}-${i}`} className="py-0.5 text-2xl text-pink-600" style={{ backgroundColor: `${DIV_COLORS4[i + offset]}12` }}>
                    {ch}
                  </div>
                );
              })
            )}
          </div>
          <div className="font-mono text-3xl font-black pt-9 text-slate-800">
            : {d} = <span className="text-violet-700">{quotient}</span>
            <span className="text-slate-300">{dots}</span>
          </div>
        </div>
      </div>

      {!finished ? (
        <>
          <div className="text-center text-sm font-bold text-slate-700">
            {phase === 'q' ? (
              <>
                {cur.partial} {PLACE_NAMES[place]} : {d} = ? &nbsp;Melyik számjegy kerül a hányadosba?
              </>
            ) : (
              <>
                {cur.partial} : {d} = {cur.q}, mert {cur.q} · {d} = {cur.q * d}. Mennyi marad?
              </>
            )}
          </div>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {Array.from({ length: 10 }).map((_, v) => (
              <button
                key={v}
                onClick={() => press(v)}
                className={`h-12 rounded-xl text-xl font-black border-2 ${
                  wrong === v ? 'bg-rose-100 border-rose-400 text-rose-700' : 'bg-white border-violet-200 hover:bg-violet-50 text-slate-800'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={() => setShowHint(true)} className="px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-sm font-bold">
              Segítség 💡
            </button>
            {wrong !== null && (
              <span className="text-rose-700 font-bold text-sm">
                {phase === 'q' ? 'Nem jó! Lehet, hogy túl nagy vagy túl kicsi.' : 'Nem jó! A maradék mindig kisebb az osztónál.'}
              </span>
            )}
          </div>
          {showHint && (
            <TheoryCallout type="tip" title="Így gondolkodj">
              {hint}
            </TheoryCallout>
          )}
        </>
      ) : (
        <TheoryCallout type="success" title="Kész, ügyes vagy! 🎉">
          {a} : {d} = {Math.floor(a / d)}
          {a % d ? `, marad ${a % d}` : ''}. Ellenőrzés: {Math.floor(a / d)} · {d} = {Math.floor(a / d) * d}
          {a % d ? `, és ${Math.floor(a / d) * d} + ${a % d} = ${a}` : ''} ✔
        </TheoryCallout>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// II. labor: igazságos szétosztás korongokkal (Panna módszere)
// ---------------------------------------------------------------------------
interface ShareState {
  each: [number, number, number]; // sz, t, e fejenként
  pile: [number, number, number]; // ki nem osztott sz, t, e
  text: string;
}

export const shareStates = (a: number, d: number): ShareState[] => {
  const ds = String(a).padStart(3, '0').split('').map(Number) as [number, number, number];
  const names = ['százas', 'tízes', 'egyes'];
  const out: ShareState[] = [];
  const each: [number, number, number] = [0, 0, 0];
  const pile: [number, number, number] = [...ds];
  out.push({ each: [...each], pile: [...pile], text: `${a} = ${ds[0]} százas, ${ds[1]} tízes, ${ds[2]} egyes. Osszuk szét ${d} gyerek között!` });
  for (let p = 0; p < 3; p++) {
    const q = Math.floor(pile[p] / d);
    const r = pile[p] - q * d;
    const before = pile[p];
    each[p] = q;
    pile[p] = r;
    out.push({
      each: [...each],
      pile: [...pile],
      text: `${before} ${names[p]} : ${d} = ${q} ${names[p]}, mert ${q} · ${d} = ${q * d}, marad ${r} ${names[p]}.`
    });
    if (p < 2 && r > 0) {
      pile[p + 1] += r * 10;
      pile[p] = 0;
      out.push({
        each: [...each],
        pile: [...pile],
        text: `A megmaradt ${r} ${names[p]}t felváltjuk ${r * 10} ${names[p + 1]}re. Most ${pile[p + 1]} ${names[p + 1]} van.`
      });
    }
  }
  return out;
};

const SHARE_PROBLEMS: [number, number][] = [
  [750, 3],
  [960, 4],
  [852, 3]
];
const DISC_COLORS = ['#dc2626', '#0ea5e9', '#eab308'];
const DISC_LABELS = ['100', '10', '1'];

const Discs: React.FC<{ counts: [number, number, number]; small?: boolean }> = ({ counts, small }) => (
  <div className="flex flex-wrap gap-1 justify-center">
    {counts.flatMap((c, p) =>
      Array.from({ length: c }).map((_, k) => (
        <span
          key={`${p}-${k}`}
          className={`inline-flex items-center justify-center rounded-full font-black text-white ${small ? 'w-6 h-6 text-[9px]' : 'w-7 h-7 text-[10px]'}`}
          style={{ backgroundColor: DISC_COLORS[p] }}
        >
          {DISC_LABELS[p]}
        </span>
      ))
    )}
  </div>
);

const ShareLab: React.FC = () => {
  const [pIdx, setPIdx] = useState(0);
  const [s, setS] = useState(0);
  const [a, d] = SHARE_PROBLEMS[pIdx];
  const states = shareStates(a, d);
  const st = states[s];
  const done = s === states.length - 1;
  const q = Math.floor(a / d);
  return (
    <div className="bg-white border-2 border-amber-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap gap-2">
        {SHARE_PROBLEMS.map(([x, y], i) => (
          <button
            key={x}
            onClick={() => {
              setPIdx(i);
              setS(0);
            }}
            className={`px-4 h-12 rounded-xl text-lg font-black border-2 ${
              pIdx === i ? 'bg-amber-500 border-amber-600 text-white' : 'bg-white border-amber-200 hover:bg-amber-50 text-amber-800'
            }`}
          >
            {x} : {y}
          </button>
        ))}
      </div>
      <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
        <div className="text-xs font-bold text-slate-500 mb-1">Még szétosztandó:</div>
        <Discs counts={st.pile} />
      </div>
      <div className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${d}, minmax(0, 1fr))` }}>
        {Array.from({ length: d }).map((_, g) => (
          <div key={g} className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-2 min-h-[72px]">
            <div className="text-xs font-bold text-emerald-700 text-center mb-1">{g + 1}. gyerek</div>
            <Discs counts={st.each} small />
          </div>
        ))}
      </div>
      <TheoryCallout type={done ? 'success' : 'info'} title={done ? 'Kész!' : `${s + 1}. lépés`}>
        {st.text}
        {done && ` Mindenki ugyanannyit kap: ${a} : ${d} = ${q}.`}
      </TheoryCallout>
      <div className="flex gap-2">
        <button
          onClick={() => setS(Math.max(0, s - 1))}
          className="px-4 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-700"
          disabled={s === 0}
        >
          ◀ Vissza
        </button>
        <button
          onClick={() => setS(Math.min(states.length - 1, s + 1))}
          className="px-4 h-12 rounded-xl bg-amber-500 hover:bg-amber-600 font-bold text-white"
          disabled={done}
        >
          Következő lépés ▶
        </button>
      </div>
    </div>
  );
};

export const WrittenDivisionTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  return (
    <TheoryTemplate
      topicId="g4-written-ops"
      subtopicId="irasbeli-osztas-egyjegyu-osztoval"
      grade={4}
      chapterId="irasbeli-muveletek-10000-ig"
      title="3. Írásbeli osztás egyjegyű osztóval"
      subtitle="Osztás bontással, becslés (hány jegyű a hányados?), írásbeli osztás hosszú és rövid alakban, maradékos osztás, ellenőrzés szorzással."
      badge="4. OSZTÁLY • III. ÍRÁSBELI MŰVELETEK • TANANYAG"
      themeColor="violet"
      pdfFilename="4_osztaly_irasbeli_osztas_egyjegyu_tananyag.pdf"
      practiceTitle="Készen állsz az írásbeli osztás gyakorlására?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — ÍRÁSBELI OSZTÁS',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center">
              <span className="font-mono text-base font-black text-violet-900 dark:text-violet-200">
                osztandó : osztó = hányados &nbsp;&nbsp; 3693 : 3 = 1231
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                Az osztást a <strong>legnagyobb</strong> helyi értéken kezdjük (ezresek, százasok, tízesek, egyesek).
              </li>
              <li>A maradékot felváltjuk a következő helyi értékre, és „lehozzuk” mellé a következő számjegyet.</li>
              <li>A maradék mindig kisebb az osztónál. Ellenőrzés: hányados · osztó + maradék = osztandó.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 93–94. o." badgeColor="violet">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            Az osztály az Aggteleki-cseppkőbarlangba készül. Útiköltség, belépőjegyek, zsebpénz – sokszor kell igazságosan elosztani.
            Ehhez tanuljuk meg az <strong>írásbeli osztást</strong>.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Osztás fejben, bontással (2820 : 2).</li>
            <li>Becslés: hány jegyű lesz a hányados?</li>
            <li>Írásbeli osztás hosszú alakban és rövid alakban.</li>
            <li>Maradékos osztás, ellenőrzés szorzással.</li>
          </ul>
        </div>
      </TheorySection>

      {/* 2. Bontással */}
      <TheorySection title="2. Osztás bontással" badge="Tankönyv 94. o." badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <DivSplitSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>Mona 2840 Ft zsebpénzének a felét költheti el az első napon:</p>
            <p className="font-bold">2840 : 2 = 2000 : 2 + 800 : 2 + 40 : 2 = 1000 + 400 + 20 = 1420 Ft</p>
            <p>A számot helyi értékek szerint bontjuk, mindegyik részt elosztjuk, majd az eredményeket összeadjuk.</p>
          </div>
        </div>
      </TheorySection>

      {/* 3. Becslés és első példa */}
      <TheorySection title="3. Nézzük meg együtt! 3693 : 3" badge="Tankönyv 95. o." badgeColor="indigo">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            Egy versenyre 3693 tanuló jelentkezett, harmaduk külföldön élő magyar diák. Hányan élnek külföldön?
          </p>
          <TheoryCard title="Becslés: hány jegyű lesz a hányados?" badge="Becslés" badgeColor="indigo">
            <p className="text-sm text-slate-700">
              <span className="font-mono font-black">3'693 : 3 = . . . .</span> — A 3 ezresben megvan a 3, ezért a hányados{' '}
              <strong>négyjegyű</strong> lesz (4 pont). Mivel 3000 : 3 = 1000 és 6000 : 3 = 2000:{' '}
              <strong>1000 &lt; a hányados &lt; 2000</strong>.
            </p>
          </TheoryCard>
          <TheoryTable
            headers={['Lépés', 'Számolás']}
            rows={[
              ['1. ezresek', '3 E : 3 = 1 E'],
              ['2. százasok', '6 sz : 3 = 2 sz'],
              ['3. tízesek', '9 t : 3 = 3 t'],
              ['4. egyesek', '3 e : 3 = 1 e'],
              ['Ellenőrzés', '1231 · 3 = 3693 ✔ (vagy 1231 + 1231 + 1231)'],
              ['Válasz', '1231 külföldön élő diák vett részt a versenyen.']
            ]}
          />
        </div>
      </TheorySection>

      {/* 4. Pénzzel */}
      <TheorySection title="4. Ha marad: felváltjuk! 750 Ft : 3" badge="Tankönyv 96. o." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <CoinShareSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>Három lány 750 Ft-ért vett gyöngyöt. Mennyit adjon mindenki?</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>7 sz : 3 = 2 sz, mert 2 sz · 3 = 6 sz, marad 1 sz.</li>
              <li>A megmaradt százast felváltjuk tízesekre: 1 sz + 5 t = 15 t.</li>
              <li>15 t : 3 = 5 t, mert 5 t · 3 = 15 t, marad 0 t.</li>
              <li>0 e : 3 = 0 e.</li>
            </ul>
            <p>
              Mindenki <strong>250 Ft</strong>-ot ad. Ellenőrzés: 250 · 3 = 750 ✔
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 5. Hosszú és rövid alak */}
      <TheorySection title="5. Nézzük meg együtt! 2872 : 2 hosszú és rövid alakban" badge="Tankönyv 97. o." badgeColor="purple">
        <p className="text-sm text-slate-700 leading-relaxed">
          Manó tolltartója 2872 Ft, a temperafesték feleennyibe kerül. 2'872 : 2 = . . . . → 1000 &lt; a hányados &lt; 2000.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <TheoryCard title="Hosszú alak (mint Luca)" badge="kivonással" badgeColor="purple">
            <DivLongFormSvg />
          </TheoryCard>
          <TheoryCard title="Rövid alak (mint Viktória)" badge="csak a maradék" badgeColor="violet">
            <DivShortFormSvg />
          </TheoryCard>
        </div>
        <TheoryTable
          headers={['Lépés', 'Mit mondunk?']}
          rows={[
            ['1. lépés', '2 E : 2 = 1 E, mert 1 · 2 = 2, marad 0.'],
            ['2. lépés', 'Lehozzuk a 8-at: 8 sz : 2 = 4 sz, mert 4 · 2 = 8, marad 0.'],
            ['3. lépés', 'Lehozzuk a 7-et: 7 t : 2 = 3 t, mert 3 · 2 = 6, marad 1.'],
            ['4. lépés', 'Lehozzuk a 2-t: 1 t + 2 e = 12 e, 12 e : 2 = 6 e, mert 6 · 2 = 12, marad 0.'],
            ['Válasz', '1436 Ft-ba került a temperafesték. Ellenőrzés: 1436 · 2 = 2872 ✔']
          ]}
        />
        <TheoryCallout type="tip" title="A rövid alak titka">
          A kivonást fejben végezzük el, és csak a <strong>maradékot</strong> írjuk le a megfelelő helyi érték alá. Mellé írjuk
          (lehozzuk) az osztandó következő számjegyét. A felhasznált számjegyeket kis vesszővel (') jelöljük.
        </TheoryCallout>
      </TheorySection>

      {/* 6. Maradékos osztás */}
      <TheorySection title="6. Maradékos osztás: 224 : 3" badge="Tankönyv 99. o." badgeColor="rose">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <DivRemainderSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>Lívia, Petra és Jutka egy 224 cm-es szalagot osztana el igazságosan.</p>
            <p>
              <strong>Becslés:</strong> 2 százasban nincs meg a 3, ezért a következő helyi értéknél kezdünk: 22'4 : 3 = . . →
              kétjegyű lesz a hányados, 70 &lt; a hányados &lt; 80.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>22 t : 3 = 7 t, mert 7 · 3 = 21, marad 1.</li>
              <li>Lehozzuk a 4-et: 14 e : 3 = 4 e, mert 4 · 3 = 12, marad 2.</li>
            </ul>
            <p>
              224 : 3 = 74, <strong>marad 2</strong>. Nem sikerül egész centiméterekre elosztani, mert marad 2 cm.
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 7. Vigyázz! */}
      <TheorySection title="7. Vigyázz! Tipikus hibák" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Kimaradt nulla a hányadosból"
          wrong="3150 : 3 = 105"
          wrongExplanation="Az 1 tízesben nincs meg a 3, de ezt a helyet nem lehet kihagyni! Ide 0-t kell írni a hányadosba."
          correct="3150 : 3 = 1050"
          correctExplanation="3 : 3 = 1, 1 : 3 = 0 (marad 1), 15 : 3 = 5, 0 : 3 = 0. A becslés is segít: a hányados négyjegyű (1000 < h < 2000)."
          tip="Annyi számjegy lesz a hányadosban, ahány pontot a becslésnél tettél."
        />
        <TheoryCallout type="warning" title="A maradék kisebb az osztónál!">
          Ha 3-mal osztasz, a maradék csak 0, 1 vagy 2 lehet. Ha a maradék nagyobb vagy egyenlő az osztóval, akkor túl kicsi számjegyet
          írtál a hányadosba.
        </TheoryCallout>
      </TheorySection>

      {/* 8. Labor I */}
      <TheorySection title="8. Játékos labor I: Írásbeli osztás rövid alakban" badge="Labor" badgeColor="violet">
        <p className="text-sm text-slate-600">
          Minden lépésben előbb a hányados számjegyét választod ki, aztán a maradékot. A maradék mellé automatikusan lejön a következő
          számjegy.
        </p>
        <ShortDivisionLab />
      </TheorySection>

      {/* 9. Labor II */}
      <TheorySection title="9. Játékos labor II: Osszuk szét igazságosan!" badge="Labor" badgeColor="amber">
        <p className="text-sm text-slate-600">
          Kövesd Panna módszerét korongokkal! Előbb a százasokat osztjuk szét, a maradékot felváltjuk tízesekre, és így tovább.
        </p>
        <ShareLab />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default WrittenDivisionTheory;
