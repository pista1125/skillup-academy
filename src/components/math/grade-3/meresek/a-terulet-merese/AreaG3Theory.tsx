import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox } from '../TheoryTemplate';
import { AreaWhatIsSvg, AreaUnitsSvg, AreaCompareSvg, AreaHalvesSvg, AreaTrianglesSvg, AreaVsPerimeterSvg } from './AreaG3Figures';
import { FONT, INK, Pieces, GridBg, shapePolys, isConnected, makeAreaCompareTask, AreaCompareTask, Cell } from './AreaG3Parts';

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

const LAB_COLS = 7;
const LAB_ROWS = 5;


const ShapeBox: React.FC<{ cells: Cell[]; label: string; pal: 'blue' | 'pink'; nums: boolean }> = ({ cells, label, pal, nums }) => (
  <svg viewBox="0 0 120 120" className="w-full max-w-[200px] h-auto mx-auto" fontFamily={FONT}>
    <GridBg x={4} y={16} cols={5} rows={4} s={22} />
    <text x="6" y="12" fontSize="12" fontWeight="bold" fill={INK}>
      {label}
    </text>
    <Pieces polys={shapePolys(cells.map(([c, r]) => [c + (5 - Math.max(...cells.map((p) => p[0])) - 1) / 2, r + (4 - Math.max(...cells.map((p) => p[1])) - 1) / 2] as Cell))} x={4} y={16} s={22} pal={pal} nums={nums} numSize={10} />
  </svg>
);

