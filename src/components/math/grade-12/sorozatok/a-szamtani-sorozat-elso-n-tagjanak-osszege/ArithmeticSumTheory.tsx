import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { fmt, fmtInt, S_BLUE, S_RED, S_INK } from './seqKit';
import { PavingRowsSvg, GaussPairsSvg, ReverseSumSvg, CanPyramidSvg, StaircaseRectangleSvg } from './ArithmeticSumFigures';

const numIn = 'w-24 px-2 py-1 rounded-lg border border-slate-300 text-sm font-mono';

/** Élő „két lépcső” ábra: az előre és visszafelé írt tagok oszlopai. */
const TwoStairs: React.FC<{ vals: number[] }> = ({ vals }) => {
  const n = vals.length;
  const total = vals[0] + vals[n - 1];
  const W = 320;
  const H = 200;
  const bw = (W - 40) / n;
  const sc = (H - 40) / Math.max(total, 1e-9);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-md h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="1" y="1" width={W - 2} height={H - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
      {vals.map((v, i) => {
        const x = 20 + i * bw;
        const rev = vals[n - 1 - i];
        return (
          <g key={i}>
            <rect x={x + 1} y={H - 20 - v * sc} width={bw - 2} height={v * sc} fill="#bfdbfe" stroke={S_BLUE} strokeWidth="0.8" />
            <rect x={x + 1} y={H - 20 - total * sc} width={bw - 2} height={rev * sc} fill="#fecaca" stroke={S_RED} strokeWidth="0.8" strokeDasharray="3 2" />
          </g>
        );
      })}
      <line x1="16" x2={W - 16} y1={H - 20} y2={H - 20} stroke={S_INK} />
      <text x={W / 2} y={H - 6} fontSize="10" textAnchor="middle" fill={S_INK}>
        téglalap: {n} · {fmt(total)} = {fmt(n * total)} ⇒ Sₙ = {fmt((n * total) / 2)}
      </text>
    </svg>
  );
};

