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
  CoffeeCoolingSvg,
  PressureAltitudeSvg,
  LogBetweenIntegersSvg,
  InformationBitsSvg,
  NapierIdeaSvg
} from './LogPractice2Figures';

const fmt = (x: number, d = 2) => {
  if (!Number.isFinite(x)) return '–';
  return Number(x.toFixed(d)).toLocaleString('hu-HU', { maximumFractionDigits: d });
};
const parseNum = (s: string) => Number(s.trim().replace(',', '.').replace('−', '-'));

export const LogPractice2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: Newton-féle hűlés
  const [room, setRoom] = useState<number>(20);
  const [start, setStart] = useState<number>(80);
  const [qPct, setQPct] = useState<number>(87);
  const [t, setT] = useState<number>(15);
  const [target, setTarget] = useState<number>(21);
  const q = qPct / 100;
  const K0 = start - room;
  const Kt = K0 * Math.pow(q, t);
  const Tt = room + Kt;
  const halfT = Math.log10(0.5) / Math.log10(q);
  const reachable = target > room && target < start;
  const tTarget = reachable ? Math.log10((target - room) / K0) / Math.log10(q) : NaN;

  // Labor II: a^x = b megoldó
  const [aText, setAText] = useState<string>('1,065');
  const [bText, setBText] = useState<string>('3,45');
  const a = parseNum(aText);
  const b = parseNum(bText);
  const validA = Number.isFinite(a) && a > 0 && a !== 1;
  const validB = Number.isFinite(b) && b > 0;
  const x = validA && validB ? Math.log10(b) / Math.log10(a) : NaN;
  const lo = Math.floor(x);
  const isInt = Number.isFinite(x) && Math.abs(x - Math.round(x)) < 1e-9;

  return (
    <TheoryTemplate
      topicId="g11-hatvany-gyok-logaritmus"
      subtopicId="gyakorlas-logaritmus-2"
      title="15. Gyakorlás"
      subtitle="Logaritmus számológéppel és anélkül, exponenciális modellek a természetben: légnyomás, Newton-féle hűlés, információtartalom."
      badge="11. OSZTÁLY • III. HATVÁNY, GYÖK, LOGARITMUS • TANANYAG"
      themeColor="violet"
      pdfFilename="11_osztaly_gyakorlas_logaritmus_2_tananyag.pdf"
      practiceTitle="Készen állsz a logaritmusos gyakorlásra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — LOGARITMUS ÉS EXPONENCIÁLIS EGYENLET',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center font-mono text-base font-black text-violet-900 dark:text-violet-200">
              aˣ = b  ⇔  x = logₐ b = lg b / lg a   (a &gt; 0, a ≠ 1, b &gt; 0)
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Definíció:</strong> logₐ b az a kitevő, amelyre a-t emelve b-t kapunk: log₃ 9 = 2, lg 0,0001 = −4.
              </li>
              <li>
                <strong>Modell:</strong> f(t) = c · qᵗ; ha q &gt; 1, növekedés, ha 0 &lt; q &lt; 1, csökkenés. A felezési idő: q^T = 1/2 ⇒ T = lg 0,5 / lg q.
              </li>
              <li>
                <strong>Értelmezési tartomány:</strong> a logaritmus mögött álló kifejezés csak pozitív lehet.
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Összefoglaló */}
      <TheorySection title="1. Összefoglaló: amit a fejezetből eddig tudunk" badge="Áttekintés" badgeColor="indigo">
        <TheoryTable
          headers={['Fogalom', 'Szabály', 'Példa']}
          rows={[
            ['Logaritmus', 'logₐ b = x ⇔ aˣ = b', 'log₂ 64 = 6, mert 2⁶ = 64'],
            ['Tízes alapú logaritmus', 'lg b = log₁₀ b', 'lg 0,0001 = −4; lg ³√10 = 1/3'],
            ['Áttérés tízes alapra', 'logₐ b = lg b / lg a', 'log₁,₀₆₅ 3,45 = lg 3,45 / lg 1,065 ≈ 19,66'],
            ['A definícióból', 'a^(logₐ b) = b', '6^(log₆ 5) = 5'],
            ['Exponenciális egyenlőtlenség', 'a > 1: a kitevők között ugyanaz a reláció; 0 < a < 1: megfordul', '(1/2)ˣ < 8 ⇔ x > −3'],
            ['Felezési idő', 'q^T = 1/2', '0,87^T = 0,5 ⇒ T ≈ 4,98']
          ]}
        />
        <TheoryCallout type="info" title="A lecke célja">
          A 15. Gyakorlás a logaritmus fogalmát, a tízes alapú logaritmust és az exponenciális egyenletek, egyenlőtlenségek megoldását gyakoroltatja tankönyvi szöveges feladatokon: légnyomás, kávé hűlése, információtartalom.
        </TheoryCallout>
      </TheorySection>

      {/* 2. 1. feladat */}
      <TheorySection title="2. Kidolgozott feladat: számolás logaritmussal (1. feladat)" badge="Tankönyv 114. o." badgeColor="violet">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3">
            <TheoryCard title="a) Számológép nélkül: (log₃ 1/9)⁻¹" badge="Feladat" badgeColor="violet">
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                <li>1/9 = 3⁻², tehát log₃ 1/9 = −2.</li>
                <li>
                  (−2)⁻¹ = 1/(−2) = <strong>−1/2</strong>.
                </li>
              </ul>
            </TheoryCard>
            <TheoryCard title="b) lg ³√10 − (2/3) · lg 0,0001" badge="Feladat" badgeColor="sky">
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                <li>³√10 = 10<sup>1/3</sup>, ezért lg ³√10 = 1/3.</li>
                <li>0,0001 = 10⁻⁴, ezért lg 0,0001 = −4.</li>
                <li>
                  1/3 − (2/3) · (−4) = 1/3 + 8/3 = <strong>3</strong>.
                </li>
              </ul>
            </TheoryCard>
            <TheoryCard title="c) Két szomszédos egész közé: 1,065ᵏ = 3,45" badge="Feladat" badgeColor="emerald">
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                <li>k = log₁,₀₆₅ 3,45 = lg 3,45 / lg 1,065 ≈ 19,66.</li>
                <li>
                  Ellenőrzés: 1,065¹⁹ ≈ 3,31 és 1,065²⁰ ≈ 3,52, tehát <strong>19 &lt; k &lt; 20</strong>.
                </li>
              </ul>
            </TheoryCard>
          </div>
          <LogBetweenIntegersSvg />
        </div>
      </TheorySection>

      {/* 3. Légnyomás */}
      <TheorySection title="3. Kidolgozott feladat: a légnyomás és a magasság (2. feladat)" badge="Tankönyv 114. o." badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A tengerszint felett x km magasságban a légnyomás p(x) = 1,013 · 10⁵ · 1,133⁻ˣ (Pa).
            </p>
            <TheoryTable
              headers={['Hely', 'Magasság', 'p(x) ≈']}
              rows={[
                ['Kékestető', '1,014 km', '89 250 Pa'],
                ['Mont Blanc', '4,806 km', '55 590 Pa'],
                ['Csomolungma', '8,849 km', '33 550 Pa']
              ]}
            />
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>b)</strong> 1,013 · 10⁵ · 1,133⁻ˣ = 80 000 ⇒ 1,133ˣ = 101 300 / 80 000 ≈ 1,266 ⇒ x = lg 1,266 / lg 1,133 ≈ <strong>1,89 km</strong>.
              </li>
              <li>
                <strong>c)</strong> „Felezési magasság”: 1,133⁻ʰ = 1/2 ⇒ 1,133ʰ = 2 ⇒ h = lg 2 / lg 1,133 ≈ <strong>5,55 km</strong>.
              </li>
            </ul>
          </div>
          <PressureAltitudeSvg />
        </div>
      </TheorySection>

      {/* 4. Newton */}
      <TheorySection title="4. Kidolgozott feladat: a kávé hűlése (3. feladat)" badge="Tankönyv 114. o." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              A 20 °C-os szobában a kezdetben 80 °C-os kávé és a szoba hőmérséklet-különbsége K(t) = 60 · 0,87ᵗ (t percben).
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>a)</strong> K(15) = 60 · 0,87¹⁵ ≈ <strong>7,4 °C</strong>.
              </li>
              <li>
                <strong>b)</strong> A kávé hőmérséklete: 20 + 7,4 ≈ <strong>27,4 °C</strong>.
              </li>
              <li>
                <strong>c)</strong> 0,87ᵗ = 1/2 ⇒ t = lg 0,5 / lg 0,87 ≈ <strong>4,98 perc</strong> (kb. 5 perc).
              </li>
              <li>
                <strong>d)</strong> 5 perccel korábban t = −5: K(−5) = 60 · 0,87⁻⁵ ≈ 120,4, a kávé kb. <strong>140 °C</strong> lett volna – a modell ott már nem érvényes (a víz 100 °C-on forr)!
              </li>
              <li>
                <strong>e)</strong> 21 °C alá: K(t) &lt; 1 ⇒ 0,87ᵗ &lt; 1/60. Mivel az alap 1-nél kisebb, t &gt; lg(1/60) / lg 0,87 ≈ 29,4, tehát kb. <strong>30 perc</strong> múlva.
              </li>
            </ul>
          </div>
          <CoffeeCoolingSvg />
        </div>
      </TheorySection>

      {/* 5. Információ */}
      <TheorySection title="5. Kidolgozott feladat: az információ mérése (4. feladat)" badge="Tankönyv 114. o." badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              Egy p valószínűségű esemény információtartalma (Shannon): <strong>I = −log₂ p</strong>. Egy N elemű jelkészletből kirakott n hosszú jelsorozat információértéke (Hartley): <strong>H = n · log₂ N</strong>.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>a)</strong> p = 1/8: I = −log₂ (1/8) = <strong>3 bit</strong>; p = 3/7: I = −lg(3/7) / lg 2 ≈ <strong>1,22 bit</strong>.
              </li>
              <li>
                <strong>b)</strong> 24 betűs ábécé, 10 karakter: H = 10 · log₂ 24 ≈ <strong>45,85 bit</strong>.
              </li>
              <li>
                <strong>c)</strong> 4 jegyű PIN-kód: H = 4 · log₂ 10 ≈ <strong>13,29 bit</strong>.
              </li>
            </ul>
          </div>
          <InformationBitsSvg />
        </div>
      </TheorySection>

      {/* 6. Házi feladat */}
      <TheorySection title="6. Házi feladatok (érettségi típus)" badge="Mintapéldák" badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="1. a) és c)" badge="Feladat" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>log₂ 64 · (log₄ 8 − log₈ 4) = 6 · (3/2 − 2/3) = 6 · 5/6 = <strong>5</strong>.</li>
              <li>2,4ˣ = 5,76 = 2,4² ⇒ <strong>x = 2</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="2. (Érettségi, 2011) Kamatos kamat" badge="Feladat" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>2000 · 1,06ⁿ = 4024 ⇒ 1,06ⁿ = 2,012 ⇒ n = lg 2,012 / lg 1,06 ≈ 11,998.</li>
              <li>
                Ellenőrzés: 2000 · 1,06¹¹ ≈ 3797 €, 2000 · 1,06¹² ≈ 4024,4 €, tehát <strong>12 teljes év</strong> kell.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="3. Egyenletek, egyenlőtlenség" badge="Feladat" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>3ˣ⁺¹ = 81 = 3⁴ ⇒ x + 1 = 4 ⇒ <strong>x = 3</strong>.</li>
              <li>4³ˣ⁻¹ = 0,5 ⇒ 2⁶ˣ⁻² = 2⁻¹ ⇒ 6x − 2 = −1 ⇒ <strong>x = 1/6</strong>.</li>
              <li>
                (7/8)⁵ˣ⁻⁴ &lt; 8/7 = (7/8)⁻¹; az alap 1-nél kisebb, ezért 5x − 4 &gt; −1 ⇒ <strong>x &gt; 3/5</strong>.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="4. Értelmezési tartomány" badge="Feladat" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>log₁/₃ (2 − x): 2 − x &gt; 0 ⇒ <strong>x &lt; 2</strong>.</li>
              <li>log₇ (3x + 16): 3x + 16 &gt; 0 ⇒ <strong>x &gt; −16/3</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 7. Csapda */}
      <TheorySection title="7. Tipikus hiba: 1-nél kisebb alap az egyenlőtlenségben" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Mikor hűl a kávé 21 °C alá?"
          wrong="0,87ᵗ < 1/60 ⇒ t < lg(1/60) / lg 0,87 ≈ 29,4"
          wrongExplanation="Az x ↦ 0,87ˣ függvény szigorúan csökkenő, ezért a kitevőkre áttérve (vagy negatív lg 0,87-del osztva) a reláció megfordul. A rossz eredmény azt állítaná, hogy a kávé az első fél órában hidegebb 21 °C-nál."
          correct="0,87ᵗ < 1/60 ⇒ t > lg(1/60) / lg 0,87 ≈ 29,4"
          correctExplanation="lg 0,87 < 0, és negatív számmal osztva az egyenlőtlenség iránya megfordul. Kb. 30 perc múlva lesz a kávé 21 °C-nál hidegebb."
          tip="Mindig nézd meg az alapot: 0 < a < 1 esetén aˣ < aʸ ⇔ x > y."
        />
      </TheorySection>

      {/* 8. Labor I */}
      <TheorySection title="8. Interaktív Laboratórium I: Newton-féle hűlés" badge="Labor" badgeColor="violet">
        <div className="bg-white border-2 border-violet-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">szoba hőmérséklete: {room} °C</label>
              <input type="range" min="10" max="30" value={room} onChange={(e) => setRoom(Number(e.target.value))} className="w-full accent-violet-600" aria-label="szoba hőmérséklete" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">kezdeti hőmérséklet: {start} °C</label>
              <input type="range" min="40" max="95" value={start} onChange={(e) => setStart(Number(e.target.value))} className="w-full accent-fuchsia-600" aria-label="kezdeti hőmérséklet" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">percenkénti szorzó q = {fmt(q, 2)}</label>
              <input type="range" min="70" max="98" value={qPct} onChange={(e) => setQPct(Number(e.target.value))} className="w-full accent-teal-600" aria-label="szorzó" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">eltelt idő t = {t} perc</label>
              <input type="range" min="0" max="60" value={t} onChange={(e) => setT(Number(e.target.value))} className="w-full accent-amber-600" aria-label="eltelt idő" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">célhőmérséklet: {target} °C</label>
              <input type="range" min="11" max="94" value={target} onChange={(e) => setTarget(Number(e.target.value))} className="w-full accent-rose-600" aria-label="célhőmérséklet" />
            </div>
            <button
              onClick={() => {
                setRoom(20);
                setStart(80);
                setQPct(87);
                setT(15);
                setTarget(21);
              }}
              className="self-end px-3 py-2 rounded-lg text-xs font-bold bg-violet-50 text-violet-800 hover:bg-violet-100"
            >
              Tankönyvi adatok (20 °C, 80 °C, 0,87)
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="bg-violet-50 rounded-xl border border-violet-200 p-4 space-y-1">
              <div className="font-bold text-violet-800">A modell</div>
              <div>K(t) = {K0} · {fmt(q, 2)}ᵗ</div>
              <div>
                K({t}) ≈ <strong>{fmt(Kt)} °C</strong>, a kávé hőmérséklete ≈ <strong>{fmt(Tt)} °C</strong>
              </div>
              <div>
                felezési idő: T = lg 0,5 / lg {fmt(q, 2)} ≈ <strong>{fmt(halfT)} perc</strong>
              </div>
            </div>
            <div className="bg-rose-50 rounded-xl border border-rose-200 p-4 space-y-1">
              <div className="font-bold text-rose-800">Mikor hűl {target} °C alá?</div>
              {reachable ? (
                <>
                  <div>
                    {K0} · {fmt(q, 2)}ᵗ &lt; {target - room} ⇒ {fmt(q, 2)}ᵗ &lt; {fmt((target - room) / K0, 4)}
                  </div>
                  <div>
                    az alap 1-nél kisebb ⇒ t &gt; {fmt(tTarget)} perc, tehát kb. <strong>{Math.ceil(tTarget)} perc</strong> múlva
                  </div>
                </>
              ) : (
                <div className="font-bold">
                  A célhőmérsékletnek a szoba és a kezdeti hőmérséklet közé kell esnie (a kávé soha nem hűl a szoba hőmérséklete alá).
                </div>
              )}
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 9. Labor II */}
      <TheorySection title="9. Interaktív Laboratórium II: aˣ = b megoldó" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">alap a (a &gt; 0, a ≠ 1)</label>
              <input type="text" value={aText} onChange={(e) => setAText(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-emerald-200 font-mono" aria-label="alap" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">jobb oldal b (b &gt; 0)</label>
              <input type="text" value={bText} onChange={(e) => setBText(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-emerald-200 font-mono" aria-label="jobb oldal" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              ['1,065', '3,45'],
              ['2,4', '5,76'],
              ['1,133', '2'],
              ['0,87', '0,5'],
              ['1,06', '2,012'],
              ['2', '24']
            ].map(([aa, bb]) => (
              <button
                key={`${aa}-${bb}`}
                onClick={() => {
                  setAText(aa);
                  setBText(bb);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
              >
                {aa}ˣ = {bb}
              </button>
            ))}
          </div>
          {!validA || !validB ? (
            <div className="bg-rose-50 rounded-xl border border-rose-200 p-4 text-sm font-bold text-rose-700">
              Az alap legyen pozitív és 1-től különböző, a jobb oldal pedig pozitív szám!
            </div>
          ) : (
            <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4 space-y-1 text-sm">
              <div>
                x = log<sub>{aText}</sub> {bText} = lg {bText} / lg {aText} = {fmt(Math.log10(b), 4)} / {fmt(Math.log10(a), 4)}
              </div>
              <div className="text-lg">
                x {isInt ? '=' : '≈'} <strong className="text-emerald-800">{fmt(x, 4)}</strong>
              </div>
              {!isInt && (
                <div>
                  Szomszédos egészek: <strong>{lo}</strong> &lt; x &lt; <strong>{lo + 1}</strong> (ellenőrzés: {aText}^{lo} ≈ {fmt(Math.pow(a, lo), 4)}, {aText}^{lo + 1} ≈ {fmt(Math.pow(a, lo + 1), 4)})
                </div>
              )}
            </div>
          )}
          <TheoryCallout type="tip" title="Ellenőrizd behelyettesítéssel!">
            A logaritmussal kapott közelítő eredményt mindig érdemes visszahelyettesíteni: így kiderül, melyik egészre kell kerekíteni (pl. a kamatos kamatnál a „teljes évek” száma felfelé kerekítendő).
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 10. Ráadás */}
      <TheorySection title="10. Ráadás: a logaritmustáblázat története" badge="Ráadás" badgeColor="slate">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              A XVI–XVII. században a navigációhoz szükséges csillagászati táblázatok rengeteg szorzást és osztást igényeltek. <strong>John Napier</strong> 1614-ben közzétette logaritmustáblázatát, 1617-ben <strong>Henry Briggs</strong> kiadta az első tízes alapú logaritmustáblázatot.
            </p>
            <p>
              A módszer a sokjegyű számok szorzását a táblázatból kikeresett logaritmusok összeadására vezette vissza. Tycho Brahe és Johannes Kepler is használta; a táblázatot csak a XX. század végén szorították ki az elektronikus számológépek.
            </p>
          </div>
          <NapierIdeaSvg />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default LogPractice2Theory;
