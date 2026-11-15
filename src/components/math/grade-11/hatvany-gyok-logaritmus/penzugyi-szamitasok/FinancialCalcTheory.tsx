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
  FinancialCalcCompoundSvg,
  FinancialCalcDepreciationSvg,
  FinancialCalcDoublingSvg,
  FinancialCalcFormulaSvg,
  FinancialCalcSimpleVsCompoundSvg
} from './FinancialCalcFigures';

/** Magyar számformátum: tizedesvessző, ezres tagolás szóközzel. */
const fmt = (x: number, d = 2) => {
  if (!Number.isFinite(x)) return '–';
  const neg = x < 0;
  const [i, f] = Math.abs(x).toFixed(d).split('.');
  const int = i.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const s = f && Number(f) !== 0 ? `${int},${f.replace(/0+$/, '')}` : int;
  return (neg ? '−' : '') + s;
};

/** n-edik gyök jelölése szövegben. */
const R: React.FC<{ n?: number | string; children: React.ReactNode }> = ({ n, children }) => (
  <span className="whitespace-nowrap">
    {n !== undefined && n !== 2 && <sup className="text-[0.7em] mr-[-0.15em]">{n}</sup>}√<span className="border-t border-current">{children}</span>
  </span>
);

const LAB2_PRESETS: { name: string; p: number; m: number; n: number }[] = [
  { name: '6% – duplázódás', p: 6, m: 2, n: 10 },
  { name: '18% – háromszorozódás', p: 18, m: 3, n: 5 },
  { name: '7,5% – duplázódás', p: 7.5, m: 2, n: 10 },
  { name: 'Autó: −20% → fele érték', p: -20, m: 0.5, n: 3 }
];

