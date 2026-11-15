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
  StockModelSvg,
  MonotonicityRuleSvg,
  GraphReadingSvg,
  AgeDistributionSvg,
  TigerDeclineSvg
} from './ExponentialInequalitiesFigures';

const fmt = (x: number, d = 2) => {
  if (!Number.isFinite(x)) return '–';
  return Number(x.toFixed(d)).toLocaleString('hu-HU', { maximumFractionDigits: d });
};
const parseNum = (s: string) => {
  const t = s.trim().replace(/\s/g, '').replace(',', '.').replace('−', '-');
  if (t.includes('/')) {
    const [a, b] = t.split('/').map(Number);
    return b ? a / b : NaN;
  }
  return t === '' ? NaN : Number(t);
};

type Rel = '<' | '≤' | '>' | '≥';
const FLIP: Record<Rel, Rel> = { '<': '>', '≤': '≥', '>': '<', '≥': '≤' };

type Preset = { name: string; c: string; a: string; lo: string; hi: string; unit: string };
const PRESETS: Preset[] = [
  { name: 'Részvény (kidolgozott)', c: '2000', a: '1,002', lo: '2300', hi: '2400', unit: 'napokra' },
  { name: 'Webáruház (2. b)', c: '10', a: '1,08', lo: '1250', hi: '1750', unit: 'napokra' },
  { name: 'Tigrisek 900 alatt (HF 3. b)', c: '3600', a: '0,854', lo: '0', hi: '900', unit: 'évekre' },
  { name: 'Korosztály > 1 millió (4.)', c: '50', a: '0,94', lo: '1', hi: '50', unit: 'évekre' }
];