export const ArithmeticSumTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [a1, setA1] = useState<number>(26);
  const [d, setD] = useState<number>(2);
  const [n, setN] = useState<number>(8);
  // Labor II
  const [b1, setB1] = useState<number>(1);
  const [e, setE] = useState<number>(1);
  const [target, setTarget] = useState<number>(120);

  const vals = useMemo(() => Array.from({ length: n }, (_, i) => a1 + i * d), [a1, d, n]);
  const an = vals[n - 1];
  const sum1 = ((a1 + an) / 2) * n;
  const sum2 = ((2 * a1 + (n - 1) * d) / 2) * n;
  const allPos = vals.every((v) => v >= 0);

  const search = useMemo(() => {
    const rows: { n: number; a: number; s: number }[] = [];
    let s = 0;
    let found: number | null = null;
    for (let k = 1; k <= 2000; k++) {
      const a = b1 + (k - 1) * e;
      s += a;
      if (k <= 400) rows.push({ n: k, a, s });
      if (found === null && Math.abs(s - target) < 1e-9) {
        found = k;
        break;
      }
      if (found === null && ((e >= 0 && b1 >= 0 && s > target) || k === 2000)) break;
    }
    const exceed = rows.find((r) => r.s >= target);
    return { found, exceed, last: rows.slice(-6) };
  }, [b1, e, target]);

  return (
    <TheoryTemplate
      topicId="g12-sorozatok"
      subtopicId="a-szamtani-sorozat-elso-n-tagjanak-osszege"
      title="4. A számtani sorozat első n tagjának összege"
      subtitle="„Fogunk kettőt, és elengedünk egyet”: a díszkövektől a kis Gauss trükkjéig."
      badge="12. OSZTÁLY • II. SOROZATOK • TANANYAG"
      themeColor="indigo"
      pdfFilename="12_osztaly_szamtani_sorozat_osszege_tananyag.pdf"
      practiceTitle="Készen állsz az összegképletes feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — Sₙ',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-center space-y-1">
              <div className="font-mono text-base font-black text-indigo-900 dark:text-indigo-200">Sₙ = (a₁ + aₙ)/2 · n</div>
              <div className="font-mono text-base font-black text-indigo-900 dark:text-indigo-200">Sₙ = (2a₁ + (n − 1)d)/2 · n</div>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Sₙ = a₁ + a₂ + … + aₙ, az első n tag összege.</li>
              <li>Az első képlethez n, a₁ és aₙ, a másodikhoz n, a₁ és d kell.</li>
              <li>Ötlet: az összeget előre és visszafelé is felírjuk, és összeadjuk.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Kidolgozott feladat: díszkövek a téren" badge="Tankönyv 58. o." badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p className="italic text-slate-500">– Hogyan lehet a legegyszerűbben megfogni egy oroszlánt? – Fogunk kettőt, és elengedünk egyet.</p>
            <p>
              Egy tér egyik részét <strong>50 sorban</strong> díszkővel borították. Az első sorba 26 követ tettek, minden következőbe 2-vel többet. Hány díszkő van a téren?
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>A sorok: 26; 28; 30; …; az 50. sorban 26 + 49 · 2 = 124 kő.</li>
              <li>Gondolatban egészítsük ki az 1. sort annyival, amennyi az utolsóban van, a 2.-at annyival, amennyi az utolsó előttiben, …</li>
              <li>Így minden sorban 26 + 124 = 150 kő lesz: összesen 50 · 150 = 7500.</li>
              <li>
                De minden követ kétszer számoltunk: a díszkövek száma (26 + 124) · 50 / 2 = <strong>3750</strong>.
              </li>
            </ol>
          </div>
          <PavingRowsSvg />
        </div>
      </TheorySection>

      <TheorySection title="2. Az összegképlet és bizonyítása" badge="Elmélet" badgeColor="blue">
        <TheoryTable
          headers={['Jelölés', 'Az első és az n-edik taggal', 'Az első taggal és a differenciával']}
          rows={[['Sₙ = a₁ + a₂ + a₃ + … + aₙ', 'Sₙ = (a₁ + aₙ)/2 · n  (n, a₁, aₙ ismeretében)', 'Sₙ = (2a₁ + (n − 1)d)/2 · n  (n, a₁, d ismeretében)']]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <ReverseSumSvg />
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>Bizonyítás.</strong> Írjuk fel az összeget az indexek növekvő, majd csökkenő sorrendjében:
            </p>
            <p className="font-mono text-xs">{'S_n = a_1 + a_2 + … + a_{n−1} + a_n'}</p>
            <p className="font-mono text-xs">{'S_n = a_n + a_{n−1} + … + a_2 + a_1'}</p>
            <p>
              Összeadva: 2Sₙ = (a₁ + aₙ) + (a₂ + aₙ₋₁) + … + (aₙ + a₁). A zárójelek egyenlők, hiszen a₂ d-vel nagyobb a₁-nél, aₙ₋₁ d-vel kisebb aₙ-nél; a₃ 2d-vel nagyobb, aₙ₋₂ 2d-vel kisebb; és így tovább.
            </p>
            <p>
              n darab zárójel van, tehát 2Sₙ = n(a₁ + aₙ), azaz <strong>Sₙ = (a₁ + aₙ)/2 · n</strong>. Ha aₙ = a₁ + (n − 1)d-t beírjuk, kapjuk a második alakot.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <StaircaseRectangleSvg />
          <TheoryCallout type="info" title="Ráadás: a kis Gauss">
            Carl Friedrich Gauss (1777–1855) kisdiákként pillanatok alatt összeadta a számokat 1-től 40-ig: 1 + 40 = 2 + 39 = … = 20 + 21 = 41, vagyis az összeg 41-nek a 20-szorosa, <strong>820</strong>.
            <GaussPairsSvg className="w-full h-auto mt-3" />
          </TheoryCallout>
        </div>
      </TheorySection>

      <TheorySection title="3. Megoldott feladatok a leckéből" badge="Feladatok" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Hiányzó adatok (1. feladat)" badge="1. feladat" badgeColor="sky">
            <TheoryTable
              headers={['a₁', 'd', 'n', 'aₙ', 'Sₙ']}
              rows={[
                ['129', '−10', '13', '9', '897'],
                ['6', '5,3', '21', '112', '1239'],
                ['74', '−1', '27', '48', '1647']
              ]}
            />
            <p className="text-xs text-slate-600 mt-2">Pl. a 2. sor: a₁ = 112 − 20 · 5,3 = 6, S₂₁ = (6 + 112)/2 · 21 = 1239.</p>
          </TheoryCard>
          <TheoryCard title="B) Szimmetria és páratlan számok" badge="2–4. feladat" badgeColor="purple">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>a₁ = −65, aₙ = 65 ⇒ Sₙ = 0 · n/2 = 0 minden n-re (n = 3, 8, 11, 27).</li>
              <li>
                (Érettségi, 2006) 55 egymást követő páratlan szám összege 3905: a középső (28.) 3905/55 = 71, így az első 71 − 54 = <strong>17</strong>, az 55. 71 + 54 = <strong>125</strong>.
              </li>
              <li>Az első n pozitív páratlan szám összege: (1 + (2n − 1))/2 · n = n² – ezt szemléltette a 2. lecke bevezetője.</li>
            </ul>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="C) Konzervgúla (5. feladat)" badge="5. feladat" badgeColor="emerald">
            <CanPyramidSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>5 láda · 24 = 120 konzerv. k(k + 1)/2 = 120 ⇒ k = 15: igen, a legalsó sorba 15 kerül.</li>
              <li>A gúla 15 · 12 = 180 cm magas.</li>
              <li>3 m-hez 300/12 = 25 sor kell: 25 · 26/2 = 325 konzerv.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Zsuzsa ajándéka és a stadion" badge="6. feladat, HF" badgeColor="rose">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>
                (Érettségi, 2015) 18 hónap, d = 200 Ft, S₁₈ = 90 000 ⇒ (2a₁ + 17 · 200)/2 · 18 = 90 000 ⇒ a₁ = <strong>3300 Ft</strong>, a₁₈ = <strong>6700 Ft</strong>.
              </li>
              <li>Stadion: 340 ülés, soronként +30, 27 sor ⇒ (680 + 26 · 30)/2 · 27 = 19 710 ülőhely.</li>
              <li>a₁ = 15, d = −1,2: S₁₀ = 96, S₁₆ = 96, S₂₆ = 0.</li>
              <li>100-tól 1000-ig: 901 tag, 495 550; páratlanok 45-től 945-ig: 451 tag, 223 245; párosok −14-től 132-ig: 74 tag, 4366.</li>
              <li>a₁ = −5, a₆ = 5 ⇒ d = 2, a₂₅ = 43, S₂₅ = 475; a₃ = 6, a₁₀ = −15 ⇒ d = −3, a₁ = 12, a₂₀ = −45, S₂₀ = −330.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="4. Tipikus hiba: rossz tagszám, elfelejtett felezés" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Hány tag van 100-tól 1000-ig?"
          wrong="1000 − 100 = 900 tag, így az összeg (100 + 1000)/2 · 900 = 495 000."
          wrongExplanation="A kivonás a lépések számát adja, a tagok száma eggyel több: 901."
          correct="n = (aₙ − a₁)/d + 1 = 901 ⇒ S = (100 + 1000)/2 · 901 = 495 550."
          correctExplanation="Az (a₁ + aₙ) · n szorzat a „két lépcső” téglalapja – ezt még 2-vel osztani kell."
          tip="Kis esetre ellenőrizz: 1-től 4-ig 4 tag van (4 − 1 + 1), összegük (1 + 4)/2 · 4 = 10 ✓."
        />
      </TheorySection>

      <TheorySection title="5. Interaktív Laboratórium I: Gauss trükkje élőben" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">a₁ = {fmt(a1)}</label>
                <input type="range" min="-10" max="30" value={a1} onChange={(ev) => setA1(Number(ev.target.value))} className="w-full accent-blue-600" aria-label="a1" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">d = {fmt(d)}</label>
                <input type="range" min="-4" max="6" step="0.5" value={d} onChange={(ev) => setD(Number(ev.target.value))} className="w-full accent-emerald-600" aria-label="d" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">tagok száma: n = {n}</label>
                <input type="range" min="2" max="16" value={n} onChange={(ev) => setN(Number(ev.target.value))} className="w-full accent-rose-600" aria-label="n" />
              </div>
              <div className="overflow-x-auto">
                <TheoryTable
                  headers={['', ...vals.map((_, i) => String(i + 1))]}
                  rows={[
                    ['előre', ...vals.map((v) => fmt(v))],
                    ['vissza', ...vals.map((_, i) => fmt(vals[n - 1 - i]))],
                    ['összeg', ...vals.map((v, i) => fmt(v + vals[n - 1 - i]))]
                  ]}
                />
              </div>
              <div className="bg-blue-50 rounded-xl border border-blue-200 p-3 text-sm text-blue-900 space-y-1">
                <div>
                  aₙ = {fmt(a1)} + {n - 1} · {fmt(d)} = {fmt(an)}
                </div>
                <div>
                  Sₙ = ({fmt(a1)} + {fmt(an)})/2 · {n} = <strong>{fmt(sum1)}</strong>
                </div>
                <div>
                  Sₙ = (2 · {fmt(a1)} + {n - 1} · {fmt(d)})/2 · {n} = <strong>{fmt(sum2)}</strong>
                </div>
              </div>
            </div>
            {allPos ? (
              <TwoStairs vals={vals} />
            ) : (
              <div className="text-sm text-slate-600 bg-slate-50 rounded-xl p-4 border border-slate-200">
                Negatív tagoknál az oszlopos szemléltetés nem működik, de a táblázat mutatja: az „összeg” sor minden eleme ugyanannyi ({fmt(a1 + an)}), ezért 2Sₙ = n · (a₁ + aₙ).
              </div>
            )}
          </div>
        </div>
      </TheorySection>

      <TheorySection title="6. Interaktív Laboratórium II: Hány tag kell az adott összeghez?" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-4 text-sm">
              <div className="flex flex-wrap gap-2">
                {[
                  { t: 'Konzervgúla: 1 + 2 + … = 120', v: [1, 1, 120] },
                  { t: '55 páratlan szám: 17 + 19 + … = 3905', v: [17, 2, 3905] },
                  { t: 'Zsuzsa: 3300 + 3500 + … = 90 000', v: [3300, 200, 90000] },
                  { t: 'Díszkő: 26 + 28 + … = 3750', v: [26, 2, 3750] }
                ].map((p) => (
                  <button
                    key={p.t}
                    onClick={() => {
                      setB1(p.v[0]);
                      setE(p.v[1]);
                      setTarget(p.v[2]);
                    }}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 text-slate-700 hover:bg-purple-100"
                  >
                    {p.t}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span>a₁ =</span>
                <input type="number" value={b1} onChange={(ev) => setB1(Number(ev.target.value))} className={numIn} aria-label="a1 kereső" />
                <span>d =</span>
                <input type="number" value={e} onChange={(ev) => setE(Number(ev.target.value))} className={numIn} aria-label="d kereső" />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span>célösszeg S =</span>
                <input type="number" value={target} onChange={(ev) => setTarget(Number(ev.target.value))} className={numIn} aria-label="célösszeg" />
              </div>
              <div className="bg-purple-50 rounded-xl border border-purple-200 p-3 text-purple-900">
                {search.found !== null ? (
                  <span>
                    Pontosan <strong>n = {search.found}</strong> tag összege {fmtInt(target)}; az utolsó tag {fmt(b1 + (search.found - 1) * e)}.
                  </span>
                ) : search.exceed ? (
                  <span>
                    Pontosan {fmtInt(target)} nem jön ki; az összeg először n = {search.exceed.n}-nél éri el vagy haladja meg ({fmt(search.exceed.s)}).
                  </span>
                ) : (
                  <span>Az első 2000 tag között nincs ilyen összeg.</span>
                )}
              </div>
            </div>
            <div>
              <TheoryTable
                headers={['n', 'aₙ', 'Sₙ']}
                rows={search.last.map((r) => [String(r.n), fmt(r.a), fmt(r.s)])}
              />
              <p className="text-xs text-slate-500 mt-2">A táblázat a keresés utolsó lépéseit mutatja (Sₙ = Sₙ₋₁ + aₙ).</p>
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ArithmeticSumTheory;
