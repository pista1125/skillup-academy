import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { HalfLifeCarbonSvg, HalfLifeDrugSvg, HalfLifeGraphSvg, HalfLifeIsotopeSvg, HalfLifeTableSvg } from './HalfLifeFigures';

const fmt = (x: number, d = 3) => {
  if (!Number.isFinite(x)) return '–';
  const s = Number(x.toFixed(d)).toString();
  return s.replace('.', ',').replace('-', '−');
};

const PRESETS: { name: string; T: number; unit: string; n0: number; nUnit: string }[] = [
  { name: 'Lázcsillapító', T: 3.72, unit: 'óra', n0: 500, nUnit: 'mg' },
  { name: 'Szén-14', T: 5730, unit: 'év', n0: 6e12, nUnit: 'atom' },
  { name: 'Jód-131', T: 8, unit: 'nap', n0: 100, nUnit: 'g' },
  { name: 'Cézium-137', T: 30, unit: 'év', n0: 100, nUnit: 'g' },
  { name: 'Szerszámgép értéke', T: 4.5, unit: 'év', n0: 100, nUnit: '%' }
];

const fmtBig = (x: number) => {
  if (Math.abs(x) >= 1e6) {
    const e = Math.floor(Math.log10(Math.abs(x)));
    const m = x / Math.pow(10, e);
    const sup = String(e)
      .split('')
      .map((c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[Number(c)])
      .join('');
    return `${fmt(m, 2)} · 10${sup}`;
  }
  return fmt(x, 2);
};

export const HalfLifeTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: bomlás-szimulátor
  const [preset, setPreset] = useState<number>(0);
  const [tRel, setTRel] = useState<number>(1); // eltelt idő a felezési idő többszörösében
  const p = PRESETS[preset];
  const tAbs = tRel * p.T;
  const frac = Math.pow(0.5, tRel);
  const toS = (u: number, y: number): [number, number] => [40 + u * 46, 200 - y * 170];
  let d = '';
  for (let i = 0; i <= 120; i++) {
    const u = (6 * i) / 120;
    const [x, y] = toS(u, Math.pow(0.5, u));
    d += `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  const [cx, cy] = toS(tRel, frac);

  // Labor II: felezési idő keresése intervallumfelezéssel
  const [q, setQ] = useState<number>(0.83);
  const [lo, setLo] = useState<number>(0);
  const [hi, setHi] = useState<number>(40);
  const [log, setLog] = useState<{ a: number; b: number; mid: number; v: number }[]>([]);
  // kezdő intervallum: első egész n, amelyre q^n < 0,5
  const startHi = (() => {
    let n = 1;
    while (Math.pow(q, n) >= 0.5 && n < 200) n++;
    return n;
  })();
  const reset = (nq: number) => {
    setQ(nq);
    let n = 1;
    while (Math.pow(nq, n) >= 0.5 && n < 200) n++;
    setLo(n - 1);
    setHi(n);
    setLog([]);
  };
  const effLo = log.length === 0 ? startHi - 1 : lo;
  const effHi = log.length === 0 ? startHi : hi;
  const step = () => {
    const mid = (effLo + effHi) / 2;
    const v = Math.pow(q, mid);
    if (v > 0.5) setLo(mid);
    else setLo(effLo);
    if (v > 0.5) setHi(effHi);
    else setHi(mid);
    setLog((l) => [...l, { a: effLo, b: effHi, mid, v }]);
  };
  const exactT = Math.log(0.5) / Math.log(q);

  return (
    <TheoryTemplate
      topicId="g11-hatvany-gyok-logaritmus"
      subtopicId="felezesi-ido"
      title="9. Felezési idő"
      subtitle="Mennyi idő alatt csökken a felére egy exponenciálisan fogyó mennyiség? Gyógyszer kiürülése, radioaktív bomlás, szénizotópos kormeghatározás."
      badge="11. OSZTÁLY • III. HATVÁNY, GYÖK, LOGARITMUS • TANANYAG"
      themeColor="violet"
      pdfFilename="11_osztaly_felezesi_ido_tananyag.pdf"
      practiceTitle="Készen állsz a felezési idős feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A FELEZÉSI IDŐ',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center">
              <span className="font-mono text-base font-black text-violet-900 dark:text-violet-200">
                m(t + T) = ½ · m(t) &nbsp;⇔&nbsp; m(t) = m₀ · (1/2)^(t/T)
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li><strong>Felezési idő (T):</strong> az az időtartam, amely alatt az exponenciálisan csökkenő mennyiség a felére csökken.</li>
              <li>T a folyamatra jellemző állandó: <strong>nem függ a kezdeti értéktől</strong>.</li>
              <li>n felezési idő után a kezdeti mennyiség <strong>1/2ⁿ</strong> része marad (1/2, 1/4, 1/8, 1/16, …).</li>
              <li>m(t) = m₀ · qᵗ esetén T az a szám, amelyre <strong>q<sup>T</sup> = 0,5</strong>.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Kidolgozott feladat */}
      <TheorySection title="1. Kidolgozott feladat: mikor ürül ki a lázcsillapító fele?" badge="Tankönyv 100. o." badgeColor="violet">
        <p className="text-sm text-slate-700 leading-relaxed mb-3">
          Apa délben bevett egy lázcsillapítót, és amíg a gyógyszer ki nem ürül a szervezetéből, nem ihat bort. A hatóanyag mennyisége a bevételtől számított t óra múlva
          <strong> m(t) = m₀ · 0,83ᵗ</strong>, ahol m₀ = 500 mg (metamizol-nátrium egy tablettában).
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>a)</strong> Mikor marad az 500 mg-ból 250 mg? Az egyenlet: 250 = 500 · 0,83ᵗ. Mindkét oldalt 500-zal osztva: <strong>0,5 = 0,83ᵗ</strong>.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Egész számokat behelyettesítve: 0,83² ≈ 0,689; 0,83³ ≈ 0,572; 0,83⁴ ≈ 0,474 ⇒ 3 és 4 óra között feleződik.</li>
              <li>Tizedekkel: 0,83<sup>3,7</sup> ≈ 0,502 &gt; 0,5 &gt; 0,493 ≈ 0,83<sup>3,8</sup> ⇒ ≈ 3,8 óra.</li>
              <li>Századokkal: 0,83<sup>3,71</sup> ≈ 0,501; 0,83<sup>3,72</sup> ≈ 0,500; 0,83<sup>3,73</sup> ≈ 0,499.</li>
              <li>Három jegy pontossággal: <strong>t ≈ 3,72 óra</strong> után marad a hatóanyag fele.</li>
            </ul>
            <p>
              <strong>b)</strong> Ha csak egy 300 mg-os darabot vesz be: 150 = 300 · 0,83ᵗ ⇒ ismét <strong>0,5 = 0,83ᵗ</strong> ⇒ t ≈ 3,72 óra.
            </p>
            <TheoryCallout type="info" title="Miért ugyanaz az eredmény?">
              A 0,83ᵗ tényező azt mutatja meg, <em>hányszorosára</em> változott a kezdeti mennyiség t óra alatt. Feleződéskor ez 0,5 – akármennyi volt kezdetben. Ezt az
              időtartamot nevezzük a hatóanyag <strong>felezési idejének</strong>.
            </TheoryCallout>
          </div>
          <div className="space-y-4">
            <HalfLifeTableSvg />
            <HalfLifeDrugSvg />
          </div>
        </div>
      </TheorySection>

      {/* 2. Elmélet */}
      <TheorySection title="2. A felezési idő fogalma" badge="Elmélet" badgeColor="teal">
        <HalfLifeGraphSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TheoryCard title="Definíció" badge="T" badgeColor="violet">
            <p className="text-sm text-slate-700 leading-relaxed">
              Az időben exponenciálisan csökkenő mennyiségeknél a <strong>felezési idő</strong> az az időtartam, amely alatt a vizsgált mennyiség értéke a kezdeti érték felére
              csökken. Jele többnyire <strong>T</strong>.
            </p>
            <p className="text-sm text-slate-700 mt-2">
              Ha a t időpontban k a mennyiség, akkor t + T-ben k/2, t + 2T-ben k/4, t + 3T-ben k/8.
            </p>
          </TheoryCard>
          <TheoryCard title="Megjegyzések" badge="Állandó" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>T a folyamatra jellemző állandó szám, nem függ a kezdeti értéktől (és attól sem, mikor kezdjük mérni).</li>
              <li>A felezési idő fogalma különösen fontos a radioaktivitás vizsgálatakor.</li>
              <li>Ha a felezési idő ismert: m(t) = m₀ · (1/2)^(t/T), hiszen t/T darab felezés történt.</li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryTable
          headers={['Eltelt idő', '0', 'T', '2T', '3T', '4T', '5T']}
          rows={[
            ['Megmaradt rész', '1', '1/2', '1/4', '1/8', '1/16', '1/32'],
            ['Százalékban', '100%', '50%', '25%', '12,5%', '6,25%', '3,125%']
          ]}
        />
      </TheorySection>

      {/* 3. Feladatok */}
      <TheorySection title="3. Feladatok megoldása" badge="Tankönyv 101. o." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Apa lázcsillapítója (1. feladat)" badge="m(t) = 500 · 0,83ᵗ" badgeColor="violet">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>a)</strong> Déltől este 7-ig 7 óra telik el: 0,83⁷ ≈ 0,271 ⇒ a hatóanyag <strong>≈ 27,1%-a</strong> (≈ 136 mg) van még a szervezetében.</li>
              <li><strong>b)</strong> A hétórai mennyiséghez képest is <strong>≈ 3,72 óra</strong> alatt feleződik (T nem függ a kezdőértéktől).</li>
              <li><strong>c)</strong> 500 · 0,83ᵗ &lt; 5 ⇔ 0,83ᵗ &lt; 0,01: 0,83²⁴ · 500 ≈ 5,71 mg, 0,83²⁵ · 500 ≈ 4,74 mg ⇒ <strong>kb. 25 óra</strong> (pontosabban ≈ 24,7 óra) múlva.</li>
              <li><strong>d)</strong> Nyolcadára: 3 felezés ⇒ 3T ≈ <strong>11,16 óra</strong>; tizenhatodára: 4T ≈ <strong>14,88 óra</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) A szerszámgép értéke (2. feladat)" badge="T = 4,5 év" badgeColor="orange">
            <p className="text-sm text-slate-700 leading-relaxed">
              12,5% = 1/8 = (1/2)³, tehát 3 felezési idő kell: 3 · 4,5 = <strong>13,5 év</strong> után csökken az érték az eredeti 12,5%-a alá.
            </p>
          </TheoryCard>
          <TheoryCard title="C) Felezési idő a képletből (3. feladat)" badge="t órában" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>a)</strong> f(t) = 340 · (1/2)ᵗ: minden órában feleződik ⇒ <strong>T = 1 óra</strong>.</li>
              <li><strong>b)</strong> g(t) = 2,4 · (1/2)^(t/3): a kitevő 3 óránként nő 1-gyel ⇒ <strong>T = 3 óra</strong>.</li>
              <li><strong>c)</strong> h(t) = 54 · 2<sup>−5t</sup> = 54 · (1/2)<sup>5t</sup>: a kitevő már t = 1/5 óránál 1 ⇒ <strong>T = 0,2 óra = 12 perc</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Szénizotópos kormeghatározás (4. feladat)" badge="¹⁴C" badgeColor="indigo">
            <HalfLifeCarbonSvg className="w-full h-auto mb-3" />
            <p className="text-sm text-slate-700 leading-relaxed">
              6 · 10¹² / (3,75 · 10¹¹) = 16 = 2⁴ ⇒ 4 felezési idő: 4 · 5730 = <strong>22 920 év</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="E) Házi feladatok" badge="Ellenőrzés" badgeColor="slate">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>HF 1.</strong> M(t) = 58 · 0,9ᵗ: M(0) = <strong>58</strong>; 0,9⁶ ≈ 0,531, 0,9⁷ ≈ 0,478 ⇒ T ≈ <strong>6,6</strong> (pontosabban 6,58).</li>
              <li><strong>HF 2. a)</strong> 0,5% alatt: 2⁻⁷ ≈ 0,78%, 2⁻⁸ ≈ 0,39% ⇒ 7 és 8 felezés között (≈ 7,64 T): jódnál <strong>≈ 61 nap</strong> (biztosan 64 nap után), céziumnál <strong>≈ 229 év</strong> (biztosan 240 év után).</li>
              <li><strong>HF 2. b)</strong> 4 év alatt a jód ≈ 182-szer feleződik ⇒ gyakorlatilag <strong>0%</strong> marad; a céziumból (1/2)^(4/30) ≈ <strong>91,2%</strong>.</li>
              <li><strong>HF 3.</strong> M(t) = 28,9 · 2^(−t/8): M(0) = <strong>28,9</strong>, T = <strong>8</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="F) Jód és cézium" badge="Fukushima" badgeColor="teal">
            <HalfLifeIsotopeSvg className="w-full h-auto" />
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Csapda */}
      <TheorySection title="4. Tipikus hiba: a felezés nem egyenletes fogyás" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Két felezési idő után nem fogy el a mennyiség!"
          wrong="A jód felezési ideje 8 nap: 8 nap alatt a fele, további 8 nap alatt a másik fele bomlik el, tehát 16 nap után nem marad jód."
          wrongExplanation="Ez lineáris (egyenletes) fogyást feltételez. Exponenciális csökkenésnél a második 8 nap alatt a MEGMARADT mennyiség fele bomlik el, nem a kezdetié."
          correct="16 nap = 2T ⇒ a kezdeti mennyiség (1/2)² = 1/4 része, azaz 25% marad meg; 3T után 12,5%, 4T után 6,25%."
          correctExplanation="Minden felezési idő alatt a pillanatnyi mennyiség feleződik, ezért a mennyiség sosem lesz pontosan 0 – csak egyre kisebb."
          tip="Kérdezd meg: hány felezési idő telt el? Ha n, akkor a megmaradt rész 1/2ⁿ – ne vond ki kétszer az 50%-ot!"
        />
      </TheorySection>

      {/* 5. Labor I */}
      <TheorySection title="5. Interaktív Laboratórium I: Bomlás-szimulátor" badge="Labor" badgeColor="violet">
        <div className="bg-white border-2 border-violet-200 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-wrap gap-2 mb-4">
            {PRESETS.map((pr, i) => (
              <button
                key={pr.name}
                onClick={() => setPreset(i)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${i === preset ? 'bg-violet-600 text-white' : 'bg-violet-100 text-violet-800 hover:bg-violet-200'}`}
              >
                {pr.name} (T = {fmt(pr.T, 2)} {pr.unit})
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  eltelt idő: t = {fmt(tRel, 2)} · T = {fmt(tAbs, 2)} {p.unit}
                </label>
                <input
                  type="range"
                  min="0"
                  max="6"
                  step="0.05"
                  value={tRel}
                  onChange={(e) => setTRel(Number(e.target.value))}
                  className="w-full accent-violet-600"
                  aria-label="eltelt idő"
                />
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm text-slate-700 space-y-1">
                <div className="font-mono">
                  m(t) = m₀ · (1/2)^(t/T) = {fmtBig(p.n0)} · 0,5<sup>{fmt(tRel, 2)}</sup>
                </div>
                <div className="text-lg">
                  Megmaradt: <strong className="text-violet-700">{fmtBig(p.n0 * frac)} {p.nUnit}</strong>
                </div>
                <div>
                  A kezdeti mennyiség <strong>{fmt(frac * 100, 3)}%</strong>-a; elbomlott/kiürült: {fmt((1 - frac) * 100, 3)}%.
                </div>
                <div className="text-xs">Eddig {fmt(tRel, 2)} felezési idő telt el.</div>
              </div>
              <TheoryCallout type="tip" title="Figyeld meg!">
                Az egész számú T-többszörösöknél a görbe pontosan 50%, 25%, 12,5%… magasan van – bármelyik izotópot vagy gyógyszert választod. Csak a T időtartama (óra, nap, év) más.
              </TheoryCallout>
            </div>
            <svg viewBox="0 0 340 230" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
              <line x1="40" y1="200" x2="325" y2="200" stroke="#64748b" strokeWidth="1.5" />
              <line x1="40" y1="200" x2="40" y2="20" stroke="#64748b" strokeWidth="1.5" />
              {[0, 1, 2, 3, 4, 5, 6].map((k) => (
                <g key={k}>
                  <line x1={toS(k, 0)[0]} y1="200" x2={toS(k, 0)[0]} y2="25" stroke="#e2e8f0" />
                  <text x={toS(k, 0)[0]} y="214" fontSize="9" textAnchor="middle" fill="#64748b">
                    {k === 0 ? '0' : k === 1 ? 'T' : `${k}T`}
                  </text>
                </g>
              ))}
              {[1, 0.5, 0.25, 0.125].map((y) => (
                <text key={y} x="36" y={toS(0, y)[1] + 3} fontSize="9" textAnchor="end" fill="#64748b">
                  {fmt(y * 100, 1)}%
                </text>
              ))}
              <path d={d} fill="none" stroke="#7c3aed" strokeWidth="2.5" />
              <line x1="40" y1={cy} x2={cx} y2={cy} stroke="#db2777" strokeDasharray="4 3" />
              <line x1={cx} y1={cy} x2={cx} y2="200" stroke="#db2777" strokeDasharray="4 3" />
              <circle cx={cx} cy={cy} r="5" fill="#db2777" />
              <text x="320" y="226" fontSize="9" textAnchor="end" fill="#334155">
                t ({p.unit})
              </text>
            </svg>
          </div>
        </div>
      </TheorySection>

      {/* 6. Labor II */}
      <TheorySection title="6. Interaktív Laboratórium II: A felezési idő keresése lépésenként" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <p className="text-sm text-slate-700">
            A tankönyv módszere: a <strong>q<sup>t</sup> = 0,5</strong> egyenlet megoldását behelyettesítéssel szűkítjük. Válaszd ki az óránkénti szorzót (q), majd nyomd a „Következő lépés”
            gombot: a program mindig az intervallum közepét próbálja ki.
          </p>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">szorzó időegységenként: q = {fmt(q, 2)}</label>
            <input
              type="range"
              min="0.5"
              max="0.98"
              step="0.01"
              value={q}
              onChange={(e) => reset(Number(e.target.value))}
              className="w-full accent-purple-600"
              aria-label="szorzó"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={step} disabled={log.length >= 10} className="px-4 py-2 rounded-lg text-sm font-bold bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50">
              Következő lépés
            </button>
            <button onClick={() => reset(q)} className="px-4 py-2 rounded-lg text-sm font-bold bg-slate-100 text-slate-700 hover:bg-slate-200">
              Újrakezdés
            </button>
          </div>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1">
            <div>
              Kiindulás: {fmt(q, 2)}<sup>{startHi - 1}</sup> ≈ {fmt(Math.pow(q, startHi - 1), 4)} ≥ 0,5 és {fmt(q, 2)}<sup>{startHi}</sup> ≈ {fmt(Math.pow(q, startHi), 4)} &lt; 0,5 ⇒ {startHi - 1} &lt; T ≤ {startHi}
            </div>
            {log.map((r, i) => (
              <div key={i} className="font-mono text-xs">
                {i + 1}. lépés: t = {fmt(r.mid, 4)} ⇒ {fmt(q, 2)}<sup>t</sup> ≈ {fmt(r.v, 4)} {r.v > 0.5 ? '> 0,5 → jobbra' : '≤ 0,5 → balra'}
              </div>
            ))}
            <div className="text-base pt-1">
              Jelenlegi intervallum: <strong className="text-purple-700">{fmt(effLo, 4)} &lt; T ≤ {fmt(effHi, 4)}</strong>
            </div>
            {log.length >= 6 && <div className="text-xs text-emerald-700">Pontos érték (ellenőrzésként): T ≈ {fmt(exactT, 4)}</div>}
          </div>
          <TheoryCallout type="success" title="Ellenőrizd a tankönyvi eredményt!">
            q = 0,83 esetén néhány lépés után T ≈ 3,72 adódik; q = 0,9 (HF 1.) esetén T ≈ 6,58. A következő leckében a logaritmussal ezt egyetlen lépésben kiszámíthatjuk.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default HalfLifeTheory;
