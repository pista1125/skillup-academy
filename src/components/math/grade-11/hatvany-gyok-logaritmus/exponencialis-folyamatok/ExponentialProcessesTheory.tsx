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
  ExponentialProcessesBacteriaSvg,
  ExponentialProcessesBankSvg,
  ExponentialProcessesCitySvg,
  ExponentialProcessesGrowthDecaySvg,
  ExponentialProcessesPopulationSvg
} from './ExponentialProcessesFigures';

const fmt = (x: number, d = 3) => {
  if (!Number.isFinite(x)) return '–';
  const neg = x < 0;
  const s = Number(Math.abs(x).toFixed(d)).toString();
  const [i, f] = s.split('.');
  const int = i.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return (neg ? '−' : '') + (f ? `${int},${f}` : int);
};

const MODEL_PRESETS: { name: string; n0: number; n1: number; unit: string; tMin: number; tMax: number }[] = [
  { name: 'Baktériumok (3. feladat)', n0: 120, n1: 180, unit: 'millió', tMin: -3, tMax: 3 },
  { name: 'Csökkenő folyamat (HF 2.)', n0: 360000, n1: 345000, unit: '', tMin: 0, tMax: 6 },
  { name: 'Bankbetét 4%', n0: 250, n1: 260, unit: 'ezer Ft', tMin: 0, tMax: 20 },
  { name: 'Népesség −0,2%/év', n0: 10.2, n1: 10.1796, unit: 'millió fő', tMin: 0, tMax: 10 }
];

