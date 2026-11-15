import React, { useMemo, useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  PasswordSlotsSvg,
  PasswordSlotsRepeatSvg,
  PasswordTreeSvg,
  FourDigitSchemesSvg,
  LogoColoringSvg
} from './PasswordsFigures';

/** Egész szám magyar ezres tagolással (szóközzel). */
const group = (v: bigint | number) => {
  const s = typeof v === 'bigint' ? v.toString() : Math.round(v).toString();
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

const fmtTime = (seconds: number) => {
  if (!Number.isFinite(seconds)) return '–';
  if (seconds < 1) return 'kevesebb mint 1 másodperc';
  if (seconds < 60) return `≈ ${seconds.toFixed(0)} másodperc`;
  if (seconds < 3600) return `≈ ${(seconds / 60).toFixed(0)} perc`;
  if (seconds < 86400) return `≈ ${(seconds / 3600).toFixed(0)} óra`;
  if (seconds < 86400 * 365) return `≈ ${(seconds / 86400).toFixed(0)} nap`;
  const years = seconds / (86400 * 365);
  if (years < 1e6) return `≈ ${group(Math.round(years))} év`;
  return `≈ ${years.toExponential(1).replace('.', ',').replace('e+', ' · 10^')} év`;
};

const CHARSETS = [
  { id: 'lower', label: 'kisbetűk (26)', size: 26 },
  { id: 'upper', label: 'nagybetűk (26)', size: 26 },
  { id: 'digit', label: 'számjegyek (10)', size: 10 },
  { id: 'special', label: 'speciális jelek (33)', size: 33 }
] as const;

export const PasswordsTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: jelszó-kalkulátor
  const [sets, setSets] = useState<Record<string, boolean>>({ lower: true, upper: false, digit: true, special: false });
  const [len, setLen] = useState<number>(6);
  const [repeat, setRepeat] = useState<boolean>(true);

  // Labor II: négyjegyű számok feltételekkel
  const [distinct, setDistinct] = useState<boolean>(false);
  const [evenOnly, setEvenOnly] = useState<boolean>(false);
  const [thirdFixed, setThirdFixed] = useState<string>('nincs');
  const [excluded, setExcluded] = useState<string>('nincs');

  const n = CHARSETS.reduce((acc, c) => acc + (sets[c.id] ? c.size : 0), 0);
  let count = 0n;
  const factors: number[] = [];
  if (n > 0) {
    count = 1n;
    for (let i = 0; i < len; i++) {
      const f = repeat ? n : n - i;
      factors.push(Math.max(0, f));
      count *= BigInt(Math.max(0, f));
    }
  }
  const crackSeconds = Number(count) / 1e9;

  const digitResult = useMemo(() => {
    let total = 0;
    const examples: string[] = [];
    for (let v = 1000; v <= 9999; v++) {
      const s = String(v);
      if (distinct && new Set(s).size !== 4) continue;
      if (evenOnly && /[13579]/.test(s)) continue;
      if (thirdFixed !== 'nincs' && s[2] !== thirdFixed) continue;
      if (excluded !== 'nincs' && s.includes(excluded)) continue;
      total++;
      if (examples.length < 10) examples.push(s);
    }
    return { total, examples };
  }, [distinct, evenOnly, thirdFixed, excluded]);

  // „rekeszes” képlet a labor II-höz (ugyanaz a gondolatmenet, mint a tankönyvben)
  const slotFormula = useMemo(() => {
    let pool = Array.from({ length: 10 }, (_, i) => String(i));
    if (evenOnly) pool = pool.filter((d) => Number(d) % 2 === 0);
    if (excluded !== 'nincs') pool = pool.filter((d) => d !== excluded);
    if (thirdFixed !== 'nincs' && !pool.includes(thirdFixed)) return '0 (a rögzített jegy nem megengedett)';
    const firstPool = pool.filter((d) => d !== '0');
    const out: number[] = [];
    if (!distinct) {
      out.push(firstPool.length, pool.length, thirdFixed !== 'nincs' ? 1 : pool.length, pool.length);
    } else if (thirdFixed === 'nincs') {
      out.push(firstPool.length, pool.length - 1, pool.length - 2, pool.length - 3);
    } else {
      const fp = firstPool.filter((d) => d !== thirdFixed).length;
      out.push(fp, pool.length - 2, 1, pool.length - 3);
    }
    return out.map((x) => Math.max(0, x)).join(' · ');
  }, [distinct, evenOnly, thirdFixed, excluded]);

  return (
    <TheoryTemplate
      topicId="g11-kombinatorika-grafok"
      subtopicId="jelszavak"
      title="1. Jelszavak"
      subtitle="Hány háromkarakteres jelszó készíthető 5 karakterből? A „rekeszes” összeszámlálás és a szorzási szabály – ismétléssel és ismétlés nélkül, megkötésekkel."
      badge="11. OSZTÁLY • II. KOMBINATORIKA, GRÁFOK • TANANYAG"
      themeColor="indigo"
      pdfFilename="11_osztaly_jelszavak_tananyag.pdf"
      practiceTitle="Készen állsz a jelszavas, rekeszes feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — KIVÁLASZTÁS, AHOL SZÁMÍT A SORREND',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-center">
                <div className="text-xs mb-1">minden elem legfeljebb egyszer</div>
                <span className="font-mono text-base font-black text-indigo-900 dark:text-indigo-200">n · (n − 1) · (n − 2) · …</span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center">
                <div className="text-xs mb-1">az elemek ismétlődhetnek</div>
                <span className="font-mono text-base font-black text-emerald-900 dark:text-emerald-200">n · n · n · … = nᵏ</span>
              </div>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Minden választási helynek egy <strong>„rekesz”</strong> felel meg, a rekeszeknek rögzített sorrendjük van.</li>
              <li>Minden rekeszbe beírjuk, <strong>hányféle</strong> elem kerülhet oda, majd a számokat <strong>összeszorozzuk</strong>.</li>
              <li>Megkötésnél (pl. az első számjegy nem 0) érdemes <strong>a megkötött rekesszel kezdeni</strong>.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: Bendi elfelejtett jelszava" badge="Tankönyv 50. o." badgeColor="indigo">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            Bendi egy dokumentumát háromkarakteres jelszóval védte le. Elfelejtette, de arra emlékszik, hogy a jelszó a
            <strong> {'{'}B; e; n; 1; 7{'}'}</strong> karakterekből épül fel. Hány különböző jelszó létezik, ha
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>a)</strong> tudja, hogy három különböző karaktert használt;</li>
            <li><strong>b)</strong> nem tudja, hogy a karakterek között voltak-e egyformák?</li>
          </ul>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <TheoryCard title="a) Nincs ismétlődés" badge="Megoldás" badgeColor="indigo">
            <PasswordSlotsSvg className="w-full h-auto mb-3" />
            <p className="text-sm text-slate-700 leading-relaxed">
              Az első rekeszbe 5-féle karakter kerülhet. Bármit választottunk, a másodikba már csak 4-féle (azt nem választhatjuk, ami
              az elsőben van), a harmadikba 3-féle. Minden első karakterhez 4-féle második társul (5 · 4 eset), és mindegyikhez 3-féle
              harmadik: <strong>5 · 4 · 3 = 60</strong> jelszó.
            </p>
          </TheoryCard>
          <TheoryCard title="b) Lehet ismétlődés" badge="Megoldás" badgeColor="emerald">
            <PasswordSlotsRepeatSvg className="w-full h-auto mb-3" />
            <p className="text-sm text-slate-700 leading-relaxed">
              Most a második és a harmadik karakter is 5-féle lehet, bármit választottunk előtte:
              <strong> 5 · 5 · 5 = 125</strong> jelszó.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. Miért szorzunk? */}
      <TheorySection title="2. Miért szorzunk? – a fadiagram" badge="Elmélet" badgeColor="violet">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <PasswordTreeSvg />
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A döntéseket egymás után hozzuk meg. Az első döntés minden kimeneteléhez <strong>ugyanannyi</strong> folytatás tartozik,
              ezért az ágak száma szorzással adódik.
            </p>
            <p>
              A {'{'}B; e; n{'}'} halmazból készített kétkarakteres, ismétlés nélküli jelszavak: Be, Bn, eB, en, nB, ne – vagyis
              <strong> 3 · 2 = 6</strong>. Ismétléssel (BB, ee, nn is) 3 · 3 = 9 lenne.
            </p>
            <TheoryCallout type="info" title="Az elmélet összefoglalása (51. o.)">
              n különböző elemből választunk valahányat úgy, hogy fontos a kiválasztás sorrendje. Ha minden elemet legfeljebb egyszer
              választhatunk: n · (n − 1) · (n − 2) · …; ha az elemek ismétlődhetnek: n · n · n · …
            </TheoryCallout>
          </div>
        </div>
      </TheorySection>

      {/* 3. Mikor számít a sorrend? */}
      <TheorySection title="3. Mit jelent, hogy számít a kiválasztás sorrendje?" badge="Elmélet" badgeColor="teal">
        <TheoryTable
          headers={['A kiválasztott elemek…', 'Példa']}
          rows={[
            ['sorrendben állnak', 'jelszó, sorban állás, többjegyű szám, teszt kitöltése'],
            ['más-más feladatra kerülnek, máshová kerülnek', 'elnök, titkár, pénztáros választása; sportszerek kisorsolása'],
            ['különböző dolgokkal párosulnak', 'különböző nyeremények, táncpartnerek'],
            ['alkalmas sorrendben hozott döntések', 'először a megkötött helyet töltjük ki']
          ]}
        />
        <TheoryCallout type="tip" title="Megkötések a rekeszekben">
          Hogy milyen számot írunk az egyes rekeszekbe, azt a feladat dönti el: ha számot készítünk, az első jegy nem lehet 0;
          kiköthetik, hogy valamelyik helyre konkrét elem kerül; és megtehetjük, hogy <strong>nem az első rekeszt töltjük ki
          először</strong>.
        </TheoryCallout>
      </TheorySection>

      {/* 4. Kidolgozott feladatok */}
      <TheorySection title="4. Kidolgozott feladatok" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Hajni jelszavai – {H; a; j; n; i; 1; 9}" badge="1. feladat" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>7 karakterből 4 karakteres jelszavak.</li>
              <li><strong>a)</strong> nincs két egyforma: 7 · 6 · 5 · 4 = <strong>840</strong></li>
              <li><strong>b)</strong> lehetnek egyformák: 7 · 7 · 7 · 7 = 7⁴ = <strong>2401</strong></li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Csilla 10 karakteres jelszavai – {C; a}" badge="2. feladat" badgeColor="purple">
            <p className="text-sm text-slate-700 leading-relaxed">
              Mind a 10 rekeszbe 2-féle karakter kerülhet: 2¹⁰ = <strong>1024</strong> jelszó. Kevés karakterből is sok jelszó lesz,
              ha a jelszó hosszú!
            </p>
          </TheoryCard>
          <TheoryCard title="C) Teszt 6 kérdéssel, A–D válaszokkal" badge="3. feladat" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>a)</strong> minden kérdésre karikázunk: 4⁶ = <strong>4096</strong></li>
              <li>
                <strong>b)</strong> üresen is hagyhatunk kérdést: kérdésenként 5 lehetőség (A, B, C, D, semmi) ⇒ 5⁶ = <strong>15 625</strong>
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Üzemi étterem: hányféle leves?" badge="4. feladat" badgeColor="rose">
            <p className="text-sm text-slate-700 leading-relaxed">
              Ha x-féle leves van, a háromfogásos ebédek száma x · 4 · 3 = 12x. A feltétel: 50 &lt; 12x &lt; 80 ⇒ 4,17 &lt; x &lt; 6,67,
              tehát <strong>5 vagy 6</strong>-féle leves van (60, illetve 72 lehetőség).
            </p>
          </TheoryCard>
          <TheoryCard title="E) A logó színezése 6 színnel" badge="5. feladat" badgeColor="orange">
            <LogoColoringSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>a)</strong> minden tartomány más színű: 6 · 5 · 4 = <strong>120</strong></li>
              <li>
                <strong>b)</strong> a két nyíl lehet egyforma (de a középső tartománytól eltér): először a középsőt színezzük (6), majd a
                nyilakat 5-5-féleképpen: <strong>150</strong>
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="F) Négyjegyű számok – melyik ábra melyik feladat?" badge="6. feladat" badgeColor="amber">
            <FourDigitSchemesSvg className="w-full h-auto mb-3" />
            <p className="text-sm text-slate-700 leading-relaxed">
              Az e) feladatnak (minden jegy páros, ismétlődhetnek) nincs párja: az első jegy 2, 4, 6, 8 (a 0 nem lehet), a többi
              5-féle: <strong>4 · 5 · 5 · 5 = 500</strong>. A d)-nél először a 3. rekeszt töltjük ki (1), aztán az első jegy nem lehet
              sem 0, sem 4 (8), a második 8-féle, a negyedik 7-féle.
            </p>
          </TheoryCard>
          <TheoryCard title="G) Házi feladatok eredményei" badge="Ellenőrzés" badgeColor="slate">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>HF 1.</strong> Hétjegyű, 0-val nem kezdődő telefonszámok: 9 · 10⁶ = 9 000 000.</li>
              <li><strong>HF 2.</strong> 26 betű, 6 karakter: a) 26 · 25 · 24 · 23 · 22 · 21 = 165 765 600; b) 26⁶ = 308 915 776.</li>
              <li><strong>HF 3.</strong> Különböző jegyek, nincs 7-es: 8 · 8 · 7 · 6 = 2688.</li>
              <li>
                <strong>HF 4.</strong> 5 sportszer, 20 tanuló: a) 20 · 19 · 18 · 17 · 16 = 1 860 480; b) 20⁵ = 3 200 000; c) Konrád
                sportszere 5-féle, a többi 4-et a többi 19 tanuló kapja: 5 · 19 · 18 · 17 · 16 = 465 120.
              </li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Csapda */}
      <TheorySection title="5. Tipikus hiba: a 0-s kezdés és a sorrend a kitöltésben" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A „különböző jegyű négyjegyű szám” nem 10 · 9 · 8 · 7"
          wrong="10 · 9 · 8 · 7 = 5040 különböző jegyű négyjegyű szám"
          wrongExplanation="Ebben benne vannak a 0-val kezdődő „számok” is (pl. 0123), amelyek nem négyjegyűek. Ugyanígy hiba a d) feladatban az első rekeszbe 9-et írni: a 4-es már foglalt, a 0 tilos."
          correct="9 · 9 · 8 · 7 = 4536"
          correctExplanation="Az első rekeszbe a 0 nem kerülhet (9-féle), a másodikba a 0 már igen, de az első jegy nem (9-féle), majd 8 és 7."
          tip="Mindig a legtöbb megkötéssel járó rekeszt töltsd ki elsőként (első jegy, rögzített jegy), és csak utána a többit!"
        />
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Interaktív Laboratórium I: Jelszóerősség-kalkulátor" badge="Labor" badgeColor="indigo">
        <div className="bg-white border-2 border-indigo-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="text-xs font-semibold text-slate-600">Karakterkészlet</div>
              <div className="flex flex-wrap gap-2">
                {CHARSETS.map((c) => (
                  <label
                    key={c.id}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer border ${
                      sets[c.id] ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-700 border-slate-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={!!sets[c.id]}
                      onChange={() => setSets((s) => ({ ...s, [c.id]: !s[c.id] }))}
                      aria-label={c.label}
                    />
                    {c.label}
                  </label>
                ))}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">A jelszó hossza: {len} karakter</label>
                <input
                  type="range"
                  min="1"
                  max="16"
                  value={len}
                  onChange={(e) => setLen(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                  aria-label="jelszó hossza"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setRepeat(true)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${repeat ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                >
                  ismétlődhet
                </button>
                <button
                  onClick={() => setRepeat(false)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${!repeat ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                >
                  nincs ismétlődés
                </button>
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-2">
              <div>Karakterek száma: <strong>n = {n}</strong></div>
              {n === 0 ? (
                <div className="text-rose-700 font-bold">Válassz legalább egy karakterkészletet!</div>
              ) : (
                <>
                  <div className="font-mono text-xs break-words">
                    {repeat ? `${n}^${len}` : factors.join(' · ')}
                  </div>
                  <div>
                    Lehetséges jelszavak: <strong className="text-indigo-700">{group(count)}</strong>
                  </div>
                  <div>
                    Feltörés másodpercenként 10⁹ próbálkozással (legrosszabb esetben): <strong>{count === 0n ? '–' : fmtTime(crackSeconds)}</strong>
                  </div>
                  {count === 0n && (
                    <div className="text-rose-700 text-xs">Ismétlés nélkül legfeljebb {n} karakter hosszú jelszó készíthető ennyi karakterből.</div>
                  )}
                </>
              )}
            </div>
          </div>
          <TheoryCallout type="success" title="Mit érdemes kipróbálni?">
            Hasonlítsd össze: 4 jegyű PIN-kód (csak számjegyek, 4 hosszú) 10⁴ = 10 000; 8 karakteres kis- és nagybetű + számjegy
            jelszó 62⁸ ≈ 2,18 · 10¹⁴. Egy karakterrel hosszabb jelszó n-szer több lehetőséget ad – a hossz növelése a leghatásosabb!
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Interaktív Laboratórium II: Négyjegyű számok megkötésekkel" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={distinct} onChange={() => setDistinct((d) => !d)} aria-label="különböző jegyek" />
              minden számjegy különböző
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={evenOnly} onChange={() => setEvenOnly((d) => !d)} aria-label="csak páros jegyek" />
              minden számjegy páros
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              a 3. számjegy:
              <select
                value={thirdFixed}
                onChange={(e) => setThirdFixed(e.target.value)}
                className="border border-slate-300 rounded-lg px-2 py-1 text-sm"
                aria-label="harmadik számjegy"
              >
                {['nincs', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].map((d) => (
                  <option key={d} value={d}>
                    {d === 'nincs' ? 'bármi' : d}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              nem szerepel benne:
              <select
                value={excluded}
                onChange={(e) => setExcluded(e.target.value)}
                className="border border-slate-300 rounded-lg px-2 py-1 text-sm"
                aria-label="kizárt számjegy"
              >
                {['nincs', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].map((d) => (
                  <option key={d} value={d}>
                    {d === 'nincs' ? '–' : d}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { name: '6. a)', d: false, e: false, t: 'nincs', x: 'nincs' },
              { name: '6. b)', d: true, e: false, t: 'nincs', x: 'nincs' },
              { name: '6. c)', d: false, e: false, t: '8', x: 'nincs' },
              { name: '6. d)', d: true, e: false, t: '4', x: 'nincs' },
              { name: '6. e)', d: false, e: true, t: 'nincs', x: 'nincs' },
              { name: '6. f)', d: true, e: true, t: 'nincs', x: 'nincs' },
              { name: 'HF 3.', d: true, e: false, t: 'nincs', x: '7' }
            ].map((p) => (
              <button
                key={p.name}
                onClick={() => {
                  setDistinct(p.d);
                  setEvenOnly(p.e);
                  setThirdFixed(p.t);
                  setExcluded(p.x);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-100 text-purple-800 hover:bg-purple-200"
              >
                {p.name}
              </button>
            ))}
          </div>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1">
            <div>
              Rekeszes számolás: <span className="font-mono font-bold">{slotFormula}</span>
            </div>
            <div>
              A számítógép mind a 9000 négyjegyű számot végignézte: <strong className="text-purple-700">{group(digitResult.total)}</strong> megfelelő szám.
            </div>
            <div className="text-xs text-slate-500">
              Példák: {digitResult.examples.length > 0 ? digitResult.examples.join(', ') + (digitResult.total > 10 ? ', …' : '') : 'nincs ilyen szám'}
            </div>
          </div>
          <TheoryCallout type="tip" title="Egyezik a két eredmény?">
            A rekeszes szorzat és a gépi leszámlálás mindig ugyanazt adja – ha a rekeszeket jó sorrendben töltöttük ki. Figyeld meg a
            6. d) esetet: az első rekeszbe 8 kerül, mert a 0 és a 4 sem lehet az első jegy.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default PasswordsTheory;
