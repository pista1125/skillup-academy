import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import {
  CommonLogChangeBaseSvg,
  CommonLogGraphSvg,
  CommonLogHalfLifeSvg,
  CommonLogInterestSvg,
  CommonLogScaleSvg
} from './CommonLogarithmFigures';

/** logₐ b jelölése alsó indexszel. */
const L: React.FC<{ b: React.ReactNode; children: React.ReactNode }> = ({ b, children }) => (
  <span className="whitespace-nowrap">
    log<sub className="text-[0.7em]">{b}</sub> {children}
  </span>
);

/** Emeletes tört (pl. lg b / lg a) a szövegben. */
const Fr: React.FC<{ n: React.ReactNode; d: React.ReactNode }> = ({ n, d }) => (
  <span className="inline-flex flex-col items-center align-middle mx-1 text-[0.95em] leading-tight">
    <span className="px-1">{n}</span>
    <span className="px-1 border-t border-current">{d}</span>
  </span>
);

const fmt = (x: number, d = 4) => {
  if (!Number.isFinite(x)) return '–';
  const s = Number(x.toFixed(d)).toString();
  return s.replace('.', ',').replace('-', '−');
};

const parseNum = (s: string) => {
  const t = s.trim().replace(/,/g, '.').replace(/−/g, '-');
  if (t.includes('/')) {
    const [p, q] = t.split('/');
    return Number(p) / Number(q);
  }
  return t === '' ? NaN : Number(t);
};

const CB_PRESETS: { a: string; b: string }[] = [
  { a: '3', b: '20' },
  { a: '0,2', b: '15' },
  { a: '2', b: '5' },
  { a: '1,05', b: '0,2' },
  { a: '6', b: '703' },
  { a: '4,5', b: '21' },
  { a: '100', b: '50' },
  { a: '0,1', b: '2' }
];

/** c · qˣ = d alakú egyenletek a tankönyvből. */
const EQ_PRESETS: { name: string; c: string; q: string; d: string; v: string }[] = [
  { name: '1,15ˣ = 3 (kamat)', c: '1', q: '1,15', d: '3', v: 'x' },
  { name: '8,5 · 10ˣ = 212,5', c: '8,5', q: '10', d: '212,5', v: 'x' },
  { name: '4,55 · 1,2ˣ = 3,64', c: '4,55', q: '1,2', d: '3,64', v: 'x' },
  { name: '0,83ᵗ = 0,5 (gyógyszer)', c: '1', q: '0,83', d: '0,5', v: 't' },
  { name: '1,06ˣ = 2', c: '1', q: '1,06', d: '2', v: 'x' },
  { name: '105 · (1/1,24)ᵗ = 52,5', c: '105', q: '1/1,24', d: '52,5', v: 't' }
];