export const ExponentialInequalitiesTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: aˣ ⋈ b grafikusan
  const [a, setA] = useState<number>(1.2);
  const [bText, setBText] = useState<string>('1,44');
  const [rel, setRel] = useState<Rel>('≥');
  const b = parseNum(bText);
  const bOk = Number.isFinite(b);
  const x0 = bOk && b > 0 ? Math.log10(b) / Math.log10(a) : NaN;
  const finalRel: Rel = a < 1 ? FLIP[rel] : rel;
  let solutionText = '';
  if (!bOk) solutionText = 'Adj meg egy számot a jobb oldalon!';
  else if (a === 1) solutionText = '1ˣ = 1 minden x-re – válassz 1-től különböző alapot!';
  else if (b <= 0) {
    // aˣ > 0 mindig
    solutionText = rel === '>' || rel === '≥' ? 'Minden valós x megoldás (aˣ > 0 ≥ b).' : 'Nincs megoldás, mert aˣ mindig pozitív.';
  } else solutionText = `x ${finalRel} ${fmt(x0, 3)}`;
  const XR = 6;
  const X = (x: number) => 260 + x * 38;
  const Y = (y: number) => 200 - y * 30;
  const pts = Array.from({ length: 121 }, (_, i) => -XR + (i / 120) * 2 * XR)
    .filter((x) => Math.pow(a, x) <= 6.2)
    .map((x) => `${X(x).toFixed(1)},${Y(Math.pow(a, x)).toFixed(1)}`)
    .join(' ');
  const shadeFrom = (() => {
    if (!bOk || a === 1) return null;
    if (b <= 0) return rel === '>' || rel === '≥' ? [-XR, XR] : null;
    const goesRight = finalRel === '>' || finalRel === '≥';
    const c = Math.max(-XR, Math.min(XR, x0));
    return goesRight ? [c, XR] : [-XR, c];
  })();

  // Labor II: c · aˣ kettős egyenlőtlenség, egész értékekkel
  const [p, setP] = useState<number>(0);
  const [cText, setCText] = useState(PRESETS[0].c);
  const [aText, setAText] = useState(PRESETS[0].a);
  const [loText, setLoText] = useState(PRESETS[0].lo);
  const [hiText, setHiText] = useState(PRESETS[0].hi);
  const c2 = parseNum(cText);
  const a2 = parseNum(aText);
  const lo = parseNum(loText);
  const hi = parseNum(hiText);
  let err = '';
  if (![c2, a2, lo, hi].every(Number.isFinite)) err = 'Minden mezőbe számot írj!';
  else if (c2 <= 0) err = 'A kezdőérték (c) legyen pozitív.';
  else if (a2 <= 0 || a2 === 1) err = 'Az alap legyen pozitív és 1-től különböző.';
  else if (lo >= hi) err = 'Az alsó korlát legyen kisebb a felsőnél.';
  else if (hi <= 0) err = 'A felső korlát nem pozitív – nincs megoldás, mert c · aˣ > 0.';
  const L = Math.log10;
  const loBound = !err && lo > 0 ? L(lo / c2) / L(a2) : a2 > 1 ? -Infinity : Infinity;
  const hiBound = !err ? L(hi / c2) / L(a2) : NaN;
  const xMin = a2 > 1 ? loBound : hiBound;
  const xMax = a2 > 1 ? hiBound : loBound;
  const firstInt = Number.isFinite(xMin) ? Math.floor(xMin) + 1 : -Infinity;
  const lastInt = Number.isFinite(xMax) ? Math.ceil(xMax) - 1 : Infinity;

  return (
    <TheoryTemplate
      topicId="g11-hatvany-gyok-logaritmus"
      subtopicId="exponencialis-egyenlotlensegek"
      title="14. Exponenciális egyenlőtlenségek"
      subtitle="Az exponenciális függvény monotonitása alapján: ha a > 1, a relációjel marad; ha 0 < a < 1, megfordul. A határokat logaritmussal számoljuk ki."
      badge="11. OSZTÁLY • III. HATVÁNY, GYÖK, LOGARITMUS • TANANYAG"
      themeColor="violet"
      pdfFilename="11_osztaly_exponencialis_egyenlotlensegek_tananyag.pdf"
      practiceTitle="Készen állsz az exponenciális egyenlőtlenségekre?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — MONOTONITÁS',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center font-mono text-base font-black text-violet-900 dark:text-violet-200">
              aˣ &lt; b (b &gt; 0):  a &gt; 1 ⇒ x &lt; lg b / lg a;   0 &lt; a &lt; 1 ⇒ x &gt; lg b / lg a
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>a &gt; 1:</strong> x ↦ aˣ szigorúan növő, a relációjel <strong>nem változik</strong> (pl. 1,2ˣ ≥ 1,44 ⇔ x ≥ 2).
              </li>
              <li>
                <strong>0 &lt; a &lt; 1:</strong> x ↦ aˣ szigorúan csökkenő, a relációjel <strong>megfordul</strong> (pl. 0,5ˣ &lt; 8 ⇔ x &gt; −3).
              </li>
              <li>Mivel aˣ &gt; 0, az aˣ &lt; b (b ≤ 0) egyenlőtlenségnek nincs megoldása, az aˣ &gt; b (b ≤ 0) pedig minden x-re igaz.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Kidolgozott feladat */}
      <TheorySection title="1. Kidolgozott feladat: mikor adjuk el a részvényt?" badge="Tankönyv 112. o." badgeColor="violet">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Egy részvény értéke most 2000 Ft, és az f(x) = 2000 · 1,002ˣ képlettel modellezik (x: eltelt napok). 2300 és 2400 Ft között érdemes eladni. Legalább és legfeljebb hány
              napot várjunk?
            </p>
            <TheoryCard title="Megoldás lépésenként" badge="Kidolgozva" badgeColor="amber">
              <ol className="list-decimal pl-5 space-y-1">
                <li>
                  2300 &lt; 2000 · 1,002ˣ &lt; 2400; mindhárom részt 2000-rel osztva: <strong>1,15 &lt; 1,002ˣ &lt; 1,2</strong>.
                </li>
                <li>Az x ↦ 1,002ˣ függvény szigorúan növő, mert az alap 1-nél nagyobb – a relációjelek maradnak.</li>
                <li>
                  A határok: 1,002ˣ = 1,15 ⇒ x = lg 1,15 / lg 1,002 ≈ <strong>69,95</strong>; 1,002ˣ = 1,2 ⇒ x = lg 1,2 / lg 1,002 ≈ <strong>91,25</strong>.
                </li>
                <li>A grafikonról: 69,95 &lt; x &lt; 91,25.</li>
                <li>
                  Egész napokra: <strong>70 ≤ x ≤ 91</strong> – legkorábban a 70., legkésőbb a 91. napon adjuk el.
                </li>
              </ol>
            </TheoryCard>
          </div>
          <StockModelSvg />
        </div>
      </TheorySection>

      {/* 2. Monotonitás */}
      <TheorySection title="2. Az exponenciális függvény monotonitása" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3">
            <TheoryCard title="a > 1: a relációjel marad" badge="Növő" badgeColor="violet">
              <p className="text-sm text-slate-700">
                3ˣ ≤ 2187 = 3⁷ ⇔ <strong>x ≤ 7</strong>. A nagyobb kitevőhöz nagyobb hatvány tartozik.
              </p>
            </TheoryCard>
            <TheoryCard title="0 < a < 1: a relációjel megfordul" badge="Csökkenő" badgeColor="rose">
              <p className="text-sm text-slate-700">
                (1/2)ˣ &lt; 8 = (1/2)⁻³ ⇔ <strong>x &gt; −3</strong>. A nagyobb kitevőhöz kisebb hatvány tartozik. (Másképp: 2⁻ˣ &lt; 2³ ⇔ −x &lt; 3 ⇔ x &gt; −3.)
              </p>
            </TheoryCard>
          </div>
          <MonotonicityRuleSvg />
        </div>
      </TheorySection>

      {/* 3. Feladatok */}
      <TheorySection title="3. Grafikus leolvasás és a függvény tulajdonságai" badge="1. és 3. feladat" badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <GraphReadingSvg />
          <TheoryTable
            headers={['Egyenlőtlenség', 'Átalakítás', 'Megoldás']}
            rows={[
              ['1. a) 1,2ˣ ≥ 1,44', '1,44 = 1,2²; a > 1', 'x ≥ 2'],
              ['1. b) 1,2ˣ < 1', '1 = 1,2⁰; a > 1', 'x < 0'],
              ['3. a) (1/2)ˣ < 8', '8 = (1/2)⁻³; a < 1, fordul', 'x > −3'],
              ['3. b) 1 ≤ 1,5ˣ ≤ 10', '1,5⁰ ≤ 1,5ˣ ≤ 1,5^{lg 10 / lg 1,5}', '0 ≤ x ≤ 5,679'],
              ['HF 2. a) 3ˣ ≤ 2187', '2187 = 3⁷', 'x ≤ 7'],
              ['HF 2. b) 0,06 < 0,6ˣ < 6', 'határok: lg 6 / lg 0,6 és lg 0,06 / lg 0,6; fordul', '−3,508 < x < 5,508']
            ]}
          />
        </div>
      </TheorySection>

      {/* 4. Modellek */}
      <TheorySection title="4. Egyenlőtlenségek valós modellekben" badge="2., 4. feladat, HF" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="2. Webáruház: N(x) = 10 · 1,08ˣ" badge="Feladat" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>
                a) 10 · 1,08ˣ &gt; 100 ⇔ 1,08ˣ &gt; 10 ⇔ x &gt; lg 10 / lg 1,08 ≈ 29,92 ⇒ a <strong>30. napon</strong> lépte át először a 100-at.
              </li>
              <li>
                b) 1250 &lt; 10 · 1,08ˣ &lt; 1750 ⇔ 125 &lt; 1,08ˣ &lt; 175 ⇔ 62,74 &lt; x &lt; 67,11 ⇒ legalább kb. <strong>63</strong>, legfeljebb kb. <strong>67</strong> napig.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="4. Korosztályok: P(x) = 50 · 0,94ˣ millió fő" badge="Feladat" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Pl. P(53) ≈ 1,88 és P(70) ≈ 0,66 (millió fő).</li>
              <li>
                50 · 0,94ˣ &gt; 1 ⇔ 0,94ˣ &gt; 0,02. Mivel 0 &lt; 0,94 &lt; 1, a reláció <strong>megfordul</strong>: x &lt; lg 0,02 / lg 0,94 ≈ 63,22.
              </li>
              <li>
                A 40-nél idősebbek közül a <strong>41–63 évesek</strong> korosztályainak van egymilliónál több tagja.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="HF 1. A ¹⁴C felezési ideje 5730 év" badge="Házi feladat" badgeColor="sky">
            <p className="text-sm text-slate-700">
              (1/2)<sup>t/5730</sup> &gt; 0,15 ⇔ t / 5730 &lt; lg 0,15 / lg 0,5 ≈ 2,737 ⇔ t &lt; <strong>≈ 15 683 év</strong>. Legfeljebb kb. 15 680 éves a csontmaradvány.
            </p>
          </TheoryCard>
          <TheoryCard title="HF 3. Tigrisek (érettségi, 2015)" badge="Érettségi" badgeColor="slate">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>a) 2016 végén x = 2: 0,854² ≈ 0,7293, tehát kb. <strong>27,1%</strong>-kal csökken.</li>
              <li>
                b) 3600 · 0,854ˣ &lt; 900 ⇔ 0,854ˣ &lt; 0,25 ⇔ x &gt; lg 0,25 / lg 0,854 ≈ 8,78 ⇒ x = 9, azaz <strong>2023</strong>-ban.
              </li>
            </ul>
            <TigerDeclineSvg className="w-full h-auto mt-2" />
          </TheoryCard>
        </div>
        <AgeDistributionSvg />
      </TheorySection>

      {/* 5. Csapda */}
      <TheorySection title="5. Tipikus hiba: elfelejtett fordulás" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="50 · 0,94ˣ > 1"
          wrong="0,94ˣ > 0,02 ⇒ x > lg 0,02 / lg 0,94 ≈ 63,22"
          wrongExplanation="Az alap 1-nél kisebb, így a függvény csökkenő. Ugyanez algebrailag: x · lg 0,94 > lg 0,02 – osztáskor a negatív lg 0,94-gyel a relációjel megfordul."
          correct="0,94ˣ > 0,02 ⇔ x < lg 0,02 / lg 0,94 ≈ 63,22"
          correctExplanation="Ellenőrzés: P(53) ≈ 1,88 > 1 (53 < 63,22 ✓), P(70) ≈ 0,66 < 1 (70 > 63,22 ✓)."
          tip="Mindig nézd meg az alapot: 0 < a < 1 ⇒ fordul a relációjel. Egy próbaérték behelyettesítése azonnal leleplezi a hibát."
        />
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Interaktív Laboratórium I: grafikus megoldó" badge="Labor" badgeColor="violet">
        <div className="bg-white border-2 border-violet-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">alap: a = {fmt(a, 2)}</label>
              <input type="range" min="0.2" max="3" step="0.05" value={a} onChange={(e) => setA(Number(e.target.value))} className="w-full accent-violet-600" aria-label="alap" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">relációjel</label>
              <div className="flex gap-1">
                {(['<', '≤', '>', '≥'] as Rel[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => setRel(r)}
                    className={`flex-1 px-2 py-1.5 rounded-lg text-sm font-bold ${rel === r ? 'bg-violet-600 text-white' : 'bg-violet-50 text-violet-800'}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">jobb oldal (b)</label>
              <input type="text" value={bText} onChange={(e) => setBText(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-violet-200 font-mono" aria-label="jobb oldal" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              [1.2, '≥', '1,44'],
              [1.2, '<', '1'],
              [0.5, '<', '8'],
              [3, '≤', '2187'],
              [0.6, '>', '0,06'],
              [2, '>', '−1']
            ].map(([aa, rr, bb]) => (
              <button
                key={`${aa}${rr}${bb}`}
                onClick={() => {
                  setA(Number(aa));
                  setRel(rr as Rel);
                  setBText(String(bb));
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-violet-50 text-violet-800 hover:bg-violet-100"
              >
                {String(aa).replace('.', ',')}ˣ {rr} {bb}
              </button>
            ))}
          </div>
          <svg viewBox="0 0 520 240" className="w-full h-auto max-w-2xl mx-auto">
            {Array.from({ length: 13 }, (_, i) => i - 6).map((i) => (
              <g key={i}>
                <line x1={X(i)} y1={Y(0)} x2={X(i)} y2={Y(6)} stroke="#f1f5f9" />
                {i !== 0 && (
                  <text x={X(i)} y={Y(0) + 14} fontSize="10" textAnchor="middle" fill="#64748b">
                    {i < 0 ? `−${-i}` : i}
                  </text>
                )}
              </g>
            ))}
            <line x1={X(-6.2)} y1={Y(0)} x2={X(6.2)} y2={Y(0)} stroke="#334155" strokeWidth="1.5" />
            <line x1={X(0)} y1={Y(-0.3)} x2={X(0)} y2={Y(6.2)} stroke="#334155" strokeWidth="1.5" />
            {bOk && b > 0 && b <= 6 && <line x1={X(-6.2)} y1={Y(b)} x2={X(6.2)} y2={Y(b)} stroke="#db2777" strokeDasharray="5 3" strokeWidth="1.5" />}
            <polyline points={pts} fill="none" stroke="#7c3aed" strokeWidth="3" />
            {shadeFrom && (
              <line x1={X(shadeFrom[0])} y1={Y(0) + 24} x2={X(shadeFrom[1])} y2={Y(0) + 24} stroke="#7c3aed" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
            )}
            {bOk && b > 0 && Math.abs(x0) <= 6 && a !== 1 && (
              <circle
                cx={X(x0)}
                cy={Y(0) + 24}
                r="6"
                fill={rel === '≤' || rel === '≥' ? '#7c3aed' : '#ffffff'}
                stroke="#7c3aed"
                strokeWidth="2"
              />
            )}
          </svg>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="bg-violet-50 rounded-xl border border-violet-200 p-4 space-y-1">
              <div className="font-bold text-violet-800">
                {fmt(a, 2)}ˣ {rel} {bText}
              </div>
              {bOk && b > 0 && a !== 1 && (
                <div>
                  határ: x₀ = lg {bText} / lg {fmt(a, 2)} ≈ {fmt(x0, 3)}
                </div>
              )}
              <div className="text-lg">
                Megoldás: <strong className="text-violet-800">{solutionText}</strong>
              </div>
            </div>
            <div className={`rounded-xl border p-4 text-sm font-bold ${a < 1 ? 'bg-rose-50 border-rose-200 text-rose-700' : a > 1 ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
              {a < 1
                ? `0 < a < 1: a függvény csökkenő, ezért a relációjel megfordul (${rel} → ${FLIP[rel]}).`
                : a > 1
                  ? 'a > 1: a függvény növő, a relációjel marad.'
                  : 'a = 1: konstans függvény.'}
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Interaktív Laboratórium II: kettős egyenlőtlenség modellekben" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((pr, i) => (
              <button
                key={pr.name}
                onClick={() => {
                  setP(i);
                  setCText(pr.c);
                  setAText(pr.a);
                  setLoText(pr.lo);
                  setHiText(pr.hi);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${p === i ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'}`}
              >
                {pr.name}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              ['alsó korlát', loText, setLoText],
              ['c (kezdőérték)', cText, setCText],
              ['a (alap)', aText, setAText],
              ['felső korlát', hiText, setHiText]
            ].map(([label, val, set]) => (
              <div key={label as string}>
                <label className="block text-xs font-semibold text-slate-600 mb-1">{label as string}</label>
                <input
                  type="text"
                  value={val as string}
                  onChange={(e) => (set as (v: string) => void)(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-emerald-200 font-mono"
                  aria-label={label as string}
                />
              </div>
            ))}
          </div>
          {err ? (
            <div className="bg-rose-50 rounded-xl border border-rose-200 p-4 text-sm font-bold text-rose-700">{err}</div>
          ) : (
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-2 text-sm text-slate-700">
              <div className="font-mono font-bold text-slate-900">
                {loText} &lt; {cText} · {aText}ˣ &lt; {hiText}
              </div>
              <div>
                1. Osztás c-vel (c = {cText}): {lo > 0 ? fmt(lo / c2, 4) : '0'} &lt; {aText}ˣ &lt; {fmt(hi / c2, 4)}
              </div>
              <div>
                2. Határok: {lo > 0 ? <>lg {fmt(lo / c2, 4)} / lg {aText} ≈ {fmt(loBound, 2)}</> : 'alsó korlát ≤ 0: mindig teljesül'}; lg {fmt(hi / c2, 4)} / lg {aText} ≈ {fmt(hiBound, 2)}
              </div>
              <div>
                3. {a2 > 1 ? 'a > 1: a relációjelek maradnak' : '0 < a < 1: a relációjelek megfordulnak'} ⇒{' '}
                <strong>
                  {Number.isFinite(xMin) ? fmt(xMin, 2) : '−∞'} &lt; x &lt; {Number.isFinite(xMax) ? fmt(xMax, 2) : '+∞'}
                </strong>
              </div>
              <div className="text-base">
                Egész {PRESETS[p].unit}:{' '}
                <strong className="text-emerald-800">
                  {Number.isFinite(firstInt) && Number.isFinite(lastInt)
                    ? firstInt <= lastInt
                      ? `${firstInt} ≤ x ≤ ${lastInt}`
                      : 'nincs egész megoldás'
                    : Number.isFinite(firstInt)
                      ? `x ≥ ${firstInt}`
                      : `x ≤ ${lastInt}`}
                </strong>
              </div>
            </div>
          )}
          <TheoryCallout type="tip" title="Egyszerűsíts először!">
            A kettős egyenlőtlenség mindhárom részét elosztjuk a (pozitív) kezdőértékkel – így csak egy hatvány marad középen, és a két határt külön-külön logaritmussal számolhatjuk ki.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ExponentialInequalitiesTheory;
