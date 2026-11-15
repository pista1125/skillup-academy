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
  PopulationThirdsSvg,
  RootPowerBridgeSvg,
  WaterLilyGrowthSvg,
  SemitoneOctaveSvg,
  RootCycleSvg
} from './RationalExponents1Figures';

/** Hatvány 1/n kitevővel: alap + felső indexben tört. */
const P: React.FC<{ b: React.ReactNode; e: React.ReactNode }> = ({ b, e }) => (
  <span className="whitespace-nowrap">
    {b}
    <sup className="text-[0.7em]">{e}</sup>
  </span>
);

const fmt = (x: number, d = 6) => {
  if (!Number.isFinite(x)) return '–';
  return Number(x.toFixed(d)).toString().replace('.', ',').replace('-', '−');
};

const parseNum = (s: string) => Number(s.trim().replace(',', '.').replace('−', '-'));

/** Ha a gyök „szép” (legfeljebb 4 tizedes jegy), visszaadja, egyébként null. */
const exactRoot = (a: number, n: number): number | null => {
  const r = Math.pow(a, 1 / n);
  for (let d = 0; d <= 4; d++) {
    const c = Math.round(r * 10 ** d) / 10 ** d;
    if (Math.abs(Math.pow(c, n) - a) < 1e-9 * Math.max(1, a)) return c;
  }
  return null;
};

type Preset = { name: string; start: number; factor: number; parts: number; unit: string; part: string; whole: string };
const PRESETS: Preset[] = [
  { name: 'Tavirózsák (3. feladat)', start: 8, factor: 1.3, parts: 7, unit: 'm²', part: 'nap', whole: '1 hét' },
  { name: 'Világnépesség (Bevezető)', start: 6.98, factor: 1.011, parts: 3, unit: 'milliárd fő', part: '1/3 év', whole: '1 év' },
  { name: 'Félhangok (4. feladat)', start: 1, factor: 2, parts: 12, unit: '× alaphang', part: 'félhang', whole: '1 oktáv' }
];