export const CommonLogarithmTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: áttérés tízes alapra
  const [aStr, setAStr] = useState<string>('3');
  const [bStr, setBStr] = useState<string>('20');
  const a = parseNum(aStr);
  const b = parseNum(bStr);
  const aOk = Number.isFinite(a) && a > 0 && a !== 1;
  const bOk = Number.isFinite(b) && b > 0;
  const lgA = aOk ? Math.log10(a) : NaN;
  const lgB = bOk ? Math.log10(b) : NaN;
  const res = aOk && bOk ? lgB / lgA : NaN;

  // Labor II: c · qˣ = d megoldása
  const [cStr, setCStr] = useState<string>('1');
  const [qStr, setQStr] = useState<string>('1,15');
  const [dStr, setDStr] = useState<string>('3');
  const [vName, setVName] = useState<string>('x');
  const c = parseNum(cStr);
  const q = parseNum(qStr);
  const dd = parseNum(dStr);
  const ratio = dd / c;
  const eqOk = Number.isFinite(c) && c !== 0 && Number.isFinite(q) && q > 0 && q !== 1 && Number.isFinite(dd) && ratio > 0;
  const sol = eqOk ? Math.log10(ratio) / Math.log10(q) : NaN;
  const eqReason = !Number.isFinite(c) || !Number.isFinite(q) || !Number.isFinite(dd)
    ? 'Adj meg minden adatot számként (tizedesvessző és tört is jó)!'
    : c === 0
      ? 'c nem lehet 0.'
      : q <= 0 || q === 1
        ? 'Az alap (q) pozitív és 1-től különböző legyen.'
        : ratio <= 0
          ? `A d/c hányados nem pozitív, ezért nincs megoldás: ${qStr} minden hatványa pozitív.`
          : '';

  return (
    <TheoryTemplate
      topicId="g11-hatvany-gyok-logaritmus"
      subtopicId="tizes-alapu-logaritmus"
      title="11. A tízes alapú logaritmus használata"
      subtitle="lg b = log₁₀ b: számológéppel bármely pozitív szám tízes alapú logaritmusa megkapható, és vele bármely alapú logaritmus is: logₐ b = lg b : lg a. Exponenciális egyenletek megoldása."
      badge="11. OSZTÁLY • III. HATVÁNY, GYÖK, LOGARITMUS • TANANYAG"
      themeColor="violet"
      pdfFilename="11_osztaly_tizes_alapu_logaritmus_tananyag.pdf"
      practiceTitle="Készen állsz a tízes alapú logaritmus használatára?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — TÍZES ALAPÚ LOGARITMUS',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center">
              <span className="font-mono text-base font-black text-violet-900 dark:text-violet-200">
                lg b = <L b="10">b</L> &nbsp;&nbsp;|&nbsp;&nbsp; <L b="a">b</L> = <Fr n="lg b" d="lg a" />
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Minden pozitív szám felírható 10 hatványaként: b = 10<sup>lg b</sup> (pl. 4 ≈ 10<sup>0,60206</sup>).</li>
              <li>Számológépen: <span className="font-mono">log</span> vagy <span className="font-mono">lg</span> billentyű.</li>
              <li>Az a<sup>x</sup> = b egyenlet megoldása: x = <L b="a">b</L> = lg b : lg a (a &gt; 0, a ≠ 1, b &gt; 0).</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: minden pozitív szám a 10 hatványa" badge="Tankönyv 106. o." badgeColor="violet">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A tízes alapú exponenciális függvény értékkészlete a pozitív valós számok halmaza, ezért <strong>minden pozitív szám felírható a 10 hatványaként</strong>. A 4-hez
              a 4 tízes alapú logaritmusára, arra a kitevőre van szükség, amelyre a 10-et emelve 4-et kapunk: 4 = 10<sup><L b="10">4</L></sup>.
            </p>
            <p>
              Számológéppel: <span className="font-mono">log 4 =</span> ⇒ 0,60205999…, tehát <L b="10">4</L> ≈ 0,60206, hatványalakban 4 ≈ 10<sup>0,60206</sup>.
            </p>
            <TheoryCallout type="info" title="Jelölés">
              A gyakori használat miatt a <L b="10">b</L> helyett az <strong>lg b</strong> jelet használjuk. Például <L b="10">4</L> = lg 4 ≈ 0,60206.
            </TheoryCallout>
          </div>
          <CommonLogGraphSvg />
        </div>
      </TheorySection>

      {/* 2. 1. feladat */}
      <TheorySection title="2. Tízes alapú logaritmus számológéppel (1. feladat)" badge="4 tizedesjegy" badgeColor="sky">
        <TheoryTable
          headers={['k', '2', '572', '4933', '0,0092', '0,083', '0,836']}
          rows={[['lg k', '0,3010', '2,7574', '3,6931', '−2,0362', '−1,0809', '−0,0778']]}
        />
        <CommonLogScaleSvg />
        <TheoryCallout type="tip" title="Becslés a 10 hatványaival">
          100 &lt; 572 &lt; 1000 ⇒ 2 &lt; lg 572 &lt; 3; 0,01 &lt; 0,083 &lt; 0,1 ⇒ −2 &lt; lg 0,083 &lt; −1. Az 1-nél kisebb pozitív számok tízes alapú logaritmusa negatív.
        </TheoryCallout>
      </TheorySection>

      {/* 3. Kidolgozott feladat */}
      <TheorySection title="3. Kidolgozott feladat: hány év alatt háromszorozódik meg a tőke?" badge="Tankönyv 106–107. o." badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>Évi 15%-os kamatos kamattal gyarapodó tőke: ha a tőke A ≠ 0 és x év alatt háromszorosára nő, akkor A · 1,15<sup>x</sup> = 3 · A.</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Meg kell oldani az 1,15<sup>x</sup> = 3 egyenletet: x = <L b="1,15">3</L>.</li>
              <li>Írjuk fel az 1,15-öt és a 3-at a 10 hatványaként: 1,15 = 10<sup>lg 1,15</sup>, 3 = 10<sup>lg 3</sup>.</li>
              <li>Behelyettesítve: (10<sup>lg 1,15</sup>)<sup>x</sup> = 10<sup>lg 3</sup>, a hatvány hatványa azonossággal 10<sup>x · lg 1,15</sup> = 10<sup>lg 3</sup>.</li>
              <li>A 10-es alapú exponenciális függvény szigorúan monoton növekvő, ezért a kitevők egyenlők: x · lg 1,15 = lg 3.</li>
              <li>
                x = <Fr n="lg 3" d="lg 1,15" /> ≈ <strong>7,86</strong> ⇒ a tőke <strong>8 év alatt</strong> háromszorozódik meg.
              </li>
            </ol>
            <TheoryCallout type="success" title="Megjegyzés">
              A megoldásból adódik: <L b="1,15">3</L> = <Fr n="lg 3" d="lg 1,15" /> ≈ 7,86, vagyis 1,15<sup>7,86</sup> ≈ 3.
            </TheoryCallout>
          </div>
          <CommonLogInterestSvg />
        </div>
      </TheorySection>

      {/* 4. Elmélet */}
      <TheorySection title="4. Áttérés tízes alapú logaritmusra" badge="Elmélet" badgeColor="teal">
        <CommonLogChangeBaseSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TheoryCard title="Tétel" badge="logₐ b = lg b : lg a" badgeColor="violet">
            <p className="text-sm text-slate-700 leading-relaxed">
              Tetszőleges (pozitív, 1-től különböző) alapú logaritmust kiszámíthatunk tízes alapú logaritmussal: ha a és b pozitív valós számok, a ≠ 1, akkor
            </p>
            <p className="text-center text-base my-2">
              <L b="a">b</L> = <Fr n="lg b" d="lg a" />
            </p>
            <p className="text-xs text-slate-500">
              Indoklás (mint a kidolgozott feladatban): a<sup>x</sup> = b ⇒ 10<sup>x · lg a</sup> = 10<sup>lg b</sup> ⇒ x · lg a = lg b; mivel a ≠ 1, lg a ≠ 0, így oszthatunk vele.
            </p>
          </TheoryCard>
          <TheoryCard title="Példák" badge="Ellenőrzés hatványozással" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
              <li>
                <L b="3">20</L> = <Fr n="lg 20" d="lg 3" /> ≈ 2,7268, tehát 3<sup>2,7268</sup> ≈ 20.
              </li>
              <li>
                <L b="0,2">15</L> = <Fr n="lg 15" d="lg 0,2" /> ≈ −1,6826, tehát 0,2<sup>−1,6826</sup> ≈ 15.
              </li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Feladatok */}
      <TheorySection title="5. Feladatok megoldása" badge="Tankönyv 107. o." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Számológéppel, 2 tizedesre (2. feladat)" badge="lg b : lg a" badgeColor="sky">
            <TheoryTable
              headers={['Kifejezés', 'Számolás', 'Érték']}
              rows={[
                ['log₂ 5', 'lg 5 : lg 2', '≈ 2,32'],
                ['log₁,₀₅ 0,2', 'lg 0,2 : lg 1,05', '≈ −32,99'],
                ['log₆ 703', 'lg 703 : lg 6', '≈ 3,66'],
                ['log₄,₅ 21', 'lg 21 : lg 4,5', '≈ 2,02']
              ]}
            />
          </TheoryCard>
          <TheoryCard title="B) Számológép nélkül (3. feladat)" badge="Pontos érték" badgeColor="violet">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>a)</strong> <L b="5">125</L> = 3; <L b="25">5</L> = 1/2; <L b="1/5">5</L> = −1; <L b="1/5">25</L> = −2.</li>
              <li><strong>b)</strong> <L b="4">(1/64)</L> = −3; <L b="4">1</L> = 0; <L b="1/4">(1/64)</L> = 3; <L b="1/4">1</L> = 0.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) A lázcsillapító újra (4. feladat)" badge="0,83ᵗ = 0,5" badgeColor="indigo">
            <CommonLogHalfLifeSvg className="w-full h-auto mb-2" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>a)</strong> t = <L b="0,83">0,5</L>.</li>
              <li><strong>b)</strong> t = <Fr n="lg 0,5" d="lg 0,83" />.</li>
              <li><strong>c)</strong> t ≈ <strong>3,720</strong> óra – ugyanaz, mint a 9. leckében a táblázatos közelítéssel.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Egyenletek: egy hatvány a bal oldalon (5. feladat)" badge="Ezredre" badgeColor="orange">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>a)</strong> 8,5 · 10<sup>x</sup> = 212,5 ⇒ 10<sup>x</sup> = 25 ⇒ x = lg 25 ≈ <strong>1,398</strong>.</li>
              <li><strong>b)</strong> 4,55 · 1,2<sup>x</sup> = 3,64 ⇒ 1,2<sup>x</sup> = 0,8 ⇒ x = <Fr n="lg 0,8" d="lg 1,2" /> ≈ <strong>−1,224</strong>.</li>
              <li><strong>c)</strong> 4,2<sup>−2x</sup> = 5,3 ⇒ −2x = <Fr n="lg 5,3" d="lg 4,2" /> ⇒ x ≈ <strong>−0,581</strong>.</li>
              <li><strong>d)</strong> 6<sup>x+2</sup> = 30 ⇒ x + 2 = <Fr n="lg 30" d="lg 6" /> ⇒ x ≈ <strong>−0,102</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="E) Házi feladatok" badge="Ellenőrzés" badgeColor="slate">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>HF 1.</strong> <L b="100">50</L> ≈ 0,8495; <L b="0,1">2</L> ≈ −0,3010; <L b="5">8,7</L> ≈ 1,3441; lg 5 + lg 2 = 1,0000.</li>
              <li><strong>HF 2.</strong> 1,06<sup>x</sup> = 2 ⇒ x = <L b="1,06">2</L> = <Fr n="lg 2" d="lg 1,06" /> ≈ <strong>11,896</strong>.</li>
              <li><strong>HF 3.</strong> M(t) = 105 · 1,24<sup>−t</sup>: M(0) = <strong>105</strong>; 1,24<sup>−T</sup> = 0,5 ⇒ T = <Fr n="lg 2" d="lg 1,24" /> ≈ <strong>3,222</strong>.</li>
              <li><strong>HF 4.</strong> a) 10<sup>3x</sup> = 8,4 ⇒ x = lg 8,4 : 3 ≈ <strong>0,308</strong>; b) 2<sup>−x</sup> = 17 ⇒ x = −<Fr n="lg 17" d="lg 2" /> ≈ <strong>−4,087</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="F) Miért 8 év, és nem 7,86?" badge="Kerekítés" badgeColor="rose">
            <p className="text-sm text-slate-700 leading-relaxed">
              A kamatot évente írják jóvá: 7 év után 1,15<sup>7</sup> ≈ 2,66-szoros, 8 év után 1,15<sup>8</sup> ≈ 3,06-szoros a tőke. A 7,86 a matematikai megoldás, de a
              háromszoros értéket csak a 8. év végén éri el (lépi át) a tőke.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6. Csapda */}
      <TheorySection title="6. Tipikus hiba: lg b : lg a nem lg (b : a)" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Az áttérési képlet hányadosa két logaritmus hányadosa"
          wrong="log₃ 20 = lg (20 : 3) ≈ 0,8239, vagy log₃ 20 = lg 20 − lg 3 ≈ 0,8239, vagy log₃ 20 = lg 3 : lg 20 ≈ 0,3667"
          wrongExplanation="lg (20 : 3) = lg 20 − lg 3 egy harmadik, más mennyiség. A fordított hányados (lg 3 : lg 20) a log₂₀ 3 értéke."
          correct="log₃ 20 = lg 20 : lg 3 ≈ 1,3010 : 0,4771 ≈ 2,7268 – ellenőrzés: 3^{2,7268} ≈ 20"
          correctExplanation="A számlálóba az argumentum (b), a nevezőbe az alap (a) logaritmusa kerül. Mindig ellenőrizd hatványozással!"
          tip="Becsülj előre: 3² = 9 < 20 < 27 = 3³, ezért log₃ 20 2 és 3 közé esik – a 0,82 és a 0,37 biztosan rossz."
        />
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Interaktív Laboratórium I: Logaritmus bármely alapra – lg-gel" badge="Labor" badgeColor="violet">
        <div className="bg-white border-2 border-violet-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            {CB_PRESETS.map((p) => (
              <button
                key={p.a + p.b}
                onClick={() => {
                  setAStr(p.a);
                  setBStr(p.b);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-violet-100 text-violet-800 hover:bg-violet-200"
              >
                log<sub>{p.a}</sub> {p.b}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 max-w-md">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">alap a</label>
              <input value={aStr} onChange={(e) => setAStr(e.target.value)} className="w-full border border-slate-300 rounded-lg px-2 py-1 text-sm" aria-label="alap" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">argumentum b</label>
              <input value={bStr} onChange={(e) => setBStr(e.target.value)} className="w-full border border-slate-300 rounded-lg px-2 py-1 text-sm" aria-label="argumentum" />
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-2">
            {!aOk ? (
              <div className="text-rose-700 font-bold">Az alap pozitív és 1-től különböző szám legyen!</div>
            ) : !bOk ? (
              <div className="text-rose-700 font-bold">Az argumentum csak pozitív szám lehet!</div>
            ) : (
              <>
                <div>1. lépés (számológép): lg {bStr} ≈ {fmt(lgB, 4)}; lg {aStr} ≈ {fmt(lgA, 4)}</div>
                <div className="text-lg">
                  2. lépés: <L b={aStr}>{bStr}</L> = <Fr n={`lg ${bStr}`} d={`lg ${aStr}`} /> ≈ <strong className="text-violet-700">{fmt(res, 4)}</strong>
                </div>
                <div className="font-mono text-xs">
                  Ellenőrzés: {aStr}
                  <sup>{fmt(res, 4)}</sup> ≈ {fmt(Math.pow(a, res), 4)}
                </div>
                <div className="text-xs text-slate-500">
                  Becslés: {`${fmt(Math.floor(res), 0)} ≤ ${fmt(res, 2)} < ${fmt(Math.floor(res) + 1, 0)}`} – a
                  hatvány alapja {a > 1 ? '1-nél nagyobb' : '1-nél kisebb'}, az argumentum {b > 1 ? '1-nél nagyobb' : b === 1 ? '1' : '1-nél kisebb'}, ezért az eredmény{' '}
                  {res > 0 ? 'pozitív' : res === 0 ? '0' : 'negatív'}.
                </div>
              </>
            )}
          </div>
          <TheoryCallout type="tip" title="Figyeld meg!">
            Ha az alap és az argumentum is 1-nél nagyobb (vagy mindkettő 1-nél kisebb), a logaritmus pozitív; ha az egyik 1 fölött, a másik 1 alatt van, negatív (pl. log₀,₂ 15 ≈ −1,68).
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Interaktív Laboratórium II: Exponenciális egyenlet-megoldó" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <p className="text-sm text-slate-700">
            A c · q<sup>x</sup> = d alakú egyenletet két lépésben oldjuk meg: osztunk c-vel, hogy egy hatvány maradjon a bal oldalon, majd logaritmust veszünk.
          </p>
          <div className="flex flex-wrap gap-2">
            {EQ_PRESETS.map((p) => (
              <button
                key={p.name}
                onClick={() => {
                  setCStr(p.c);
                  setQStr(p.q);
                  setDStr(p.d);
                  setVName(p.v);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-100 text-purple-800 hover:bg-purple-200"
              >
                {p.name}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4 max-w-lg">
            {[
              { l: 'c (szorzó)', v: cStr, s: setCStr },
              { l: 'q (alap)', v: qStr, s: setQStr },
              { l: 'd (jobb oldal)', v: dStr, s: setDStr }
            ].map((f) => (
              <div key={f.l}>
                <label className="block text-xs font-semibold text-slate-600 mb-1">{f.l}</label>
                <input value={f.v} onChange={(e) => f.s(e.target.value)} className="w-full border border-slate-300 rounded-lg px-2 py-1 text-sm" aria-label={f.l} />
              </div>
            ))}
          </div>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-2">
            <div className="text-base">
              Egyenlet: {cStr} · {qStr}
              <sup>{vName}</sup> = {dStr}
            </div>
            {eqReason ? (
              <div className="text-rose-700 font-bold">{eqReason}</div>
            ) : (
              <>
                <div>
                  1. lépés: {qStr}
                  <sup>{vName}</sup> = {dStr} : {cStr} = {fmt(ratio, 6)}
                </div>
                <div>
                  2. lépés: {vName} = <L b={qStr}>{fmt(ratio, 6)}</L> = <Fr n={`lg ${fmt(ratio, 6)}`} d={`lg ${qStr}`} /> ≈{' '}
                  <Fr n={fmt(Math.log10(ratio), 5)} d={fmt(Math.log10(q), 5)} />
                </div>
                <div className="text-lg">
                  {vName} ≈ <strong className="text-purple-700">{fmt(sol, 3)}</strong>
                </div>
                <div className="font-mono text-xs">
                  Ellenőrzés: {cStr} · {qStr}
                  <sup>{fmt(sol, 3)}</sup> ≈ {fmt(c * Math.pow(q, sol), 4)}
                </div>
              </>
            )}
          </div>
          <TheoryCallout type="success" title="Ellenőrizd a tankönyvi eredményeket!">
            1,15ˣ = 3 ⇒ ≈ 7,86; 8,5 · 10ˣ = 212,5 ⇒ ≈ 1,398; 4,55 · 1,2ˣ = 3,64 ⇒ ≈ −1,224; 0,83ᵗ = 0,5 ⇒ ≈ 3,720; 1,06ˣ = 2 ⇒ ≈ 11,896; a 105 · 1,24⁻ᵗ folyamat felezési ideje ≈ 3,222.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default CommonLogarithmTheory;
