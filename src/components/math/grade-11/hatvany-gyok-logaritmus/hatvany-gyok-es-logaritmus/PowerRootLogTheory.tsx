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
  BseBarChartSvg,
  BseModelCurveSvg,
  LogSolveStepsSvg,
  MobileCallsSvg,
  GrowthFactorSvg
} from './PowerRootLogFigures';

const fmt = (x: number, d = 2) => {
  if (!Number.isFinite(x)) return '–';
  return Number(x.toFixed(d)).toLocaleString('hu-HU', { maximumFractionDigits: d });
};
const parseNum = (s: string) => Number(s.trim().replace(/\s/g, '').replace(',', '.').replace('−', '-'));

const MONTHS = ['január', 'február', 'március', 'április', 'május', 'június', 'július', 'augusztus', 'szeptember', 'október', 'november', 'december'];
/** t hónappal 1988 decembere után melyik hónap van? */
const monthAfterDec1988 = (t: number) => {
  const k = 11 + t;
  return `${1988 + Math.floor(k / 12)}. ${MONTHS[((k % 12) + 12) % 12]}`;
};

const E = (t: number) => 500 * Math.pow(1.056, t);

export const PowerRootLogTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: a BSE-modell
  const [t, setT] = useState<number>(25);
  const [targetText, setTargetText] = useState<string>('3000');
  const target = parseNum(targetText);
  const targetValid = Number.isFinite(target) && target > 0;
  const tStar = targetValid ? Math.log10(target / 500) / Math.log10(1.056) : NaN;
  const tRound = Math.round(tStar);
  const xOf = (tt: number) => 50 + (tt / 37) * 440;
  const yOf = (v: number) => 200 - (v / 4000) * 170;
  const curve = Array.from({ length: 75 }, (_, i) => i / 2)
    .map((tt) => `${xOf(tt).toFixed(1)},${yOf(E(tt)).toFixed(1)}`)
    .join(' ');

  // Labor II: c · aˣ = b megoldó
  const [cText, setCText] = useState<string>('500');
  const [aText, setAText] = useState<string>('1,056');
  const [bText, setBText] = useState<string>('3000');
  const c = parseNum(cText);
  const a = parseNum(aText);
  const b = parseNum(bText);
  const inputsOk = [c, a, b].every(Number.isFinite);
  const ratio = b / c;
  let error = '';
  if (!inputsOk) error = 'Minden mezőbe számot írj!';
  else if (c === 0) error = 'A szorzó (c) nem lehet 0.';
  else if (a <= 0 || a === 1) error = 'Az alap legyen pozitív és 1-től különböző (a > 0, a ≠ 1).';
  else if (ratio <= 0) error = 'b/c nem pozitív – mivel aˣ > 0, az egyenletnek nincs megoldása.';
  const x = error ? NaN : Math.log10(ratio) / Math.log10(a);

  return (
    <TheoryTemplate
      topicId="g11-hatvany-gyok-logaritmus"
      subtopicId="hatvany-gyok-es-logaritmus"
      title="12. Hatvány, gyök, logaritmus"
      subtitle="Exponenciális modellek a valóságban: ha a keresett mennyiség a kitevőben van, logaritmussal oldjuk meg az egyenletet – aˣ = b ⇒ x = lg b / lg a."
      badge="11. OSZTÁLY • III. HATVÁNY, GYÖK, LOGARITMUS • TANANYAG"
      themeColor="violet"
      pdfFilename="11_osztaly_hatvany_gyok_logaritmus_tananyag.pdf"
      practiceTitle="Készen állsz az exponenciális modellekre?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — EXPONENCIÁLIS EGYENLET MEGOLDÁSA',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center font-mono text-base font-black text-violet-900 dark:text-violet-200">
              aˣ = b  ⇒  x = log<sub>a</sub> b = lg b / lg a   (a &gt; 0, a ≠ 1, b &gt; 0)
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Hatvány:</strong> ismert az alap és a kitevő → aˣ = ? (pl. E(25) = 500 · 1,056²⁵ ≈ 1950).
              </li>
              <li>
                <strong>Gyök:</strong> ismert a kitevő és a hatvány → az alap kell (pl. q³⁷ = 7,6 ⇒ q = ³⁷√7,6 ≈ 1,056).
              </li>
              <li>
                <strong>Logaritmus:</strong> ismert az alap és a hatvány → a kitevő kell (pl. 1,056ᵗ = 6 ⇒ t = log₁,₀₅₆ 6 ≈ 33).
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. A marhavész (BSE) Angliában" badge="Tankönyv 108. o." badgeColor="violet">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              1985-ben jelentették az első 17 beteg állatot, 1988-tól pedig az esetek száma <strong>exponenciálisan</strong> emelkedni kezdett. A diagram a havonta diagnosztizált új
              megbetegedéseket mutatja Nagy-Britanniában.
            </p>
            <p>
              1988 vége és 1992 eleje között a havi új esetek számát az
            </p>
            <div className="p-3 rounded-xl bg-violet-50 border border-violet-200 font-mono text-center font-bold text-violet-900">E(t) = 500 · 1,056ᵗ</div>
            <p>
              összefüggéssel modellezhetjük, ahol <strong>t = 0</strong> az 1988. decemberi szám, és <strong>0 ≤ t ≤ 37</strong> (ennyi hónap telt el az időszakban). A modell csak ezen
              az <strong>érvényességi körön</strong> belül írja le jól a valóságot.
            </p>
          </div>
          <BseBarChartSvg />
        </div>
      </TheorySection>

      {/* 2. Kidolgozott feladat */}
      <TheorySection title="2. Kidolgozott feladat: hány eset, és mikor?" badge="Tankönyv 108. o." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3">
            <TheoryCard title="a) Hány új esetet diagnosztizáltak 1991 januárjában?" badge="Hatvány" badgeColor="emerald">
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                <li>1988 decemberétől 1991 januárjáig <strong>25 hónap</strong> telt el, tehát t = 25.</li>
                <li>E(25) = 500 · 1,056²⁵ ≈ 500 · 3,905 ≈ <strong>1950</strong>.</li>
                <li>A modell szerint 1991 januárjában közelítőleg 1950 új esetet diagnosztizáltak.</li>
              </ul>
            </TheoryCard>
            <TheoryCard title="b) Melyik hónapban volt 3000 új megbetegedés?" badge="Logaritmus" badgeColor="violet">
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                <li>Meg kell oldanunk a 3000 = 500 · 1,056ᵗ exponenciális egyenletet.</li>
                <li>Leosztás után: 1,056ᵗ = 6, amiből a logaritmus definíciója szerint t = log₁,₀₅₆ 6.</li>
                <li>
                  Számológéppel: log₁,₀₅₆ 6 = lg 6 / lg 1,056 ≈ 0,7782 / 0,02366 ≈ <strong>32,88 ≈ 33</strong>.
                </li>
                <li>
                  1988 decemberétől számítva kb. 33 hónap után, vagyis <strong>1991 szeptemberében</strong> érte el a 3000-et a havi új esetek száma.
                </li>
              </ul>
            </TheoryCard>
          </div>
          <div className="space-y-4">
            <BseModelCurveSvg />
            <LogSolveStepsSvg />
          </div>
        </div>
        <TheoryCallout type="info" title="Hatvány, gyök vagy logaritmus?">
          Ugyanabban az aᵇ = c összefüggésben három mennyiség szerepel. Ha a <strong>c</strong> hiányzik, hatványozunk; ha az <strong>a</strong> alap hiányzik, gyököt vonunk; ha a{' '}
          <strong>b</strong> kitevő hiányzik, logaritmust veszünk. A logaritmust a tízes alapú logaritmusra vezetjük vissza: log<sub>a</sub> b = lg b / lg a.
        </TheoryCallout>
      </TheorySection>

      {/* 3. Feladatok a modellhez */}
      <TheorySection title="3. Feladatok a BSE-modellhez" badge="1. feladat, házi feladat" badgeColor="emerald">
        <TheoryTable
          headers={['Kérdés', 'Számolás', 'Eredmény']}
          rows={[
            ['Havi növekedés (1. a)', '1,056 = 1 + 0,056', '5,6% havonta'],
            ['1992. december (1. b), t = 48', '500 · 1,056⁴⁸', '≈ 6837'],
            ['1993. december (1. b), t = 60', '500 · 1,056⁶⁰', '≈ 13 146'],
            ['1994. december (1. b), t = 72', '500 · 1,056⁷²', '≈ 25 280'],
            ['Mikor 1500? (1. c)', '1,056ᵗ = 3 ⇒ t = lg 3 / lg 1,056', 't ≈ 20,2 → 1990 augusztusa körül'],
            ['1989. jan. → dec. (HF 1. a)', '11 hónap: 1,056¹¹', '≈ 1,82-szeres'],
            ['1989. jan. → 1990. dec. (HF 1. c)', '23 hónap: 1,056²³', '≈ 3,5-szeres']
          ]}
        />
        <TheoryCallout type="warning" title="Az érvényességi kör">
          Az 1. b) feladat eredményei (6837, 13 146, 25 280 eset havonta) a valóságban nem következtek be: 1992-ben megállt a növekedés. Egy modell csak azon a tartományon használható, ahol
          az adatokra illesztették (itt 0 ≤ t ≤ 37).
        </TheoryCallout>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          <TheoryCard title="HF 2. Csökkenő szakasz: B(t) = 3800 · 0,945ᵗ" badge="Házi feladat" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>t = 0: 1992. december; havonta 5,5%-os csökkenés (0,945 = 1 − 0,055).</li>
              <li>
                1995 szeptembere: t = 33, B(33) = 3800 · 0,945³³ ≈ <strong>588</strong> új eset.
              </li>
              <li>
                „Felezési idő”: 0,945ᵗ = 0,5 ⇒ t = lg 0,5 / lg 0,945 ≈ <strong>12,25 hónap</strong>.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="HF 3. Magyarország népessége" badge="Házi feladat" badgeColor="slate">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>1980: 10,71 millió, 2010: 10 millió fő; 30 év alatt q³⁰ = 10 / 10,71.</li>
              <li>
                q = (10 / 10,71)<sup>1/30</sup> ≈ <strong>0,9977</strong>, vagyis évi kb. <strong>0,23%</strong>-os csökkenés.
              </li>
              <li>
                9 millió: q<sup>n</sup> = 9 / 10,71 ⇒ n = lg(9 / 10,71) / lg q ≈ 76,1 év → <strong>2056</strong>-ban.
              </li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Érettségi */}
      <TheorySection title="4. Érettségi feladat (2017): mobiltelefonok" badge="Érettségi" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700">
            <TheoryCard title="a) Hány százalékkal nőtt az előfizetések száma?" badge="Arány" badgeColor="emerald">
              2002 végén kb. 7 millió, 2008 végén kb. 12 millió előfizetés volt: 12 / 7 ≈ 1,714, tehát kb. <strong>71,4%</strong>-kal nőtt.
            </TheoryCard>
            <TheoryCard title="b) f(x) = 51 · 1,667ˣ (ezer darab)" badge="Hatvány" badgeColor="sky">
              x az 1992 vége óta eltelt évek száma. 2000 végén x = 8: f(8) = 51 · 1,667⁸ ≈ 3041 (ezer), vagyis kb. <strong>3 millió</strong> előfizető.
            </TheoryCard>
            <TheoryCard title="c) Mikor érte el a havi hívásszám a 100 milliót?" badge="Logaritmus" badgeColor="violet">
              <ul className="list-disc pl-5 space-y-1">
                <li>1991 januárjában 350 000 hívás, havonta 6,5%-os növekedés: 350 000 · 1,065ⁿ.</li>
                <li>350 000 · 1,065ⁿ = 100 000 000 ⇒ 1,065ⁿ ≈ 285,71.</li>
                <li>n = lg 285,71 / lg 1,065 ≈ 89,8, tehát a 90. hónapban (n = 90).</li>
                <li>1991 januárja + 90 hónap = 1998 júliusa → <strong>1998</strong>-ban.</li>
              </ul>
            </TheoryCard>
          </div>
          <MobileCallsSvg />
        </div>
      </TheorySection>

      {/* 5. Ráadás */}
      <TheorySection title="5. Ráadás: hogyan készül a modell?" badge="Tankönyv 109. o." badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A diagram szerint 1988 végén havi kb. <strong>500</strong>, 1992 elején – 37 hónappal később – havi kb. <strong>3800</strong> új esetet találtak. Exponenciális növekedésnél
              minden hónapban az előző havi szám ugyanannyiszorosára változik. Ezt a <strong>növekedési tényezőt</strong> jelöljük q-val: E(t) = 500 · qᵗ.
            </p>
            <p>
              E(37) = 3800 = 500 · q³⁷, rendezve q³⁷ = 7,6. Itt a kitevő ismert, az alap hiányzik – ezért <strong>gyököt vonunk</strong>: q = 7,6<sup>1/37</sup> = ³⁷√7,6 ≈ 1,056.
            </p>
            <p>Valóban jó tehát az E(t) = 500 · 1,056ᵗ modell.</p>
          </div>
          <GrowthFactorSvg />
        </div>
      </TheorySection>

      {/* 6. Csapda */}
      <TheorySection title="6. Tipikus hiba: a logaritmus nem „egyszerűsíthető”" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Mennyi t, ha 1,056ᵗ = 6?"
          wrong="t = lg 6 / lg 1,056 = 6 / 1,056 ≈ 5,68"
          wrongExplanation="A lg 6 / lg 1,056 törtben nem lehet „kihúzni” a lg-t! A logaritmusok hányadosa nem egyenlő a számok hányadosával, és lg(6 / 1,056) sem ugyanaz."
          correct="t = lg 6 / lg 1,056 ≈ 0,7782 / 0,02366 ≈ 32,88"
          correctExplanation="Előbb külön-külön kiszámoljuk a két logaritmust, aztán osztunk. Ellenőrzés: 1,056^32,88 ≈ 6. ✓"
          tip="Másik gyakori hiba: a 3000 = 500 · 1,056ᵗ egyenletben előbb kell osztani 500-zal, és csak utána logaritmust venni – az 500 · 1,056 szorzatot nem szabad összevonni 528-cá!"
        />
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Interaktív Laboratórium I: a BSE-modell" badge="Labor" badgeColor="violet">
        <div className="bg-white border-2 border-violet-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                eltelt hónapok (t): {t} → {monthAfterDec1988(t)}
              </label>
              <input type="range" min="0" max="37" value={t} onChange={(e) => setT(Number(e.target.value))} className="w-full accent-violet-600" aria-label="eltelt hónapok" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">keresett havi esetszám</label>
              <input type="text" value={targetText} onChange={(e) => setTargetText(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-violet-200 font-mono" aria-label="keresett esetszám" />
            </div>
          </div>
          <svg viewBox="0 0 520 230" className="w-full h-auto max-w-2xl mx-auto">
            {[0, 1000, 2000, 3000, 4000].map((v) => (
              <g key={v}>
                <line x1="50" y1={yOf(v)} x2="490" y2={yOf(v)} stroke="#e2e8f0" />
                <text x="44" y={yOf(v) + 4} fontSize="10" textAnchor="end" fill="#64748b">{v}</text>
              </g>
            ))}
            {[0, 5, 10, 15, 20, 25, 30, 35].map((tt) => (
              <text key={tt} x={xOf(tt)} y="216" fontSize="10" textAnchor="middle" fill="#64748b">{tt}</text>
            ))}
            <line x1="50" y1="200" x2="495" y2="200" stroke="#334155" strokeWidth="1.5" />
            <polyline points={curve} fill="none" stroke="#7c3aed" strokeWidth="3" />
            <line x1={xOf(t)} y1="200" x2={xOf(t)} y2={yOf(E(t))} stroke="#0f766e" strokeDasharray="4 3" />
            <circle cx={xOf(t)} cy={yOf(E(t))} r="6" fill="#0f766e" />
            {targetValid && target <= 4000 && (
              <>
                <line x1="50" y1={yOf(target)} x2="490" y2={yOf(target)} stroke="#db2777" strokeDasharray="5 3" strokeWidth="1.5" />
                {tStar >= 0 && tStar <= 37 && <circle cx={xOf(tStar)} cy={yOf(target)} r="5" fill="#db2777" />}
              </>
            )}
          </svg>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="bg-teal-50 rounded-xl border border-teal-200 p-4 space-y-1">
              <div className="font-bold text-teal-800">Hatványozás: E(t) = ?</div>
              <div>
                E({t}) = 500 · 1,056<sup>{t}</sup> ≈ <strong>{fmt(E(t), 0)}</strong> új eset
              </div>
              <div className="text-xs text-slate-600">{monthAfterDec1988(t)}</div>
            </div>
            <div className="bg-pink-50 rounded-xl border border-pink-200 p-4 space-y-1">
              <div className="font-bold text-pink-800">Logaritmus: mikor lesz {targetValid ? fmt(target, 0) : '?'}?</div>
              {!targetValid ? (
                <div className="text-rose-700 font-bold">Adj meg egy pozitív számot!</div>
              ) : (
                <>
                  <div>
                    1,056ᵗ = {fmt(target / 500, 4)} ⇒ t = lg {fmt(target / 500, 4)} / lg 1,056 ≈ <strong>{fmt(tStar, 2)}</strong>
                  </div>
                  <div className="text-xs text-slate-600">
                    kb. {tRound} hónap → {monthAfterDec1988(tRound)}
                  </div>
                  {(tStar < 0 || tStar > 37) && (
                    <div className="text-xs font-bold text-amber-700">Figyelem: t kívül esik a 0 ≤ t ≤ 37 érvényességi körön – ezt a modell már nem írja le megbízhatóan!</div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Interaktív Laboratórium II: c · aˣ = b megoldó" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {[
              ['c (kezdőérték)', cText, setCText],
              ['a (alap)', aText, setAText],
              ['b (célérték)', bText, setBText]
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
          <div className="flex flex-wrap gap-2">
            {[
              ['500', '1,056', '3000', 'BSE 3000'],
              ['500', '1,056', '1500', 'BSE 1500'],
              ['350000', '1,065', '100000000', 'mobilhívás'],
              ['3800', '0,945', '1900', 'felezés'],
              ['1', '2', '10', '2ˣ = 10'],
              ['10,71', '0,9977', '9', 'népesség']
            ].map(([cc, aa, bb, name]) => (
              <button
                key={name}
                onClick={() => {
                  setCText(cc);
                  setAText(aa);
                  setBText(bb);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
              >
                {name}
              </button>
            ))}
          </div>
          {error ? (
            <div className="bg-rose-50 rounded-xl border border-rose-200 p-4 text-sm font-bold text-rose-700">{error}</div>
          ) : (
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-2 text-sm text-slate-700">
              <div className="font-mono font-bold text-slate-900">
                {cText} · {aText}ˣ = {bText}
              </div>
              <div>
                1. Osztás c-vel: {aText}ˣ = {fmt(ratio, 4)}
              </div>
              <div>
                2. Logaritmus: x = log<sub>{aText}</sub> {fmt(ratio, 4)} = lg {fmt(ratio, 4)} / lg {aText}
              </div>
              <div>
                3. Számológéppel: x ≈ {fmt(Math.log10(ratio), 4)} / {fmt(Math.log10(a), 5)} ≈ <strong className="text-emerald-800 text-base">{fmt(x, 3)}</strong>
              </div>
              <div className="text-xs text-slate-500">
                Ellenőrzés: {cText} · {aText}
                <sup>{fmt(x, 3)}</sup> ≈ {fmt(c * Math.pow(a, x), 2)}
              </div>
              {x < 0 && <div className="text-xs font-bold text-amber-700">Negatív megoldás: a célértéket a folyamat a kezdőpont előtt érte el.</div>}
            </div>
          )}
          <TheoryCallout type="tip" title="Csökkenő folyamat">
            Ha 0 &lt; a &lt; 1 (pl. 0,945), akkor lg a negatív. Ha a célérték kisebb a kezdőértéknél, a számláló is negatív, így a hányados pozitív lesz – ez a felezési időnél is így van.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default PowerRootLogTheory;
