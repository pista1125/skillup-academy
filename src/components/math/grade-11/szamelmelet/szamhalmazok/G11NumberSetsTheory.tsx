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
  G11NumberSetsVennSvg,
  G11ClosureOperationsSvg,
  G11DecimalTypesSvg,
  G11DenominatorRuleSvg,
  G11RepeatingToFractionSvg
} from './G11NumberSetsFigures';

const DOT = '̇';

const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));

/** Prímtényezős felbontás szövegesen, pl. 990 = 2 · 3² · 5 · 11. */
const factorize = (n: number): { text: string; primes: number[] } => {
  const primes: number[] = [];
  const parts: string[] = [];
  let m = Math.abs(n);
  const sup = (e: number) => String(e).split('').map((d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[Number(d)]).join('');
  for (let p = 2; p * p <= m; p++) {
    let e = 0;
    while (m % p === 0) {
      m /= p;
      e++;
    }
    if (e > 0) {
      primes.push(p);
      parts.push(e > 1 ? `${p}${sup(e)}` : `${p}`);
    }
  }
  if (m > 1) {
    primes.push(m);
    parts.push(`${m}`);
  }
  return { text: parts.length ? parts.join(' · ') : '1', primes };
};

/** Tizedes tört alak hosszú osztással; a szakasz első és utolsó jegye fölé pont kerül. */
const decimalOf = (p: number, q: number): { text: string; finite: boolean; preLen: number; periodLen: number } => {
  const neg = p * q < 0;
  const a = Math.abs(p);
  const b = Math.abs(q);
  const intPart = Math.floor(a / b);
  let r = a % b;
  const seen = new Map<number, number>();
  const digits: number[] = [];
  while (r !== 0 && !seen.has(r) && digits.length < 60) {
    seen.set(r, digits.length);
    r *= 10;
    digits.push(Math.floor(r / b));
    r %= b;
  }
  const sign = neg ? '−' : '';
  if (r === 0) {
    return { text: sign + String(intPart) + (digits.length ? ',' + digits.join('') : ''), finite: true, preLen: digits.length, periodLen: 0 };
  }
  const start = seen.get(r) ?? 0;
  const pre = digits.slice(0, start).join('');
  const per = digits.slice(start).map(String);
  const marked = per.length === 1 ? per[0] + DOT : per[0] + DOT + per.slice(1, -1).join('') + per[per.length - 1] + DOT;
  return { text: `${sign}${intPart},${pre}${marked}`, finite: false, preLen: start, periodLen: per.length };
};

const onlyDigits = (s: string) => s.replace(/\D/g, '');

export const G11NumberSetsTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: törtvizsgáló
  const [pText, setPText] = useState<string>('2111');
  const [qText, setQText] = useState<string>('990');
  const p = Number(pText.trim().replace('−', '-'));
  const q = Number(qText.trim().replace('−', '-'));
  const validFrac = Number.isInteger(p) && Number.isInteger(q) && q !== 0 && Math.abs(p) < 1e9 && Math.abs(q) < 1e7;
  const g = validFrac ? gcd(p, q) || 1 : 1;
  const rp = validFrac ? (q < 0 ? -p / g : p / g) : 0;
  const rq = validFrac ? Math.abs(q / g) : 1;
  const fac = factorize(rq);
  const other = fac.primes.filter((x) => x !== 2 && x !== 5);
  const dec = validFrac ? decimalOf(rp, rq) : null;
  const isInt = validFrac && rq === 1;
  const setName = !validFrac ? '' : isInt ? (rp >= 0 ? 'természetes szám (N ⊂ Z ⊂ Q)' : 'egész, de nem természetes szám (Z ⊂ Q)') : 'racionális, de nem egész szám (Q)';

  // Labor II: végtelen szakaszos tizedes tört → közönséges tört
  const [intText, setIntText] = useState<string>('24');
  const [preText, setPreText] = useState<string>('17');
  const [perText, setPerText] = useState<string>('326');
  const I = Number(onlyDigits(intText) || '0');
  const pre = onlyDigits(preText);
  const per = onlyDigits(perText);
  const validRep = per.length > 0 && pre.length + per.length <= 9;
  const m = pre.length;
  const k = per.length;
  const bigMul = Math.pow(10, m + k);
  const smallMul = Math.pow(10, m);
  const numAll = Number(pre + per);
  const numPre = Number(pre || '0');
  const fracNum = numAll - numPre;
  const fracDen = smallMul * (bigMul / smallMul - 1);
  const totalNum = I * fracDen + fracNum;
  const g2 = validRep ? gcd(totalNum, fracDen) || 1 : 1;
  const display = validRep
    ? `${I},${pre}${k === 1 ? per + DOT : per[0] + DOT + per.slice(1, -1) + per[k - 1] + DOT}`
    : '';
  const bigX = validRep ? `${I}${pre}${per},${per}${per}…` : '';
  const smallX = validRep ? (m === 0 ? `${I},${per}${per}…` : `${I}${pre},${per}${per}…`) : '';

  return (
    <TheoryTemplate
      topicId="g11-szamelmelet"
      subtopicId="szamhalmazok"
      title="1. Számhalmazok"
      subtitle="A természetes, az egész és a racionális számok halmaza: melyik műveletre zártak, és mikor véges vagy végtelen szakaszos egy tört tizedes tört alakja?"
      badge="11. OSZTÁLY • IV. SZÁMELMÉLET • TANANYAG"
      themeColor="emerald"
      pdfFilename="11_osztaly_szamhalmazok_tananyag.pdf"
      practiceTitle="Készen állsz a számhalmazokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — SZÁMHALMAZOK ÉS TIZEDES TÖRTEK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center font-mono text-base font-black text-emerald-900 dark:text-emerald-200">
              N ⊂ Z ⊂ Q;  N: zárt +, ·;  Z: zárt +, −, ·;  Q: zárt +, −, ·, : (0-val nem osztunk)
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Egész szám</strong> = két természetes szám különbsége; <strong>racionális szám</strong> = két egész szám hányadosa.
              </li>
              <li>
                Minden racionális szám tizedes tört alakja <strong>véges vagy végtelen szakaszos</strong>.
              </li>
              <li>
                Az egyszerűsített tört tizedes tört alakja pontosan akkor <strong>véges</strong>, ha a nevező prímtényezői között csak a 2 és az 5 szerepel.
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Venn */}
      <TheorySection title="1. Kidolgozott feladat: számok a halmazábrán (1. feladat)" badge="Tankönyv 120. o." badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>a)</strong> Ábrázoljuk Venn-diagramon a racionális (Q), az egész (Z) és a természetes számok (N) halmazát, és helyezzük el a számokat! Érdemes előbb egyszerűsíteni: 12/2 = 6, −5/5 = −1, 7/7 = 1, −8/4 = −2, (−10)/(−5) = 2, 54/45 = 6/5.
            </p>
            <p>
              Nem eleme egyik halmaznak sem: <strong>√8 és √5</strong> (irracionális számok).
            </p>
            <TheoryCard title="b) Válassz ki két számot!" badge="Megoldás" badgeColor="emerald">
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Két természetes szám összege és szorzata is természetes: <strong>bármelyik kettő jó</strong>.</li>
                <li>Két természetes szám különbsége nem természetes: pl. 1 és 3, mert 1 − 3 = −2.</li>
                <li>Két egész szám, amelyek összege és szorzata nem egész: <strong>nincs ilyen</strong>.</li>
                <li>Különböző előjelű egészek, egész hányadossal: pl. −9 és 3, mert −9 : 3 = −3.</li>
              </ul>
            </TheoryCard>
            <TheoryCard title="c) Igaz vagy hamis?" badge="Megoldás" badgeColor="sky">
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>A) Bármely két egész szám szorzata egész: <strong>igaz</strong>.</li>
                <li>B) Bármely két természetes szám különbsége egész: <strong>igaz</strong>.</li>
                <li>C) Bármely két racionális szám összege racionális: <strong>igaz</strong>.</li>
                <li>D) Bármely két nem nulla egész hányadosa egész: <strong>hamis</strong>, pl. 3 : (−2) = −1,5.</li>
              </ul>
            </TheoryCard>
          </div>
          <G11NumberSetsVennSvg />
        </div>
      </TheorySection>

      {/* 2. Zártság */}
      <TheorySection title="2. Elmélet: melyik műveletre zárt a halmaz?" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3">
            <TheoryTable
              headers={['Halmaz', 'Összeadás', 'Kivonás', 'Szorzás', 'Osztás']}
              rows={[
                ['N (természetes)', 'zárt', 'kivezet: 1 − 3 = −2', 'zárt', 'kivezet: 1 : 2'],
                ['Z (egész)', 'zárt', 'zárt', 'zárt', 'kivezet: 3 : (−2) = −1,5'],
                ['Q (racionális)', 'zárt', 'zárt', 'zárt', 'zárt (nem 0-val)']
              ]}
            />
            <TheoryCallout type="info" title="Hogyan „születnek” az újabb számhalmazok?">
              A kivonás kivezet a természetes számok halmazából: azoknak a számoknak az összessége, amelyek felírhatók két természetes szám különbségeként, az <strong>egész számok</strong> halmaza. Az osztás kivezet az egész számok halmazából: a két egész szám hányadosaként felírható számok összessége a <strong>racionális számok</strong> halmaza.
            </TheoryCallout>
          </div>
          <G11ClosureOperationsSvg />
        </div>
      </TheorySection>

      {/* 3. Tizedes törtek */}
      <TheorySection title="3. Kidolgozott feladat: véges vagy végtelen szakaszos? (2. feladat)" badge="Tankönyv 121. o." badgeColor="teal">
        <div className="space-y-4">
          <div className="text-sm text-slate-700 leading-relaxed space-y-2">
            <p>
              Lujza a 2 számlálójú, egyjegyű pozitív nevezőjű törtek tizedes tört alakját vizsgálja: 2/1, 2/2, 2/4, 2/5, 2/8 véges (5 eset), míg 2/3, 2/6 = 1/3, 2/7, 2/9 végtelen szakaszos (4 eset). Félix számolás nélkül tudja: <strong>csak a tört egyszerűsített alakjának nevezője számít</strong>. Ha a nevezőben a 2-n és az 5-ön kívül más prímtényező is van, a tizedes tört végtelen szakaszos.
            </p>
            <p>
              Így 4 számlálóval újra 4 végtelen szakaszos tört adódik (4/3, 4/6 = 2/3, 4/7, 4/9), 5 számlálóval is 4 (5/3, 5/6, 5/7, 5/9), 6 számlálóval 2 (6/7, 6/9 = 2/3), 7 számlálóval 3 (7/3, 7/6, 7/9), a 3 számlálónál pedig csak a 3/7 és a 3/9 = 1/3 végtelen szakaszos.
            </p>
          </div>
          <G11DecimalTypesSvg />
          <TheoryTable
            headers={['Tört', 'Egyszerűsítve', 'Tizedes tört alak', 'Típus']}
            rows={[
              ['3/10', '3/10', '0,3', 'véges'],
              ['13/8', '13/8', '1,625', 'véges'],
              ['7/25', '7/25', '0,28', 'véges'],
              ['21/28', '3/4', '0,75', 'véges'],
              ['49/32', '49/32', '1,53125', 'véges'],
              ['113/5', '113/5', '22,6', 'véges'],
              ['4/9', '4/9', '0,4̇', 'végtelen szakaszos'],
              ['10/12', '5/6', '0,83̇', 'végtelen szakaszos'],
              ['2111/990', '2111/990', '2,13̇2̇', 'végtelen szakaszos'],
              ['17/11', '17/11', '1,5̇4̇', 'végtelen szakaszos']
            ]}
          />
        </div>
      </TheorySection>

      {/* 4. Elmélet tizedes */}
      <TheorySection title="4. Elmélet: a nevező prímtényezői döntenek" badge="Elmélet" badgeColor="violet">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>Véges tizedes tört</strong> alakba azok a közönséges törtek írhatók, amelyek tovább nem egyszerűsíthető alakjában a nevező prímtényezős felbontásában csak a 2 és/vagy az 5 szerepel – ezek a nevezők bővíthetők 10 valamelyik hatványára:
            </p>
            <p className="font-mono text-center">13/8 = 1625/1000 = 1,625;  3/60 = 1/20 = 5/100 = 0,05;  63/35 = 9/5 = 18/10 = 1,8.</p>
            <p>
              <strong>Végtelen szakaszos</strong> alakúak azok, amelyeknél a nevezőben más prímtényező is van: 4/9 = 0,4̇; 5/6 = 0,83̇; 17/11 = 1,5̇4̇; 18/14 = 9/7 = 1,2̇85714̇.
            </p>
            <TheoryCallout type="info" title="Jelölés">
              0,833333… = 0,83̇ (a szakasz egyetlen 3-as), 2,132323232… = 2,13̇2̇ (a szakasz első és utolsó jegye fölé teszünk pontot).
            </TheoryCallout>
            <TheoryCallout type="warning" title="Megjegyzés: 0,9̇ = 1">
              Van olyan végtelen szakaszos tizedes tört, amelynek értéke véges tizedes tört: 0,9̇ = 9 · 0,1̇ = 9 · 1/9 = 1.
            </TheoryCallout>
          </div>
          <G11DenominatorRuleSvg />
        </div>
      </TheorySection>

      {/* 5. Feladatok */}
      <TheorySection title="5. Tankönyvi feladatok" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="1. feladat: számológép nélkül" badge="Feladat" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>13/20: 20 = 2² · 5 ⇒ véges (0,65).</li>
              <li>45/72 = 5/8: 8 = 2³ ⇒ véges (0,625); 21/16 ⇒ véges (1,3125).</li>
              <li>25/15 = 5/3 ⇒ végtelen szakaszos; 39/52 = 3/4 ⇒ véges (0,75).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="2. feladat: négy feltétel" badge="Feladat" badgeColor="emerald">
            <p className="text-sm text-slate-700">
              Pozitív, véges tizedes tört, a nevező egyjegyű és 2-vel nagyobb a számlálónál, és a tört egyszerűsíthető. A jelöltek: 2/4, 4/6, 6/8 (csak páros számlálóval egyszerűsíthető). A 4/6 = 2/3 végtelen szakaszos, így a megoldás: <strong>2/4 = 1/2 és 6/8 = 3/4</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="3. feladat: hányféleképpen bontható fel a 40?" badge="Feladat" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>a) két különböző természetes szám összegére: 0 + 40, 1 + 39, …, 19 + 21 ⇒ <strong>20-féleképpen</strong>.</li>
              <li>b) két természetes szám szorzatára: 1 · 40, 2 · 20, 4 · 10, 5 · 8 ⇒ <strong>4-féleképpen</strong>.</li>
              <li>c) két egész szám összegére: <strong>végtelen sokféleképpen</strong> (pl. 41 + (−1), 42 + (−2), …).</li>
              <li>d) két különböző előjelű egész szám hányadosára: <strong>sehogy</strong>, mert ilyen hányados negatív.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Házi feladat 2.: igaz vagy hamis?" badge="Feladat" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A: természetes + egész mindig természetes – hamis: 3 + (−5) = −2.</li>
              <li>B: két racionális szám összege és szorzata is lehet természetes – igaz: 2 és 3.</li>
              <li>C: egész · racionális nem lehet egész – hamis: 2 · 1/2 = 1.</li>
              <li>D: két végtelen szakaszos összege lehet véges – igaz: 0,3̇ + 0,6̇ = 1.</li>
              <li>E: két negatív szám összege kisebb a szorzatuknál – igaz (összeg &lt; 0 &lt; szorzat).</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6. Ráadás */}
      <TheorySection title="6. Ráadás: végtelen szakaszos tizedes tört közönséges tört alakja" badge="Ráadás" badgeColor="slate">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>a)</strong> A = 24,7̇: 10A = 247,7̇, így 10A − A = 223, azaz 9A = 223, <strong>A = 223/9</strong>.
            </p>
            <p>
              <strong>b)</strong> B = 24,173̇26̇: 100B = 2417,3̇26̇ és 100 000B = 2 417 326,3̇26̇. A különbség: 99 900B = 2 414 909, így <strong>B = 2 414 909 / 99 900</strong>.
            </p>
            <p>
              <strong>Feladat:</strong> K = 6,4̇ = 58/9; L = 13,53̇ = 203/15; M = 71,81̇46̇ = 358 714 / 4995.
            </p>
          </div>
          <G11RepeatingToFractionSvg />
        </div>
      </TheorySection>

      {/* 7. Csapda */}
      <TheorySection title="7. Tipikus hiba: egyszerűsítés nélkül döntünk" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Véges-e 21/28 tizedes tört alakja?"
          wrong="28 = 2² · 7, a 7 miatt végtelen szakaszos"
          wrongExplanation="A szabály a tovább már nem egyszerűsíthető alak nevezőjére vonatkozik! A 21/28 még egyszerűsíthető 7-tel."
          correct="21/28 = 3/4, a 4 = 2², tehát véges: 0,75"
          correctExplanation="Előbb egyszerűsíts, csak utána bontsd fel a nevezőt prímtényezőkre. Hasonlóan 63/35 = 9/5 = 1,8 véges, a 3/60 = 1/20 = 0,05 is véges."
          tip="Lépések: 1) egyszerűsíts; 2) bontsd fel a nevezőt; 3) csak 2 és 5? ⇒ véges, különben végtelen szakaszos."
        />
      </TheorySection>

      {/* 8. Labor I */}
      <TheorySection title="8. Interaktív Laboratórium I: törtvizsgáló" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">számláló (egész szám)</label>
              <input type="text" value={pText} onChange={(e) => setPText(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-emerald-200 font-mono" aria-label="számláló" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">nevező (nem 0 egész szám)</label>
              <input type="text" value={qText} onChange={(e) => setQText(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-emerald-200 font-mono" aria-label="nevező" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              ['3', '10'],
              ['4', '9'],
              ['13', '8'],
              ['10', '12'],
              ['21', '28'],
              ['2111', '990'],
              ['17', '11'],
              ['18', '14'],
              ['-10', '-5'],
              ['-8', '4']
            ].map(([a, b]) => (
              <button
                key={`${a}/${b}`}
                onClick={() => {
                  setPText(a);
                  setQText(b);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
              >
                {a.replace('-', '−')}/{b.replace('-', '−')}
              </button>
            ))}
          </div>
          {!validFrac || !dec ? (
            <div className="bg-rose-50 rounded-xl border border-rose-200 p-4 text-sm font-bold text-rose-700">
              Adj meg egész számlálót és 0-tól különböző egész nevezőt!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4 space-y-1">
                <div className="font-bold text-emerald-800">Egyszerűsítés és nevező</div>
                <div>
                  {pText}/{qText} {g > 1 || q < 0 ? `= ${rp}/${rq}` : '(tovább nem egyszerűsíthető)'}
                </div>
                <div>
                  nevező: {rq} = {fac.text}
                </div>
                <div>
                  {other.length === 0 ? 'Csak 2 és 5 prímtényező ⇒ ' : `Más prímtényező is van (${other.join(', ')}) ⇒ `}
                  <strong>{dec.finite ? 'véges tizedes tört' : 'végtelen szakaszos tizedes tört'}</strong>
                </div>
              </div>
              <div className="bg-teal-50 rounded-xl border border-teal-200 p-4 space-y-1">
                <div className="font-bold text-teal-800">Tizedes tört alak (hosszú osztással)</div>
                <div className="text-lg font-mono">
                  {rp}/{rq} = <strong className="text-teal-900">{dec.text}</strong>
                </div>
                {!dec.finite && (
                  <div>
                    előszakasz: {dec.preLen} jegy, szakasz hossza: {dec.periodLen} jegy
                  </div>
                )}
                <div>
                  A szám: <strong>{setName}</strong>
                </div>
              </div>
            </div>
          )}
        </div>
      </TheorySection>

      {/* 9. Labor II */}
      <TheorySection title="9. Interaktív Laboratórium II: szakaszos tizedes tört → közönséges tört" badge="Labor" badgeColor="teal">
        <div className="bg-white border-2 border-teal-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">egészrész</label>
              <input type="text" value={intText} onChange={(e) => setIntText(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-teal-200 font-mono" aria-label="egészrész" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">nem ismétlődő jegyek (lehet üres)</label>
              <input type="text" value={preText} onChange={(e) => setPreText(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-teal-200 font-mono" aria-label="nem ismétlődő jegyek" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">ismétlődő szakasz</label>
              <input type="text" value={perText} onChange={(e) => setPerText(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-teal-200 font-mono" aria-label="ismétlődő szakasz" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              ['24', '', '7'],
              ['24', '17', '326'],
              ['6', '', '4'],
              ['13', '5', '3'],
              ['71', '8', '146'],
              ['0', '', '9']
            ].map(([a, b, c]) => (
              <button
                key={`${a}-${b}-${c}`}
                onClick={() => {
                  setIntText(a);
                  setPreText(b);
                  setPerText(c);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-teal-50 text-teal-800 hover:bg-teal-100"
              >
                {a},{b}
                {c.length === 1 ? c + DOT : c[0] + DOT + c.slice(1, -1) + c[c.length - 1] + DOT}
              </button>
            ))}
          </div>
          {!validRep ? (
            <div className="bg-rose-50 rounded-xl border border-rose-200 p-4 text-sm font-bold text-rose-700">
              Adj meg legalább egy ismétlődő jegyet (összesen legfeljebb 9 tizedesjegyet)!
            </div>
          ) : (
            <div className="bg-teal-50 rounded-xl border border-teal-200 p-4 space-y-1 text-sm font-mono">
              <div>x = {display}</div>
              <div>
                {bigMul.toLocaleString('hu-HU')}x = {bigX}
              </div>
              <div>
                {smallMul === 1 ? '' : smallMul.toLocaleString('hu-HU')}x = {smallX}
              </div>
              <div>
                ({bigMul.toLocaleString('hu-HU')} − {smallMul.toLocaleString('hu-HU')})x = {fracDen.toLocaleString('hu-HU')}x = {totalNum.toLocaleString('hu-HU')}
              </div>
              <div className="text-lg font-sans">
                x = {totalNum}/{fracDen}
                {g2 > 1 ? ` = ${totalNum / g2}/${fracDen / g2}` : ''}
                {fracDen / g2 === 1 ? '  (egész szám!)' : ''}
              </div>
            </div>
          )}
          <TheoryCallout type="tip" title="A módszer lényege">
            Az eredeti szám olyan többszöröseit hozzuk létre (10 megfelelő hatványaival szorozva), amelyekben a tizedesjegyek megegyeznek – így a két szám különbsége egész szám lesz.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default G11NumberSetsTheory;