export const AreaG3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // Labor I: rakj ki pontosan n kis négyzetet
  const [target, setTarget] = useState(6);
  const [on, setOn] = useState<Set<string>>(new Set());
  const [msg1, setMsg1] = useState<{ ok: boolean; text: string } | null>(null);
  const toggle = (c: number, r: number) => {
    const k = `${c},${r}`;
    const n = new Set(on);
    if (n.has(k)) n.delete(k);
    else n.add(k);
    setOn(n);
    setMsg1(null);
  };
  const check1 = () => {
    const cells = [...on].map((k) => k.split(',').map(Number) as Cell);
    if (cells.length === 0) setMsg1({ ok: false, text: 'Koppints a kis négyzetekre, és színezd ki őket!' });
    else if (cells.length < target) setMsg1({ ok: false, text: `Most ${cells.length} kis négyzeted van. Még ${target - cells.length} kell!` });
    else if (cells.length > target) setMsg1({ ok: false, text: `Most ${cells.length} kis négyzeted van. Ez több a kelleténél. Vegyél el ${cells.length - target} négyzetet!` });
    else if (!isConnected(cells)) setMsg1({ ok: false, text: 'A darabszám jó! De a négyzetek oldalukkal érjenek össze, hogy egy síkidom legyen.' });
    else setMsg1({ ok: true, text: `Szuper! A síkidomod területe ${target} kis négyzet. Próbálj ki egy másik alakot is ugyanennyiből!` });
  };
  const new1 = () => {
    let t = rnd(4, 12);
    while (t === target) t = rnd(4, 12);
    setTarget(t);
    setOn(new Set());
    setMsg1(null);
  };

  // Labor II: melyik nagyobb?
  const [t2, setT2] = useState<AreaCompareTask>(() => ({
    a: [
      [0, 0],
      [1, 0],
      [2, 0],
      [0, 1],
      [1, 1],
      [0, 2],
      [1, 2]
    ],
    b: [
      [0, 0],
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
      [3, 0]
    ]
  }));
  const [pick2, setPick2] = useState<'A' | 'B' | '=' | null>(null);
  const good2 = t2.a.length > t2.b.length ? 'A' : t2.a.length < t2.b.length ? 'B' : '=';
  const msg2 = () => {
    const na = t2.a.length;
    const nb = t2.b.length;
    if (pick2 === good2) {
      if (good2 === '=') return `Ügyes! Mindkettő ${na} kis négyzet. Más az alakjuk, de ugyanakkora a területük.`;
      return `Ügyes! Az A ${na}, a B ${nb} kis négyzet. ${good2 === 'A' ? 'Az A' : 'A B'} területe a nagyobb.`;
    }
    if (pick2 === '=') return `Számold meg újra! Az A ${na}, a B ${nb} kis négyzet. Nem egyformák.`;
    return `Nézd a számokat a négyzetekben! Az A ${na}, a B ${nb} kis négyzet. Ne a hosszát vagy a magasságát nézd, hanem azt, hány négyzet fedi le.`;
  };
  const new2 = () => {
    setT2(makeAreaCompareTask());
    setPick2(null);
  };

  return (
    <TheoryTemplate
      topicId="g3-measurements-1"
      subtopicId="a-terulet-merese"
      grade={3}
      chapterId="meresek"
      title="7. A terület mérése"
      subtitle="Lefedjük a síkidomot kis négyzetekkel, és megszámoljuk, hány darab kell."
      badge="3. OSZTÁLY • IV. MÉRÉSEK • TANANYAG"
      themeColor="emerald"
      pdfFilename="3_osztaly_a_terulet_merese_tananyag.pdf"
      practiceTitle="Készen állsz a területmérésre?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — LEFEDJÜK ÉS MEGSZÁMOLJUK!',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center text-base font-black text-emerald-900 dark:text-emerald-200">
              A terület megmutatja, mekkora helyet fed le a síkidom.
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                Választunk egy <strong>egységet</strong>, például egy kis négyzetet.
              </li>
              <li>
                Megszámoljuk, <strong>hány egység fedi le</strong> hézag és átfedés nélkül.
              </li>
              <li>
                Két területet <strong>ugyanazzal az egységgel</strong> hasonlítunk össze.
              </li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 148. o." badgeColor="emerald">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>A kerületnél a síkidom határát mérted körben. Most a <strong>belsejét</strong> mérjük.</p>
          <p>
            Ezt <strong>területnek</strong> hívjuk. Kis lapokkal fedjük le, és megszámoljuk őket.
          </p>
        </div>
      </TheorySection>

      <TheorySection title="2. Mi a terület?" badge="Lefedés" badgeColor="emerald">
        <AreaWhatIsSvg />
        <TheoryCallout type="tip" title="Így mérj!">
          Fedd le a síkidomot egyforma kis négyzetekkel. Ne maradjon <strong>hézag</strong>, és ne fedje egymást két lap. Aztán számold meg őket!
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="3. Kerület vagy terület?" badge="Ne keverd!" badgeColor="rose">
        <AreaVsPerimeterSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Kerület" badge="határ" badgeColor="rose">
            <p className="text-sm text-slate-700">Milyen hosszú a határ körben? Kerítés, szegély, keret.</p>
          </TheoryCard>
          <TheoryCard title="Terület" badge="belseje" badgeColor="emerald">
            <p className="text-sm text-slate-700">Mekkora helyet fed le? Szőnyeg, csempe, terítő.</p>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="4. Az egység" badge="Mivel mérünk?" badgeColor="amber">
        <AreaUnitsSvg />
        <TheoryCallout type="info" title="Mondd meg az egységet is!">
          A szám önmagában kevés. „8” mi? 8 kis négyzet? 8 dominó? Mindig mondd meg, <strong>mivel mértél</strong>!
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="5. Összehasonlítás" badge="Melyik nagyobb?" badgeColor="blue">
        <AreaCompareSvg />
        <p className="text-sm text-slate-700">
          Az alakjuk más, de mindkettőt 8 kis négyzet fedi le. A területük <strong>ugyanakkora</strong>.
        </p>
      </TheorySection>

      <TheorySection title="6. Fél négyzetek és kis háromszögek" badge="Darabokból" badgeColor="purple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AreaHalvesSvg />
          <AreaTrianglesSvg />
        </div>
        <p className="text-sm text-slate-700">
          Ha a négyzet ketté van vágva, két fél négyzetből rakj össze egy egészet. A kis háromszög is lehet egység.
        </p>
      </TheorySection>

      <TheorySection title="7. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) Terítő" badge="számolás" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Az asztalt 3 sorban terítik le.</li>
              <li>Minden sorban 4 kis kendő van.</li>
              <li>4 + 4 + 4 = <strong>12 kendő</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Más egység" badge="dominó" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A síkidom 10 kis négyzet.</li>
              <li>1 dominó = 2 kis négyzet.</li>
              <li>10 : 2 = 5, tehát <strong>5 dominó</strong> fedi le.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Ki fedett le többet?" badge="összevetés" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Nóra 5 dominót tett le, Dani 8 kis négyzetet.</li>
              <li>5 dominó = 10 kis négyzet.</li>
              <li>10 &gt; 8, tehát <strong>Nóra</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="8. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Más egységgel nem lehet csak a számot összevetni!"
          wrong="8 négyzet több, mint 5 dominó"
          wrongExplanation="A 8 több, mint az 5. De a dominó kétszer akkora, mint a kis négyzet!"
          correct="5 dominó = 10 négyzet, ez több, mint 8 négyzet"
          correctExplanation="Előbb váltsd át ugyanarra az egységre, utána hasonlíts!"
          tip="Ugyanazzal az egységgel mérj, ha két területet összehasonlítasz."
        />
        <TheoryCallout type="warning" title="A hosszú nem mindig nagyobb">
          Egy hosszú, vékony csík lehet kisebb területű, mint egy kis, zömök négyzet. Ne nézd, milyen hosszú: <strong>számold meg a négyzeteket!</strong>
        </TheoryCallout>
      </TheorySection>

      {/* Labor I */}
      <TheorySection title="9. Labor I: Rakd ki!" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-emerald-50 rounded-xl p-3 text-lg text-emerald-900 font-bold text-center">Készíts egy síkidomot, amelynek a területe {target} kis négyzet!</div>
          <p className="text-center text-sm text-slate-600">Koppints a négyzetekre! A négyzetek oldalukkal érjenek össze.</p>
          <div className="mx-auto grid gap-1" style={{ gridTemplateColumns: `repeat(${LAB_COLS}, minmax(0, 1fr))`, maxWidth: 380 }}>
            {Array.from({ length: LAB_ROWS * LAB_COLS }).map((_, i) => {
              const c = i % LAB_COLS;
              const r = Math.floor(i / LAB_COLS);
              const sel = on.has(`${c},${r}`);
              return (
                <button
                  key={i}
                  onClick={() => toggle(c, r)}
                  aria-label={`${r + 1}. sor ${c + 1}. négyzet`}
                  className={`aspect-square min-h-[44px] rounded-md border-2 transition-colors ${sel ? 'bg-emerald-400 border-emerald-700' : 'bg-white border-slate-300 hover:bg-emerald-50'}`}
                />
              );
            })}
          </div>
          <div className="text-center text-sm text-slate-600">
            Kiszínezve: <strong>{on.size}</strong> kis négyzet
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <button onClick={check1} className="px-5 py-3 rounded-xl bg-emerald-600 text-white font-bold min-h-[48px]">
              Ellenőrzés
            </button>
            <button
              onClick={() => {
                setOn(new Set());
                setMsg1(null);
              }}
              className="px-5 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold min-h-[48px]"
            >
              Törlés
            </button>
            <button onClick={new1} className="px-5 py-3 rounded-xl bg-slate-200 text-slate-700 font-bold min-h-[48px]">
              Új feladat
            </button>
          </div>
          {msg1 && <div className={`rounded-xl p-3 text-center text-sm font-bold ${msg1.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}`}>{msg1.text}</div>}
        </div>
      </TheorySection>

      {/* Labor II */}
      <TheorySection title="10. Labor II: Melyik nagyobb?" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <p className="text-center text-sm text-slate-600">Melyik síkidom területe a nagyobb? Egység: 1 kis négyzet.</p>
          <div className="grid grid-cols-2 gap-3">
            <ShapeBox cells={t2.a} label="A" pal="blue" nums={pick2 !== null} />
            <ShapeBox cells={t2.b} label="B" pal="pink" nums={pick2 !== null} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {(
              [
                ['A', 'Az A'],
                ['=', 'Egyforma'],
                ['B', 'A B']
              ] as const
            ).map(([v, t]) => {
              const chosen = pick2 === v;
              return (
                <button
                  key={v}
                  onClick={() => setPick2(v)}
                  className={`rounded-2xl border-2 py-4 text-lg font-black min-h-[64px] ${
                    chosen ? (v === good2 ? 'bg-emerald-200 border-emerald-500 text-emerald-900' : 'bg-rose-100 border-rose-400 text-rose-800') : 'bg-white border-blue-200 text-blue-900'
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
          {pick2 !== null && <div className={`rounded-xl p-3 text-center text-sm font-bold ${pick2 === good2 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{msg2()}</div>}
          <div className="flex justify-center">
            <button onClick={new2} className="px-5 py-3 rounded-xl bg-blue-600 text-white font-bold min-h-[48px]">
              Új feladat
            </button>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default AreaG3Theory;