export const FinancialCalcTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: kamatoskamat-kalkulátor
  const [capital, setCapital] = useState<number>(500000);
  const [rateP, setRateP] = useState<number>(6);
  const [years, setYears] = useState<number>(10);
  const [tax, setTax] = useState<number>(0);
  const [showSimple, setShowSimple] = useState<boolean>(true);
  const q = 1 + rateP / 100;
  const series = Array.from({ length: years + 1 }, (_, k) => capital * Math.pow(q, k));
  const simpleSeries = Array.from({ length: years + 1 }, (_, k) => capital * (1 + (rateP / 100) * k));
  const final = series[years];
  const interest = final - capital;
  const taxAmount = (interest * tax) / 100;
  const net = final - taxAmount;
  let doubleYear = -1;
  for (let k = 1; k <= 300; k++) {
    if (Math.pow(q, k) >= 2) {
      doubleYear = k;
      break;
    }
  }
  const maxV = Math.max(final, capital * 2, showSimple ? simpleSeries[years] : 0) * 1.08;
  const W = 460;
  const H = 230;
  const L = 60;
  const T = 15;
  const bw = Math.max(3, (W / (years + 1)) * 0.7);
  const bx = (k: number) => L + (k + 0.5) * (W / (years + 1)) - bw / 2;
  const by = (v: number) => T + H - (v / maxV) * H;

  // Labor II: hiányzó adat kereső
  const [p2, setP2] = useState<number>(6);
  const [m2, setM2] = useState<number>(2);
  const [n2, setN2] = useState<number>(10);
  const neededRate = m2 > 0 && n2 >= 1 ? (Math.pow(m2, 1 / n2) - 1) * 100 : NaN;
  const q2 = 1 + p2 / 100;
  const growing = q2 > 1 && m2 > 1;
  const shrinking = q2 > 0 && q2 < 1 && m2 < 1 && m2 > 0;
  const trial: { k: number; v: number }[] = [];
  let found = -1;
  if (growing || shrinking) {
    for (let k = 1; k <= 200; k++) {
      const v = Math.pow(q2, k);
      const ok = growing ? v >= m2 : v <= m2;
      if (ok) {
        found = k;
        break;
      }
    }
    if (found > 0) {
      for (let k = Math.max(1, found - 3); k <= found; k++) trial.push({ k, v: Math.pow(q2, k) });
    }
  }

  return (
    <TheoryTemplate
      topicId="g11-hatvany-gyok-logaritmus"
      subtopicId="penzugyi-szamitasok"
      title="6. Pénzügyi számítások"
      subtitle="Kamatos kamat, értékcsökkenés, kamatadó: a hatványozás és az n-edik gyök a bankban és az autópiacon. Mennyi lesz a pénzünk, mekkora kamatláb kell, és hány év alatt duplázódik meg?"
      badge="11. OSZTÁLY • III. HATVÁNY, GYÖK, LOGARITMUS • TANANYAG"
      themeColor="violet"
      pdfFilename="11_osztaly_penzugyi_szamitasok_tananyag.pdf"
      practiceTitle="Készen állsz a kamatos kamatos feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — KAMATOS KAMAT',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center">
              <span className="font-mono text-base font-black text-violet-900 dark:text-violet-200">
                Aₙ = A · (1 + p/100)ⁿ
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li><strong>A</strong> a tőke, <strong>p</strong> az évi kamatláb (%), <strong>n</strong> az évek (ciklusok) száma; p%-os növekedés = szorzás (1 + p/100)-dal.</li>
              <li><strong>Aₙ-t keressük:</strong> hatványozás. <strong>p-t keressük:</strong> n-edik gyök: 1 + p/100 = ⁿ√(Aₙ/A).</li>
              <li><strong>n-et keressük:</strong> egyelőre próbálgatás (pl. 1,06¹¹ ≈ 1,898 &lt; 2 &lt; 2,012 ≈ 1,06¹²).</li>
              <li><strong>Értékcsökkenés</strong> p%-kal: szorzó 1 − p/100 (pl. 20% ⇒ 0,8).</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: tényleg megduplázódik 10 év alatt?" badge="Tankönyv 94. o." badgeColor="violet">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A nagyszülők 500 000 Ft-ot tennének a bankba évi <strong>6%-os kamatos kamatra</strong>, 10 éves futamidőre. Valóban megduplázódik a pénz?
            </p>
            <p>
              Az évi 6%-os kamatos kamat azt jelenti, hogy a betét év eleji értékéhez minden év végén hozzáadják a 6%-át. Ezt a megnövelt értéket úgy is
              megkaphatjuk, hogy az év eleji értéket <strong>megszorozzuk 1,06-dal</strong>.
            </p>
            <p className="font-mono bg-violet-50 border border-violet-200 rounded-lg p-2 text-center">
              500 000 · 1,06 · 1,06 · … · 1,06 (10 tényező) = 500 000 · 1,06¹⁰ ≈ 895 424 Ft
            </p>
            <p>
              Az eredeti összeg tehát <strong>nem duplázódna meg</strong> (a kétszerese 1 000 000 Ft lenne).
            </p>
          </div>
          <FinancialCalcCompoundSvg />
        </div>
      </TheorySection>

      {/* 2. Kidolgozott feladatok */}
      <TheorySection title="2. Kidolgozott feladatok: kamatláb és futamidő" badge="Tankönyv 94. o." badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="1. Legalább mekkora kamatláb mellett duplázódna meg 10 év alatt?" badge="n-edik gyök" badgeColor="violet">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Legyen x az évi szorzó: 500 000 · x¹⁰ = 1 000 000.</li>
              <li>Ezzel egyenértékű: x¹⁰ = 2.</li>
              <li>A pozitív x, amelynek tizedik hatványa 2, gyökvonással adódik: x = <R n={10}>2</R> ≈ 1,072.</li>
              <li>Tehát évi kb. <strong>7,2%-os</strong> kamatos kamat mellett duplázódik meg a tőke 10 év alatt.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="2. Legalább hány év alatt duplázódna meg évi 6% mellett?" badge="Próbálgatás" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Meg kell oldanunk az 500 000 · 1,06ˣ = 1 000 000, azaz az 1,06ˣ = 2 egyenletet.</li>
              <li>Ezt egyelőre csak próbálgatással tudjuk megoldani; x nyilvánvalóan 10-nél nagyobb egész szám.</li>
              <li>1,06¹¹ ≈ 1,898 és 1,06¹² ≈ 2,012.</li>
              <li>11 év alatt még nem, de <strong>12 év alatt</strong> már több mint duplájára nőne az összeg.</li>
            </ul>
          </TheoryCard>
        </div>
        <FinancialCalcDoublingSvg />
      </TheorySection>

      {/* 3. Elmélet */}
      <TheorySection title="3. Elmélet: a kamatos kamat képlete" badge="Elmélet" badgeColor="teal">
        <FinancialCalcFormulaSvg />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <TheoryCard title="Aₙ ismeretlen" badge="Hatványozás" badgeColor="sky">
            <p className="text-sm text-slate-700">Ha A-t, p-t és n-et ismerjük, egyszerű hatványozási és szorzási feladatról van szó: Aₙ = A · (1 + p/100)ⁿ.</p>
          </TheoryCard>
          <TheoryCard title="p ismeretlen" badge="Gyökvonás" badgeColor="violet">
            <p className="text-sm text-slate-700">
              1 + p/100 = <R n="n">Aₙ / A</R>. Pl. 10 év alatt másfélszeres: <R n={10}>1,5</R> ≈ 1,0414 ⇒ p ≈ 4,14.
            </p>
          </TheoryCard>
          <TheoryCard title="n ismeretlen" badge="Próbálgatás" badgeColor="amber">
            <p className="text-sm text-slate-700">Ha n-et keressük, egyelőre a próbálgatás módszerére kell szorítkoznunk (a logaritmussal később pontosan is meg tudjuk oldani).</p>
          </TheoryCard>
        </div>
        <FinancialCalcSimpleVsCompoundSvg />
        <TheoryCallout type="info" title="Egyszerű kamat vs. kamatos kamat">
          Egyszerű kamatnál minden évben csak az eredeti tőke után jár kamat (lineáris növekedés: A · (1 + n · p/100)); kamatos kamatnál a kamat is kamatozik
          (exponenciális növekedés). 100 000 Ft évi 10%-kal 3 év alatt: egyszerű kamattal 130 000 Ft, kamatos kamattal 133 100 Ft.
        </TheoryCallout>
      </TheorySection>

      {/* 4. Feladatok */}
      <TheorySection title="4. Feladatok megoldása" badge="Tankönyv 94–95. o." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="1. A benzin ára ötször 106%-ra" badge="Ismételt szorzás" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>a)</strong> 1,06⁵ ≈ <strong>1,338-szorosára</strong> nőtt az ár.</li>
              <li><strong>b)</strong> Tehát kb. <strong>33,8%-kal</strong> nőtt (nem 5 · 6% = 30%-kal!).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="2. 600 ezer Ft 3 évre, évi 6,5%, kamatadó" badge="Kamatadó" badgeColor="indigo">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>a)</strong> 600 000 · 1,065³ ≈ 724 770 Ft, a növekmény ≈ <strong>124 770 Ft</strong>.</li>
              <li><strong>b)</strong> Az adó a kamat 15%-a: 0,15 · 124 770 ≈ 18 715 Ft; kézhez: 600 000 + 0,85 · 124 770 ≈ <strong>706 054 Ft</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="3. Hány %-os kamat mellett nő 10 év alatt…" badge="10. gyök" badgeColor="violet">
            <TheoryTable
              headers={['Cél', 'Szorzó', 'Kamatláb']}
              rows={[
                ['másfélszeres', '¹⁰√1,5 ≈ 1,0414', '≈ 4,14%'],
                ['kétszeres', '¹⁰√2 ≈ 1,0718', '≈ 7,18%'],
                ['háromszoros', '¹⁰√3 ≈ 1,1161', '≈ 11,61%']
              ]}
            />
          </TheoryCard>
          <TheoryCard title="4. Tóth úr autói" badge="Értékcsökkenés" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>a)</strong> 3,5 M · 0,8³ = 1 792 000 Ft marad, a veszteség <strong>1 708 000 Ft</strong>.</li>
              <li><strong>b)</strong> 2,5 M · 0,88³ = 1 703 680 Ft marad, a veszteség <strong>796 320 Ft</strong>.</li>
              <li><strong>c)</strong> 4 éves: 3 évig ×0,8, majd 1 évig ×0,88: X · 0,8³ · 0,88 = 2 500 000 ⇒ X ≈ <strong>5 548 651 Ft</strong> (≈ 5,55 millió).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="5. Érettségi feladat (2011)" badge="5. gyök" badgeColor="orange">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>2 152 000 · x⁵ = 900 000 ⇒ x = <R n={5}>900 000 / 2 152 000</R> ≈ 0,84.</li>
              <li>Az éves csökkenés tehát <strong>16%</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Házi feladatok" badge="Ellenőrzés" badgeColor="slate">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>HF 1.</strong> a) 1,5 M · 1,18⁵ ≈ 3 431 637 Ft; b) <R n={5}>2</R> ≈ 1,1487 ⇒ legalább ≈ 14,87%; c) 1,18⁶ ≈ 2,70 &lt; 3 &lt; 3,19 ≈ 1,18⁷ ⇒ 7 év.</li>
              <li><strong>HF 2.</strong> a) 1,075⁹ ≈ 1,917, 1,075¹⁰ ≈ 2,061 ⇒ 10 év; b) 16% adóval 1 + 0,84 · (1,075ⁿ − 1) ≥ 2 ⇒ 1,075ⁿ ≥ 2,19 ⇒ 11 év.</li>
              <li><strong>HF 3.</strong> Nadrág (heti +5%): lásd a táblázatot.</li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryTable
          headers={['Hét', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50']}
          rows={[
            ['Ennyiszeres (1,05ⁿ)', '1,276', '1,629', '2,079', '2,653', '3,386', '4,322', '5,516', '7,040', '8,985', '11,467'],
            ['Ennyivel nőtt (Ft)', '276', '629', '1079', '1653', '2386', '3322', '4516', '6040', '7985', '10 467']
          ]}
        />
        <FinancialCalcDepreciationSvg />
      </TheorySection>

      {/* 5. Csapda */}
      <TheorySection title="5. Tipikus hiba: a százalékok nem adódnak össze" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Ötször 6% nem 30%, és 10 év alatt 6%-kal nem duplázódik"
          wrong="1,06⁵ helyett 1 + 5 · 0,06 = 1,30 ⇒ 30%-os drágulás; 10 · 6% = 60%"
          wrongExplanation="Kamatos kamatnál (és ismételt százalékos változásnál) minden lépés az ELŐZŐ értékből indul, ezért a szorzók szorzódnak, nem a százalékok adódnak össze. Az összeadás csak egyszerű kamatnál helyes."
          correct="1,06⁵ ≈ 1,338 ⇒ ≈ 33,8%; 1,06¹⁰ ≈ 1,791 ⇒ ≈ 79,1% növekedés"
          correctExplanation="Írd át a százalékos változást szorzóvá (p% növekedés: 1 + p/100; p% csökkenés: 1 − p/100), és hatványozz! Hasonlóan: +25%, majd −20% együtt 1,25 · 0,8 = 1, azaz nincs változás."
          tip="A kamatadót csak a kamatra (a növekményre) számítják, nem a teljes összegre!"
        />
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Interaktív Laboratórium I: Kamatoskamat-kalkulátor növekedési grafikonnal" badge="Labor" badgeColor="violet">
        <div className="bg-white border-2 border-violet-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Tőke A (Ft)</label>
                <input
                  type="number"
                  min="0"
                  step="10000"
                  value={capital}
                  onChange={(e) => setCapital(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full border border-slate-300 rounded-lg px-2 py-1 text-sm"
                  aria-label="tőke"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Évi kamatláb p: {fmt(rateP, 1)}%</label>
                <input
                  type="range"
                  min="0.5"
                  max="20"
                  step="0.5"
                  value={rateP}
                  onChange={(e) => setRateP(Number(e.target.value))}
                  className="w-full accent-violet-600"
                  aria-label="kamatláb"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Futamidő n: {years} év</label>
                <input
                  type="range"
                  min="1"
                  max="40"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full accent-pink-600"
                  aria-label="futamidő"
                />
              </div>
              <div className="flex flex-wrap gap-2 items-center text-xs">
                <span className="font-semibold text-slate-600">Kamatadó:</span>
                {[0, 15, 16].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTax(t)}
                    className={`px-3 py-1 rounded-lg font-bold ${tax === t ? 'bg-violet-600 text-white' : 'bg-violet-100 text-violet-800 hover:bg-violet-200'}`}
                  >
                    {t}%
                  </button>
                ))}
                <label className="ml-2 flex items-center gap-1 text-slate-600">
                  <input type="checkbox" checked={showSimple} onChange={(e) => setShowSimple(e.target.checked)} aria-label="egyszerű kamat" />
                  egyszerű kamat is
                </label>
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm text-slate-700 space-y-1">
                <div className="font-mono text-xs">
                  A{years === 1 ? '₁' : 'ₙ'} = {fmt(capital, 0)} · {fmt(q, 4)}
                  <sup>{years}</sup>
                </div>
                <div className="text-lg">
                  Felnövekedett összeg: <strong className="text-violet-700">{fmt(final, 0)} Ft</strong>
                </div>
                <div>Kamat (növekmény): {fmt(interest, 0)} Ft ({fmt((Math.pow(q, years) - 1) * 100, 2)}%)</div>
                {tax > 0 && (
                  <div>
                    Kamatadó ({tax}%): {fmt(taxAmount, 0)} Ft ⇒ kézhez: <strong>{fmt(net, 0)} Ft</strong>
                  </div>
                )}
                {showSimple && <div className="text-sky-700">Egyszerű kamattal csak: {fmt(simpleSeries[years], 0)} Ft</div>}
                <div className="text-xs text-slate-500">
                  Duplázódás (adó nélkül):{' '}
                  {doubleYear > 0 ? (
                    <>
                      {doubleYear} év alatt ({fmt(q, 4)}
                      <sup>{doubleYear}</sup> ≈ {fmt(Math.pow(q, doubleYear), 3)})
                    </>
                  ) : (
                    '–'
                  )}
                </div>
              </div>
            </div>
            <svg viewBox="0 0 540 280" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
              <line x1={L} y1={T + H} x2={L + W} y2={T + H} stroke="#64748b" strokeWidth="1.5" />
              <line x1={L} y1={T} x2={L} y2={T + H} stroke="#64748b" strokeWidth="1.5" />
              {[0.25, 0.5, 0.75, 1].map((f) => (
                <g key={f}>
                  <line x1={L} y1={by(maxV * f)} x2={L + W} y2={by(maxV * f)} stroke="#e2e8f0" />
                  <text x={L - 5} y={by(maxV * f) + 4} fontSize="9" textAnchor="end" fill="#64748b">
                    {fmt((maxV * f) / 1000, 0)}e
                  </text>
                </g>
              ))}
              <line x1={L} y1={by(2 * capital)} x2={L + W} y2={by(2 * capital)} stroke="#e11d48" strokeDasharray="6 4" strokeWidth="1.5" />
              <text x={L + W - 2} y={by(2 * capital) - 4} fontSize="10" textAnchor="end" fill="#e11d48" fontWeight="bold">
                2A
              </text>
              {series.map((v, k) => (
                <rect
                  key={k}
                  x={bx(k)}
                  y={by(v)}
                  width={bw}
                  height={T + H - by(v)}
                  fill={doubleYear > 0 && k >= doubleYear ? '#7c3aed' : '#c4b5fd'}
                  rx="2"
                />
              ))}
              {showSimple && (
                <polyline
                  points={simpleSeries.map((v, k) => `${(bx(k) + bw / 2).toFixed(1)},${by(v).toFixed(1)}`).join(' ')}
                  fill="none"
                  stroke="#0ea5e9"
                  strokeWidth="2.5"
                />
              )}
              {series.map((_, k) =>
                k % Math.max(1, Math.ceil((years + 1) / 10)) === 0 || k === years ? (
                  <text key={k} x={bx(k) + bw / 2} y={T + H + 14} fontSize="9" textAnchor="middle" fill="#475569">
                    {k}
                  </text>
                ) : null
              )}
              <text x={L + W / 2} y="275" fontSize="10" textAnchor="middle" fill="#475569">
                év — sötét oszlop: már legalább kétszeres; kék vonal: egyszerű kamat
              </text>
            </svg>
          </div>
          <TheoryCallout type="tip" title="Próbáld ki!">
            Állítsd be: 500 000 Ft, 6%, 10 év ⇒ 895 424 Ft. Ezután 7,2%-kal már 10 év alatt is eléred a 2A vonalat. Kapcsold be a 15%-os kamatadót, és 600 000 Ft, 6,5%, 3 év mellett a kézhez kapott összeg ≈ 706 054 Ft.
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Interaktív Laboratórium II: A hiányzó adat – kamatláb gyökvonással, futamidő próbálgatással" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            {LAB2_PRESETS.map((pr) => (
              <button
                key={pr.name}
                onClick={() => {
                  setP2(pr.p);
                  setM2(pr.m);
                  setN2(pr.n);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-100 text-purple-800 hover:bg-purple-200"
              >
                {pr.name}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Cél: hányszorosára változzon (m)</label>
              <input
                type="number"
                min="0.01"
                step="0.1"
                value={m2}
                onChange={(e) => setM2(Math.max(0.01, Number(e.target.value) || 0.01))}
                className="w-full border border-slate-300 rounded-lg px-2 py-1 text-sm"
                aria-label="szorzó cél"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Évek száma n (a kamatláb kereséséhez)</label>
              <input
                type="number"
                min="1"
                step="1"
                value={n2}
                onChange={(e) => setN2(Math.max(1, Math.round(Number(e.target.value) || 1)))}
                className="w-full border border-slate-300 rounded-lg px-2 py-1 text-sm"
                aria-label="évek száma"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Évi változás p (%) (a futamidő kereséséhez)</label>
              <input
                type="number"
                min="-90"
                max="100"
                step="0.5"
                value={p2}
                onChange={(e) => setP2(Math.min(100, Math.max(-90, Number(e.target.value) || 0)))}
                className="w-full border border-slate-300 rounded-lg px-2 py-1 text-sm"
                aria-label="évi változás"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1">
              <div className="font-bold text-purple-800">A) Mekkora évi változás kell? (gyökvonás)</div>
              <div className="font-mono">
                (1 + p/100)<sup>{n2}</sup> = {fmt(m2, 3)}
              </div>
              <div className="font-mono">
                1 + p/100 = <R n={n2}>{fmt(m2, 3)}</R> ≈ {fmt(Math.pow(m2, 1 / n2), 5)}
              </div>
              <div className="text-base">
                p ≈{' '}
                <strong className={neededRate < 0 ? 'text-rose-700' : 'text-emerald-700'}>
                  {neededRate >= 0 ? '+' : ''}
                  {fmt(neededRate, 2)}%
                </strong>{' '}
                évente
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1">
              <div className="font-bold text-purple-800">B) Hány év kell? (próbálgatás)</div>
              {found > 0 ? (
                <>
                  {trial.map((t) => (
                    <div key={t.k} className={`font-mono text-xs ${t.k === found ? 'text-emerald-700 font-bold' : ''}`}>
                      {fmt(q2, 4)}
                      <sup>{t.k}</sup> ≈ {fmt(t.v, 4)} {t.k === found ? (growing ? '≥' : '≤') : growing ? '<' : '>'} {fmt(m2, 3)}
                    </div>
                  ))}
                  <div className="text-base">
                    Legalább <strong className="text-emerald-700">{found} év</strong> kell.
                  </div>
                </>
              ) : (
                <div className="text-rose-700 font-bold">
                  Ezzel a változással a cél soha nem érhető el (növekedéshez m &gt; 1 és p &gt; 0, csökkenéshez m &lt; 1 és p &lt; 0 kell).
                </div>
              )}
            </div>
          </div>
          <TheoryCallout type="success" title="Ellenőrizd a tankönyvi eredményeket!">
            m = 2, n = 10 ⇒ p ≈ 7,18%; m = 2, p = 6 ⇒ 12 év; m = 3, p = 18 ⇒ 7 év; m = 900/2152 ≈ 0,418, n = 5 ⇒ p ≈ −16%.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default FinancialCalcTheory;
