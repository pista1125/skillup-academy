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
  BonbonPackingSvg,
  PlaceValueTableSvg,
  BinaryPlaceValueSvg,
  HexPlaceValueSvg,
  DigitSetsSvg
} from './NumeralSystems1Figures';

const SYMBOLS = '0123456789ABCDEF';

/** Szám alsó indexes alapszámmal (pl. 943₁₂). */
const B: React.FC<{ v: string; b: number | string }> = ({ v, b }) => (
  <span className="whitespace-nowrap font-semibold">
    {v}
    <sub className="text-[0.7em]">{b}</sub>
  </span>
);

const toBase = (n: number, b: number): string => {
  if (n === 0) return '0';
  let s = '';
  let m = n;
  while (m > 0) {
    s = SYMBOLS[m % b] + s;
    m = Math.floor(m / b);
  }
  return s;
};

const fmt = (x: number) => x.toLocaleString('hu-HU');

export const NumeralSystems1Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: bitkapcsolók (b7 … b0)
  const [bits, setBits] = useState<number[]>([1, 0, 0, 1, 1, 0, 1, 0]);
  const value = bits.reduce((s, bit, i) => s + bit * 2 ** (7 - i), 0);
  const setFromDecimal = (n: number) => {
    const c = Math.max(0, Math.min(255, Math.floor(n) || 0));
    setBits(Array.from({ length: 8 }, (_, i) => (c >> (7 - i)) & 1));
  };
  const onTerms = bits.map((bit, i) => (bit ? 2 ** (7 - i) : 0)).filter((x) => x > 0);

  // Labor II: csomagológép – tízesből b-esbe és vissza
  const [base, setBase] = useState<number>(12);
  const [nText, setNText] = useState<string>('1347');
  const N = Math.min(999999, Math.max(0, parseInt(nText.replace(/\D/g, ''), 10) || 0));
  const steps: { q: number; r: number; n: number }[] = [];
  {
    let m = N;
    while (m > 0) {
      steps.push({ n: m, q: Math.floor(m / base), r: m % base });
      m = Math.floor(m / base);
    }
  }
  const converted = toBase(N, base);
  const [digitText, setDigitText] = useState<string>('1A7B');
  const clean = digitText.toUpperCase().replace(/\s/g, '');
  const invalid = clean.split('').filter((c) => {
    const d = SYMBOLS.indexOf(c);
    return d < 0 || d >= base;
  });
  const digitVals = clean.split('').map((c) => SYMBOLS.indexOf(c));
  const back = invalid.length === 0 && clean.length > 0 ? digitVals.reduce((s, d) => s * base + d, 0) : null;

  return (
    <TheoryTemplate
      topicId="g11-szamelmelet"
      subtopicId="szamrendszerek-1"
      title="7. Számrendszerek I."
      subtitle="Csoportosítás tucatonként, helyiérték-táblázat, átírás tízes számrendszerbe – és a számítógépek kettes számrendszere."
      badge="11. OSZTÁLY • IV. SZÁMELMÉLET • TANANYAG"
      themeColor="emerald"
      pdfFilename="11_osztaly_szamrendszerek_1_tananyag.pdf"
      practiceTitle="Készen állsz a számrendszerek közötti átváltásra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A HELYI ÉRTÉK AZ ALAPSZÁM HATVÁNYA',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center font-mono text-base font-black text-emerald-900 dark:text-emerald-200">
              <B v="20123" b={4} /> = 2 · 4⁴ + 0 · 4³ + 1 · 4² + 2 · 4 + 3 = 539
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Az n-es számrendszerben <strong>n darab számjegy</strong> van: 0, 1, …, n − 1 (10 felett A = 10, B = 11, …, F = 15).</li>
              <li>Jobbról balra a helyi értékek: 1, n, n², n³, … A valódi érték = alaki érték · helyi érték.</li>
              <li>Az alapszámot jobb alsó indexben jelöljük (<B v="943" b={12} />); index nélkül tízes számrendszerbeli a szám.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: a csokigyár csomagológépe" badge="Tankönyv 142. o." badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A gép 12 bonbont tesz egy díszdobozba (1 tucat), és 12 díszdobozt egy kartonba (1 nagytucat = 12 · 12 = 144 bonbon). A számláló 1347 bonbont jelzett. Hány doboz telt meg?
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>1347 : 12 = 112, maradék <strong>3</strong> → 112 díszdoboz és 3 bonbon.</li>
              <li>112 : 12 = 9, maradék <strong>4</strong> → <strong>9</strong> karton és 4 díszdoboz.</li>
            </ul>
            <p>
              1347 bonbon = 9 nagytucat + 4 tucat + 3 darab, ezért Bence ezt írta: <B v="943" b={12} />. Ez a 9 · 12² + 4 · 12 + 3 összeget jelenti.
            </p>
            <p>
              Tízes csomagolással (10 bonbon egy dobozba, 10 doboz egy kartonba) ugyanez: 1347 = 1 · 10³ + 3 · 10² + 4 · 10 + 7.
            </p>
            <TheoryCallout type="tip" title="1. feladat: 8-as csomagolás">
              8 bonbon kerül egy díszdobozba, 8 díszdoboz egy kartonba; a számláló: <B v="725" b={8} />. Ez 7 · 64 + 2 · 8 + 5 = <strong>469</strong> bonbon, 12-es számrendszerben <B v="331" b={12} /> (3 · 144 + 3 · 12 + 1 = 469).
            </TheoryCallout>
          </div>
          <BonbonPackingSvg />
        </div>
      </TheorySection>

      {/* 2. Elmélet */}
      <TheorySection title="2. A tízes számrendszer és más számrendszerek" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A <strong>helyi értékes</strong> tízes számrendszerben a dolgokat tízesével csoportosítjuk, és feljegyezzük, hány maradt ki a csoportosításból:
            </p>
            <p className="font-mono text-slate-800">15 823 = 1 · 10⁴ + 5 · 10³ + 8 · 10² + 2 · 10 + 3</p>
            <p>
              A többi számrendszer alapelve ugyanez. <strong>Minden számrendszerben annyi számjegy kell, amennyi az alapszám</strong>: a kettesben 0 és 1, a nyolcasban 0–7, a tizenkettesben 0–9 és A = 10, B = 11.
            </p>
            <p>
              A <strong>kettes számrendszer</strong> technikai alkalmazása <strong>Neumann János</strong> (1903–1957) nevéhez fűződik: ő alkotta meg a számítógépek alapjául szolgáló elveket, melyek egyike a kettes számrendszer használata.
            </p>
          </div>
          <DigitSetsSvg />
        </div>
      </TheorySection>

      {/* 3. Kidolgozott feladatok */}
      <TheorySection title="3. Kidolgozott feladatok: átírás tízes számrendszerbe" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) 20123₄ tízes számrendszerben" badge="1. kidolgozott" badgeColor="emerald">
            <PlaceValueTableSvg className="w-full h-auto mb-3" />
            <p className="text-sm text-slate-700">
              Helyiérték-táblázatba írjuk a számjegyeket: <B v="20123" b={4} /> = 2 · 4⁴ + 0 · 4³ + 1 · 4² + 2 · 4¹ + 3 · 4⁰ = 512 + 0 + 16 + 8 + 3 = <strong>539</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="B) 1A7B₁₂ tízes számrendszerben" badge="2. kidolgozott" badgeColor="amber">
            <p className="text-sm text-slate-700">
              <B v="1A7B" b={12} /> = 1 · 12³ + A · 12² + 7 · 12 + B = 1 · 1728 + 10 · 144 + 7 · 12 + 11 = 1728 + 1440 + 84 + 11 = <strong>3263</strong>.
            </p>
            <p className="text-sm text-slate-600 mt-2">Megjegyzés: <B v="1A7B" b={12} /> így is írható: 1(10)7(11)<sub>12</sub>.</p>
          </TheoryCard>
        </div>
        <TheoryTable
          headers={['Feladat', 'Számolás', 'Eredmény']}
          rows={[
            [<B key="a" v="2113" b={4} />, '2 · 64 + 1 · 16 + 1 · 4 + 3', '151'],
            [<B key="b" v="3114" b={5} />, '3 · 125 + 1 · 25 + 1 · 5 + 4', '409'],
            [<B key="c" v="6142" b={7} />, '6 · 343 + 1 · 49 + 4 · 7 + 2', '2137'],
            [<B key="d" v="6142" b={8} />, '6 · 512 + 1 · 64 + 4 · 8 + 2', '3170'],
            [<span key="e">sorrend (3. feladat)</span>, '34₆ = 22, 34₇ = 25, 43₆ = 27, 34₈ = 28, 43₇ = 31, 43₈ = 35', '34₆ < 34₇ < 43₆ < 34₈ < 43₇ < 43₈']
          ]}
        />
      </TheorySection>

      {/* 4. Összeadás, feladatok */}
      <TheorySection title="4. Összeadás más számrendszerekben, Bonifác tábora" badge="Feladatok" badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="4–5. feladat: összeadás" badge="Feladat" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><B v="1000" b={5} /> + <B v="100" b={5} /> + <B v="10" b={5} /> + <B v="1" b={5} /> = <B v="1111" b={5} /> (= 156).</li>
              <li><B v="20000" b={5} /> + <B v="3000" b={5} /> + <B v="20" b={5} /> + <B v="3" b={5} /> = <B v="23023" b={5} /> (= 1638).</li>
              <li><B v="111" b={2} /> + <B v="1" b={2} /> = <B v="1000" b={2} />; <B v="222" b={3} /> + <B v="1" b={3} /> = <B v="1000" b={3} />; <B v="555" b={6} /> + <B v="1" b={6} /> = <B v="1000" b={6} />; 999 + 1 = 1000.</li>
              <li>A legnagyobb jegy + 1 mindig „átvitelt” okoz: <B v="(n−1)(n−1)(n−1)" b="n" /> + 1 = <B v="1000" b="n" /> = n³.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="6. feladat: Bonifác matektábora" badge="Feladat" badgeColor="rose">
            <p className="text-sm text-slate-700">„Összesen 1000 diák volt, közülük 143 lány és 302 fiú.” Melyik számrendszerben?</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-slate-700">
              <li>Alapszám n (n ≥ 5, mert van 4-es számjegy): n³ = (n² + 4n + 3) + (3n² + 2).</li>
              <li>n³ − 4n² − 4n − 5 = 0, és n = 5-re 125 − 100 − 20 − 5 = 0.</li>
              <li><strong>Ötös számrendszerben</strong>: 125 diák, 48 lány és 77 fiú.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Házi feladatok eredményei" badge="Ellenőrzés" badgeColor="slate">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>HF 1.</strong> <B v="1000" b={6} /> + <B v="100" b={8} /> + <B v="101" b={2} /> = 216 + 64 + 5 = <strong>285</strong>.</li>
              <li><strong>HF 2.</strong> Mindhárom igaz: 100 = <B v="144" b={8} /> = <B v="1100100" b={2} /> = <B v="84" b={12} />.</li>
              <li><strong>HF 3.</strong> <B v="11111111" b={2} /> = 2⁸ − 1 = <strong>255</strong>.</li>
              <li><strong>HF 4.</strong> <B v="5714" b={9} /> = 4225; <B v="4226" b={7} /> = 1490; <B v="40013" b={5} /> = 2508; <B v="9073" b={11} /> = 12 059.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Ráadás" badge="Kitekintés" badgeColor="violet">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>1. a)</strong> A 362 utolsó jegye 2 ⇔ n | 360 (n ≥ 3, n ≠ 10): pl. 3, 4, 5, 6, 8, 9, 12, … , 360 alapú számrendszer.</li>
              <li><strong>1. b)</strong> Első jegye 2: n = 5 (<B v="2422" b={5} />), 11, 12 (<B v="262" b={12} />), 13, valamint 121 ≤ n ≤ 181.</li>
              <li><strong>2.</strong> A hatos számrendszerben különböző jegyű pozitív egészek: 5 + 25 + 100 + 300 + 600 + 600 = <strong>1630</strong>.</li>
              <li><strong>3.</strong> Hatos számrendszerben 2-vel, 3-mal és 6-tal osztható egy szám, ha utolsó jegye osztható velük; 5-tel, ha jegyeinek összege osztható 5-tel.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Informatika */}
      <TheorySection title="5. Számrendszerek az informatikában I." badge="Informatika" badgeColor="violet">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A számítógép csak két állapotot ismer fel: „van jel” (1) és „nincs jel” (0). A mágneslemez szakasza mágnesezett vagy nem, a CD/DVD tükörfelülete visszaveri a lézert vagy nem.
            </p>
            <p>
              <B v="10011010" b={2} /> = 128 + 16 + 8 + 2 = <strong>154</strong>.
            </p>
            <p>
              A kettes számrendszerbeli számok hosszúak: 6700 = 4096 + 2048 + 512 + 32 + 8 + 4 = <B v="1101000101100" b={2} /> – ez 13 számjegy! Ezért használják a <strong>16-os (hexadecimális)</strong> számrendszert is: 6700 = 1 · 4096 + 10 · 256 + 2 · 16 + 12 = <B v="1A2C" b={16} /> – mindössze 4 jegy.
            </p>
          </div>
          <div className="space-y-4">
            <BinaryPlaceValueSvg />
            <HexPlaceValueSvg />
          </div>
        </div>
      </TheorySection>

      {/* 6. Csapda */}
      <TheorySection title="6. Tipikus hiba: a számjegy nem lehet az alapszám" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Létezik-e a 6142₆ szám?"
          wrong="6142₆ = 6 · 216 + 1 · 36 + 4 · 6 + 2 = 1358"
          wrongExplanation="A hatos számrendszerben csak a 0, 1, 2, 3, 4, 5 számjegyek léteznek. A 6 itt már „egy csomag”: 6 = 10₆. Ezért a 6142₆ jelölés értelmetlen."
          correct="6142₇ = 2137 és 6142₈ = 3170 helyes jelölések"
          correctExplanation="Az n-es számrendszer jegyei 0, 1, …, n − 1. A 6-os számjegy miatt az alapszám legalább 7. Az indexet sem hagyhatjuk el: index nélkül a szám tízes számrendszerbeli."
          tip="Átírás előtt nézd meg a legnagyobb számjegyet: az alapszámnak nála nagyobbnak kell lennie!"
        />
      </TheorySection>

      {/* 7. Labor I: bitkapcsolók */}
      <TheorySection title="7. Interaktív Laboratórium I: Bitkapcsolós bináris átváltó" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-sm space-y-4">
          <p className="text-sm text-slate-600">Kapcsold be (1) vagy ki (0) a biteket! A bekapcsolt bitek helyi értékeit adjuk össze.</p>
          <div className="grid grid-cols-8 gap-1.5 sm:gap-3">
            {bits.map((bit, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-[10px] sm:text-xs font-semibold text-slate-500">{2 ** (7 - i)}</span>
                <button
                  onClick={() => setBits(bits.map((x, j) => (j === i ? 1 - x : x)))}
                  aria-label={`${7 - i}. bit`}
                  className={`w-full aspect-square rounded-xl text-lg sm:text-2xl font-black border-2 transition-colors ${bit ? 'bg-emerald-500 border-emerald-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-400'}`}
                >
                  {bit}
                </button>
                <span className="text-[10px] text-slate-400">2<sup>{7 - i}</sup></span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setFromDecimal(154)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800 hover:bg-emerald-200">Tankönyvi példa: 154</button>
            <button onClick={() => setFromDecimal(255)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800 hover:bg-emerald-200">Legnagyobb 8 bites: 255</button>
            <button onClick={() => setFromDecimal(100)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800 hover:bg-emerald-200">100 (HF 2. b)</button>
            <button onClick={() => setFromDecimal(0)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200">Mind 0</button>
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              tízes szám (0–255):
              <input
                type="number"
                min={0}
                max={255}
                value={value}
                onChange={(e) => setFromDecimal(Number(e.target.value))}
                className="w-20 border border-emerald-300 rounded-lg p-1 font-mono"
                aria-label="tízes számrendszerbeli érték"
              />
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
              <div className="text-xs text-slate-500">kettes számrendszerben</div>
              <div className="font-mono text-lg font-black text-slate-800"><B v={bits.join('')} b={2} /></div>
            </div>
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3">
              <div className="text-xs text-emerald-700">tízes számrendszerben</div>
              <div className="font-mono text-lg font-black text-emerald-900">{value}</div>
              <div className="text-xs text-emerald-800">{onTerms.length ? onTerms.join(' + ') : '0'}</div>
            </div>
            <div className="rounded-xl bg-indigo-50 border border-indigo-200 p-3">
              <div className="text-xs text-indigo-700">tizenhatos (4-4 bit egy jegy)</div>
              <div className="font-mono text-lg font-black text-indigo-900"><B v={toBase(value, 16)} b={16} /></div>
              <div className="text-xs text-indigo-800">{bits.slice(0, 4).join('')} | {bits.slice(4).join('')}</div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 8. Labor II: csomagológép */}
      <TheorySection title="8. Interaktív Laboratórium II: A csomagológép – bármely alapszámmal" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">alapszám (ennyi kerül egy dobozba): {base}</label>
              <input type="range" min="2" max="16" value={base} onChange={(e) => setBase(Number(e.target.value))} className="w-full accent-purple-600" aria-label="alapszám" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">bonbonok száma (tízes számrendszerben)</label>
              <input type="text" inputMode="numeric" value={nText} onChange={(e) => setNText(e.target.value)} className="w-full border border-purple-300 rounded-lg p-2 font-mono" aria-label="bonbonok száma" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-purple-50 text-purple-900">
                <tr>
                  <th className="p-2 text-left">Csomagolás</th>
                  <th className="p-2 text-left">Maradékos osztás</th>
                  <th className="p-2 text-right">Kimarad (számjegy)</th>
                </tr>
              </thead>
              <tbody>
                {steps.map((s, i) => (
                  <tr key={i} className="border-t border-slate-200">
                    <td className="p-2">{i === 0 ? 'bonbonok → dobozok' : `${i}. szintű csomagok → ${i + 1}. szintű`}</td>
                    <td className="p-2 font-mono">{fmt(s.n)} : {base} = {fmt(s.q)}, maradék {s.r}</td>
                    <td className="p-2 text-right font-bold">{SYMBOLS[s.r]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rounded-xl bg-purple-50 border border-purple-200 p-3 text-center text-lg">
            {fmt(N)} = <span className="font-mono font-black text-purple-900"><B v={converted} b={base} /></span>
            <span className="block text-xs text-purple-800 mt-1">(a maradékokat alulról felfelé, azaz a legnagyobb csomagtól olvassuk)</span>
          </div>
          <div className="border-t border-slate-200 pt-4 space-y-2">
            <label className="block text-xs font-semibold text-slate-600">Visszafelé: írj be egy {base}-es számrendszerbeli számot!</label>
            <input type="text" value={digitText} onChange={(e) => setDigitText(e.target.value)} className="w-full md:w-1/2 border border-purple-300 rounded-lg p-2 font-mono uppercase" aria-label="számjegyek" />
            {invalid.length > 0 ? (
              <div className="text-sm font-bold text-rose-700">
                Hibás számjegy a {base}-es számrendszerben: {Array.from(new Set(invalid)).join(', ')} (megengedett: {SYMBOLS.slice(0, base).split('').join(', ')})
              </div>
            ) : back !== null ? (
              <div className="text-sm text-slate-700">
                <B v={clean} b={base} /> ={' '}
                {digitVals.map((d, i) => (
                  <span key={i}>
                    {i > 0 ? ' + ' : ''}
                    {d} · {base}
                    <sup>{digitVals.length - 1 - i}</sup>
                  </span>
                ))}{' '}
                = <strong>{fmt(back)}</strong>
              </div>
            ) : null}
          </div>
          <p className="text-xs text-slate-500">Tankönyvi beállítások: 1347 a 12-esben (943₁₂); 469 a 8-asban (725₈); 1A7B a 12-esben = 3263; 6700 a 16-osban = 1A2C₁₆.</p>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default NumeralSystems1Theory;