export const RationalExponents1Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: a^(1/n) számoló
  const [baseText, setBaseText] = useState<string>('32');
  const [n, setN] = useState<number>(5);
  const a = parseNum(baseText);
  const valid = Number.isFinite(a) && a >= 0 && baseText.trim() !== '';
  const root = valid ? Math.pow(a, 1 / n) : NaN;
  const exact = valid ? exactRoot(a, n) : null;

  // Labor II: egyenlő lépésekre bontott növekedés
  const [preset, setPreset] = useState<number>(0);
  const [factor, setFactor] = useState<number>(1.3);
  const [parts, setParts] = useState<number>(7);
  const [start, setStart] = useState<number>(8);
  const pr = PRESETS[preset];
  const k = Math.pow(factor, 1 / parts);
  const steps = Array.from({ length: parts + 1 }, (_, i) => start * Math.pow(k, i));
  const naiveStep = (factor - 1) / parts + 1;

  const applyPreset = (i: number) => {
    setPreset(i);
    setFactor(PRESETS[i].factor);
    setParts(PRESETS[i].parts);
    setStart(PRESETS[i].start);
  };

  return (
    <TheoryTemplate
      topicId="g11-hatvany-gyok-logaritmus"
      subtopicId="racionalis-szamok-kitevoben-1"
      title="3. Racionális számok a kitevőben I."
      subtitle="Mit jelent az 1/n kitevő? Ha egy folyamat egyenlő idők alatt ugyanannyiszorosára változik, a „harmad év” szorzója a köbgyök: a¹⁄ⁿ = ⁿ√a."
      badge="11. OSZTÁLY • III. HATVÁNY, GYÖK, LOGARITMUS • TANANYAG"
      themeColor="violet"
      pdfFilename="11_osztaly_racionalis_szamok_a_kitevoben_1_tananyag.pdf"
      practiceTitle="Készen állsz az 1/n kitevős hatványokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — AZ 1/n KITEVŐ AZ n-EDIK GYÖK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center font-mono text-base font-black text-violet-900 dark:text-violet-200">
              <P b="a" e="1/n" /> = ⁿ√a   (a ≥ 0, n &gt; 1 természetes szám)
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                Ezért (<P b="a" e="1/n" />)ⁿ = a: az <P b="a" e="1/n" /> az a nemnegatív szám, amelynek n-edik hatványa a.
              </li>
              <li>
                Az 1/n kitevő <strong>nem</strong> osztást jelent: <P b="16" e="1/2" /> = √16 = 4, és nem 16 : 2 = 8.
              </li>
              <li>Ha valami t idő alatt q-szorosára nő, akkor t/n idő alatt ⁿ√q-szorosára (egyenlő időközök, egyenlő szorzók).</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető + kidolgozott feladat */}
      <TheorySection title="1. Kidolgozott feladat: hányszoros a növekedés 1/3 év alatt?" badge="Tankönyv 88. o." badgeColor="violet">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              2011. június végén a Föld népessége kb. 6,98 milliárd fő volt, és évente kb. 1,1%-kal nőtt. Ha t a június vége óta eltelt
              egész évek száma, a népesség N(t) = 6,98 · 1,011<sup>t</sup> (milliárd fő). Június végétől október végéig csak 4 hónap, azaz{' '}
              <strong>1/3 év</strong> telik el. Mit jelent <P b="1,011" e="1/3" />?
            </p>
            <p>
              <strong>Megoldás.</strong> A modell szerint egyenlő időtartamok alatt ugyanannyiszorosára változik a népesség. Jelölje x, hányszorosára nő 1/3 év alatt.
              1/3 év múlva x-szeres, újabb 1/3 év múlva x · x-szeres, még 1/3 év múlva x · x · x-szeres. Egy év alatt háromszor telik el 1/3 év, így
            </p>
            <div className="p-3 rounded-xl bg-violet-50 border border-violet-200 font-mono text-center font-bold text-violet-900">
              x³ = 1,011  ⇒  x = ∛1,011 ≈ 1,0037
            </div>
            <p>
              <strong>Megjegyzés.</strong> 2011. október végén a népesség 6,98 · 1,0037 ≈ <strong>7,006 milliárd</strong> fő volt – ekkor lépte át a 7 milliárdot. A gondolatmenet értelmet ad a kifejezésnek:{' '}
              <P b="1,011" e="1/3" /> = ∛1,011 ≈ 1,0037, és (<P b="1,011" e="1/3" />)³ = 1,011.
            </p>
          </div>
          <PopulationThirdsSvg />
        </div>
      </TheorySection>

      {/* 2. Definíció */}
      <TheorySection title="2. Definíció: az 1/n kitevőjű hatvány" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3">
            <TheoryCard title="Definíció" badge="Tankönyv" badgeColor="violet">
              <p className="text-sm text-slate-700">
                Ha <strong>a nemnegatív valós szám</strong> és <strong>n 1-nél nagyobb természetes szám</strong>, akkor
              </p>
              <p className="text-center text-xl font-black text-violet-800 my-2">
                <P b="a" e="1/n" /> = ⁿ√a
              </p>
              <p className="text-sm text-slate-700">
                Például: <P b="32" e="1/5" /> = ⁵√32 = 2; <P b="6,25" e="1/2" /> = √6,25 = 2,5; <P b="0,0016" e="1/4" /> = ⁴√0,0016 = 0,2; <P b="0" e="1/10" /> = ¹⁰√0 = 0.
              </p>
            </TheoryCard>
            <TheoryCallout type="info" title="Miért éppen a gyök?">
              Azt szeretnénk, hogy a hatványozás azonossága, (aᵐ)ᵏ = aᵐ·ᵏ, tört kitevőre is érvényes maradjon. Akkor (<P b="a" e="1/n" />)ⁿ = <P b="a" e="(1/n)·n" /> = a¹ = a, vagyis{' '}
              <P b="a" e="1/n" /> csak olyan szám lehet, amelynek n-edik hatványa a – ez éppen ⁿ√a.
            </TheoryCallout>
            <TheoryCallout type="warning" title="Csak nemnegatív alap!">
              A definíció a ≥ 0 esetére szól. Bár ∛(−8) = −2 értelmes, a (−8)<sup>1/3</sup> hatványt nem értelmezzük – a következő órán látjuk, hogy negatív alapnál a törtkitevő bővítése ellentmondásra vezetne.
            </TheoryCallout>
          </div>
          <div className="space-y-4">
            <RootPowerBridgeSvg />
            <RootCycleSvg />
          </div>
        </div>
      </TheorySection>

      {/* 3. Tankönyvi feladatok */}
      <TheorySection title="3. Kidolgozott tankönyvi feladatok" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Számológép nélkül (1–2. feladat)" badge="Feladat" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>
                <P b="16" e="1/2" /> = 4; <P b="8" e="1/3" /> = 2; <P b="1000" e="1/3" /> = 10; <P b="81" e="1/2" /> = 9; <P b="81" e="1/4" /> = 3.
              </li>
              <li>
                <P b="4" e="1/2" /> = 2; <P b="0,04" e="1/2" /> = 0,2; <P b="1024" e="1/10" /> = 2; <P b="0,125" e="1/3" /> = 0,5.
              </li>
              <li>Gyökös alakban: √0,01 = 0,1; ∛0,008 = 0,2; √0,81 = 0,9; ⁴√0,0001 = 0,1; √1,21 = 1,1.</li>
              <li>
                Ugyanaz a szám kétféle alakban: <P b="81" e="1/4" /> = ⁴√81 = 3, mert 3⁴ = 81.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Hatvány hatványa (5. feladat)" badge="Feladat" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>
                (7⁴)<sup>1/2</sup> = √(7⁴) = 7² = <strong>49</strong>, mert (7²)² = 7⁴.
              </li>
              <li>
                (11⁶)<sup>1/3</sup> = ∛(11⁶) = 11² = <strong>121</strong>.
              </li>
              <li>
                (17²)<sup>1/2</sup> = <strong>17</strong>; (2³³)<sup>1/3</sup> = 2¹¹ = <strong>2048</strong>; (2¹²)<sup>1/4</sup> = 2³ = <strong>8</strong>.
              </li>
              <li>
                Általában: (aᵐ)<sup>1/n</sup> = a<sup>m/n</sup>, ha n osztója m-nek, akkor ez egész kitevős hatvány.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Tavirózsák (3. feladat)" badge="Modell" badgeColor="emerald">
            <WaterLilyGrowthSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>
                <strong>a)</strong> Kezdetben 8 m², hetente 1,3-szoros: F(h) = 8 · 1,3<sup>h</sup> (a B) összefüggés).
              </li>
              <li>
                <strong>b)</strong> Naponta k-szoros: 8; 8k; 8k²; …; 8k⁷ = 8 · 1,3.
              </li>
              <li>
                <strong>c)</strong> k⁷ = 1,3 ⇒ k = <P b="1,3" e="1/7" /> = ⁷√1,3 ≈ <strong>1,0382</strong>.
              </li>
              <li>
                <strong>d)</strong> A napi területek: 8; 8,31; 8,62; 8,95; 9,29; 9,65; 10,02; 10,4 (m²).
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Félhangok (4. feladat)" badge="Zene" badgeColor="rose">
            <SemitoneOctaveSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>
                <strong>a)</strong> Két szomszédos félhang hányadosa q, 12 félhang alatt kétszeres: q¹² = 2 ⇒ q = <P b="2" e="1/12" /> ≈ <strong>1,0595</strong>.
              </li>
              <li>
                <strong>b)</strong> A kvint 7 félhanggal magasabb: q⁷ = (<P b="2" e="1/12" />)⁷ ≈ <strong>1,498</strong> (közel 3/2).
              </li>
              <li>
                <strong>HF 3.</strong> A 3. felharmonikus 784 Hz ≈ 3 · 261,6 Hz. Mivel q¹⁹ ≈ 2,9966 ≈ 3, ez <strong>19 félhangnyira</strong> van az alaphangtól.
              </li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryTable
          headers={['Házi feladat', 'Számolás', 'Eredmény']}
          rows={[
            ['1. a)', '∛64, mert 4³ = 64', '4'],
            ['1. b)', '∛0,027, mert 0,3³ = 0,027', '0,3'],
            ['1. c)', '√(1/4)', '1/2'],
            ['1. d)', '(√10)⁴ = ((√10)²)²', '100'],
            ['1. f)', '⁵√1024, mert 4⁵ = 1024', '4'],
            ['2. b)', '2011. okt. 1. → 2013. jan. 1. = 1,25 év: 9982 · 0,998^1,25', '≈ 9957 ezer fő']
          ]}
        />
        <TheoryCallout type="tip" title="HF 2. a) – miért 9982 · 0,998ˣ?">
          Ha a népesség évente az előző évi 0,2%-ával csökken, akkor minden évben az előző évi 100% − 0,2% = 99,8%-a, vagyis 0,998-szorosa marad. x év alatt x-szer szorzunk 0,998-cal: 9982 · 0,998ˣ ezer fő.
        </TheoryCallout>
      </TheorySection>

      {/* 4. Csapda */}
      <TheorySection title="4. Tipikus hiba: az 1/n kitevő nem osztás" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Mennyi 16 az 1/2-ediken?"
          wrong="16^(1/2) = 16 : 2 = 8   vagy   16^(1/2) = 1/16^2"
          wrongExplanation="Az 1/2 kitevő nem felezést és nem reciprokot jelent. Ellenőrzés: 8² = 64 ≠ 16, tehát a 8 nem lehet a 16 „fele hatványa”."
          correct="16^(1/2) = √16 = 4"
          correctExplanation="Az 1/n kitevőjű hatvány az n-edik gyök: (16^(1/2))² = 16 kell, és 4² = 16. Ugyanígy 8^(1/3) = 2, mert 2³ = 8."
          tip="Ellenőrizz visszafelé: emeld az eredményt az n-edik hatványra – vissza kell kapnod az alapot!"
        />
      </TheorySection>

      {/* 5. Labor I */}
      <TheorySection title="5. Interaktív Laboratórium I: a¹⁄ⁿ = ⁿ√a számoló" badge="Labor" badgeColor="violet">
        <div className="bg-white border-2 border-violet-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">alap (a ≥ 0)</label>
              <input
                type="text"
                value={baseText}
                onChange={(e) => setBaseText(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-violet-200 font-mono"
                aria-label="alap"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">n (a kitevő 1/n): {n}</label>
              <input type="range" min="2" max="12" value={n} onChange={(e) => setN(Number(e.target.value))} className="w-full accent-violet-600" aria-label="n" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              ['32', 5],
              ['6,25', 2],
              ['0,0016', 4],
              ['1024', 10],
              ['1,011', 3],
              ['2', 12]
            ].map(([b, m]) => (
              <button
                key={`${b}-${m}`}
                onClick={() => {
                  setBaseText(String(b));
                  setN(Number(m));
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-violet-50 text-violet-800 hover:bg-violet-100"
              >
                {b}^(1/{m})
              </button>
            ))}
          </div>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-2">
            {!valid ? (
              <div className="font-bold text-rose-700">
                {baseText.trim() !== '' && Number.isFinite(a) && a < 0
                  ? 'Negatív alapra a törtkitevőjű hatványt nem értelmezzük!'
                  : 'Adj meg egy nemnegatív számot (tizedesvesszővel is lehet)!'}
              </div>
            ) : (
              <>
                <div className="text-lg">
                  <P b={baseText} e={`1/${n}`} /> = {n === 2 ? '√' : `${n}√`}
                  {baseText} {exact !== null ? '=' : '≈'} <strong className="text-violet-800">{fmt(exact ?? root)}</strong>
                </div>
                <div>
                  Ellenőrzés: ({fmt(exact ?? root)})<sup>{n}</sup> {exact !== null ? '=' : '≈'} {fmt(Math.pow(exact ?? root, n), 6)}
                  {exact !== null ? ' – pontos érték, számológép nélkül is kijön.' : ' – csak közelítő érték (irracionális vagy hosszú tizedes tört).'}
                </div>
                <div className="text-xs text-slate-500">
                  Rossz ötlet lenne {baseText} : {n} = {fmt(a / n)}, hiszen ennek {n}-edik hatványa {fmt(Math.pow(a / n, n), 4)}.
                </div>
              </>
            )}
          </div>
        </div>
      </TheorySection>

      {/* 6. Labor II */}
      <TheorySection title="6. Interaktív Laboratórium II: a növekedés felosztása egyenlő lépésekre" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p, i) => (
              <button
                key={p.name}
                onClick={() => applyPreset(i)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${preset === i ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'}`}
              >
                {p.name}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">kezdőérték: {fmt(start, 2)}</label>
              <input type="range" min="1" max="20" step="0.01" value={start} onChange={(e) => setStart(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="kezdőérték" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">teljes szorzó ({pr.whole} alatt): {fmt(factor, 3)}</label>
              <input type="range" min="1.001" max="3" step="0.001" value={factor} onChange={(e) => setFactor(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="teljes szorzó" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">egyenlő részek száma: {parts}</label>
              <input type="range" min="2" max="12" value={parts} onChange={(e) => setParts(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="részek száma" />
            </div>
          </div>
          <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4 text-sm text-emerald-900 space-y-1">
            <div>
              Egy lépés ({pr.part}) szorzója: k = <P b={fmt(factor, 3)} e={`1/${parts}`} /> = {parts}√{fmt(factor, 3)} ≈ <strong>{fmt(k, 5)}</strong>
            </div>
            <div>
              Ellenőrzés: k<sup>{parts}</sup> ≈ {fmt(Math.pow(k, parts), 5)} = a teljes szorzó.
            </div>
          </div>
          <div className="flex items-end gap-1 h-40 border-b-2 border-slate-400 px-2">
            {steps.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                <span className="text-[10px] font-bold text-emerald-800">{fmt(v, 2)}</span>
                <div
                  className={`w-full rounded-t ${i === 0 || i === parts ? 'bg-emerald-600' : 'bg-emerald-300'}`}
                  style={{ height: `${(v / steps[parts]) * 85}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-1 px-2 text-[10px] text-slate-500">
            {steps.map((_, i) => (
              <span key={i} className="flex-1 text-center">
                {i}.
              </span>
            ))}
          </div>
          <p className="text-xs text-slate-500">Mértékegység: {pr.unit}. Az oszlopok a kezdőérték · kⁱ értékeket mutatják.</p>
          <TheoryCallout type="warning" title="Miért nem lehet egyszerűen elosztani a növekedést?">
            Ha a {fmt((factor - 1) * 100, 1)}%-os növekedést {parts} egyenlő részre osztanánk (lépésenként {fmt(((factor - 1) / parts) * 100, 2)}%), akkor a szorzó {fmt(naiveStep, 5)} lenne, és{' '}
            {parts} lépés után {fmt(Math.pow(naiveStep, parts), 4)}-szeres növekedést kapnánk – a kamatos kamathoz hasonlóan „rámegy” a növekedés a növekedésre. A helyes lépésszorzó a {parts}-edik gyök.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default RationalExponents1Theory;
