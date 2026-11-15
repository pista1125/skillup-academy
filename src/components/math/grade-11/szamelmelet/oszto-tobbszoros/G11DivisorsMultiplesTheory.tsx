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
  DivisorPairsSvg,
  FactorTreeSvg,
  DivisionLadderSvg,
  DivisorCountBarsSvg,
  PrimeTestSvg
} from './G11DivisorsMultiplesFigures';

const SUP: Record<string, string> = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
const sup = (n: number) => String(n).split('').map((c) => SUP[c]).join('');
const fmtInt = (x: number) => x.toLocaleString('hu-HU');

/** Osztólétra: [szám, prímosztó] lépések. */
const ladder = (n: number): [number, number][] => {
  const rows: [number, number][] = [];
  let m = n;
  let p = 2;
  while (m > 1) {
    if (p * p > m) {
      rows.push([m, m]);
      m = 1;
      break;
    }
    if (m % p === 0) {
      rows.push([m, p]);
      m /= p;
    } else p += p === 2 ? 1 : 2;
  }
  return rows;
};

const factorize = (n: number): [number, number][] => {
  const res: [number, number][] = [];
  ladder(n).forEach(([, p]) => {
    const last = res[res.length - 1];
    if (last && last[0] === p) last[1]++;
    else res.push([p, 1]);
  });
  return res;
};

const divisorsOf = (n: number): number[] => {
  const small: number[] = [];
  const large: number[] = [];
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      small.push(i);
      if (i * i !== n) large.unshift(n / i);
    }
  }
  return [...small, ...large];
};