export const ExponentialProcessesTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: modell két mérésből
  const [n0, setN0] = useState<number>(120);
  const [n1, setN1] = useState<number>(180);
  const [unit, setUnit] = useState<string>('millió');
  const [tMin, setTMin] = useState<number>(-3);
  const [tMax, setTMax] = useState<number>(3);
  const [t, setT] = useState<number>(0.5);
  const k = n0 > 0 && n1 > 0 ? n1 / n0 : NaN;
  const N = (x: number) => n0 * Math.pow(k, x);
  const valid = Number.isFinite(k) && Math.abs(k - 1) > 1e-12;
  // kettőződési / feleződési idő numerikusan (felezéses kereséssel)
  let tChar = NaN;
  if (valid) {
    const target = k > 1 ? 2 : 0.5;
    let lo = 0;
    let hi = 1;
    while (Math.pow(k, hi) < target === k > 1 && hi < 1e6) hi *= 2;
    for (let i = 0; i < 60; i++) {
      const mid = (lo + hi) / 2;
      if (Math.pow(k, mid) < target === k > 1) lo = mid;
      else hi = mid;
    }
    tChar = (lo + hi) / 2;
  }
  const tc = Math.min(Math.max(t, tMin), tMax);
  const W = 420;
  const H = 210;
  const L = 60;
  const T = 15;
  const vals = valid ? Array.from({ length: 101 }, (_, i) => tMin + ((tMax - tMin) * i) / 100).map(N) : [];
  const vMax = valid ? Math.max(...vals) * 1.1 : 1;
  const sx = (x: number) => L + ((x - tMin) / (tMax - tMin)) * W;
  const sy = (v: number) => T + H - (v / vMax) * H;
  const path = valid
    ? vals.map((v, i) => `${i === 0 ? 'M' : 'L'} ${sx(tMin + ((tMax - tMin) * i) / 100).toFixed(1)} ${sy(v).toFixed(1)}`).join(' ')
    : '';

  // Labor II: exponenciális vs. lineáris (HF 3.)
  const [rate, setRate] = useState<number>(2.6);
  const [threshold, setThreshold] = useState<number>(400);
  const kc = 1 + rate / 100;
  const E = (x: number) => 20 * Math.pow(kc, x);
  const slope = (E(100) - 20) / 100;
  const Lin = (x: number) => 20 + slope * x;
  let reachE = -1;
  for (let x = 0; x <= 2000; x++) {
    if (E(x) >= threshold) {
      reachE = x;
      break;
    }
  }
  const reachL = slope > 0 ? Math.ceil((threshold - 20) / slope) : -1;
  const cMax = Math.max(E(100), threshold) * 1.1;
  const cx = (x: number) => 50 + x * 4;
  const cy = (v: number) => 220 - (v / cMax) * 200;

  return (
    <TheoryTemplate
      topicId="g11-hatvany-gyok-logaritmus"
      subtopicId="exponencialis-folyamatok"
      title="8. Exponenciális folyamatok"
      subtitle="Időben lejátszódó folyamatok leírása a t ↦ N₀ · kᵗ függvénnyel: kezdeti érték, növekedési tényező, exponenciális növekedés és csökkenés – bankbetét, baktériumok, népesség, városok."
      badge="11. OSZTÁLY • III. HATVÁNY, GYÖK, LOGARITMUS • TANANYAG"
      themeColor="violet"
      pdfFilename="11_osztaly_exponencialis_folyamatok_tananyag.pdf"
      practiceTitle="Készen állsz az exponenciális folyamatos feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — EXPONENCIÁLIS VÁLTOZÁS',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center">
              <span className="font-mono text-base font-black text-violet-900 dark:text-violet-200">t ↦ N₀ · kᵗ (N₀ &gt; 0, k &gt; 0, k ≠ 1)</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li><strong>N₀</strong> a kezdeti érték (a t = 0 helyen felvett érték); <strong>k</strong> a növekedési tényező: egységnyi idő alatt k-szorosára változik a mennyiség.</li>
              <li><strong>k &gt; 1:</strong> exponenciális növekedés; <strong>0 &lt; k &lt; 1:</strong> exponenciális csökkenés.</li>
              <li>Átírás: b<sup>c·t</sup> = (b<sup>c</sup>)ᵗ, tehát k = b<sup>c</sup>; pl. 1,25⁻ᵗ = 0,8ᵗ, 4<sup>2t</sup> = 16ᵗ.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: a pénz „az idő függvényében”" badge="Tankönyv 98. o." badgeColor="violet">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Az időben lejátszódó folyamatok matematikai leírásakor általában olyan függvényeket használunk, amelyek értelmezési tartománya a folyamat közben eltelt idő
              mérőszámait tartalmazza.
            </p>
            <p>
              Ha a bankba tett 250 ezer forint évi 4%-os kamatos kamattal gyarapszik, akkor t év múlva <strong>250 · 1,04ᵗ</strong> ezer forint lesz a számlán. A t ↦ 250 · 1,04ᵗ
              függvény értelmezési tartománya a természetes számok halmazának egy részhalmaza.
            </p>
            <p>
              Mivel a kiindulási alap az x ↦ 1,04ˣ <strong>növekedő exponenciális függvény</strong>, azt mondjuk, hogy a bankba tett pénz az idő múlásával{' '}
              <strong>exponenciálisan növekszik</strong> (ha a kamatfeltételek nem változnak). 5 év múlva ≈ 304,2 ezer, 10 év múlva ≈ 370,1 ezer Ft.
            </p>
          </div>
          <ExponentialProcessesBankSvg />
        </div>
      </TheorySection>

      {/* 2. Elmélet */}
      <TheorySection title="2. Elmélet: kezdeti érték és növekedési tényező" badge="Elmélet" badgeColor="teal">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            Ha egy mennyiség időbeli változását a <strong>t ↦ N₀ · kᵗ</strong> (N₀ és k pozitív valós számok, k ≠ 1, t valós szám) hozzárendelési szabályú függvény adja meg,
            akkor azt mondjuk, hogy a mennyiség <strong>exponenciálisan változik</strong> az időben. Ha a függvény növekedő, a mennyiség exponenciálisan <strong>növekszik</strong>,
            ha csökkenő, exponenciálisan <strong>csökken</strong>.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <TheoryCard title="N₀: kezdeti érték" badge="t = 0" badgeColor="sky">
            <p className="text-sm text-slate-700">A t = 0 helyen (pl. a vizsgálat kezdetén) felvett érték, mert N₀ · k⁰ = N₀.</p>
          </TheoryCard>
          <TheoryCard title="k: növekedési tényező" badge="szorzó" badgeColor="violet">
            <p className="text-sm text-slate-700">
              Megadja, hogy egységnyi idő elteltével hányszorosára változik a mennyiség. Ha 1 &lt; k, a függvény szigorúan monoton növekvő; ha 0 &lt; k &lt; 1, szigorúan monoton
              csökkenő.
            </p>
          </TheoryCard>
        </div>
        <ExponentialProcessesGrowthDecaySvg />
        <TheoryTable
          headers={['Hozzárendelés', 'Kezdeti érték', 'Növekedési tényező', 'Folyamat']}
          rows={[
            ['E(t) = 0,38 · 1,22ᵗ', '0,38', '1,22', 'exponenciálisan növekvő'],
            ['F(t) = 5,67 · 0,79ᵗ', '5,67', '0,79', 'exponenciálisan csökkenő'],
            ['G(t) = 3,8 · 1,25⁻ᵗ', '3,8', '1,25⁻¹ = 0,8', 'exponenciálisan csökkenő']
          ]}
        />
        <TheoryCallout type="info" title="Miért csökkenő a G(t)?">
          1,25⁻ᵗ = (1,25⁻¹)ᵗ = 0,8ᵗ, és 0 &lt; 0,8 &lt; 1. A negatív előjel a kitevőben „megfordítja” az alapot: k = 1/1,25.
        </TheoryCallout>
      </TheorySection>

      {/* 3. Feladatok */}
      <TheorySection title="3. Feladatok: növekvő vagy csökkenő? Mennyi N₀ és k?" badge="Tankönyv 98–99. o." badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="1. feladat" badge="k leolvasása" badgeColor="sky">
            <TheoryTable
              headers={['Hozzárendelés', 'Átírva', 'k', 'Folyamat']}
              rows={[
                ['t ↦ 4ᵗ', '4ᵗ', '4', 'növekvő'],
                ['t ↦ 4⁻ᵗ', '(1/4)ᵗ', '1/4', 'csökkenő'],
                ['t ↦ 4^{2t}', '16ᵗ', '16', 'növekvő'],
                ['t ↦ 4^{t/2}', '2ᵗ', '2', 'növekvő']
              ]}
            />
          </TheoryCard>
          <TheoryCard title="2. feladat" badge="N₀ és k" badgeColor="violet">
            <TheoryTable
              headers={['Hozzárendelés', 'N₀', 'k', 'Folyamat']}
              rows={[
                ['a) 6,2 · 1,15ᵗ', '6,2', '1,15', 'növekvő'],
                ['b) 6,2 · 1,15^{−2t}', '6,2', '1,15⁻² ≈ 0,756', 'csökkenő'],
                ['c) 10²³ · (1/2)^{4t}', '10²³', '1/16', 'csökkenő'],
                ['d) 6 · 10²³ · 2^{3t}', '6 · 10²³', '8', 'növekvő'],
                ['e) 3,8 · 0,8⁻ᵗ', '3,8', '1,25', 'növekvő'],
                ['f) 2,1 · 5^{−1,2t}', '2,1', '5^{−1,2} ≈ 0,145', 'csökkenő']
              ]}
            />
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Baktériumok és népesség */}
      <TheorySection title="4. Kidolgozott alkalmazások: baktériumok és népesség" badge="Tankönyv 99. o." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <TheoryCard title="3. Baktériumtenyészet" badge="Modellalkotás" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Egy 1 ml-es mintában egy adott időpontban ≈ 120 millió, egy óra múlva 180 millió baktérium volt.</li>
              <li><strong>a)</strong> N₀ = 120 millió, k = 180 / 120 = 1,5 ⇒ <strong>N(t) = 120 · 1,5ᵗ</strong> millió (t órában).</li>
              <li><strong>b)</strong> N(3) = 120 · 1,5³ = <strong>405 millió</strong>; N(0,5) = 120 · √1,5 ≈ <strong>147 millió</strong>.</li>
              <li><strong>c)</strong> 3 órával az első mérés előtt: N(−3) = 120 / 1,5³ ≈ <strong>35,6 millió</strong>.</li>
            </ul>
          </TheoryCard>
          <ExponentialProcessesBacteriaSvg />
          <TheoryCard title="4. Magyarország népessége 2001–2011 (évi −0,2%)" badge="Melyik helyes?" badgeColor="orange">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>A) hibás:</strong> a százalékok nem adódnak össze; 5 év alatt a szorzó 0,998⁵ ≈ 0,99004, ez nem pontosan 1%-os csökkenés.</li>
              <li><strong>B) helyes:</strong> minden évben az előző évi 0,998-szorosa, így 2006-ban a 2001-es adat 0,998⁵-szerese.</li>
              <li><strong>C) helyes:</strong> 2011 = 2006 · 0,998⁵ ⇒ 2006 = 2011 · 0,998⁻⁵.</li>
              <li><strong>D) hibás:</strong> az előző évi népesség a következő évinek 1/0,998 ≈ 1,002004-szerese, nem 100,2%-a; ezért a 2006-os adat 0,998⁻⁵-szöröse, nem 1,002⁵-szöröse a 2011-esnek.</li>
            </ul>
          </TheoryCard>
          <ExponentialProcessesPopulationSvg />
        </div>
      </TheorySection>

      {/* 5. Házi feladatok */}
      <TheorySection title="5. Házi feladatok megoldása" badge="Tankönyv 99. o." badgeColor="slate">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="HF 1. Kezdeti érték és növekedési tényező" badge="Átírás" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>a)</strong> 2,25 · 5⁻ᵗ: N₀ = 2,25, k = 0,2 – csökkenő.</li>
              <li><strong>b)</strong> 3 · 10²³ · 0,4⁻ᵗ: N₀ = 3 · 10²³, k = 2,5 – növekvő.</li>
              <li><strong>c)</strong> 0,0134 · 0,5<sup>2t</sup>: N₀ = 0,0134, k = 0,25 – csökkenő.</li>
              <li><strong>d)</strong> 1270 · 0,3<sup>t/2</sup>: N₀ = 1270, k = √0,3 ≈ 0,548 – csökkenő.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="HF 2. 360 000 → 345 000 egy óra alatt" badge="Csökkenés" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>a)</strong> k = 345 000 / 360 000 = 23/24 ≈ 0,9583 ⇒ N(t) = 360 000 · (23/24)ᵗ.</li>
              <li><strong>b)</strong> N(3,5) = 360 000 · (23/24)<sup>3,5</sup> ≈ <strong>310 178</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="HF 3. Egy város lakossága: t ↦ 20 · 1,026ᵗ (ezer fő)" badge="Exponenciális vs. lineáris" badgeColor="violet">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>a)</strong> 2000-ben (t = 100): 20 · 1,026¹⁰⁰ ≈ <strong>260,5 ezer fő</strong>.</li>
              <li><strong>c)</strong> Lineárisan ugyanoda: évente (260,5 − 20) / 100 ≈ 2,405 ezer fővel nőne.</li>
              <li><strong>e)</strong> 400 ezer fő: 1,026ᵗ = 20 ⇒ t ≈ 116,7, tehát kb. <strong>2017</strong> folyamán érné el.</li>
            </ul>
            <TheoryTable
              headers={['Év', '1920', '1940', '1960', '1980', '2000']}
              rows={[
                ['b) exponenciális', '≈ 33,4', '≈ 55,8', '≈ 93,3', '≈ 155,9', '≈ 260,5'],
                ['c) lineáris', '≈ 68,1', '≈ 116,2', '≈ 164,3', '≈ 212,4', '≈ 260,5']
              ]}
            />
          </TheoryCard>
          <ExponentialProcessesCitySvg />
        </div>
      </TheorySection>

      {/* 6. Csapda */}
      <TheorySection title="6. Tipikus hiba: a kitevő szorzója és a negatív kitevő" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A növekedési tényező nem mindig az, ami a hatvány alapjában áll"
          wrong="6,2 · 1,15^{−2t}: k = 1,15, növekvő; 4^{2t}: k = 4; a baktériumok 3 óra múlva 120 + 3 · 60 = 300 millióan vannak"
          wrongExplanation="A k-t csak t ↦ N₀ · kᵗ alakból lehet leolvasni. Ha a kitevő c · t, akkor b^{c·t} = (b^c)ᵗ, tehát k = b^c. Exponenciális folyamatnál egységnyi idő alatt mindig ugyanannyiszorosára (nem ugyanannyival!) változik a mennyiség."
          correct="1,15^{−2t} = (1,15⁻²)ᵗ ≈ 0,756ᵗ – csökkenő; 4^{2t} = 16ᵗ; N(3) = 120 · 1,5³ = 405 millió"
          correctExplanation="Mindig írd át N₀ · kᵗ alakba, és csak utána döntsd el, hogy k > 1 (növekvő) vagy 0 < k < 1 (csökkenő)."
          tip="Visszafelé az időben (negatív t) osztunk k-val: N(−1) = N₀ / k."
        />
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Interaktív Laboratórium I: Modell két mérésből – szaporodás és bomlás szimulátor" badge="Labor" badgeColor="violet">
        <div className="bg-white border-2 border-violet-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            {MODEL_PRESETS.map((p) => (
              <button
                key={p.name}
                onClick={() => {
                  setN0(p.n0);
                  setN1(p.n1);
                  setUnit(p.unit);
                  setTMin(p.tMin);
                  setTMax(p.tMax);
                  setT(Math.min(Math.max(t, p.tMin), p.tMax));
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-violet-100 text-violet-800 hover:bg-violet-200"
              >
                {p.name}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">1. mérés (t = 0): N₀</label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={n0}
                    onChange={(e) => setN0(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full border border-slate-300 rounded-lg px-2 py-1 text-sm"
                    aria-label="kezdeti érték"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">2. mérés (t = 1): N₁</label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={n1}
                    onChange={(e) => setN1(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full border border-slate-300 rounded-lg px-2 py-1 text-sm"
                    aria-label="második mérés"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  idő t: {fmt(tc, 2)} (tartomány: {tMin} … {tMax})
                </label>
                <input
                  type="range"
                  min={tMin}
                  max={tMax}
                  step="0.05"
                  value={tc}
                  onChange={(e) => setT(Number(e.target.value))}
                  className="w-full accent-pink-600"
                  aria-label="idő"
                />
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm text-slate-700 space-y-1">
                {valid ? (
                  <>
                    <div className="font-mono">
                      k = N₁ / N₀ = {fmt(n1, 4)} / {fmt(n0, 4)} ≈ {fmt(k, 5)}
                    </div>
                    <div className="font-mono">
                      N(t) = {fmt(n0, 4)} · {fmt(k, 5)}
                      <sup>t</sup>
                    </div>
                    <div className="text-lg">
                      N({fmt(tc, 2)}) ≈ <strong className="text-violet-700">{fmt(N(tc), 3)}</strong> {unit}
                    </div>
                    <div>
                      Folyamat: <strong className={k > 1 ? 'text-emerald-700' : 'text-sky-700'}>{k > 1 ? 'exponenciális növekedés (k > 1)' : 'exponenciális csökkenés (0 < k < 1)'}</strong>
                    </div>
                    <div className="text-xs">
                      {k > 1 ? 'Kettőződési idő' : 'Feleződési idő'} (számológéppel, próbálgatva): ≈ {fmt(tChar, 3)} időegység.
                    </div>
                  </>
                ) : (
                  <div className="text-rose-700 font-bold">Két különböző pozitív mérési értéket adj meg (k = 1 esetén nem exponenciális a folyamat)!</div>
                )}
              </div>
            </div>
            <svg viewBox="0 0 500 260" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
              <line x1={L} y1={T + H} x2={L + W} y2={T + H} stroke="#64748b" strokeWidth="1.5" />
              <line x1={L} y1={T} x2={L} y2={T + H} stroke="#64748b" strokeWidth="1.5" />
              {valid && tMin < 0 && tMax > 0 && <line x1={sx(0)} y1={T} x2={sx(0)} y2={T + H} stroke="#94a3b8" strokeDasharray="4 3" />}
              {[0.25, 0.5, 0.75, 1].map((f) => (
                <text key={f} x={L - 5} y={sy(vMax * f) + 4} fontSize="9" textAnchor="end" fill="#64748b">
                  {fmt(vMax * f, vMax > 100 ? 0 : 1)}
                </text>
              ))}
              {[0, 0.25, 0.5, 0.75, 1].map((f) => (
                <text key={f} x={L + f * W} y={T + H + 14} fontSize="9" textAnchor="middle" fill="#64748b">
                  {fmt(tMin + f * (tMax - tMin), 2)}
                </text>
              ))}
              <path d={path} fill="none" stroke={k > 1 ? '#059669' : '#0ea5e9'} strokeWidth="3" />
              {valid && (
                <g>
                  <circle cx={sx(0)} cy={sy(n0)} r="5" fill="#7c3aed" />
                  {tMax >= 1 && <circle cx={sx(1)} cy={sy(n1)} r="5" fill="#7c3aed" />}
                  <line x1={sx(tc)} y1={T + H} x2={sx(tc)} y2={sy(N(tc))} stroke="#be185d" strokeDasharray="3 3" />
                  <circle cx={sx(tc)} cy={sy(N(tc))} r="6" fill="#be185d" />
                </g>
              )}
              <text x={L + W / 2} y="254" fontSize="10" textAnchor="middle" fill="#475569">
                idő (t) — lila: a két mérés; rózsaszín: N(t)
              </text>
            </svg>
          </div>
          <TheoryCallout type="tip" title="Ellenőrizd a tankönyvi eredményeket!">
            Baktériumok: N(3) = 405, N(0,5) ≈ 146,97, N(−3) ≈ 35,56 millió. HF 2.: N(3,5) ≈ 310 178. A kettőződési idő a baktériumoknál ≈ 1,71 óra.
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Interaktív Laboratórium II: Exponenciális vagy lineáris növekedés?" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">évi növekedés: {fmt(rate, 1)}% (k = {fmt(kc, 3)})</label>
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full accent-purple-600"
                aria-label="évi növekedés"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">küszöb (ezer fő): {threshold}</label>
              <input
                type="range"
                min="50"
                max="1000"
                step="10"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="w-full accent-pink-600"
                aria-label="küszöb"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <svg viewBox="0 0 470 245" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
              <line x1="50" y1="220" x2="460" y2="220" stroke="#64748b" strokeWidth="1.5" />
              <line x1="50" y1="225" x2="50" y2="15" stroke="#64748b" strokeWidth="1.5" />
              {[0, 25, 50, 75, 100].map((x) => (
                <text key={x} x={cx(x)} y="236" fontSize="9" textAnchor="middle" fill="#64748b">
                  {1900 + x}
                </text>
              ))}
              {threshold <= cMax && (
                <>
                  <line x1="50" y1={cy(threshold)} x2="460" y2={cy(threshold)} stroke="#e11d48" strokeDasharray="5 4" />
                  <text x="456" y={cy(threshold) - 4} fontSize="10" textAnchor="end" fill="#e11d48">
                    {threshold} ezer
                  </text>
                </>
              )}
              <path d={`M ${cx(0)} ${cy(20)} L ${cx(100)} ${cy(Lin(100))}`} stroke="#0ea5e9" strokeWidth="2.5" />
              <path
                d={Array.from({ length: 101 }, (_, x) => `${x === 0 ? 'M' : 'L'} ${cx(x).toFixed(1)} ${cy(E(x)).toFixed(1)}`).join(' ')}
                fill="none"
                stroke="#7c3aed"
                strokeWidth="3"
              />
              {[20, 40, 60, 80].map((x) => (
                <g key={x}>
                  <circle cx={cx(x)} cy={cy(E(x))} r="3.5" fill="#7c3aed" />
                  <circle cx={cx(x)} cy={cy(Lin(x))} r="3.5" fill="#0ea5e9" />
                </g>
              ))}
              <text x="60" y="28" fontSize="10" fill="#6d28d9" fontWeight="bold">
                lila: 20 · {fmt(kc, 3)}ᵗ
              </text>
              <text x="60" y="42" fontSize="10" fill="#0369a1" fontWeight="bold">
                kék: lineáris, 2000-ben ugyanoda ér
              </text>
            </svg>
            <div className="space-y-2">
              <TheoryTable
                headers={['Év', 'Exponenciális', 'Lineáris']}
                rows={[0, 20, 40, 60, 80, 100].map((x) => [String(1900 + x), fmt(E(x), 1), fmt(Lin(x), 1)])}
              />
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm text-slate-700 space-y-1">
                <div>
                  Lineárisan évente: <strong>{fmt(slope, 3)} ezer fő</strong>.
                </div>
                <div>
                  {threshold} ezer főt exponenciálisan: <strong className="text-violet-700">{reachE >= 0 ? `${1900 + reachE}-ben` : '–'}</strong>, lineárisan:{' '}
                  <strong className="text-sky-700">{reachL >= 0 ? `${1900 + reachL}-ben` : '–'}</strong> éri el.
                </div>
              </div>
            </div>
          </div>
          <TheoryCallout type="success" title="Mit látunk?">
            A két modell 1900-ban és 2000-ben ugyanazt adja, közben viszont a lineáris modell végig nagyobb. Később az exponenciális „elhúz”: 2,6%-kal a 400 ezer főt 2017-ben, a lineáris
            modell csak 2059-ben érné el.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ExponentialProcessesTheory;