export const G11DivisorsMultiplesTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: Eratoszthenész szitája
  const [limit, setLimit] = useState<number>(100);
  const [steps, setSteps] = useState<number>(0);

  const sieve = useMemo(() => {
    const isPrime = new Array(limit + 1).fill(true);
    isPrime[0] = false;
    isPrime[1] = false;
    const order: number[] = [];
    for (let p = 2; p * p <= limit; p++) {
      if (isPrime[p]) {
        order.push(p);
        for (let k = p * p; k <= limit; k += p) isPrime[k] = false;
      }
    }
    return { order, isPrime };
  }, [limit]);

  const done = Math.min(steps, sieve.order.length);
  const crossedBy = useMemo(() => {
    const by = new Array(limit + 1).fill(0);
    for (let s = 0; s < done; s++) {
      const p = sieve.order[s];
      for (let k = 2 * p; k <= limit; k += p) if (!by[k]) by[k] = p;
    }
    return by;
  }, [limit, done, sieve]);
  const current = done > 0 ? sieve.order[done - 1] : null;
  const finished = done >= sieve.order.length;
  const nextP = finished ? null : sieve.order[done];
  const remaining = Array.from({ length: limit - 1 }, (_, i) => i + 2).filter((k) => !crossedBy[k]).length;
  const primeCount = sieve.isPrime.filter(Boolean).length;

  // Labor II: prímtényezős felbontás és osztók
  const [numText, setNumText] = useState<string>('630');
  const num = Math.floor(Number(numText.replace(/\s/g, '')));
  const valid = Number.isFinite(num) && num >= 2 && num <= 10000000;
  const lad = valid ? ladder(num) : [];
  const fac = valid ? factorize(num) : [];
  const canon = fac.map(([p, e]) => (e > 1 ? `${p}${sup(e)}` : `${p}`)).join(' · ');
  const dCount = fac.reduce((a, [, e]) => a * (e + 1), 1);
  const divs = valid && dCount <= 64 ? divisorsOf(num) : [];
  const root = valid ? Math.sqrt(num) : 0;
  const pairs = divs.filter((d) => d * d <= num).map((d) => [d, num / d]);

  return (
    <TheoryTemplate
      topicId="g11-szamelmelet"
      subtopicId="oszto-tobbszoros"
      title="2. Osztó, többszörös"
      subtitle="Mikor osztója egy szám egy másiknak? Prímszámok, összetett számok, osztópárok és a prímtényezős felbontás."
      badge="11. OSZTÁLY • IV. SZÁMELMÉLET • TANANYAG"
      themeColor="emerald"
      pdfFilename="11_osztaly_oszto_tobbszoros_tananyag.pdf"
      practiceTitle="Készen állsz az osztókról és prímekről szóló feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — AZ OSZTHATÓSÁG DEFINÍCIÓJA',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center font-mono text-base font-black text-emerald-900 dark:text-emerald-200">
              a | b ⟺ van olyan c pozitív egész, hogy a · c = b
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Ekkor <strong>a osztója b-nek</strong>, és <strong>b többszöröse a-nak</strong>. Pl. 27 | 81, mert 27 · 3 = 81; de 13 ∤ 20.</li>
              <li><strong>Prímszám:</strong> pontosan két pozitív osztója van. <strong>Összetett szám:</strong> kettőnél több. Az 1 egyik sem.</li>
              <li>Minden összetett szám a tényezők sorrendjétől eltekintve <strong>egyértelműen</strong> felbontható prímszámok szorzatára.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: takarók és élelmiszercsomagok" badge="Tankönyv 124. o." badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>a)</strong> Egy karitatív egyesület 81 takarót gyűjtött, és ezeket menedékhelyek között <strong>egyenlően</strong> osztotta szét. Hány menedékhelyet segíthetett meg?
            </p>
            <p>
              Az egyenlő elosztás akkor lehetséges, ha a menedékhelyek száma a 81 <strong>osztója</strong>: 1; 3; 9; 27 vagy 81.
            </p>
            <p>
              <strong>b)</strong> 196 egyforma élelmiszercsomag egyenlő elosztása 1; 2; 4; 7; 14; 28; 49; 98 vagy 196 szállás között lehetséges – ezek a 196 osztói.
            </p>
            <TheoryCallout type="info" title="Osztó és többszörös ugyanannak a viszonynak két oldala">
              a | b jelentése: „b osztható a-val” = „a osztója b-nek” = „b többszöröse a-nak”. Az oszthatóságot a pozitív egészek halmazán értelmezzük.
            </TheoryCallout>
          </div>
          <DivisorPairsSvg />
        </div>
      </TheorySection>

      {/* 2. Kidolgozott feladat 1 */}
      <TheorySection title="2. Kidolgozott feladat: osztók táblázata" badge="1. kidolgozott feladat" badgeColor="teal">
        <p className="text-sm text-slate-700 mb-3">
          Határozzuk meg az 1; 7; 20; 30; 81; 143; 196; 349; 455 számok pozitív osztóit! Az osztókat <strong>osztópárokba</strong> rendezzük: a pár két tagjának szorzata maga a szám.
        </p>
        <TheoryTable
          headers={['Szám', 'Osztópárok', 'Osztók száma']}
          rows={[
            ['1', '1', '1'],
            ['7', '1 · 7', '2'],
            ['20', '1 · 20; 2 · 10; 4 · 5', '6'],
            ['30', '1 · 30; 2 · 15; 3 · 10; 5 · 6', '8'],
            ['81', '1 · 81; 3 · 27; 9 · 9', '5'],
            ['143', '1 · 143; 11 · 13', '4'],
            ['196', '1 · 196; 2 · 98; 4 · 49; 7 · 28; 14 · 14', '9'],
            ['349', '1 · 349', '2'],
            ['455', '1 · 455; 5 · 91; 7 · 65; 13 · 35', '8']
          ]}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TheoryCard title="Válaszok a kérdésekre" badge="a)–c)" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>a)</strong> Mindegyik számnak osztója az <strong>1</strong>.</li>
              <li><strong>b)</strong> Az egymás mellé írt osztók szorzata az eredeti szám: ezek az <strong>osztópárok</strong>.</li>
              <li><strong>c)</strong> Az osztók száma akkor páratlan, ha egy osztó önmaga párja – vagyis ha a szám <strong>négyzetszám</strong> (81 = 9 · 9, 196 = 14 · 14).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Válaszok a kérdésekre" badge="d)–f)" badgeColor="teal">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>d)</strong> Egy pozitív egész biztosan többszöröse az <strong>1</strong>-nek és <strong>önmagának</strong>.</li>
              <li><strong>e)</strong> Pontosan két osztója van a 2, 3, 5, 7 egyjegyű számoknak.</li>
              <li><strong>f)</strong> Nem igaz, hogy a nagyobb számnak több osztója van: 30 &lt; 349, de a 30-nak 8, a 349-nek csak 2 osztója van.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. Csoportosítás */}
      <TheorySection title="3. A pozitív egészek csoportosítása az osztók száma szerint" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700">
            <p>
              Minden pozitív egész osztható 1-gyel és önmagával – ezek a <strong>nem valódi osztók</strong>. A többi pozitív osztó a <strong>valódi osztó</strong> (pl. a 20 valódi osztói: 2, 4, 5, 10).
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Az <strong>1</strong>-nek egyetlen osztója van.</li>
              <li>A <strong>prímszámoknak</strong> pontosan két pozitív osztójuk van (2, 3, 37, 43…). Az egyetlen páros prím a 2.</li>
              <li>Az <strong>összetett számoknak</strong> kettőnél több pozitív osztójuk van (4, 6, 12, 3000…).</li>
              <li>Az 1 <strong>sem nem prím, sem nem összetett</strong>. Bebizonyítható, hogy <strong>végtelen sok prím</strong> van.</li>
            </ul>
          </div>
          <DivisorCountBarsSvg />
        </div>
        <TheoryCallout type="warning" title="Kitérő: a 0 oszthatósága">
          Ha az oszthatóságot a természetes számokra terjesztjük ki: a 0 osztható 0-val, és a 0-nak <strong>minden</strong> természetes szám osztója (végtelen sok osztója van). Az oszthatóság két szám <strong>viszonya</strong> (reláció), nem azonos az osztás műveletével – 0-val osztani továbbra sem lehet!
        </TheoryCallout>
      </TheorySection>

      {/* 4. Prímtényezős felbontás */}
      <TheorySection title="4. A számelmélet alaptétele és a prímtényezős felbontás" badge="2. kidolgozott feladat" badgeColor="amber">
        <TheoryCallout type="success" title="Tétel">
          Minden összetett szám felbontható prímszámok szorzatára, és ez a felbontás <strong>egyértelmű</strong>, ha a tényezők sorrendjét nem vesszük figyelembe. Ez a szám <strong>prímtényezős felbontása</strong>.
        </TheoryCallout>
        <p className="text-sm text-slate-700 my-3">
          <strong>Feladat:</strong> egyszerűsítsük a 630 / 525 törtet! Bontsuk fel mindkét számot prímek szorzatára – kétféle módszerrel is.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="1. módszer: tetszőleges tényezőkre bontás (fa)" badge="Prímtényező-fa" badgeColor="emerald">
            <FactorTreeSvg className="w-full h-auto mb-2" />
            <p className="text-sm text-slate-700">630 = 10 · 63 = (2 · 5) · (7 · 9) = 2 · 5 · 7 · 3 · 3. Akárhogyan kezdjük, ugyanazok a prímek jönnek ki.</p>
          </TheoryCard>
          <TheoryCard title="2. módszer: mindig prímmel osztunk (létra)" badge="Osztólétra" badgeColor="teal">
            <DivisionLadderSvg className="w-full h-auto mb-2" />
            <p className="text-sm text-slate-700">630 = 2 · 3² · 5 · 7, 525 = 3 · 5² · 7.</p>
          </TheoryCard>
        </div>
        <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center font-mono text-sm md:text-base text-emerald-900 font-bold">
          630 / 525 = (2 · 3 · 3 · 5 · 7) / (3 · 5 · 5 · 7) = (2 · 3) / 5 = 6 / 5
        </div>
        <TheoryCallout type="tip" title="Megfigyelés: az osztók száma a kitevőkből">
          Ha n = p<sup>a</sup> · q<sup>b</sup> · r<sup>c</sup>, akkor n minden osztója p<sup>i</sup> · q<sup>j</sup> · r<sup>k</sup> alakú (0 ≤ i ≤ a, 0 ≤ j ≤ b, 0 ≤ k ≤ c), így az osztók száma (a + 1)(b + 1)(c + 1). Pl. 450 = 2 · 3² · 5² osztóinak száma 2 · 3 · 3 = <strong>18</strong>, az 1485 = 3³ · 5 · 11 osztóinak száma 4 · 2 · 2 = <strong>16</strong>.
        </TheoryCallout>
      </TheorySection>

      {/* 5. Prímteszt */}
      <TheorySection title="5. Kidolgozott feladat: prím-e a 211?" badge="3. kidolgozott feladat" badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              2-vel kezdve próbálgatjuk a prímeket: a 211 nem osztható 2-vel, 3-mal, 5-tel, 7-tel, 11-gyel, 13-mal… <strong>Meddig érdemes próbálkozni?</strong>
            </p>
            <p>
              A 72 felbontásai: 1 · 72, 2 · 36, 3 · 24, 4 · 18, 6 · 12, 8 · 9 – a 8 · 9 után ugyanezek a párok jönnek fordított sorrendben. Ha egy számot két tényező szorzatára bontunk, akkor vagy <strong>mindkét tényező a szám négyzetgyöke</strong> (64 = 8 · 8), vagy <strong>az egyik kisebb, a másik nagyobb a négyzetgyökénél</strong> (72 = 6 · 12).
            </p>
            <p>
              √211 ≈ 14,5. Mivel 14,5-nél kisebb prímosztót (2, 3, 5, 7, 11, 13) nem találtunk, nagyobbat sem fogunk: a <strong>211 prímszám</strong>.
            </p>
          </div>
          <PrimeTestSvg />
        </div>
      </TheorySection>

      {/* 6. Feladatok eredményei */}
      <TheorySection title="6. Tankönyvi feladatok – ellenőrzött eredmények" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TheoryCard title="Órai feladatok" badge="Feladat" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>1.</strong> 700 = 2² · 5² · 7; 990 = 2 · 3² · 5 · 11; 873 = 3² · 97; 1221 = 3 · 11 · 37.</li>
              <li><strong>2.</strong> 483 / 1827 = (3 · 7 · 23) / (3² · 7 · 29) = 23 / 87; 10 450 / 19 125 = 418 / 765.</li>
              <li><strong>4.</strong> (p a többitől különböző prím) a) 3² · 5 · p hamis (p = 2 is lehet); b) 2 · p · 7 ≥ 42 igaz; c) 2 · p · 5 · 7 0-ra végződik igaz; d) p² · 5 · 3 nem lehet négyzetszám – hamis; e) 2³ · 5 · 11 · p nem lehet 32 többszöröse – hamis.</li>
              <li><strong>5.</strong> 450 = 2 · 3² · 5², osztói 2<sup>i</sup> · 3<sup>j</sup> · 5<sup>k</sup> alakúak – 18 darab.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Házi feladatok" badge="Ellenőrzés" badgeColor="slate">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>1.</strong> 240 = 2⁴ · 3 · 5; 231 = 3 · 7 · 11; 435 = 3 · 5 · 29; 10 000 = 2⁴ · 5⁴; 75 000 = 2³ · 3 · 5⁵; 315 000 = 2³ · 3² · 5⁴ · 7.</li>
              <li><strong>2.</strong> 4851 / 594 = (3² · 7² · 11) / (2 · 3³ · 11) = 49 / 6; 680 / 1071 = 40 / 63.</li>
              <li><strong>3.</strong> 1485 = 3³ · 5 · 11, 16 osztó: 1, 3, 5, 9, 11, 15, 27, 33, 45, 55, 99, 135, 165, 297, 495, 1485.</li>
              <li><strong>4.</strong> A 180 cm-es szalag darabjainak hossza a 180 osztói: 18 lehetőség (1, 2, 3, 4, 5, 6, 9, 10, 12, 15, 18, 20, 30, 36, 45, 60, 90, 180 cm).</li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryCallout type="info" title="Ráadás: prímek és titkosítás">
          A modern titkosítás azon alapul, hogy két nagyon nagy prím szorzatának osztóit rendkívül hosszadalmas megtalálni, de ha az egyik prímet ismerjük, a másik egy osztással megkapható. A 2018 decemberében talált legnagyobb ismert prím 24 862 048 számjegyből áll.
        </TheoryCallout>
      </TheorySection>

      {/* 7. Csapda */}
      <TheorySection title="7. Tipikus hiba: az 1 és a prímtényezős alak" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Az 1 nem prím, a 9 nem prímtényező!"
          wrong="630 = 1 · 2 · 9 · 5 · 7 – ez a prímtényezős felbontás"
          wrongExplanation="Az 1-nek csak egy osztója van, ezért nem prímszám (és nem is összetett) – a felbontásba nem írjuk. A 9 = 3 · 3 összetett szám, tovább kell bontani."
          correct="630 = 2 · 3² · 5 · 7"
          correctExplanation="A prímtényezős alakban csak prímek szerepelnek, az azonos prímeket hatványként írjuk. A felbontás – a sorrendtől eltekintve – egyértelmű."
          tip="Prímteszt: elég a szám négyzetgyökéig próbálkozni a prímekkel. Ha addig nincs osztó, a szám prím."
        />
      </TheorySection>

      {/* 8. Labor I */}
      <TheorySection title="8. Interaktív Laboratórium I: Eratoszthenész szitája" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">a szita felső határa: {limit}</label>
              <input
                type="range"
                min="30"
                max="200"
                step="10"
                value={limit}
                onChange={(e) => {
                  setLimit(Number(e.target.value));
                  setSteps(0);
                }}
                className="w-full accent-emerald-600"
                aria-label="a szita felső határa"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSteps((s) => Math.min(s + 1, sieve.order.length))}
                disabled={finished}
                className="flex-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-40"
              >
                {nextP ? `Következő lépés: ${nextP} többszörösei` : 'A szitálás kész'}
              </button>
              <button onClick={() => setSteps(sieve.order.length)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                Mind
              </button>
              <button onClick={() => setSteps(0)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200">
                Újra
              </button>
            </div>
          </div>
          <div className="grid grid-cols-10 gap-1">
            {Array.from({ length: limit }, (_, i) => i + 1).map((k) => {
              const by = crossedBy[k];
              const isCur = current !== null && k === current;
              const justNow = current !== null && by === current;
              const survivedPrime = k > 1 && !by && (finished || (current !== null && k <= current));
              let cls = 'bg-white text-slate-800 border-slate-200';
              if (k === 1) cls = 'bg-slate-100 text-slate-400 border-slate-200';
              else if (isCur) cls = 'bg-emerald-600 text-white border-emerald-700';
              else if (justNow) cls = 'bg-amber-100 text-amber-700 border-amber-300 line-through';
              else if (by) cls = 'bg-slate-100 text-slate-400 border-slate-200 line-through';
              else if (survivedPrime) cls = 'bg-emerald-100 text-emerald-900 border-emerald-300 font-black';
              return (
                <div key={k} className={`text-center text-[11px] md:text-xs py-1 rounded border ${cls}`}>
                  {k}
                </div>
              );
            })}
          </div>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1">
            {current === null ? (
              <div>Az 1-et rögtön kihúzzuk (nem prím). Kezdjük a 2-vel: ő prím, a többszöröseit kihúzzuk.</div>
            ) : (
              <div>
                <strong>{current}</strong> prím; kihúztuk a többszöröseit (az első „új” kihúzott szám {current}² = {current * current}, mert a kisebb többszörösöket egy kisebb prím már kihúzta).
              </div>
            )}
            <div>
              Még nem kihúzott számok (2-től): <strong>{remaining}</strong>
            </div>
            {finished ? (
              <div className="font-bold text-emerald-800">
                Kész! A következő prím négyzete már nagyobb {limit}-nél, ezért minden megmaradt szám prím: {primeCount} prím van {limit}-ig.
              </div>
            ) : (
              <div className="text-xs text-slate-500">
                Elég √{limit} ≈ {Math.sqrt(limit).toFixed(2).replace('.', ',')}-ig szitálni: a legnagyobb szükséges prím {sieve.order[sieve.order.length - 1]}.
              </div>
            )}
          </div>
        </div>
      </TheorySection>

      {/* 9. Labor II */}
      <TheorySection title="9. Interaktív Laboratórium II: Prímtényezők és osztók" badge="Labor" badgeColor="teal">
        <div className="bg-white border-2 border-teal-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-end gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">a szám (2 – 10 000 000)</label>
              <input
                type="text"
                inputMode="numeric"
                value={numText}
                onChange={(e) => setNumText(e.target.value)}
                className="w-40 px-3 py-1.5 rounded-lg border border-slate-300 font-mono"
                aria-label="a felbontandó szám"
              />
            </div>
            {[81, 196, 211, 450, 630, 1485, 180, 315000].map((v) => (
              <button
                key={v}
                onClick={() => setNumText(String(v))}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${num === v ? 'bg-teal-600 text-white' : 'bg-teal-50 text-teal-800 hover:bg-teal-100'}`}
              >
                {fmtInt(v)}
              </button>
            ))}
          </div>
          {!valid ? (
            <div className="text-sm font-bold text-rose-700">Adj meg egy 2 és 10 000 000 közötti egész számot!</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-teal-200 p-3">
                <div className="text-xs font-bold text-teal-700 mb-2">Osztólétra</div>
                <table className="font-mono text-sm mx-auto">
                  <tbody>
                    {lad.map(([m, p], i) => (
                      <tr key={i}>
                        <td className="pr-2 text-right">{fmtInt(m)}</td>
                        <td className="pl-2 border-l-2 border-teal-500 text-teal-700 font-bold">{p}</td>
                      </tr>
                    ))}
                    <tr>
                      <td className="pr-2 text-right">1</td>
                      <td className="pl-2 border-l-2 border-teal-500"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="md:col-span-2 space-y-3 text-sm text-slate-700">
                <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 font-mono font-bold text-teal-900">
                  {fmtInt(num)} = {canon}
                </div>
                <div>
                  {dCount === 2 ? (
                    <span className="font-bold text-emerald-700">
                      PRÍMSZÁM – a √{fmtInt(num)} ≈ {root.toFixed(2).replace('.', ',')} alatti prímek egyike sem osztója.
                    </span>
                  ) : (
                    <span className="font-bold text-amber-700">ÖSSZETETT SZÁM – legkisebb prímosztója {fac[0][0]}.</span>
                  )}
                </div>
                <div>
                  Osztók száma: {fac.map(([, e]) => `(${e} + 1)`).join(' · ')} = <strong>{dCount}</strong>
                  {Number.isInteger(root) ? ' – páratlan, mert a szám négyzetszám.' : ''}
                </div>
                {divs.length > 0 ? (
                  <div>
                    <div className="text-xs font-semibold text-slate-500 mb-1">Osztópárok (a ≤ √n ≤ b):</div>
                    <div className="flex flex-wrap gap-1.5">
                      {pairs.map(([a, b]) => (
                        <span key={a} className="px-2 py-0.5 rounded-lg bg-white border border-teal-200 font-mono text-xs">
                          {fmtInt(a)} · {fmtInt(b)}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-slate-500">Túl sok osztó a felsoroláshoz (több mint 64).</div>
                )}
              </div>
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default G11DivisorsMultiplesTheory;
